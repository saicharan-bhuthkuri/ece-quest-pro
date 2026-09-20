import { QUESTIONS, LESSONS, FORMULAS, BADGES_DEF } from './data.js';

const USERS_STORAGE_KEY = 'ece_quest_pro_users';
const CURRENT_USER_KEY = 'ece_quest_pro_current_user';
const APP_DATA_PREFIX = 'ece_quest_pro_data_';

// SVG Icon Helpers for clean modern UI
const ICONS = {
  play: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon></svg>`,
  book: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  flask: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31L4 20h16l-6-10.69V2h-4z"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line></svg>`,
  chart: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  formula: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6l6 16h4"></path><line x1="4" y1="12" x2="14" y2="12"></line></svg>`,
  calendar: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  award: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
  user: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  cross: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  lock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  mail: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  logout: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`
};

// -------------------------------------------------------------
// USER AUTHENTICATION & MULTI-USER DATA STORE
// -------------------------------------------------------------
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

function setCurrentUser(email) {
  if (email) {
    localStorage.setItem(CURRENT_USER_KEY, email);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// User state
function getDefaultUserData(name = "Student", email = "") {
  return {
    profile: {
      name: name,
      email: email,
      college: "Trinity College of Engineering and Technology",
      branch: "ECE",
      year: "2nd Year"
    },
    xp: 0,
    streak: 0,
    total_questions: 0,
    correct_answers: 0,
    quizzes: 0,
    best_score: 0,
    badges: [],
    history: [],
    daily_date: "",
    daily_done: false,
    daily_score: 0,
    completed_lessons: []
  };
}

let state = null;
let quizTimerInterval = null;

function loadUserData(email) {
  if (!email) return null;
  const key = APP_DATA_PREFIX + email.toLowerCase();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      const users = getUsers();
      const u = users[email.toLowerCase()];
      const def = getDefaultUserData(u ? u.name : "Student", email);
      return def;
    }
    const parsed = JSON.parse(raw);
    const def = getDefaultUserData();
    return {
      ...def,
      ...parsed,
      profile: { ...def.profile, ...(parsed.profile || {}) }
    };
  } catch (e) {
    return getDefaultUserData("Student", email);
  }
}

function saveUserData() {
  const email = getCurrentUser();
  if (!email || !state) return;
  const key = APP_DATA_PREFIX + email.toLowerCase();
  localStorage.setItem(key, JSON.stringify(state));
  updateHeaderStats();
}

function getLevel() {
  if (!state) return 1;
  return Math.floor(state.xp / 500) + 1;
}

function getLevelXP() {
  if (!state) return 0;
  return state.xp % 500;
}

function getLevelPercent() {
  return (getLevelXP() / 500) * 100;
}

function showToast(msg) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast-msg';
  t.innerHTML = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function checkBadges() {
  if (!state) return;
  let newUnlock = false;
  BADGES_DEF.forEach(b => {
    if (!state.badges.includes(b.id) && b.cond(state)) {
      state.badges.push(b.id);
      showToast(`<div class="toast-title">ACHIEVEMENT UNLOCKED</div><div>${b.id}</div>`);
      newUnlock = true;
    }
  });
  if (newUnlock) saveUserData();
}

// Update Top Bar
function updateHeaderStats() {
  const levelEl = document.getElementById('hdr-level');
  const xpEl = document.getElementById('hdr-xp');
  const streakEl = document.getElementById('hdr-streak');
  if (levelEl) levelEl.textContent = getLevel();
  if (xpEl) xpEl.textContent = state ? state.xp : 0;
  if (streakEl) streakEl.textContent = state ? state.streak : 0;
}

// App Container
const appView = document.getElementById('app-view');
const appHeader = document.querySelector('.app-header');
const mobileNav = document.getElementById('mobile-nav');

function setAppShellVisibility(visible) {
  if (appHeader) appHeader.style.display = visible ? 'flex' : 'none';
  if (mobileNav) mobileNav.style.display = visible ? 'flex' : 'none';
}

function clearTimer() {
  if (quizTimerInterval) {
    clearInterval(quizTimerInterval);
    quizTimerInterval = null;
  }
}

// -------------------------------------------------------------
// AUTH SCREEN: LOGIN & REGISTRATION WITH EMAIL OTP
// -------------------------------------------------------------
let otpCooldownTimer = null;
let otpCooldownSeconds = 0;
let registrationState = {
  step: 'details', // 'details' | 'otp'
  email: '',
  name: '',
  password: '',
  college: '',
  emailVerified: false
};

const APPS_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbz7cnSsINtuXzFCaFP1ChLX4ebW6PCDqyqXA9IvQy_oMaV8TB1QaTZQs-O3BhNwYb8VIw/exec';

// Local storage temporary OTP cache for client-side APK fallback mode
const CLIENT_OTP_CACHE = new Map();

async function apiSendEmailOtp(email) {
  // First attempt via backend proxy /auth/send-email-otp
  try {
    const res = await fetch('/auth/send-email-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // If running in packaged mobile APK without hosted /auth endpoint, fallback directly to Apps Script:
    console.log("Using direct Apps Script endpoint for mobile client...");
  }

  // Direct APK client fallback
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    CLIENT_OTP_CACHE.set(email.toLowerCase(), {
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0
    });

    const res = await fetch(APPS_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'send_otp',
        email: email,
        otp: otp,
        appName: 'ECE Quest Pro'
      })
    });

    return {
      success: true,
      message: 'OTP sent directly to your Gmail inbox.',
      cooldownSeconds: 60
    };
  } catch (err) {
    return { success: false, error: 'Failed to contact verification service. Check internet connection.' };
  }
}

async function apiVerifyEmailOtp(email, otp) {
  // First attempt via backend proxy
  try {
    const res = await fetch('/auth/verify-email-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, otp: otp })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // APK fallback mode
  }

  // Direct APK fallback check
  const record = CLIENT_OTP_CACHE.get(email.toLowerCase());
  if (!record) {
    return { success: false, error: 'No verification code requested or code expired.' };
  }
  if (Date.now() > record.expiresAt) {
    CLIENT_OTP_CACHE.delete(email.toLowerCase());
    return { success: false, error: 'Verification code expired. Please request a new code.' };
  }
  if (record.attempts >= 5) {
    CLIENT_OTP_CACHE.delete(email.toLowerCase());
    return { success: false, error: 'Too many incorrect attempts. Request a new code.' };
  }
  if (record.otp !== otp.trim()) {
    record.attempts++;
    return { success: false, error: `Incorrect code. ${5 - record.attempts} attempt(s) remaining.` };
  }

  CLIENT_OTP_CACHE.delete(email.toLowerCase());
  return { success: true, emailVerified: true };
}

function showAuthScreen(mode = 'login') {
  clearTimer();
  setAppShellVisibility(false);

  if (mode === 'login') {
    registrationState.step = 'details';
    registrationState.emailVerified = false;
  }

  appView.innerHTML = `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h1 class="auth-title">ECE QUEST PRO</h1>
          <p class="auth-subtitle">Professional Engineering Learning & Simulation</p>
        </div>

        <div class="auth-tabs">
          <button class="auth-tab-btn ${mode === 'login' ? 'active' : ''}" id="tab-switch-login">SIGN IN</button>
          <button class="auth-tab-btn ${mode === 'register' ? 'active' : ''}" id="tab-switch-register">CREATE ACCOUNT</button>
        </div>

        <div id="auth-alert-container"></div>

        ${mode === 'login' ? `
          <form id="auth-form-login" autocomplete="off">
            <div class="form-group">
              <label>GMAIL / STUDENT EMAIL</label>
              <input type="email" class="form-input" id="login-email" placeholder="student@gmail.com" required>
            </div>

            <div class="form-group">
              <label>PASSWORD</label>
              <input type="password" class="form-input" id="login-password" placeholder="••••••••" required>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 14px; padding: 13px;">
              SIGN IN TO CONTINUE
            </button>
          </form>
        ` : (registrationState.step === 'details' ? `
          <form id="auth-form-register" autocomplete="off">
            <div class="form-group">
              <label>FULL NAME</label>
              <input type="text" class="form-input" id="reg-name" value="${escapeHtml(registrationState.name)}" placeholder="e.g. Rushanth B." required>
            </div>

            <div class="form-group">
              <label>GMAIL ADDRESS (OTP WILL BE SENT HERE)</label>
              <input type="email" class="form-input" id="reg-email" value="${escapeHtml(registrationState.email)}" placeholder="username@gmail.com" required>
            </div>

            <div class="form-group">
              <label>CREATE PASSWORD</label>
              <input type="password" class="form-input" id="reg-password" placeholder="At least 4 characters" required>
            </div>

            <div class="form-group">
              <label>CONFIRM PASSWORD</label>
              <input type="password" class="form-input" id="reg-confirm" placeholder="Repeat password" required>
            </div>

            <div class="form-group">
              <label>COLLEGE / INSTITUTION</label>
              <input type="text" class="form-input" id="reg-college" value="${escapeHtml(registrationState.college)}" placeholder="Trinity College of Engineering and Technology">
            </div>

            <button type="submit" class="btn btn-primary" id="btn-send-otp" style="width: 100%; margin-top: 14px; padding: 13px;">
              VERIFY EMAIL & CONTINUE →
            </button>
          </form>
        ` : `
          <!-- OTP Verification Step -->
          <div class="otp-container">
            <div style="text-align: center; margin-bottom: 18px;">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--cyan); margin-bottom: 4px;">ENTER 6-DIGIT CODE</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">
                A verification code was sent to<br><b style="color: #FFF;">${escapeHtml(registrationState.email)}</b>
              </div>
            </div>

            <form id="auth-form-otp" autocomplete="off">
              <div class="form-group">
                <input type="text" class="form-input" id="reg-otp" maxlength="6" pattern="[0-9]{6}" placeholder="• • • • • •" style="text-align: center; font-size: 1.6rem; letter-spacing: 12px; font-family: var(--font-mono); font-weight: 800;" required autofocus>
              </div>

              <button type="submit" class="btn btn-primary" id="btn-verify-otp" style="width: 100%; margin-top: 8px; padding: 13px;">
                CONFIRM & FINISH REGISTRATION
              </button>
            </form>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 0.8rem;">
              <button class="btn" id="btn-back-reg-details" style="padding: 6px 12px; font-size: 0.75rem;">← EDIT DETAILS</button>
              <button class="btn" id="btn-resend-otp" style="padding: 6px 12px; font-size: 0.75rem;" ${otpCooldownSeconds > 0 ? 'disabled' : ''}>
                ${otpCooldownSeconds > 0 ? `RESEND (${otpCooldownSeconds}s)` : 'RESEND OTP'}
              </button>
            </div>
          </div>
        `)}

        <div class="auth-footer">
          ${mode === 'login' 
            ? `New student? <span class="auth-link" id="link-goto-register">Create an account</span>`
            : `Already registered? <span class="auth-link" id="link-goto-login">Sign in</span>`
          }
          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(30, 52, 82, 0.4); display: flex; justify-content: center; gap: 16px; font-size: 0.75rem;">
            <a href="landing.html" style="color: var(--cyan); text-decoration: none;">Download APK</a>
            <span style="color: var(--text-muted);">•</span>
            <a href="dashboard.html" style="color: var(--text-muted); text-decoration: none;">Admin Portal</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('tab-switch-login').onclick = () => showAuthScreen('login');
  document.getElementById('tab-switch-register').onclick = () => showAuthScreen('register');

  const linkGotoReg = document.getElementById('link-goto-register');
  if (linkGotoReg) linkGotoReg.onclick = () => showAuthScreen('register');

  const linkGotoLogin = document.getElementById('link-goto-login');
  if (linkGotoLogin) linkGotoLogin.onclick = () => showAuthScreen('login');

  // Handle Login Submit
  const loginForm = document.getElementById('auth-form-login');
  if (loginForm) {
    loginForm.onsubmit = async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('auth-alert-container');
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;

      // First attempt cloud Turso DB login
      try {
        const res = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) {
          setCurrentUser(email);
          state = data.progress || getDefaultUserData(data.user.name, email);
          state.profile = { ...state.profile, ...(data.user || {}) };
          saveUserData();
          showToast(`Welcome back, ${state.profile.name}!`);
          startApp();
          return;
        } else if (res.status === 400 || res.status === 401) {
          alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} ${escapeHtml(data.error || 'Invalid credentials')}</div>`;
          return;
        }
      } catch (err) {
        // Fallback to local storage if offline/APK standalone
      }

      // Offline / Local fallback check
      const users = getUsers();
      if (!users[email]) {
        alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} No account found with this email. Please register first.</div>`;
        return;
      }
      if (users[email].password !== password) {
        alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} Incorrect password. Please try again.</div>`;
        return;
      }

      // Success Login
      setCurrentUser(email);
      state = loadUserData(email);
      saveUserData();
      showToast(`Welcome back, ${state.profile.name}!`);
      startApp();
    };
  }

  // Handle Register Step 1: Submit Details & Send OTP
  const regForm = document.getElementById('auth-form-register');
  if (regForm) {
    regForm.onsubmit = async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('auth-alert-container');
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const password = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-confirm').value;
      const college = document.getElementById('reg-college').value.trim() || "College of Engineering";

      const users = getUsers();
      if (users[email]) {
        alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} An account with this email already exists. Please login instead.</div>`;
        return;
      }
      if (password.length < 4) {
        alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} Password must be at least 4 characters long.</div>`;
        return;
      }
      if (password !== confirm) {
        alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} Passwords do not match.</div>`;
        return;
      }

      registrationState.name = name;
      registrationState.email = email;
      registrationState.password = password;
      registrationState.college = college;

      const sendBtn = document.getElementById('btn-send-otp');
      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = 'SENDING OTP CODE...';
      }

      const res = await apiSendEmailOtp(email);
      if (!res.success) {
        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.textContent = 'VERIFY EMAIL & CONTINUE →';
        }
        alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} ${escapeHtml(res.error || 'Failed to send OTP')}</div>`;
        return;
      }

      // Start Resend Cooldown Timer (60s)
      startOtpCooldown(res.cooldownSeconds || 60);

      registrationState.step = 'otp';
      showAuthScreen('register');
      showToast("OTP sent to your email!");
    };
  }

  // Handle Register Step 2: OTP Verification
  const otpForm = document.getElementById('auth-form-otp');
  if (otpForm) {
    const btnBack = document.getElementById('btn-back-reg-details');
    if (btnBack) {
      btnBack.onclick = () => {
        registrationState.step = 'details';
        showAuthScreen('register');
      };
    }

    const btnResend = document.getElementById('btn-resend-otp');
    if (btnResend) {
      btnResend.onclick = async () => {
        btnResend.disabled = true;
        const res = await apiSendEmailOtp(registrationState.email);
        const alertBox = document.getElementById('auth-alert-container');
        if (res.success) {
          startOtpCooldown(res.cooldownSeconds || 60);
          alertBox.innerHTML = `<div class="auth-alert success">${ICONS.check} New verification code dispatched.</div>`;
        } else {
          btnResend.disabled = false;
          alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} ${escapeHtml(res.error || 'Failed to resend')}</div>`;
        }
      };
    }

    otpForm.onsubmit = async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('auth-alert-container');
      const otp = document.getElementById('reg-otp').value.trim();

      const verifyBtn = document.getElementById('btn-verify-otp');
      if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.textContent = 'VERIFYING CODE...';
      }

      const res = await apiVerifyEmailOtp(registrationState.email, otp);
      if (!res.success) {
        if (verifyBtn) {
          verifyBtn.disabled = false;
          verifyBtn.textContent = 'CONFIRM & FINISH REGISTRATION';
        }
        alertBox.innerHTML = `<div class="auth-alert error">${ICONS.cross} ${escapeHtml(res.error || 'Invalid OTP')}</div>`;
        return;
      }

      // Try to register user in Turso DB
      try {
        await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: registrationState.email,
            password: registrationState.password,
            name: registrationState.name,
            college: registrationState.college
          })
        });
      } catch (err) {
        console.log("Registered locally:", err);
      }

      // Email verified! Save user account locally
      const users = getUsers();
      users[registrationState.email] = {
        email: registrationState.email,
        name: registrationState.name,
        password: registrationState.password,
        college: registrationState.college,
        emailVerified: true,
        createdAt: new Date().toISOString()
      };
      saveUsers(users);

      // Create new user profile data
      setCurrentUser(registrationState.email);
      state = getDefaultUserData(registrationState.name, registrationState.email);
      state.profile.college = registrationState.college;
      saveUserData();

      showToast("Email verified and account created successfully!");
      startApp();
    };
  }
}

