const crypto = require('crypto');
const { getDb } = require('./db');

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown
const MAX_ATTEMPTS = 5;

function hashOtp(otp, email) {
  return crypto.createHash('sha256').update(`${otp}:${email}`).digest('hex');
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
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

  const db = getDb();
  const action = req.body?.action || (req.url.includes('verify') ? 'verify' : (req.url.includes('login') ? 'login' : (req.url.includes('register') ? 'register' : 'send')));

  try {
    // -------------------------------------------------------------
    // 1. SEND OTP
    // -------------------------------------------------------------
    if (action === 'send' || req.url.includes('send-email-otp')) {
      const email = (req.body?.email || '').trim().toLowerCase();
      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Valid Gmail address is required' });
      }

      const now = Date.now();
      const existing = await db.execute({
        sql: 'SELECT last_sent_at FROM email_otps WHERE email = ?',
        args: [email]
      });

      if (existing.rows.length > 0) {
        const lastSent = Number(existing.rows[0].last_sent_at);
        if (now - lastSent < RESEND_COOLDOWN_MS) {
          const waitSec = Math.ceil((RESEND_COOLDOWN_MS - (now - lastSent)) / 1000);
          return res.status(429).json({
            success: false,
            error: `Please wait ${waitSec}s before requesting a new code.`
          });
        }
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashed = hashOtp(otp, email);

      // Save/Update in Turso DB
      await db.execute({
        sql: `INSERT INTO email_otps (email, hash, expires_at, attempts, last_sent_at)
              VALUES (?, ?, ?, 0, ?)
              ON CONFLICT(email) DO UPDATE SET
                hash = excluded.hash,
                expires_at = excluded.expires_at,
                attempts = 0,
                last_sent_at = excluded.last_sent_at`,
        args: [email, hashed, now + OTP_EXPIRY_MS, now]
      });

      const appsScriptUrl = process.env.APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbz7cnSsINtuXzFCaFP1ChLX4ebW6PCDqyqXA9IvQy_oMaV8TB1QaTZQs-O3BhNwYb8VIw/exec';

      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'send_otp',
            email: email,
            otp: otp,
            appName: 'ECE Quest Pro'
          })
        });
      } catch (err) {
        console.error('Error contacting Google Apps Script:', err);
      }

      return res.status(200).json({
        success: true,
        message: 'OTP has been dispatched to your email.',
        cooldownSeconds: 60,
        expiresInMinutes: 10
      });
    }

    // -------------------------------------------------------------
    // 2. VERIFY OTP
    // -------------------------------------------------------------
    if (action === 'verify' || req.url.includes('verify-email-otp')) {
      const email = (req.body?.email || '').trim().toLowerCase();
      const otp = (req.body?.otp || '').trim();

      if (!email || !otp) {
        return res.status(400).json({ success: false, error: 'Email and OTP code are required' });
      }

      const recordRes = await db.execute({
        sql: 'SELECT hash, expires_at, attempts FROM email_otps WHERE email = ?',
        args: [email]
      });

      if (recordRes.rows.length === 0) {
        return res.status(400).json({ success: false, error: 'No OTP requested for this email or code expired.' });
      }

      const record = recordRes.rows[0];
      const expiresAt = Number(record.expires_at);
      const attempts = Number(record.attempts);

      if (Date.now() > expiresAt) {
        await db.execute({ sql: 'DELETE FROM email_otps WHERE email = ?', args: [email] });
        return res.status(400).json({ success: false, error: 'This verification code has expired. Please request a new one.' });
      }

      if (attempts >= MAX_ATTEMPTS) {
        await db.execute({ sql: 'DELETE FROM email_otps WHERE email = ?', args: [email] });
        return res.status(429).json({ success: false, error: 'Too many failed attempts. Please request a new code.' });
      }

      const inputHash = hashOtp(otp, email);
      if (inputHash !== record.hash) {
        await db.execute({
          sql: 'UPDATE email_otps SET attempts = attempts + 1 WHERE email = ?',
          args: [email]
        });
        const remaining = MAX_ATTEMPTS - (attempts + 1);
        return res.status(400).json({
          success: false,
          error: `Incorrect verification code. ${remaining} attempt(s) remaining.`
        });
      }

      // Valid OTP
      await db.execute({ sql: 'DELETE FROM email_otps WHERE email = ?', args: [email] });

      return res.status(200).json({
        success: true,
        emailVerified: true,
        email: email,
        message: 'Email successfully verified.'
      });
    }

    // -------------------------------------------------------------
    // 3. REGISTER USER (Persisted in Turso DB)
    // -------------------------------------------------------------
    if (action === 'register' || req.url.includes('register')) {
      const email = (req.body?.email || '').trim().toLowerCase();
      const password = req.body?.password;
      const name = (req.body?.name || 'Student').trim();
      const college = (req.body?.college || 'College of Engineering').trim();
      const branch = (req.body?.branch || 'ECE').trim();
      const year = (req.body?.year || '2nd Year').trim();

      if (!email || !password || password.length < 4) {
        return res.status(400).json({ success: false, error: 'Valid email and password (min 4 chars) required.' });
      }

      // Check if user already exists
      const userCheck = await db.execute({
        sql: 'SELECT id FROM users WHERE email = ?',
        args: [email]
      });
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
      }

      const passwordHash = hashPassword(password);

      // Insert User
      await db.execute({
        sql: `INSERT INTO users (email, password, name, college, branch, year, email_verified)
              VALUES (?, ?, ?, ?, ?, ?, 1)`,
        args: [email, passwordHash, name, college, branch, year]
      });

      // Initialize User Progress record in Turso
      await db.execute({
        sql: `INSERT INTO user_progress (email, xp, streak, total_questions, correct_answers, quizzes, best_score, badges_json, history_json, completed_lessons_json)
              VALUES (?, 0, 0, 0, 0, 0, 0, '[]', '[]', '[]')
              ON CONFLICT(email) DO NOTHING`,
        args: [email]
      });

      return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        user: { email, name, college, branch, year }
      });
    }

    // -------------------------------------------------------------
    // 4. LOGIN USER (Verified against Turso DB)
    // -------------------------------------------------------------
    if (action === 'login' || req.url.includes('login')) {
      const email = (req.body?.email || '').trim().toLowerCase();
      const password = req.body?.password;

      if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password required' });
      }

      const userRes = await db.execute({
        sql: 'SELECT id, email, password, name, college, branch, year FROM users WHERE email = ?',
        args: [email]
      });

      if (userRes.rows.length === 0) {
        return res.status(400).json({ success: false, error: 'No account found with this email. Please register first.' });
      }

      const user = userRes.rows[0];
      const passwordHash = hashPassword(password);

      if (user.password !== passwordHash) {
        return res.status(400).json({ success: false, error: 'Incorrect password. Please try again.' });
      }

      // Fetch user's persistent progress
      const progressRes = await db.execute({
        sql: 'SELECT * FROM user_progress WHERE email = ?',
        args: [email]
      });

      let progress = null;
      if (progressRes.rows.length > 0) {
        const row = progressRes.rows[0];
        progress = {
          xp: Number(row.xp || 0),
          streak: Number(row.streak || 0),
          total_questions: Number(row.total_questions || 0),
          correct_answers: Number(row.correct_answers || 0),
          quizzes: Number(row.quizzes || 0),
          best_score: Number(row.best_score || 0),
          badges: JSON.parse(row.badges_json || '[]'),
          history: JSON.parse(row.history_json || '[]'),
          completed_lessons: JSON.parse(row.completed_lessons_json || '[]'),
          daily_date: row.daily_date || '',
          daily_done: Boolean(row.daily_done),
          daily_score: Number(row.daily_score || 0)
        };
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          email: user.email,
          name: user.name,
          college: user.college,
          branch: user.branch,
          year: user.year
        },
        progress: progress
      });
    }

    // -------------------------------------------------------------
    // 5. SYNC PROGRESS (Cloud backup to Turso DB)
    // -------------------------------------------------------------
    if (action === 'sync_progress' || req.url.includes('sync-progress')) {
      const email = (req.body?.email || '').trim().toLowerCase();
      const p = req.body?.progress;

      if (!email || !p) {
        return res.status(400).json({ success: false, error: 'Email and progress data required' });
      }

      await db.execute({
        sql: `INSERT INTO user_progress (
                email, xp, streak, total_questions, correct_answers, quizzes, best_score,
                badges_json, history_json, completed_lessons_json, daily_date, daily_done, daily_score, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
              ON CONFLICT(email) DO UPDATE SET
                xp = excluded.xp,
                streak = excluded.streak,
                total_questions = excluded.total_questions,
                correct_answers = excluded.correct_answers,
                quizzes = excluded.quizzes,
                best_score = excluded.best_score,
                badges_json = excluded.badges_json,
                history_json = excluded.history_json,
                completed_lessons_json = excluded.completed_lessons_json,
                daily_date = excluded.daily_date,
                daily_done = excluded.daily_done,
                daily_score = excluded.daily_score,
                updated_at = CURRENT_TIMESTAMP`,
        args: [
          email,
          Number(p.xp || 0),
          Number(p.streak || 0),
          Number(p.total_questions || 0),
          Number(p.correct_answers || 0),
          Number(p.quizzes || 0),
          Number(p.best_score || 0),
          JSON.stringify(p.badges || []),
          JSON.stringify(p.history || []),
          JSON.stringify(p.completed_lessons || []),
          p.daily_date || '',
          p.daily_done ? 1 : 0,
          Number(p.daily_score || 0)
        ]
      });

      return res.status(200).json({ success: true, message: 'Progress synced to cloud database' });
    }

    return res.status(404).json({ success: false, error: 'Endpoint not found' });

  } catch (err) {
    console.error('Database/Auth error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error: ' + err.message });
  }
};
