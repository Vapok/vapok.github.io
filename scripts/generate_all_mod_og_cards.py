import os
import yaml
from PIL import Image, ImageDraw, ImageFont

# =========================================================================
# COLOR PALETTE (CYBERPUNK / HIGH-TECH TERMINAL)
# =========================================================================
BG_DARK = (6, 10, 18, 255)
BORDER_DARK = (24, 42, 66, 255)
CYAN_ACCENT = (56, 189, 248, 255)
CYAN_BRIGHT = (100, 240, 252, 255)
MINT_ACCENT = (0, 245, 155, 255)
AMBER_ACCENT = (251, 191, 36, 255)
ORANGE_FLAME = (249, 115, 22, 255)
FROST_ICE = (125, 211, 252, 255)
PURPLE_ARCANE = (192, 132, 252, 255)
ROSE_ACCENT = (244, 63, 94, 255)
TEXT_WHITE = (248, 250, 252, 255)
TEXT_LIGHT = (226, 232, 240, 255)
TEXT_DIM = (148, 163, 184, 255)
TEXT_MUTED = (100, 116, 139, 255)

# =========================================================================
# FONTS
# =========================================================================
FONT_SUBTITLE = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-SemiBold.ttf", 20)
FONT_BODY = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-Regular.ttf", 15)
FONT_BODY_BOLD = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-Bold.ttf", 13)
FONT_MONO_MD = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 13)
FONT_MONO_SM = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 11)
FONT_MONO_XS = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 10)
FONT_MONO_TINY = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 8)
FONT_MONO_MICRO = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 7)

def get_title_font(title_text, max_width=710):
    for size in [48, 44, 40, 36, 32, 28, 24]:
        font = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-Bold.ttf", size)
        bbox = font.getbbox(title_text)
        if (bbox[2] - bbox[0]) <= max_width:
            return font, size
    return font, 24

def draw_cyber_frame(draw, x1, y1, x2, y2, color=BORDER_DARK, corner_color=CYAN_ACCENT, bracket_len=18, width=1):
    draw.rectangle([(x1, y1), (x2, y2)], outline=color, width=width)
    # Top-Left
    draw.line([(x1, y1), (x1 + bracket_len, y1)], fill=corner_color, width=2)
    draw.line([(x1, y1), (x1, y1 + bracket_len)], fill=corner_color, width=2)
    # Top-Right
    draw.line([(x2 - bracket_len, y1), (x2, y1)], fill=corner_color, width=2)
    draw.line([(x2, y1), (x2, y1 + bracket_len)], fill=corner_color, width=2)
    # Bottom-Left
    draw.line([(x1, y2), (x1 + bracket_len, y2)], fill=corner_color, width=2)
    draw.line([(x1, y2), (x1, y2 - bracket_len)], fill=corner_color, width=2)
    # Bottom-Right
    draw.line([(x2 - bracket_len, y2), (x2, y2)], fill=corner_color, width=2)
    draw.line([(x2, y2), (x2, y2 - bracket_len)], fill=corner_color, width=2)