function startOtpCooldown(seconds) {
  if (otpCooldownTimer) clearInterval(otpCooldownTimer);
  otpCooldownSeconds = seconds;
  otpCooldownTimer = setInterval(() => {
    otpCooldownSeconds--;
    const btnResend = document.getElementById('btn-resend-otp');
    if (btnResend) {
      if (otpCooldownSeconds > 0) {
        btnResend.disabled = true;
        btnResend.textContent = `RESEND (${otpCooldownSeconds}s)`;
      } else {
        btnResend.disabled = false;
        btnResend.textContent = 'RESEND OTP';
      }
    }
    if (otpCooldownSeconds <= 0) {
      clearInterval(otpCooldownTimer);
      otpCooldownTimer = null;
    }
  }, 1000);
}

function handleLogout() {
  setCurrentUser(null);
  state = null;
  showToast("Logged out successfully.");
  showAuthScreen('login');
}

// -------------------------------------------------------------
// APP INITIALIZATION & ROUTING
// -------------------------------------------------------------
function startApp() {
  const currentEmail = getCurrentUser();
  if (!currentEmail) {
    showAuthScreen('login');
    return;
  }

  state = loadUserData(currentEmail);
  setAppShellVisibility(true);
  setActiveTab('tab-home');
  showHome();
}

