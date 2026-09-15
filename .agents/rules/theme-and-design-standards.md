# Vapok Modding — Design, Architecture & Release Standards

## 1. Visual Identity & Atmosphere ("Cyber-Console / Arctic Terminal")
All web pages, layout templates, and UI components in this repository adhere to a custom **Cyber-Console / Neo-Terminal** aesthetic blending retro DOS/ASCII nostalgia with modern interactive web polish.

### Core Color Palette
- **Background Obsidian Black**: `#06080e` (base canvas), `#0b111a` (panels), `#111a28` (elevated cards).
- **Primary Highlights (Ice Blue)**: `#64f0fc`, `#a5f3fc` (neon phosphor glows, key headings, primary action buttons).
- **Secondary Accents (Cyber Teal)**: `#14b8a6`, `#0d9488` (table labels, subheadings, secondary borders).
- **Status & Metrics (Glacial Mint)**: `#00f59b`, `#34d399` (active status badges, download counters, log badges).
- **Muted Console Gray**: `#6b8299`, `#415163` (subtext, system timestamps).

### Typography & Framing
- **Monospace Stack**: Primary font is `JetBrains Mono` with `VT323` for retro display banners and ASCII headers.
- **ASCII & Box-Drawing Borders**: Use Unicode box frames (`┌─┐`, `│`, `└─┘`, `╔═╗`, `║`, `╚═╝`) and command-line prompt prefixes (`vapok@modding:~$`, `SYS_NODE: [ vapok.github.io ]`).
- **Scanlines & CRT Effect**: Supported globally via `.crt-overlay` with toggle in header.
- **ASCII Scrambler Guardrail**: 2D ASCII banners must preserve exact character cell widths, spaces, and line-breaks during hover glitching.

---

## 2. Mod Releases Pipeline & Directory Structure

### Source Releases Directory
- Location: `/home/vapok/Modding/Releases/<ModName>-Vapok/`
- Standard release files:
  - `manifest.json` (name, version_number, description, website_url, dependencies)
  - `README.md` (documentation & usage)
  - `CHANGELOG.md` (version release notes)
  - `icon.png` (mod badge image)

### Automated Sync Workflow
- Whenever releases are created or updated, run:
  ```bash
  python3 scripts/sync_releases.py
  ```
- This automatically updates `_mods/*.md`, `_includes/changelogs/*.md`, and `assets/images/mods/*/icon.png`.

---

## 3. Codebase Architecture & Layouts Hierarchy

### Collections & Layouts
- `collections.mods` in `_config.yml` (`permalink: /mods/:slug/`).
- `_layouts/default.html`: Root HTML template hosting canvas, scanlines, header, and footer.
- `_layouts/mod.html`: Individual mod dossier layout with icon box, metadata specs, and tabbed README vs CHANGELOG viewer.
- `_layouts/page.html`: Dossier format for policy/legal/documentation pages.
- `_layouts/post.html`: Dispatch format for devlog updates in `_posts/`.
- `_includes/header.html`: Terminal system bar with status pulse, UTC clock, CRT switch, and navigation.
- `_includes/ascii-banner.html`: Responsive ASCII logo header with metrics and hover scrambler.
- `_includes/mod-card.html`: DOS-style dossier card.
- `_includes/footer.html`: Terminal system footer with legal and social links.

### Styling & Scripts
- Stylesheet: `assets/css/terminal.css` (Vanilla CSS with CSS custom properties).
- Interaction Engine: `assets/js/terminal-fx.js` (Canvas particle grid, text decoder on hover, dossier tab switcher, CRT state persistence).
