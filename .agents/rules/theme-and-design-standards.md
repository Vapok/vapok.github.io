# Vapok Gaming — Design, Architecture & Multi-Game Release Standards

## 1. Visual Identity & Atmosphere ("Cyber-Console / Arctic Terminal")
All web pages, layout templates, and UI components in this repository adhere to a custom **Cyber-Console / Neo-Terminal** aesthetic representing **Vapok Gaming** and the **Vapok Gaming Community**.

### Core Color Palette
- **Background Obsidian Black**: `#06080e` (base canvas), `#0b111a` (panels), `#111a28` (elevated cards).
- **Primary Highlights (Ice Blue)**: `#64f0fc`, `#a5f3fc` (neon phosphor glows, key headings, primary action buttons).
- **Secondary Accents (Cyber Teal)**: `#14b8a6`, `#0d9488` (table labels, subheadings, secondary borders).
- **Status & Metrics (Glacial Mint)**: `#00f59b`, `#34d399` (active status badges, download counters, log badges).
- **Fuel & Donations (Amber Gold)**: `#fbbf24` (fuel buttons, donation tiers, highlight callouts).
- **Muted Console Gray**: `#6b8299`, `#415163` (subtext, system timestamps).

### Typography & Framing
- **Monospace Stack**: Primary font is `JetBrains Mono` with `VT323` for retro display banners and ASCII headers.
- **ASCII & Box-Drawing Borders**: Use Unicode box frames (`┌─┐`, `│`, `└─┘`, `╔═╗`, `║`, `╚═╝`) and command-line prompt prefixes (`user@vapok.io:~$`, `SYS_NODE: [ vapok.io ]`).
- **Scanlines & CRT Effect**: Supported globally via `.crt-overlay` with toggle in header.
- **ASCII Scrambler Guardrail**: 2D ASCII banners must preserve exact character cell widths, spaces, and line-breaks during hover glitching.

---

## 2. Active Games & Rotation Architecture (`/games/`)

### Data Registry (`_data/games.yml`)
- Structured list of games under two main tiers: `category: "active"` and `category: "rotation"`.
- Fields: `title`, `slug`, `category`, `genre`, `platform`, `status_tag`, `status_type`, `banner_url`, `description`, `current_focus`, `modding_status`, `discord_channel`, `discord_link`.

### Card & Banner Invariants
- **16:9 Aspect Ratio**: Image banners must be wrapped in `.game-card-img-wrap` (`aspect-ratio: 16 / 9`) with `object-fit: cover` to avoid cutting off game logos or art.
- **Steam Assets**: Use official `capsule_616x353.jpg` endpoints (checking for hashed CDN paths on new/unreleased titles).
- **Non-Steam Assets**: Store official publisher assets in `assets/images/games/` with 16:9 compositing.
- **Current Focus Guardrail**: The `CURRENT FOCUS` block must strictly render only for active games (`category == 'active'`). In-rotation cards remain streamlined.
- **Category Filtering**: Cards use `data-category="{{ game.category }}"` wired to `.filter-btn` controls (`[ ALL ]`, `[ ⚡ ACTIVELY PLAYING ]`, `[ 🔄 IN ROTATION ]`).
- **Discord Spotlight Alignment**: Channel tags mirror the Discord server's *Gaming Spotlight* channels (e.g. `#valheim`, `#world-of-warcraft`, `#satisfactory`, `#enshrouded`, `#techtonica`, `#aska`, `#v-rising`, `#icarus`, `#fellowship`, `#alchemy-factory`, `#windrose`).

---

## 3. Multi-Game Release Pipeline & Directories

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

## 4. Support & Backer Channels Architecture

### Support Channels
- **Discord Subscriptions**: `donations.discord_sub` in `_config.yml` (VIP channels, early releases, tickets).
- **Buy Me A Coffee**: `donations.buymeacoffee` (one-time or recurring tip).
- **PayPal Direct**: `donations.paypal` (direct fuel).
- **Discord Server Boosting**: `donations.discord_invite` (community audio/vanity URL).

### UI Integration
- Header Control: Glowing amber `[ ⚡ FUEL: $$$ ]` button (`.fuel-btn` with hover text scramble).
- Nav Menu: Streamlined (`/HOME`, `/MODS`, `/GAMES`, `/LOGS`, `/ABOUT`).
- Dedicated Page: `support.md` (`permalink: /support/`) with backer manifesto, channel cards, and perks matrix table.

