---
layout: default
title: Home
---

{% include ascii-banner.html %}

{% assign featured_server = site.data.servers | where: "slug", "enshrouded" | first %}

<!-- FEATURED SERVER SPOTLIGHT -->
<section id="featured-server" class="featured-spotlight-section" aria-label="Featured Community Server Spotlight">
  <div class="section-header">
    <div class="section-title">
      <span>// SPOTLIGHT_DEPLOYMENT</span>
      <span class="section-title-tag">[ COMMUNITY SERVER ]</span>
    </div>
    <div class="featured-status-tag">
      <span class="telemetry-radar-dot" style="background: var(--glacial-mint); box-shadow: 0 0 8px var(--glacial-mint); width: 7px; height: 7px; border-radius: 50%; display: inline-block;" aria-hidden="true"></span>
      <span id="home-countdown-header">LAUNCHING TOMORROW // OCT 15 @ 11:00 AM EDT</span>
    </div>
  </div>

  <div class="featured-spotlight-box">
    <div class="featured-spotlight-grid">
      
      <!-- LEFT: METADATA, ACCESS POLICY & VALUE PROPOSITION -->
      <div class="featured-spotlight-info">
        <div class="featured-badge-row">
          <span class="status-badge mint">★ COMMUNITY SERVER</span>
          <span class="status-badge amber">1.0 LAUNCH TOMORROW</span>
          <span class="status-badge cyan">OPEN VISITOR ACCESS</span>
          <span class="status-badge subtle">NODE: {{ featured_server.node_id | default: 'SHROUD-01' }}</span>
        </div>

        <div class="featured-header-row">
          <a href="{{ featured_server.dossier_url | default: '/servers/enshrouded/' | relative_url }}" class="featured-icon-link" aria-label="View Enshrouded Server Dossier">
            <img src="{{ featured_server.banner_url | default: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1203620/capsule_616x353.jpg' }}" alt="Enshrouded Icon" class="featured-mod-icon" style="width: 68px; height: 68px; object-fit: cover;">
          </a>
          <div>
            <h2 class="featured-mod-title">
              <a href="{{ featured_server.dossier_url | default: '/servers/enshrouded/' | relative_url }}">{{ featured_server.server_name | default: "Vapok's Community Enshrouded Server" }}</a>
            </h2>
            <div class="featured-mod-subhead">
              Dedicated Co-Op Survival Realm // Embervale 1.0 Release
            </div>
          </div>
        </div>

        <!-- Launch Countdown Callout Box -->
        <div style="margin-bottom: 1.25rem; border: 1px solid rgba(251, 191, 36, 0.35); background: linear-gradient(135deg, rgba(26, 20, 10, 0.75) 0%, rgba(6, 8, 14, 0.9) 100%); padding: 0.9rem 1.1rem; box-shadow: 0 0 15px rgba(251, 191, 36, 0.08);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <div style="font-size: 0.72rem; color: var(--warning-amber); font-family: var(--font-mono, monospace); letter-spacing: 0.6px; font-weight: 700;">
                ⏳ 1.0 LAUNCH &amp; MAP RESET COUNTDOWN:
              </div>
              <div id="home-countdown-timer" style="font-family: var(--font-mono, monospace); font-size: 1.25rem; font-weight: 800; color: var(--ice-blue-bright); letter-spacing: 1px; margin-top: 0.2rem;">
                CALCULATING...
              </div>
            </div>
            <div style="font-size: 0.78rem; font-family: var(--font-mono, monospace); text-align: right; line-height: 1.45;">
              <span style="display: block; color: var(--warning-amber); font-weight: 700;">THURSDAY, OCT 15 @ 11:00 AM EDT</span>
              <span style="color: var(--text-dim);">Early Access Map &rarr; Fresh 1.0 Reset</span>
            </div>
          </div>
        </div>

        <p class="featured-mod-desc">
          Survive the deadly Shroud of Embervale, build underground voxel strongholds, and conquer dungeon depths alongside fellow Flameborn. Currently open on our Early Access map, resetting to a brand new 1.0 world tomorrow morning!
        </p>

        <!-- Key Feature Highlights -->
        <div class="featured-highlights-grid">
          <div class="featured-highlight-item">
            <span class="highlight-bullet">⚔️</span>
            <div>
              <strong>Open Visitor Access:</strong> No password needed! Anyone can join to explore, fight, loot, and craft.
            </div>
          </div>
          <div class="featured-highlight-item">
            <span class="highlight-bullet">🏰</span>
            <div>
              <strong>Base Building in Discord:</strong> Password-gated base building permissions. Grab the password in Discord!
            </div>
          </div>
          <div class="featured-highlight-item">
            <span class="highlight-bullet">🗺️</span>
            <div>
              <strong>Live World Web Map:</strong> Real-time satellite cartography tracking altars, fog, and active terrain.
            </div>
          </div>
          <div class="featured-highlight-item">
            <span class="highlight-bullet">⚡</span>
            <div>
              <strong>Survival Servers Host:</strong> High-performance dedicated infrastructure with 25% off code <code>ENSHROUDED25</code>.
            </div>
          </div>
        </div>

        <!-- Specs row -->
        <div class="featured-specs-row">
          <div class="featured-spec-chip">
            <span class="spec-label">DIRECT IP:</span>
            <span class="spec-val">{{ featured_server.ip | default: '15.204.215.165:37601' }}</span>
          </div>
          <div class="featured-spec-chip">
            <span class="spec-label">PLATFORM:</span>
            <span class="spec-val">{{ featured_server.platform | default: 'STEAM / PC' }}</span>
          </div>
          <div class="featured-spec-chip">
            <span class="spec-label">GAME VER:</span>
            <span class="spec-val">ENSHROUDED 1.0</span>
          </div>
          <div class="featured-spec-chip">
            <span class="spec-label">ACCESS:</span>
            <span class="spec-val">OPEN VISITOR</span>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="featured-actions-row">
          <a href="{{ featured_server.dossier_url | default: '/servers/enshrouded/' | relative_url }}" class="cyber-btn btn-mint" style="font-size: 0.85rem; padding: 0.55rem 1.15rem;">
            [ 🌐 VIEW SERVER DOSSIER &rarr; ]
          </a>
          <a href="{{ featured_server.map_url | default: 'https://www.survivalservers.com/share/enshrouded/map/172c66704f18ce873c37c6f7fe7c32e8' }}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-amber" style="font-size: 0.82rem; padding: 0.55rem 0.95rem;">
            [ 🗺️ LIVE SERVER MAP ]
          </a>
          <a href="{{ featured_server.discord_link | default: 'https://discord.gg/4zCbbVpac2' }}" target="_blank" rel="noopener noreferrer" class="cyber-btn" style="font-size: 0.82rem; padding: 0.55rem 0.95rem;">
            [ 💬 JOIN DISCORD ]
          </a>
          <a href="{{ '/servers/' | relative_url }}" class="cyber-btn btn-secondary" style="font-size: 0.82rem; padding: 0.55rem 0.85rem;">
            [ ALL SERVERS ]
          </a>
        </div>
      </div>

      <!-- RIGHT: LIVE TELEMETRY & CONNECT -->
      <div class="featured-spotlight-media">
        <div class="featured-preview-frame">
          <div class="featured-preview-header">
            <div class="preview-header-title">
              <span class="preview-dot"></span>
              <span>// TELEMETRY: EMBERVALE // NODE: {{ featured_server.node_id | default: 'SHROUD-01' }}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span class="status-badge mint" style="font-size: 0.68rem; padding: 0.15rem 0.45rem;">LIVE RADAR</span>
            </div>
          </div>

          <a href="{{ featured_server.dossier_url | default: '/servers/enshrouded/' | relative_url }}" style="display: block; position: relative; overflow: hidden; line-height: 0;" aria-label="View Enshrouded Server Details">
            <img src="{{ featured_server.banner_url | default: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1203620/capsule_616x353.jpg' }}" 
                 alt="Vapok's Community Enshrouded Server Banner" 
                 style="width: 100%; height: 215px; display: block; object-fit: cover;">
            <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(2, 6, 12, 0.88); border: 1px solid var(--border-strong); padding: 0.25rem 0.6rem; font-family: var(--font-mono, monospace); font-size: 0.72rem; color: var(--glacial-mint); letter-spacing: 0.5px;">
              [ 1.0 LAUNCH READY ]
            </div>
          </a>

          <!-- Quick Connect & Map Info -->
          <div style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; background: rgba(6, 8, 14, 0.95); flex-grow: 1; justify-content: space-between;">
            
            <!-- Quick Connect IP Bar -->
            <div style="background: rgba(10, 15, 26, 0.9); border: 1px solid rgba(100, 240, 252, 0.25); padding: 0.75rem 0.9rem; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <div>
                <div style="font-size: 0.68rem; color: var(--ice-blue); font-family: var(--font-mono, monospace); letter-spacing: 0.5px; margin-bottom: 0.2rem;">
                  DIRECT STEAM CONNECT IP &amp; PORT:
                </div>
                <div id="home-enshrouded-ip" style="font-family: var(--font-mono, monospace); font-size: 0.95rem; font-weight: 700; color: var(--text-bright); letter-spacing: 0.5px;">
                  {{ featured_server.ip | default: '15.204.215.165:37601' }}
                </div>
              </div>
              <button type="button" class="cyber-btn server-copy-btn" onclick="copyCred('home-enshrouded-ip', this)" aria-label="Copy server IP">
                [ 📋 COPY IP ]
              </button>
            </div>

            <!-- Live Map Callout Bar -->
            <a href="{{ featured_server.map_url | default: 'https://www.survivalservers.com/share/enshrouded/map/172c66704f18ce873c37c6f7fe7c32e8' }}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; background: rgba(0, 245, 155, 0.04); border: 1px solid rgba(0, 245, 155, 0.25); padding: 0.75rem 0.9rem; transition: background 0.2s ease, border-color 0.2s ease;">
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <span style="font-size: 1.15rem; line-height: 1;">🗺️</span>
                <div>
                  <div style="font-size: 0.82rem; font-weight: 700; color: var(--glacial-mint); font-family: var(--font-mono, monospace);">
                    Live Interactive World Map
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-dim);">
                    Real-time player tracking &amp; explored biomes via Survival Servers
                  </div>
                </div>
              </div>
              <span class="cyber-btn btn-mint" style="font-size: 0.74rem; padding: 0.35rem 0.65rem; white-space: nowrap;">
                [ LAUNCH MAP &rarr; ]
              </span>
            </a>

            <!-- Rules Briefing -->
            <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.45; border-top: 1px solid var(--border-subtle); padding-top: 0.65rem;">
              <strong style="color: var(--ice-blue);">Server Protocol:</strong> Co-op friendly realm. Anyone can join as a Visitor (no password needed). Base building rights require joining our Discord.
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- BACKER / FUEL CALLOUT -->
<section id="fuel" style="margin-top: 3.5rem;">
  <div style="background: linear-gradient(135deg, rgba(26, 20, 10, 0.85) 0%, rgba(6, 8, 14, 0.95) 100%); border: 1px solid rgba(251, 191, 36, 0.35); padding: 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; box-shadow: 0 0 20px rgba(251, 191, 36, 0.08);">
    <div style="max-width: 650px;">
      <div style="font-size: 0.75rem; color: var(--warning-amber); letter-spacing: 1px; margin-bottom: 0.35rem;">
        // DIRECTIVE // FUEL_THE_CREATOR: $$$
      </div>
      <h3 style="color: var(--warning-amber); font-size: 1.25rem; font-weight: 800; margin-bottom: 0.4rem;">
        Power the Next Mod Release
      </h3>
      <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.55;">
        All mods are 100% free and open-source. If my modifications have saved you hours or elevated your gameplay, consider throwing some fuel into the reactor via Discord Subscriptions, Buy Me A Coffee, or PayPal.
      </p>
    </div>
    <div>
      <a href="{{ '/support/' | relative_url }}" class="cyber-btn btn-amber-solid scramble-hover" data-text="[ ⚡ FUEL THE DEV: $$$ ]" style="font-size: 0.9rem; padding: 0.65rem 1.25rem;">
        [ ⚡ FUEL THE DEV: $$$ ]
      </a>
    </div>
  </div>
