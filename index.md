---
layout: default
title: Home
---

{% include ascii-banner.html %}

<!-- MOD SHOWCASE CATALOG -->
<section id="mods">
  <div class="section-header">
    <div class="section-title">
      <span>// MODULE_REPOSITORY</span>
      <span class="section-title-tag">[ FEATURED MODS & SYSTEMS ]</span>
    </div>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">[ ALL ]</button>
      <button class="filter-btn" data-filter="valheim">[ VALHEIM ]</button>
      <button class="filter-btn" data-filter="tools">[ TOOLS & LIBS ]</button>
    </div>
  </div>

  <div class="mod-grid">
    {% for mod in site.mods %}
      {% include mod-card.html mod=mod %}
    {% endfor %}
  </div>
</section>

<!-- DEV LOGS / NEWS -->
<section id="logs" style="margin-top: 3.5rem;">
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

<!-- ABOUT & PROTOCOLS -->
<section id="about" style="margin-top: 3.5rem;">
  <div class="section-header">
    <div class="section-title">
      <span>// CREATOR_DIRECTIVE</span>
      <span class="section-title-tag">[ ABOUT VAPOK MODDING ]</span>
    </div>
  </div>

  <div class="content-terminal-box" style="margin-top: 0;">
    <div class="markdown-body">
      <p>
        <strong>Vapok Modding</strong> designs and engineers robust, multiplayer-safe modifications for PC titles. Every project is built from the ground up prioritizing performance, customizability, clean architecture, and long-term save game stability.
      </p>
      
      <p>
        Source repositories, issue trackers, and community builds are maintained publicly across GitHub and Nexus Mods.
      </p>

      <hr>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://github.com/Vapok" target="_blank" rel="noopener noreferrer" class="cyber-btn">
          [ GITHUB REPOSITORIES ]
        </a>
        <a href="https://www.nexusmods.com" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-secondary">
          [ NEXUS MODS HUB ]
        </a>
        <a href="{{ '/terms-of-service' | relative_url }}" class="cyber-btn btn-secondary">
          [ LEGAL &amp; LICENSING ]
        </a>
      </div>
    </div>
  </div>
</section>
