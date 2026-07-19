/**
 * VocabMatch — Minimal Matching Game
 * Clean, no errors, single responsibility
 */

// ─── State ───────────────────────────────
const state = {
  level: 1,
  pairsPerLevel: 6,
  matched: 0,
  mistakes: 0,
  streak: 0,
  selected: null,
  locked: false,
  levelPairs: [],
  pool: [],
};

// ─── DOM References ───────────────────────
const dom = {
  cardGrid: document.getElementById('card-grid'),
  levelBadge: document.getElementById('level-badge'),
  progressFill: document.getElementById('progress-fill'),
  matchCount: document.getElementById('match-count'),
  streakEl: document.getElementById('streak'),
  mistakesEl: document.getElementById('mistakes'),
  message: document.getElementById('message'),
  overlay: document.getElementById('overlay'),
  winLevel: document.getElementById('win-level'),
  winMistakes: document.getElementById('win-mistakes'),
  btnNext: document.getElementById('btn-next'),
  toast: document.getElementById('toast'),
};

// ─── Utilities ───────────────────────────
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showMessage(text, type = '') {
  dom.message.textContent = text;
  dom.message.className = 'message ' + type;
  clearTimeout(dom.message._timeout);
  if (type) {
    dom.message._timeout = setTimeout(() => {
      dom.message.textContent = '';
      dom.message.className = 'message';
    }, 2000);
  }
}

// ─── Toast ───────────────────────────────
let toastTimer;
function showToast(text, type = '') {
  clearTimeout(toastTimer);
  dom.toast.textContent = text;
  dom.toast.className = 'toast show ' + type;
  toastTimer = setTimeout(() => {
    dom.toast.className = 'toast';
  }, 1800);
}

// ─── Sound Effects (Safe) ────────────────
function playSound(freq, type = 'sine', duration = 0.1, volume = 0.04) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silent fail — browser may block audio
  }
}

function soundClick() { playSound(800, 'sine', 0.08, 0.03); }
function soundMatch() { playSound(660, 'sine', 0.15, 0.06); }
function soundWrong() { playSound(180, 'square', 0.25, 0.05); }