// -------------------------------------------------------------
// NAVIGATION: HOME
// -------------------------------------------------------------
export function showHome() {
  if (!getCurrentUser()) {
    showAuthScreen('login');
    return;
  }

  clearTimer();
  updateHeaderStats();

  const accuracy = state.total_questions 
    ? Math.round((state.correct_answers / state.total_questions) * 100) 
    : 0;

  appView.innerHTML = `
    <div class="hero-section">
      <div class="hero-tag">ENGINEERING PLATFORM</div>
      <h1 class="hero-title">${escapeHtml(state.profile.name)}</h1>
      <p class="hero-subtitle">${escapeHtml(state.profile.college)}</p>
    </div>

    <div class="level-bar-card">
      <div class="level-bar-header">
        <span class="level-badge">RANK ${getLevel()}</span>
        <span class="level-xp-text">${getLevelXP()} / 500 XP</span>
      </div>
      <div class="level-track">
        <div class="level-fill" style="width: ${Math.max(3, getLevelPercent())}%"></div>
      </div>
    </div>

    <!-- Primary Actions Grid -->
    <div class="action-grid-primary">
      <div class="action-card card-glow-cyan" id="btn-action-quiz">
        <div class="action-card-top">
          <div class="action-icon-circle icon-cyan">${ICONS.play}</div>
          <span class="card-arrow">${ICONS.arrowRight}</span>
        </div>
        <div class="action-title">Start Quiz</div>
        <div class="action-desc">Timed questions across 10 core ECE modules</div>
      </div>

      <div class="action-card card-glow-blue" id="btn-action-learn">
        <div class="action-card-top">
          <div class="action-icon-circle icon-blue">${ICONS.book}</div>
          <span class="card-arrow">${ICONS.arrowRight}</span>
        </div>
        <div class="action-title">Learn Hub</div>
        <div class="action-desc">Curated syllabus theory, notes & core concepts</div>
      </div>

      <div class="action-card card-glow-emerald" id="btn-action-lab">
        <div class="action-card-top">
          <div class="action-icon-circle icon-emerald">${ICONS.flask}</div>
          <span class="card-arrow">${ICONS.arrowRight}</span>
        </div>
        <div class="action-title">Virtual Lab</div>
        <div class="action-desc">Interactive circuit, logic gate & sensor labs</div>
      </div>

      <div class="action-card card-glow-purple" id="btn-action-progress">
        <div class="action-card-top">
          <div class="action-icon-circle icon-purple">${ICONS.chart}</div>
          <span class="card-arrow">${ICONS.arrowRight}</span>
        </div>
        <div class="action-title">Performance</div>
        <div class="action-desc">Accuracy rate, test history & analytics</div>
      </div>
    </div>

    <!-- Secondary Quick Access Grid -->
    <div class="action-grid-secondary">
      <div class="action-card-small" id="btn-action-formulas">
        <span class="small-card-icon">${ICONS.formula}</span>
        <span>Formula Hub</span>
      </div>
      <div class="action-card-small" id="btn-action-daily">
        <span class="small-card-icon">${ICONS.calendar}</span>
        <span>Daily Challenge</span>
      </div>
      <div class="action-card-small" id="btn-action-badges">
        <span class="small-card-icon">${ICONS.award}</span>
        <span>Badges (${state.badges.length}/${BADGES_DEF.length})</span>
      </div>
      <div class="action-card-small" id="btn-action-profile">
        <span class="small-card-icon">${ICONS.user}</span>
        <span>Profile</span>
      </div>
    </div>

    <!-- Bottom Quick Metrics -->
    <div class="bottom-stats-row">
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">SOLVED</div>
        <div class="bottom-stat-val">${state.total_questions}</div>
      </div>
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">ACCURACY</div>
        <div class="bottom-stat-val" style="color: ${accuracy >= 70 ? 'var(--emerald)' : 'var(--amber)'}">${accuracy}%</div>
      </div>
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">QUIZZES</div>
        <div class="bottom-stat-val">${state.quizzes}</div>
      </div>
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">BEST</div>
        <div class="bottom-stat-val" style="color: var(--cyan)">${state.best_score}%</div>
      </div>
    </div>
  `;

  document.getElementById('btn-action-quiz').onclick = () => { setActiveTab('tab-quiz'); showQuizSetup(); };
  document.getElementById('btn-action-learn').onclick = () => { setActiveTab('tab-learn'); showLearn(); };
  document.getElementById('btn-action-lab').onclick = () => { setActiveTab('tab-lab'); showLab(); };
  document.getElementById('btn-action-progress').onclick = () => showProgress();
  document.getElementById('btn-action-formulas').onclick = showFormulas;
  document.getElementById('btn-action-daily').onclick = startDaily;
  document.getElementById('btn-action-badges').onclick = showBadges;
  document.getElementById('btn-action-profile').onclick = () => { setActiveTab('tab-profile'); showProfile(); };
}

