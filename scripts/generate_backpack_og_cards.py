import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = "assets/images/mods/adventurebackpacks"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Color Palette
BG_DARK = (6, 10, 18, 255)
BORDER_DARK = (24, 42, 66, 255)
CYAN_ACCENT = (56, 189, 248, 255)
CYAN_BRIGHT = (100, 240, 252, 255)
MINT_ACCENT = (0, 245, 155, 255)
AMBER_ACCENT = (251, 191, 36, 255)
ORANGE_FLAME = (249, 115, 22, 255)
FROST_ICE = (125, 211, 252, 255)
TEXT_WHITE = (248, 250, 252, 255)
TEXT_LIGHT = (226, 232, 240, 255)
TEXT_DIM = (148, 163, 184, 255)
TEXT_MUTED = (100, 116, 139, 255)

# Fonts
FONT_HERO_TITLE = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-Bold.ttf", 50)
FONT_SUBTITLE = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-SemiBold.ttf", 20)
FONT_BODY = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-Regular.ttf", 16)
FONT_BODY_BOLD = ImageFont.truetype("/usr/share/fonts/TTF/FiraSans-Bold.ttf", 13)
FONT_MONO_MD = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 13)
FONT_MONO_SM = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 11)
FONT_MONO_XS = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 10)
FONT_MONO_TINY = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 8)
FONT_MONO_MICRO = ImageFont.truetype("/usr/share/fonts/TTF/Hack-Bold.ttf", 7)

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
# CARD 1: MAIN ADVENTURE BACKPACKS PAGE (1200 x 630)
# =========================================================================
def generate_mod_card():
    img = Image.new("RGBA", (1200, 630), (6, 10, 18, 255))
    
    # Soft background glows
    draw_radial_glow(img, 230, 275, 270, (56, 189, 248, 40))
    draw_radial_glow(img, 860, 200, 320, (0, 245, 155, 25))
    draw_radial_glow(img, 1120, 520, 200, (249, 115, 22, 20))
    
    draw = ImageDraw.Draw(img)
    
    # Subtle dark cyber grid
    for x in range(0, 1200, 48):
        draw.line([(x, 0), (x, 630)], fill=(16, 28, 46, 75), width=1)
    for y in range(0, 630, 48):
        draw.line([(0, y), (1200, y)], fill=(16, 28, 46, 75), width=1)
        
    # Main outer border with cyber brackets
    draw_cyber_frame(draw, 24, 24, 1176, 606, color=(22, 38, 62, 255), corner_color=CYAN_ACCENT, bracket_len=24)
    
    # Top Header Bar
    draw.rectangle([(25, 25), (1175, 68)], fill=(10, 16, 28, 240))
    draw.line([(25, 68), (1175, 68)], fill=(28, 48, 76, 255), width=1)
    
    # Terminal Path & Badges
    draw.text((45, 38), "user@vapok.io:~$ ./mods/adventurebackpacks", font=FONT_MONO_MD, fill=(45, 212, 191, 255))
    
    # [ VALHEIM ]
    draw.rounded_rectangle([(845, 35), (975, 60)], radius=4, fill=(12, 24, 40, 255), outline=CYAN_ACCENT, width=1)
    g_bbox = FONT_MONO_SM.getbbox("[ VALHEIM ]")
    gw = g_bbox[2] - g_bbox[0]
    draw.text((845 + (130 - gw) // 2, 41), "[ VALHEIM ]", font=FONT_MONO_SM, fill=CYAN_BRIGHT)
    
    # [ OFFICIAL RELEASE ]
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
    icon_path = "assets/images/mods/adventurebackpacks/icon.png"
    if os.path.exists(icon_path):
        icon = Image.open(icon_path).convert("RGBA")
        icon = icon.resize((300, 300), Image.LANCZOS)
        img.paste(icon, (thumb_x1 + 20, thumb_y1 + 20), icon)
        
    # Download stats badge under thumbnail
    stat_y1 = 448
    draw.rounded_rectangle([(thumb_x1, stat_y1), (thumb_x2, stat_y1 + 42)], radius=6, fill=(18, 26, 40, 255), outline=AMBER_ACCENT, width=1)
    s_bbox = FONT_MONO_MD.getbbox(">> 1.1M+ DOWNLOADS <<")
    sw = s_bbox[2] - s_bbox[0]
    draw.text((thumb_x1 + (340 - sw) // 2, stat_y1 + 13), ">> 1.1M+ DOWNLOADS <<", font=FONT_MONO_MD, fill=AMBER_ACCENT)
    
    # --- Right: Typography & Details ---
    content_x = 425
    draw.text((content_x, 78), "// EXPANSION MODULE DOSSIER // OFFICIAL RELEASE", font=FONT_MONO_SM, fill=CYAN_ACCENT)
    
    # Drop shadow on title
    draw.text((content_x + 2, 118), "ADVENTURE BACKPACKS", font=FONT_HERO_TITLE, fill=(0, 0, 0, 180))
    draw.text((content_x, 116), "ADVENTURE BACKPACKS", font=FONT_HERO_TITLE, fill=TEXT_WHITE)
    draw.text((content_x, 176), "Progression-Based Adventuring Backpacks & Portable Storage", font=FONT_SUBTITLE, fill=CYAN_BRIGHT)
    draw.text((content_x, 208), "The premier exploration companion for Valheim. Craft, upgrade, and carry your legacy.", font=FONT_BODY, fill=TEXT_DIM)
    
    # 2x2 Feature Pills
    pills = [
        (":: 8 BIOME PROGRESSION TIERS", (56, 189, 248)),
        (":: MODERN & CLASSIC 3D MODELS", (0, 245, 155)),
        (":: COLD, FROST & HEAT DEFENSE", (249, 115, 22)),
        (":: 100% CONFIGURABLE BALANCE", (251, 191, 36))
    ]
    
    pill_w = 350
    pill_h = 36
    for i, (text, col) in enumerate(pills):
        col_idx = i % 2
        row_idx = i // 2
        px1 = content_x + (col_idx * (pill_w + 16))
        py1 = 252 + (row_idx * (pill_h + 12))
        draw.rounded_rectangle([(px1, py1), (px1 + pill_w, py1 + pill_h)], radius=5, fill=(12, 20, 34, 255), outline=(col[0], col[1], col[2], 140), width=1)
        draw.text((px1 + 18, py1 + 9), text, font=FONT_MONO_SM, fill=(col[0], col[1], col[2], 255))
        
    # Station & Compatibility Terminal Box
    box_y1 = 354
    draw.rectangle([(content_x, box_y1), (1145, box_y1 + 132)], fill=(9, 16, 28, 240), outline=(28, 52, 84, 255), width=1)
    draw.rectangle([(content_x, box_y1), (1145, box_y1 + 28)], fill=(16, 28, 46, 240))
    draw.line([(content_x, box_y1 + 28), (1145, box_y1 + 28)], fill=(36, 68, 104, 255), width=1)
    draw.text((content_x + 14, box_y1 + 7), "SYSTEM SPECIFICATIONS // FORGE PROGRESSION & COMPATIBILITY", font=FONT_MONO_XS, fill=CYAN_ACCENT)
    
    draw.text((content_x + 16, box_y1 + 38), "CRAFTING PATH :", font=FONT_MONO_SM, fill=TEXT_MUTED)
    draw.text((content_x + 160, box_y1 + 38), "Workbench L2  -->  Forge Lvl 3  -->  Black Forge Lvl 4", font=FONT_MONO_SM, fill=TEXT_LIGHT)
    
    draw.text((content_x + 16, box_y1 + 66), "SPECIAL PERKS :", font=FONT_MONO_SM, fill=TEXT_MUTED)
    draw.text((content_x + 160, box_y1 + 66), "Feather Fall • Waterproof • Wisplight • Heat Resist • Second Wind", font=FONT_MONO_SM, fill=MINT_ACCENT)
    
    draw.text((content_x + 16, box_y1 + 94), "INTEGRATION   :", font=FONT_MONO_SM, fill=TEXT_MUTED)
    draw.text((content_x + 160, box_y1 + 94), "Valheim 1.0+ • Jotunn • Modern/Classic Config • Dedicated Servers", font=FONT_MONO_SM, fill=CYAN_BRIGHT)
    
    # --- Bottom Showcase Strip (9 Backpack Sprites) ---
    bot_y1 = 506
    draw.rectangle([(45, bot_y1), (1155, bot_y1 + 84)], fill=(10, 16, 28, 255), outline=(26, 46, 72, 255), width=1)
    
    packs = [
        ("01 SATCHEL", "satchel-modern.png", (74, 222, 128)),
        ("02 RUGGED", "rugged-modern.png", (56, 189, 248)),
        ("03 WETPACK", "wetpack-modern.png", (163, 230, 53)),
        ("04 SHERPA", "arctic-modern.png", (224, 242, 254)),
        ("05 LOX PACK", "lox-modern.png", (251, 191, 36)),
        ("06 WISPPACK", "wisppack-modern.png", (192, 132, 252)),
        ("07 CINDER", "cinderward.png", (249, 115, 22)),
        ("08 FROST", "frostbound.png", (125, 211, 252)),
        ("09 SPECTRAL", "spectral.png", (244, 63, 94))
    ]
    
    for idx, (name, filename, col) in enumerate(packs):
        px = 56 + (idx * 88)
        sprite_path = f"assets/images/mods/adventurebackpacks/{filename}"
        if os.path.exists(sprite_path):
            sp = Image.open(sprite_path).convert("RGBA")
            sp = sp.resize((48, 48), Image.LANCZOS)
            img.paste(sp, (px + 6, bot_y1 + 8), sp)
        draw.text((px, bot_y1 + 62), name, font=FONT_MONO_MICRO, fill=(col[0], col[1], col[2], 255))
        
    # Vapok emblem and domain
    emblem_path = "assets/images/vapok-logo-circle.png"
    if os.path.exists(emblem_path):
        emb = Image.open(emblem_path).convert("RGBA")
        emb = emb.resize((56, 56), Image.LANCZOS)
        img.paste(emb, (875, bot_y1 + 14), emb)
        
    draw.text((945, bot_y1 + 22), "vapok.io/mods/adventurebackpacks/", font=FONT_MONO_SM, fill=CYAN_BRIGHT)
    draw.text((945, bot_y1 + 44), "VAPOK GAMING INFRASTRUCTURE", font=FONT_MONO_TINY, fill=TEXT_MUTED)
    
    out_file = os.path.join(OUTPUT_DIR, "adventurebackpacks-og.png")
    final_img = Image.new("RGB", img.size, (6, 10, 18))
    final_img.paste(img, (0, 0), img)
    final_img.save(out_file, "PNG", optimize=True)
    print(f"Generated: {out_file} (Size: {os.path.getsize(out_file)} bytes)")

# =========================================================================
# CARD 2: RECIPES / BOOK OF KNOWLEDGE PAGE (1200 x 630)
# =========================================================================
def generate_recipes_card():
    img = Image.new("RGBA", (1200, 630), (5, 8, 15, 255))
    
    # Mystical ambient glows
    draw_radial_glow(img, 280, 140, 320, (251, 191, 36, 30))
    draw_radial_glow(img, 920, 140, 320, (56, 189, 248, 30))
    draw_radial_glow(img, 600, 380, 480, (0, 245, 155, 18))
    draw_radial_glow(img, 980, 360, 240, (249, 115, 22, 20))
    
    draw = ImageDraw.Draw(img)
    
    # Soft grid
    for x in range(0, 1200, 40):
        draw.line([(x, 0), (x, 630)], fill=(18, 28, 44, 75), width=1)
    for y in range(0, 630, 40):
        draw.line([(0, y), (1200, y)], fill=(18, 28, 44, 75), width=1)
        
    # Main outer border with golden/cyan corner brackets
    draw_cyber_frame(draw, 24, 24, 1176, 606, color=(28, 44, 68, 255), corner_color=AMBER_ACCENT, bracket_len=26)
    
    # Header Bar
    draw.rectangle([(25, 25), (1175, 68)], fill=(10, 16, 26, 240))
    draw.line([(25, 68), (1175, 68)], fill=(32, 52, 82, 255), width=1)
    
    draw.text((45, 38), ">> VAPOK_OS // THE ANCIENT COMPENDIUM // CHAPTERS 01-08 + APOCRYPHA", font=FONT_MONO_MD, fill=AMBER_ACCENT)
    
    # Badges
    draw.rounded_rectangle([(875, 34), (1020, 59)], radius=4, fill=(28, 22, 12, 255), outline=AMBER_ACCENT, width=1)
    c_bbox = FONT_MONO_SM.getbbox("ANCIENT CODEX")
    cw = c_bbox[2] - c_bbox[0]
    draw.text((875 + (145 - cw) // 2, 40), "ANCIENT CODEX", font=FONT_MONO_SM, fill=AMBER_ACCENT)
    
    draw.rounded_rectangle([(1035, 34), (1155, 59)], radius=4, fill=(12, 24, 40, 255), outline=CYAN_ACCENT, width=1)
    r_bbox = FONT_MONO_SM.getbbox("RECIPES CODEX")
    rw = r_bbox[2] - r_bbox[0]
    draw.text((1035 + (120 - rw) // 2, 40), "RECIPES CODEX", font=FONT_MONO_SM, fill=CYAN_BRIGHT)
    
    # Grand Title Section
    draw.text((55, 84), "ADVENTURE BACKPACKS // ARCHIVAL CRAFTING CODEX", font=FONT_MONO_SM, fill=CYAN_ACCENT)
    draw.text((55, 102), "BOOK OF KNOWLEDGE", font=FONT_HERO_TITLE, fill=TEXT_WHITE)
    draw.text((55, 164), "Default Crafting Formulas, Upgrade Tiers, Station Requirements & Creature Drops", font=FONT_SUBTITLE, fill=AMBER_ACCENT)
    
    # 8 Chapter Cards Showcase with ACTUAL ITEM ICONS AND PERK ICONS!
    chapters = [
        {
            "tier": "01",
            "name": "MEADOWS",
            "pack": "Satchel",
            "sprite": "satchel-modern.png",
            "station": "Workbench L2",
            "mat1": "capedeerhide.png",
            "mat2": "bonefragments.png",
            "perk_icon": "cold.png",
            "perk_text": "Cold Resist",
            "color": (74, 222, 128)
        },
        {
            "tier": "02",
            "name": "BLACK FOREST",
            "pack": "Rugged",
            "sprite": "rugged-modern.png",
            "station": "Workbench L2",
            "mat1": "trollhide.png",
            "mat2": "bronze.png",
            "perk_icon": "sneak.png",
            "perk_text": "Sneak Bonus",
            "color": (56, 189, 248)
        },
        {
            "tier": "03",
            "name": "SWAMP",
            "pack": "Wetpack",
            "sprite": "wetpack-modern.png",
            "station": "Workbench L2",
            "mat1": "bloodbag.png",
            "mat2": "iron.png",
            "perk_icon": "wet.png",
            "perk_text": "Waterproof",
            "color": (163, 230, 53)
        },
        {
            "tier": "04",
            "name": "MOUNTAINS",
            "pack": "Sherpa",
            "sprite": "arctic-modern.png",
            "station": "Forge Lvl 3",
            "mat1": "wolfhairbundle.png",
            "mat2": "silver.png",
            "perk_icon": "frost.png",
            "perk_text": "Frost Resist",
            "color": (224, 242, 254)
        },
        {
            "tier": "05",
            "name": "PLAINS",
            "pack": "Lox Pack",
            "sprite": "lox-modern.png",
            "station": "Forge Lvl 3",
            "mat1": "loxpelt.png",
            "mat2": "blackmetal.png",
            "perk_icon": "slowfall.png",
            "perk_text": "Frost / Fall",
            "color": (251, 191, 36)
        },
        {
            "tier": "06",
            "name": "MISTLANDS",
            "pack": "Wisppack",
            "sprite": "wisppack-modern.png",
            "station": "Black Forge 1",
            "mat1": "capefeather.png",
            "mat2": "eitr.png",
            "perk_icon": "wisp.png",
            "perk_text": "Wisplight",
            "color": (192, 132, 252)
        },
        {
            "tier": "07",
            "name": "ASHLANDS",
            "pack": "Cinderward",
            "sprite": "cinderward.png",
            "station": "Black Forge 3",
            "mat1": "capeash.png",
            "mat2": "flametal.png",
            "perk_icon": "heat.png",
            "perk_text": "Heat Resist",
            "color": (249, 115, 22)
        },
        {
            "tier": "08",
            "name": "DEEP NORTH",
            "pack": "Frostbound",
            "sprite": "frostbound.png",
            "station": "Black Forge 4",
            "mat1": "capedeepnorth.png",
            "mat2": "frostcore.png",
            "perk_icon": "adrenaline.png",
            "perk_text": "Second Wind",
            "color": (125, 211, 252)
        }
    ]
    
    col_w = 128
    col_gap = 12
    start_x = 46
    card_y1 = 200
    card_h = 320
    
    for idx, c in enumerate(chapters):
        cx1 = start_x + (idx * (col_w + col_gap))
        cx2 = cx1 + col_w
        cy2 = card_y1 + card_h
        col = c["color"]
        
        # Card body
        draw.rectangle([(cx1, card_y1), (cx2, cy2)], fill=(10, 16, 28, 245), outline=(26, 44, 70, 255), width=1)
        
        # Top color accent bar
        draw.rectangle([(cx1, card_y1), (cx2, card_y1 + 4)], fill=col)
        
        # Chapter Tier & Biome Name
        draw.text((cx1 + 8, card_y1 + 10), f"TIER {c['tier']}", font=FONT_MONO_XS, fill=col)
        draw.text((cx1 + 8, card_y1 + 23), c["name"][:13], font=FONT_MONO_TINY, fill=TEXT_LIGHT)
        
        # Backpack Sprite Box
        sp_box_y = card_y1 + 38
        draw.rectangle([(cx1 + 8, sp_box_y), (cx2 - 8, sp_box_y + 86)], fill=(6, 10, 18, 255), outline=(24, 40, 64, 255), width=1)
        
        sprite_path = f"assets/images/mods/adventurebackpacks/{c['sprite']}"
        if os.path.exists(sprite_path):
            sp = Image.open(sprite_path).convert("RGBA")
            sp = sp.resize((72, 72), Image.LANCZOS)
            img.paste(sp, (cx1 + 20, sp_box_y + 7), sp)
            
        # Backpack Name
        draw.text((cx1 + 8, card_y1 + 130), c["pack"][:13], font=FONT_BODY_BOLD, fill=TEXT_WHITE)
        
        # Station Badge
        st_y = card_y1 + 154
        draw.rounded_rectangle([(cx1 + 8, st_y), (cx2 - 8, st_y + 26)], radius=4, fill=(14, 22, 36, 255), outline=(col[0], col[1], col[2], 120), width=1)
        draw.text((cx1 + 12, st_y + 6), c['station'][:16], font=FONT_MONO_TINY, fill=col)
        
        # Key Materials Box with REAL ITEM ICONS (26x26 px)
        mat_box_y = card_y1 + 186
        draw.rectangle([(cx1 + 8, mat_box_y), (cx2 - 8, mat_box_y + 52)], fill=(8, 14, 24, 255), outline=(22, 38, 60, 255), width=1)
        draw.text((cx1 + 10, mat_box_y + 3), "KEY MATERIALS", font=FONT_MONO_MICRO, fill=TEXT_MUTED)
        
        # Paste 2 material icons
        m1_path = f"assets/images/items/{c['mat1']}"
        if os.path.exists(m1_path):
            m1 = Image.open(m1_path).convert("RGBA")
            m1 = m1.resize((26, 26), Image.NEAREST)
            img.paste(m1, (cx1 + 18, mat_box_y + 18), m1)
            
        m2_path = f"assets/images/items/{c['mat2']}"
        if os.path.exists(m2_path):
            m2 = Image.open(m2_path).convert("RGBA")
            m2 = m2.resize((26, 26), Image.NEAREST)
            img.paste(m2, (cx1 + 68, mat_box_y + 18), m2)
            
        # Biome Perk Pill with REAL PERK ICON (24x24 px)
        perk_y = card_y1 + 246
        draw.rounded_rectangle([(cx1 + 8, perk_y), (cx2 - 8, perk_y + 62)], radius=4, fill=(10, 24, 28, 255), outline=(0, 245, 155, 180), width=1)
        
        p_path = f"assets/images/perks/{c['perk_icon']}"
        if os.path.exists(p_path):
            pi = Image.open(p_path).convert("RGBA")
            pi = pi.resize((24, 24), Image.NEAREST)
            img.paste(pi, (cx1 + 12, perk_y + 19), pi)
            
        draw.text((cx1 + 40, perk_y + 14), "BIOME PERK:", font=FONT_MONO_MICRO, fill=TEXT_MUTED)
        draw.text((cx1 + 40, perk_y + 28), c['perk_text'][:12], font=FONT_MONO_TINY, fill=MINT_ACCENT)
        
    # Bottom Advisory Bar
    bot_y1 = 534
    draw.rectangle([(44, bot_y1), (1156, bot_y1 + 60)], fill=(10, 16, 26, 255), outline=(28, 48, 76, 255), width=1)
    
    # Vapok emblem
    emblem_path = "assets/images/vapok-logo-circle.png"
    if os.path.exists(emblem_path):
        emb = Image.open(emblem_path).convert("RGBA")
        emb = emb.resize((42, 42), Image.LANCZOS)
        img.paste(emb, (56, bot_y1 + 9), emb)
        
    draw.text((110, bot_y1 + 14), "// EXPLORER STANCE: Valheim is about exploration. All recipes represent defaults and are fully modifiable in CFG.", font=FONT_MONO_SM, fill=AMBER_ACCENT)
    draw.text((110, bot_y1 + 35), "vapok.io/mods/adventurebackpacks/recipes/ • Vapok Gaming Infrastructure", font=FONT_MONO_XS, fill=CYAN_ACCENT)
    
    out_file = os.path.join(OUTPUT_DIR, "recipes-og.png")
    final_img = Image.new("RGB", img.size, (5, 8, 15))
    final_img.paste(img, (0, 0), img)
    final_img.save(out_file, "PNG", optimize=True)
    print(f"Generated: {out_file} (Size: {os.path.getsize(out_file)} bytes)")

if __name__ == "__main__":
    generate_mod_card()
    generate_recipes_card()
