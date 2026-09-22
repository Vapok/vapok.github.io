---
layout: default
title: Home
---

{% include ascii-banner.html %}

{% assign featured_mod = site.mods | where: "slug", "bepinex-configdrawers" | first %}
{% if featured_mod == nil %}
  {% assign featured_mod = site.data.mods | where: "slug", "bepinex-configdrawers" | first %}
{% endif %}

<!-- FEATURED MOD SPOTLIGHT -->
<section id="featured-mod" class="featured-spotlight-section" aria-label="Featured Mod Spotlight">
  <div class="section-header">
    <div class="section-title">
      <span>// SPOTLIGHT_RELEASE</span>
      <span class="section-title-tag">[ FEATURED MOD ]</span>
    </div>
    <div class="featured-status-tag">
      <span class="telemetry-radar-dot" style="background: var(--glacial-mint); box-shadow: 0 0 8px var(--glacial-mint); width: 7px; height: 7px; border-radius: 50%; display: inline-block;" aria-hidden="true"></span>
      <span>STATUS: ACTIVE // {{ featured_mod.version | default: 'v1.0.1' }}</span>
    </div>
  </div>

  <div class="featured-spotlight-box">
    <div class="featured-spotlight-grid">
      
      <!-- LEFT: METADATA & VALUE PROPOSITION -->
      <div class="featured-spotlight-info">
        <div class="featured-badge-row">
          <span class="status-badge mint">★ FEATURED</span>
          <span class="status-badge amber">NEW RELEASE</span>
          <span class="status-badge cyan">BEPINEX 5</span>
          <span class="status-badge subtle">UNITY uGUI</span>
        </div>

        <div class="featured-header-row">
          <a href="{{ '/mods/bepinex-configdrawers/' | relative_url }}" class="featured-icon-link" aria-label="View BepInEx.ConfigDrawers Dossier">
            <img src="{{ featured_mod.icon | default: '/assets/images/mods/bepinex-configdrawers/icon.png' | relative_url }}" alt="BepInEx.ConfigDrawers Icon" class="featured-mod-icon">
          </a>
          <div>
            <h2 class="featured-mod-title">
              <a href="{{ '/mods/bepinex-configdrawers/' | relative_url }}">BepInEx.ConfigDrawers</a>
            </h2>
            <div class="featured-mod-subhead">
              Next-Gen In-Game Configuration Manager &amp; File Editor
            </div>
          </div>
        </div>

        <p class="featured-mod-desc">
          An in-game configuration suite for BepInEx 5 plugins engineered on Unity uGUI. Offers zero-obstruction screen rail docking, free-floating windows, advanced input controls (HSV color spectrum, data tables, sliders), and a built-in code editor for raw configuration files.
        </p>

        <!-- Key Feature Highlights -->
        <div class="featured-highlights-grid">
          <div class="featured-highlight-item">
            <span class="highlight-bullet">🗄️</span>
            <div>
              <strong>Dock &amp; Float Rails:</strong> Pin to left/right screen edges or undock to a draggable floating window.
            </div>
          </div>
          <div class="featured-highlight-item">
            <span class="highlight-bullet">🎨</span>
            <div>
              <strong>Rich Custom Drawers:</strong> Sliders, HSV color wheel, multi-column tables, and live hotkey rebinding.
            </div>
          </div>
          <div class="featured-highlight-item">
            <span class="highlight-bullet">📝</span>
            <div>
              <strong>In-Game Code Editor:</strong> Syntax-highlighted code editor for <code>.cfg</code>, <code>.json</code>, and <code>.yaml</code> with live metrics.
            </div>
          </div>
          <div class="featured-highlight-item">
            <span class="highlight-bullet">⚡</span>
            <div>
              <strong>ServerSync &amp; Legacy:</strong> Server-enforced indicators and legacy <code>ConfigurationManager</code> auto-suppression.
            </div>
          </div>
        </div>

        <!-- Specs row -->
        <div class="featured-specs-row">
          <div class="featured-spec-chip">
            <span class="spec-label">CATEGORY:</span>
            <span class="spec-val">BEPINEX 5</span>
          </div>
          <div class="featured-spec-chip">
            <span class="spec-label">PLATFORM:</span>
            <span class="spec-val">UNIVERSAL UNITY</span>
          </div>
          <div class="featured-spec-chip">
            <span class="spec-label">VERSION:</span>
            <span class="spec-val">{{ featured_mod.version | default: 'v1.0.1' }}</span>
          </div>
          <div class="featured-spec-chip">
            <span class="spec-label">TELEMETRY:</span>
            <span class="spec-val">NONE</span>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="featured-actions-row">
          <a href="{{ '/mods/bepinex-configdrawers/' | relative_url }}" class="cyber-btn btn-mint-solid" style="font-size: 0.85rem; padding: 0.55rem 1.15rem;">
            [ 📂 VIEW DOSSIER &amp; GALLERY &rarr; ]
          </a>
          <a href="{{ featured_mod.thunderstore_url | default: 'https://thunderstore.io/c/valheim/p/Vapok/BepInEx_ConfigDrawers/' }}" target="_blank" rel="noopener noreferrer" class="cyber-btn" style="font-size: 0.82rem; padding: 0.55rem 0.95rem;">
            [ ⚡ THUNDERSTORE ]
          </a>
          <a href="{{ featured_mod.nexusmods_url | default: 'https://www.nexusmods.com/valheim/mods/3909' }}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-amber" style="font-size: 0.82rem; padding: 0.55rem 0.95rem;">
            [ 📦 NEXUS MODS ]
          </a>
          <a href="{{ featured_mod.website_url | default: 'https://github.com/Vapok/BepInEx.ConfigDrawers' }}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-secondary" style="font-size: 0.82rem; padding: 0.55rem 0.85rem;">
            [ GITHUB ]
          </a>
        </div>
      </div>

      <!-- RIGHT: INTERACTIVE SCREENSHOT SHOWCASE -->
      <div class="featured-spotlight-media">
        <div class="featured-preview-frame">
          <div class="featured-preview-header">
            <div class="preview-header-title">
              <span class="preview-dot"></span>
              <span id="featured-frame-file">// FEED: 01-docked-left.png</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <button type="button" id="featured-expand-btn" class="preview-expand-btn cyber-btn" title="Open full resolution in lightbox">[ ⛶ FULLSCREEN ]</button>
              <a href="{{ '/mods/bepinex-configdrawers/#gallery' | relative_url }}" class="preview-gallery-link">
                [ FULL GALLERY &rarr; ]
              </a>
            </div>
          </div>

          <div id="featured-preview-stage" class="featured-preview-stage" role="button" tabindex="0" title="Click to view full resolution screenshot" aria-label="View full resolution screenshot in lightbox">
            <img id="featured-preview-img" 
                 src="{{ '/assets/images/mods/bepinex-configdrawers/gallery/01-docked-left.png' | relative_url }}" 
                 alt="BepInEx.ConfigDrawers Docked Rail View" 
                 class="featured-preview-img">
            <div class="featured-stage-badge">[ ⛶ CLICK FOR FULL RESOLUTION ]</div>
          </div>

          <div class="featured-preview-caption">
            <div id="featured-caption-title" class="featured-caption-title">Docked Screen Rail (Left)</div>
            <div id="featured-caption-desc" class="featured-caption-desc">Seamless left-edge screen dock that stays accessible without obstructing in-game elements.</div>
          </div>

          <!-- Thumbnail Strip (All 8 Screenshots) -->
          <div class="featured-thumb-strip" role="tablist" aria-label="Featured Screenshots">
            {% for item in featured_mod.gallery %}
              <button type="button" class="featured-thumb-btn{% if forloop.first %} active{% endif %}" 
                      data-index="{{ forloop.index0 }}"
                      data-img="{{ item.image | relative_url }}"
                      data-file="{{ item.image | split: '/' | last }}"
                      data-title="{{ item.title | escape }}"
                      data-desc="{{ item.desc | escape }}"
                      aria-label="View {{ item.title | escape }}">
                <img src="{{ item.thumb | default: item.image | relative_url }}" alt="{{ item.title | escape }}">
                <span>{{ item.title | truncate: 12 }}</span>
              </button>
            {% endfor %}
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
      <span class="section-title-tag">[ VALHEIM DEDICATED HOST ]</span>
    </div>
  </div>

  <div style="background: rgba(6, 8, 14, 0.85); border: 1px solid var(--border-subtle); padding: 1.25rem; backdrop-filter: blur(8px);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span class="status-badge mint">OFFICIAL HOST</span>
        <span style="font-size: 0.78rem; color: var(--ice-blue); letter-spacing: 0.5px;">SURVIVAL SERVERS // VALHEIM DEDICATED INSTANCE</span>
      </div>
      <span style="font-size: 0.78rem; color: var(--warning-amber); font-weight: 700; letter-spacing: 0.5px;">PROMO: [ 25% OFF CODE: VALHEIM25 ]</span>
    </div>

    <a href="https://www.survivalservers.com/services/game_servers/valheim/?ref=vapok" target="_blank" rel="nofollow sponsored noopener noreferrer" class="partner-banner-link" style="display: block; border: 1px solid rgba(100, 240, 252, 0.2); overflow: hidden; line-height: 0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);">
      <img src="{{ '/assets/images/sponsors/survivalservers-valheim-banner.png' | relative_url }}" alt="Survival Servers - Valheim 1.0 Dedicated Servers (25% off with code VALHEIM25)" style="width: 100%; height: auto; display: block; object-fit: contain;">
    </a>

    <div style="margin-top: 0.85rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; font-size: 0.84rem;">
      <span style="color: var(--text-muted); line-height: 1.45;">
        ⚡ <em>Survival Servers is the official dedicated server provider powering the upcoming <strong>Vapok Gaming Community</strong> Valheim world.</em>
      </span>
      <a href="https://www.survivalservers.com/services/game_servers/valheim/?ref=vapok" target="_blank" rel="nofollow sponsored noopener noreferrer" class="cyber-btn" style="font-size: 0.78rem; padding: 0.4rem 0.85rem; white-space: nowrap;">
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
