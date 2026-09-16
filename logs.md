---
layout: page
title: "Transmission Logs"
permalink: /logs/
description: "Official development dispatches, patch notes, changelogs, and system broadcasts from Vapok Gaming."
---

<!-- STATUS HERO CALLOUT -->
<div style="background: rgba(6, 8, 14, 0.75); border: 1px solid var(--border-subtle); padding: 1.75rem; margin-bottom: 2.5rem; backdrop-filter: blur(8px);">
  <div style="font-size: 0.8rem; color: var(--ice-blue); letter-spacing: 1px; margin-bottom: 0.4rem;">
    [ SYS_COMM // ARCHIVE_FREQUENCY ]
  </div>
  <h2 style="color: var(--ice-blue-bright); font-size: 1.45rem; margin-top: 0; margin-bottom: 0.6rem;">
    Development Dispatches &amp; System Logs
  </h2>
  <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; max-width: 800px; margin-bottom: 1rem;">
    Official project logs, release announcements, architectural updates, and technical devlogs across Vapok's game modifications, tooling, and community infrastructure.
  </p>
  <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
    <a href="{{ site.donations.discord_invite }}" target="_blank" rel="noopener noreferrer" class="cyber-btn" style="background: var(--glacial-mint); color: #06080e; border-color: var(--glacial-mint);">
      [ 💬 JOIN DISCORD DISPATCHES ]
    </a>
    <a href="{{ '/modding/' | relative_url }}" class="cyber-btn">
      [ ⚡ VIEW MOD CATALOG ]
    </a>
  </div>
</div>

<!-- TRANSMISSION LOGS CATALOG -->
<section id="logs">
  <div class="section-header">
    <div class="section-title">
      <span>// TRANSMISSION_ARCHIVE</span>
      <span class="section-title-tag">[ {{ site.posts.size }} DISPATCHES ON RECORD ]</span>
    </div>
  </div>

  {% if site.posts.size > 0 %}
    <div class="mod-grid" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
      {% for post in site.posts %}
        <article class="mod-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="mod-card-header">
              <span class="mod-card-id">{{ post.date | date: "%Y.%m.%d" }}</span>
              <span class="status-badge mint">DISPATCH // {{ forloop.rindex }}</span>
            </div>
            <h3 class="mod-title" style="font-size: 1.15rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">
              <a href="{{ post.url | relative_url }}" style="color: inherit; text-decoration: none;">
                {{ post.title }}
              </a>
            </h3>
            {% if post.categories.size > 0 %}
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                {% for category in post.categories %}
                  <span style="font-size: 0.7rem; color: var(--ice-blue); background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); padding: 0.15rem 0.45rem; border-radius: 2px; letter-spacing: 0.5px;">
                    #{{ category }}
                  </span>
                {% endfor %}
              </div>
            {% endif %}
            <p class="mod-desc" style="margin-top: 0.4rem; font-size: 0.88rem; line-height: 1.55;">
              {{ post.excerpt | strip_html | truncatewords: 28 }}
            </p>
          </div>
          <div class="mod-card-actions" style="margin-top: 1.25rem;">
            <a href="{{ post.url | relative_url }}" class="cyber-btn" style="width: 100%; text-align: center;">[ &gt; READ FULL LOG ]</a>
          </div>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <div style="padding: 2.5rem; background: rgba(6, 8, 14, 0.8); border: 1px dashed var(--border-subtle); text-align: center;">
      <p style="color: var(--text-muted); font-size: 0.95rem;">
        // NO ACTIVE TRANSMISSIONS FOUND IN LOCAL BUFFER
      </p>
    </div>
  {% endif %}
</section>
