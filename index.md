---
layout: default
title: Home
---

{% include ascii-banner.html %}

<!-- DEV LOGS / NEWS -->
<section id="logs" style="margin-top: 2.5rem;">
  <div class="section-header">
    <div class="section-title">
      <span>// TRANSMISSION_LOGS</span>
      <span class="section-title-tag">[ RECENT UPDATES & DEVLOGS ]</span>
    </div>
  </div>

  <div class="mod-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
    {% for post in site.posts limit:3 %}
      <article class="mod-card">
        <div>
          <div class="mod-card-header">
            <span class="mod-card-id">{{ post.date | date: "%Y.%m.%d" }}</span>
            <span class="status-badge mint">DISPATCH</span>
          </div>
          <h3 class="mod-title" style="font-size: 1.05rem;">
            <a href="{{ post.url | relative_url }}" style="color: inherit; text-decoration: none;">
              {{ post.title }}
            </a>
          </h3>
          <p class="mod-desc" style="margin-top: 0.6rem;">
            {{ post.excerpt | strip_html | truncatewords: 24 }}
          </p>
        </div>
        <div class="mod-card-actions">
          <a href="{{ post.url | relative_url }}" class="cyber-btn">[ > READ LOG ]</a>
        </div>
      </article>
    {% endfor %}
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
      <a href="{{ '/support/' | relative_url }}" class="cyber-btn scramble-hover" data-text="[ ⚡ FUEL THE DEV: $$$ ]" style="background: var(--warning-amber); color: #06080e; border-color: var(--warning-amber); font-size: 0.9rem; padding: 0.65rem 1.25rem; font-weight: 800;">
        [ ⚡ FUEL THE DEV: $$$ ]
      </a>
    </div>
  </div>
</section>

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
        <a href="{{ '/about/' | relative_url }}" class="cyber-btn" style="background: var(--glacial-mint); color: #06080e; border-color: var(--glacial-mint); font-weight: 700;">
          [ &gt; FULL CREATOR DOSSIER ]
        </a>
        <a href="https://github.com/Vapok" target="_blank" rel="noopener noreferrer" class="cyber-btn">
          [ GITHUB REPOSITORIES ]
        </a>
        <a href="{{ '/support/' | relative_url }}" class="cyber-btn" style="border-color: var(--warning-amber); color: var(--warning-amber);">
          [ ⚡ DONATE &amp; SUPPORT ]
        </a>
        <a href="{{ '/terms-of-service' | relative_url }}" class="cyber-btn btn-secondary">
          [ LEGAL &amp; LICENSING ]
        </a>
      </div>
    </div>
  </div>
</section>
