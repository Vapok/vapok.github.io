---
layout: page
title: Privacy Policy
---

# Privacy Policy

**Last Updated:** September 24, 2026

This Privacy Policy describes how **Vapok Gaming** ("we", "us", or "our") handles information when you visit our website at [vapok.io](https://vapok.io), use game modifications created by Vapok, or interact with our automated community support services (including the **Hugin** Discord Support Bot).

---

## 1. Information Collection & Processing

### Website Visitors
Our website is hosted on **GitHub Pages**. We do not directly collect, store, or sell personal data from visitors to this website. However, GitHub may automatically collect server logs, IP addresses, and basic request details for security and performance purposes in accordance with the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).

### Game Modifications & Anonymous Telemetry
To understand active player counts, monitor mod stability across game updates, and prioritize maintenance for popular features, our modifications may transmit minimal, aggregate **anonymous telemetry data**.

#### What We Collect:
* **Mod Metadata**: Mod name, mod release version, and build numbers.
* **Environment Metadata**: Game version and core framework runtime versions.
* **Anonymous Session Pings**: A temporary, randomly generated session identifier (GUID) and periodic heartbeat pings used strictly to count active concurrent mod users.

#### What We NEVER Collect:
* ❌ **NO Steam Account Data**: We do not collect Steam IDs, account names, friend lists, or gamer tags.
* ❌ **NO Personal Information**: No real names, email addresses, or contact information.
* ❌ **NO System / Hardware Profiling**: No hardware serial numbers, MAC addresses, or file system scanning.
* ❌ **NO Gameplay Content**: No character data, inventory data, world seeds, chat messages, or save game files.
* ❌ **NO Tracking Across Games**: Telemetry is isolated purely to the specific mod session.

#### How to Opt-Out:
You have complete control over telemetry transmission. You can disable telemetry at any time:
1. Open the mod's configuration file (located in `BepInEx/config/` for the respective mod) or open the in-game **Configuration Manager**.
2. Locate the setting **`Enable Anonymous Telemetry`** (or `EnableTelemetry`).
3. Set the value to **`false`** (or uncheck the box).

When disabled, all network communication for telemetry is completely bypassed without affecting any gameplay functionality or mod features. All mod settings, configuration files, and saved states remain stored entirely on your local machine.

### Discord Support Services ("Hugin" Support Bot)
To assist players with troubleshooting technical errors, mod conflicts, configuration issues, and game crashes, we operate an automated support bot (**Hugin**) on our official Discord server.

#### Information Processed During Support Interactions:
* **User Inquiries & Dialogue**: When you invoke the `/support` command, upload a log file, or converse within an active support thread, Hugin processes your problem description and conversation turns to provide targeted troubleshooting steps.
* **Diagnostic Log Files & Screenshots**: If you upload BepInEx log files (`Player.log`, `LogOutput.log`) or error screenshots, Hugin parses them to detect installed mod lists, mod versions, missing dependencies, and exception stack traces.
* **Discord User Identifiers**: Your Discord User ID, display name, and active support thread ID are processed solely to manage active session state, thread permissions, and route responses directly to you.

#### Technical Learnings & Local Knowledge Retention:
* **Private Local Storage Only**: When a technical issue is resolved, Hugin extracts an abstract, anonymized technical insight (e.g., *"Mod A v1.2 conflicts with Mod B due to a Harmony patch hook; resolved by updating Mod A to v1.3"*). This technical knowledge is stored **strictly on our private, dedicated self-hosted server** in an offline SQLite database (`valheim_kb.db`).
* **NO Public Cloud Training & NO Third-Party Sharing**: These technical learnings **NEVER go out to a public cloud, shared vector store, or third-party repository**. They are **never** sold, shared with external parties, or used to train public commercial AI models. They remain exclusively within our private local infrastructure to help players resolve known mod conflicts faster.
* **Inference API Boundary**: Real-time natural language triage queries are processed via secure API with Google Gemini Flash. In accordance with enterprise API policies, prompt data processed via the API is not used to train base foundation models.

#### What We NEVER Store or Collect from Discord:
* ❌ **NO Discord Account Data**: We do not collect passwords, email addresses, billing information, or personal profile data.
* ❌ **NO Server Chat Surveillance**: Hugin does not monitor, read, or store chats from general community channels. It only activates when explicitly invoked via `/support` or within designated support threads.
* ❌ **NO Permanent Raw Logs**: Uploaded log files and crash reports are parsed ephemerally in memory or temporary files for diagnostic triage and are not permanently archived.
* ❌ **NO Personal File Access**: We only analyze game and mod execution logs; we never scan, request, or access personal files on your computer.

#### Session Lifecycle & User Control:
* Active session state exists only while your support thread remains open.
* You can immediately close and cancel a support session at any time by clicking the **`[ Cancel Session ]`** button or typing the **`/cancel`** command. Cancelling instantly discards active session state without saving any technical learnings to the local database.

---

## 2. Third-Party Links & Services

Our website and mod pages may contain links to third-party platforms, including but not limited to:
* **Nexus Mods**
* **GitHub**
* **Discord**

We are not responsible for the privacy practices, content, or policies of third-party platforms. We encourage you to read the privacy statements of any third-party websites you visit.

---

## 3. Cookies & Analytics

We use **Google Analytics** to collect aggregate, anonymous statistics about website traffic and usage patterns (such as popular pages, general referral sources, and visitor counts). Google Analytics uses cookies to gather this standard internet log information.

This data is processed in a way that does not directly identify individual visitors. You can prevent Google Analytics from tracking your visits by using browser ad blockers, privacy extensions, or the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).

---

## 4. Children's Privacy

Our website and modifications are not directed to children under the age of 13, and we do not knowingly collect personal information from children.

---

## 5. Updates to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.

---

## 6. Contact Us

If you have any questions regarding this Privacy Policy or our modifications, you can reach out via our official community channels (e.g., GitHub or Nexus Mods).