def draw_radial_glow(canvas, cx, cy, radius, color_rgba):
    glow = Image.new("RGBA", (radius * 2, radius * 2), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for r in range(radius, 0, -4):
        alpha = int(color_rgba[3] * (1 - r / radius) ** 2.0)
        c = (color_rgba[0], color_rgba[1], color_rgba[2], alpha)
        gdraw.ellipse([(radius - r, radius - r), (radius + r, radius + r)], fill=c)
    canvas.paste(glow, (cx - radius, cy - radius), glow)

# =========================================================================
# MOD METADATA SPECIFICATIONS FOR ALL 19 OTHER MODS
# =========================================================================
MODS_CATALOGUE = [
    {
        "slug": "autofeedredux",
        "title": "AutoFeedRedux",
        "game": "VALHEIM",
        "version": "v2.0.11",
        "downloads": "39.5K+",
        "subtitle": "Automated Creature Feeding & Container Management",
        "desc": "Tired of forgetting to feed your animals? Automatically detects and feeds surrounding tames using nearby chest resources.",
        "pills": [
            (":: AUTOMATIC PROXIMITY FEEDING", (0, 245, 155)),
            (":: MULTI-CONTAINER RESOLUTION", (56, 189, 248)),
            (":: EXTENSIVE FOOD LIST FILTERS", (251, 191, 36)),
            (":: SERVERSYNC SYNC ENFORCEMENT", (249, 115, 22))
        ],
        "specs": [
            ("CORE MECHANIC  :", "Scans nearby chests within configurable radius to feed tames"),
            ("PERFORMANCE    :", "Lightweight tick caching with zero framerate impact in large farms"),
            ("COMPATIBILITY  :", "Valheim 1.0+, Jotunn, Dedicated Servers, Ward-Aware Security")
        ],
        "prompt": "FARM STANCE: Never let your two-star boars, wolves, or lox starve in active camps.",
        "glow": (0, 245, 155, 30)
    },
    {
        "slug": "baitmebruh",
        "title": "BaitMeBruh",
        "game": "VALHEIM",
        "version": "v1.0.2",
        "downloads": "581",
        "subtitle": "Intelligent Fishing Bait Auto-Equipper & Angler Suite",
        "desc": "Streamlines Viking angling. Automatically detects, pairs, and equips the optimal bait for your fishing rod so you never cast an empty line.",
        "pills": [
            (":: AUTO-EQUIP MATCHING BAIT", (56, 189, 248)),
            (":: BAIT DEPLETION WARNINGS", (251, 191, 36)),
            (":: FISHING ROD HOTKEY SYNERGY", (0, 245, 155)),
            (":: ZERO CLIENT CONFLICTS", (192, 132, 252))
        ],
        "specs": [
            ("ANGLER ENGINE  :", "Instantly equips best available bait when readying your rod"),
            ("QOL CONTROLS   :", "Auto re-arms bait upon casting; warnings when bait runs low"),
            ("COMPATIBILITY  :", "Valheim 1.0+, Vanilla bait, modded bait, Solo & Dedicated Servers")
        ],
        "prompt": "ANGLER PROTOCOL: Cast into choppy ocean swells without rummaging through your inventory.",
        "glow": (56, 189, 248, 30)
    },
    {
        "slug": "bepinex-configdrawers",
        "title": "BepInEx.ConfigDrawers",
        "game": "BEPINEX",
        "version": "v1.1.3",
        "downloads": "2.9K+",
        "subtitle": "Modern In-Game Slide-Out Configuration Drawer",
        "desc": "Edit BepInEx plugin settings live in-game without alt-tabbing. Features a sleek slide-out screen rail and instant ServerSync reload.",
        "pills": [
            (":: DOCKED SLIDE-OUT RAIL", (0, 245, 155)),
            (":: REAL-TIME LIVE RELOAD", (56, 189, 248)),
            (":: INSTANT MOD SEARCH & FILTER", (251, 191, 36)),
            (":: SERVERSYNC COMPATIBLE", (100, 240, 252))
        ],
        "specs": [
            ("UI ARCHITECTURE:", "Native Unity uGUI slide rail or moveable floating canvas window"),
            ("LIVE RELOAD    :", "Applies setting adjustments on the fly with no game restart required"),
            ("COMPATIBILITY  :", "BepInEx 5.4+, Valheim, ServerSync, Official ConfigManager support")
        ],
        "prompt": "LIVE CONFIGURATION: Tweak recipes, station levels, and mod options right at your forge.",
        "glow": (0, 245, 155, 30)
    },
    {
        "slug": "bettersleepbruh",
        "title": "BetterSleepBruh",
        "game": "VALHEIM",
        "version": "v2.1.1",
        "downloads": "10.6K+",
        "subtitle": "Multiplayer Sleep Thresholds & Time-Warp Acceleration",
        "desc": "Eliminates frustrating multiplayer bedtime stalemates. Enables configurable player percentage thresholds for sleeping with smooth visual time progression.",
        "pills": [
            (":: CONFIGURABLE SLEEP PERCENT", (192, 132, 252)),
            (":: SMOOTH TIME ACCELERATION", (56, 189, 248)),
            (":: BEDTIME CHAT ALERTS", (251, 191, 36)),
            (":: SERVERSYNC ENFORCEMENT", (0, 245, 155))
        ],
        "specs": [
            ("SLEEP ENGINE   :", "Passes the night when configurable % (e.g. 50% or 1 player) sleep"),
            ("TIME PROGRESSION:", "Smooth daytime acceleration rather than sudden jarring blackouts"),
            ("COMPATIBILITY  :", "Valheim 1.0+, Dedicated Servers, Survival Servers certified")
        ],
        "prompt": "NIGHT WATCH: Keep cooperative multiplayer flowing smoothly through the darkest nights.",
        "glow": (192, 132, 252, 28)
    },
    {
        "slug": "consolebuddy",
        "title": "ConsoleBuddy",
        "game": "VALHEIM",
        "version": "v2.0.11",
        "downloads": "3.4K+",
        "subtitle": "Developer Console History, Tab Completion & Aliases",
        "desc": "Empowers server admins and mod developers with a modern terminal experience. Features persistent command history, tab autocomplete, and custom command aliases.",
        "pills": [
            (":: COMMAND AUTO-COMPLETE", (56, 189, 248)),
            (":: PERSISTENT COMMAND HISTORY", (0, 245, 155)),
            (":: COLORIZED OUTPUT STREAM", (251, 191, 36)),
            (":: CUSTOM COMMAND ALIASES", (249, 115, 22))
        ],
        "specs": [
            ("TERMINAL TOOLS :", "Up/Down arrow history recall, Tab command autocompletion"),
            ("DEBUG FEATURES :", "Exception suppression, prefab inspector, rapid keybind execution"),
            ("COMPATIBILITY  :", "Valheim 1.0+, Jotunn, BepInEx 5.4+, Client-side developer tool")
        ],
        "prompt": "POWER TERMINAL: Command line ergonomics engineered for Valheim power users.",
        "glow": (56, 189, 248, 28)
    },
    {
        "slug": "dooropenerbruh",
        "title": "DoorOpenerBruh",
        "game": "VALHEIM",
        "version": "v2.0.11",
        "downloads": "13.5K+",
        "subtitle": "Automated Proximity Door & Gate Opener with Timers",
        "desc": "Hands full of iron ore? Automatically swings open doors and fortress gates as you approach and shuts them securely behind you. Fully ward and enemy aware.",
        "pills": [
            (":: PROXIMITY AUTO-OPEN", (0, 245, 155)),
            (":: SECURE AUTO-CLOSE TIMERS", (56, 189, 248)),
            (":: WARD-SAFE PERMISSIONS", (251, 191, 36)),
            (":: SNEAK & COMBAT AWARENESS", (249, 115, 22))
        ],
        "specs": [
            ("SENSING RADIUS :", "Configurable proximity detection with intelligent line-of-sight raycasting"),
            ("SECURITY LOGIC :", "Respects player wards; stays closed during hostile creature raids"),
            ("COMPATIBILITY  :", "All vanilla wood/iron doors, darkwood gates, custom modded gates")
        ],
        "prompt": "HANDS FREE: Walk through your great hall without spamming the interaction key.",
        "glow": (0, 245, 155, 28)
    },
    {
        "slug": "fastitemtransfer",
        "title": "FastItemTransfer",
        "game": "VALHEIM",
        "version": "v2.0.11",
        "downloads": "25.8K+",
        "subtitle": "Rapid One-Click Inventory & Container Item Transfers",
        "desc": "Swiftly move items and stacks between your inventory and chests with intuitive right-clicks, modifier keys, and instant container stack synchronization.",
        "pills": [
            (":: RIGHT-CLICK INSTANT MOVE", (56, 189, 248)),
            (":: SHIFT/CTRL STACK MODIFIERS", (0, 245, 155)),
            (":: CONTAINER AUTO-STACKING", (251, 191, 36)),
            (":: ZERO ITEM LOSS SAFEGUARD", (100, 240, 252))
        ],
        "specs": [
            ("SHORTCUT ENGINE:", "One-click transfers, modifier stack moving, quick loot and deposit"),
            ("SAFEGUARDS     :", "Transaction verified, anti-duplication guarded, network optimized"),
            ("COMPATIBILITY  :", "Valheim 1.0+, AdventureBackpacks, QuickStack, Multi-container mods")
        ],
        "prompt": "INVENTORY SPEED: Offload long mining expeditions and organize chests in seconds.",
        "glow": (56, 189, 248, 28)
    },
    {
        "slug": "nofogbruh",
        "title": "NoFogBruh",
        "game": "VALHEIM",
        "version": "v2.1.3",
        "downloads": "62.8K+",
        "subtitle": "Customizable Biome Weather & Atmospheric Fog Controller",
        "desc": "Tired of pea-soup weather blinding your view? Clear impenetrable fog or fine-tune atmospheric fog densities per biome for breathtaking panoramic horizons.",
        "pills": [
            (":: PER-BIOME FOG CONTROLS", (125, 211, 252)),
            (":: MISTLANDS FOG ADJUSTMENT", (192, 132, 252)),
            (":: INSTANT TOGGLE HOTKEY", (0, 245, 155)),
            (":: FPS PERFORMANCE BOOST", (251, 191, 36))
        ],
        "specs": [
            ("ATMOSPHERE SLIDER:", "Adjust distance fog, height fog, and volumetric density per biome"),
            ("PERFORMANCE     :", "Significantly improves frame rates in Swamps, Mountains & Mistlands"),
            ("COMPATIBILITY   :", "Valheim 1.0+, Pure client mod (compatible with all multiplayer servers)")
        ],
        "prompt": "CLEAR HORIZONS: Take in majestic vistas and navigate stormy seas with complete clarity.",
        "glow": (125, 211, 252, 28)
    },
    {
        "slug": "randomspawnpointbruh",
        "title": "RandomSpawnPointBruh",
        "game": "VALHEIM",
        "version": "v2.1.4",
        "downloads": "15.3K+",
        "subtitle": "Dynamic Wilderness First-Spawn Coordinate Generator",
        "desc": "Ditch the predictable central altar start. Awaken new vikings at random uncharted points across the Tenth World with configurable biome rules and safety boundaries.",
        "pills": [
            (":: RANDOM WILDERNESS SPAWNS", (251, 191, 36)),
            (":: BIOME RESTRICTION RULES", (0, 245, 155)),
            (":: DISTANCE FROM CENTER RADIUS", (56, 189, 248)),
            (":: SERVERSYNC SYNCHRONIZED", (249, 115, 22))
        ],
        "specs": [
            ("SPAWN ALGORITHM:", "Calculates valid dry land coordinates with altitude and safety checks"),
            ("MULTIPLAYER    :", "Synchronized team spawn zones or true solitary survival dispersion"),
            ("COMPATIBILITY  :", "Valheim 1.0+, ServerSync, Custom World Generators, Dedicated Servers")
        ],
        "prompt": "UNCHARTED LANDS: Experience every playthrough from a fresh, mysterious coastline.",
        "glow": (251, 191, 36, 28)
    },
    {
        "slug": "saveyourluckbruh",
        "title": "SaveYourLuckBruh",
        "game": "VALHEIM",
        "version": "v1.0.3",
        "downloads": "844",
        "subtitle": "Session Bad-Luck Equity & Drop Counter Persistence",
        "desc": "Never lose your bad-luck equity again. Persists Valheim's internal pseudo-random drop counters across game sessions, world transitions, and disconnects.",
        "pills": [
            (":: PERSISTENT DROP COUNTERS", (0, 245, 155)),
            (":: BAD LUCK EQUITY SAVED", (251, 191, 36)),
            (":: SESSION TRANSITION SAFE", (56, 189, 248)),
            (":: ZERO GAMEPLAY TAMPERING", (100, 240, 252))
        ],
        "specs": [
            ("LUCK ENGINE    :", "Preserves incremental pseudo-random drop rolls across game sessions"),
            ("DROP FAIRNESS  :", "Ensures long farming runs for trophies and rare items are never wasted"),
            ("COMPATIBILITY  :", "Valheim 1.0+, Vanilla drop tables, Modded creature drops, ServerSync")
        ],
        "prompt": "DROP INTEGRITY: Every creature slain counts toward your rare trophy drop equity.",
        "glow": (0, 245, 155, 30)
    },
    {
        "slug": "shieldmebruh",
        "title": "ShieldMeBruh",
        "game": "VALHEIM",
        "version": "v2.1.4",
        "downloads": "132.7K+",
        "subtitle": "Intelligent Weapon & Shield Auto-Pairing Combat Suite",
        "desc": "Never face a draugr swarm bare-handed. Automatically pairs and equips your favorite shield whenever you draw one-handed weapons or exploration tools.",
        "pills": [
            (":: AUTO-EQUIP PAIRED SHIELD", (56, 189, 248)),
            (":: ONE-HAND WEAPON DETECTION", (0, 245, 155)),
            (":: TOOL SYNERGY (PICKAXE/TORCH)", (251, 191, 36)),
            (":: SMOOTH ANIMATION HANDLING", (249, 115, 22))
        ],
        "specs": [
            ("COMBAT LOGIC   :", "Draws your favorite shield when equipping swords, clubs, axes, spears"),
            ("TOOL MODES     :", "Optionally keeps shield raised while using pickaxes, torches, and hoes"),
            ("COMPATIBILITY  :", "Valheim 1.0+, EpicLoot, DualWield, Solo & Multiplayer Dedicated Servers")
        ],
        "prompt": "COMBAT READINESS: Draw your blade and raise your shield in a single fluid motion.",
        "glow": (56, 189, 248, 30)
    },
    {
        "slug": "techtonica-bettercoremanagement",
        "title": "BetterCoreManagement",
        "game": "TECHTONICA",
        "version": "v1.0.3",
        "downloads": "2.6K+",
        "subtitle": "Research Core Cluster Placement & Inventory Optimization",
        "desc": "Master Calyx's tech tree. Optimizes core tower placement, simplifies mega-cluster deployments, and eliminates inventory clutter.",
        "pills": [
            (":: MASS CORE CLUSTER PLACEMENT", (56, 189, 248)),
            (":: INVENTORY BULK OPTIMIZER", (0, 245, 155)),
            (":: CORE TOWER LAG REDUCTION", (251, 191, 36)),
            (":: FACTORY AUTOMATION SYNERGY", (249, 115, 22))
        ],
        "specs": [
            ("CORE ENGINE    :", "Rapid placement and organization of massive research core arrays"),
            ("OPTIMIZATION   :", "Reduces core tower rendering overhead across deep Calyx facilities"),
            ("COMPATIBILITY  :", "Techtonica v1.0+, BepInEx IL2CPP, Seamless save compatibility")
        ],
        "prompt": "UNDERGROUND FACTORY: Construct towering research arrays without tedious manual placing.",
        "glow": (56, 189, 248, 28)
    },
    {
        "slug": "techtonica-containerresizer",
        "title": "ContainerResizer",
        "game": "TECHTONICA",
        "version": "v1.0.2",
        "downloads": "1.7K+",
        "subtitle": "Configurable Cargo Container & Storage Capacity Expansion",
        "desc": "Keep high-speed production lines flowing without bottlenecks. Expands small and large Calyx cargo containers with custom inventory grid dimensions.",
        "pills": [
            (":: CUSTOM CONTAINER CAPACITIES", (0, 245, 155)),
            (":: HIGH-THROUGHPUT BUFFERING", (56, 189, 248)),
            (":: PREVENTS FACTORY BOTTLENECKS", (251, 191, 36)),
            (":: SAVEGAME SAFE ARCHITECTURE", (100, 240, 252))
        ],
        "specs": [
            ("STORAGE EXPANSION:", "Customizable slot grid dimensions for small and large containers"),
            ("LOGISTICS FLOW   :", "Buffers massive assembly output lines and prevents belt stoppages"),
            ("COMPATIBILITY    :", "Techtonica v1.0+, BepInEx IL2CPP, Multiplayer factory compatible")
        ],
        "prompt": "LOGISTICS EFFICIENCY: Eliminate container bottlenecks across your automated factory.",
        "glow": (0, 245, 155, 28)
    },
    {
        "slug": "techtonica-knowencumbrance",
        "title": "KnowEncumbrance",
        "game": "TECHTONICA",
        "version": "v1.0.2",
        "downloads": "1.9K+",
        "subtitle": "Real-Time Carry Weight & Encumbrance HUD Telemetry",
        "desc": "Visualizes your inventory weight, component limits, and encumbrance metrics with a clean, unobtrusive HUD overlay while excavating Calyx's caves.",
        "pills": [
            (":: REAL-TIME WEIGHT HUD OVERLAY", (56, 189, 248)),
            (":: ENCUMBRANCE WARNING ALERTS", (249, 115, 22)),
            (":: MINIMALIST FACTORY UI", (0, 245, 155)),
            (":: ZERO OVERHEAD PERFORMANCE", (251, 191, 36))
        ],
        "specs": [
            ("HUD TELEMETRY  :", "Displays live weight, max carry threshold, and remaining slots"),
            ("CUSTOMIZATION  :", "Configurable screen anchor, scale, opacity, and threshold warning colors"),
            ("COMPATIBILITY  :", "Techtonica v1.0+, BepInEx IL2CPP, Compatible with all factory mods")
        ],
        "prompt": "TELEMETRY METRICS: Monitor your resource haul before hitting maximum encumbrance.",
        "glow": (56, 189, 248, 28)
    },
    {
        "slug": "techtonica-official-bepinex-configurationmanager",
        "title": "Official ConfigurationManager",
        "game": "TECHTONICA",
        "version": "v18.0.1",
        "downloads": "1.2K+",
        "subtitle": "Official In-Game Mod Configuration Manager for Techtonica",
        "desc": "Press F1 in-game to configure all installed Techtonica BepInEx mods with live visual sliders, toggles, color pickers, and hotkey binding controls.",
        "pills": [
            (":: PRESS [F1] IN-GAME UI", (0, 245, 155)),
            (":: LIVE VALUE MANIPULATION", (56, 189, 248)),
            (":: AUTOMATIC PLUGIN SCANNING", (251, 191, 36)),
            (":: OFFICIAL BEPINEX ENGINE", (192, 132, 252))
        ],
        "specs": [
            ("USER INTERFACE :", "Full graphical overlay with search, categories, and reset buttons"),
            ("AUTO-DISCOVERY :", "Instantly exposes settings for all active Techtonica BepInEx plugins"),
            ("COMPATIBILITY  :", "Techtonica v1.0+, BepInEx 6 IL2CPP, Unity Native GUI Engine")
        ],
        "prompt": "IN-GAME CONTROL: Configure your entire modded factory without closing the game.",
        "glow": (0, 245, 155, 30)
    },
    {
        "slug": "techtonica-unityexplorer",
        "title": "UnityExplorer for Techtonica",
        "game": "TECHTONICA",
        "version": "v4.8.2",
        "downloads": "691",
        "subtitle": "In-Game Scene Hierarchy, Object & Memory Inspector",
        "desc": "The quintessential developer and modder inspection suite. Inspect active scenes, game objects, C# components, shaders, and memory values in real time.",
        "pills": [
            (":: LIVE SCENE HIERARCHY TREE", (192, 132, 252)),
            (":: COMPONENT & FIELD INSPECTOR", (56, 189, 248)),
            (":: FREE CAMERA & MOUSE HOVER", (0, 245, 155)),
            (":: C# RECURSIVE REFLECTION", (251, 191, 36))
        ],
        "specs": [
            ("INSPECTOR TOOLS:", "Live search for game objects, inspect transforms, alter memory live"),
            ("DIAGNOSTICS    :", "Trace Unity events, dump textures/meshes, inspect internal game logic"),
            ("COMPATIBILITY  :", "Techtonica v1.0+, BepInEx IL2CPP, Sinai Dev Suite engine")
        ],
        "prompt": "DEV SUITE: Peer deep beneath the surface of Techtonica's underground Unity engine.",
        "glow": (192, 132, 252, 30)
    },
    {
        "slug": "thequeensdeadbruh",
        "title": "TheQueensDeadBruh",
        "game": "VALHEIM",
        "version": "v2.0.11",
        "downloads": "9.5K+",
        "subtitle": "Post-Queen Mistlands Raid Suppression & Settlement Peace",
        "desc": "Conquered the Seeker Queen? Slaying the pinnacle boss finally silences relentless seeker raids on your bases. Restores well-deserved tranquility to the realm.",
        "pills": [
            (":: QUEEN RAID SUPPRESSION", (192, 132, 252)),
            (":: POST-BOSS PEACE RULES", (0, 245, 155)),
            (":: CONFIGURABLE BIOME RAIDS", (251, 191, 36)),
            (":: SERVERSYNC SYNCHRONIZED", (249, 115, 22))
        ],
        "specs": [
            ("RAID LOGIC     :", "Checks global keys for defeated Queen before rolling seeker raids"),
            ("BASE PROTECTION:", "Protects meadows and coastal fortresses from endgame hive destruction"),
            ("COMPATIBILITY  :", "Valheim 1.0+, Ashlands ready, Dedicated Servers, Survival Servers")
        ],
        "prompt": "VICTORY REWARDED: Your triumph over the Queen permanently secures your homelands.",
        "glow": (192, 132, 252, 28)
    },
    {
        "slug": "wardmebruh",
        "title": "WardMeBruh",
        "game": "VALHEIM",
        "version": "v1.0.0",
        "downloads": "ACTIVE",
        "subtitle": "Role-Based Ward Permissions, Sub-Wards & Defense Shields",
        "desc": "Expands vanilla wards with role-based permissions, compound linking, sub-wards, automated upkeep, and defense shields.",
        "pills": [
            (":: ROLE-BASED ACCESS CONTROL", (56, 189, 248)),
            (":: MULTI-WARD COMPOUND LINKING", (0, 245, 155)),
            (":: AUTOMATED BASE MAINTENANCE", (251, 191, 36)),
            (":: SCALABLE DEFENSE SHIELDS", (249, 115, 22))
        ],
        "specs": [
            ("ACCESS ROLES   :", "Owner, Admin, Member, Guest permissions with individual rights"),
            ("TERRITORY GRID :", "Connect multiple wards into a single unified compound defense grid"),
            ("COMPATIBILITY  :", "Valheim 1.0+, All building piece mods, Dedicated Servers, ServerSync")
        ],
        "prompt": "FORTRESS DEFENSE: Settlement wards ignite to guard your halls and automate maintenance.",
        "glow": (56, 189, 248, 30)
    },
    {
        "slug": "xportalnetworks",
        "title": "XPortalNetworks",
        "game": "VALHEIM",
        "version": "v2.0.13",
        "downloads": "22.8K+",
        "subtitle": "Unlimited Multi-Destination Portals with Interactive Map UI",
        "desc": "Connect infinite destinations into a global transit network with an intuitive in-game destination selector and map directory.",
        "pills": [
            (":: MULTI-DESTINATION PORTALS", (192, 132, 252)),
            (":: IN-GAME PORTAL SELECTOR UI", (56, 189, 248)),
            (":: ZERO TAG PAIR LIMITATION", (0, 245, 155)),
            (":: SERVERSYNC DEDICATED SYNC", (251, 191, 36))
        ],
        "specs": [
            ("TRANSIT NETWORK:", "A single portal gate can teleport to any named portal in your realm"),
            ("MAP DIRECTORY  :", "Interactive portal browser with search, recent history, and favorites"),
            ("COMPATIBILITY  :", "Valheim 1.0+, Wood & Stone Portals, AdventureBackpacks, ServerSync")
        ],
        "prompt": "TRANSIT SYSTEM: Step through a single gate and dial any outpost across your entire world.",
        "glow": (192, 132, 252, 30)
    }
]

import textwrap

def generate_card_for_mod(mod_data):
    slug = mod_data["slug"]
    output_dir = os.path.join("assets/images/mods", slug)
    os.makedirs(output_dir, exist_ok=True)
    out_file = os.path.join(output_dir, f"{slug}-og.png")
    
    img = Image.new("RGBA", (1200, 630), BG_DARK)
    
    # Glows
    glow_col = mod_data.get("glow", (56, 189, 248, 30))
    draw_radial_glow(img, 230, 275, 270, glow_col)
    draw_radial_glow(img, 860, 200, 320, (0, 245, 155, 20))
    draw_radial_glow(img, 1120, 520, 200, (249, 115, 22, 18))
    
    draw = ImageDraw.Draw(img)
    
    # Dark subtle cyber grid
    for x in range(0, 1200, 48):
        draw.line([(x, 0), (x, 630)], fill=(16, 28, 46, 75), width=1)
    for y in range(0, 630, 48):
        draw.line([(0, y), (1200, y)], fill=(16, 28, 46, 75), width=1)
        
    # Main outer border with cyber brackets
    draw_cyber_frame(draw, 24, 24, 1176, 606, color=(22, 38, 62, 255), corner_color=CYAN_ACCENT, bracket_len=24)
    
    # Top Header Bar
    draw.rectangle([(25, 25), (1175, 68)], fill=(10, 16, 28, 240))
    draw.line([(25, 68), (1175, 68)], fill=(28, 48, 76, 255), width=1)
    
    # Terminal Path
    draw.text((45, 38), f"user@vapok.io:~$ ./mods/{slug}", font=FONT_MONO_MD, fill=(45, 212, 191, 255))
    
    # Game Badge (Centered with Dark Fill)
    game_str = mod_data.get("game", "VALHEIM")
    draw.rounded_rectangle([(845, 35), (975, 60)], radius=4, fill=(12, 24, 40, 255), outline=CYAN_ACCENT, width=1)
    g_text = f"[ {game_str} ]"
    g_bbox = FONT_MONO_SM.getbbox(g_text)
    gw = g_bbox[2] - g_bbox[0]
    draw.text((845 + (130 - gw) // 2, 41), g_text, font=FONT_MONO_SM, fill=CYAN_BRIGHT)
    
    # Status Badge (Centered with Dark Fill)
    draw.rounded_rectangle([(985, 35), (1155, 60)], radius=4, fill=(10, 28, 28, 255), outline=MINT_ACCENT, width=1)
    status_text = "[ OFFICIAL RELEASE ]"
    v_bbox = FONT_MONO_SM.getbbox(status_text)
    vw = v_bbox[2] - v_bbox[0]
    draw.text((985 + (170 - vw) // 2, 41), status_text, font=FONT_MONO_SM, fill=MINT_ACCENT)
    
    # --- Left: Real Mod Thumbnail Card ---
    thumb_x1, thumb_y1, thumb_x2, thumb_y2 = 55, 92, 395, 432
    draw.rectangle([(thumb_x1, thumb_y1), (thumb_x2, thumb_y2)], fill=(10, 16, 28, 255))
    draw_cyber_frame(draw, thumb_x1, thumb_y1, thumb_x2, thumb_y2, color=(35, 65, 100, 255), corner_color=CYAN_BRIGHT, bracket_len=20)
    
    # Load and paste real icon.png
    icon_path = os.path.join(output_dir, "icon.png")
    if os.path.exists(icon_path):
        icon = Image.open(icon_path).convert("RGBA")
        icon = icon.resize((300, 300), Image.LANCZOS)
        img.paste(icon, (thumb_x1 + 20, thumb_y1 + 20), icon)
        
    # Download stats badge under thumbnail (Dark Cyber Fill)
    stat_y1 = 448
    draw.rounded_rectangle([(thumb_x1, stat_y1), (thumb_x2, stat_y1 + 42)], radius=6, fill=(18, 26, 40, 255), outline=AMBER_ACCENT, width=1)
    dl = mod_data.get("downloads", "")
    if dl and dl != "ACTIVE":
        stat_text = f">> {dl} DOWNLOADS <<"
    else:
        stat_text = ">> VERIFIED EXPANSION <<"
    s_bbox = FONT_MONO_MD.getbbox(stat_text)
    sw = s_bbox[2] - s_bbox[0]
    draw.text((thumb_x1 + (340 - sw) // 2, stat_y1 + 13), stat_text, font=FONT_MONO_MD, fill=AMBER_ACCENT)
    
    # --- Right: Typography & Details ---
    content_x = 425
    draw.text((content_x, 76), f"// {game_str} EXPANSION MODULE // OFFICIAL VAPOK RELEASE", font=FONT_MONO_SM, fill=CYAN_ACCENT)
    
    title_text = mod_data["title"]
    font_title, font_size = get_title_font(title_text)
    
    # Title with drop shadow
    draw.text((content_x + 2, 114 + 2), title_text, font=font_title, fill=(0, 0, 0, 180))
    draw.text((content_x, 114), title_text, font=font_title, fill=TEXT_WHITE)
    
    sub_y = 114 + font_size + 8
    draw.text((content_x, sub_y), mod_data["subtitle"], font=FONT_SUBTITLE, fill=CYAN_BRIGHT)
    
    # Wrapped Description (Up to 2 Lines)
    desc_lines = textwrap.wrap(mod_data["desc"], width=68)
    desc_y = sub_y + 26
    for d_idx, d_line in enumerate(desc_lines[:2]):
        draw.text((content_x, desc_y + (d_idx * 18)), d_line, font=FONT_BODY, fill=TEXT_DIM)
        
    # 2x2 Feature Pills
    pills = mod_data.get("pills", [])
    pill_w = 350
    pill_h = 36
    pills_y = desc_y + (min(len(desc_lines), 2) * 18) + 12
    for i, (text, col) in enumerate(pills[:4]):
        col_idx = i % 2
        row_idx = i // 2
        px1 = content_x + (col_idx * (pill_w + 16))
        py1 = pills_y + (row_idx * (pill_h + 8))
        draw.rounded_rectangle([(px1, py1), (px1 + pill_w, py1 + pill_h)], radius=5, fill=(12, 20, 34, 255), outline=(col[0], col[1], col[2], 140), width=1)
        draw.text((px1 + 16, py1 + 9), text, font=FONT_MONO_SM, fill=(col[0], col[1], col[2], 255))
        
    # Specifications Box
    box_y1 = pills_y + 90
    draw.rectangle([(content_x, box_y1), (1145, box_y1 + 122)], fill=(9, 16, 28, 240), outline=(28, 52, 84, 255), width=1)
    draw.rectangle([(content_x, box_y1), (1145, box_y1 + 26)], fill=(16, 28, 46, 240))
    draw.line([(content_x, box_y1 + 26), (1145, box_y1 + 26)], fill=(36, 68, 104, 255), width=1)
    draw.text((content_x + 14, box_y1 + 6), f"SYSTEM SPECIFICATIONS // CAPABILITIES & {game_str} INTEGRATION", font=FONT_MONO_XS, fill=CYAN_ACCENT)
    
    specs = mod_data.get("specs", [])
    spec_offsets = [33, 61, 89]
    for idx, (label, val) in enumerate(specs[:3]):
        sy = box_y1 + spec_offsets[idx]
        draw.text((content_x + 16, sy), label, font=FONT_MONO_SM, fill=TEXT_MUTED)
        draw.text((content_x + 160, sy), val, font=FONT_MONO_SM, fill=TEXT_LIGHT if idx == 0 else (MINT_ACCENT if idx == 1 else CYAN_BRIGHT))
        
    # --- Bottom Advisory & Brand Bar ---
    bot_y1 = 512
    draw.rectangle([(45, bot_y1), (1155, bot_y1 + 78)], fill=(10, 16, 28, 255), outline=(26, 46, 72, 255), width=1)
    
    # Vapok emblem
    emblem_path = "assets/images/vapok-logo-circle.png"
    if os.path.exists(emblem_path):
        emb = Image.open(emblem_path).convert("RGBA")
        emb = emb.resize((50, 50), Image.LANCZOS)
        img.paste(emb, (58, bot_y1 + 14), emb)
        
    draw.text((120, bot_y1 + 18), f"vapok.io/mods/{slug}/", font=FONT_MONO_SM, fill=CYAN_BRIGHT)
    draw.text((120, bot_y1 + 38), "VAPOK GAMING INFRASTRUCTURE // VERIFIED EXPANSION", font=FONT_MONO_MICRO, fill=TEXT_MUTED)
    
    # Prompt banner
    prompt_x1 = 430
    prompt_box_y = bot_y1 + 10
    draw.rounded_rectangle([(prompt_x1, prompt_box_y), (1145, prompt_box_y + 58)], radius=4, fill=(14, 22, 36, 255), outline=(32, 56, 88, 200), width=1)
    draw.text((prompt_x1 + 14, prompt_box_y + 8), "// ADVISORY PROTOCOL // RUNTIME & ENFORCEMENT", font=FONT_MONO_MICRO, fill=CYAN_ACCENT)
    draw.text((prompt_x1 + 14, prompt_box_y + 26), mod_data.get("prompt", ""), font=FONT_MONO_SM, fill=AMBER_ACCENT)
    
    # Far right tags
    draw.text((1035, prompt_box_y + 9), "[ SERVERSYNC ]", font=FONT_MONO_MICRO, fill=MINT_ACCENT)
    draw.text((1045, prompt_box_y + 36), "MIT LICENSE", font=FONT_MONO_MICRO, fill=TEXT_MUTED)
    
    final_img = Image.new("RGB", img.size, (6, 10, 18))
    final_img.paste(img, (0, 0), img)
    final_img.save(out_file, "PNG", optimize=True)
    print(f"Generated: {out_file} (Size: {os.path.getsize(out_file)} bytes)")

def update_mod_markdown_files():
    for mod in MODS_CATALOGUE:
        slug = mod["slug"]
        md_path = f"_mods/{slug}.md"
        if not os.path.exists(md_path):
            continue
        with open(md_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        og_image_path = f"/assets/images/mods/{slug}/{slug}-og.png"
        
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                frontmatter = parts[1]
                body = parts[2]
                
                # Check if image: exists in frontmatter
                lines = frontmatter.split("\n")
                image_found = False
                new_lines = []
                for line in lines:
                    if line.startswith("image:"):
                        new_lines.append(f'image: "{og_image_path}"')
                        image_found = True
                    else:
                        new_lines.append(line)
                
                if not image_found:
                    # Insert image before the end of frontmatter
                    # find where icon: is, or put at end
                    inserted = False
                    final_lines = []
                    for line in new_lines:
                        final_lines.append(line)
                        if line.startswith("icon:"):
                            final_lines.append(f'image: "{og_image_path}"')
                            inserted = True
                    if not inserted:
                        final_lines.append(f'image: "{og_image_path}"')
                    new_lines = final_lines
                
                new_content = "---" + "\n".join(new_lines) + "---" + body
                with open(md_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated frontmatter in: {md_path}")

if __name__ == "__main__":
    print(f"Starting generation of OG cards for {len(MODS_CATALOGUE)} mods...")
    for mod in MODS_CATALOGUE:
        generate_card_for_mod(mod)
    print("\nUpdating markdown files with og:image references...")
    update_mod_markdown_files()
    print("\nAll OG cards generated and linked successfully!")