</section>

<!-- SERVER INFRASTRUCTURE SPONSOR -->
<!--googleoff: all-->
<section id="partner-infrastructure" data-nosnippet style="margin-top: 3.5rem;">
  <div class="section-header">
    <div class="section-title">
      <span>// INFRASTRUCTURE_PARTNER</span>
      <span class="section-title-tag">[ ENSHROUDED DEDICATED HOST ]</span>
    </div>
  </div>

  <div style="background: rgba(6, 8, 14, 0.85); border: 1px solid var(--border-subtle); padding: 1.25rem; backdrop-filter: blur(8px);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span class="status-badge mint">OFFICIAL HOST</span>
        <span style="font-size: 0.78rem; color: var(--ice-blue); letter-spacing: 0.5px;">SURVIVAL SERVERS // ENSHROUDED 1.0 DEDICATED INSTANCE</span>
      </div>
      <span style="font-size: 0.78rem; color: var(--warning-amber); font-weight: 700; letter-spacing: 0.5px;">PROMO: [ 25% OFF CODE: ENSHROUDED25 ]</span>
    </div>

    <a href="https://www.survivalservers.com/services/game_servers/enshrouded/?ref=vapok" target="_blank" rel="nofollow sponsored noopener noreferrer" class="partner-banner-link" style="display: block; border: 1px solid rgba(100, 240, 252, 0.2); overflow: hidden; line-height: 0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);">
      <img src="{{ '/assets/images/sponsors/survivalservers-enshrouded-banner.png' | relative_url }}" alt="Survival Servers - Enshrouded 1.0 Dedicated Servers (25% off with code ENSHROUDED25)" style="width: 100%; height: auto; display: block; object-fit: contain;">
    </a>

    <div style="margin-top: 0.85rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; font-size: 0.84rem;">
      <span style="color: var(--text-muted); line-height: 1.45;">
        ⚡ <em>Survival Servers is the official dedicated server provider powering the <strong>Vapok Gaming Community</strong> Enshrouded 1.0 world. Use promo code <code>ENSHROUDED25</code> for 25% off your own server.</em>
      </span>
      <a href="https://www.survivalservers.com/services/game_servers/enshrouded/?ref=vapok" target="_blank" rel="nofollow sponsored noopener noreferrer" class="cyber-btn" style="font-size: 0.78rem; padding: 0.4rem 0.85rem; white-space: nowrap;">
        [ VISIT SURVIVAL SERVERS &rarr; ]
      </a>
    </div>
  </div>