---

## 5. Codebase Architecture & Conventions

### Collections & Layouts
- `collections.mods` in `_config.yml` (`permalink: /mods/:slug/`).
- `_layouts/default.html`: Root HTML template hosting canvas, scanlines, header, and footer.
- `_layouts/mod.html`: Individual mod dossier layout with icon box, metadata specs, and tabbed README vs CHANGELOG viewer.
- `_layouts/page.html`: Dossier format for policy/legal/documentation/support/games pages.
- `_layouts/post.html`: Dispatch format for devlog updates in `_posts/`.

### Includes & Liquid Scoping
- `_includes/ascii-banner.html`: Hero banner displaying live stats (`total_downloads`, `active_mods`, `discord_members` link).
- `_includes/mod-card.html`: DOS-style dossier card. Always include `{% assign mod = include.mod | default: mod %}` at line 1.
- `_includes/header.html` & `_includes/footer.html`: System bars with UTC clock, status indicator, CRT switch, fuel button, and links.

### Styling & Scripts
- Stylesheet: `assets/css/terminal.css` (Vanilla CSS with CSS custom properties).
- Interaction Engine: `assets/js/terminal-fx.js` (Canvas particle grid, text decoder on hover, dossier tab switcher, CRT state persistence). Always validate with `node --check assets/js/terminal-fx.js`.

---

## 6. Interactive CLI Terminal, Bootloader & Sitemap Engine (`assets/js/terminal-fx.js`)

### Terminal Drawer & Sticky Header Integration
- **Header Toggle**: `#cli-toggle-btn` toggles between `[ CLI: >_ ]` and `[ CLI: <_ ]`. When open, receives `.active` class with cyan glow (`box-shadow: 0 0 12px var(--ice-blue-glow), inset 0 0 8px rgba(100, 240, 252, 0.2)`).
- **Terminal Prompt Anchor**: When the CLI drawer opens, `#terminal-brand-btn` (`user@vapok.io:~$ █ [TTY-1]`) remains visible as the active glowing anchor point for the drawer. Main navigation links maintain `margin-left: auto;` to remain strictly anchored to the right side without layout shifting.
- **Dynamic Quick Power Button**: `#cli-boot-quick-btn` dynamically reflects system power state:
  - **OFFLINE**: Displays amber `[ ⚡ START ]` (`var(--warning-amber)`), executing `start`.
  - **ONLINE**: Displays crimson red `[ 🛑 STOP ]` (`var(--error-crimson)`), executing `shutdown`.
  - CLI recognizes `stop` as a direct alias for `shutdown` / `poweroff`.
- **Dismissal & Hotkeys**:
  - Global hotkeys: <kbd>~</kbd> / <kbd>`</kbd> toggles CLI; <kbd>Enter</kbd> (when drawer is closed on general page) opens the CLI and focuses `#cli-input`.
  - Click-outside dismissal automatically closes drawer, strictly ignoring clicks inside the drawer, on `#terminal-brand-btn`, or on `.header-controls`.
  - Drawer animations use `drawerSlideDown` on open and `drawerSlideUp` (`.closing` class) on close.

### Bootloader (`start`), Decompiler (`shutdown`), & State Routing
- **Status Color Palette**:
  - `OFFLINE`: Red (`#ef4444` / `#ff4d4d`)
  - `BOOTING...` / `SHUTTING DOWN...`: Amber Gold (`var(--warning-amber)` / `#fbbf24`) with pulsing dot animation
  - `ONLINE`: Glacial Mint (`var(--glacial-mint)` / `#00f59b`)
- **Homepage vs. Direct Sub-Page Routing**:
  - **Homepage (`/`)**: Unbooted visitors start in gated `system-offline` mode requiring `start` (or clicking `[ ⚡ START ]`).
  - **Direct Sub-pages (e.g. `/games/`, `/support/`)**: Unbooted visitors automatically trigger the full 10-second compilation bootloader upon page arrival, compiling sub-page elements and transitioning to `ONLINE`.
- **`start` Sequence**: 10-second top-down compilation decoding elements via `decodeTextElement()`. `start` is the only command that automatically closes the drawer once compilation is complete.
- **Clock Scramble & Transition**: During boot and shutdown, `#system-clock` transitions position fluidly with `max-width` box-model interpolation on `#header-fuel-btn` while running cyber text matrix scramble-encoding and resolving into live UTC timestamps.
- **`shutdown` Sequence**: 7-second graceful bottom-up decompilation encoding elements into cyber noise glyphs via `encodeTextElement()`, returning system to `OFFLINE`.
- **`reboot` Sequence**: Gracefully decompiles to `OFFLINE` and immediately re-initializes the top-down `start` bootloader.

