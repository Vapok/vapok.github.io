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
  initBootloaderAndCli();
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
  if (savedCrt === 'off') {
    document.body.classList.add('crt-off');
    toggleBtn.textContent = '[ CRT: OFF ]';
  } else {
    toggleBtn.textContent = '[ CRT: ON ]';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCrtEffect();
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

  function printLine(text, type = 'info') {
    if (!cliOutput) return;
    const line = document.createElement('div');
    line.className = `cli-line ${type}`;
    line.textContent = text;
    cliOutput.appendChild(line);
    cliOutput.scrollTop = cliOutput.scrollHeight;
  }

  const cyberHeader = document.querySelector('.cyber-header');

  function toggleCli(forceOpen = null) {
    if (!cliDrawer) return;
    const shouldOpen = forceOpen !== null ? forceOpen : !cliDrawer.classList.contains('open');
    if (shouldOpen) {
      cliDrawer.classList.add('open');
      if (cyberHeader) cyberHeader.classList.add('cli-open');
      if (brandBtn) brandBtn.style.display = 'none';
      if (cliToggleBtn) {
        cliToggleBtn.classList.add('active');
        cliToggleBtn.textContent = '[ CLI: <_ ]';
      }
      if (cliInput) setTimeout(() => cliInput.focus(), 100);
    } else {
      cliDrawer.classList.remove('open');
      if (cyberHeader) cyberHeader.classList.remove('cli-open');
      if (brandBtn) brandBtn.style.display = '';
      if (cliToggleBtn) {
        cliToggleBtn.classList.remove('active');
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
    bootQuickBtn.addEventListener('click', () => executeCommand('boot'));
  }

  // Global hotkeys: '~' / '`' or 'Enter' when closed to open console
  window.addEventListener('keydown', (e) => {
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

  // Check initial state
  if (!isBooted) {
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
    printLine('Type "boot" or "./launch" (or click [ ⚡ BOOT ]) to initialize system.', 'success');
  } else {
    document.documentElement.classList.remove('system-offline');
    if (statusText) {
      statusText.textContent = 'ONLINE';
      statusText.style.color = 'var(--glacial-mint)';
    }
    printLine('VAPOK_OS v2026.1 // System Online. Type "help" for commands.', 'info');
  }

  // Handle Command Submission
  if (cliForm) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const raw = cliInput.value.trim();
      cliInput.value = '';
      if (!raw) {
        printLine('user@vapok.io:~$', 'cmd');
      } else {
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
      case 'boot':
      case './launch':
      case 'launch':
      case 'start':
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

      case 'help':
      case '?':
      case 'commands':
        printLine('AVAILABLE SYSTEM DIRECTIVES:', 'cmd');
        printLine('  boot / ./launch  - Power up system and compile graphical UI', 'info');
        printLine('  status           - Display kernel telemetry & active nodes', 'info');
        printLine('  mods             - View mod catalog dossier repository', 'info');
        printLine('  games            - Display currently playing & rotation games', 'info');
        printLine('  fuel / support   - Open creator support & donation channels', 'info');
        printLine('  discord          - Connect to Vapok Gaming Community Discord', 'info');
        printLine('  crt              - Toggle retro CRT scanline filter', 'info');
        printLine('  clear / cls      - Clear terminal log output', 'info');
        printLine('  exit / close     - Minimize terminal drawer', 'info');
        printLine('  reboot / shutdown- Re-enter OFFLINE mode to replay boot sequence', 'info');
        break;

      case 'status':
      case 'info':
        printLine('--- SYSTEM TELEMETRY ---', 'cmd');
        printLine(`Node: vapok.io [185.199.108.153]`, 'info');
        printLine(`Kernel: VAPOK-OS v2026.1-x86_64`, 'info');
        printLine(`Status: ${isBooted ? 'ONLINE (Optimal)' : 'OFFLINE (Dormant)'}`, isBooted ? 'success' : 'warn');
        printLine(`Active Mod Releases: 16 projects (Valheim & Techtonica)`, 'info');
        printLine(`Spotlight Games: 11 active titles in rotation`, 'info');
        printLine(`Uptime: ${Math.floor(performance.now() / 1000)}s since session start`, 'info');
        break;

      case 'mods':
        printLine('Accessing // MODULE_REPOSITORY...', 'success');
        const modsSection = document.getElementById('mods');
        if (modsSection) {
          modsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = '/#mods';
        }
        break;

      case 'games':
      case 'playing':
        printLine('Accessing // CURRENTLY_PLAYING_MATRIX...', 'success');
        window.location.href = '/games/';
        break;

      case 'fuel':
      case 'support':
      case 'donate':
        printLine('Redirecting to [ ⚡ FUEL THE DEVELOPER ]...', 'warn');
        window.location.href = '/support/';
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

      case 'exit':
      case 'close':
      case 'quit':
      case 'hide':
        printLine('Minimizing interactive CLI terminal drawer...', 'info');
        setTimeout(() => toggleCli(false), 200);
        break;

      case 'reboot':
      case 'shutdown':
      case 'poweroff':
        printLine('Initiating system shutdown sequence...', 'warn');
        localStorage.removeItem('vapok_system_booted');
        isBooted = false;
        setTimeout(() => {
          window.location.reload();
        }, 600);
        break;

      default:
        printLine(`Command not recognized: "${rawCmd}". Type "help" for available commands.`, 'error');
        break;
    }
  }

  // 10-Second Progressive Top-Down Compilation Sequence
  function startBootSequence() {
    isBooting = true;
    document.documentElement.classList.remove('system-offline');
    document.documentElement.classList.add('system-booting');

    if (statusText) {
      statusText.textContent = 'BOOTING...';
      statusText.style.color = 'var(--warning-amber)';
    }

    printLine('--------------------------------------------------', 'warn');
    printLine('>>> INITIATING VAPOK.IO SYSTEM BOOTLOADER <<<', 'cmd');
    printLine('[0.00s] Initializing Vapok OS Kernel v2026.1...', 'info');

    // Section References for Staggered Reveal
    const navMenu = document.getElementById('header-nav-menu');
    const fuelBtn = document.getElementById('header-fuel-btn');
    const heroAscii = document.querySelector('.hero-ascii-section');
    const modsSection = document.getElementById('mods');
    const logsSection = document.getElementById('logs');
    const aboutSection = document.getElementById('about');
    const footer = document.querySelector('.cyber-footer');

    // Hide sections initially to prepare for progressive reveal
    [heroAscii, modsSection, logsSection, aboutSection, footer].forEach((sec) => {
      if (sec) {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(15px)';
        sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }
    });

    // Compilation Log Milestones over 10 seconds
    setTimeout(() => {
      printLine('[1.50s] Mounting multi-game subsystems (Valheim, Techtonica)... OK', 'info');
      if (navMenu) decodeTextElement(navMenu, 1500);
      if (fuelBtn) decodeTextElement(fuelBtn, 1500);
    }, 1500);

    setTimeout(() => {
      printLine('[3.20s] Synchronizing Thunderstore metrics & Discord bridge... OK', 'info');
      if (heroAscii) {
        heroAscii.style.opacity = '1';
        heroAscii.style.transform = 'translateY(0)';
        decodeTextElement(heroAscii, 2000);
      }
    }, 3200);

    setTimeout(() => {
      printLine('[5.00s] Compiling module repository & release dossiers... OK', 'info');
      if (modsSection) {
        modsSection.style.opacity = '1';
        modsSection.style.transform = 'translateY(0)';
        decodeTextElement(modsSection, 2200);
      }
    }, 5000);

    setTimeout(() => {
      printLine('[7.20s] Decrypting transmission logs & creator directive... OK', 'info');
      if (logsSection) {
        logsSection.style.opacity = '1';
        logsSection.style.transform = 'translateY(0)';
      }
      if (aboutSection) {
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
        decodeTextElement(aboutSection, 1800);
      }
    }, 7200);

    setTimeout(() => {
      printLine('[9.00s] Initializing graphical render canvas & cyber shaders... OK', 'info');
      if (footer) {
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

      if (statusText) {
        statusText.textContent = 'ONLINE';
        statusText.style.color = 'var(--glacial-mint)';
      }

      // Reset styles cleanly
      [heroAscii, modsSection, logsSection, aboutSection, footer].forEach((sec) => {
        if (sec) {
          sec.style.opacity = '';
          sec.style.transform = '';
          sec.style.transition = '';
        }
      });
    }, 10000);
  }

  // Progressive Text Decoder helper for compiling elements
  function decodeTextElement(container, durationMs = 1500) {
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