// -------------------------------------------------------------
// QUIZ ENGINE
// -------------------------------------------------------------
let activeQuizQuestions = [];
let activeQuizIndex = 0;
let activeQuizCorrect = 0;
let activeQuizXP = 0;
let activeTimerSeconds = 30;

function showQuizSetup() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();
  const topics = [...new Set(QUESTIONS.map(q => q.topic))];

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">ASSESSMENT MODULE</div>
      <h2 class="page-title">Quiz Arena</h2>
      <p class="page-subtitle">Select a subject module or configure a custom exam</p>
    </div>

    <div class="content-box" style="margin-bottom: 20px;">
      <div class="content-box-title">TOPIC MODULES (10 QUESTIONS EACH)</div>
      <div class="topic-grid">
        ${topics.map(t => `
          <button class="topic-pick-btn" data-topic="${t}">
            <span class="topic-dot"></span>
            <span class="topic-name">${t}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="content-box">
      <div class="content-box-title">CUSTOM EXAM SETUP</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div class="form-group">
          <label>DIFFICULTY</label>
          <select class="form-input" id="custom-diff">
            <option value="Mixed">Mixed (All Levels)</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
        <div class="form-group">
          <label>QUESTIONS COUNT</label>
          <select class="form-input" id="custom-count">
            <option value="5">5 Questions</option>
            <option value="10" selected>10 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" id="start-custom-btn" style="width: 100%;">
        START CHALLENGE
      </button>
    </div>
  `;

  document.querySelectorAll('.topic-pick-btn').forEach(b => {
    b.onclick = () => {
      const topic = b.dataset.topic;
      const topicPool = QUESTIONS.filter(q => q.topic === topic);
      startQuiz(shuffle(topicPool).slice(0, 10));
    };
  });

  document.getElementById('start-custom-btn').onclick = () => {
    const diff = document.getElementById('custom-diff').value;
    const count = parseInt(document.getElementById('custom-count').value, 10);
    let pool = diff === "Mixed" ? [...QUESTIONS] : QUESTIONS.filter(q => q.difficulty === diff);
    startQuiz(shuffle(pool).slice(0, count));
  };
}

function startQuiz(questions) {
  if (!questions || questions.length === 0) {
    showToast("No questions available for this selection.");
    return;
  }
  activeQuizQuestions = questions;
  activeQuizIndex = 0;
  activeQuizCorrect = 0;
  activeQuizXP = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  clearTimer();
  const q = activeQuizQuestions[activeQuizIndex];
  const total = activeQuizQuestions.length;
  activeTimerSeconds = 30;

  appView.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-meta-bar">
        <div>
          <span class="meta-question-count">QUESTION ${activeQuizIndex + 1} OF ${total}</span>
          <span class="meta-badge">${q.topic}</span>
        </div>
        <div class="quiz-timer" id="timer-display">
          ${ICONS.clock} <span>30s</span>
        </div>
      </div>

      <div class="question-text">${escapeHtml(q.q)}</div>

      <div class="options-grid" id="opts-container">
        ${q.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">
            <span class="opt-badge">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>

      <div id="feedback-area"></div>
    </div>
  `;

  // Start timer
  const timerDisplay = document.getElementById('timer-display');
  quizTimerInterval = setInterval(() => {
    activeTimerSeconds--;
    if (timerDisplay) {
      timerDisplay.innerHTML = `${ICONS.clock} <span>${activeTimerSeconds}s</span>`;
      if (activeTimerSeconds <= 7) timerDisplay.classList.add('urgent');
    }
    if (activeTimerSeconds <= 0) {
      clearTimer();
      handleAnswerSelect(-1); // Timeout
    }
  }, 1000);

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.onclick = () => {
      const selected = parseInt(btn.dataset.index, 10);
      handleAnswerSelect(selected);
    };
  });
}

function handleAnswerSelect(selectedIndex) {
  clearTimer();
  const q = activeQuizQuestions[activeQuizIndex];
  const isCorrect = selectedIndex === q.answer;
  const isTimeout = selectedIndex === -1;

  // Update State
  state.total_questions++;
  if (isCorrect) {
    activeQuizCorrect++;
    activeQuizXP += 100;
    state.correct_answers++;
    state.xp += 100;
    state.streak++;
  } else {
    state.streak = 0;
  }
  saveUserData();
  checkBadges();

  // Highlight buttons
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    const idx = parseInt(btn.dataset.index, 10);
    if (idx === q.answer) btn.classList.add('correct');
    if (idx === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  const feedbackArea = document.getElementById('feedback-area');
  feedbackArea.innerHTML = `
    <div class="explanation-card">
      <div class="feedback-status ${isCorrect ? 'status-correct' : 'status-incorrect'}">
        ${isCorrect ? `${ICONS.check} Correct +100 XP` : isTimeout ? `${ICONS.clock} Time Expired` : `${ICONS.cross} Incorrect`}
      </div>
      <div class="feedback-text">${escapeHtml(q.exp)}</div>
    </div>
    <div style="text-align: right; margin-top: 14px;">
      <button class="btn btn-primary" id="next-q-btn">
        ${activeQuizIndex + 1 < activeQuizQuestions.length ? 'NEXT QUESTION' : 'VIEW RESULTS'}
      </button>
    </div>
  `;

  document.getElementById('next-q-btn').onclick = () => {
    activeQuizIndex++;
    if (activeQuizIndex < activeQuizQuestions.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  };
}

function finishQuiz() {
  clearTimer();
  const total = activeQuizQuestions.length;
  const scorePercent = Math.round((activeQuizCorrect / total) * 100);

  state.quizzes++;
  if (scorePercent > state.best_score) {
    state.best_score = scorePercent;
  }

  // Record history
  state.history.push({
    date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    score: scorePercent,
    correct: activeQuizCorrect,
    total: total
  });
  saveUserData();
  checkBadges();

  appView.innerHTML = `
    <div class="content-box" style="text-align: center; max-width: 500px; margin: 40px auto; padding: 36px 24px;">
      <div class="section-tag">COMPLETED</div>
      <h2 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 8px;">${scorePercent}%</h2>
      <div style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 6px;">
        ${activeQuizCorrect} of ${total} Questions Correct
      </div>
      <div style="color: var(--emerald); font-weight: 700; margin-bottom: 25px;">
        +${activeQuizXP} XP EARNED
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" id="btn-quiz-again">RETRY QUIZ</button>
        <button class="btn" id="btn-quiz-progress">PERFORMANCE</button>
        <button class="btn" id="btn-quiz-home">HOME</button>
      </div>
    </div>
  `;

  document.getElementById('btn-quiz-again').onclick = showQuizSetup;
  document.getElementById('btn-quiz-progress').onclick = showProgress;
  document.getElementById('btn-quiz-home').onclick = () => { setActiveTab('tab-home'); showHome(); };
}

// -------------------------------------------------------------
// DAILY CHALLENGE
// -------------------------------------------------------------
function startDaily() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();
  const today = new Date().toISOString().split('T')[0];

  if (state.daily_date !== today) {
    state.daily_date = today;
    state.daily_done = false;
    state.daily_score = 0;
    saveUserData();
  }

  if (state.daily_done) {
    showToast(`Today's daily challenge completed! Score: ${state.daily_score}%`);
    return;
  }

  let seed = 0;
  for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);
  const dailySet = shuffle([...QUESTIONS], seed).slice(0, 5);

  activeQuizQuestions = dailySet;
  activeQuizIndex = 0;
  activeQuizCorrect = 0;
  activeQuizXP = 0;

  renderDailyQuestion();
}