// ─── Confetti ────────────────────────────
function spawnConfetti() {
  const colors = ['#6c5ce7', '#a29bfe', '#74b9ff', '#fd79a8', '#fdcb6e', '#00cec9'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    el.style.animationDelay = Math.random() * 0.6 + 's';
    el.style.width = (5 + Math.random() * 8) + 'px';
    el.style.height = (5 + Math.random() * 8) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// ─── HUD ─────────────────────────────────
function updateHUD() {
  dom.streakEl.textContent = state.streak;
  dom.mistakesEl.textContent = state.mistakes;
}

function updateProgress() {
  const pct = (state.matched / state.pairsPerLevel) * 100;
  dom.progressFill.style.width = pct + '%';
  dom.matchCount.textContent = `${state.matched}/${state.pairsPerLevel}`;
}

// ─── Initialize Game ─────────────────────
function initGame() {
  if (typeof VOCAB_BANK === 'undefined') {
    console.error('VOCAB_BANK not found. Make sure vocab-data.js is loaded first.');
    dom.cardGrid.innerHTML = '<p style="color:var(--danger);text-align:center;">Error: Vocabulary data not loaded.</p>';
    return;
  }
  
  state.pool = shuffle([...VOCAB_BANK]);
  state.level = 1;
  state.mistakes = 0;
  state.streak = 0;
  updateHUD();
  startLevel();
}

// ─── Start Level ─────────────────────────
function startLevel() {
  state.matched = 0;
  state.selected = null;
  state.locked = false;

  // Refill pool if needed
  if (state.pool.length < state.pairsPerLevel) {
    state.pool = shuffle([...VOCAB_BANK]);
  }

  state.levelPairs = state.pool.splice(0, state.pairsPerLevel);

  dom.levelBadge.textContent = `Level ${state.level}`;
  updateProgress();
  updateHUD();
  showMessage('', '');
  renderBoard();
}

function renderBoard() {
  dom.cardGrid.innerHTML = '';

  // Create card pairs
  const cards = [];
  state.levelPairs.forEach((pair, index) => {
    cards.push({ id: index, type: 'en', text: pair.en });
    cards.push({ id: index, type: 'th', text: pair.th });
  });

  // Shuffle and render with type
  shuffle(cards).forEach((card) => {
    const el = document.createElement('div');
    el.className = `card ${card.type}`;
    el.dataset.pairId = card.id;
    el.dataset.type = card.type;

    // Get type label from pair data
    const vocab = state.levelPairs[card.id];
    const typeLabel = vocab ? vocab.type : '';

    el.innerHTML = `
      <span class="card-text">${card.text}</span>
      <span class="card-type">${typeLabel}</span>
    `;

    el.addEventListener('click', () => handleCardClick(el, card));
    dom.cardGrid.appendChild(el);
  });
}

// ─── Handle Card Click ───────────────────
function handleCardClick(el, card) {
  // Guard conditions
  if (state.locked) return;
  if (el.classList.contains('hidden')) return;
  if (el.classList.contains('matched')) return;
  
  // Clicking same card — deselect
  if (state.selected && state.selected.el === el) {
    el.classList.remove('selected');
    state.selected = null;
    soundClick();
    return;
  }

  soundClick();
  el.classList.add('selected');

  // First card selected
  if (!state.selected) {
    state.selected = { el, card };
    return;
  }

  // Two cards selected
  const first = state.selected;

  // Same type — switch selection
  if (first.card.type === card.type) {
    first.el.classList.remove('selected');
    state.selected = { el, card };
    return;
  }

  // Different types — check match
  checkMatch(first, { el, card });
}

// ─── Check Match ─────────────────────────
function checkMatch(first, second) {
  state.locked = true;

  if (first.card.id === second.card.id) {
    // ✅ Match!
    state.matched++;
    state.streak++;
    updateHUD();
    updateProgress();
    soundMatch();

    first.el.classList.remove('selected');
    second.el.classList.remove('selected');
    first.el.classList.add('matched');
    second.el.classList.add('matched');

    setTimeout(() => {
      first.el.classList.add('hidden');
      second.el.classList.add('hidden');
    }, 400);

    const streakMsg = state.streak > 1 ? ` 🔥 Streak ×${state.streak}` : '';
    showMessage(`✅ Matched!${streakMsg}`, 'correct');
    showToast(`Matched!${streakMsg}`, 'success');

    state.selected = null;
    state.locked = false;

    // Check level complete
    if (state.matched === state.pairsPerLevel) {
      setTimeout(showWin, 500);
    }
  } else {
    // ❌ Wrong!
    state.mistakes++;
    state.streak = 0;
    updateHUD();
    soundWrong();

    first.el.classList.add('wrong');
    second.el.classList.add('wrong');
    showMessage('❌ Try again!', 'wrong');
    showToast('Try again!', 'error');

    setTimeout(() => {
      first.el.classList.remove('selected', 'wrong');
      second.el.classList.remove('selected', 'wrong');
      state.selected = null;
      state.locked = false;
    }, 500);
  }
}

// ─── Show Win ────────────────────────────
function showWin() {
  dom.winLevel.textContent = `Level ${state.level} Complete!`;
  dom.winMistakes.textContent = state.mistakes;
  dom.overlay.classList.add('show');
  spawnConfetti();
}

// ─── Next Level ──────────────────────────
function nextLevel() {
  dom.overlay.classList.remove('show');
  state.level++;
  startLevel();
}

// ─── Event Bindings ──────────────────────
function bindEvents() {
  dom.btnNext.addEventListener('click', nextLevel);

  // Keyboard shortcut: Enter to proceed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && dom.overlay.classList.contains('show')) {
      nextLevel();
    }
  });
}

// ─── Start ───────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  initGame();
});
