# 2.0.1 - Dependency & Compatibility Maintenance
* **Dependency Updates**: Updated Jotunn and BepInEx runtime package bindings.
* **Compatibility Maintenance**: Verified compatibility against the latest Valheim 1.0 release.
* **Documentation Improvements**: Standardized README, user guides, and technical patch documentation.

<details>
<summary><b>2.0 Changelog History (Valheim Release)</b> (<i>click to expand</i>)</summary>

### 2.0.0 - Valheim 1.0 Release & Cross-Mod Compatibility
* **Valheim 1.0 Support**: Fully updated and verified for Valheim 1.0.
* **AdventureBackpacks Dynamic Compatibility**: Automatically detects if AdventureBackpacks is installed and active; defers right-click transfers when AdventureBackpacks has Quick Transfer enabled to prevent duplicate operations or conflicts.
* **Third-Party Inventory Safety**: Added inventory grid validation to safely ignore custom mod inventory panels (e.g. equipment slots, jewelcrafting).
* **Competing Mod Optimization**: Cached detection for competing quick transfer mods to eliminate unnecessary checks and log spam.
* **Audio & Visual Polish**: Transfer effects only trigger when an item or stack is successfully moved.
* **Performance Optimizations**: Streamlined interaction event handling with zero idle CPU overhead.
* **Updated Framework**: Migrated to Jotunn 2.30.0 and Vapok.Valheim.Common 3.2.1012.

</details>

<details>
<summary><b>1.0 Changelog History (Valheim Early Access)</b> (<i>click to expand</i>)</summary>

### 1.0.3 - Valheim Updates
* Updates for Valheim 0.216.9.

### 1.0.2 - Valheim and BepInEx Updates
* Updates for Valheim 0.214.2 and BepInEx 5.4.21.
* General cleanup and maintenance.

### 1.0.1 - Module Compatibility
* Reworked logic to make Fast Item Transfer friendly with other inventory mods (Auto Split Stack, Quick Stack Sort).

### 1.0.0 - Initial Release
* Initial release providing right-click functionality to instantly move items between player inventory and open containers.

</details>