function renderDailyQuestion() {
  clearTimer();
  const q = activeQuizQuestions[activeQuizIndex];
  const total = activeQuizQuestions.length;

  appView.innerHTML = `
    <div class="quiz-card">
      <div class="page-header" style="margin-bottom: 15px;">
        <div class="section-tag">DAILY MODULE</div>
        <h2 class="page-title">Daily Challenge</h2>
        <p class="page-subtitle">Question ${activeQuizIndex + 1} of ${total} (+150 XP each)</p>
      </div>

      <div class="question-text">${escapeHtml(q.q)}</div>

      <div class="options-grid">
        ${q.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">
            <span class="opt-badge">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.onclick = () => {
      const selected = parseInt(btn.dataset.index, 10);
      const isCorrect = selected === q.answer;

      state.total_questions++;
      if (isCorrect) {
        activeQuizCorrect++;
        activeQuizXP += 150;
        state.correct_answers++;
        state.xp += 150;
        state.streak++;
        showToast("Correct! +150 XP");
      } else {
        state.streak = 0;
        showToast(`Incorrect! Answer: ${q.options[q.answer]}`);
      }
      saveUserData();
      checkBadges();

      activeQuizIndex++;
      if (activeQuizIndex < activeQuizQuestions.length) {
        renderDailyQuestion();
      } else {
        state.daily_done = true;
        state.daily_score = Math.round((activeQuizCorrect / activeQuizQuestions.length) * 100);
        saveUserData();
        setActiveTab('tab-home');
        showHome();
      }
    };
  });
}

// -------------------------------------------------------------
// LEARN HUB
// -------------------------------------------------------------
function showLearn() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();
  const lessonEntries = Object.entries(LESSONS);

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">THEORY CURRICULUM</div>
      <h2 class="page-title">Learning Hub</h2>
      <p class="page-subtitle">Core engineering definitions, theorems and circuit behavior</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
      ${lessonEntries.map(([name, item]) => {
        const completed = (state.completed_lessons || []).includes(name);
        return `
          <div class="action-card" data-lesson="${name}" style="text-align: left; align-items: flex-start;">
            <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 12px;">
              <span class="module-num">${item.icon}</span>
              ${completed ? `<span class="badge-status-done">${ICONS.check} DONE</span>` : ''}
            </div>
            <div class="action-title">${escapeHtml(name)}</div>
            <div class="action-desc">${item.sections.length} syllabus subtopics covered</div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  document.querySelectorAll('[data-lesson]').forEach(card => {
    card.onclick = () => renderLessonDetails(card.dataset.lesson);
  });
}

