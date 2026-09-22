# 2.0.7 - Headless Dedicated Server Bypass & Valheim 1.0.15 Alignment
* **Headless Dedicated Server Bypass**: Added an early exit check during `Awake()` on headless dedicated servers to prevent client GUI right-click transfer hooks from loading on servers without graphics devices.
* **Valheim 1.0.15 Alignment**: Updated all game assembly references and internalized `Vapok.Valheim.Common` 3.13.1015.

<details>
<summary><b>2.0 Changelog History (Valheim Release)</b> (<i>click to expand</i>)</summary>

### 2.0.6 - Splash Window Updates & Valheim 1.0.14 Alignment
* **Splash Window Updates**:
  * Telemetry is now unchecked when first loaded (Opt-In visibility)
  * Added Send Error Logs (Opt-Out)
  * Privacy Policy is now available directly in-game
  * Added Data Disclaimers on hover over checkboxes for transparency on what data is sent
* **Valheim 1.0.14 Alignment**: Updated game assembly references and internalized  3.12.1014.


### 2.0.5 - Jewelcrafting Font Compatibility
* Fixed: Jewelcrafting packages it's own font which was overriding part of a vanilla font, causing the Splash screen to appear blank.
### 2.0.4 - Updated README with Telemetry Information
* Updated the README.md with Anonymous Telemetry information per request of mod stores.

### 2.0.3 - Unified Splash Screen & Telemetry Controls
* **Unified Startup Splash Screen**: Integrated with a centralized startup splash screen.
  * Added configurable `Show on Game Startup` which can be enabled or disabled in the configuration file.
* **Anonymous Telemetry**: 
  * Added configurable `Enable Anonymous Telemetry` configuration which can be enabled or disabled in the configuration file.
    * Defaults to enabled with auto-opt-in on launch. Uncheck to Opt-Out
    * ANONYMOUS DATA ONLY - I track version number and usage data. No personal data is ever collected. For more information, see the [Privacy Policy](https://vapok.io/privacy-policy/).

### 2.0.1 - Dependency & Compatibility Maintenance
* **Dependency Updates**: Updated Jotunn and BepInEx runtime package bindings.
* **Compatibility Maintenance**: Verified compatibility against the latest Valheim 1.0 release.
* **Documentation Improvements**: Standardized README, user guides, and technical patch documentation.

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
