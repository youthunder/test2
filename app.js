import { SENTENCE_DATA } from './data.js';

/* ==========================================================================
   APP STATE & INITIALIZATION
   ========================================================================== */

class SentenceApp {
  constructor() {
    this.currentCategory = 'pro';
    this.currentQuestionIndex = 0;
    this.placedChunkIds = [];
    this.availableChunkOrder = [];
    
    // Persistent Storage
    this.completedQuestionIds = new Set(
      JSON.parse(localStorage.getItem('food_passport_completed') || '[]')
    );
    this.soundEnabled = localStorage.getItem('food_passport_sound') !== 'false';

    // Audio Context
    this.audioCtx = null;

    // DOM Elements Cache
    this.initElements();
    this.bindEvents();
    this.initConfetti();
    this.renderCategory();
    this.updateStampBookBadge();
  }

  initElements() {
    this.body = document.body;
    this.boardCard = document.getElementById('game-board-card');
    this.stampOverlay = document.getElementById('stamp-overlay');
    this.stampCountryCode = document.getElementById('stamp-country-code');
    this.stampDateText = document.getElementById('stamp-date-text');

    // Header & Meta
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.soundIcon = document.getElementById('sound-icon');
    this.soundText = document.getElementById('sound-text');
    this.headerStampBadge = document.getElementById('header-stamp-badge');
    this.openPassportBookBtn = document.getElementById('open-passport-book-btn');

    // Tabs & Progress
    this.tabs = document.querySelectorAll('.tab-btn');
    this.categoryBadgeName = document.getElementById('category-badge-name');
    this.currentQIndexSpan = document.getElementById('current-q-index');
    this.categoryProgressText = document.getElementById('category-progress-text');
    this.progressFillBar = document.getElementById('progress-fill-bar');
    this.stepDots = document.querySelectorAll('.step-dot');
    this.statPills = {
      pro: document.getElementById('pro-stat-pill'),
      neutral: document.getElementById('neutral-stat-pill'),
      con: document.getElementById('con-stat-pill')
    };

    // Card Content
    this.cardCountryPill = document.getElementById('card-country-pill');
    this.cardDishName = document.getElementById('card-dish-name');
    this.koreanSentenceText = document.getElementById('korean-sentence-text');
    this.sentenceDropzone = document.getElementById('sentence-dropzone');
    this.dropzoneEmptyMsg = document.getElementById('dropzone-empty-msg');
    this.piecesPool = document.getElementById('pieces-pool');

    // Hint Drawer
    this.btnToggleHint = document.getElementById('btn-toggle-hint');
    this.hintDrawer = document.getElementById('hint-drawer');
    this.btnCloseHint = document.getElementById('btn-close-hint');
    this.hintFormulaText = document.getElementById('hint-formula-text');
    this.hintBreakdownText = document.getElementById('hint-breakdown-text');
    this.hintChunkTips = document.getElementById('hint-chunk-tips');

    // Feedback & TTS
    this.feedbackBanner = document.getElementById('feedback-banner');
    this.feedbackIcon = document.getElementById('feedback-icon');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackDesc = document.getElementById('feedback-desc');
    this.ttsPlayerCard = document.getElementById('tts-player-card');
    this.ttsFullSentence = document.getElementById('tts-full-sentence');
    this.btnSpeakSentence = document.getElementById('btn-speak-sentence');

    // Buttons
    this.btnClearSlot = document.getElementById('btn-clear-slot');
    this.btnShufflePool = document.getElementById('btn-shuffle-pool');
    this.btnResetCurrent = document.getElementById('btn-reset-current');
    this.btnCheckAnswer = document.getElementById('btn-check-answer');
    this.btnNextQuestion = document.getElementById('btn-next-question');

    // Modal
    this.passportModal = document.getElementById('passport-modal');
    this.btnCloseModal = document.getElementById('btn-close-modal');
    this.stampBookGrid = document.getElementById('stamp-book-grid');

    // Canvas
    this.confettiCanvas = document.getElementById('confetti-canvas');
  }

