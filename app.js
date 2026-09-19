import { QUESTIONS, LESSONS, FORMULAS, BADGES_DEF } from './data.js';

const STORAGE_KEY = 'ece_quest_pro_web_data';

// Default State
function getDefaultData() {
  return {
    profile: {
      name: "Rushanth",
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

let state = loadData();
let quizTimerInterval = null;

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw);
    const def = getDefaultData();
    return {
      ...def,
      ...parsed,
      profile: { ...def.profile, ...(parsed.profile || {}) }
    };
  } catch (e) {
    return getDefaultData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateHeaderStats();
}

function getLevel() {
  return Math.floor(state.xp / 500) + 1;
}

function getLevelXP() {
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
  let newUnlock = false;
  BADGES_DEF.forEach(b => {
    if (!state.badges.includes(b.id) && b.cond(state)) {
      state.badges.push(b.id);
      showToast(`🏆 <b>BADGE UNLOCKED!</b><br>${b.icon} ${b.id}`);
      newUnlock = true;
    }
  });
  if (newUnlock) saveData();
}

// Update Top Bar
function updateHeaderStats() {
  document.getElementById('hdr-level').textContent = getLevel();
  document.getElementById('hdr-xp').textContent = state.xp;
  document.getElementById('hdr-streak').textContent = `${state.streak} 🔥`;
}

// App Container
const appView = document.getElementById('app-view');

function clearTimer() {
  if (quizTimerInterval) {
    clearInterval(quizTimerInterval);
    quizTimerInterval = null;
  }
}

// -------------------------------------------------------------
// NAVIGATION: HOME
// -------------------------------------------------------------
export function showHome() {
  clearTimer();
  updateHeaderStats();

  const accuracy = state.total_questions 
    ? Math.round((state.correct_answers / state.total_questions) * 100) 
    : 0;

  appView.innerHTML = `
    <div class="hero-section">
      <h1 class="hero-title">Welcome back, ${escapeHtml(state.profile.name)} 👋</h1>
      <p class="hero-subtitle">Learn • Practice • Build • Master</p>
    </div>

    <div class="level-bar-card">
      <div class="level-bar-header">
        <span style="color: var(--cyan)">LEVEL ${getLevel()}</span>
        <span style="color: var(--muted)">${getLevelXP()} / 500 XP</span>
      </div>
      <div class="level-track">
        <div class="level-fill" style="width: ${Math.max(2, getLevelPercent())}%"></div>
      </div>
    </div>

    <!-- Primary Actions Grid -->
    <div class="action-grid-primary">
      <div class="action-card" id="btn-action-quiz">
        <div class="action-icon" style="color: var(--accent)">▶</div>
        <div class="action-title">START QUIZ</div>
        <div class="action-desc">Challenge your ECE knowledge with timed questions</div>
      </div>
      <div class="action-card" id="btn-action-learn">
        <div class="action-icon">📚</div>
        <div class="action-title">LEARN</div>
        <div class="action-desc">Explore 10 curated core ECE syllabus topics</div>
      </div>
      <div class="action-card" id="btn-action-lab">
        <div class="action-icon">🧪</div>
        <div class="action-title">ECE LAB</div>
        <div class="action-desc">Interactive virtual experiments & simulators</div>
      </div>
      <div class="action-card" id="btn-action-progress">
        <div class="action-icon">📊</div>
        <div class="action-title">MY JOURNEY</div>
        <div class="action-desc">View accuracy, recent quiz scores & history</div>
      </div>
    </div>

    <!-- Secondary Actions Grid -->
    <div class="action-grid-secondary">
      <div class="action-card-small" id="btn-action-formulas">
        <span>🧮</span> FORMULA HUB
      </div>
      <div class="action-card-small" id="btn-action-daily">
        <span>📅</span> DAILY CHALLENGE
      </div>
      <div class="action-card-small" id="btn-action-badges">
        <span>🏆</span> BADGES (${state.badges.length}/${BADGES_DEF.length})
      </div>
      <div class="action-card-small" id="btn-action-profile">
        <span>👤</span> PROFILE
      </div>
    </div>

    <!-- Bottom Quick Metrics -->
    <div class="bottom-stats-row">
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">TOTAL ANSWERED</div>
        <div class="bottom-stat-val">${state.total_questions}</div>
      </div>
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">ACCURACY</div>
        <div class="bottom-stat-val" style="color: ${accuracy >= 70 ? 'var(--green)' : 'var(--yellow)'}">${accuracy}%</div>
      </div>
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">QUIZZES COMPLETED</div>
        <div class="bottom-stat-val">${state.quizzes}</div>
      </div>
      <div class="bottom-stat-item">
        <div class="bottom-stat-label">BEST SCORE</div>
        <div class="bottom-stat-val" style="color: var(--cyan)">${state.best_score}%</div>
      </div>
    </div>
  `;

  document.getElementById('btn-action-quiz').onclick = showQuizSetup;
  document.getElementById('btn-action-learn').onclick = showLearn;
  document.getElementById('btn-action-lab').onclick = showLab;
  document.getElementById('btn-action-progress').onclick = showProgress;
  document.getElementById('btn-action-formulas').onclick = showFormulas;
  document.getElementById('btn-action-daily').onclick = startDaily;
  document.getElementById('btn-action-badges').onclick = showBadges;
  document.getElementById('btn-action-profile').onclick = showProfile;
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
  clearTimer();
  const topics = [...new Set(QUESTIONS.map(q => q.topic))];

  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">⚡ QUIZ ARENA</h2>
      <p class="page-subtitle">Select a topic or launch a custom challenge</p>
    </div>

    <div class="content-box" style="margin-bottom: 24px;">
      <h3 style="margin-bottom: 14px; font-size: 1.1rem; color: var(--cyan);">CHOOSE BY TOPIC (10 Questions Each)</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
        ${topics.map(t => `
          <button class="btn topic-pick-btn" data-topic="${t}" style="text-align: left; justify-content: flex-start;">
            🔹 ${t}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="content-box">
      <h3 style="margin-bottom: 14px; font-size: 1.1rem; color: var(--cyan);">CUSTOM CHALLENGE</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
        <div class="form-group">
          <label>DIFFICULTY</label>
          <select class="form-input" id="custom-diff">
            <option value="Mixed">Mixed (All Levels)</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
        <div class="form-group">
          <label>NUMBER OF QUESTIONS</label>
          <select class="form-input" id="custom-count">
            <option value="5">5 Questions</option>
            <option value="10" selected>10 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" id="start-custom-btn" style="width: 100%;">
        ▶ START CHALLENGE
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
    alert("No questions available for this selection.");
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
          <span style="color: var(--cyan); font-weight: 700;">QUESTION ${activeQuizIndex + 1} OF ${total}</span>
          <span style="color: var(--muted); margin-left: 10px;">[${q.topic} • ${q.difficulty}]</span>
        </div>
        <div class="quiz-timer" id="timer-display">⏱ 30s</div>
      </div>

      <div class="question-text">${escapeHtml(q.q)}</div>

      <div class="options-grid" id="opts-container">
        ${q.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">
            <span class="opt-badge">${String.fromCharCode(65 + i)}</span>
            <span>${escapeHtml(opt)}</span>
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
      timerDisplay.textContent = `⏱ ${activeTimerSeconds}s`;
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
  saveData();
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
      <div style="font-weight: 700; margin-bottom: 6px; color: ${isCorrect ? 'var(--green)' : 'var(--red)'}">
        ${isCorrect ? '✓ Correct! +100 XP' : isTimeout ? '⏱ Time expired!' : '✗ Incorrect!'}
      </div>
      <div>${escapeHtml(q.exp)}</div>
    </div>
    <div style="text-align: right;">
      <button class="btn btn-primary" id="next-q-btn">
        ${activeQuizIndex + 1 < activeQuizQuestions.length ? 'NEXT QUESTION →' : 'FINISH QUIZ →'}
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

  state.history.push({
    date: new Date().toISOString().split('T')[0],
    correct: activeQuizCorrect,
    total: total,
    score: scorePercent
  });

  saveData();
  checkBadges();

  appView.innerHTML = `
    <div class="content-box" style="text-align: center; max-width: 600px;">
      <h2 style="font-size: 2rem; margin-bottom: 10px;">QUIZ COMPLETE!</h2>
      <p style="color: var(--muted); margin-bottom: 20px;">Great effort on completing your session</p>

      <div class="score-badge-circle">
        <span class="score-num">${scorePercent}%</span>
      </div>

      <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">
        ${activeQuizCorrect} / ${total} Correct
      </div>
      <div style="color: var(--green); font-weight: 700; margin-bottom: 25px;">
        +${activeQuizXP} XP Earned
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" id="btn-quiz-again">🔄 AGAIN</button>
        <button class="btn" id="btn-quiz-progress">📊 PROGRESS</button>
        <button class="btn" id="btn-quiz-home">⌂ HOME</button>
      </div>
    </div>
  `;

  document.getElementById('btn-quiz-again').onclick = showQuizSetup;
  document.getElementById('btn-quiz-progress').onclick = showProgress;
  document.getElementById('btn-quiz-home').onclick = showHome;
}

// -------------------------------------------------------------
// DAILY CHALLENGE
// -------------------------------------------------------------
function startDaily() {
  clearTimer();
  const today = new Date().toISOString().split('T')[0];

  if (state.daily_date !== today) {
    state.daily_date = today;
    state.daily_done = false;
    state.daily_score = 0;
    saveData();
  }

  if (state.daily_done) {
    alert(`Today's daily challenge is already completed! Score: ${state.daily_score}%`);
    return;
  }

  // Seed daily questions deterministically using today's date
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
        <h2 class="page-title" style="color: var(--yellow);">📅 DAILY CHALLENGE</h2>
        <p class="page-subtitle">Question ${activeQuizIndex + 1} of ${total} (+150 XP each)</p>
      </div>

      <div class="question-text">${escapeHtml(q.q)}</div>

      <div class="options-grid">
        ${q.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">
            <span class="opt-badge">${String.fromCharCode(65 + i)}</span>
            <span>${escapeHtml(opt)}</span>
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
        alert(`✓ Correct!\n\n${q.exp}\n\n+150 XP`);
      } else {
        state.streak = 0;
        alert(`✗ Incorrect!\n\nCorrect answer: ${q.options[q.answer]}\n\n${q.exp}`);
      }
      saveData();
      checkBadges();

      activeQuizIndex++;
      if (activeQuizIndex < activeQuizQuestions.length) {
        renderDailyQuestion();
      } else {
        state.daily_done = true;
        state.daily_score = Math.round((activeQuizCorrect / activeQuizQuestions.length) * 100);
        saveData();
        showHome();
      }
    };
  });
}

