const crypto = require('crypto');

// In-memory OTP storage with expiration & rate limit (persisted during serverless invocation lifecycle)
// Format: email => { hash, expiresAt, attempts, lastSentAt }
const otpStore = new Map();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown
const MAX_ATTEMPTS = 5;

// Hash OTP so it is not stored as plain text
function hashOtp(otp, email) {
  return crypto.createHash('sha256').update(`${otp}:${email}`).digest('hex');
}

module.exports = async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { path } = req.query;
  const action = req.body?.action || (req.url.includes('verify') ? 'verify' : 'send');

  // 1. SEND OTP
  if (action === 'send' || req.url.includes('send-email-otp')) {
    const email = (req.body?.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid Gmail address is required' });
    }

    const now = Date.now();
    const existing = otpStore.get(email);
    if (existing && now - existing.lastSentAt < RESEND_COOLDOWN_MS) {
      const waitSec = Math.ceil((RESEND_COOLDOWN_MS - (now - existing.lastSentAt)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Please wait ${waitSec}s before requesting a new code.`
      });
    }

    // Generate cryptographic 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed = hashOtp(otp, email);

    otpStore.set(email, {
      hash: hashed,
      expiresAt: now + OTP_EXPIRY_MS,
      attempts: 0,
      lastSentAt: now
    });

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (appsScriptUrl) {
      try {
        const response = await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'send_otp',
            email: email,
            otp: otp,
            appName: 'ECE Quest Pro'
          })
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Failed to send email via Google Apps Script');
        }
      } catch (err) {
        console.error('Error contacting Google Apps Script:', err);
        return res.status(502).json({
          success: false,
          error: 'Failed to deliver OTP via Google Apps Script service'
        });
      }
    } else {
      // In development mode or before APPS_SCRIPT_URL is configured:
      console.log(`[DEV MODE] Generated OTP for ${email}: ${otp}`);
    }

    return res.status(200).json({
      success: true,
      message: 'OTP has been dispatched to your email.',
      cooldownSeconds: 60,
      expiresInMinutes: 10,
      devNote: !appsScriptUrl ? 'APPS_SCRIPT_URL not configured. Check server logs for dev OTP.' : undefined
    });
  }

  // 2. VERIFY OTP
  if (action === 'verify' || req.url.includes('verify-email-otp')) {
    const email = (req.body?.email || '').trim().toLowerCase();
    const otp = (req.body?.otp || '').trim();

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP code are required' });
    }

    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ success: false, error: 'No OTP requested for this email or code expired.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, error: 'This verification code has expired. Please request a new one.' });
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      otpStore.delete(email);
      return res.status(429).json({ success: false, error: 'Too many failed attempts. Please request a new code.' });
    }

    const inputHash = hashOtp(otp, email);
    if (inputHash !== record.hash) {
      record.attempts++;
      const remaining = MAX_ATTEMPTS - record.attempts;
      return res.status(400).json({
        success: false,
        error: `Incorrect verification code. ${remaining} attempt(s) remaining.`
      });
    }

    // Correct OTP verified!
    otpStore.delete(email);
    return res.status(200).json({
      success: true,
      emailVerified: true,
      email: email,
      message: 'Email successfully verified.'
    });
  }

  return res.status(404).json({ success: false, error: 'Endpoint not found' });
};
