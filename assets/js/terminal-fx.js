/**
 * VAPOK GAMING — CYBER-CONSOLE INTERACTIVE ENGINE
 * Features:
 * - First-Time Visitor OFFLINE State & Bootloader Sequence
 * - Interactive Dropdown CLI Terminal Emulator & Command Processor
 * - Reactive ASCII Particle Matrix Canvas
 * - Glitch / Text Decoder on Hover & Section Compilation
 * - CRT Scanline Filter Toggle & Persistence
 * - Mod Category Quick Filtering & Dossier Tab Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initAsciiCanvas();
  initCrtToggle();
  initTextScramble();
  initModFilters();
  initSystemClock();
  initDossierTabs();
  initCyberLightbox();
  initFeaturedSpotlight();
  initBootloaderAndCli();
  initMobileBackToTop();
  initLivePlayerCounter();
});

/* ==========================================================================
   1. REACTIVE ASCII CANVAS BACKGROUND
   ========================================================================== */
function initAsciiCanvas() {
  const canvas = document.getElementById('ascii-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isMobile = window.innerWidth <= 768 || !window.matchMedia('(hover: hover)').matches || prefersReducedMotion;
  if (isMobile) {
    // Disable canvas render loop on mobile or reduced-motion to save CPU/GPU fillrate and battery
    return;
  }

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const chars = '01#*+=-:.·˙VAPOK';
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let rows = Math.floor(height / fontSize);
  let grid = [];

  function buildGrid() {
    columns = Math.floor(width / fontSize);
    rows = Math.floor(height / fontSize);
    grid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < columns; c++) {
        row.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          intensity: Math.random() * 0.15,
          targetIntensity: 0.08,
        });
      }
      grid.push(row);
    }
  }

  buildGrid();

  let mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  let animFrameId = null;
  let resizeTimeout = null;

  window.addEventListener('resize', () => {
    const nowMobile = window.innerWidth <= 768 || !window.matchMedia('(hover: hover)').matches;
    if (nowMobile) {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      return;
    }

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      buildGrid();
      if (!animFrameId && !document.hidden) {
        animFrameId = requestAnimationFrame(render);
      }
    }, 150);
  }, { passive: true });

  function render() {
    ctx.fillStyle = '#06080e';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const cell = grid[r] && grid[r][c];
        if (!cell) continue;

        const posX = c * fontSize;
        const posY = (r + 1) * fontSize;

        const dx = posX - mouse.x;
        const dy = posY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = 1 - dist / mouse.radius;
          cell.intensity = Math.min(1.0, cell.intensity + force * 0.35);
          if (Math.random() < 0.1) {
            cell.char = chars[Math.floor(Math.random() * chars.length)];
          }
        } else {
          cell.intensity += (cell.targetIntensity - cell.intensity) * 0.05;
        }

        if (cell.intensity > 0.02) {
          if (cell.intensity > 0.6) {
            ctx.fillStyle = `rgba(165, 243, 252, ${cell.intensity})`;
          } else if (cell.intensity > 0.25) {
            ctx.fillStyle = `rgba(20, 184, 166, ${cell.intensity})`;
          } else {
            ctx.fillStyle = `rgba(65, 81, 99, ${cell.intensity * 0.8})`;
          }
          ctx.fillText(cell.char, posX, posY);
        }
      }
    }

    animFrameId = requestAnimationFrame(render);
  }

  // Pause canvas render loop when document is hidden to optimize CPU / battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    } else {
      if (!animFrameId && window.innerWidth > 768 && window.matchMedia('(hover: hover)').matches) {
        animFrameId = requestAnimationFrame(render);
      }
    }
  });

  animFrameId = requestAnimationFrame(render);
}

/* ==========================================================================
   2. CRT SCANLINE TOGGLE
   ========================================================================== */
function toggleCrtEffect() {
  const toggleBtn = document.getElementById('crt-toggle-btn');
  const isOff = document.body.classList.toggle('crt-off');
  if (toggleBtn) {
    toggleBtn.textContent = isOff ? '[ CRT: OFF ]' : '[ CRT: ON ]';
  }
  localStorage.setItem('vapok_crt_state', isOff ? 'off' : 'on');
  return isOff;
}

function initCrtToggle() {
  const toggleBtn = document.getElementById('crt-toggle-btn');
  if (!toggleBtn) return;

  const savedCrt = localStorage.getItem('vapok_crt_state');
  const isMobile = window.innerWidth <= 768;

  // If user hasn't explicitly set a preference, default to OFF on mobile and ON on desktop
  const shouldBeOff = savedCrt !== null ? savedCrt === 'off' : isMobile;

  if (shouldBeOff) {
    document.body.classList.add('crt-off');
    toggleBtn.textContent = '[ CRT: OFF ]';
  } else {
    document.body.classList.remove('crt-off');
    toggleBtn.textContent = '[ CRT: ON ]';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCrtEffect();
  });
}

/* ==========================================================================
   3. TEXT DECODER / SCRAMBLER HOVER EFFECT (DESKTOP / POINTER DEVICES)
   ========================================================================== */
function initTextScramble() {
  const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isPointerFine) return;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#________';
  const scrambleElements = document.querySelectorAll('.scramble-hover:not(.ascii-art), .cyber-btn');

  scrambleElements.forEach((el) => {
    const originalText = el.dataset.text || el.innerText.trim();
    el.dataset.text = originalText;
    let interval = null;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 25);
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(interval);
      el.innerText = originalText;
    });
  });

  initAsciiBannerGlitch();
}

/**
 * Continuous Matrix ASCII Glitch for the Banner (Desktop / Pointer Devices)
 */
function initAsciiBannerGlitch() {
  const asciiEl = document.querySelector('.ascii-art');
  if (!asciiEl) return;
  const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isPointerFine) return;

  const originalAscii = asciiEl.textContent;
  const glitchGlyphs = ['█', '▓', '▒', '░', '═', '║', '╔', '╗', '╚', '╝', '0', '1', '#', '+', 'X', '/', '\\', '<', '>', '*'];
  let glitchInterval = null;

  asciiEl.style.cursor = 'pointer';

  asciiEl.addEventListener('mouseenter', () => {
    clearInterval(glitchInterval);

    glitchInterval = setInterval(() => {
      const glitchedText = originalAscii
        .split('\n')
        .map((line) => {
          return line
            .split('')
            .map((char) => {
              if (char === ' ') return ' ';
              if (Math.random() < 0.65) {
                return glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
              }
              return char;
            })
            .join('');
        })
        .join('\n');

      asciiEl.textContent = glitchedText;
    }, 45);
  });

  asciiEl.addEventListener('mouseleave', () => {
    clearInterval(glitchInterval);
    
    let settleStep = 0;
    const settleInterval = setInterval(() => {
      settleStep++;
      if (settleStep >= 4) {
        clearInterval(settleInterval);
        asciiEl.textContent = originalAscii;
      } else {
        const factor = settleStep * 0.25;
        const settlingText = originalAscii
          .split('\n')
          .map((line) => {
            return line
              .split('')
              .map((char) => {
                if (char === ' ') return ' ';
                if (Math.random() > factor) {
                  return glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
                }
                return char;
              })
              .join('');
          })
          .join('\n');
        asciiEl.textContent = settlingText;
      }
    }, 35);
  });
}

/* ==========================================================================
   4. MOD CATEGORY QUICK FILTER
   ========================================================================== */
function initModFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modCards = document.querySelectorAll('.mod-card');

  if (!filterBtns.length || !modCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      modCards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. LIVE SYSTEM CLOCK & UPTIME
   ========================================================================== */
let isClockScrambling = false;

function formatClockHtml(d) {
  const iso = d.toISOString();
  const datePart = iso.substring(0, 10) + ' ';
  const timePart = iso.substring(11, 19) + ' UTC';
  return '<span class="clock-date">' + datePart + '</span><span class="clock-time">' + timePart + '</span>';
}

function initSystemClock() {
  const clockEl = document.getElementById('system-clock');
  if (!clockEl) return;

  function updateClock() {
    if (isClockScrambling) return;
    const now = new Date();
    clockEl.innerHTML = formatClockHtml(now);
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   6. MOD DOSSIER TABS (README vs CHANGELOG)
   ========================================================================== */
function initDossierTabs() {
  const tabBtns = document.querySelectorAll('.terminal-tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  const tabTriggers = document.querySelectorAll('.tab-trigger');

  if (!tabBtns.length && !tabTriggers.length) return;

  function switchTab(targetId) {
    tabBtns.forEach((btn) => {
      if (btn.dataset.tab === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    panels.forEach((panel) => {
      if (panel.id === targetId) {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.dataset.target;
      if (target) {
        switchTab(target);
        const panelEl = document.getElementById(target);
        if (panelEl) {
          panelEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  if (window.location.hash === '#tab-changelog' || window.location.hash === '#changelog') {
    switchTab('panel-changelog');
  }
  if (window.location.hash === '#tab-gallery' || window.location.hash === '#gallery') {
    switchTab('panel-gallery');
  }
}

/* ==========================================================================
   6. CYBER LIGHTBOX IMAGE VIEWER
   ========================================================================== */
function initCyberLightbox() {
  const lightbox = document.getElementById('cyber-lightbox');
  if (!lightbox) return;

  const backdrop = lightbox.querySelector('.cyber-lightbox-backdrop');
  const closeBtn = lightbox.querySelector('.cyber-lightbox-close');
  const prevBtn = lightbox.querySelector('.cyber-lightbox-prev');
  const nextBtn = lightbox.querySelector('.cyber-lightbox-next');
  const imgEl = document.getElementById('cyber-lightbox-img');
  const titleEl = document.getElementById('cyber-lightbox-title');
  const descEl = document.getElementById('cyber-lightbox-desc');
  const counterEl = document.getElementById('cyber-lightbox-counter');

  const cards = Array.from(document.querySelectorAll('.cyber-gallery-card'));
  if (!cards.length) return;

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateStage();
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateStage() {
    if (currentIndex < 0) currentIndex = cards.length - 1;
    if (currentIndex >= cards.length) currentIndex = 0;

    const card = cards[currentIndex];
    const src = card.dataset.fullSrc;
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';

    if (imgEl) {
      imgEl.style.opacity = '0';
      imgEl.src = src;
      imgEl.alt = title;
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
    }

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (counterEl) {
      const curStr = String(currentIndex + 1).padStart(2, '0');
      const totalStr = String(cards.length).padStart(2, '0');
      counterEl.textContent = `[ ${curStr} / ${totalStr} ]`;
    }
  }

  function nextImage() {
    currentIndex++;
    updateStage();
  }

  function prevImage() {
    currentIndex--;
    updateStage();
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'none') return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') nextImage();
    else if (e.key === 'ArrowLeft') prevImage();
  });
}

/* ==========================================================================
   6B. FEATURED SPOTLIGHT PREVIEW INTERACTION
   ========================================================================== */
function initFeaturedSpotlight() {
  const container = document.querySelector('.featured-spotlight-box');
  if (!container) return;

  const mainImg = document.getElementById('featured-preview-img');
  const frameFile = document.getElementById('featured-frame-file');
  const capTitle = document.getElementById('featured-caption-title');
  const capDesc = document.getElementById('featured-caption-desc');
  const buttons = container.querySelectorAll('.featured-thumb-btn');

  if (!mainImg || !buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgUrl = btn.getAttribute('data-img');
      const file = btn.getAttribute('data-file');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mainImg && imgUrl) {
        mainImg.style.opacity = '0.3';
        mainImg.src = imgUrl;
        mainImg.alt = title || 'BepInEx.ConfigDrawers Screenshot';
        mainImg.onload = () => {
          mainImg.style.opacity = '1';
        };
      }

      if (frameFile && file) {
        frameFile.textContent = `// FEED: ${file}`;
      }
      if (capTitle && title) {
        capTitle.textContent = title;
      }
      if (capDesc && desc) {
        capDesc.textContent = desc;
      }
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE BOOTLOADER & CLI TERMINAL ENGINE
   ========================================================================== */
function initBootloaderAndCli() {
  const statusDot = document.getElementById('system-status-dot');
  const statusText = document.getElementById('system-status-text');
  const brandBtn = document.getElementById('terminal-brand-btn');
  const cliToggleBtn = document.getElementById('cli-toggle-btn');
  const cliDrawer = document.getElementById('cyber-cli-drawer');
  const cliOutput = document.getElementById('cli-output');
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  
  const bootQuickBtn = document.getElementById('cli-boot-quick-btn');
  const helpQuickBtn = document.getElementById('cli-help-quick-btn');
  const clearQuickBtn = document.getElementById('cli-clear-quick-btn');
  const closeBtn = document.getElementById('cli-close-btn');

  let isBooted = localStorage.getItem('vapok_system_booted') === 'true';
  let isBooting = false;
  let isShuttingDown = false;

  function printLine(text, type = 'info') {
    if (!cliOutput) return;
    const line = document.createElement('div');
    line.className = `cli-line ${type}`;
    line.textContent = text;
    cliOutput.appendChild(line);
    cliOutput.scrollTop = cliOutput.scrollHeight;
  }

  function updateCliPrompt(label, placeholder = '') {
    const promptLabel = document.querySelector('.cli-prompt-label');
    if (promptLabel) promptLabel.textContent = label;
    if (cliInput) cliInput.placeholder = placeholder;
  }

  // Bind BBS Door Games Engine Output & Dynamic Prompt
  if (window.BBSDoorManager) {
    window.BBSDoorManager.setPrintFunction(printLine);
    window.BBSDoorManager.setPromptFunction(updateCliPrompt);
  }

  function updatePowerButtonState() {
    if (!bootQuickBtn) return;
    if (isBooted) {
      bootQuickBtn.textContent = '[ 🛑 STOP ]';
      bootQuickBtn.style.color = 'var(--error-crimson)';
      bootQuickBtn.style.borderColor = 'rgba(244, 63, 94, 0.4)';
      bootQuickBtn.title = 'Power off system (shutdown)';
    } else {
      bootQuickBtn.textContent = '[ ⚡ START ]';
      bootQuickBtn.style.color = 'var(--warning-amber)';
      bootQuickBtn.style.borderColor = 'rgba(251, 191, 36, 0.4)';
      bootQuickBtn.title = 'Power on system (start)';
    }
  }

  const cyberHeader = document.querySelector('.cyber-header');
  let closeAnimationTimeout = null;

  let promptScrambleInterval = null;

  function scatterPromptBrandOut() {
    const promptPrefix = document.querySelector('#terminal-brand-btn .prompt-prefix');
    const promptCursor = document.querySelector('#terminal-brand-btn .prompt-cursor');
    if (!promptPrefix) return;

    if (promptScrambleInterval) {
      clearInterval(promptScrambleInterval);
      promptScrambleInterval = null;
    }

    if (promptCursor) promptCursor.style.display = 'none';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      promptPrefix.textContent = '';
      return;
    }

    const currentText = promptPrefix.textContent || 'user@vapok.io:~$';
    const chars = '01#*+=-:.·˙_[]{}<>/\\$!%^&';
    const startTime = Date.now();
    const durationMs = 220;

    promptScrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);
      const remainingLen = Math.floor((1 - progress) * currentText.length);

      if (remainingLen <= 0 || progress >= 1.0) {
        clearInterval(promptScrambleInterval);
        promptScrambleInterval = null;
        promptPrefix.textContent = '';
      } else {
        let noise = '';
        for (let i = 0; i < remainingLen; i++) {
          noise += chars[Math.floor(Math.random() * chars.length)];
        }
        promptPrefix.textContent = noise;
      }
    }, 25);
  }

  function scramblePromptBrandIn() {
    const promptPrefix = document.querySelector('#terminal-brand-btn .prompt-prefix');
    const promptCursor = document.querySelector('#terminal-brand-btn .prompt-cursor');
    if (!promptPrefix) return;

    if (promptScrambleInterval) {
      clearInterval(promptScrambleInterval);
      promptScrambleInterval = null;
    }

    const targetText = 'user@vapok.io:~$';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      promptPrefix.textContent = targetText;
      if (promptCursor) promptCursor.style.display = '';
      return;
    }

    if (promptCursor) promptCursor.style.display = '';

    const chars = '01#*+=-:.·˙_[]{}<>/\\$!%^&';
    const startTime = Date.now();
    const durationMs = 280;

    promptScrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);
      const settledLen = Math.floor(progress * targetText.length);

      promptPrefix.textContent = targetText
        .split('')
        .map((char, index) => {
          if (index < settledLen) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (progress >= 1.0) {
        clearInterval(promptScrambleInterval);
        promptScrambleInterval = null;
        promptPrefix.textContent = targetText;
      }
    }, 25);
  }

  // Alias for backward-compatible call in bootloader
  function scramblePromptBrand() {
    scramblePromptBrandIn();
  }

  function scrambleClockTransition(durationMs = 1200) {
    const clockEl = document.getElementById('system-clock');
    if (!clockEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clockEl.innerHTML = formatClockHtml(new Date());
      return;
    }

    isClockScrambling = true;
    const chars = '01#*+=-:.·˙_[]{}<>/\\$!%^&';
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);

      const now = new Date();
      const iso = now.toISOString();
      const datePart = iso.substring(0, 10) + ' ';
      const timePart = iso.substring(11, 19) + ' UTC';
      const targetText = datePart + timePart;
      const settledLen = Math.floor(progress * targetText.length);

      const scrambledText = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === ':') return char;
          if (index < settledLen) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      const scrambledDate = scrambledText.substring(0, datePart.length);
      const scrambledTime = scrambledText.substring(datePart.length);
      clockEl.innerHTML = '<span class="clock-date">' + scrambledDate + '</span><span class="clock-time">' + scrambledTime + '</span>';

      if (progress >= 1.0) {
        clearInterval(interval);
        const finalNow = new Date();
        clockEl.innerHTML = formatClockHtml(finalNow);
        isClockScrambling = false;
      }
    }, 35);
  }

  function toggleCli(forceOpen = null) {
    if (!cliDrawer) return;
    const isCurrentlyOpen = cliDrawer.classList.contains('open');
    const shouldOpen = forceOpen !== null ? forceOpen : !isCurrentlyOpen;

    if (shouldOpen) {
      clearTimeout(closeAnimationTimeout);
      cliDrawer.classList.remove('closing');
      cliDrawer.classList.add('open');
      if (cyberHeader) cyberHeader.classList.add('cli-open');
      if (brandBtn) {
        brandBtn.classList.add('active');
        brandBtn.setAttribute('aria-expanded', 'true');
        brandBtn.title = 'Click to minimize Interactive CLI (~)';
        scatterPromptBrandOut();
      }
      if (cliToggleBtn) {
        cliToggleBtn.classList.add('active');
        cliToggleBtn.setAttribute('aria-expanded', 'true');
        cliToggleBtn.textContent = '[ CLI: <_ ]';
      }
      if (cliInput) setTimeout(() => cliInput.focus(), 100);
    } else {
      if (isSitemapActive) {
        exitSitemapTui();
      }
      if (isCurrentlyOpen) {
        cliDrawer.classList.remove('open');
        cliDrawer.classList.add('closing');
        clearTimeout(closeAnimationTimeout);
        closeAnimationTimeout = setTimeout(() => {
          cliDrawer.classList.remove('closing');
        }, 350);
      }
      if (cyberHeader) cyberHeader.classList.remove('cli-open');
      if (brandBtn) {
        brandBtn.classList.remove('active');
        brandBtn.setAttribute('aria-expanded', 'false');
        brandBtn.title = 'Click to toggle Terminal Prompt (~)';
        scramblePromptBrandIn();
      }
      if (cliToggleBtn) {
        cliToggleBtn.classList.remove('active');
        cliToggleBtn.setAttribute('aria-expanded', 'false');
        cliToggleBtn.textContent = '[ CLI: >_ ]';
      }
    }
  }

  // Toggle Hooks
  if (brandBtn) {
    brandBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCli();
    });
  }

  if (cliToggleBtn) {
    cliToggleBtn.addEventListener('click', () => toggleCli());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleCli(false));
  }

  if (clearQuickBtn) {
    clearQuickBtn.addEventListener('click', () => {
      if (cliOutput) cliOutput.innerHTML = '';
      printLine('// Terminal buffer cleared.', 'info');
    });
  }

  if (helpQuickBtn) {
    helpQuickBtn.addEventListener('click', () => executeCommand('help'));
  }

  if (bootQuickBtn) {
    bootQuickBtn.addEventListener('click', () => {
      if (isBooted) {
        executeCommand('shutdown');
      } else {
        executeCommand('start');
      }
    });
  }

  // Global hotkeys: '~' / '`', 'Enter', and TUI navigation
  window.addEventListener('keydown', (e) => {
    if (isSitemapActive) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSitemapSelection(currentSitemapIndex - 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSitemapSelection(currentSitemapIndex + 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleTuiRight();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleTuiLeft();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        navigateSitemapItem();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        exitSitemapTui();
      }
      return;
    }

    if (e.key === 'Escape' && cliDrawer && cliDrawer.classList.contains('open')) {
      e.preventDefault();
      toggleCli(false);
      return;
    }

    if (e.key === '`' || e.key === '~') {
      if (document.activeElement !== cliInput) {
        e.preventDefault();
        toggleCli(true);
      }
    } else if (e.key === 'Enter' && (!cliDrawer || !cliDrawer.classList.contains('open'))) {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
        e.preventDefault();
        toggleCli(true);
      }
    }
  });

  // Click outside to close CLI drawer
  document.addEventListener('click', (e) => {
    if (!cliDrawer || !cliDrawer.classList.contains('open')) return;

    const clickedInsideCli = cliDrawer.contains(e.target);
    const clickedBrandBtn = brandBtn && brandBtn.contains(e.target);
    const clickedToggleBtn = cliToggleBtn && cliToggleBtn.contains(e.target);
    const clickedHeaderControls = e.target.closest && e.target.closest('.header-controls');

    if (!clickedInsideCli && !clickedBrandBtn && !clickedToggleBtn && !clickedHeaderControls) {
      toggleCli(false);
    }
  });

  const isHomepage =
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html' ||
    window.location.pathname === '' ||
    window.location.pathname.endsWith('/vapok.github.io/') ||
    window.location.pathname.endsWith('/vapok.github.io/index.html');

  // Check initial state
  if (!isBooted) {
    updatePowerButtonState();
    if (isHomepage) {
      document.documentElement.classList.add('system-offline');
      if (statusText) {
        statusText.textContent = 'OFFLINE';
        statusText.style.color = '#ef4444';
      }
      printLine('======================================================================', 'warn');
      printLine(' VAPOK.IO SECURE MAINFRAME // FIRMWARE v2026.1', 'cmd');
      printLine(' SYSTEM STATUS: [ OFFLINE ]', 'error');
      printLine('======================================================================', 'warn');
      printLine('Main subsystems and user interface are currently dormant.', 'info');
      printLine('Type "start" (or click [ ⚡ START ]) to initialize system.', 'success');
    } else {
      // Direct link to a sub-page: automatically open CLI and run full start sequence
      toggleCli(true);
      startBootSequence();
    }
  } else {
    updatePowerButtonState();
    document.documentElement.classList.remove('system-offline');
    if (statusText) {
      statusText.textContent = 'ONLINE';
      statusText.style.color = 'var(--glacial-mint)';
    }
    printLine('VAPOK_OS v2026.1 // System Online. Type "help" for commands.', 'info');
  }

  const sitemapTree = [
    {
      id: 'home',
      path: '/ (Mainframe Base)',
      url: '/',
      desc: 'Primary landing hub & system dossier',
      children: [
        { id: 'home-fuel', path: '#fuel (Fuel The Creator)', url: '/#fuel', desc: 'Sponsorship & donation directives' },
        { id: 'home-partner', path: '#partner-infrastructure (Infrastructure Partner)', url: '/#partner-infrastructure', desc: 'Survival Servers dedicated Valheim host' },
        { id: 'home-about', path: '#about (Creator Directives)', url: '/#about', desc: 'About Vapok & vision statement' }
      ]
    },
    {
      id: 'mods',
      path: '/mods/ (Module Repository)',
      url: '/mods/',
      desc: '17 Valheim, Techtonica & BepInEx mod releases',
      children: [
        {
          id: 'valheim-mods',
          path: 'Valheim Mods (11 releases)',
          url: '/mods/',
          desc: 'Valheim gameplay, QoL & expansion mods',
          children: [
            { id: 'm-advbp', path: 'AdventureBackpacks', url: 'https://valheim.thunderstore.io/package/Vapok/AdventureBackpacks/', desc: 'Thematic upgradable adventure backpacks', isExternal: true },
            { id: 'm-autofeed', path: 'AutoFeedRedux', url: 'https://valheim.thunderstore.io/package/Vapok/AutoFeedRedux/', desc: 'Automated container feeding for animals', isExternal: true },
            { id: 'm-xportal', path: 'XPortalNetworks', url: 'https://valheim.thunderstore.io/package/Vapok/XPortalNetworks/', desc: 'Named & private portal networks', isExternal: true },
            { id: 'm-fastitem', path: 'FastItemTransfer', url: 'https://valheim.thunderstore.io/package/Vapok/FastItemTransfer/', desc: '1-click quick inventory sorting & transfer', isExternal: true },
            { id: 'm-shieldme', path: 'ShieldMeBruh', url: 'https://valheim.thunderstore.io/package/Vapok/ShieldMeBruh/', desc: 'Defensive ward protective visual shield', isExternal: true },
            { id: 'm-console', path: 'ConsoleBuddy', url: 'https://valheim.thunderstore.io/package/Vapok/ConsoleBuddy/', desc: 'Command console enhancements', isExternal: true }
          ]
        },
        {
          id: 'techtonica-mods',
          path: 'Techtonica Mods (5 releases)',
          url: '/mods/',
          desc: 'Factory automation & diagnostics',
          children: [
            { id: 'm-bcm', path: 'BetterCoreManagement', url: 'https://techtonica.thunderstore.io/package/Vapok/BetterCoreManagement/', desc: 'Core cluster management & diagnostics', isExternal: true },
            { id: 'm-cresizer', path: 'ContainerResizer', url: 'https://techtonica.thunderstore.io/package/Vapok/ContainerResizer/', desc: 'Expand container storage dimensions', isExternal: true },
            { id: 'm-encumb', path: 'KnowEncumbrance', url: 'https://techtonica.thunderstore.io/package/Vapok/KnowEncumbrance/', desc: 'Weight capacity & encumbrance HUD', isExternal: true }
          ]
        },
        {
          id: 'bepinex-mods',
          path: 'BepInEx Mods (1 release)',
          url: '/mods/',
          desc: 'Framework plugins & in-game configuration management',
          children: [
            { id: 'm-configdrawers', path: 'BepInEx.ConfigDrawers', url: 'https://thunderstore.io/c/valheim/p/Vapok/BepInEx_ConfigDrawers/', desc: 'Modern docking drawers & in-game configuration manager', isExternal: true }
          ]
        }
      ]
    },
    {
      id: 'games',
      path: '/games/ (Games Matrix)',
      url: '/games/',
      desc: 'Currently playing & active rotation (11 titles)',
      children: [
        { id: 'g-wow', path: 'World of Warcraft: Midnight', url: '/games/', desc: '⚡ Actively Playing • Blizzard Entertainment' },
        { id: 'g-valheim', path: 'Valheim', url: '/games/', desc: '⚡ Actively Playing • Iron Gate Studio' },
        { id: 'g-techtonica', path: 'Techtonica', url: '/games/', desc: '⚡ Actively Playing • Fire Hose Games' },
        { id: 'g-satisfactory', path: 'Satisfactory', url: '/games/', desc: '⚡ Actively Playing • Coffee Stain Studios' },
        { id: 'g-enshrouded', path: 'Enshrouded', url: '/games/', desc: '⚡ Actively Playing • Keen Games' },
        { id: 'g-dune', path: 'Dune: Awakening', url: '/games/', desc: '🔄 In Rotation • Funcom' }
      ]
    },
    {
      id: 'logs',
      path: '/logs/ (Transmission Logs)',
      url: '/logs/',
      desc: 'System changelogs, devlogs & dispatches'
    },
    {
      id: 'about',
      path: '/about/ (Creator Dossier)',
      url: '/about/',
      desc: 'Vapok biography, origins, PAX, & background'
    },
    {
      id: 'support',
      path: '/support/ (Fuel Support)',
      url: '/support/',
      desc: 'Creator support & sponsorship channels',
      children: [
        { id: 's-bmc', path: 'Buy Me A Coffee', url: 'https://buymeacoffee.com/vapok', desc: 'Direct fuel donations & coffee support', isExternal: true },
        { id: 's-gh', path: 'GitHub Sponsors', url: 'https://github.com/sponsors/Vapok', desc: 'Monthly open-source development sponsor', isExternal: true },
        { id: 's-patreon', path: 'Patreon Tier', url: 'https://patreon.com/vapok', desc: 'Early mod access & insider directives', isExternal: true }
      ]
    },
    { id: 'discord', path: 'discord.gg/5YAJkRFBXt', url: 'https://discord.gg/5YAJkRFBXt', desc: 'Community Discord server bridge', isExternal: true },
    { id: 'github', path: 'github.com/Vapok', url: 'https://github.com/Vapok', desc: 'GitHub modding repositories', isExternal: true }
  ];

  let currentSitemapIndex = 0;
  let isSitemapActive = false;
  let tuiScreenEl = null;
  const expandedNodeIds = new Set();
  let flattenedSitemapList = [];

  function getFlattenedSitemap() {
    const list = [];
    function traverse(nodes, level = 0, parentId = null) {
      nodes.forEach((node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedNodeIds.has(node.id);
        list.push({
          node,
          level,
          parentId,
          hasChildren,
          isExpanded
        });
        if (hasChildren && isExpanded) {
          traverse(node.children, level + 1, node.id);
        }
      });
    }
    traverse(sitemapTree, 0, null);
    return list;
  }

  function openSitemapTui() {
    if (!cliDrawer) return;
    isSitemapActive = true;
    cliDrawer.classList.add('tui-active');
    flattenedSitemapList = getFlattenedSitemap();
    currentSitemapIndex = 0;

    if (!tuiScreenEl || !cliDrawer.contains(tuiScreenEl)) {
      tuiScreenEl = document.createElement('div');
      tuiScreenEl.className = 'cli-tui-screen';
      tuiScreenEl.id = 'cli-tui-screen';
      tuiScreenEl.setAttribute('tabindex', '0');
      cliDrawer.appendChild(tuiScreenEl);
    }

    renderTuiContents();
    tuiScreenEl.focus();
  }

  function renderTuiContents() {
    if (!tuiScreenEl) return;
    flattenedSitemapList = getFlattenedSitemap();
    currentSitemapIndex = Math.min(currentSitemapIndex, Math.max(0, flattenedSitemapList.length - 1));

    let itemsHtml = flattenedSitemapList
      .map((item, idx) => {
        const badge = item.hasChildren
          ? `<span class="sitemap-toggle-badge">${item.isExpanded ? '[-] EXP' : '[+] DIR'}</span>`
          : '';
        const levelClass = item.level > 0 ? `level-${item.level}` : '';
        return `
          <div class="cli-sitemap-item ${levelClass} ${idx === currentSitemapIndex ? 'selected' : ''}" data-idx="${idx}">
            <span class="sitemap-cursor">&gt;</span>
            ${badge}
            <span class="sitemap-path">${item.node.path}</span>
            <span class="sitemap-desc">${item.node.desc || ''}</span>
          </div>
        `;
      })
      .join('');

    tuiScreenEl.innerHTML = `
      <div class="cli-tui-header">
        <span>// VAPOK_OS DIRECTORY MATRIX EXPLORER v2026.1 // TTY-1</span>
        <span id="tui-item-counter" style="color: var(--glacial-mint); font-size: 0.72rem;">[ ${currentSitemapIndex + 1}/${flattenedSitemapList.length} ]</span>
      </div>
      <div class="cli-tui-body" id="cli-tui-body">
        ${itemsHtml}
      </div>
      <div class="cli-tui-footer">
        <div class="cli-tui-actions">
          <button type="button" class="cli-tui-btn" id="tui-btn-up">▲ [ ↑ ] UP</button>
          <button type="button" class="cli-tui-btn" id="tui-btn-down">▼ [ ↓ ] DOWN</button>
          <button type="button" class="cli-tui-btn" id="tui-btn-expand">▶ [ → ] EXPAND</button>
          <button type="button" class="cli-tui-btn" id="tui-btn-collapse">◀ [ ← ] PARENT</button>
          <button type="button" class="cli-tui-btn" id="tui-btn-go" style="color: var(--ice-blue-bright); border-color: var(--ice-blue);">↵ [ ENTER ] GO</button>
        </div>
        <button type="button" class="cli-tui-btn" id="tui-btn-exit" style="color: var(--warning-amber); border-color: rgba(251, 191, 36, 0.4);">[ ESC ] EXIT TUI</button>
      </div>
    `;

    // Hook item clicks
    const itemEls = tuiScreenEl.querySelectorAll('.cli-sitemap-item');
    itemEls.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(el.dataset.idx, 10);
        const item = flattenedSitemapList[idx];
        if (item && item.hasChildren && !item.isExpanded) {
          expandSitemapNode(item.node.id, idx);
        } else {
          navigateSitemapItem(idx);
        }
      });
      el.addEventListener('mouseenter', () => {
        setSitemapSelection(parseInt(el.dataset.idx, 10));
      });
    });

    // Hook button clicks
    const btnUp = tuiScreenEl.querySelector('#tui-btn-up');
    const btnDown = tuiScreenEl.querySelector('#tui-btn-down');
    const btnExpand = tuiScreenEl.querySelector('#tui-btn-expand');
    const btnCollapse = tuiScreenEl.querySelector('#tui-btn-collapse');
    const btnGo = tuiScreenEl.querySelector('#tui-btn-go');
    const btnExit = tuiScreenEl.querySelector('#tui-btn-exit');

    if (btnUp) btnUp.addEventListener('click', () => setSitemapSelection(currentSitemapIndex - 1));
    if (btnDown) btnDown.addEventListener('click', () => setSitemapSelection(currentSitemapIndex + 1));
    if (btnExpand) btnExpand.addEventListener('click', () => handleTuiRight());
    if (btnCollapse) btnCollapse.addEventListener('click', () => handleTuiLeft());
    if (btnGo) btnGo.addEventListener('click', () => navigateSitemapItem());
    if (btnExit) btnExit.addEventListener('click', () => exitSitemapTui());

    // Auto-scroll to selected element
    const selEl = tuiScreenEl.querySelector('.cli-sitemap-item.selected');
    if (selEl) {
      selEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function setSitemapSelection(newIndex) {
    if (!flattenedSitemapList.length) return;
    currentSitemapIndex = (newIndex + flattenedSitemapList.length) % flattenedSitemapList.length;
    if (tuiScreenEl) {
      const itemEls = tuiScreenEl.querySelectorAll('.cli-sitemap-item');
      itemEls.forEach((el, idx) => {
        const isSel = idx === currentSitemapIndex;
        el.classList.toggle('selected', isSel);
        if (isSel) {
          el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
      const countEl = tuiScreenEl.querySelector('#tui-item-counter');
      if (countEl) {
        countEl.textContent = `[ ${currentSitemapIndex + 1}/${flattenedSitemapList.length} ]`;
      }
    }
  }

  function expandSitemapNode(nodeId, targetIndex = null) {
    expandedNodeIds.add(nodeId);
    if (targetIndex !== null) currentSitemapIndex = targetIndex;
    renderTuiContents();
  }

  function collapseSitemapNode(nodeId) {
    expandedNodeIds.delete(nodeId);
    renderTuiContents();
  }

  function handleTuiRight() {
    const item = flattenedSitemapList[currentSitemapIndex];
    if (item && item.hasChildren) {
      if (!item.isExpanded) {
        expandSitemapNode(item.node.id);
      } else {
        setSitemapSelection(currentSitemapIndex + 1);
      }
    }
  }

  function handleTuiLeft() {
    const item = flattenedSitemapList[currentSitemapIndex];
    if (item) {
      if (item.hasChildren && item.isExpanded) {
        collapseSitemapNode(item.node.id);
      } else if (item.parentId) {
        const parentIdx = flattenedSitemapList.findIndex((i) => i.node.id === item.parentId);
        if (parentIdx !== -1) {
          currentSitemapIndex = parentIdx;
          collapseSitemapNode(item.parentId);
        }
      }
    }
  }

  function exitSitemapTui() {
    if (!isSitemapActive) return;
    isSitemapActive = false;
    if (cliDrawer) {
      cliDrawer.classList.remove('tui-active');
    }
    if (tuiScreenEl) {
      tuiScreenEl.remove();
      tuiScreenEl = null;
    }
    printLine('// Exited directory matrix explorer.', 'info');
    if (cliInput) {
      setTimeout(() => cliInput.focus(), 50);
    }
  }

  function navigateSitemapItem(idx = currentSitemapIndex) {
    const item = flattenedSitemapList[idx];
    if (!item || !item.node) return;

    if (item.hasChildren && !item.node.url) {
      if (item.isExpanded) {
        collapseSitemapNode(item.node.id);
      } else {
        expandSitemapNode(item.node.id);
      }
      return;
    }

    if (cliDrawer) {
      cliDrawer.classList.remove('tui-active');
    }
    if (tuiScreenEl) {
      tuiScreenEl.remove();
      tuiScreenEl = null;
    }
    isSitemapActive = false;
    printLine(`Navigating to node [ ${item.node.path} ]...`, 'success');
    setTimeout(() => {
      if (item.node.isExternal) {
        window.open(item.node.url, '_blank');
      } else {
        window.location.href = item.node.url;
      }
    }, 150);
  }

  // Handle Command Submission
  if (cliForm) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const raw = cliInput.value.trim();
      cliInput.value = '';

      if (isSitemapActive && !raw) {
        navigateSitemapItem();
        return;
      }

      // Check if user is actively playing a BBS Door Game
      if (window.BBSDoorManager && window.BBSDoorManager.isDoorActive()) {
        if (raw) {
          printLine(`> ${raw}`, 'cmd');
        }
        const handled = window.BBSDoorManager.handleInput(raw);
        if (handled) {
          if (cliInput) setTimeout(() => cliInput.focus(), 10);
          return;
        }
      }

      if (!raw) {
        printLine('user@vapok.io:~$', 'cmd');
      } else {
        isSitemapActive = false;
        executeCommand(raw);
      }
      if (cliInput) {
        setTimeout(() => cliInput.focus(), 10);
      }
    });
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    printLine(`user@vapok.io:~$ ${rawCmd}`, 'cmd');

    switch (cmd) {
      case 'start':
      case 'startup':
      case 'boot':
      case 'poweron':
      case 'power on':
      case 'run':
        if (isBooted) {
          printLine('System is already ONLINE and fully operational.', 'info');
        } else if (isBooting) {
          printLine('System compilation already in progress...', 'warn');
        } else {
          startBootSequence();
        }
        break;

      case 'pwd':
        printLine(window.location.href, 'info');
        break;

      case 'help':
      case '?':
      case 'commands':
        if (!isBooted) {
          printLine('AVAILABLE SYSTEM DIRECTIVES (OFFLINE):', 'cmd');
          printLine('  start            - Power up system and compile graphical UI', 'info');
          printLine('  status           - Display kernel telemetry & active nodes', 'info');
          printLine('  crt              - Toggle retro CRT scanline filter', 'info');
          printLine('  clear            - Clear terminal buffer output', 'info');
        } else {
          printLine('AVAILABLE SYSTEM DIRECTIVES:', 'cmd');
          printLine('  play             - Launch retro BBS Door Games', 'success');
          printLine('  status           - Display kernel telemetry & active nodes', 'info');
          printLine('  mods             - View mod catalog dossier repository', 'info');
          printLine('  games            - Display currently playing & rotation games', 'info');
          printLine('  logs             - View transmission logs & dispatches archive', 'info');
          printLine('  about / whoami   - View creator dossier & operational history', 'info');
          printLine('  server           - View Survival Servers Valheim partner details', 'info');
          printLine('  fuel / support   - Open creator support & donation channels', 'info');
          printLine('  discord          - Connect to Vapok Gaming Community Discord', 'info');
          printLine('  crt              - Toggle retro CRT scanline filter', 'info');
          printLine('  clear            - Clear terminal buffer output', 'info');
          printLine('  shutdown         - Gracefully decompile UI & enter OFFLINE mode', 'info');
          printLine('  reboot           - Gracefully decompile and re-initialize system', 'info');
        }
        break;

      case 'doors':
      case 'door':
      case 'bbs':
      case 'play':
      case 'minigames':
      case 'minigame':
        if (window.BBSDoorManager) {
          window.BBSDoorManager.showDoorsMenu();
        } else {
          printLine('BBS Door Matrix module loading...', 'warn');
        }
        break;

      case 'lord':
      case 'reddragon':
      case 'dragon':
        if (window.BBSDoorManager) {
          window.BBSDoorManager.openDoor('lord');
        } else {
          printLine('BBS Door Matrix module loading...', 'warn');
        }
        break;

      case 'tradewars':
      case 'tw2002':
      case 'tw':
        if (window.BBSDoorManager) {
          window.BBSDoorManager.openDoor('tradewars');
        } else {
          printLine('BBS Door Matrix module loading...', 'warn');
        }
        break;

      case 'bre':
      case 'barren':
      case 'barrenrealms':
        if (window.BBSDoorManager) {
          window.BBSDoorManager.openDoor('bre');
        } else {
          printLine('BBS Door Matrix module loading...', 'warn');
        }
        break;

      case 'status':
      case 'info':
        printLine('--- SYSTEM TELEMETRY ---', 'cmd');
        printLine(`Node: vapok.io [185.199.108.153]`, 'info');
        printLine(`Kernel: VAPOK-OS v2026.1-x86_64`, 'info');
        printLine(`Status: ${isBooted ? 'ONLINE (Optimal)' : 'OFFLINE (Dormant)'}`, isBooted ? 'success' : 'warn');
        printLine(`Active Mod Releases: 17 projects (Valheim, Techtonica & BepInEx)`, 'info');
        printLine(`Spotlight Games: 11 active titles in rotation`, 'info');
        printLine(`Uptime: ${Math.floor(performance.now() / 1000)}s since session start`, 'info');
        break;

      case 'mods':
      case 'modding':
        printLine('--- MODULE REPOSITORY [ VALHEIM, TECHTONICA & BEPINEX ] ---', 'success');
        printLine('17 active mods in development. Browse dossiers at: https://vapok.io/mods/', 'info');
        const modsSection = document.getElementById('mods');
        if (modsSection) {
          modsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          printLine('Navigating to Module Repository (/mods/)...', 'info');
          setTimeout(() => {
            window.location.href = '/mods/';
          }, 400);
        }
        break;

      case 'games':
      case 'playing':
        printLine('--- CURRENTLY PLAYING MATRIX ---', 'success');
        printLine('Active Rotation: WoW: Midnight, Valheim, Techtonica, Satisfactory, Dune: Awakening...', 'info');
        printLine('Full matrix directory: https://vapok.io/games/', 'info');
        const gamesSection = document.querySelector('.games-directory, .games-grid');
        if (gamesSection) {
          gamesSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;

      case 'logs':
      case 'log':
      case 'transmissions':
      case 'devlogs':
      case 'devlog':
        printLine('--- TRANSMISSION LOGS & DISPATCHES ---', 'success');
        printLine('Official development dispatches and system changelogs: https://vapok.io/logs/', 'info');
        if (window.location.pathname.includes('/logs')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          printLine('Navigating to Transmission Logs (/logs/)...', 'info');
          setTimeout(() => {
            window.location.href = '/logs/';
          }, 400);
        }
        break;

      case 'server':
      case 'servers':
      case 'valheimserver':
      case 'survivalservers':
      case 'sponsor':
      case 'partner':
        printLine('--- INFRASTRUCTURE PARTNER // SURVIVAL SERVERS ---', 'success');
        printLine('Dedicated Valheim Server Host for Vapok Gaming Community', 'info');
        printLine('  • Promo Code: VALHEIM25 (25% off)', 'warn');
        printLine('  • Direct URL: https://www.survivalservers.com/services/game_servers/valheim/?ref=vapok', 'info');
        const partnerSection = document.getElementById('partner-infrastructure');
        if (partnerSection) {
          partnerSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.open('https://www.survivalservers.com/services/game_servers/valheim/?ref=vapok', '_blank');
        }
        break;

      case 'about':
      case 'whoami':
      case 'creator':
      case 'vapok':
        printLine('--- CREATOR DOSSIER // VAPOK ---', 'success');
        printLine('Operator: Vapok | 25+ Years Software Engineering | Valheim & Techtonica Modder', 'info');
        printLine('Background: Penny Arcade PAX PC Room Manager, Storm Chaser (NWS), EMT/FF, Pilot, Speaker.', 'info');
        printLine('Full dossier: https://vapok.io/about/', 'info');
        if (window.location.pathname.includes('/about')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          printLine('Navigating to Creator Dossier (/about/)...', 'info');
          setTimeout(() => {
            window.location.href = '/about/';
          }, 400);
        }
        break;

      case 'fuel':
      case 'support':
      case 'donate':
        printLine('--- ⚡ FUEL THE DEVELOPER [ SUPPORT DIRECTIVE ] ---', 'warn');
        printLine('Support continued modding & open-source tools:', 'info');
        printLine('  • Dossier: https://vapok.io/support/', 'info');
        printLine('  • Buy Me A Coffee: https://buymeacoffee.com/vapok', 'info');
        printLine('  • GitHub Sponsors: https://github.com/sponsors/Vapok', 'info');
        const supportSection = document.querySelector('.support-hero, .support-matrix');
        if (supportSection) {
          supportSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;

      case 'discord':
        printLine('Opening Vapok Gaming Community Discord portal...', 'success');
        window.open('https://discord.gg/5YAJkRFBXt', '_blank');
        break;

      case 'crt':
        const isCrtOff = toggleCrtEffect();
        printLine(`CRT Scanlines: [ ${isCrtOff ? 'OFF' : 'ON'} ]`, 'info');
        break;

      case 'clear':
      case 'cls':
        if (cliOutput) cliOutput.innerHTML = '';
        printLine('// Terminal buffer cleared.', 'info');
        break;

      case 'dir':
      case 'ls':
      case 'ls -l':
      case 'ls -la':
      case 'ls -a':
      case 'sitemap':
        openSitemapTui();
        break;

      case 'exit':
      case 'close':
      case 'quit':
      case 'hide':
        printLine('Minimizing interactive CLI terminal drawer...', 'info');
        setTimeout(() => toggleCli(false), 200);
        break;

      case 'shutdown':
      case 'poweroff':
      case 'power off':
      case 'stop':
        if (!isBooted) {
          printLine('System is already OFFLINE (dormant).', 'warn');
        } else if (isShuttingDown || isBooting) {
          printLine('System state transition already in progress...', 'warn');
        } else {
          startShutdownSequence(false);
        }
        break;

      case 'reboot':
      case 'restart':
        if (isShuttingDown || isBooting) {
          printLine('System state transition already in progress...', 'warn');
        } else if (!isBooted) {
          startBootSequence();
        } else {
          startShutdownSequence(true);
        }
        break;

      default:
        printLine(`Command not recognized: "${rawCmd}". Type "help" for available commands.`, 'error');
        break;
    }
  }

  // 10-Second Progressive Top-Down Compilation Sequence
  function startBootSequence() {
    isBooting = true;

    // Section References for Staggered Reveal
    const navMenu = document.getElementById('header-nav-menu');
    const fuelBtn = document.getElementById('header-fuel-btn');
    const heroAscii = document.querySelector('.hero-ascii-section');
    const modsSection = document.getElementById('mods');
    const logsSection = document.getElementById('logs');
    const fuelSection = document.getElementById('fuel');
    const partnerSection = document.getElementById('partner-infrastructure');
    const aboutSection = document.getElementById('about');
    const footer = document.querySelector('.cyber-footer');
    const mainContent = document.getElementById('main-content') || document.querySelector('.page-content') || document.querySelector('main');

    // 1. Immediately hide all sections with transition: none BEFORE unhiding system-offline
    const sectionsToHide = [heroAscii, modsSection, logsSection, fuelSection, partnerSection, aboutSection, footer, !isHomepage ? mainContent : null, navMenu, fuelBtn];
    sectionsToHide.forEach((sec) => {
      if (sec) {
        sec.style.transition = 'none';
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(15px)';
      }
    });

    if (navMenu) {
      navMenu.style.transform = 'translateY(-10px)';
    }
    if (fuelBtn) {
      fuelBtn.style.transform = 'translateY(-10px)';
    }

    // Force a synchronous reflow so zero-opacity is rendered before class change
    void document.documentElement.offsetHeight;

    document.documentElement.classList.remove('system-offline');
    document.documentElement.classList.remove('system-shutting-down');
    document.documentElement.classList.add('system-booting');

    if (statusText) {
      statusText.textContent = 'BOOTING...';
      statusText.style.color = 'var(--warning-amber)';
    }

    printLine('--------------------------------------------------', 'warn');
    printLine('>>> INITIATING VAPOK.IO SYSTEM BOOTLOADER <<<', 'cmd');
    printLine('[0.00s] Initializing Vapok OS Kernel v2026.1...', 'info');

    // Compilation Log Milestones over 10 seconds
    setTimeout(() => {
      printLine('[1.50s] Mounting multi-game subsystems (Valheim, Techtonica)... OK', 'info');
      if (navMenu) {
        navMenu.style.transition = 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        navMenu.style.opacity = '1';
        navMenu.style.transform = 'translateY(0)';
        decodeTextElement(navMenu, 1500);
      }
      if (fuelBtn) {
        fuelBtn.style.transition = 'max-width 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease, padding 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        fuelBtn.style.transform = 'translateY(0)';
        fuelBtn.style.maxWidth = '180px';
        fuelBtn.style.padding = '0.2rem 0.6rem';
        fuelBtn.style.borderWidth = '1px';
        fuelBtn.style.opacity = '1';
        fuelBtn.style.pointerEvents = 'auto';
        decodeTextElement(fuelBtn, 1500);
      }
      scramblePromptBrand();
      scrambleClockTransition(1200);
    }, 1500);

    setTimeout(() => {
      printLine('[3.20s] Synchronizing Thunderstore metrics & Discord bridge... OK', 'info');
      if (heroAscii) {
        heroAscii.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroAscii.style.opacity = '1';
        heroAscii.style.transform = 'translateY(0)';
        decodeTextElement(heroAscii, 2000);
      }
      if (!isHomepage && mainContent) {
        mainContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
        decodeTextElement(mainContent, 2000);
      }
    }, 3200);

    setTimeout(() => {
      printLine('[5.00s] Compiling module repository & release dossiers... OK', 'info');
      if (modsSection) {
        modsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        modsSection.style.opacity = '1';
        modsSection.style.transform = 'translateY(0)';
        decodeTextElement(modsSection, 2200);
      }
    }, 5000);

    setTimeout(() => {
      printLine('[7.20s] Decrypting transmission logs & creator directive... OK', 'info');
      if (logsSection) {
        logsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        logsSection.style.opacity = '1';
        logsSection.style.transform = 'translateY(0)';
      }
      if (fuelSection) {
        fuelSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fuelSection.style.opacity = '1';
        fuelSection.style.transform = 'translateY(0)';
      }
      if (partnerSection) {
        partnerSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        partnerSection.style.opacity = '1';
        partnerSection.style.transform = 'translateY(0)';
      }
      if (aboutSection) {
        aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
        decodeTextElement(aboutSection, 1800);
      }
    }, 7200);

    setTimeout(() => {
      printLine('[9.00s] Initializing graphical render canvas & cyber shaders... OK', 'info');
      if (footer) {
        footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        footer.style.opacity = '1';
        footer.style.transform = 'translateY(0)';
      }
    }, 9000);

    setTimeout(() => {
      printLine('======================================================================', 'success');
      printLine(' [10.00s] SYSTEM BOOT COMPLETE // ALL MODULES ONLINE', 'success');
      printLine('======================================================================', 'success');

      document.documentElement.classList.remove('system-booting');
      isBooted = true;
      isBooting = false;
      localStorage.setItem('vapok_system_booted', 'true');
      updatePowerButtonState();

      if (statusText) {
        statusText.textContent = 'ONLINE';
        statusText.style.color = 'var(--glacial-mint)';
      }

      // Reset styles cleanly
      [heroAscii, modsSection, logsSection, fuelSection, partnerSection, aboutSection, footer, mainContent, navMenu, fuelBtn].forEach((sec) => {
        if (sec) {
          sec.style.opacity = '';
          sec.style.transform = '';
          sec.style.transition = '';
          sec.style.maxWidth = '';
          sec.style.padding = '';
          sec.style.borderWidth = '';
          sec.style.pointerEvents = '';
        }
      });

      // Animate CLI drawer pulling back up into header now that system is ONLINE
      setTimeout(() => {
        toggleCli(false);
      }, 500);
    }, 10000);
  }

  // Progressive Bottom-Up Decompilation Sequence
  function startShutdownSequence(isReboot = false) {
    isShuttingDown = true;
    document.documentElement.classList.remove('system-booting');
    document.documentElement.classList.add('system-shutting-down');

    if (statusText) {
      statusText.textContent = isReboot ? 'REBOOTING...' : 'SHUTTING DOWN...';
      statusText.style.color = 'var(--warning-amber)';
    }

    printLine('--------------------------------------------------', 'warn');
    printLine('>>> INITIATING VAPOK.IO SYSTEM DECOMPILATION <<<', 'warn');
    printLine('[0.00s] Commencing graceful shutdown of UI & kernel modules...', 'info');

    // Section References for Staggered Decompile
    const navMenu = document.getElementById('header-nav-menu');
    const fuelBtn = document.getElementById('header-fuel-btn');
    const heroAscii = document.querySelector('.hero-ascii-section');
    const modsSection = document.getElementById('mods');
    const logsSection = document.getElementById('logs');
    const fuelSection = document.getElementById('fuel');
    const partnerSection = document.getElementById('partner-infrastructure');
    const aboutSection = document.getElementById('about');
    const footer = document.querySelector('.cyber-footer');

    // 1. [0.80s] Footer & Canvas Disconnect
    setTimeout(() => {
      printLine('[0.80s] Disconnecting graphical render canvas & cyber shaders... OK', 'info');
      if (footer) {
        encodeTextElement(footer, 800);
        footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(15px)';
      }
    }, 800);

    // 2. [1.80s] About, Partner & Logs Decompile
    setTimeout(() => {
      printLine('[1.80s] Encrypting transmission logs & creator directive... OK', 'info');
      if (aboutSection) {
        encodeTextElement(aboutSection, 800);
        aboutSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(15px)';
      }
      if (partnerSection) {
        encodeTextElement(partnerSection, 800);
        partnerSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        partnerSection.style.opacity = '0';
        partnerSection.style.transform = 'translateY(15px)';
      }
      if (logsSection) {
        logsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        logsSection.style.opacity = '0';
        logsSection.style.transform = 'translateY(15px)';
      }
    }, 1800);

    // 3. [2.80s] Mods Catalog & Fuel Decompile
    setTimeout(() => {
      printLine('[2.80s] Unmounting mod catalog dossiers & release tables... OK', 'info');
      if (modsSection) {
        encodeTextElement(modsSection, 800);
        modsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        modsSection.style.opacity = '0';
        modsSection.style.transform = 'translateY(15px)';
      }
      if (fuelSection) {
        encodeTextElement(fuelSection, 800);
        fuelSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fuelSection.style.opacity = '0';
        fuelSection.style.transform = 'translateY(15px)';
      }
    }, 2800);

    // 4. [3.80s] Hero Section & Game Spotlight Suspension
    setTimeout(() => {
      printLine('[3.80s] Releasing Thunderstore cache & matrix buffers... OK', 'info');
      if (heroAscii) {
        encodeTextElement(heroAscii, 800);
        heroAscii.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroAscii.style.opacity = '0';
        heroAscii.style.transform = 'translateY(15px)';
      }
    }, 3800);

    // 5. [4.80s] Header Navigation & Support Unmount
    setTimeout(() => {
      printLine('[4.80s] Disengaging navigation links & support endpoints... OK', 'info');
      if (navMenu) {
        encodeTextElement(navMenu, 600);
        navMenu.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        navMenu.style.opacity = '0';
        navMenu.style.transform = 'translateY(-10px)';
      }
      if (fuelBtn) {
        encodeTextElement(fuelBtn, 600);
        fuelBtn.style.transition = 'max-width 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, padding 0.8s ease';
        fuelBtn.style.maxWidth = '0';
        fuelBtn.style.padding = '0';
        fuelBtn.style.borderWidth = '0';
        fuelBtn.style.opacity = '0';
        fuelBtn.style.pointerEvents = 'none';
      }
      scrambleClockTransition(800);
    }, 4800);

    // 6. [5.50s] Decompilation Complete
    setTimeout(() => {
      printLine('======================================================================', 'error');
      printLine(' [5.50s] SYSTEM DECOMPILATION COMPLETE // MAINFRAME OFFLINE', 'error');
      printLine('======================================================================', 'warn');

      document.documentElement.classList.remove('system-shutting-down');
      document.documentElement.classList.add('system-offline');
      isBooted = false;
      isShuttingDown = false;
      localStorage.removeItem('vapok_system_booted');
      updatePowerButtonState();

      if (statusText) {
        statusText.textContent = 'OFFLINE';
        statusText.style.color = '#ef4444';
      }

      // Reset inline styles cleanly
      [heroAscii, modsSection, logsSection, fuelSection, aboutSection, footer, navMenu, fuelBtn].forEach((sec) => {
        if (sec) {
          sec.style.opacity = '';
          sec.style.transform = '';
          sec.style.transition = '';
          sec.style.maxWidth = '';
          sec.style.padding = '';
          sec.style.borderWidth = '';
          sec.style.pointerEvents = '';
        }
      });

      if (isReboot) {
        printLine('Initiating warm reboot sequence...', 'info');
        setTimeout(() => {
          startBootSequence();
        }, 1200);
      } else {
        printLine('Subsystems dormant. Type "start" (or click [ ⚡ START ]) to initialize.', 'info');
        // Animate CLI drawer pulling back up into header now that system is OFFLINE
        setTimeout(() => {
          toggleCli(false);
        }, 500);
      }
    }, 5500);
  }

  // Progressive Text Encoder helper for decompiling elements into cyber noise
  function encodeTextElement(container, durationMs = 800) {
    if (!container) return;
    const chars = '01#*+=-:.·˙_[]{}<>/\\';
    const textNodes = [];

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim().length > 0) {
        textNodes.push({
          node: node,
          original: node.nodeValue,
        });
      }
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);

      textNodes.forEach(({ node, original }) => {
        const scrambledLen = Math.floor(progress * original.length);
        node.nodeValue = original
          .split('')
          .map((c, i) => {
            if (c === ' ' || c === '\n' || c === '\t') return c;
            if (i < scrambledLen) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return original[i];
          })
          .join('');
      });

      if (progress >= 1.0) {
        clearInterval(interval);
        textNodes.forEach(({ node, original }) => {
          node.nodeValue = original;
        });
      }
    }, 35);
  }

  // Progressive Text Decoder helper for compiling elements
  function decodeTextElement(container, durationMs = 1500) {
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const chars = '01#*+=-:.·˙_[]{}<>/\\';
    const textNodes = [];

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim().length > 0) {
        textNodes.push({
          node: node,
          original: node.nodeValue,
        });
      }
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);

      textNodes.forEach(({ node, original }) => {
        const settledLen = Math.floor(progress * original.length);
        node.nodeValue = original
          .split('')
          .map((c, i) => {
            if (c === ' ' || c === '\n' || c === '\t' || i < settledLen) {
              return original[i];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      if (progress >= 1.0) {
        clearInterval(interval);
        textNodes.forEach(({ node, original }) => {
          node.nodeValue = original;
        });
      }
    }, 40);
  }
}

/* ==========================================================================
   8. MOBILE BACK-TO-TOP BUTTON WITH SCATTER ENTRANCE
   ========================================================================== */
function initMobileBackToTop() {
  const bttBtn = document.getElementById('mobile-back-to-top');
  if (!bttBtn) return;

  let isVisible = false;
  let isScrambling = false;
  const targetText = '[ ▲ TOP ]';
  const chars = '01#*+=-:.·˙_[]{}<>/\\$!%^&';

  function scrambleButton() {
    if (isScrambling) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bttBtn.textContent = targetText;
      return;
    }
    isScrambling = true;
    const startTime = Date.now();
    const durationMs = 320;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);
      const settledLen = Math.floor(progress * targetText.length);

      bttBtn.textContent = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < settledLen) return targetText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (progress >= 1.0) {
        clearInterval(interval);
        bttBtn.textContent = targetText;
        isScrambling = false;
      }
    }, 30);
  }

  function handleScroll() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      if (isVisible) {
        bttBtn.classList.remove('visible');
        isVisible = false;
      }
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollY > 150) {
      if (!isVisible) {
        isVisible = true;
        bttBtn.classList.add('visible');
        scrambleButton();
      }
    } else {
      if (isVisible) {
        isVisible = false;
        bttBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();

  bttBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scrambleButton();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. LIVE TELEMETRY / ACTIVE PLAYER COUNTER & MOD BREAKDOWN
   ========================================================================== */
function initLivePlayerCounter() {
  const heroCounterEl = document.getElementById('hero-live-players-count');
  const modRows = document.querySelectorAll('.mod-live-players-row');
  const modPills = document.querySelectorAll('.mod-live-spec-pill');

  if (!heroCounterEl && modRows.length === 0 && modPills.length === 0) {
    return;
  }

  const endpoint = window.VAPOK_TELEMETRY_ENDPOINT ||
                   localStorage.getItem('vapok_telemetry_endpoint') ||
                   'https://wandering-wood-4a54.vapokrocks.workers.dev/';

  let currentHeroCount = null;
  const modCurrentCounts = new Map();

  function normalize(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function animateElementCount(el, targetVal, currentValTracker, key) {
    if (!el) return;
    if (typeof targetVal !== 'number' || isNaN(targetVal)) {
      el.textContent = targetVal;
      return;
    }

    const startVal = typeof currentValTracker === 'number' ? currentValTracker : 0;
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (targetVal - startVal) * ease);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (key) modCurrentCounts.set(key, targetVal);
        el.textContent = targetVal.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  function updateModElements(modsList) {
    if (!Array.isArray(modsList)) return;

    const allElements = [...modRows, ...modPills];
    allElements.forEach((container) => {
      const slug = container.getAttribute('data-mod-slug') || '';
      const name = container.getAttribute('data-mod-name') || '';
      const countEl = container.querySelector('.mod-players-count');
      if (!countEl) return;

      const normSlug = normalize(slug);
      const normName = normalize(name);

      const matchedMod = modsList.find((m) => {
        const normM = normalize(m.name);
        return normM === normName ||
               normM === normSlug ||
               normM.includes(normSlug) ||
               normSlug.includes(normM);
      });

      if (matchedMod) {
        if (typeof matchedMod.activePlayers === 'number') {
          const targetCount = matchedMod.activePlayers;
          const currentVal = modCurrentCounts.get(slug || name);
          animateElementCount(countEl, targetCount, currentVal, slug || name);
        }

        // Live Version Sync
        if (matchedMod.version) {
          const card = container.closest('.mod-card');
          if (card) {
            const verEl = card.querySelector('.mod-version-val');
            if (verEl) verEl.textContent = matchedMod.version;
          }
          const hero = container.closest('.mod-dossier-hero');
          if (hero) {
            const verEl = hero.querySelector('.mod-version-val');
            if (verEl) verEl.textContent = matchedMod.version;
          }
        }
      } else {
        countEl.textContent = '--';
      }
    });
  }

  async function fetchLiveTelemetry() {
    try {
      const debugVal = localStorage.getItem('vapok_mock_active_players');
      if (debugVal !== null) {
        const val = parseInt(debugVal, 10);
        if (heroCounterEl) {
          animateElementCount(heroCounterEl, isNaN(val) ? 42 : val, currentHeroCount, 'hero');
          currentHeroCount = isNaN(val) ? 42 : val;
        }
        return;
      }

      const res = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-cache'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      window.VAPOK_LATEST_TELEMETRY = data;

      // 1. Update Hero Total
      const totalCount = data.activePlayers ?? data.activeUsers ?? data.count ?? data.total;
      if (heroCounterEl && typeof totalCount === 'number') {
        animateElementCount(heroCounterEl, totalCount, currentHeroCount, 'hero');
        currentHeroCount = totalCount;
      }

      // 2. Update Mod Cards & Dossiers
      if (data.mods && Array.isArray(data.mods)) {
        updateModElements(data.mods);
      }
    } catch (err) {
      if (heroCounterEl && currentHeroCount === null) {
        heroCounterEl.textContent = '--';
      }
    }
  }

  fetchLiveTelemetry();

  // Poll every 10 seconds
  setInterval(fetchLiveTelemetry, 10000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      fetchLiveTelemetry();
    }
  });

  window.setMockLivePlayers = function(num) {
    if (num === null) {
      localStorage.removeItem('vapok_mock_active_players');
    } else {
      localStorage.setItem('vapok_mock_active_players', num);
    }
    fetchLiveTelemetry();
  };
}



