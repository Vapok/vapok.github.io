---
layout: page
title: "Enshrouded Community Server Dossier"
permalink: /servers/enshrouded/
description: "Connection credentials, open Visitor permissions, base building password, live interactive map, and rules for Vapok's Community Enshrouded Server."
---

<!-- BREADCRUMB & RETURN LINK -->
<div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
  <a href="{{ '/servers/' | relative_url }}" class="cyber-btn" style="font-size: 0.78rem;">
    [ &larr; RETURN TO COMMUNITY SERVERS DIRECTORY ]
  </a>
  <span style="font-size: 0.76rem; color: var(--ice-blue); font-family: var(--font-mono, monospace);">
    SYS_NODE // SHROUD-01 // CO-OP SURVIVAL
  </span>
</div>

<!-- ======================================================================= -->
<!-- FEATURED SERVER DOSSIER: ENSHROUDED 1.0                                 -->
<!-- ======================================================================= -->
<article class="server-card">
  <div class="server-header-cluster">
    <div class="server-title-group">
      <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.35rem;">
        <span class="status-badge mint">ONLINE // OPEN ACCESS</span>
        <span style="font-size: 0.76rem; color: var(--ice-blue); font-family: var(--font-mono, monospace);">NODE: SHROUD-01 // CO-OP SURVIVAL</span>
      </div>
      <h2>Vapok's Community Enshrouded Server</h2>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0; line-height: 1.5;">
        Survive the deadly Shroud of Embervale, build underground voxel strongholds, and venture across the corrupted realm alongside fellow Flameborn.
      </p>
    </div>

    <!-- Live 1.0 Reset Status & Countdown Badge -->
    <div id="enshrouded-status-badge" class="server-countdown-badge">
      <span id="countdown-label">⏳ 1.0 MAP RESET:</span>
      <span id="countdown-timer">CALCULATING...</span>
    </div>
  </div>

  <!-- Banner & Reset Notice Callout -->
  <div style="margin-bottom: 1.5rem; border: 1px solid rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.05); padding: 1rem 1.25rem;">
    <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
      <span style="font-size: 1.3rem; line-height: 1;">🗺️</span>
      <div>
        <strong style="color: var(--warning-amber); display: block; font-size: 0.92rem; margin-bottom: 0.25rem;">
          CURRENT MAP: EARLY ACCESS
        </strong>
        <span style="color: var(--text-main); font-size: 0.86rem; line-height: 1.5;">
          The current world is running in Early Access and will <strong>automatically reset to a fresh 1.0 release world on Thursday, October 15, 2026 at 11:00 AM EDT</strong>. Jump in now to explore or get ready for tomorrow's launch!
        </span>
      </div>
    </div>
  </div>

  <!-- Credentials Readout Matrix -->
  <div class="server-credentials-grid">
    <!-- Server Direct IP & Port -->
    <div class="server-credential-cell">
      <div>
        <span class="server-credential-label">SERVER DIRECT IP &amp; QUERY PORT</span>
        <div class="server-credential-value">
          <span id="enshrouded-ip">15.204.215.165:37601</span>
          <button type="button" class="cyber-btn server-copy-btn" onclick="copyCred('enshrouded-ip', this)" aria-label="Copy server IP and port">
            [ 📋 COPY IP ]
          </button>
        </div>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-dim); margin-top: 0.6rem;">
        Default Enshrouded Steam Direct Connect port
      </div>
    </div>

    <!-- Base Building Password via Discord -->
    <div class="server-credential-cell">
      <div>
        <span class="server-credential-label">BASE BUILDING ACCESS // SERVER PASSWORD</span>
        <div class="server-credential-value">
          <span style="color: var(--warning-amber); font-size: 0.92rem;">Discord Password Required</span>
          <a href="https://discord.gg/4zCbbVpac2" target="_blank" rel="noopener noreferrer" class="cyber-btn server-copy-btn" style="color: var(--warning-amber) !important; border-color: rgba(251, 191, 36, 0.5);">
            [ 🔑 GET PASSWORD ]
          </a>
        </div>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-dim); margin-top: 0.6rem;">
        Grants full base-building rights. Join our Discord to grab the password!
      </div>
    </div>

    <!-- Visitor Permissions (No Password) -->
    <div class="server-credential-cell">
      <div>
        <span class="server-credential-label">VISITOR ACCESS // NO PASSWORD NEEDED</span>
        <div class="server-credential-value" style="color: var(--glacial-mint); font-size: 0.98rem;">
          <span>Open To Everyone!</span>
        </div>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-dim); margin-top: 0.6rem;">
        Join without a password as a Visitor to explore, alter terrain, fight, collect loot, and use craftspeople.
      </div>
    </div>

    <!-- Discord Comms Channel -->
    <div class="server-credential-cell">
      <div>
        <span class="server-credential-label">DISCORD COMMS &amp; VOICE</span>
        <div class="server-credential-value">
          <span style="color: var(--ice-blue-bright);">#enshrouded</span>
          <a href="https://discord.gg/4zCbbVpac2" target="_blank" rel="noopener noreferrer" class="cyber-btn server-copy-btn">
            [ 💬 OPEN DISCORD ]
          </a>
        </div>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-dim); margin-top: 0.6rem;">
        Community channel for chat, voice, base coordination, &amp; server password
      </div>
    </div>
  </div>

  <!-- LIVE INTERACTIVE SERVER MAP -->
  <div class="server-map-card">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span class="status-badge cyan">🗺️ LIVE CARTOGRAPHY</span>
        <span style="font-size: 0.78rem; color: var(--ice-blue); font-family: var(--font-mono, monospace); letter-spacing: 0.5px;">
          EMBERVALE_SATELLITE_FEED // ACTIVE RADAR
        </span>
      </div>
      <span style="font-size: 0.74rem; color: var(--text-dim); font-family: var(--font-mono, monospace);">
        POWERED BY SURVIVAL SERVERS
      </span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; align-items: center;">
      <div>
        <h3 style="color: var(--ice-blue-bright); font-size: 1.15rem; margin: 0 0 0.4rem 0;">
          Live Interactive Server World Map
        </h3>
        <p style="color: var(--text-main); font-size: 0.88rem; line-height: 1.55; margin: 0 0 0.75rem 0;">
          Curious about what the community has explored, where fellow Flameborn have built, or where you can claim a base? Survival Servers generates a real-time web map of our active world!
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.25rem;">
          <span style="font-size: 0.74rem; background: rgba(100, 240, 252, 0.08); border: 1px solid rgba(100, 240, 252, 0.2); color: var(--ice-blue); padding: 0.2rem 0.55rem; font-family: var(--font-mono, monospace);">
            🧭 Explored Topography &amp; Fog
          </span>
          <span style="font-size: 0.74rem; background: rgba(0, 245, 155, 0.08); border: 1px solid rgba(0, 245, 155, 0.2); color: var(--glacial-mint); padding: 0.2rem 0.55rem; font-family: var(--font-mono, monospace);">
            🔥 Player Bases &amp; Flame Altars
          </span>
          <span style="font-size: 0.74rem; background: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.2); color: var(--warning-amber); padding: 0.2rem 0.55rem; font-family: var(--font-mono, monospace);">
            📍 Fast-Travel Spires &amp; Shrines
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem; min-width: 200px;">
        <a href="https://www.survivalservers.com/share/enshrouded/map/172c66704f18ce873c37c6f7fe7c32e8" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-mint" style="width: 100%; box-sizing: border-box; justify-content: center; text-align: center;">
          [ 🌐 OPEN LIVE MAP &rarr; ]
        </a>
        <button type="button" class="cyber-btn server-copy-btn" onclick="copySnippet('https://www.survivalservers.com/share/enshrouded/map/172c66704f18ce873c37c6f7fe7c32e8', this)" style="width: 100%; box-sizing: border-box; justify-content: center;">
          [ 📋 COPY MAP LINK ]
        </button>
      </div>
    </div>
  </div>

  <!-- SERVER RULES DIRECTIVES -->
  <div style="margin-top: 2rem;">
    <div class="section-title" style="margin-bottom: 0.85rem; font-size: 0.95rem;">
      <span>// SERVER_RULES</span>
      <span class="section-title-tag">[ CODE OF CONDUCT &amp; PROTOCOLS ]</span>
    </div>

    <div class="server-rules-container">
      <!-- Rule 1 -->
      <div class="server-rule-item">
        <div class="server-rule-num">01</div>
        <div>
          <div class="server-rule-title">Don't Be A Dick.</div>
          <p class="server-rule-text">
            This is a co-op game. Be cooperative. Anyone being a dick, including trolling, destroying things that they didn't build, or otherwise not being helpful will be banned from the server.
          </p>
        </div>
      </div>

      <!-- Rule 2 -->
      <div class="server-rule-item">
        <div class="server-rule-num">02</div>
        <div>
          <div class="server-rule-title">Use Altars Sparingly.</div>
          <p class="server-rule-text">
            We only get so many Flame Altars server-wide. Instead of claiming isolated plots, check our <a href="https://www.survivalservers.com/share/enshrouded/map/172c66704f18ce873c37c6f7fe7c32e8" target="_blank" rel="noopener noreferrer" style="color: var(--glacial-mint); font-weight: 700; text-decoration: underline;">Live Server Map</a> to find a base already in the works of being built and see about helping add on to it, or find a space in the area of the base for you to build your own base. Or be like Vapok and build hobbit holes and live underground!
          </p>
        </div>
      </div>

      <!-- Rule 3 -->
      <div class="server-rule-item">
        <div class="server-rule-num">03</div>
        <div>
          <div class="server-rule-title">Use the #enshrouded Channel.</div>
          <p class="server-rule-text">
            The <strong>#enshrouded</strong> channel in Discord is the central hub for all server talk, inside and outside the game, sharing map points of interest, coordinate trades, and organizing dungeon runs.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- STEP-BY-STEP QUICK CONNECT GUIDE -->
  <div style="margin-top: 2.25rem;">
    <div class="section-title" style="margin-bottom: 0.85rem; font-size: 0.95rem;">
      <span>// HOW_TO_CONNECT</span>
      <span class="section-title-tag">[ QUICK JOIN PROCEDURE ]</span>
    </div>

    <div class="server-steps-grid">
      <div class="server-step-card">
        <span class="server-step-badge">STEP // 01</span>
        <h4>Launch Enshrouded</h4>
        <p>Start Enshrouded via Steam and ensure your game client is up to date.</p>
      </div>
      <div class="server-step-card">
        <span class="server-step-badge">STEP // 02</span>
        <h4>Select Play &rarr; Join</h4>
        <p>From the main menu, click <strong>Play</strong> and navigate to the <strong>Join Online Game</strong> tab.</p>
      </div>
      <div class="server-step-card">
        <span class="server-step-badge">STEP // 03</span>
        <h4>Find or Direct-Connect</h4>
        <p>Search for <strong>Vapok's Community Enshrouded Server</strong> or connect directly via IP <code>15.204.215.165:37601</code>.</p>
      </div>
      <div class="server-step-card">
        <span class="server-step-badge">STEP // 04</span>
        <h4>Join &amp; Explore!</h4>
        <p>Connect without a password to explore as a <strong>Visitor</strong>! Want to help build bases? Hop into Discord to grab the password.</p>
      </div>
    </div>
  </div>

  <!-- ACTIONS ROW -->
  <div style="margin-top: 2rem; display: flex; gap: 0.8rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
    <a href="https://www.survivalservers.com/share/enshrouded/map/172c66704f18ce873c37c6f7fe7c32e8" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-cyan">
      [ 🗺️ VIEW LIVE SERVER MAP ]
    </a>
    <a href="https://discord.gg/4zCbbVpac2" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-mint">
      [ 💬 HOP INTO #ENSHROUDED ON DISCORD ]
    </a>
    <a href="{{ '/servers/' | relative_url }}" class="cyber-btn">
      [ &larr; ALL COMMUNITY SERVERS ]
    </a>
  </div>
</article>

<!-- ======================================================================= -->
<!-- INFRASTRUCTURE PARTNER: SURVIVAL SERVERS                                -->
<!-- ======================================================================= -->
<section id="infrastructure-partner" style="margin-top: 3.5rem;">
  <div class="section-header">
    <div class="section-title">
      <span>// INFRASTRUCTURE_PARTNER</span>
      <span class="section-title-tag">[ OFFICIAL SERVER HOST ]</span>
    </div>
  </div>

  <div class="server-sponsor-box">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span class="status-badge mint">OFFICIAL HOST</span>
        <span style="font-size: 0.82rem; color: var(--ice-blue); font-weight: 700; letter-spacing: 0.5px;">
          SURVIVAL SERVERS // ENSHROUDED 1.0 DEDICATED HOST
        </span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 0.8rem; color: var(--warning-amber); font-weight: 700; font-family: var(--font-mono, monospace);">
          PROMO: [ 25% OFF CODE: ENSHROUDED25 ]
        </span>
        <button type="button" class="cyber-btn server-copy-btn" onclick="copySnippet('ENSHROUDED25', this)" aria-label="Copy promo code ENSHROUDED25">
          [ 📋 COPY CODE ]
        </button>
      </div>
    </div>

    <!-- Survival Servers Banner -->
    <a href="https://www.survivalservers.com/services/game_servers/enshrouded/?ref=vapok" target="_blank" rel="nofollow sponsored noopener noreferrer" class="partner-banner-link" style="display: block; border: 1px solid rgba(100, 240, 252, 0.25); overflow: hidden; line-height: 0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);">
      <img src="{{ '/assets/images/sponsors/survivalservers-enshrouded-banner.png' | relative_url }}" alt="Survival Servers - Enshrouded 1.0 Dedicated Servers (25% off with code ENSHROUDED25)" style="width: 100%; height: auto; display: block; object-fit: contain;">
    </a>

    <!-- Partner Details -->
    <div style="margin-top: 1.25rem; display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; align-items: center;">
      <div>
        <h3 style="color: var(--ice-blue-bright); font-size: 1.15rem; margin: 0 0 0.4rem 0;">
          Servers Hosted By SurvivalServers.com
        </h3>
        <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.55; margin: 0 0 0.5rem 0;">
          Our community world is proudly powered by <strong>Survival Servers</strong>, delivering ultra-low ping, instant setup, NVMe storage performance, DDoS protection, effortless control panel configuration, and features like <strong>live shareable server web maps</strong>.
        </p>
        <p style="color: var(--text-muted); font-size: 0.84rem; margin: 0;">
          ⚡ Looking to spin up your own dedicated private world for friends or guildmates? <strong>Get 25% off Enshrouded servers for the 1.0 release</strong> using promo code <strong style="color: var(--warning-amber);">ENSHROUDED25</strong> through our partner link.
        </p>
      </div>

      <div style="white-space: nowrap;">
        <a href="https://www.survivalservers.com/services/game_servers/enshrouded/?ref=vapok" target="_blank" rel="nofollow sponsored noopener noreferrer" class="cyber-btn btn-amber" style="font-size: 0.85rem; padding: 0.65rem 1.15rem;">
          [ 🚀 GET YOUR SERVER &rarr; ]
        </a>
      </div>
    </div>
  </div>
</section>

<!-- REALTIME CLIENT LOGIC (COPY UTILITY & COUNTDOWN) -->
<script>
  function copyCred(elementId, btnElement) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText.trim();
    copySnippet(text, btnElement);
  }

  function copySnippet(text, btnElement) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(btnElement);
      }).catch(() => {
        fallbackCopy(text, btnElement);
      });
    } else {
      fallbackCopy(text, btnElement);
    }
  }

  function fallbackCopy(text, btnElement) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(btnElement);
    } catch (err) {
      console.error('Copy fallback failed:', err);
    }
    document.body.removeChild(textarea);
  }

  function showCopyFeedback(btnElement) {
    const originalText = btnElement.innerText;
    btnElement.classList.add('copied');
    btnElement.innerText = '[ ✓ COPIED ]';
    setTimeout(() => {
      btnElement.classList.remove('copied');
      btnElement.innerText = originalText;
    }, 2000);
  }

  // Real-time Countdown to Enshrouded 1.0 Release
  (function initEnshroudedCountdown() {
    const targetDate = new Date('2026-10-15T11:00:00-04:00').getTime();
    const timerElem = document.getElementById('countdown-timer');
    const labelElem = document.getElementById('countdown-label');
    const badgeElem = document.getElementById('enshrouded-status-badge');

    if (!timerElem) return;

    function update() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        if (labelElem) labelElem.innerText = '⚡ 1.0 WORLD STATUS:';
        timerElem.innerText = 'NOW LIVE ON 1.0!';
        if (badgeElem) badgeElem.classList.add('active-1-0');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const hStr = hours.toString().padStart(2, '0');
      const mStr = minutes.toString().padStart(2, '0');
      const sStr = seconds.toString().padStart(2, '0');

      timerElem.innerText = `${hStr}h ${mStr}m ${sStr}s`;
    }

    update();
    setInterval(update, 1000);
  })();
</script>
