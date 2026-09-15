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
let isClockScrambling = false;

function initSystemClock() {
  const clockEl = document.getElementById('system-clock');
  if (!clockEl) return;

  function updateClock() {
    if (isClockScrambling) return;
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
  let isShuttingDown = false;

  function printLine(text, type = 'info') {
    if (!cliOutput) return;
    const line = document.createElement('div');
    line.className = `cli-line ${type}`;
    line.textContent = text;
    cliOutput.appendChild(line);
    cliOutput.scrollTop = cliOutput.scrollHeight;
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

  function scramblePromptBrand() {
    const promptPrefix = document.querySelector('#terminal-brand-btn .prompt-prefix');
    if (!promptPrefix) return;
    const targetText = 'user@vapok.io:~$';
    const chars = '01#*+=-:.·˙_[]{}<>/\\$!%^&';
    let iteration = 0;
    const interval = setInterval(() => {
      promptPrefix.textContent = targetText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= targetText.length) {
        clearInterval(interval);
        promptPrefix.textContent = targetText;
      }
      iteration += 1 / 2;
    }, 30);
  }

  function scrambleClockTransition(durationMs = 1200) {
    const clockEl = document.getElementById('system-clock');
    if (!clockEl) return;

    isClockScrambling = true;
    const chars = '01#*+=-:.·˙_[]{}<>/\\$!%^&';
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);

      const now = new Date();
      const targetText = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      const settledLen = Math.floor(progress * targetText.length);

      clockEl.textContent = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === ':') return char;
          if (index < settledLen) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (progress >= 1.0) {
        clearInterval(interval);
        const finalNow = new Date();
        clockEl.textContent = finalNow.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
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
        brandBtn.title = 'Click to minimize Interactive CLI (~)';
      }
      if (cliToggleBtn) {
        cliToggleBtn.classList.add('active');
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
        brandBtn.title = 'Click to toggle Terminal Prompt (~)';
        scramblePromptBrand();
      }
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
        { id: 'home-mods', path: '#mods (Mod Catalog Section)', url: '/#mods', desc: 'Jump to Mod Catalog dossiers on homepage' },
        { id: 'home-logs', path: '#logs (Transmission Logs)', url: '/#logs', desc: 'System changelogs & status broadcasts' },
        { id: 'home-about', path: '#about (Creator Directives)', url: '/#about', desc: 'About Vapok & vision statement' }
      ]
    },
    {
      id: 'mods',
      path: '/#mods (Mod Catalog)',
      url: '/#mods',
      desc: '16 Valheim & Techtonica mod releases',
      children: [
        {
          id: 'valheim-mods',
          path: 'Valheim Mods (11 releases)',
          url: '/#mods',
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
          url: '/#mods',
          desc: 'Factory automation & diagnostics',
          children: [
            { id: 'm-bcm', path: 'BetterCoreManagement', url: 'https://techtonica.thunderstore.io/package/Vapok/BetterCoreManagement/', desc: 'Core cluster management & diagnostics', isExternal: true },
            { id: 'm-cresizer', path: 'ContainerResizer', url: 'https://techtonica.thunderstore.io/package/Vapok/ContainerResizer/', desc: 'Expand container storage dimensions', isExternal: true },
            { id: 'm-encumb', path: 'KnowEncumbrance', url: 'https://techtonica.thunderstore.io/package/Vapok/KnowEncumbrance/', desc: 'Weight capacity & encumbrance HUD', isExternal: true }
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
        printLine('AVAILABLE SYSTEM DIRECTIVES:', 'cmd');
        printLine('  start            - Power up system and compile graphical UI', 'info');
        printLine('  status           - Display kernel telemetry & active nodes', 'info');
        printLine('  mods             - View mod catalog dossier repository', 'info');
        printLine('  games            - Display currently playing & rotation games', 'info');
        printLine('  fuel / support   - Open creator support & donation channels', 'info');
        printLine('  discord          - Connect to Vapok Gaming Community Discord', 'info');
        printLine('  crt              - Toggle retro CRT scanline filter', 'info');
        printLine('  shutdown         - Gracefully decompile UI & enter OFFLINE mode', 'info');
        printLine('  reboot           - Gracefully decompile and re-initialize system', 'info');
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
        printLine('--- MODULE REPOSITORY [ VALHEIM & TECHTONICA ] ---', 'success');
        printLine('16 active mods in development. Browse dossiers at: https://vapok.io/#mods', 'info');
        const modsSection = document.getElementById('mods');
        if (modsSection) {
          modsSection.scrollIntoView({ behavior: 'smooth' });
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

    // Section References for Staggered Reveal
    const navMenu = document.getElementById('header-nav-menu');
    const fuelBtn = document.getElementById('header-fuel-btn');
    const heroAscii = document.querySelector('.hero-ascii-section');
    const modsSection = document.getElementById('mods');
    const logsSection = document.getElementById('logs');
    const aboutSection = document.getElementById('about');
    const footer = document.querySelector('.cyber-footer');
    const mainContent = document.getElementById('main-content') || document.querySelector('.page-content') || document.querySelector('main');

    // Hide sections initially to prepare for progressive reveal
    [heroAscii, modsSection, logsSection, aboutSection, footer, !isHomepage ? mainContent : null, navMenu, fuelBtn].forEach((sec) => {
      if (sec) {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(15px)';
        sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }
    });

    if (navMenu) {
      navMenu.style.transform = 'translateY(-10px)';
      navMenu.style.transition = 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (fuelBtn) {
      fuelBtn.style.transform = 'translateY(-10px)';
      fuelBtn.style.transition = 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    // Compilation Log Milestones over 10 seconds
    setTimeout(() => {
      printLine('[1.50s] Mounting multi-game subsystems (Valheim, Techtonica)... OK', 'info');
      if (navMenu) {
        navMenu.style.opacity = '1';
        navMenu.style.transform = 'translateY(0)';
        decodeTextElement(navMenu, 1500);
      }
      if (fuelBtn) {
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
        heroAscii.style.opacity = '1';
        heroAscii.style.transform = 'translateY(0)';
        decodeTextElement(heroAscii, 2000);
      }
      if (!isHomepage && mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
        decodeTextElement(mainContent, 2000);
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
      updatePowerButtonState();

      if (statusText) {
        statusText.textContent = 'ONLINE';
        statusText.style.color = 'var(--glacial-mint)';
      }

      // Reset styles cleanly
      [heroAscii, modsSection, logsSection, aboutSection, footer, mainContent, navMenu, fuelBtn].forEach((sec) => {
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

    // 2. [1.80s] About & Logs Decompile
    setTimeout(() => {
      printLine('[1.80s] Encrypting transmission logs & creator directive... OK', 'info');
      if (aboutSection) {
        encodeTextElement(aboutSection, 800);
        aboutSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(15px)';
      }
      if (logsSection) {
        logsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        logsSection.style.opacity = '0';
        logsSection.style.transform = 'translateY(15px)';
      }
    }, 1800);

    // 3. [2.80s] Mods Catalog Decompile
    setTimeout(() => {
      printLine('[2.80s] Unmounting mod catalog dossiers & release tables... OK', 'info');
      if (modsSection) {
        encodeTextElement(modsSection, 800);
        modsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        modsSection.style.opacity = '0';
        modsSection.style.transform = 'translateY(15px)';
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
      [heroAscii, modsSection, logsSection, aboutSection, footer, navMenu, fuelBtn].forEach((sec) => {
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
        }, 800);
      } else {
        printLine('Subsystems dormant. Type "start" (or click [ ⚡ START ]) to initialize.', 'info');
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