  bindEvents() {
    // Sound Toggle
    this.soundToggleBtn.addEventListener('click', () => this.toggleSound());

    // Tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetCategory = tab.dataset.tab;
        if (targetCategory && targetCategory !== this.currentCategory) {
          this.switchCategory(targetCategory);
        }
      });
    });

    // Step Dots
    this.stepDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index, 10);
        if (!isNaN(idx) && idx !== this.currentQuestionIndex) {
          this.jumpToQuestion(idx);
        }
      });
    });

    // Hint Trigger
    this.btnToggleHint.addEventListener('click', () => this.toggleHint());
    this.btnCloseHint.addEventListener('click', () => this.toggleHint(false));

    // Game Actions
    this.btnClearSlot.addEventListener('click', () => this.clearSlot());
    this.btnShufflePool.addEventListener('click', () => this.shufflePool());
    this.btnResetCurrent.addEventListener('click', () => this.resetQuestion());
    this.btnCheckAnswer.addEventListener('click', () => this.checkAnswer());
    this.btnNextQuestion.addEventListener('click', () => this.nextQuestion());

    // TTS Speak
    this.btnSpeakSentence.addEventListener('click', () => this.speakCurrentSentence());

    // Modal
    this.openPassportBookBtn.addEventListener('click', () => this.openPassportBook());
    this.btnCloseModal.addEventListener('click', () => this.closePassportBook());
    this.passportModal.addEventListener('click', (e) => {
      if (e.target === this.passportModal) this.closePassportBook();
    });

    // Keyboard Shortcuts (Space/Enter to check answer, Esc to close modal/hint)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closePassportBook();
        this.toggleHint(false);
      }
    });

    // Handle Window Resize for Confetti
    window.addEventListener('resize', () => {
      if (this.confettiCanvas) {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      }
    });

    this.updateSoundUi();
  }

  /* ==========================================================================
     CATEGORY & QUESTION SWITCHING
     ========================================================================== */

  switchCategory(categoryKey) {
    this.currentCategory = categoryKey;
    this.currentQuestionIndex = 0;
    this.body.setAttribute('data-current-tab', categoryKey);

    // Update active tab UI
    this.tabs.forEach(tab => {
      const isActive = tab.dataset.tab === categoryKey;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    this.renderCategory();
  }

  jumpToQuestion(index) {
    this.currentQuestionIndex = index;
    this.renderQuestion();
  }

  getCurrentCategoryData() {
    return SENTENCE_DATA[this.currentCategory];
  }

  getCurrentQuestion() {
    const catData = this.getCurrentCategoryData();
    return catData.questions[this.currentQuestionIndex];
  }

  renderCategory() {
    const catData = this.getCurrentCategoryData();
    this.categoryBadgeName.textContent = `${catData.categoryName} 진행도`;
    this.updateProgressUi();
    this.renderQuestion();
  }

  renderQuestion() {
    const question = this.getCurrentQuestion();
    if (!question) return;

    // Reset interaction state
    this.placedChunkIds = [];
    this.availableChunkOrder = this.shuffleArray(question.chunks.map(c => c.id));

    // Reset visual feedbacks
    this.boardCard.classList.remove('incorrect-shake');
    this.sentenceDropzone.classList.remove('state-error', 'state-correct', 'has-pieces');
    this.stampOverlay.classList.remove('active');
    this.feedbackBanner.classList.remove('show-correct', 'show-wrong');
    this.btnCheckAnswer.style.display = 'inline-flex';
    this.btnNextQuestion.style.display = 'none';
    this.ttsPlayerCard.classList.remove('active');
    this.toggleHint(false);

    // Populate Headers & Prompts
    this.cardCountryPill.textContent = `${question.country} (${question.countryCode})`;
    this.cardDishName.textContent = question.dish;
    this.koreanSentenceText.textContent = question.korean;

    // Stamp overlay details
    this.stampCountryCode.textContent = question.countryCode;
    this.stampDateText.textContent = `${question.stampDate}`;

    // Hint content
    this.hintFormulaText.textContent = question.formula;
    this.hintBreakdownText.textContent = question.formulaDetail || question.explanation;
    this.hintChunkTips.innerHTML = question.chunks.map(chunk => `
      <div class="hint-tip-item">
        <span class="legend-badge" style="${chunk.isSubjectVerb ? 'background:#FEF3C7; color:#B45309; border-color:#F59E0B;' : ''}">
          ${chunk.roleLabel || '구'}
        </span>
        <strong>"${chunk.text}"</strong>: ${chunk.hint}
      </div>
    `).join('');

    // TTS Sentence text
    this.ttsFullSentence.textContent = question.fullEnglish;

    // If this question is already completed previously, show stamp
    if (this.completedQuestionIds.has(question.id)) {
      this.stampOverlay.classList.add('active');
      this.ttsPlayerCard.classList.add('active');
    }

    // Render pools
    this.renderChunks();
    this.updateProgressUi();
  }

  /* ==========================================================================
     CHUNK RENDERING & INTERACTIONS
     ========================================================================== */

  renderChunks() {
    const question = this.getCurrentQuestion();
    const chunkMap = new Map(question.chunks.map(c => [c.id, c]));

    // Render Available Chunks in Pool
    this.piecesPool.innerHTML = '';
    this.availableChunkOrder.forEach(chunkId => {
      const chunk = chunkMap.get(chunkId);
      if (!chunk) return;

      const isPlaced = this.placedChunkIds.includes(chunkId);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chunk-btn';
      if (chunk.isSubjectVerb) {
        btn.classList.add('highlight-sv'); // ★ 노란색 강조 (주어+동사) ★
      }
      if (isPlaced) {
        btn.classList.add('is-used');
      }

      btn.textContent = chunk.text;
      btn.setAttribute('data-chunk-id', chunk.id);
      btn.setAttribute('aria-label', `${chunk.text} ${chunk.isSubjectVerb ? '(주어+동사 조각)' : ''}`);

      btn.addEventListener('click', () => {
        this.placeChunk(chunk.id);
      });

      this.piecesPool.appendChild(btn);
    });

    // Render Placed Chunks in Sentence Dropzone
    this.sentenceDropzone.innerHTML = '';
    if (this.placedChunkIds.length === 0) {
      this.dropzoneEmptyMsg.style.display = 'flex';
      this.sentenceDropzone.appendChild(this.dropzoneEmptyMsg);
      this.sentenceDropzone.classList.remove('has-pieces');
    } else {
      this.dropzoneEmptyMsg.style.display = 'none';
      this.sentenceDropzone.classList.add('has-pieces');

      this.placedChunkIds.forEach(chunkId => {
        const chunk = chunkMap.get(chunkId);
        if (!chunk) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chunk-btn placed';
        if (chunk.isSubjectVerb) {
          btn.classList.add('highlight-sv');
        }

        btn.innerHTML = `<span>${chunk.text}</span><span class="remove-indicator" title="클릭 시 취소">✕</span>`;
        btn.setAttribute('data-chunk-id', chunk.id);
        btn.setAttribute('title', '클릭하면 원래 자리로 되돌아갑니다');

        btn.addEventListener('click', () => {
          this.removePlacedChunk(chunk.id);
        });

        this.sentenceDropzone.appendChild(btn);
      });
    }
  }

  placeChunk(chunkId) {
    if (this.placedChunkIds.includes(chunkId)) return;
    this.placedChunkIds.push(chunkId);
    this.playPopSound();

    // Reset error state if any
    this.sentenceDropzone.classList.remove('state-error');
    this.feedbackBanner.classList.remove('show-wrong');

    this.renderChunks();
  }

  removePlacedChunk(chunkId) {
    const idx = this.placedChunkIds.indexOf(chunkId);
    if (idx !== -1) {
      this.placedChunkIds.splice(idx, 1);
      this.playReturnSound();
      this.sentenceDropzone.classList.remove('state-error');
      this.feedbackBanner.classList.remove('show-wrong');
      this.renderChunks();
    }
  }

  clearSlot() {
    if (this.placedChunkIds.length === 0) return;
    this.placedChunkIds = [];
    this.playReturnSound();
    this.sentenceDropzone.classList.remove('state-error');
    this.feedbackBanner.classList.remove('show-wrong');
    this.renderChunks();
  }

  shufflePool() {
    this.playClickSound();
    this.availableChunkOrder = this.shuffleArray(this.availableChunkOrder);
    this.renderChunks();
  }

  resetQuestion() {
    this.clearSlot();
    this.shufflePool();
  }

  /* ==========================================================================
     ANSWER VALIDATION & FEEDBACK
     ========================================================================== */

  checkAnswer() {
    const question = this.getCurrentQuestion();
    const correctOrder = question.chunks.map(c => c.id);

    // If not all chunks placed yet
    if (this.placedChunkIds.length < correctOrder.length) {
      this.playErrorBuzz();
      this.shakeBoard();
      this.sentenceDropzone.classList.add('state-error');
      this.showFeedback(
        'warning',
        '모든 조각을 배치해주세요!',
        `총 ${correctOrder.length}개의 조각 중 ${this.placedChunkIds.length}개만 배치되었습니다.`
      );
      return;
    }

    // Verify chunk sequence
    const isCorrect = this.placedChunkIds.every((id, idx) => id === correctOrder[idx]);

    if (isCorrect) {
      this.handleCorrectAnswer(question);
    } else {
      this.handleWrongAnswer();
    }
  }

  handleCorrectAnswer(question) {
    // Save completion
    this.completedQuestionIds.add(question.id);
    localStorage.setItem(
      'food_passport_completed',
      JSON.stringify(Array.from(this.completedQuestionIds))
    );

    // Audio effects: Heavy visa stamp thump + bright fanfare
    this.playVisaStampSound();

    // Visual effects: Basil Green state & rubber stamp animation
    this.sentenceDropzone.classList.remove('state-error');
    this.sentenceDropzone.classList.add('state-correct');
    this.stampOverlay.classList.remove('active');
    void this.stampOverlay.offsetWidth; // trigger reflow for animation
    this.stampOverlay.classList.add('active');

    // Confetti
    this.fireConfetti();

    // Feedback banner
    this.showFeedback(
      'correct',
      '🎉 정답입니다! 완벽한 영어 어순입니다!',
      `[${question.country}] ${question.stampTitle}에 비자 스탬프가 찍혔습니다.`
    );

    // Switch action buttons
    this.btnCheckAnswer.style.display = 'none';
    this.btnNextQuestion.style.display = 'inline-flex';
    this.ttsPlayerCard.classList.add('active');

    // Automatically speak English sentence gently
    setTimeout(() => {
      this.speakCurrentSentence();
    }, 450);

    // Update Progress
    this.updateProgressUi();
    this.updateStampBookBadge();
  }

  handleWrongAnswer() {
    this.playErrorBuzz();
    this.shakeBoard();

    this.sentenceDropzone.classList.remove('state-correct');
    this.sentenceDropzone.classList.add('state-error');

    this.showFeedback(
      'wrong',
      '⚠️ 어순이 올바르지 않습니다. 다시 생각해보세요!',
      '배열 칸의 단어를 클릭하여 취소한 뒤, 주어+동사와 접속사 위치를 확인해보세요. (힌트 버튼을 눌러보세요!)'
    );
  }

  shakeBoard() {
    this.boardCard.classList.remove('incorrect-shake');
    void this.boardCard.offsetWidth; // trigger reflow
    this.boardCard.classList.add('incorrect-shake');
    setTimeout(() => {
      this.boardCard.classList.remove('incorrect-shake');
    }, 600);
  }

  showFeedback(type, title, desc) {
    this.feedbackBanner.classList.remove('show-correct', 'show-wrong');

    if (type === 'correct') {
      this.feedbackBanner.classList.add('show-correct');
      this.feedbackIcon.textContent = '✅';
    } else {
      this.feedbackBanner.classList.add('show-wrong');
      this.feedbackIcon.textContent = type === 'warning' ? '⏳' : '❌';
    }

    this.feedbackTitle.textContent = title;
    this.feedbackDesc.textContent = desc;
  }

  nextQuestion() {
    const catData = this.getCurrentCategoryData();
    if (this.currentQuestionIndex < catData.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion();
    } else {
      // Finished category!
      this.showCategoryCompleteModal();
    }
  }

  showCategoryCompleteModal() {
    const catData = this.getCurrentCategoryData();
    this.fireConfetti();
    alert(`🎊 축하합니다! ${catData.categoryName}의 5개 전통 음식 문장을 모두 완성하셨습니다!\n스탬프북에서 여행 기록을 확인해보세요.`);
    this.openPassportBook();
  }

  toggleHint(forceState) {
    const isCurrentlyOpen = this.hintDrawer.classList.contains('open');
    const newState = forceState !== undefined ? forceState : !isCurrentlyOpen;

    if (newState) {
      this.hintDrawer.classList.add('open');
      this.btnToggleHint.setAttribute('aria-expanded', 'true');
      this.playClickSound();
    } else {
      this.hintDrawer.classList.remove('open');
      this.btnToggleHint.setAttribute('aria-expanded', 'false');
    }
  }

  /* ==========================================================================
     PROGRESS TRACKING & PASSPORT STAMP BOOK
     ========================================================================== */

  updateProgressUi() {
    const catData = this.getCurrentCategoryData();
    const totalQuestions = catData.questions.length;
    let completedCount = 0;

    catData.questions.forEach(q => {
      if (this.completedQuestionIds.has(q.id)) {
        completedCount++;
      }
    });

    const pct = Math.round((completedCount / totalQuestions) * 100);

    // Update Progress Bar & Text
    this.currentQIndexSpan.textContent = `${this.currentQuestionIndex + 1}`;
    this.categoryProgressText.textContent = `${pct}% 완료 (${completedCount}/${totalQuestions})`;
    this.progressFillBar.style.width = `${pct}%`;

    // Update Step Dots
    this.stepDots.forEach((dot, idx) => {
      const q = catData.questions[idx];
      dot.classList.toggle('active', idx === this.currentQuestionIndex);
      dot.classList.toggle('completed', q && this.completedQuestionIds.has(q.id));
    });

    // Update Category Tab Stat Pills
    ['pro', 'neutral', 'con'].forEach(catKey => {
      const questions = SENTENCE_DATA[catKey].questions;
      let count = 0;
      questions.forEach(q => {
        if (this.completedQuestionIds.has(q.id)) count++;
      });
      if (this.statPills[catKey]) {
        this.statPills[catKey].textContent = `${count}/${questions.length}`;
      }
    });
  }

  updateStampBookBadge() {
    const total = 15;
    const completed = this.completedQuestionIds.size;
    this.headerStampBadge.textContent = `${completed}/${total}`;
  }

  openPassportBook() {
    this.renderStampBookGrid();
    this.passportModal.classList.add('open');
    this.playPopSound();
  }

  closePassportBook() {
    this.passportModal.classList.remove('open');
  }

  renderStampBookGrid() {
    this.stampBookGrid.innerHTML = '';
    const categories = ['pro', 'neutral', 'con'];

    categories.forEach(catKey => {
      const cat = SENTENCE_DATA[catKey];
      cat.questions.forEach((q, qIndex) => {
        const isCompleted = this.completedQuestionIds.has(q.id);

        const tile = document.createElement('div');
        tile.className = `passport-stamp-tile ${isCompleted ? 'unlocked' : ''}`;

        tile.innerHTML = `
          <div class="tile-icon">${isCompleted ? '✈️' : '🔒'}</div>
          <div class="tile-country">${q.country}</div>
          <div class="tile-dish">${q.dish}</div>
          ${
            isCompleted
              ? `<div style="font-size:11px; font-weight:800; color:var(--color-basil); margin-top:4px;">${q.stampDate}</div>`
              : `<div class="tile-status-locked"><span>미방문</span> • ${cat.categoryName} #${qIndex + 1}</div>`
          }
        `;

        tile.style.cursor = 'pointer';
        tile.title = `${q.dish} 문제로 이동하기`;
        tile.addEventListener('click', () => {
          this.closePassportBook();
          this.currentCategory = catKey;
          this.body.setAttribute('data-current-tab', catKey);
          this.tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === catKey));
          this.currentQuestionIndex = qIndex;
          this.renderCategory();
        });

        this.stampBookGrid.appendChild(tile);
      });
    });
  }

  /* ==========================================================================
     AUDIO SYNTHESIS & SOUND EFFECTS (Web Audio API)
     ========================================================================== */

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('food_passport_sound', String(this.soundEnabled));
    this.updateSoundUi();
    if (this.soundEnabled) {
      this.initAudioContext();
      this.playClickSound();
    }
  }

  updateSoundUi() {
    if (this.soundEnabled) {
      this.soundIcon.textContent = '🔊';
      this.soundText.textContent = '효과음 ON';
      this.soundToggleBtn.style.opacity = '1';
    } else {
      this.soundIcon.textContent = '🔇';
      this.soundText.textContent = '효과음 OFF';
      this.soundToggleBtn.style.opacity = '0.7';
    }
  }

  playPopSound() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playReturnSound() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(720, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.09);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playClickSound() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playVisaStampSound() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Heavy stamp thud (low sine thump)
      const thudOsc = this.audioCtx.createOscillator();
      const thudGain = this.audioCtx.createGain();
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(140, now);
      thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18);
      thudGain.gain.setValueAtTime(0.4, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      thudOsc.connect(thudGain);
      thudGain.connect(this.audioCtx.destination);
      thudOsc.start(now);
      thudOsc.stop(now + 0.18);

      // Cheerful chime chord (C5 - E5 - G5 - C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const noteOsc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const noteStart = now + 0.08 + idx * 0.07;

        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, noteStart);

        noteGain.gain.setValueAtTime(0.18, noteStart);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.28);

        noteOsc.connect(noteGain);
        noteGain.connect(this.audioCtx.destination);

        noteOsc.start(noteStart);
        noteOsc.stop(noteStart + 0.3);
      });
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playErrorBuzz() {
    if (!this.soundEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [0, 0.14].forEach(offset => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const start = now + offset;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, start);
        osc.frequency.linearRampToValueAtTime(120, start + 0.1);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(start);
        osc.stop(start + 0.1);
      });
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  /* ==========================================================================
     TEXT-TO-SPEECH (Web Speech API)
     ========================================================================== */

  speakCurrentSentence() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop any pending speech

    const question = this.getCurrentQuestion();
    if (!question) return;

    const utterance = new SpeechSynthesisUtterance(question.fullEnglish);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for middle school learners
    utterance.pitch = 1.0;

    // Try finding a natural English voice
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
    if (enVoice) {
      utterance.voice = enVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  /* ==========================================================================
     CONFETTI PARTICLE CELEBRATION
     ========================================================================== */

  initConfetti() {
    if (!this.confettiCanvas) return;
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.particles = [];
  }

  fireConfetti() {
    if (!this.confettiCtx) return;
    this.particles = [];
    const colors = ['#F59E0B', '#E11D48', '#059669', '#3B82F6', '#D97706'];

    for (let i = 0; i < 70; i++) {
      this.particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 10 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 15,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.012
      });
    }

    if (!this.isAnimatingConfetti) {
      this.isAnimatingConfetti = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiCtx) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vr;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.confettiCtx.save();
      this.confettiCtx.globalAlpha = p.alpha;
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
      this.confettiCtx.fillStyle = p.color;
      this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.confettiCtx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.isAnimatingConfetti = false;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }

  /* ==========================================================================
     UTILITIES
     ========================================================================== */

  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new SentenceApp();
});