function renderLessonDetails(lessonName) {
  const lesson = LESSONS[lessonName];
  if (!lesson) return;

  const isCompleted = (state.completed_lessons || []).includes(lessonName);

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">MODULE ${lesson.icon}</div>
      <h2 class="page-title">${escapeHtml(lessonName)}</h2>
      <p class="page-subtitle">Syllabus Topic Notes & Explanations</p>
    </div>

    <div class="content-box" style="max-width: 800px; margin: 0 auto 20px;">
      ${lesson.sections.map(sec => `
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
          <h3 style="color: var(--cyan); font-size: 1.1rem; margin-bottom: 6px; font-weight: 700;">${escapeHtml(sec.title)}</h3>
          <p style="color: var(--text-secondary); line-height: 1.65; font-size: 0.95rem;">${escapeHtml(sec.content)}</p>
        </div>
      `).join('')}

      <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center; margin-top: 25px; flex-wrap: wrap;">
        <button class="btn" id="btn-back-learn">${ICONS.arrowLeft} TOPICS</button>
        <button class="btn ${isCompleted ? 'btn-green' : 'btn-primary'}" id="btn-mark-completed">
          ${isCompleted ? 'COMPLETED' : 'MARK AS COMPLETED (+50 XP)'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-back-learn').onclick = showLearn;
  document.getElementById('btn-mark-completed').onclick = () => {
    if (!state.completed_lessons.includes(lessonName)) {
      state.completed_lessons.push(lessonName);
      state.xp += 50;
      saveUserData();
      checkBadges();
      showToast(`+50 XP Earned for completing ${lessonName}!`);
      renderLessonDetails(lessonName);
    }
  };
}

// -------------------------------------------------------------
// ECE LAB
// -------------------------------------------------------------
function showLab() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">VIRTUAL WORKBENCH</div>
      <h2 class="page-title">Electronics Lab</h2>
      <p class="page-subtitle">Interactive hardware circuits, sensor calculators & logic simulators</p>
    </div>

    <div class="lab-grid">
      <div class="lab-item-card" id="lab-ohm-card">
        <div>
          <div class="lab-tag">CIRCUITS</div>
          <div class="action-title">Ohm's Law</div>
          <div class="action-desc">Calculate V, I, or R dynamically from two inputs</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB</button>
      </div>

      <div class="lab-item-card" id="lab-led-card">
        <div>
          <div class="lab-tag">OPTOELECTRONICS</div>
          <div class="action-title">LED Circuit</div>
          <div class="action-desc">Determine suitable current-limiting resistor values</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB</button>
      </div>

      <div class="lab-item-card" id="lab-ldr-card">
        <div>
          <div class="lab-tag">SENSORS</div>
          <div class="action-title">LDR Photoresistor</div>
          <div class="action-desc">Ambient light level vs resistance simulator</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB</button>
      </div>

      <div class="lab-item-card" id="lab-ultrasonic-card">
        <div>
          <div class="lab-tag">EMBEDDED</div>
          <div class="action-title">Ultrasonic HC-SR04</div>
          <div class="action-desc">Echo timing and distance calculation simulation</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB</button>
      </div>

      <div class="lab-item-card" id="lab-logic-card">
        <div>
          <div class="lab-tag">DIGITAL LOGIC</div>
          <div class="action-title">Logic Gates</div>
          <div class="action-desc">Interactive 2-input boolean gates truth-tester</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB</button>
      </div>

      <div class="lab-item-card" id="lab-rc-card">
        <div>
          <div class="lab-tag">TRANSIENTS</div>
          <div class="action-title">RC Circuit</div>
          <div class="action-desc">Capacitor charge curves and time-constant tool</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB</button>
      </div>
    </div>
  `;

  document.getElementById('lab-ohm-card').onclick = labOhm;
  document.getElementById('lab-led-card').onclick = labLed;
  document.getElementById('lab-ldr-card').onclick = labLdr;
  document.getElementById('lab-ultrasonic-card').onclick = labUltrasonic;
  document.getElementById('lab-logic-card').onclick = labLogic;
  document.getElementById('lab-rc-card').onclick = labRc;
}

function labOhm() {
  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">SIMULATOR 01</div>
      <h2 class="page-title">Ohm's Law Calculator</h2>
      <p class="page-subtitle">Enter any two values to compute the missing variable</p>
    </div>

    <div class="lab-interactive-view">
      <div class="form-group">
        <label>Voltage (V in Volts)</label>
        <input type="number" step="any" class="form-input" id="ohm-v" placeholder="e.g. 12">
      </div>
      <div class="form-group">
        <label>Current (I in Amperes)</label>
        <input type="number" step="any" class="form-input" id="ohm-i" placeholder="e.g. 0.5">
      </div>
      <div class="form-group">
        <label>Resistance (R in Ohms)</label>
        <input type="number" step="any" class="form-input" id="ohm-r" placeholder="e.g. 24">
      </div>

      <div class="lab-result-display" id="ohm-res">Enter any two values above</div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-ohm-calc" style="flex: 1;">CALCULATE</button>
        <button class="btn" id="btn-lab-back">BACK</button>
      </div>
    </div>
  `;

  document.getElementById('btn-lab-back').onclick = showLab;
  document.getElementById('btn-ohm-calc').onclick = () => {
    const vStr = document.getElementById('ohm-v').value.trim();
    const iStr = document.getElementById('ohm-i').value.trim();
    const rStr = document.getElementById('ohm-r').value.trim();
    const res = document.getElementById('ohm-res');

    const filled = [vStr, iStr, rStr].filter(x => x !== "").length;
    if (filled !== 2) {
      res.textContent = "Please fill exactly two fields.";
      res.style.color = "var(--rose)";
      return;
    }

    res.style.color = "var(--cyan)";
    if (!vStr) {
      const v = parseFloat(iStr) * parseFloat(rStr);
      res.textContent = `Voltage V = ${v.toFixed(3)} V`;
    } else if (!iStr) {
      const i = parseFloat(vStr) / parseFloat(rStr);
      res.textContent = `Current I = ${i.toFixed(3)} A`;
    } else {
      const r = parseFloat(vStr) / parseFloat(iStr);
      res.textContent = `Resistance R = ${r.toFixed(3)} Ω`;
    }
  };
}

function labLed() {
  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">SIMULATOR 02</div>
      <h2 class="page-title">LED Current-Limiting Resistor</h2>
      <p class="page-subtitle">Protect diode circuits from overcurrent breakdown</p>
    </div>

    <div class="lab-interactive-view">
      <div class="form-group">
        <label>Supply Voltage (Vs in Volts)</label>
        <input type="number" step="any" class="form-input" id="led-vs" value="5">
      </div>
      <div class="form-group">
        <label>Forward Voltage (Vf in Volts)</label>
        <input type="number" step="any" class="form-input" id="led-vf" value="2.0">
      </div>
      <div class="form-group">
        <label>Forward Current (If in Amperes)</label>
        <input type="number" step="any" class="form-input" id="led-if" value="0.02">
      </div>

      <div class="lab-result-display" id="led-res">Recommended Resistor: R ≈ 150 Ω</div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-led-calc" style="flex: 1;">CALCULATE</button>
        <button class="btn" id="btn-lab-back">BACK</button>
      </div>
    </div>
  `;

  document.getElementById('btn-lab-back').onclick = showLab;
  document.getElementById('btn-led-calc').onclick = () => {
    const vs = parseFloat(document.getElementById('led-vs').value);
    const vf = parseFloat(document.getElementById('led-vf').value);
    const cur = parseFloat(document.getElementById('led-if').value);
    const res = document.getElementById('led-res');

    if (vs <= vf || cur <= 0) {
      res.textContent = "Supply voltage must be greater than LED forward voltage.";
      res.style.color = "var(--rose)";
      return;
    }
    const r = (vs - vf) / cur;
    res.style.color = "var(--cyan)";
    res.textContent = `Recommended Resistor: R ≈ ${r.toFixed(1)} Ω`;
  };
}

function labLdr() {
  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">SIMULATOR 03</div>
      <h2 class="page-title">LDR Light Sensor</h2>
      <p class="page-subtitle">Slide to simulate ambient luminescence change</p>
    </div>

    <div class="lab-interactive-view">
      <div class="form-group">
        <label>Ambient Light: <span id="ldr-val">50</span>%</label>
        <input type="range" min="0" max="100" value="50" class="slider-control" id="ldr-slider">
      </div>

      <div class="lab-result-display" id="ldr-res">
        Light Level: 50%<br>MODERATE LIGHT (Medium Resistance)
      </div>

      <button class="btn" id="btn-lab-back" style="width: 100%;">BACK TO LABS</button>
    </div>
  `;

  document.getElementById('btn-lab-back').onclick = showLab;
  const slider = document.getElementById('ldr-slider');
  const valDisp = document.getElementById('ldr-val');
  const res = document.getElementById('ldr-res');

  slider.oninput = () => {
    const val = parseInt(slider.value, 10);
    valDisp.textContent = val;
    let desc = "HIGH LIGHT (Low Resistance)";
    if (val < 25) desc = "DARK ENVIRONMENT (High Resistance)";
    else if (val < 65) desc = "MODERATE LIGHT (Medium Resistance)";
    res.innerHTML = `Light Level: ${val}%<br>${desc}`;
  };
}

