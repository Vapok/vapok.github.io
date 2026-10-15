---
layout: page
title: "Community Game Servers"
permalink: /servers/
description: "Browse Vapok's dedicated community game servers. Active world nodes, connection dossiers, live interactive maps, server rules, and host infrastructure."
---

<!-- STATUS HERO CALLOUT -->
<div style="background: rgba(6, 8, 14, 0.85); border: 1px solid var(--border-subtle); padding: 1.75rem; margin-bottom: 2.5rem; backdrop-filter: blur(8px);">
  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
    <span style="font-size: 0.8rem; color: var(--ice-blue); letter-spacing: 1px;">
      [ SYS_CLUSTER // MULTIPLAYER_COMMUNITY_DIRECTORY ]
    </span>
    <span class="status-badge mint">1 ACTIVE DEPLOYMENT</span>
  </div>
  <h2 style="color: var(--ice-blue-bright); font-size: 1.5rem; margin-top: 0; margin-bottom: 0.65rem;">
    Dedicated Community Game Servers
  </h2>
  <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; max-width: 820px; margin-bottom: 1.25rem;">
    Welcome to the multiplayer hub of the <strong>Vapok Gaming Community</strong>! Beyond mod engineering and automation pipelines, we maintain dedicated worlds where community members can team up, build massive bases, conquer dungeons, and survive together. Select an active deployment below for full connection credentials, live interactive maps, and community guidelines.
  </p>
  <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
    <a href="{{ '/servers/enshrouded/' | relative_url }}" class="cyber-btn btn-mint">
      [ ⚔️ ENSHROUDED 1.0 SERVER DOSSIER ]
    </a>
    <a href="https://www.survivalservers.com/share/enshrouded/map/172c66704f18ce873c37c6f7fe7c32e8" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-cyan">
      [ 🗺️ LIVE SERVER MAP ]
    </a>
    <a href="https://discord.gg/4zCbbVpac2" target="_blank" rel="noopener noreferrer" class="cyber-btn">
      [ 💬 JOIN DISCORD SERVER CHANNELS ]
    </a>
    <a href="https://www.survivalservers.com/services/game_servers/enshrouded/?ref=vapok" target="_blank" rel="nofollow sponsored noopener noreferrer" class="cyber-btn btn-amber">
      [ 🚀 HOST WITH SURVIVAL SERVERS (25% OFF) ]
    </a>
  </div>
</div>

<!-- ======================================================================= -->
<!-- COMMUNITY SERVERS ROSTER                                                -->
<!-- ======================================================================= -->
<section id="servers-roster">
  <div class="section-header">
    <div class="section-title">
      <span>// CLUSTER_NODES</span>
      <span class="section-title-tag">[ COMMUNITY HOSTED WORLDS ]</span>
    </div>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">[ ALL ({{ site.data.servers.size }}) ]</button>
      <button class="filter-btn" data-filter="active">[ ⚡ ACTIVE WORLDS (1) ]</button>
      <button class="filter-btn" data-filter="upcoming">[ ⏳ UPCOMING (1) ]</button>
    </div>
  </div>

  <div class="mod-grid" style="grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));">
    {% for server in site.data.servers %}
      <article class="mod-card" data-category="{{ server.category | default: 'active' }}">
        <div>
          {% if server.banner_url %}
            <div class="game-card-img-wrap">
              {% if server.dossier_url %}
                <a href="{{ server.dossier_url | relative_url }}">
                  <img src="{{ server.banner_url | relative_url }}" alt="{{ server.title }} Cover" class="game-card-img" loading="lazy">
                </a>
              {% else %}
                <img src="{{ server.banner_url | relative_url }}" alt="{{ server.title }} Cover" class="game-card-img" loading="lazy">
              {% endif %}
            </div>
          {% endif %}

          <div class="mod-card-header">
            <div>
              <span class="mod-card-id">SYS_NODE // {{ server.node_id }}</span>
              <h3 class="mod-title">
                {% if server.dossier_url %}
                  <a href="{{ server.dossier_url | relative_url }}" style="color: inherit; text-decoration: none;">
                    {{ server.server_name }}
                  </a>
                {% else %}
                  {{ server.server_name }}
                {% endif %}
              </h3>
            </div>
            <span class="status-badge {{ server.status_type | default: 'mint' }}">
              {{ server.status_tag }}
            </span>
          </div>

          <table class="mod-meta-table">
            <tr>
              <td class="meta-label">GAME / GENRE:</td>
              <td class="meta-val">{{ server.title }} ({{ server.genre }})</td>
            </tr>
            <tr>
              <td class="meta-label">CURRENT MAP:</td>
              <td class="meta-val" style="color: var(--ice-blue);">{{ server.current_map }}</td>
            </tr>
            {% if server.ip %}
              <tr>
                <td class="meta-label">DIRECT IP:</td>
                <td class="meta-val" style="font-family: var(--font-mono, monospace); color: #ffffff;">{{ server.ip }}</td>
              </tr>
            {% endif %}
            <tr>
              <td class="meta-label">PERMISSIONS:</td>
              <td class="meta-val" style="color: var(--glacial-mint);">{{ server.access_policy }}</td>
            </tr>
            <tr>
              <td class="meta-label">HOST PARTNER:</td>
              <td class="meta-val" style="color: var(--warning-amber);">{{ server.host_name }}</td>
            </tr>
          </table>

          <p class="mod-desc">
            {{ server.description }}
          </p>

          {% if server.map_reset_notice %}
            <div style="margin-top: 0.85rem; padding: 0.65rem 0.8rem; background: rgba(251, 191, 36, 0.08); border-left: 2px solid var(--warning-amber); font-size: 0.82rem; color: var(--text-main); line-height: 1.5;">
              <strong style="color: var(--warning-amber); display: block; margin-bottom: 0.2rem;">1.0 RELEASE SCHEDULE:</strong>
              {{ server.map_reset_notice }}
            </div>
          {% endif %}
        </div>

        <div class="mod-card-actions" style="margin-top: 1.25rem;">
          {% if server.dossier_url %}
            <a href="{{ server.dossier_url | relative_url }}" class="cyber-btn btn-mint">
              [ 🌐 SERVER DOSSIER &rarr; ]
            </a>
          {% endif %}
          {% if server.map_url %}
            <a href="{{ server.map_url }}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-cyan">
              [ 🗺️ LIVE MAP ]
            </a>
          {% endif %}
          {% if server.discord_channel %}
            <a href="{{ server.discord_link | default: site.donations.discord_invite }}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-secondary">
              [ DISCORD: {{ server.discord_channel }} ]
            </a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

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
          SURVIVAL SERVERS // DEDICATED HOSTING PARTNER
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

<!-- ======================================================================= -->
<!-- FUTURE SERVERS RADAR & COMMUNITY VOTING                                 -->
<!-- ======================================================================= -->
<section style="margin-top: 3.5rem;">
  <div class="content-terminal-box">
    <div class="terminal-box-header">
      <span>// SERVER_PIPELINE</span>
      <span>[ COMMUNITY VOTING &amp; EXPANSION ]</span>
    </div>
    <div class="markdown-body">
      <h3>Want to Suggest a Dedicated Community Server?</h3>
      <p>
        As new game updates drop or our community rallies around a survival sandbox, we bring dedicated nodes online. Current roadmap candidates include:
      </p>
      <ul>
        <li><strong>Valheim 1.0 Dedicated Realm:</strong> Fresh dedicated 10th Norse realm curated with Vapok's Quality of Life mod pack, launching alongside the official Valheim 1.0 release.</li>
        <li><strong>Community Choice Sandbox:</strong> Rotating co-op servers for titles like Techtonica, ASKA, Satisfactory, and V Rising based on member interest in Discord.</li>
      </ul>
      <div style="margin-top: 1.5rem;">
        <a href="https://discord.gg/4zCbbVpac2" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-cyan">
          [ 🎮 SUGGEST A GAME SERVER IN DISCORD ]
        </a>
      </div>
    </div>
  </div>
</section>

<script>
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
</script>
