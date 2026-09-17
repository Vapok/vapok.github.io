---
layout: page
title: "Module Repository"
permalink: /mods/
description: "Explore Vapok's open-source modifications, automation systems, and quality-of-life enhancements for Valheim and Techtonica."
---

<!-- STATUS HERO CALLOUT -->
<div style="background: rgba(6, 8, 14, 0.75); border: 1px solid var(--border-subtle); padding: 1.75rem; margin-bottom: 2.5rem; backdrop-filter: blur(8px);">
  <div style="font-size: 0.8rem; color: var(--ice-blue); letter-spacing: 1px; margin-bottom: 0.4rem;">
    [ SYS_ENGINEERING // MOD_DOSSIER_MATRIX ]
  </div>
  <h2 style="color: var(--ice-blue-bright); font-size: 1.45rem; margin-top: 0; margin-bottom: 0.6rem;">
    Game Modifications &amp; Systems Engineering
  </h2>
  <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; max-width: 800px; margin-bottom: 1rem;">
    All modifications are 100% free, open-source, and engineered with an uncompromising focus on clean architecture, multiplayer stability, zero save-corruption risk, and comprehensive configuration options.
  </p>
  <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
    <a href="https://github.com/Vapok" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-mint">
      [ ⚡ GITHUB REPOSITORIES ]
    </a>
    <a href="{{ '/support/' | relative_url }}" class="cyber-btn btn-amber">
      [ ⚡ FUEL THE DEVELOPER ]
    </a>
    <a href="{{ site.donations.discord_invite }}" target="_blank" rel="noopener noreferrer" class="cyber-btn">
      [ 💬 MOD SUPPORT DISCORD ]
    </a>
  </div>
</div>

<!-- MOD SHOWCASE CATALOG -->
<section id="mods">
  <div class="section-header">
    <div class="section-title">
      <span>// MODULE_REPOSITORY</span>
      <span class="section-title-tag">[ FEATURED MODS &amp; SYSTEMS ]</span>
    </div>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">[ ALL (16) ]</button>
      <button class="filter-btn" data-filter="valheim">[ VALHEIM (11) ]</button>
      <button class="filter-btn" data-filter="techtonica">[ TECHTONICA (5) ]</button>
    </div>
  </div>

  <div class="mod-grid">
    {% assign all_mods = site.mods %}
    {% if all_mods == nil or all_mods.size == 0 %}
      {% assign all_mods = site.data.mods %}
    {% endif %}
    {% for mod in all_mods %}
      {% include mod-card.html mod=mod %}
    {% endfor %}
  </div>
</section>