function labUltrasonic() {
  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">SIMULATOR 04</div>
      <h2 class="page-title">HC-SR04 Ultrasonic Sensor</h2>
      <p class="page-subtitle">Calculate echo time based on physical object distance</p>
    </div>

    <div class="lab-interactive-view">
      <div class="form-group">
        <label>Target Distance: <span id="dist-val">50</span> cm</label>
        <input type="range" min="2" max="400" value="50" class="slider-control" id="dist-slider">
      </div>

      <div class="lab-result-display" id="dist-res">
        Distance: 50 cm<br>Echo Pulse Width ≈ 2900 μs
      </div>

      <button class="btn" id="btn-lab-back" style="width: 100%;">BACK TO LABS</button>
    </div>
  `;

  document.getElementById('btn-lab-back').onclick = showLab;
  const slider = document.getElementById('dist-slider');
  const valDisp = document.getElementById('dist-val');
  const res = document.getElementById('dist-res');

  slider.oninput = () => {
    const d = parseInt(slider.value, 10);
    valDisp.textContent = d;
    res.innerHTML = `Distance: ${d} cm<br>Echo Pulse Width ≈ ${(d * 58).toFixed(0)} μs`;
  };
}

function labLogic() {
  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">SIMULATOR 05</div>
      <h2 class="page-title">Digital Logic Gates</h2>
      <p class="page-subtitle">Test standard boolean logic functions with binary inputs</p>
    </div>

    <div class="lab-interactive-view">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
        <div class="form-group">
          <label>Input A</label>
          <select class="form-input" id="gate-a">
            <option value="0">0 (LOW)</option>
            <option value="1">1 (HIGH)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Input B</label>
          <select class="form-input" id="gate-b">
            <option value="0">0 (LOW)</option>
            <option value="1">1 (HIGH)</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Gate Function</label>
        <select class="form-input" id="gate-type">
          <option value="AND">AND Gate</option>
          <option value="OR">OR Gate</option>
          <option value="NAND">NAND Gate</option>
          <option value="NOR">NOR Gate</option>
          <option value="XOR">XOR Gate</option>
          <option value="XNOR">XNOR Gate</option>
        </select>
      </div>

      <div class="lab-result-display" id="gate-res">
        Output Y = 0 (LOW)
      </div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-gate-run" style="flex: 1;">EVALUATE</button>
        <button class="btn" id="btn-lab-back">BACK</button>
      </div>
    </div>
  `;

  document.getElementById('btn-lab-back').onclick = showLab;
  const runGate = () => {
    const a = parseInt(document.getElementById('gate-a').value, 10);
    const b = parseInt(document.getElementById('gate-b').value, 10);
    const g = document.getElementById('gate-type').value;
    let out = 0;

    if (g === "AND") out = a & b;
    else if (g === "OR") out = a | b;
    else if (g === "NAND") out = !(a & b) ? 1 : 0;
    else if (g === "NOR") out = !(a | b) ? 1 : 0;
    else if (g === "XOR") out = a ^ b;
    else if (g === "XNOR") out = !(a ^ b) ? 1 : 0;

    const res = document.getElementById('gate-res');
    res.innerHTML = `Output Y = ${out} (${out ? 'HIGH' : 'LOW'})`;
  };

  document.getElementById('btn-gate-run').onclick = runGate;
  document.getElementById('gate-a').onchange = runGate;
  document.getElementById('gate-b').onchange = runGate;
  document.getElementById('gate-type').onchange = runGate;
}

