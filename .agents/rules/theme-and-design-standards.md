# Vapok Modding — Design, Architecture & Multi-Game Release Standards

## 1. Visual Identity & Atmosphere ("Cyber-Console / Arctic Terminal")
All web pages, layout templates, and UI components in this repository adhere to a custom **Cyber-Console / Neo-Terminal** aesthetic blending retro DOS/ASCII nostalgia with modern interactive web polish.

### Core Color Palette
- **Background Obsidian Black**: `#06080e` (base canvas), `#0b111a` (panels), `#111a28` (elevated cards).
- **Primary Highlights (Ice Blue)**: `#64f0fc`, `#a5f3fc` (neon phosphor glows, key headings, primary action buttons).
- **Secondary Accents (Cyber Teal)**: `#14b8a6`, `#0d9488` (table labels, subheadings, secondary borders).
- **Status & Metrics (Glacial Mint)**: `#00f59b`, `#34d399` (active status badges, download counters, log badges).
- **Fuel & Donations (Amber Gold)**: `#fbbf24` (fuel buttons, donation tiers, highlight callouts).
- **Muted Console Gray**: `#6b8299`, `#415163` (subtext, system timestamps).

### Typography & Framing
- **Monospace Stack**: Primary font is `JetBrains Mono` with `VT323` for retro display banners and ASCII headers.
- **ASCII & Box-Drawing Borders**: Use Unicode box frames (`┌─┐`, `│`, `└─┘`, `╔═╗`, `║`, `╚═╝`) and command-line prompt prefixes (`vapok@modding:~$`, `SYS_NODE: [ vapok.github.io ]`).
- **Scanlines & CRT Effect**: Supported globally via `.crt-overlay` with toggle in header.
- **ASCII Scrambler Guardrail**: 2D ASCII banners must preserve exact character cell widths, spaces, and line-breaks during hover glitching.

---

## 2. Multi-Game Release Pipeline & Directories

### Source Releases Directories
- **Valheim**: `/home/vapok/Modding/Releases/<ModName>-Vapok/` (Thunderstore & Nexus)
- **Techtonica**: `/home/vapok/Modding/Techtonica/Releases/Vapok-<ModName>-<Version>/` (Thunderstore only)

### Standard Release File Schema
- `manifest.json` (name, version_number, description, website_url, dependencies)
- `README.md` (documentation & usage)
- `CHANGELOG.md` (version release notes)
- `icon.png` (mod badge image)

### Automated Sync Workflow (`scripts/sync_releases.py`)
- Run `python3 scripts/sync_releases.py` whenever releases are created or updated across any supported game.
- Automatically queries Thunderstore community APIs (`valheim`, `techtonica`) and Discord API (`5YAJkRFBXt`).
- Automatically injects `markdown="1"` into HTML `<div>` tags in READMEs so Kramdown renders markdown correctly.
- Outputs to `_mods/*.md`, `_data/mods.yml`, `_data/stats.yml`, `_includes/changelogs/*.md`, and `assets/images/mods/*/icon.png`.

---

## 3. Support & Backer Channels Architecture

### Support Channels
- **Discord Subscriptions**: `donations.discord_sub` in `_config.yml` (VIP channels, early releases, tickets).
- **Buy Me A Coffee**: `donations.buymeacoffee` (one-time or recurring tip).
- **PayPal Direct**: `donations.paypal` (direct fuel).
- **Discord Server Boosting**: `donations.discord_invite` (community audio/vanity URL).

### UI Integration
- Header Control: Glowing amber `[ ⚡ FUEL: $$$ ]` button (`.fuel-btn` with hover text scramble).
- Nav Menu: Streamlined (`/HOME`, `/MODS`, `/LOGS`, `/ABOUT`).
- Dedicated Page: `support.md` (`permalink: /support/`) with backer manifesto, channel cards, and perks matrix table.

---

## 4. Codebase Architecture & Conventions

### Collections & Layouts
- `collections.mods` in `_config.yml` (`permalink: /mods/:slug/`).
- `_layouts/default.html`: Root HTML template hosting canvas, scanlines, header, and footer.
- `_layouts/mod.html`: Individual mod dossier layout with icon box, metadata specs, and tabbed README vs CHANGELOG viewer.
- `_layouts/page.html`: Dossier format for policy/legal/documentation/support pages.
- `_layouts/post.html`: Dispatch format for devlog updates in `_posts/`.

### Includes & Liquid Scoping
- `_includes/ascii-banner.html`: Hero banner displaying live stats (`total_downloads`, `active_mods`, `discord_members` link).
- `_includes/mod-card.html`: DOS-style dossier card. Always include `{% assign mod = include.mod | default: mod %}` at line 1.
- `_includes/header.html` & `_includes/footer.html`: System bars with UTC clock, status indicator, CRT switch, fuel button, and links.

### Styling & Scripts
- Stylesheet: `assets/css/terminal.css` (Vanilla CSS with CSS custom properties).
- Interaction Engine: `assets/js/terminal-fx.js` (Canvas particle grid, text decoder on hover, dossier tab switcher, CRT state persistence). Always validate with `node --check assets/js/terminal-fx.js`.
