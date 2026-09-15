# Vapok Modding — Design, Architecture & Release Standards

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

## 2. Mod Releases Pipeline & Authorship Scope

### Authorship Guardrail
- Only include mods created and maintained by `Vapok` (namespace `Vapok`).
- `XPortalNetworks` is Vapok's mod; do not include external author releases like `XPortal` (SpikeHimself).

### Source Releases Directory
- Location: `/home/vapok/Modding/Releases/<ModName>-Vapok/`
- Standard release files:
  - `manifest.json` (name, version_number, description, website_url, dependencies)
  - `README.md` (documentation & usage)
  - `CHANGELOG.md` (version release notes)
  - `icon.png` (mod badge image)

### Category & Multi-Game Support
- Currently all active mods are in category `valheim`.
- Filter buttons on `index.md` currently include `[ ALL ]` and `[ VALHEIM ]`.
- As Vapok branches into other games or shared tool libraries, new categories (e.g. `enshrouded`, `unity-tools`) should be registered in `_data/mods.yml` / `_mods/` frontmatter and corresponding filter buttons added to the filter bar.

### Automated Sync & Live Metrics Workflow
- Whenever releases are created or updated, run:
  ```bash
  python3 scripts/sync_releases.py
  ```
- This script automatically:
  1. Queries Thunderstore API for `Vapok` packages to pull real-time download numbers.
  2. Queries Discord API for server `5YAJkRFBXt` (*Vapok's Gaming Community*) for live member counts.
  3. Updates `_data/stats.yml`, `_mods/*.md`, `_includes/changelogs/*.md`, and `assets/images/mods/*/icon.png`.

---

## 3. Support & Backer Channels Architecture

### Support Channels
- **Discord Subscriptions**: `donations.discord_sub` in `_config.yml` (VIP channels, early releases, tickets).
- **Buy Me A Coffee**: `donations.buymeacoffee` (one-time or recurring tip).
- **PayPal Direct**: `donations.paypal` (direct fuel).
- **Discord Server Boosting**: `donations.discord_invite` (community audio/vanity URL).

### UI Integration
- Header Control: Glowing amber `[ ⚡ FUEL: $$$ ]` button (`.fuel-btn` with hover text scramble).
- Nav Menu: `[ /SUPPORT ]` leading to `/support/` (`support.md`).
- Dedicated Page: `support.md` with backer manifesto, channel cards, and perks matrix table.

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