// -------------------------------------------------------------
// LEARN HUB
// -------------------------------------------------------------
function showLearn() {
  clearTimer();
  const lessonEntries = Object.entries(LESSONS);

  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">📚 ECE LEARNING HUB</h2>
      <p class="page-subtitle">Choose a topic to review core definitions & theoretical principles</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 16px;">
      ${lessonEntries.map(([name, item]) => {
        const completed = (state.completed_lessons || []).includes(name);
        return `
          <div class="action-card" data-lesson="${name}" style="text-align: left; align-items: flex-start;">
            <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 10px;">
              <span style="font-size: 2rem;">${item.icon}</span>
              ${completed ? `<span style="color: var(--green); font-weight: 700; font-size: 0.8rem;">✓ COMPLETED</span>` : ''}
            </div>
            <div class="action-title">${escapeHtml(name)}</div>
            <div class="action-desc">${item.sections.length} core subtopics covered</div>
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
      <h2 class="page-title">${lesson.icon} ${escapeHtml(lessonName)}</h2>
      <p class="page-subtitle">Syllabus Topic Notes & Explanations</p>
    </div>

    <div class="content-box" style="max-width: 800px; margin-bottom: 20px;">
      ${lesson.sections.map(sec => `
        <div style="margin-bottom: 22px; padding-bottom: 16px; border-bottom: 1px solid rgba(27, 53, 80, 0.5);">
          <h3 style="color: var(--cyan); font-size: 1.15rem; margin-bottom: 8px;">${escapeHtml(sec.title)}</h3>
          <p style="color: #E2E8F0; line-height: 1.6; font-size: 0.95rem;">${escapeHtml(sec.content)}</p>
        </div>
      `).join('')}

      <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center; margin-top: 25px; flex-wrap: wrap;">
        <button class="btn" id="btn-back-learn">← BACK TO TOPICS</button>
        <button class="btn ${isCompleted ? 'btn-green' : 'btn-primary'}" id="btn-mark-completed">
          ${isCompleted ? '✓ COMPLETED' : 'MARK AS COMPLETED (+50 XP)'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-back-learn').onclick = showLearn;
  document.getElementById('btn-mark-completed').onclick = () => {
    if (!state.completed_lessons.includes(lessonName)) {
      state.completed_lessons.push(lessonName);
      state.xp += 50;
      saveData();
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
  clearTimer();

  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">🧪 VIRTUAL ECE LAB</h2>
      <p class="page-subtitle">Interactive hardware circuits, sensor calculators, and logic simulators</p>
    </div>

    <div class="lab-grid">
      <div class="lab-item-card" id="lab-ohm-card">
        <div>
          <div style="font-size: 2rem; margin-bottom: 10px;">⚡</div>
          <div class="action-title">OHM'S LAW</div>
          <div class="action-desc">Calculate V, I, or R dynamically from two inputs</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB →</button>
      </div>

      <div class="lab-item-card" id="lab-led-card">
        <div>
          <div style="font-size: 2rem; margin-bottom: 10px;">💡</div>
          <div class="action-title">LED CIRCUIT</div>
          <div class="action-desc">Determine suitable current-limiting resistor values</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB →</button>
      </div>

      <div class="lab-item-card" id="lab-ldr-card">
        <div>
          <div style="font-size: 2rem; margin-bottom: 10px;">☀</div>
          <div class="action-title">LDR SENSOR</div>
          <div class="action-desc">Light level vs photoresistor resistance simulator</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB →</button>
      </div>

      <div class="lab-item-card" id="lab-ultrasonic-card">
        <div>
          <div style="font-size: 2rem; margin-bottom: 10px;">📏</div>
          <div class="action-title">HC-SR04 ULTRASONIC</div>
          <div class="action-desc">Echo timing and distance calculation simulation</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB →</button>
      </div>

      <div class="lab-item-card" id="lab-logic-card">
        <div>
          <div style="font-size: 2rem; margin-bottom: 10px;">🔢</div>
          <div class="action-title">LOGIC GATES</div>
          <div class="action-desc">Interactive 2-input boolean logic gates truth-tester</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB →</button>
      </div>

      <div class="lab-item-card" id="lab-rc-card">
        <div>
          <div style="font-size: 2rem; margin-bottom: 10px;">〰️</div>
          <div class="action-title">RC TRANSIENT</div>
          <div class="action-desc">Capacitor charge curves and time-constant (τ) tool</div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px;">LAUNCH LAB →</button>
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
      <h2 class="page-title">⚡ OHM'S LAW CALCULATOR</h2>
      <p class="page-subtitle">Enter any two values to compute the missing variable</p>
    </div>

    <div class="lab-interactive-view">
      <div class="form-group">
        <label>Voltage (V)</label>
        <input type="number" step="any" class="form-input" id="ohm-v" placeholder="e.g. 12">
      </div>
      <div class="form-group">
        <label>Current (A)</label>
        <input type="number" step="any" class="form-input" id="ohm-i" placeholder="e.g. 0.5">
      </div>
      <div class="form-group">
        <label>Resistance (Ω)</label>
        <input type="number" step="any" class="form-input" id="ohm-r" placeholder="e.g. 24">
      </div>

      <div class="lab-result-display" id="ohm-res">Enter any two values above</div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-ohm-calc" style="flex: 1;">CALCULATE</button>
        <button class="btn" id="btn-lab-back">← LABS</button>
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
      res.style.color = "var(--red)";
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
      <h2 class="page-title">💡 LED CURRENT-LIMITING RESISTOR</h2>
      <p class="page-subtitle">Protect LEDs from overcurrent burnouts</p>
    </div>

    <div class="lab-interactive-view">
      <div class="form-group">
        <label>Supply Voltage (Vs in Volts)</label>
        <input type="number" step="any" class="form-input" id="led-vs" value="5">
      </div>
      <div class="form-group">
        <label>LED Forward Voltage (Vf in Volts, e.g. 2.0V for Red)</label>
        <input type="number" step="any" class="form-input" id="led-vf" value="2.0">
      </div>
      <div class="form-group">
        <label>Desired Forward Current (If in Amperes, e.g. 0.02A for 20mA)</label>
        <input type="number" step="any" class="form-input" id="led-if" value="0.02">
      </div>

      <div class="lab-result-display" id="led-res">Recommended Resistor: R ≈ 150 Ω</div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-led-calc" style="flex: 1;">CALCULATE</button>
        <button class="btn" id="btn-lab-back">← LABS</button>
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
      res.style.color = "var(--red)";
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
      <h2 class="page-title">☀ LDR LIGHT SENSOR SIMULATOR</h2>
      <p class="page-subtitle">Drag the slider to adjust ambient light intensity</p>
    </div>

    <div class="lab-interactive-view">
      <div class="form-group">
        <label>Ambient Light: <span id="ldr-val">50</span>%</label>
        <input type="range" min="0" max="100" value="50" class="slider-control" id="ldr-slider">
      </div>

      <div class="lab-result-display" id="ldr-res">
        Light Level: 50%<br>🌥️ MEDIUM LIGHT
      </div>

      <button class="btn" id="btn-lab-back" style="width: 100%;">← BACK TO LABS</button>
    </div>
  `;

  document.getElementById('btn-lab-back').onclick = showLab;
  const slider = document.getElementById('ldr-slider');
  const valDisp = document.getElementById('ldr-val');
  const res = document.getElementById('ldr-res');

  slider.oninput = () => {
    const val = parseInt(slider.value, 10);
    valDisp.textContent = val;
    let desc = "☀️ BRIGHT (Low Resistance)";
    if (val < 25) desc = "🌑 DARK (High Resistance)";
    else if (val < 65) desc = "🌥️ MEDIUM LIGHT (Moderate Resistance)";
    res.innerHTML = `Light Level: ${val}%<br>${desc}`;
  };
}

function labUltrasonic() {
  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">📏 HC-SR04 ULTRASONIC SENSOR</h2>
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

      <button class="btn" id="btn-lab-back" style="width: 100%;">← BACK TO LABS</button>
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
      <h2 class="page-title">🔢 DIGITAL LOGIC GATES</h2>
      <p class="page-subtitle">Test standard digital logic functions with binary inputs</p>
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
        <label>Gate Type</label>
        <select class="form-input" id="gate-type">
          <option value="AND">AND Gate</option>
          <option value="OR">OR Gate</option>
          <option value="NAND">NAND Gate (Universal)</option>
          <option value="NOR">NOR Gate (Universal)</option>
          <option value="XOR">XOR Gate</option>
          <option value="XNOR">XNOR Gate</option>
        </select>
      </div>

      <div class="lab-result-display" id="gate-res">
        Output Y = 0 (LOW)
      </div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-gate-run" style="flex: 1;">RUN GATE</button>
        <button class="btn" id="btn-lab-back">← LABS</button>
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
    res.innerHTML = `Output Y = ${out} (${out ? 'HIGH 💡' : 'LOW 🌑'})`;
  };

  document.getElementById('btn-gate-run').onclick = runGate;
  document.getElementById('gate-a').onchange = runGate;
  document.getElementById('gate-b').onchange = runGate;
  document.getElementById('gate-type').onchange = runGate;
}

function labRc() {
  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">〰️ RC CIRCUIT TRANSIENT</h2>
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
          <label>Capacitance (F, e.g. 0.001)</label>
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
        <button class="btn" id="btn-lab-back">← LABS</button>
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
  clearTimer();
  const accuracy = state.total_questions 
    ? Math.round((state.correct_answers / state.total_questions) * 100) 
    : 0;

  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">📊 MY JOURNEY</h2>
      <p class="page-subtitle">Track your performance and recent quiz activity</p>
    </div>

    <div class="content-box" style="margin-bottom: 24px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; text-align: center;">
        <div class="stat-pill" style="justify-content: center; flex-direction: column; padding: 12px;">
          <div class="label">CURRENT LEVEL</div>
          <div class="value" style="font-size: 1.4rem;">${getLevel()}</div>
        </div>
        <div class="stat-pill" style="justify-content: center; flex-direction: column; padding: 12px;">
          <div class="label">TOTAL XP</div>
          <div class="value" style="font-size: 1.4rem; color: var(--accent);">${state.xp}</div>
        </div>
        <div class="stat-pill" style="justify-content: center; flex-direction: column; padding: 12px;">
          <div class="label">ACCURACY</div>
          <div class="value" style="font-size: 1.4rem; color: var(--green);">${accuracy}%</div>
        </div>
        <div class="stat-pill" style="justify-content: center; flex-direction: column; padding: 12px;">
          <div class="label">LESSONS COMPLETED</div>
          <div class="value" style="font-size: 1.4rem; color: var(--cyan);">
            ${(state.completed_lessons || []).length} / ${Object.keys(LESSONS).length}
          </div>
        </div>
      </div>
    </div>

    <div class="content-box">
      <h3 style="margin-bottom: 14px; font-size: 1.1rem; color: var(--cyan);">RECENT QUIZ HISTORY</h3>
      ${state.history.length === 0 ? `
        <p style="color: var(--muted); text-align: center; padding: 20px;">No quizzes taken yet. Start a quiz to see your history!</p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${state.history.slice(-6).reverse().map(h => `
            <div style="background: var(--panel-2); padding: 12px 18px; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
              <span style="color: var(--muted); font-size: 0.9rem;">${h.date}</span>
              <span style="font-weight: 700;">${h.correct} / ${h.total} Correct</span>
              <span style="color: ${h.score >= 70 ? 'var(--green)' : 'var(--yellow)'}; font-weight: 800;">${h.score}%</span>
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
  clearTimer();

  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">🧮 ECE FORMULA HUB</h2>
      <p class="page-subtitle">Essential engineering formulas for rapid revision</p>
    </div>

    <div class="content-box" style="max-width: 960px;">
      <div class="form-group" style="margin-bottom: 20px;">
        <input type="text" class="form-input" id="formula-search" placeholder="🔍 Search formulas by name or symbol...">
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
  if (items.length === 0) return `<div style="text-align: center; color: var(--muted); padding: 20px;">No formulas match your search.</div>`;
  return items.map(f => `
    <div class="formula-item">
      <div style="font-weight: 700; color: #FFF;">${escapeHtml(f.title)}</div>
      <div class="formula-eq">${escapeHtml(f.formula)}</div>
      <div style="color: var(--muted); font-size: 0.85rem;">${escapeHtml(f.description)}</div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// BADGES
// -------------------------------------------------------------
function showBadges() {
  clearTimer();

  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">🏆 ACHIEVEMENTS & BADGES</h2>
      <p class="page-subtitle">${state.badges.length} of ${BADGES_DEF.length} badges unlocked</p>
    </div>

    <div class="badges-container">
      ${BADGES_DEF.map(b => {
        const unlocked = state.badges.includes(b.id);
        return `
          <div class="badge-tile ${unlocked ? 'unlocked' : 'locked'}">
            <div class="badge-icon-box">${unlocked ? b.icon : '🔒'}</div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; color: ${unlocked ? '#FFF' : 'var(--muted)'}">
                ${escapeHtml(b.id)}
              </div>
              <div style="font-size: 0.8rem; color: var(--muted);">${escapeHtml(b.desc)}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// -------------------------------------------------------------
// PROFILE
// -------------------------------------------------------------
function showProfile() {
  clearTimer();

  appView.innerHTML = `
    <div class="page-header">
      <h2 class="page-title">👤 STUDENT PROFILE</h2>
      <p class="page-subtitle">Manage your local student information</p>
    </div>

    <div class="content-box" style="max-width: 550px;">
      <div class="form-group">
        <label>FULL NAME</label>
        <input type="text" class="form-input" id="prof-name" value="${escapeHtml(state.profile.name)}">
      </div>
      <div class="form-group">
        <label>COLLEGE / UNIVERSITY</label>
        <input type="text" class="form-input" id="prof-college" value="${escapeHtml(state.profile.college)}">
      </div>
      <div class="form-group">
        <label>BRANCH / MAJOR</label>
        <input type="text" class="form-input" id="prof-branch" value="${escapeHtml(state.profile.branch)}">
      </div>
      <div class="form-group">
        <label>ACADEMIC YEAR</label>
        <input type="text" class="form-input" id="prof-year" value="${escapeHtml(state.profile.year)}">
      </div>

      <button class="btn btn-primary" id="btn-save-profile" style="width: 100%; margin-top: 10px;">
        💾 SAVE PROFILE
      </button>
    </div>
  `;

  document.getElementById('btn-save-profile').onclick = () => {
    state.profile.name = document.getElementById('prof-name').value.trim() || "Student";
    state.profile.college = document.getElementById('prof-college').value.trim();
    state.profile.branch = document.getElementById('prof-branch').value.trim();
    state.profile.year = document.getElementById('prof-year').value.trim();
    saveData();
    showToast("✓ Profile updated successfully!");
    showHome();
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

// Global Nav Listeners
document.getElementById('brand-home-btn').onclick = showHome;
document.getElementById('nav-home-btn').onclick = showHome;

// Initialize
showHome();