function labRc() {
  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">SIMULATOR 06</div>
      <h2 class="page-title">RC Transient Circuit</h2>
      <p class="page-subtitle">Simulate capacitor charge curve Vc(t) = Vs(1 - e^(-t/RC))</p>
    </div>

    <div class="lab-interactive-view">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div class="form-group">
          <label>Supply Voltage (V)</label>
          <input type="number" step="any" class="form-input" id="rc-v" value="5">
        </div>
        <div class="form-group">
          <label>Resistance (Ω)</label>
          <input type="number" step="any" class="form-input" id="rc-r" value="1000">
        </div>
        <div class="form-group">
          <label>Capacitance (F)</label>
          <input type="number" step="any" class="form-input" id="rc-c" value="0.001">
        </div>
        <div class="form-group">
          <label>Time Elapsed (s)</label>
          <input type="number" step="any" class="form-input" id="rc-t" value="1.0">
        </div>
      </div>

      <div class="lab-result-display" id="rc-res">
        Time Constant τ = 1.0000 s<br>Capacitor Voltage = 3.161 V (63.2% charged)
      </div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-rc-calc" style="flex: 1;">CALCULATE</button>
        <button class="btn" id="btn-lab-back">BACK</button>
      </div>
    </div>
  `;

  document.getElementById('btn-lab-back').onclick = showLab;
  document.getElementById('btn-rc-calc').onclick = () => {
    const v = parseFloat(document.getElementById('rc-v').value);
    const r = parseFloat(document.getElementById('rc-r').value);
    const c = parseFloat(document.getElementById('rc-c').value);
    const t = parseFloat(document.getElementById('rc-t').value);
    const res = document.getElementById('rc-res');

    const tau = r * c;
    const vc = v * (1 - Math.exp(-t / tau));
    const percent = (vc / v) * 100;

    res.innerHTML = `Time Constant τ = ${tau.toFixed(4)} s<br>Capacitor Voltage Vc = ${vc.toFixed(3)} V (${percent.toFixed(1)}% charged)`;
  };
}

// -------------------------------------------------------------
// PROGRESS & STATS
// -------------------------------------------------------------
function showProgress() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();
  const accuracy = state.total_questions 
    ? Math.round((state.correct_answers / state.total_questions) * 100) 
    : 0;

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">ANALYTICS</div>
      <h2 class="page-title">Performance Journey</h2>
      <p class="page-subtitle">Track your accuracy and review assessment history</p>
    </div>

    <div class="content-box" style="margin-bottom: 24px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; text-align: center;">
        <div class="stat-metric-card">
          <div class="stat-metric-label">CURRENT RANK</div>
          <div class="stat-metric-val">LVL ${getLevel()}</div>
        </div>
        <div class="stat-metric-card">
          <div class="stat-metric-label">TOTAL XP</div>
          <div class="stat-metric-val" style="color: var(--cyan);">${state.xp}</div>
        </div>
        <div class="stat-metric-card">
          <div class="stat-metric-label">ACCURACY</div>
          <div class="stat-metric-val" style="color: ${accuracy >= 70 ? 'var(--emerald)' : 'var(--amber)'};">${accuracy}%</div>
        </div>
        <div class="stat-metric-card">
          <div class="stat-metric-label">LESSONS</div>
          <div class="stat-metric-val" style="color: var(--accent);">
            ${(state.completed_lessons || []).length} / ${Object.keys(LESSONS).length}
          </div>
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-box-title">RECENT ASSESSMENT HISTORY</div>
      ${state.history.length === 0 ? `
        <p style="color: var(--text-muted); text-align: center; padding: 24px;">No assessment records yet. Take a quiz to track your history!</p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${state.history.slice(-8).reverse().map(h => `
            <div class="history-item">
              <span class="history-date">${h.date}</span>
              <span class="history-score">${h.correct} / ${h.total} Correct</span>
              <span class="history-badge" style="color: ${h.score >= 70 ? 'var(--emerald)' : 'var(--amber)'};">${h.score}%</span>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// -------------------------------------------------------------
// FORMULAS HUB
// -------------------------------------------------------------
function showFormulas() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">REFERENCE</div>
      <h2 class="page-title">Formula Hub</h2>
      <p class="page-subtitle">Essential engineering formulas for quick revision</p>
    </div>

    <div class="content-box" style="max-width: 960px; margin: 0 auto;">
      <div class="form-group" style="margin-bottom: 20px;">
        <input type="text" class="form-input" id="formula-search" placeholder="Search formulas by name or symbol...">
      </div>

      <div id="formula-list">
        ${renderFormulaItems(FORMULAS)}
      </div>
    </div>
  `;

  document.getElementById('formula-search').oninput = (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = FORMULAS.filter(f => 
      f.title.toLowerCase().includes(q) || 
      f.formula.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q)
    );
    document.getElementById('formula-list').innerHTML = renderFormulaItems(filtered);
  };
}

function renderFormulaItems(items) {
  if (items.length === 0) return `<div style="text-align: center; color: var(--text-muted); padding: 24px;">No formulas match your search.</div>`;
  return items.map(f => `
    <div class="formula-item">
      <div class="formula-title">${escapeHtml(f.title)}</div>
      <div class="formula-eq">${escapeHtml(f.formula)}</div>
      <div class="formula-desc">${escapeHtml(f.description)}</div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// BADGES
// -------------------------------------------------------------
function showBadges() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">MILESTONES</div>
      <h2 class="page-title">Achievements</h2>
      <p class="page-subtitle">${state.badges.length} of ${BADGES_DEF.length} unlocked</p>
    </div>

    <div class="badges-container">
      ${BADGES_DEF.map(b => {
        const unlocked = state.badges.includes(b.id);
        return `
          <div class="badge-tile ${unlocked ? 'unlocked' : 'locked'}">
            <div class="badge-tag-box">${b.icon}</div>
            <div>
              <div class="badge-name" style="color: ${unlocked ? 'var(--text-primary)' : 'var(--text-muted)'}">
                ${escapeHtml(b.id)}
              </div>
              <div class="badge-desc">${escapeHtml(b.desc)}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// -------------------------------------------------------------
// PROFILE & LOGOUT
// -------------------------------------------------------------
function showProfile() {
  if (!getCurrentUser()) { showAuthScreen('login'); return; }
  clearTimer();

  const userInitials = (state.profile.name || "ST")
    .split(" ")
    .map(n => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  appView.innerHTML = `
    <div class="page-header">
      <div class="section-tag">ACCOUNT SETTINGS</div>
      <h2 class="page-title">Student Profile</h2>
      <p class="page-subtitle">Manage personal academic credentials and authentication</p>
    </div>

    <div class="content-box" style="max-width: 520px; margin: 0 auto;">
      <div class="user-badge-profile">
        <div class="user-avatar-circle">${userInitials}</div>
        <div>
          <div style="font-weight: 800; font-size: 1.1rem; color: #FFF;">${escapeHtml(state.profile.name)}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">${escapeHtml(getCurrentUser())}</div>
        </div>
      </div>

      <div class="form-group">
        <label>FULL NAME</label>
        <input type="text" class="form-input" id="prof-name" value="${escapeHtml(state.profile.name)}">
      </div>
      <div class="form-group">
        <label>INSTITUTION</label>
        <input type="text" class="form-input" id="prof-college" value="${escapeHtml(state.profile.college)}">
      </div>
      <div class="form-group">
        <label>DEPARTMENT / BRANCH</label>
        <input type="text" class="form-input" id="prof-branch" value="${escapeHtml(state.profile.branch)}">
      </div>
      <div class="form-group">
        <label>ACADEMIC YEAR</label>
        <input type="text" class="form-input" id="prof-year" value="${escapeHtml(state.profile.year)}">
      </div>

      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button class="btn btn-primary" id="btn-save-profile" style="flex: 1;">
          SAVE CHANGES
        </button>
        <button class="btn" id="btn-logout" style="border-color: var(--rose); color: var(--rose);">
          ${ICONS.logout} SIGN OUT
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-save-profile').onclick = () => {
    state.profile.name = document.getElementById('prof-name').value.trim() || "Student";
    state.profile.college = document.getElementById('prof-college').value.trim() || "College";
    state.profile.branch = document.getElementById('prof-branch').value.trim() || "ECE";
    state.profile.year = document.getElementById('prof-year').value.trim() || "Year";
    saveUserData();
    showToast("Profile updated successfully!");
    setActiveTab('tab-home');
    showHome();
  };

  document.getElementById('btn-logout').onclick = () => {
    handleLogout();
  };
}

// Utility Functions
function shuffle(array, seed) {
  const arr = [...array];
  if (seed !== undefined) {
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } else {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Bottom Navigation Handler
function setActiveTab(tabId) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const activeBtn = document.getElementById(tabId);
  if (activeBtn) activeBtn.classList.add('active');
}

const tabHome = document.getElementById('tab-home');
const tabQuiz = document.getElementById('tab-quiz');
const tabLearn = document.getElementById('tab-learn');
const tabLab = document.getElementById('tab-lab');
const tabProfile = document.getElementById('tab-profile');

if (tabHome) tabHome.onclick = () => { setActiveTab('tab-home'); showHome(); };
if (tabQuiz) tabQuiz.onclick = () => { setActiveTab('tab-quiz'); showQuizSetup(); };
if (tabLearn) tabLearn.onclick = () => { setActiveTab('tab-learn'); showLearn(); };
if (tabLab) tabLab.onclick = () => { setActiveTab('tab-lab'); showLab(); };
if (tabProfile) tabProfile.onclick = () => { setActiveTab('tab-profile'); showProfile(); };

// Global Nav Listeners
document.getElementById('brand-home-btn').onclick = () => { setActiveTab('tab-home'); showHome(); };
const navHomeBtn = document.getElementById('nav-home-btn');
if (navHomeBtn) navHomeBtn.onclick = () => { setActiveTab('tab-home'); showHome(); };

// Initialize App: Check Auth First
startApp();
