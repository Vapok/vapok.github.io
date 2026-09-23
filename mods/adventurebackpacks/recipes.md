---
layout: default
title: "Adventure Backpacks: Book of Knowledge (Recipes & Crafting Codex)"
description: "Unseal the Book of Knowledge: The definitive crafting and progression codex for Adventure Backpacks in Valheim. Discover default recipes, upgrade materials, station tiers, and creature drop rates."
permalink: /mods/adventurebackpacks/recipes/
---

<div class="content-terminal-box">
  <!-- Top Breadcrumb & Navigation -->
  <div style="margin-bottom: 1.25rem; font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
    <div>
      <span style="color: var(--cyber-teal)">user@vapok.io:~$</span>
      <a href="{{ '/' | relative_url }}" style="color: var(--ice-blue); text-decoration: none;">./root</a> /
      <a href="{{ '/mods/' | relative_url }}" style="color: var(--ice-blue); text-decoration: none;">mods</a> /
      <a href="{{ '/mods/adventurebackpacks/' | relative_url }}" style="color: var(--ice-blue); text-decoration: none;">AdventureBackpacks</a> /
      <span style="color: var(--glacial-mint)">recipes-codex</span>
    </div>
    <a href="{{ '/mods/adventurebackpacks/' | relative_url }}" class="ctrl-btn">[ &lt; BACK TO ADVENTURE BACKPACKS ]</a>
  </div>

  <!-- Book of Knowledge Grand Hero -->
  <div class="book-hero">
    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
      <span class="status-badge mint">ANCIENT CODEX</span>
      <span class="status-badge cyan">VALHEIM COMPENDIUM</span>
      <span style="font-size: 0.8rem; color: var(--text-dim);">VOLUME // 0xBACKPACK_RECIPES</span>
    </div>

    <h1 class="book-hero-title">📖 The Book of Knowledge: Backpack Recipes</h1>
    <p class="book-hero-subtitle">
      The definitive crafting blueprints, upgrade paths, and biomic secrets of <strong>Adventure Backpacks</strong>. From the humble deer hides of the Meadows to the mystical eitr-weaves of the Mistlands, consult the ancient designs below.
    </p>

    <!-- Explorer Stance & Philosophy Callout -->
    <div class="book-philosophy-card">
      <div class="book-philosophy-icon">🧭</div>
      <div class="book-philosophy-text">
        <h3>A Note from the Cartographer: The Explorer's Stance</h3>
        <p>
          <em>"Valheim is a game born of wandering, trial, and hard-earned discovery."</em> My fundamental stance has always been that the Tenth World rewards those who explore its biomes and defeat its beasts—you will naturally unlock these blueprints as you gather resources.
        </p>
        <p>
          However, every great journey benefits from an illuminated field journal. For the weary traveler planning expeditions or verifying materials, this Book of Knowledge reveals the starter blueprints.
        </p>
        <p style="color: var(--warning-amber); font-weight: 600; margin-top: 0.6rem;">
          ⚙️ <strong>Configurability Reminder:</strong> All recipes and station requirements listed here reflect <strong>default mod configurations</strong>. Server administrators and solo vikings can fully customize ingredients, amounts, and crafting benches via <code>com.vapok.adventurebackpacks.cfg</code>.
        </p>
      </div>
    </div>
  </div>

  <!-- =========================================================================
       CODEX CHAPTER INDEX & VISUAL BAG SELECTOR (RESPONSIVE GRID)
       ========================================================================= -->
  <div class="codex-index-box">
    <div class="codex-index-toolbar">
      <div class="codex-index-title">
        <span>📜</span>
        <span>Table of Contents // Select an Expedition Chapter</span>
      </div>
      <div class="codex-view-modes">
        <button id="mode-chapter" class="codex-view-btn active" title="View one backpack chapter at a time like a book">
          [ 📖 CHAPTER VIEW ]
        </button>
        <button id="mode-all" class="codex-view-btn" title="View all backpacks expanded on one continuous scroll">
          [ 📜 VIEW ALL ]
        </button>
      </div>
    </div>

    <div class="codex-index-grid" role="tablist" aria-label="Backpack Chapter Selector">
      <!-- 01: Meadows -->
      <button class="codex-index-card active" data-chapter="meadows" role="tab" aria-selected="true">
        <img src="{{ '/assets/images/mods/adventurebackpacks/satchel.png' | relative_url }}" alt="Satchel" class="codex-index-sprite">
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: #34d399;"></span> 01 // MEADOWS
          </span>
          <span class="codex-index-name">Satchel</span>
        </div>
      </button>

      <!-- 02: Black Forest -->
      <button class="codex-index-card" data-chapter="black-forest" role="tab" aria-selected="false">
        <img src="{{ '/assets/images/mods/adventurebackpacks/rugged.png' | relative_url }}" alt="Rugged Backpack" class="codex-index-sprite">
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: #38bdf8;"></span> 02 // BLACK FOREST
          </span>
          <span class="codex-index-name">Rugged Backpack</span>
        </div>
      </button>

      <!-- 03: Swamp -->
      <button class="codex-index-card" data-chapter="swamp" role="tab" aria-selected="false">
        <img src="{{ '/assets/images/mods/adventurebackpacks/wetpack.png' | relative_url }}" alt="Bloodbag Wetpack" class="codex-index-sprite">
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: #a3e635;"></span> 03 // SWAMP
          </span>
          <span class="codex-index-name">Bloodbag Wetpack</span>
        </div>
      </button>

      <!-- 04: Mountains -->
      <button class="codex-index-card" data-chapter="mountains" role="tab" aria-selected="false">
        <img src="{{ '/assets/images/mods/adventurebackpacks/arctic.png' | relative_url }}" alt="Arctic Sherpa Pack" class="codex-index-sprite">
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: #e0f2fe;"></span> 04 // MOUNTAINS
          </span>
          <span class="codex-index-name">Arctic Sherpa</span>
        </div>
      </button>

      <!-- 05: Plains -->
      <button class="codex-index-card" data-chapter="plains" role="tab" aria-selected="false">
        <img src="{{ '/assets/images/mods/adventurebackpacks/lox.png' | relative_url }}" alt="Lox Hide Knappsack" class="codex-index-sprite">
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: #fbbf24;"></span> 05 // PLAINS
          </span>
          <span class="codex-index-name">Lox Knappsack</span>
        </div>
      </button>

      <!-- 06: Mistlands -->
      <button class="codex-index-card" data-chapter="mistlands" role="tab" aria-selected="false">
        <img src="{{ '/assets/images/mods/adventurebackpacks/wisppack.png' | relative_url }}" alt="Explorers Wisppack" class="codex-index-sprite">
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: #c084fc;"></span> 06 // MISTLANDS
          </span>
          <span class="codex-index-name">Explorers Wisppack</span>
        </div>
      </button>

      <!-- 07: Apocrypha -->
      <button class="codex-index-card" data-chapter="apocrypha" role="tab" aria-selected="false">
        <img src="{{ '/assets/images/mods/adventurebackpacks/spectral.png' | relative_url }}" alt="Spectral Shroud" class="codex-index-sprite">
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: #f43f5e;"></span> 07 // APOCRYPHA
          </span>
          <span class="codex-index-name">Spectral Shroud</span>
        </div>
      </button>

      <!-- 08: Scribe's Anvil -->
      <button class="codex-index-card" data-chapter="configuration" role="tab" aria-selected="false">
        <span style="font-size: 1.5rem; line-height: 1; flex-shrink: 0;">⚙️</span>
        <div class="codex-index-info">
          <span class="codex-index-tier">
            <span class="codex-index-dot" style="background: var(--ice-blue);"></span> SYSTEM // CFG
          </span>
          <span class="codex-index-name">Scribe's Anvil</span>
        </div>
      </button>
    </div>
  </div>

  <!-- Chapters Container -->
  <div id="codex-chapters-container">

    <!-- =========================================================================
         CHAPTER 01: MEADOWS
         ========================================================================= -->
    <section id="meadows" class="codex-entry" data-chapter-id="meadows">
      <div class="codex-entry-header">
        <div class="codex-title-group">
          <div class="codex-icon-frame">
            <img src="{{ '/assets/images/mods/adventurebackpacks/satchel.png' | relative_url }}" alt="Satchel Backpack Icon" class="codex-sprite">
          </div>
          <div>
            <h2 class="codex-name">Satchel</h2>
            <div class="codex-subtitle">
              <span class="status-badge mint">TIER 1 // MEADOWS</span>
              <span>PREFAB: <code>BackpackMeadows</code></span>
            </div>
          </div>
        </div>
        <div>
          <div class="codex-station-badge" style="border-color: var(--glacial-mint);">
            <span class="codex-station-icon">🔨</span>
            <div class="codex-station-info">
              <span class="codex-station-label">REQUIRED STATION</span>
              <span class="codex-station-value" style="color: var(--glacial-mint);">WORKBENCH // LEVEL 2</span>
            </div>
          </div>
        </div>
      </div>

      <div class="codex-body">
        <div class="codex-lore-quote">
          "A modest satchel stitched from fresh deer pelts and bound with sinew. While it holds only small provisions, it keeps your hands unencumbered as you take your first steps into the wilderness."
        </div>

        <!-- Recipes Breakdown with Actual Pictures -->
        <div class="codex-recipe-grid">
          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">🔨 Initial Forge Recipe</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--glacial-mint);">Workbench Lvl 2</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/capedeerhide.png' | relative_url }}" alt="Deer Hide Cape" class="ingredient-thumb">
                  <span class="ingredient-name">Deer Hide Cape</span>
                </div>
                <span class="ingredient-count">1x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/deerhide.png' | relative_url }}" alt="Deer Hide" class="ingredient-thumb">
                  <span class="ingredient-name">Deer Hide</span>
                </div>
                <span class="ingredient-count">8x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/bonefragments.png' | relative_url }}" alt="Bone Fragments" class="ingredient-thumb">
                  <span class="ingredient-name">Bone Fragments</span>
                </div>
                <span class="ingredient-count">2x</span>
              </div>
            </div>
          </div>

          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">⭐ Upgrade Materials</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--ice-blue-bright);">Per Tier (Max Station: 3)</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/leatherscraps.png' | relative_url }}" alt="Leather Scraps" class="ingredient-thumb">
                  <span class="ingredient-name">Leather Scraps</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/deerhide.png' | relative_url }}" alt="Deer Hide" class="ingredient-thumb">
                  <span class="ingredient-name">Deer Hide</span>
                </div>
                <span class="ingredient-count">3x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capacity & Stat Curve -->
        <div class="codex-table-wrap">
          <table class="codex-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Inventory Grid</th>
                <th>Capacity</th>
                <th>Carry Weight Bonus</th>
                <th>Movement Speed Penalty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 1</strong> (Base)</td>
                <td>3 columns × 1 row</td>
                <td>3 Slots</td>
                <td>+5 Carry Weight</td>
                <td>-15% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 2</strong></td>
                <td>4 columns × 1 row</td>
                <td>4 Slots</td>
                <td>+10 Carry Weight</td>
                <td>-7.5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 3</strong></td>
                <td>5 columns × 1 row</td>
                <td>5 Slots</td>
                <td>+15 Carry Weight</td>
                <td>-5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 4</strong> (Max)</td>
                <td>6 columns × 1 row</td>
                <td>6 Slots</td>
                <td>+20 Carry Weight</td>
                <td>-3.75% Speed Mod</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Perks & Drops with Actual Pictures -->
        <div class="codex-footer-info">
          <div class="codex-perks-row">
            <span class="codex-footer-label">Biome Perks:</span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/cold.png' | relative_url }}" alt="Cold Resistance" class="perk-chip-icon">
              <span>Cold Resistance (Unlocked at Quality 3)</span>
            </span>
          </div>
          <div class="codex-drops-row">
            <span class="codex-footer-label">Creature Drops:</span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/greydwarf.png' | relative_url }}" alt="Greyling" class="drop-chip-icon">
              <span>Greyling (0.2% Chance)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/eikthyr.png' | relative_url }}" alt="Eikthyr" class="drop-chip-icon">
              <span>Eikthyr (4.0% Chance)</span>
            </span>
          </div>
        </div>

        <!-- Page Turner Navigation -->
        <div class="codex-page-turner">
          <button class="page-turner-btn disabled" disabled>[ ◀ FIRST CHAPTER ]</button>
          <span class="page-indicator-text">CHAPTER 01 OF 07 // MEADOWS</span>
          <button class="page-turner-btn" data-target-chapter="black-forest">[ NEXT: RUGGED BACKPACK ▶ ]</button>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         CHAPTER 02: BLACK FOREST
         ========================================================================= -->
    <section id="black-forest" class="codex-entry" data-chapter-id="black-forest">
      <div class="codex-entry-header">
        <div class="codex-title-group">
          <div class="codex-icon-frame">
            <img src="{{ '/assets/images/mods/adventurebackpacks/rugged.png' | relative_url }}" alt="Rugged Backpack Icon" class="codex-sprite">
          </div>
          <div>
            <h2 class="codex-name">Rugged Backpack</h2>
            <div class="codex-subtitle">
              <span class="status-badge cyan">TIER 2 // BLACK FOREST</span>
              <span>PREFAB: <code>BackpackBlackForest</code></span>
            </div>
          </div>
        </div>
        <div>
          <div class="codex-station-badge" style="border-color: var(--ice-blue);">
            <span class="codex-station-icon">⚒️</span>
            <div class="codex-station-info">
              <span class="codex-station-label">REQUIRED STATION</span>
              <span class="codex-station-value" style="color: var(--ice-blue-bright);">FORGE // LEVEL 1</span>
            </div>
          </div>
        </div>
      </div>

      <div class="codex-body">
        <div class="codex-lore-quote">
          "Fashioned from tough troll hide and fastened with copper buckles forged in the heart of the dark woods. Its robust strapping bears heavy lumber with ease while blending into the shadows."
        </div>

        <!-- Recipes Breakdown with Actual Pictures -->
        <div class="codex-recipe-grid">
          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">🔨 Initial Forge Recipe</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--ice-blue-bright);">Forge Lvl 1</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/capetrollhide.png' | relative_url }}" alt="Troll Hide Cape" class="ingredient-thumb">
                  <span class="ingredient-name">Troll Hide Cape</span>
                </div>
                <span class="ingredient-count">1x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/copper.png' | relative_url }}" alt="Copper" class="ingredient-thumb">
                  <span class="ingredient-name">Copper</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>

          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">⭐ Upgrade Materials</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--ice-blue-bright);">Per Tier (Max Station: 3)</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/trollhide.png' | relative_url }}" alt="Troll Hide" class="ingredient-thumb">
                  <span class="ingredient-name">Troll Hide</span>
                </div>
                <span class="ingredient-count">3x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/bronze.png' | relative_url }}" alt="Bronze" class="ingredient-thumb">
                  <span class="ingredient-name">Bronze</span>
                </div>
                <span class="ingredient-count">3x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capacity & Stat Curve -->
        <div class="codex-table-wrap">
          <table class="codex-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Inventory Grid</th>
                <th>Capacity</th>
                <th>Carry Weight Bonus</th>
                <th>Movement Speed Penalty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 1</strong> (Base)</td>
                <td>3 columns × 2 rows</td>
                <td>6 Slots</td>
                <td>+10 Carry Weight</td>
                <td>-15% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 2</strong></td>
                <td>4 columns × 2 rows</td>
                <td>8 Slots</td>
                <td>+20 Carry Weight</td>
                <td>-7.5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 3</strong></td>
                <td>5 columns × 2 rows</td>
                <td>10 Slots</td>
                <td>+30 Carry Weight</td>
                <td>-5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 4</strong> (Max)</td>
                <td>6 columns × 2 rows</td>
                <td>12 Slots</td>
                <td>+40 Carry Weight</td>
                <td>-3.75% Speed Mod</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Perks & Drops with Actual Pictures -->
        <div class="codex-footer-info">
          <div class="codex-perks-row">
            <span class="codex-footer-label">Biome Perks:</span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/cold.png' | relative_url }}" alt="Cold Resistance" class="perk-chip-icon">
              <span>Cold Resistance (Quality 1+)</span>
            </span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/sneak.png' | relative_url }}" alt="Sneak Synergy" class="perk-chip-icon">
              <span>Troll Armor Set Synergy (+Sneak, Quality 2+)</span>
            </span>
          </div>
          <div class="codex-drops-row">
            <span class="codex-footer-label">Creature Drops:</span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/greydwarf.png' | relative_url }}" alt="Greydwarf" class="drop-chip-icon">
              <span>Greydwarf (0.2%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/greydwarf_shaman.png' | relative_url }}" alt="Greydwarf Shaman" class="drop-chip-icon">
              <span>Shaman (0.4%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/greydwarf_brute.png' | relative_url }}" alt="Greydwarf Brute" class="drop-chip-icon">
              <span>Elite / Brute (0.4%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/troll.png' | relative_url }}" alt="Troll" class="drop-chip-icon">
              <span>Troll (1.0%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/bjorn.png' | relative_url }}" alt="Bjorn" class="drop-chip-icon">
              <span>Bjorn (4.0%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/the_elder.png' | relative_url }}" alt="The Elder" class="drop-chip-icon">
              <span>The Elder (8.0%)</span>
            </span>
          </div>
        </div>

        <!-- Page Turner Navigation -->
        <div class="codex-page-turner">
          <button class="page-turner-btn" data-target-chapter="meadows">[ ◀ PREV: SATCHEL ]</button>
          <span class="page-indicator-text">CHAPTER 02 OF 07 // BLACK FOREST</span>
          <button class="page-turner-btn" data-target-chapter="swamp">[ NEXT: BLOODBAG WETPACK ▶ ]</button>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         CHAPTER 03: SWAMP
         ========================================================================= -->
    <section id="swamp" class="codex-entry" data-chapter-id="swamp">
      <div class="codex-entry-header">
        <div class="codex-title-group">
          <div class="codex-icon-frame">
            <img src="{{ '/assets/images/mods/adventurebackpacks/wetpack.png' | relative_url }}" alt="Bloodbag Wetpack Icon" class="codex-sprite">
          </div>
          <div>
            <h2 class="codex-name">Bloodbag Wetpack</h2>
            <div class="codex-subtitle">
              <span class="status-badge" style="background: rgba(163, 230, 53, 0.15); border-color: #a3e635; color: #a3e635;">TIER 3 // SWAMP</span>
              <span>PREFAB: <code>BackpackSwamp</code></span>
            </div>
          </div>
        </div>
        <div>
          <div class="codex-station-badge" style="border-color: #a3e635;">
            <span class="codex-station-icon">🔨</span>
            <div class="codex-station-info">
              <span class="codex-station-label">REQUIRED STATION</span>
              <span class="codex-station-value" style="color: #a3e635;">WORKBENCH // LEVEL 2</span>
            </div>
          </div>
        </div>
      </div>

      <div class="codex-body">
        <div class="codex-lore-quote">
          "Treated with coagulated leeches' blood and sealed with incandescent swamp guck. The wetpack withstands the torrential rains of the sunken lands, sealing away moisture completely."
        </div>

        <!-- Recipes Breakdown with Actual Pictures -->
        <div class="codex-recipe-grid">
          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">🔨 Initial Forge Recipe</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #a3e635;">Workbench Lvl 2</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/bloodbag.png' | relative_url }}" alt="Bloodbag" class="ingredient-thumb">
                  <span class="ingredient-name">Bloodbag</span>
                </div>
                <span class="ingredient-count">10x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/root.png' | relative_url }}" alt="Root" class="ingredient-thumb">
                  <span class="ingredient-name">Root</span>
                </div>
                <span class="ingredient-count">4x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/guck.png' | relative_url }}" alt="Guck" class="ingredient-thumb">
                  <span class="ingredient-name">Guck</span>
                </div>
                <span class="ingredient-count">4x</span>
              </div>
            </div>
          </div>

          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">⭐ Upgrade Materials</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #a3e635;">Per Tier (Max Station: 5)</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/bloodbag.png' | relative_url }}" alt="Bloodbag" class="ingredient-thumb">
                  <span class="ingredient-name">Bloodbag</span>
                </div>
                <span class="ingredient-count">2x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/iron.png' | relative_url }}" alt="Iron" class="ingredient-thumb">
                  <span class="ingredient-name">Iron</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capacity & Stat Curve -->
        <div class="codex-table-wrap">
          <table class="codex-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Inventory Grid</th>
                <th>Capacity</th>
                <th>Carry Weight Bonus</th>
                <th>Movement Speed Penalty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 1</strong> (Base)</td>
                <td>2 columns × 3 rows</td>
                <td>6 Slots</td>
                <td>+15 Carry Weight</td>
                <td>-15% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 2</strong></td>
                <td>3 columns × 3 rows</td>
                <td>9 Slots</td>
                <td>+30 Carry Weight</td>
                <td>-7.5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 3</strong></td>
                <td>4 columns × 3 rows</td>
                <td>12 Slots</td>
                <td>+45 Carry Weight</td>
                <td>-5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 4</strong> (Max)</td>
                <td>5 columns × 3 rows</td>
                <td>15 Slots</td>
                <td>+60 Carry Weight</td>
                <td>-3.75% Speed Mod</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Perks & Drops with Actual Pictures -->
        <div class="codex-footer-info">
          <div class="codex-perks-row">
            <span class="codex-footer-label">Biome Perks:</span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/cold.png' | relative_url }}" alt="Cold Resistance" class="perk-chip-icon">
              <span>Cold Resistance (Quality 1+)</span>
            </span>
            <span class="perk-chip" style="border-color: #a3e635; color: #a3e635;">
              <img src="{{ '/assets/images/perks/wet.png' | relative_url }}" alt="Waterproof" class="perk-chip-icon">
              <span>Waterproof / Water Resistance (Quality 2+)</span>
            </span>
          </div>
          <div class="codex-drops-row">
            <span class="codex-footer-label">Creature Drops:</span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/draugr.png' | relative_url }}" alt="Draugr" class="drop-chip-icon">
              <span>Draugr (0.2%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/draugr_elite.png' | relative_url }}" alt="Draugr Elite" class="drop-chip-icon">
              <span>Elite / Ranged (0.4%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/abomination.png' | relative_url }}" alt="Abomination" class="drop-chip-icon">
              <span>Abomination (0.8%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/bonemass.png' | relative_url }}" alt="Bonemass" class="drop-chip-icon">
              <span>Bonemass (4.0%)</span>
            </span>
          </div>
        </div>

        <!-- Page Turner Navigation -->
        <div class="codex-page-turner">
          <button class="page-turner-btn" data-target-chapter="black-forest">[ ◀ PREV: RUGGED BACKPACK ]</button>
          <span class="page-indicator-text">CHAPTER 03 OF 07 // SWAMP</span>
          <button class="page-turner-btn" data-target-chapter="mountains">[ NEXT: ARCTIC SHERPA ▶ ]</button>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         CHAPTER 04: MOUNTAINS
         ========================================================================= -->
    <section id="mountains" class="codex-entry" data-chapter-id="mountains">
      <div class="codex-entry-header">
        <div class="codex-title-group">
          <div class="codex-icon-frame">
            <img src="{{ '/assets/images/mods/adventurebackpacks/arctic.png' | relative_url }}" alt="Arctic Sherpa Pack Icon" class="codex-sprite">
          </div>
          <div>
            <h2 class="codex-name">Arctic Sherpa Pack</h2>
            <div class="codex-subtitle">
              <span class="status-badge" style="background: rgba(224, 242, 254, 0.15); border-color: #bae6fd; color: #e0f2fe;">TIER 4 // MOUNTAINS</span>
              <span>PREFAB: <code>BackpackMountains</code></span>
            </div>
          </div>
        </div>
        <div>
          <div class="codex-station-badge" style="border-color: #bae6fd;">
            <span class="codex-station-icon">⚒️</span>
            <div class="codex-station-info">
              <span class="codex-station-label">REQUIRED STATION</span>
              <span class="codex-station-value" style="color: #e0f2fe;">FORGE // LEVEL 3</span>
            </div>
          </div>
        </div>
      </div>

      <div class="codex-body">
        <div class="codex-lore-quote">
          "Lined with dense wolf pelts and reinforced with silver riveted seams. Engineered to defy the freezing blizzards of high peaks and equipped with aerodynamic flaps to slow dangerous descents."
        </div>

        <!-- Recipes Breakdown with Actual Pictures -->
        <div class="codex-recipe-grid">
          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">🔨 Initial Forge Recipe</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #e0f2fe;">Forge Lvl 3</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/capewolf.png' | relative_url }}" alt="Wolf Cape" class="ingredient-thumb">
                  <span class="ingredient-name">Wolf Cape</span>
                </div>
                <span class="ingredient-count">1x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/wolfhairbundle.png' | relative_url }}" alt="Wolf Hair Bundle" class="ingredient-thumb">
                  <span class="ingredient-name">Wolf Hair Bundle</span>
                </div>
                <span class="ingredient-count">10x</span>
              </div>
            </div>
          </div>

          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">⭐ Upgrade Materials</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #e0f2fe;">Per Tier (Max Station: 7)</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/wolfpelt.png' | relative_url }}" alt="Wolf Pelt" class="ingredient-thumb">
                  <span class="ingredient-name">Wolf Pelt</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/silver.png' | relative_url }}" alt="Silver" class="ingredient-thumb">
                  <span class="ingredient-name">Silver</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capacity & Stat Curve -->
        <div class="codex-table-wrap">
          <table class="codex-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Inventory Grid</th>
                <th>Capacity</th>
                <th>Carry Weight Bonus</th>
                <th>Movement Speed Penalty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 1</strong> (Base)</td>
                <td>3 columns × 3 rows</td>
                <td>9 Slots</td>
                <td>+20 Carry Weight</td>
                <td>-15% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 2</strong></td>
                <td>4 columns × 3 rows</td>
                <td>12 Slots</td>
                <td>+40 Carry Weight</td>
                <td>-7.5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 3</strong></td>
                <td>5 columns × 3 rows</td>
                <td>15 Slots</td>
                <td>+60 Carry Weight</td>
                <td>-5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 4</strong> (Max)</td>
                <td>6 columns × 3 rows</td>
                <td>18 Slots</td>
                <td>+80 Carry Weight</td>
                <td>-3.75% Speed Mod</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Perks & Drops with Actual Pictures -->
        <div class="codex-footer-info">
          <div class="codex-perks-row">
            <span class="codex-footer-label">Biome Perks:</span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/frost.png' | relative_url }}" alt="Frost Resistance" class="perk-chip-icon">
              <span>Frost Resistance &amp; Cold Immunity (Quality 1+)</span>
            </span>
            <span class="perk-chip" style="border-color: #38bdf8; color: #a5f3fc;">
              <img src="{{ '/assets/images/perks/slowfall.png' | relative_url }}" alt="Slow Fall" class="perk-chip-icon">
              <span>Feather Fall / Slow Fall (Quality 4)</span>
            </span>
          </div>
          <div class="codex-drops-row">
            <span class="codex-footer-label">Creature Drops:</span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/ulv.png' | relative_url }}" alt="Ulv" class="drop-chip-icon">
              <span>Ulv (0.1%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/fenring.png' | relative_url }}" alt="Fenring" class="drop-chip-icon">
              <span>Fenring (0.8%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/cultist.png' | relative_url }}" alt="Fenring Cultist" class="drop-chip-icon">
              <span>Cultist (0.2%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/moder.png' | relative_url }}" alt="Moder" class="drop-chip-icon">
              <span>Moder (Dragon, 4.0%)</span>
            </span>
          </div>
        </div>

        <!-- Page Turner Navigation -->
        <div class="codex-page-turner">
          <button class="page-turner-btn" data-target-chapter="swamp">[ ◀ PREV: BLOODBAG WETPACK ]</button>
          <span class="page-indicator-text">CHAPTER 04 OF 07 // MOUNTAINS</span>
          <button class="page-turner-btn" data-target-chapter="plains">[ NEXT: LOX KNAPPSACK ▶ ]</button>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         CHAPTER 05: PLAINS
         ========================================================================= -->
    <section id="plains" class="codex-entry" data-chapter-id="plains">
      <div class="codex-entry-header">
        <div class="codex-title-group">
          <div class="codex-icon-frame">
            <img src="{{ '/assets/images/mods/adventurebackpacks/lox.png' | relative_url }}" alt="Lox Hide Knappsack Icon" class="codex-sprite">
          </div>
          <div>
            <h2 class="codex-name">Lox Hide Knappsack</h2>
            <div class="codex-subtitle">
              <span class="status-badge" style="background: rgba(251, 191, 36, 0.15); border-color: #fbbf24; color: #fbbf24;">TIER 5 // PLAINS</span>
              <span>PREFAB: <code>BackpackPlains</code></span>
            </div>
          </div>
        </div>
        <div>
          <div class="codex-station-badge" style="border-color: #fbbf24;">
            <span class="codex-station-icon">⚒️</span>
            <div class="codex-station-info">
              <span class="codex-station-label">REQUIRED STATION</span>
              <span class="codex-station-value" style="color: #fbbf24;">FORGE // LEVEL 3</span>
            </div>
          </div>
        </div>
      </div>

      <div class="codex-body">
        <div class="codex-lore-quote">
          "Sewn from the thickest lox hide, lacquered in boiling pit tar, and framed in refined black metal. Its massive interior allows expansive transport of harvested crops, ores, and conquest spoils."
        </div>

        <!-- Recipes Breakdown with Actual Pictures -->
        <div class="codex-recipe-grid">
          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">🔨 Initial Forge Recipe</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #fbbf24;">Forge Lvl 3</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/capelox.png' | relative_url }}" alt="Lox Cape" class="ingredient-thumb">
                  <span class="ingredient-name">Lox Cape</span>
                </div>
                <span class="ingredient-count">1x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/tar.png' | relative_url }}" alt="Tar" class="ingredient-thumb">
                  <span class="ingredient-name">Tar</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/blackmetal.png' | relative_url }}" alt="Black Metal" class="ingredient-thumb">
                  <span class="ingredient-name">Black Metal</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>

          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">⭐ Upgrade Materials</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #fbbf24;">Per Tier (Max Station: 7)</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/loxpelt.png' | relative_url }}" alt="Lox Pelt" class="ingredient-thumb">
                  <span class="ingredient-name">Lox Pelt</span>
                </div>
                <span class="ingredient-count">2x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/blackmetal.png' | relative_url }}" alt="Black Metal" class="ingredient-thumb">
                  <span class="ingredient-name">Black Metal</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capacity & Stat Curve -->
        <div class="codex-table-wrap">
          <table class="codex-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Inventory Grid</th>
                <th>Capacity</th>
                <th>Carry Weight Bonus</th>
                <th>Movement Speed Penalty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 1</strong> (Base)</td>
                <td>3 columns × 4 rows</td>
                <td>12 Slots</td>
                <td>+25 Carry Weight</td>
                <td>-15% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 2</strong></td>
                <td>4 columns × 4 rows</td>
                <td>16 Slots</td>
                <td>+50 Carry Weight</td>
                <td>-7.5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 3</strong></td>
                <td>5 columns × 4 rows</td>
                <td>20 Slots</td>
                <td>+75 Carry Weight</td>
                <td>-5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 4</strong> (Max)</td>
                <td>6 columns × 4 rows</td>
                <td>24 Slots</td>
                <td>+100 Carry Weight</td>
                <td>-3.75% Speed Mod</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Perks & Drops with Actual Pictures -->
        <div class="codex-footer-info">
          <div class="codex-perks-row">
            <span class="codex-footer-label">Biome Perks:</span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/cold.png' | relative_url }}" alt="Cold Resistance" class="perk-chip-icon">
              <span>Cold Resistance (Quality 1+)</span>
            </span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/frost.png' | relative_url }}" alt="Frost Resistance" class="perk-chip-icon">
              <span>Frost Resistance (Quality 3+)</span>
            </span>
          </div>
          <div class="codex-drops-row">
            <span class="codex-footer-label">Creature Drops:</span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/fuling.png' | relative_url }}" alt="Fuling" class="drop-chip-icon">
              <span>Fuling (0.2%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/fuling_shaman.png' | relative_url }}" alt="Fuling Shaman" class="drop-chip-icon">
              <span>Shaman (0.2%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/fuling_brute.png' | relative_url }}" alt="Fuling Brute" class="drop-chip-icon">
              <span>Brute (0.2%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/bjorn.png' | relative_url }}" alt="Unbjorn" class="drop-chip-icon">
              <span>Unbjorn (2.0%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/yagluth.png' | relative_url }}" alt="Yagluth" class="drop-chip-icon">
              <span>Yagluth (4.0%)</span>
            </span>
          </div>
        </div>

        <!-- Page Turner Navigation -->
        <div class="codex-page-turner">
          <button class="page-turner-btn" data-target-chapter="mountains">[ ◀ PREV: ARCTIC SHERPA ]</button>
          <span class="page-indicator-text">CHAPTER 05 OF 07 // PLAINS</span>
          <button class="page-turner-btn" data-target-chapter="mistlands">[ NEXT: EXPLORERS WISPPACK ▶ ]</button>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         CHAPTER 06: MISTLANDS
         ========================================================================= -->
    <section id="mistlands" class="codex-entry" data-chapter-id="mistlands">
      <div class="codex-entry-header">
        <div class="codex-title-group">
          <div class="codex-icon-frame">
            <img src="{{ '/assets/images/mods/adventurebackpacks/wisppack.png' | relative_url }}" alt="Explorers Wisppack Icon" class="codex-sprite">
          </div>
          <div>
            <h2 class="codex-name">Explorers Wisppack</h2>
            <div class="codex-subtitle">
              <span class="status-badge" style="background: rgba(192, 132, 252, 0.15); border-color: #c084fc; color: #d8b4fe;">TIER 6 // MISTLANDS</span>
              <span>PREFAB: <code>BackpackMistlands</code></span>
            </div>
          </div>
        </div>
        <div>
          <div class="codex-station-badge" style="border-color: #c084fc;">
            <span class="codex-station-icon">🔮</span>
            <div class="codex-station-info">
              <span class="codex-station-label">REQUIRED STATION</span>
              <span class="codex-station-value" style="color: #d8b4fe;">BLACK FORGE // LEVEL 1</span>
            </div>
          </div>
        </div>
      </div>

      <div class="codex-body">
        <div class="codex-lore-quote">
          "A pinnacle of arcane dvergr craft. Intertwining scale hide with refined eitr and feather-light fabrics, this pack houses its own localized Box of Holding, repels thick mist, and allows ethereal glide."
        </div>

        <!-- Recipes Breakdown with Actual Pictures -->
        <div class="codex-recipe-grid">
          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">🔨 Initial Forge Recipe</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #d8b4fe;">Black Forge Lvl 1</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/capefeather.png' | relative_url }}" alt="Feather Cape" class="ingredient-thumb">
                  <span class="ingredient-name">Feather Cape</span>
                </div>
                <span class="ingredient-count">1x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/scalehide.png' | relative_url }}" alt="Scale Hide" class="ingredient-thumb">
                  <span class="ingredient-name">Scale Hide</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/eitr.png' | relative_url }}" alt="Refined Eitr" class="ingredient-thumb">
                  <span class="ingredient-name">Refined Eitr</span>
                </div>
                <span class="ingredient-count">10x</span>
              </div>
            </div>
          </div>

          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">⭐ Upgrade Materials</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #d8b4fe;">Per Tier (Max Station: 2)</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/scalehide.png' | relative_url }}" alt="Scale Hide" class="ingredient-thumb">
                  <span class="ingredient-name">Scale Hide</span>
                </div>
                <span class="ingredient-count">4x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/eitr.png' | relative_url }}" alt="Refined Eitr" class="ingredient-thumb">
                  <span class="ingredient-name">Refined Eitr</span>
                </div>
                <span class="ingredient-count">2x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/softtissue.png' | relative_url }}" alt="Soft Tissue" class="ingredient-thumb">
                  <span class="ingredient-name">Soft Tissue</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capacity & Stat Curve -->
        <div class="codex-table-wrap">
          <table class="codex-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Inventory Grid</th>
                <th>Capacity</th>
                <th>Carry Weight Bonus</th>
                <th>Movement Speed Penalty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 1</strong> (Base)</td>
                <td>8 columns × 2 rows</td>
                <td>16 Slots</td>
                <td>+30 Carry Weight</td>
                <td>-15% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 2</strong></td>
                <td>5 columns × 4 rows</td>
                <td>20 Slots</td>
                <td>+60 Carry Weight</td>
                <td>-7.5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 3</strong></td>
                <td>6 columns × 4 rows</td>
                <td>24 Slots</td>
                <td>+90 Carry Weight</td>
                <td>-5% Speed Mod</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 4</strong> (Max)</td>
                <td>7 columns × 4 rows</td>
                <td>28 Slots</td>
                <td>+120 Carry Weight</td>
                <td>-3.75% Speed Mod</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Perks & Drops with Actual Pictures -->
        <div class="codex-footer-info">
          <div class="codex-perks-row">
            <span class="codex-footer-label">Arcane Perks:</span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/cold.png' | relative_url }}" alt="Cold Resistance" class="perk-chip-icon">
              <span>Cold Resistance (Quality 1+)</span>
            </span>
            <span class="perk-chip">
              <img src="{{ '/assets/images/perks/frost.png' | relative_url }}" alt="Frost Resistance" class="perk-chip-icon">
              <span>Frost Resistance (Quality 2+)</span>
            </span>
            <span class="perk-chip" style="border-color: #38bdf8; color: #a5f3fc;">
              <img src="{{ '/assets/images/perks/slowfall.png' | relative_url }}" alt="Slow Fall" class="perk-chip-icon">
              <span>Feather Fall / Slow Fall (Quality 3+)</span>
            </span>
            <span class="perk-chip" style="border-color: #c084fc; color: #f0abfc;">
              <img src="{{ '/assets/images/perks/wisp.png' | relative_url }}" alt="Wisplight" class="perk-chip-icon">
              <span>Built-in Demister / Wisplight (Quality 4)</span>
            </span>
          </div>
          <div class="codex-drops-row">
            <span class="codex-footer-label">Creature Drops:</span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/dvergr.png' | relative_url }}" alt="Dvergr" class="drop-chip-icon">
              <span>Dvergr / Mages (0.2%)</span>
            </span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/seeker_queen.png' | relative_url }}" alt="The Queen" class="drop-chip-icon">
              <span>The Queen (SeekerQueen, 8.0%)</span>
            </span>
          </div>
        </div>

        <!-- Page Turner Navigation -->
        <div class="codex-page-turner">
          <button class="page-turner-btn" data-target-chapter="plains">[ ◀ PREV: LOX KNAPPSACK ]</button>
          <span class="page-indicator-text">CHAPTER 06 OF 07 // MISTLANDS</span>
          <button class="page-turner-btn" data-target-chapter="apocrypha">[ NEXT: SPECTRAL SHROUD ▶ ]</button>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         CHAPTER 07: APOCRYPHA & EXTENSIONS
         ========================================================================= -->
    <section id="apocrypha" class="codex-entry" data-chapter-id="apocrypha">
      <div class="codex-entry-header">
        <div class="codex-title-group">
          <div class="codex-icon-frame">
            <img src="{{ '/assets/images/mods/adventurebackpacks/spectral.png' | relative_url }}" alt="Spectral Shroud of Holding Icon" class="codex-sprite">
          </div>
          <div>
            <h2 class="codex-name">Spectral Shroud of Holding</h2>
            <div class="codex-subtitle">
              <span class="status-badge" style="background: rgba(244, 63, 94, 0.15); border-color: #f43f5e; color: #f43f5e;">APOCRYPHA // CHEB'S NECROMANCY API</span>
              <span>PREFAB: <code>BackpackNecromancy</code></span>
            </div>
          </div>
        </div>
        <div>
          <div class="codex-station-badge" style="border-color: #f43f5e;">
            <span class="codex-station-icon">💀</span>
            <div class="codex-station-info">
              <span class="codex-station-label">REQUIRED STATION</span>
              <span class="codex-station-value" style="color: #f43f5e;">WORKBENCH // LEVEL 1</span>
            </div>
          </div>
        </div>
      </div>

      <div class="codex-body">
        <div class="codex-lore-quote">
          "Registered dynamically via the AdventureBackpacks API when Cheb's Necromancy mod is present. Infused with ethereal ectoplasm, this macabre shroud augments dark sorcery while providing phantom storage."
        </div>

        <!-- Recipes Breakdown with Actual Pictures -->
        <div class="codex-recipe-grid">
          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">🔨 Initial Forge Recipe</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #f43f5e;">Workbench Lvl 1</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/spectralshroud.png' | relative_url }}" alt="Spectral Shroud" class="ingredient-thumb">
                  <span class="ingredient-name">Spectral Shroud (Cheb's)</span>
                </div>
                <span class="ingredient-count">1x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/trollhide.png' | relative_url }}" alt="Troll Hide" class="ingredient-thumb">
                  <span class="ingredient-name">Troll Hide</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>

          <div class="recipe-section-box">
            <div class="recipe-section-header">
              <span class="recipe-section-title">⭐ Upgrade Materials</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #f43f5e;">Per Tier (Max Station: 4)</span>
            </div>
            <div class="ingredient-list">
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/chain.png' | relative_url }}" alt="Chain" class="ingredient-thumb">
                  <span class="ingredient-name">Chain</span>
                </div>
                <span class="ingredient-count">1x</span>
              </div>
              <div class="ingredient-chip">
                <div class="ingredient-item-group">
                  <img src="{{ '/assets/images/items/trollhide.png' | relative_url }}" alt="Troll Hide" class="ingredient-thumb">
                  <span class="ingredient-name">Troll Hide</span>
                </div>
                <span class="ingredient-count">5x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capacity & Stat Curve -->
        <div class="codex-table-wrap">
          <table class="codex-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Inventory Grid</th>
                <th>Capacity</th>
                <th>Carry Weight Bonus</th>
                <th>Special Perk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 1</strong></td>
                <td>3 columns × 3 rows</td>
                <td>9 Slots</td>
                <td>+20% Weight Reduction</td>
                <td>+10 Necromancy Skill (Set Effect)</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 2</strong></td>
                <td>4 columns × 3 rows</td>
                <td>12 Slots</td>
                <td>+20% Weight Reduction</td>
                <td>+10 Necromancy Skill (Set Effect)</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 3</strong></td>
                <td>5 columns × 3 rows</td>
                <td>15 Slots</td>
                <td>+20% Weight Reduction</td>
                <td>+10 Necromancy Skill (Set Effect)</td>
              </tr>
              <tr>
                <td><strong style="color: var(--ice-blue-bright);">Quality 4</strong></td>
                <td>6 columns × 3 rows</td>
                <td>18 Slots</td>
                <td>+20% Weight Reduction</td>
                <td>+10 Necromancy Skill (Set Effect)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Perks & Drops with Actual Pictures -->
        <div class="codex-footer-info">
          <div class="codex-perks-row">
            <span class="codex-footer-label">Arcane Perks:</span>
            <span class="perk-chip" style="border-color: #f43f5e; color: #fda4af;">
              <img src="{{ '/assets/images/perks/shield.png' | relative_url }}" alt="Necromancy Armor" class="perk-chip-icon">
              <span>Necromancy Armor Set Effect</span>
            </span>
            <span class="perk-chip" style="border-color: #f43f5e; color: #fda4af;">
              <img src="{{ '/assets/images/creatures/wraith.png' | relative_url }}" alt="Necromancy Skill" class="perk-chip-icon">
              <span>+10 Necromancy Skill Level</span>
            </span>
          </div>
          <div class="codex-drops-row">
            <span class="codex-footer-label">Creature Drops:</span>
            <span class="drop-chip">
              <img src="{{ '/assets/images/creatures/wraith.png' | relative_url }}" alt="Guardian Wraith" class="drop-chip-icon">
              <span>Guardian Wraith (0.2%)</span>
            </span>
          </div>
        </div>

        <!-- Page Turner Navigation -->
        <div class="codex-page-turner">
          <button class="page-turner-btn" data-target-chapter="mistlands">[ ◀ PREV: EXPLORERS WISPPACK ]</button>
          <span class="page-indicator-text">CHAPTER 07 OF 07 // APOCRYPHA</span>
          <button class="page-turner-btn" data-target-chapter="configuration">[ NEXT: SCRIBE'S ANVIL ▶ ]</button>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         LEGACY & HORIZONS CALLOUT
         ========================================================================= -->
    <div id="legacy-callout" class="codex-entry" data-chapter-id="configuration" style="background: rgba(11, 17, 26, 0.7); border: 1px dashed var(--border-subtle); padding: 1.5rem; margin-bottom: 2.5rem;">
      <h3 style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--ice-blue-bright); margin-top: 0;">
        ⏳ Legacy Backpacks &amp; Horizons
      </h3>
      <div style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6;">
        <p style="margin-bottom: 0.75rem;">
          <strong>Old Rugged &amp; Old Arctic Packs:</strong> Longtime adventurers will remember the original Iron and Silver backpacks from Adventure Backpacks v1.x. These legacy items are preserved in the code (<code>CapeIronBackpack</code> &amp; <code>CapeSilverBackpack</code>) so ancient world saves never lose their items, though they have no default recipes in modern biomes.
        </p>
        <p style="margin: 0;">
          🔥 <strong>Ashlands &amp; Deep North Expeditions:</strong> Custom models, volcanic fire status effects, and sub-zero survival gear for the <strong>Ashlands</strong> and <strong>Deep North</strong> are actively in development. As new biomes arrive, their blueprints will be transcribed right here in this Book of Knowledge!
        </p>
      </div>
    </div>

    <!-- =========================================================================
         THE SCRIBE'S ANVIL: CONFIGURATION GUIDE
         ========================================================================= -->
    <section id="configuration" class="codex-entry scribe-anvil-card" data-chapter-id="configuration">
      <div class="scribe-anvil-header">
        <span style="font-size: 1.5rem;">⚙️</span>
        <h2>The Scribe's Anvil: How to Customize Recipes</h2>
      </div>
      
      <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.65; margin-bottom: 1.25rem;">
        In true Valheim modding spirit, you are never locked into default blueprints. Server owners running hardcore modpacks, casual servers, or modded weapon overhauls can redefine every recipe, table tier, and ingredient via configuration.
      </p>

      <div style="background: var(--bg-deep); border: 1px solid var(--border-subtle); padding: 1.25rem; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-bright); overflow-x: auto; margin-bottom: 1.25rem;">
<span style="color: var(--text-muted);"># File: BepInEx/config/com.vapok.adventurebackpacks.cfg</span>
<span style="color: var(--cyber-teal);">[Satchel (Meadows)]</span>
<span style="color: var(--text-muted);">## Crafting station required to craft the backpack.</span>
<span style="color: var(--ice-blue-bright);">Crafting Station</span> = Workbench

<span style="color: var(--text-muted);">## Minimum station level required to craft.</span>
<span style="color: var(--ice-blue-bright);">Crafting Station Level</span> = 2

<span style="color: var(--text-muted);">## Comma-separated list of item:quantity to craft. Supports modded prefabs!</span>
<span style="color: var(--ice-blue-bright);">Crafting Costs</span> = CapeDeerHide:1, DeerHide:8, BoneFragments:2

<span style="color: var(--text-muted);">## Comma-separated list of item:quantity required per upgrade level.</span>
<span style="color: var(--ice-blue-bright);">Upgrading Costs</span> = LeatherScraps:5, DeerHide:3
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
        <a href="{{ '/mods/adventurebackpacks/' | relative_url }}" class="cyber-btn">
          [ &lt; RETURN TO ADVENTURE BACKPACKS ]
        </a>
        <a href="https://discord.gg/5YAJkRFBXt" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-secondary">
          [ 💬 DISCORD COMMUNITY &amp; SUPPORT ]
        </a>
      </div>
    </section>
  </div>
</div>

<!-- Interactive Codex Engine -->
<script>
  (function() {
    var cards = document.querySelectorAll('.codex-index-card');
    var entries = document.querySelectorAll('.codex-entry');
    var modeChapterBtn = document.getElementById('mode-chapter');
    var modeAllBtn = document.getElementById('mode-all');
    var pageTurnerBtns = document.querySelectorAll('[data-target-chapter]');
    var currentMode = 'chapter'; // 'chapter' or 'all'
    var activeChapterId = 'meadows';

    function setChapter(chapterId, shouldScroll) {
      activeChapterId = chapterId;

      // Update Index Card states
      cards.forEach(function(card) {
        if (card.getAttribute('data-chapter') === chapterId) {
          card.classList.add('active');
          card.setAttribute('aria-selected', 'true');
        } else {
          card.classList.remove('active');
          card.setAttribute('aria-selected', 'false');
        }
      });

      if (currentMode === 'chapter') {
        // Hide all entries except the active one
        entries.forEach(function(entry) {
          var entryId = entry.getAttribute('data-chapter-id') || entry.id;
          if (entryId === chapterId) {
            entry.style.display = 'block';
          } else {
            entry.style.display = 'none';
          }
        });
      } else {
        // All mode: show all
        entries.forEach(function(entry) {
          entry.style.display = 'block';
        });
      }

      if (shouldScroll) {
        var targetElem = document.getElementById(chapterId);
        if (targetElem) {
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      // Update URL hash without breaking history
      if (history.replaceState) {
        history.replaceState(null, null, '#' + chapterId);
      }
    }

    function setViewMode(mode) {
      currentMode = mode;
      if (mode === 'chapter') {
        modeChapterBtn.classList.add('active');
        modeAllBtn.classList.remove('active');
        document.querySelectorAll('.codex-page-turner').forEach(function(el) {
          el.style.display = 'flex';
        });
        setChapter(activeChapterId, false);
      } else {
        modeAllBtn.classList.add('active');
        modeChapterBtn.classList.remove('active');
        entries.forEach(function(entry) {
          entry.style.display = 'block';
        });
        document.querySelectorAll('.codex-page-turner').forEach(function(el) {
          el.style.display = 'none';
        });
      }
    }

    // Bind card clicks
    cards.forEach(function(card) {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        var chap = this.getAttribute('data-chapter');
        setChapter(chap, true);
      });
    });

    // Bind page turner buttons
    pageTurnerBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var targetChap = this.getAttribute('data-target-chapter');
        if (targetChap) {
          setChapter(targetChap, true);
        }
      });
    });

    // Bind view mode buttons
    modeChapterBtn.addEventListener('click', function() {
      setViewMode('chapter');
    });

    modeAllBtn.addEventListener('click', function() {
      setViewMode('all');
    });

    // Initial check based on location.hash
    var initialHash = (window.location.hash || '').replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
      setChapter(initialHash, false);
    } else {
      setChapter('meadows', false);
    }
  })();
</script>
