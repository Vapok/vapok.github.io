---
layout: page
title: "Currently Playing & Active Games"
permalink: /games/
description: "Explore the games Vapok is actively playing, modding, and organizing community sessions for across the Vapok Gaming Community."
---

<!-- STATUS HERO CALLOUT -->
<div style="background: rgba(6, 8, 14, 0.75); border: 1px solid var(--border-subtle); padding: 1.75rem; margin-bottom: 2.5rem; backdrop-filter: blur(8px);">
  <div style="font-size: 0.8rem; color: var(--ice-blue); letter-spacing: 1px; margin-bottom: 0.4rem;">
    [ SYS_MONITOR // ACTIVE_OPERATIONS_MATRIX ]
  </div>
  <h2 style="color: var(--ice-blue-bright); font-size: 1.45rem; margin-top: 0; margin-bottom: 0.6rem;">
    Active Game Deployments &amp; Playthroughs
  </h2>
  <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; max-width: 800px; margin-bottom: 1rem;">
    Beyond engineering modifications and automation tools, this is the live tactical radar of titles Vapok is currently playing, building mega-projects in, or testing with the <strong>Vapok Gaming Community</strong>.
  </p>
  <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
    <a href="{{ site.donations.discord_invite }}" target="_blank" rel="noopener noreferrer" class="cyber-btn" style="background: var(--glacial-mint); color: #06080e; border-color: var(--glacial-mint);">
      [ 💬 JOIN DISCORD GAME SESSIONS ]
    </a>
    <a href="{{ '/modding/' | relative_url }}" class="cyber-btn">
      [ ⚡ VIEW CREATED MODS ]
    </a>
  </div>
</div>

<!-- GAMES GRID -->
<div class="section-header">
  <div class="section-title">
    <span>// ACTIVE_ROSTER</span>
    <span class="section-title-tag">[ GAME ROTATION & SPOTLIGHT ]</span>
  </div>

  <div class="filter-bar">
    <button class="filter-btn active" data-filter="all">[ ALL (11) ]</button>
    <button class="filter-btn" data-filter="active">[ ⚡ ACTIVELY PLAYING (4) ]</button>
    <button class="filter-btn" data-filter="rotation">[ 🔄 IN ROTATION (7) ]</button>
  </div>
</div>

<div class="mod-grid" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));">
  {% for game in site.data.games %}
    <article class="mod-card" data-category="{{ game.category | default: 'rotation' }}">
      <div>
        {% if game.banner_url %}
          <div class="game-card-img-wrap">
            <img src="{{ game.banner_url | relative_url }}" alt="{{ game.title }} Cover" class="game-card-img" loading="lazy">
          </div>
        {% endif %}

        <div class="mod-card-header">
          <div>
            <span class="mod-card-id">SYS_APP // {{ game.slug | upcase }}</span>
            <h3 class="mod-title">{{ game.title }}</h3>
          </div>
          <span class="status-badge {{ game.status_type | default: 'cyan' }}">
            {{ game.status_tag }}
          </span>
        </div>

        <table class="mod-meta-table">
          <tr>
            <td class="meta-label">GENRE:</td>
            <td class="meta-val">{{ game.genre }}</td>
          </tr>
          <tr>
            <td class="meta-label">PLATFORM:</td>
            <td class="meta-val">{{ game.platform }}</td>
          </tr>
          <tr>
            <td class="meta-label">DEV STATUS:</td>
            <td class="meta-val" style="color: var(--ice-blue);">{{ game.modding_status }}</td>
          </tr>
        </table>

        <p class="mod-desc">
          {{ game.description }}
        </p>

        {% if game.category == 'active' and game.current_focus %}
          <div style="margin-top: 0.85rem; padding: 0.65rem 0.8rem; background: rgba(0, 0, 0, 0.4); border-left: 2px solid var(--ice-blue); font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
            <strong style="color: var(--text-main); display: block; margin-bottom: 0.2rem;">CURRENT FOCUS:</strong>
            {{ game.current_focus }}
          </div>
        {% endif %}
      </div>

      <div class="mod-card-actions" style="margin-top: 1.25rem;">
        {% if game.mods_link %}
          <a href="{{ game.mods_link | relative_url }}" class="cyber-btn">
            [ > VIEW MODS ]
          </a>
        {% endif %}
        {% if game.discord_channel %}
          <a href="{{ game.discord_link | default: site.donations.discord_invite }}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-secondary">
            [ DISCORD: {{ game.discord_channel }} ]
          </a>
        {% endif %}
      </div>
    </article>
  {% endfor %}
</div>

<!-- COMMUNITY SESSIONS BANNER -->
<section style="margin-top: 3.5rem;">
  <div class="content-terminal-box">
    <div class="terminal-box-header">
      <span>// MULTIPLAYER_DISPATCH</span>
      <span>[ VAPOK GAMING COMMUNITY ]</span>
    </div>
    <div class="markdown-body">
      <h3>Want to Co-op, Suggest a Game, or Join Dedicated Servers?</h3>
      <p>
        The <strong>Vapok Gaming Community</strong> hosts dedicated multiplayer servers, voice channels for co-op nights, and discussion threads for theorycrafting mod architectures and sharing mega-base designs.
      </p>
      <ul>
        <li><strong>Dedicated Community Worlds:</strong> Valheim, Techtonica, and collaborative multiplayer survival sandboxes.</li>
        <li><strong>Playtest Prototypes:</strong> Be among the first to test early versions of mods and automation tools before general release.</li>
        <li><strong>Hangout &amp; Theorycraft:</strong> Drop into voice chat, share builds, and vote on upcoming mod projects.</li>
      </ul>
      <div style="margin-top: 1.5rem;">
        <a href="{{ site.donations.discord_invite }}" target="_blank" rel="noopener noreferrer" class="cyber-btn" style="background: var(--ice-blue); color: #06080e; border-color: var(--ice-blue); font-weight: 700;">
          [ 🎮 JOIN THE VAPOK GAMING DISCORD ]
        </a>
      </div>
    </div>
  </div>
</section>