### Terminal Command Processor Invariants
- **Empty Submissions**: Pressing <kbd>Enter</kbd> without text prints a clean `user@vapok.io:~$` line without erroring or triggering boot.
- **Focus Retention**: Cursor automatically re-focuses in `#cli-input` after command execution.
- **Non-disruptive Telemetry**: In-terminal commands (`fuel`, `support`, `games`, `mods`, `status`, `crt`, `pwd`) print formatted ASCII data/links into the buffer instead of forcing page navigation or synthetic DOM click events.
- **`crt` Command Guardrail**: Must call `toggleCrtEffect()` directly in state and `localStorage` without dispatching synthetic DOM click events that trigger click-outside handlers.

### Hidden Directory Matrix / Sitemap TUI (`dir`, `ls`, `ls -l`, `ls -la`, `sitemap`)
- **Hidden Command**: Not listed in the public `help` directory.
- **Bounded TUI Architecture**:
  - Launches as a dedicated full-drawer console program (`.cyber-cli-drawer.tui-active`), temporarily concealing the log buffer and prompt input.
  - **Fixed Header & Footer**: Includes a fixed status title bar (`// VAPOK_OS DIRECTORY MATRIX EXPLORER v2026.1`) with a live item counter (`[ 1/6 ]`), and a fixed action button footer.
  - **Auto-Scrolling Viewport**: The middle tree container (`.cli-tui-body`) independently scrolls and automatically invokes `el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })` whenever the selection moves, ensuring deep multi-level expansion never causes the active cursor or toolbar to scroll out of view.
- **Interactive Tree Navigation**:
  - <kbd>→</kbd> (Right Arrow): Expands parent directory node to reveal nested children (`level-1`, `level-2`) or moves down into the first child.
  - <kbd>←</kbd> (Left Arrow): Collapses expanded node or jumps back up to parent.
  - <kbd>↑</kbd> / <kbd>↓</kbd> (Up / Down): Traverses through visible tree nodes with auto-scroll centering.
  - <kbd>Enter</kbd>: Navigates/redirects browser to selected URL and refreshes.
  - <kbd>Escape</kbd> (or `[ ESC ] EXIT TUI`): Exits the console program cleanly, restores CLI terminal output/prompt, and re-focuses `#cli-input`.

---

## 7. Mobile Responsiveness & Viewport Containment Standards

### Header Status Bar (Mobile)
- Organized into a clean 2-row CSS Grid layout under `@media (max-width: 768px)`:
  - **Row 1**: `SYS_NODE: [ vapok.io ] | STATUS: ONLINE` left-aligned, UTC clock right-aligned on the same line.
  - **Row 2**: Action buttons (`[ ⚡ FUEL: $$$ ]`, `[ CLI: >_ ]`, `[ CRT: ON ]`) evenly distributed across 3 equal columns.
- **Un-justified Command Elements**: Command prompt elements (`user@vapok.io:~$`, cursor `█`, `[TTY-1]`) must never be justified with `space-between`; they must remain left-aligned and grouped compactly.

### Card & Text Viewport Containment
- **Gutter Spacing**: `.site-wrapper` mobile horizontal padding is minimum `1rem` (16px).
- **Unbroken String Truncation**: Long unspaced package or dependency identifiers (e.g. `denikson-BepInExPack_Valheim-5.4.2350`) must have `max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` on `.dep-badge` to prevent pushing cards beyond the viewport.
- **Grid Item Shrink**: `.mod-grid` uses `grid-template-columns: minmax(0, 1fr)` with `min-width: 0; box-sizing: border-box; overflow: hidden;` on `.mod-card`.
- **Flexible Action Buttons**: `.mod-card-actions .cyber-btn` wrap flexibly on mobile (`flex: 1 1 calc(50% - 0.45rem)`).

### Mobile Back-To-Top Button
- Fixed in bottom-right corner on mobile screens, hidden on desktop (`min-width: 769px`).
- Activates with a cyber matrix scatter-decoding text animation when user scrolls down past `150px`.
- Smoothly scrolls back to top when tapped (`window.scrollTo({ top: 0, behavior: 'smooth' })`).

