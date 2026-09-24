---
layout: mod
title: "FastItemTransfer"
slug: "fastitemtransfer"
name: "FastItemTransfer"
game: "Valheim"
category: "valheim"
version: "v2.0.7"
status: "ACTIVE"
badge_color: "mint"
website_url: "https://github.com/Vapok/FastItemTransfer"
thunderstore_url: "https://thunderstore.io/c/valheim/p/Vapok/FastItemTransfer/"
downloads: "24.3K+"
icon: "/assets/images/mods/fastitemtransfer/icon.png"
description: "A Valheim Quality of Life Mod that provides Right Click functionality to move items between Player Inventory and Containers."
dependencies:
  - "denikson-BepInExPack_Valheim-5.4.2350"
  - "ValheimModding-Jotunn-2.30.1"
  - "ValheimModding-YamlDotNet-16.3.1"
has_changelog: true
telemetry: true
---

<div align="center" markdown="1">

# ⚡ Fast Item Transfer

### *Seamless, instant one-click inventory and container item movement for Valheim.*

[![GitHub Release](https://img.shields.io/github/v/release/Vapok/FastItemTransfer?include_prereleases&logo=github&style=for-the-badge)](https://github.com/Vapok/FastItemTransfer/releases)
[![Thunderstore Version](https://img.shields.io/thunderstore/v/Vapok/FastItemTransfer?logo=thunderstore&style=for-the-badge)](https://thunderstore.io/c/valheim/p/Vapok/FastItemTransfer/)
[![Nexus Mods](https://img.shields.io/badge/Nexus_Mods-Available-da8e35?logo=nexusmods&style=for-the-badge)](https://www.nexusmods.com/valheim/mods/2250)
<br>
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/5YAJkRFBXt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

</div>

Say goodbye to tedious drag-and-drop inventory sorting! **Fast Item Transfer** gives you instant, responsive one-click item management. Simply right-click any item in your inventory or open container to swiftly move single items or stacks back and forth with zero friction.

---

<div align="center" markdown="1">

<br>

[![Survival Servers](https://raw.githubusercontent.com/Vapok/FastItemTransfer/main/images/survivalservers_banner.png)](https://www.survivalservers.com/services/game_servers/valheim/?ref=vapok)

</div>

## 🖱️ How It Works

* 📦 **Instant One-Click Transfer**: <kbd>Right-Click</kbd> any unequipped item in your player inventory while a container (chest, cart, ship hold, etc.) is open to instantly send it to the container. <kbd>Right-Click</kbd> an item in a container to instantly send it to your player inventory.
* 🥞 **Smart Stacking**: Items automatically merge into existing matching stacks in the target container or populate the first available slot.
* 🔊 **Audio & Visual Polish**: Plays vanilla item transfer sounds and particle effects upon successful item moves.
* ⚡ **Zero Performance Impact**: Operates strictly on user click interactions without any background update polling or CPU overhead.

---

## 🕹️ Interaction Controls

| Action | Control / Keybind | Description |
| :--- | :--- | :--- |
| **Transfer to Container** | <kbd>Right-Click</kbd> (on item) | Moves clicked item/stack from Player Inventory into open container. |
| **Transfer to Player** | <kbd>Right-Click</kbd> (on item) | Moves clicked item/stack from container into Player Inventory. |
| **Toggle Mod Active** | Configurable via <kbd>F1</kbd> | Enable or disable fast transfer functionality on the fly. |

---

## 🛡️ Advanced Mechanics & Safeguards

* 🎒 **Dynamic AdventureBackpacks Integration**:
  * Automatically detects if [AdventureBackpacks](https://thunderstore.io/c/valheim/p/Vapok/AdventureBackpacks/) is installed. If AdventureBackpacks has its *Quick Transfer* setting enabled, Fast Item Transfer intelligently defers handling to prevent duplicate moves or sound overlap.
* 💎 **Third-Party Grid Protection**:
  * Safely ignores custom modded inventory panels (such as Equipment & Quick Slots, Jewelcrafting sockets, and custom bag panels) to prevent accidental item transfers.
* 🚫 **Competing Mod Optimization**:
  * Cached detection for competing quick transfer mods (`blumaye.quicktransfer`) to eliminate per-click lookups and prevent log flooding.

---

## 🤝 Verified Mod Compatibility

<div align="center" markdown="1">

| Mod | Compatibility Status |
| :--- | :--- |
| **AdventureBackpacks** | 🟢 Fully Supported (Dynamic coexistence & automatic deferral) |
| **Auto Split Stack** | 🟢 Fully Supported |
| **Quick Stack, Store & Sort** | 🟢 Fully Supported |
| **Multi-User-Chests (MUC)** | 🟢 Fully Supported |
| **Equipment & Quick Slots** | 🟢 Fully Supported |
| **Jewelcrafting** | 🟢 Fully Supported |

</div>

---

## 🌐 Available Translations

<div align="center" markdown="1">

🇺🇸 **English** (Default)

</div>

*Want to help translate Fast Item Transfer? Community translations are welcome! Please submit a PR on [GitHub](https://github.com/Vapok/FastItemTransfer) or stop by our [Discord](https://discord.gg/5YAJkRFBXt).*

---

## 📥 Installation

### Mod Manager (Recommended)
1. Install via **R2ModMan** or **Thunderstore Mod Manager**.
2. Dependencies (`BepInExPack`, `Jotunn (JVL)`) are installed automatically.

### Manual Installation
* Copy `FastItemTransfer.dll` to your `Valheim/BepInEx/plugins` directory.

---

## 🔒 Anonymous Telemetry, Error Reporting & Privacy

FastItemTransfer includes lightweight, privacy-first telemetry and error reporting to help monitor mod stability, diagnose unhandled bugs, and track active version adoption across game updates.

* **100% Anonymous**: We never collect personal data, Steam IDs, IP addresses, character/world names, or file system paths. Stack traces from errors are automatically sanitized to strip local user directories.
* **Granular Player Control**:
  * **Anonymous Telemetry (Opt-In)**: Tracks version adoption and session launches. Defaults to **unchecked / disabled** when first loaded (`Enable Anonymous Telemetry = false`).
  * **Error Reporting (Opt-Out)**: Captures sanitized mod crash diagnostics to rapidly identify and fix bugs. Defaults to **enabled** (`Send Error Reports = true`) with one-click opt-out.
  * **Data Disclaimers**: Hover over any toggle in the startup modal for interactive tooltip disclaimers detailing exactly what data is transmitted.
* **In-Game & Online Privacy Policy**: The full privacy policy can be viewed directly in-game by clicking **`[ PRIVACY POLICY ]`** on the startup splash modal, or online at [vapok.io/privacy-policy](https://vapok.io/privacy-policy/).
* **Configuration Files**: Settings can be managed in-game via the startup modal, through the BepInEx Configuration Manager, or under `[Local Config]` in `BepInEx/config/vapok.mods.fastitemtransfer.cfg`.

---

<div align="center" markdown="1">

### 👨‍💻 Created by Vapok Gaming

[![Vapok Gaming](https://avatars.githubusercontent.com/u/1264136?s=120&v=4)](https://github.com/Vapok)

**Author**: [Vapok](https://github.com/Vapok)  
**Source Code**: [GitHub Repository](https://github.com/Vapok/FastItemTransfer)  
**Community & Support**: [Discord Server](https://discord.gg/5YAJkRFBXt)  
**Changelog**: [Release Notes](https://github.com/Vapok/FastItemTransfer/blob/main/CHANGELOG.md)

</div>

