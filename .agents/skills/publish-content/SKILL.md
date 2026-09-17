---
name: publish-content
description: Standard workflow and protocol for preparing, staging, and publishing content, blog posts, mod releases, or pages to vapok.io, including mandatory RFC-compliant sitemap.xml verification, build testing, and SEO validation.
---

# Content Publishing & Release Protocol for Vapok.io

This skill defines the mandatory, end-to-end procedure for preparing, validating, and publishing new or updated content on **vapok.io** (Jekyll static site on GitHub Pages).

---

## 1. Pre-Publishing Workflow

### A. Authoring Content / Transmission Logs (`_posts/`)
* **File Naming**: `_posts/YYYY-MM-DD-kebab-case-slug.md`.
* **Required Front Matter**:
  ```yaml
  ---
  layout: post
  title: "Title Here"
  date: YYYY-MM-DD
  badge: "COMMUNITY" # or UPDATE, DEVLOG, ANNOUNCEMENT
  badge_color: "mint" # or cyan, amber, teal
  categories: [category1, category2]
  tags: [tag1, tag2]
  excerpt: "1-2 sentence summary for preview cards and social graph."
  ---
  ```
* **Tone & Framing**: Personal, first-person ("I", "my", "me"), authentic, community-focused, and appreciative.

### B. Mod Catalog Updates (`_mods/` & `_data/`)
* When publishing or syncing new mod releases across Valheim, Techtonica, or other games, run the sync script:
  ```bash
  python3 scripts/sync_releases.py
  ```
* Verify mod card metadata, download stats, icons, and changelogs.

---

## 2. MANDATORY: Sitemap & SEO Verification (RFC-Compliant XML)

Whenever content is prepared or updated for publication, **you MUST ALWAYS verify that `sitemap.xml` is present, refreshed, and fully compliant with the official Sitemap XML protocol ([sitemaps.org Schema 0.9 RFC](http://www.sitemaps.org/schemas/sitemap/0.9))**.

### Requirements for `sitemap.xml`:
1. **XML Declaration & Namespace**:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ```
2. **URL Inclusion Invariants**:
   * **Core Pages**: `/`, `/modding/`, `/games/`, `/logs/`, `/about/`, `/support/`, `/privacy-policy/`, `/terms-of-service/`.
   * **All Mod Pages**: `/mods/:slug/`.
   * **All Transmission Logs**: `/category/YYYY/MM/DD/:slug/`.
   * **Exclusions**: 404 pages, asset files (`.css`, `.js`, `.json`), CNAME, and hidden files.
3. **Tags per `<url>`**:
   * `<loc>`: Absolute URL (`https://vapok.io/...`).
   * `<lastmod>`: W3C Datetime format (`YYYY-MM-DD` or ISO-8601).
   * `<changefreq>`: `daily`, `weekly`, or `monthly`.
   * `<priority>`: `1.0` (Home), `0.9` (Mods), `0.8` (Core Pages), `0.7` (Posts/Logs).
4. **Search Engine Discovery (`robots.txt`)**:
   * Confirm `robots.txt` exists at root and points to `Sitemap: https://vapok.io/sitemap.xml`.

---

## 3. Local Build Verification

Before publishing or committing any changes:
1. Run a test build:
   ```bash
   bundle exec jekyll build
   ```
2. Confirm the build finishes with exit code 0 (`done in X.XXX seconds`).
3. Inspect `_site/sitemap.xml` to verify valid XML formatting and all expected URLs are indexed.

---

## 4. Git Deployment Protocol

1. Stage modified files:
   ```bash
   git add _posts/ _mods/ _data/ sitemap.xml robots.txt ...
   ```
2. Commit with a clear, descriptive message:
   ```bash
   git commit -m "Publish: <Summary of changes>"
   ```
3. Push to production:
   ```bash
   git push origin main
   ```