</section>
<!--googleon: all-->

<!-- ABOUT & PROTOCOLS -->
<section id="about" style="margin-top: 3.5rem;">
  <div class="section-header">
    <div class="section-title">
      <span>// CREATOR_DIRECTIVE</span>
      <span class="section-title-tag">[ ABOUT VAPOK GAMING ]</span>
    </div>
  </div>

  <div class="content-terminal-box" style="margin-top: 0;">
    <div class="markdown-body">
      <p>
        <strong>Vapok Gaming</strong> is a creator hub, community, and modding laboratory led by Vapok. We design and engineer robust, multiplayer-safe modifications, develop gaming tools, and host collaborative game sessions for titles across the PC gaming sphere.
      </p>
      
      <p>
        From deep survival automation to complex QoL systems, every project prioritizes performance, customizability, clean architecture, and long-term save game stability.
      </p>

      <hr>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="{{ '/about/' | relative_url }}" class="cyber-btn btn-mint">
          [ &gt; FULL CREATOR DOSSIER ]
        </a>
        <a href="{{ '/servers/' | relative_url }}" class="cyber-btn">
          [ 🌐 COMMUNITY SERVERS ]
        </a>
        <a href="https://github.com/Vapok" target="_blank" rel="noopener noreferrer" class="cyber-btn">
          [ GITHUB REPOSITORIES ]
        </a>
        <a href="{{ '/support/' | relative_url }}" class="cyber-btn btn-amber">
          [ ⚡ DONATE &amp; SUPPORT ]
        </a>
        <a href="{{ '/terms-of-service' | relative_url }}" class="cyber-btn btn-secondary">
          [ LEGAL &amp; LICENSING ]
        </a>
      </div>
    </div>
  </div>
</section>

<script>
  function copyCred(elementId, btnElement) {
    const textElem = document.getElementById(elementId);
    if (!textElem) return;
    const textToCopy = textElem.innerText.trim();
    navigator.clipboard.writeText(textToCopy).catch(() => {
      const tempInput = document.createElement('input');
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    });
    const originalText = btnElement.innerText;
    btnElement.classList.add('copied');
    btnElement.innerText = '[ ✓ COPIED ]';
    setTimeout(() => {
      btnElement.classList.remove('copied');
      btnElement.innerText = originalText;
    }, 2000);
  }

  // Real-time Countdown to Enshrouded 1.0 Release
  (function initHomeEnshroudedCountdown() {
    const targetDate = new Date('2026-10-15T11:00:00-04:00').getTime();
    const timerElem = document.getElementById('home-countdown-timer');
    const headerElem = document.getElementById('home-countdown-header');

    if (!timerElem) return;

    function update() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        timerElem.innerText = 'NOW LIVE ON 1.0!';
        timerElem.style.color = 'var(--glacial-mint)';
        if (headerElem) headerElem.innerText = 'STATUS: 1.0 LIVE // OPEN ACCESS';
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
