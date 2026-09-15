/**
 * VAPOK MODDING — CYBER-CONSOLE INTERACTIVE ENGINE
 * Features:
 * - Reactive ASCII Matrix / Particle Canvas
 * - Text Glitch / Decoder Effect on Hover
 * - CRT Scanline State Toggle
 * - Mod Category Quick Filtering
 * - Live Terminal Clock & Uptime
 * - Mod Dossier Tabbed Viewer
 */

document.addEventListener('DOMContentLoaded', () => {
  initAsciiCanvas();
  initCrtToggle();
  initTextScramble();
  initModFilters();
  initSystemClock();
  initDossierTabs();
});

/* ==========================================================================
   1. REACTIVE ASCII CANVAS BACKGROUND
   ========================================================================== */
function initAsciiCanvas() {
  const canvas = document.getElementById('ascii-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const chars = '01#*+=-:.·˙VAPOK';
  const fontSize = 14;
  const columns = Math.floor(width / fontSize);
  const rows = Math.floor(height / fontSize);
  
  const grid = [];
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

  let mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

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

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. CRT SCANLINE TOGGLE
   ========================================================================== */
function initCrtToggle() {
  const toggleBtn = document.getElementById('crt-toggle-btn');
  if (!toggleBtn) return;

  const savedCrt = localStorage.getItem('vapok_crt_state');
  if (savedCrt === 'off') {
    document.body.classList.add('crt-off');
    toggleBtn.textContent = '[ CRT: OFF ]';
  } else {
    toggleBtn.textContent = '[ CRT: ON ]';
  }

  toggleBtn.addEventListener('click', () => {
    const isOff = document.body.classList.toggle('crt-off');
    toggleBtn.textContent = isOff ? '[ CRT: OFF ]' : '[ CRT: ON ]';
    localStorage.setItem('vapok_crt_state', isOff ? 'off' : 'on');
  });
}

/* ==========================================================================
   3. TEXT DECODER / SCRAMBLER HOVER EFFECT
   ========================================================================== */
function initTextScramble() {
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
 * Continuous Matrix ASCII Glitch for the Banner
 */
function initAsciiBannerGlitch() {
  const asciiEl = document.querySelector('.ascii-art');
  if (!asciiEl) return;

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
function initSystemClock() {
  const clockEl = document.getElementById('system-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const utc = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    clockEl.textContent = utc;
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
}
