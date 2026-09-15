#!/usr/bin/env python3
"""
Vapok Gaming — Multi-Game Releases Synchronizer with Live Thunderstore & Discord Metrics
Synchronizes:
- Valheim Releases from /home/vapok/Modding/Releases
- Techtonica Releases from /home/vapok/Modding/Techtonica/Releases
Fetches live metrics from Thunderstore APIs and Discord invite.
"""

import os
import json
import re
import shutil
import urllib.request

SITE_DIR = "/home/vapok/Modding/Vapok GitHub Pages/vapok.github.io"
MODS_DIR = os.path.join(SITE_DIR, "_mods")
DATA_DIR = os.path.join(SITE_DIR, "_data")
CHANGELOGS_DIR = os.path.join(SITE_DIR, "_includes", "changelogs")
ASSETS_IMG_DIR = os.path.join(SITE_DIR, "assets", "images", "mods")

os.makedirs(MODS_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(CHANGELOGS_DIR, exist_ok=True)
os.makedirs(ASSETS_IMG_DIR, exist_ok=True)

GAME_CONFIGS = [
    {
        "game": "Valheim",
        "category": "valheim",
        "community": "valheim",
        "releases_dir": "/home/vapok/Modding/Releases",
        "ts_api": "https://thunderstore.io/c/valheim/api/v1/package/"
    },
    {
        "game": "Techtonica",
        "category": "techtonica",
        "community": "techtonica",
        "releases_dir": "/home/vapok/Modding/Techtonica/Releases",
        "ts_api": "https://thunderstore.io/c/techtonica/api/v1/package/"
    }
]

def slugify(text):
    return re.sub(r'[\s_]+', '-', re.sub(r'[^\w\s-]', '', text).strip().lower())

def format_count(count):
    if count >= 1_000_000:
        return f"{count / 1_000_000:.1f}M+"
    if count >= 1_000:
        return f"{count / 1_000:.1f}K+"
    return f"{count:,}"

def fetch_thunderstore_metrics(community, api_url):
    metrics = {}
    total = 0
    try:
        req = urllib.request.Request(api_url, headers={"User-Agent": "VapokModdingSync/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            for p in data:
                owner = (p.get("owner") or p.get("namespace") or "").strip()
                if owner.lower() == "vapok":
                    name = p.get("name", "")
                    dl = sum(v.get("downloads", 0) for v in p.get("versions", [])) or p.get("downloads", 0)
                    pkg_url = p.get("package_url") or f"https://thunderstore.io/c/{community}/p/Vapok/{name}/"
                    metrics[name.lower()] = {
                        "downloads": dl,
                        "downloads_formatted": format_count(dl),
                        "thunderstore_url": pkg_url
                    }
                    total += dl
        print(f"[{community.upper()}] Fetched stats for {len(metrics)} Vapok mods (Total: {total:,})")
    except Exception as e:
        print(f"[{community.upper()}] Warning: Could not fetch Thunderstore API ({e}).")
    return metrics, total

def fetch_discord_metrics(invite_code="5YAJkRFBXt"):
    url = f"https://discord.com/api/v9/invites/{invite_code}?with_counts=true"
    result = {
        "member_count": "1.3K+",
        "member_count_raw": 1337,
        "presence_count": 350,
        "invite_url": f"https://discord.gg/{invite_code}"
    }
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            m = data.get("approximate_member_count", 0)
            p = data.get("approximate_presence_count", 0)
            if m > 0:
                result["member_count_raw"] = m
                result["member_count"] = format_count(m)
                result["presence_count"] = p
                print(f"[DISCORD] Fetched stats: {m:,} members ({p:,} online)")
    except Exception as e:
        print(f"[DISCORD] Warning: Could not fetch Discord API ({e}). Using default stats.")
    return result

def enable_kramdown_html_markdown(text):
    def div_repl(m):
        attrs = m.group(1)
        if 'markdown=' not in attrs:
            return f'<div{attrs} markdown="1">'
        return m.group(0)
    return re.sub(r'<div([^>]*?)>', div_repl, text, flags=re.IGNORECASE)

def sync():
    # Clean existing collection docs
    for old_file in os.listdir(MODS_DIR):
        if old_file.endswith(".md"):
            os.remove(os.path.join(MODS_DIR, old_file))

    total_all_downloads = 0
    processed_mods = []

    for game_cfg in GAME_CONFIGS:
        game_name = game_cfg["game"]
        category = game_cfg["category"]
        community = game_cfg["community"]
        releases_dir = game_cfg["releases_dir"]
        ts_api = game_cfg["ts_api"]

        if not os.path.exists(releases_dir):
            print(f"Skipping {game_name}: {releases_dir} does not exist.")
            continue

        ts_metrics, ts_total = fetch_thunderstore_metrics(community, ts_api)
        total_all_downloads += ts_total

        folders = sorted(os.listdir(releases_dir))

        for folder_name in folders:
            # Exclude SpikeHimself or non-Vapok releases
            if folder_name.lower() in ["xportal-vapok", "xportal"]:
                continue

            folder_path = os.path.join(releases_dir, folder_name)
            if not os.path.isdir(folder_path):
                continue

            manifest_path = os.path.join(folder_path, "manifest.json")
            readme_path = os.path.join(folder_path, "README.md")
            changelog_path = os.path.join(folder_path, "CHANGELOG.md")
            icon_path = os.path.join(folder_path, "icon.png")

            manifest = {}
            if os.path.exists(manifest_path):
                try:
                    with open(manifest_path, "r", encoding="utf-8-sig") as f:
                        manifest = json.load(f)
                except Exception as e:
                    print(f"Error reading manifest in {folder_name}: {e}")

            # Extract Clean Name
            raw_name = manifest.get("name")
            if not raw_name:
                # Remove prefix like Vapok- or suffix like -Vapok
                clean_fn = re.sub(r'^Vapok-|-Vapok$', '', folder_name)
                # Remove trailing version digits if any
                clean_fn = re.sub(r'-\d+\.\d+\.\d+.*$', '', clean_fn)
                raw_name = clean_fn

            version = manifest.get("version_number", "1.0.0")
            description = manifest.get("description", "").strip()
            website_url = manifest.get("website_url", f"https://github.com/Vapok/{raw_name}")
            dependencies = manifest.get("dependencies", [])

            slug = slugify(f"{category}-{raw_name}") if category != "valheim" else slugify(raw_name)
            mod_img_dir = os.path.join(ASSETS_IMG_DIR, slug)
            os.makedirs(mod_img_dir, exist_ok=True)

            # Copy Icon
            icon_rel_path = ""
            if os.path.exists(icon_path):
                dest_icon = os.path.join(mod_img_dir, "icon.png")
                shutil.copy2(icon_path, dest_icon)
                icon_rel_path = f"/assets/images/mods/{slug}/icon.png"

            # Read README
            readme_content = ""
            if os.path.exists(readme_path):
                with open(readme_path, "r", encoding="utf-8-sig", errors="replace") as f:
                    readme_content = enable_kramdown_html_markdown(f.read())

            # Read CHANGELOG
            changelog_content = ""
            if os.path.exists(changelog_path):
                with open(changelog_path, "r", encoding="utf-8-sig", errors="replace") as f:
                    changelog_content = enable_kramdown_html_markdown(f.read())

            # Check metrics
            mod_metrics = ts_metrics.get(raw_name.lower(), {})
            downloads_formatted = mod_metrics.get("downloads_formatted", "")
            ts_url = mod_metrics.get("thunderstore_url", f"https://thunderstore.io/c/{community}/p/Vapok/{raw_name}/")

            # Save changelog
            with open(os.path.join(CHANGELOGS_DIR, f"{slug}.md"), "w", encoding="utf-8") as cf:
                cf.write(changelog_content)

            # Save mod document in _mods/
            mod_file_path = os.path.join(MODS_DIR, f"{slug}.md")
            deps_yaml = "\n".join([f'  - "{d}"' for d in dependencies]) if dependencies else "  []"

            frontmatter = f"""---
layout: mod
title: "{raw_name}"
slug: "{slug}"
name: "{raw_name}"
game: "{game_name}"
category: "{category}"
version: "v{version}"
status: "ACTIVE"
badge_color: "mint"
website_url: "{website_url}"
thunderstore_url: "{ts_url}"
downloads: "{downloads_formatted}"
icon: "{icon_rel_path}"
description: {json.dumps(description)}
dependencies:
{deps_yaml}
has_changelog: {str(bool(changelog_content)).lower()}
---

{readme_content}
"""
            with open(mod_file_path, "w", encoding="utf-8") as mf:
                mf.write(frontmatter)

            print(f"  Synced: {raw_name} [{game_name}] (v{version}) [Downloads: {downloads_formatted or 'N/A'}]")
            processed_mods.append({
                "id": slug,
                "slug": slug,
                "name": raw_name,
                "game": game_name,
                "category": category,
                "version": f"v{version}",
                "status": "ACTIVE",
                "badge_color": "mint",
                "website_url": website_url,
                "thunderstore_url": ts_url,
                "downloads": downloads_formatted,
                "icon": icon_rel_path,
                "url": f"/mods/{slug}/",
                "description": description,
                "dependencies": dependencies
            })

    # Save to _data/mods.yml as fallback
    with open(os.path.join(DATA_DIR, "mods.yml"), "w", encoding="utf-8") as dmf:
        for mod in processed_mods:
            dmf.write(f"- id: \"{mod['id']}\"\n")
            dmf.write(f"  slug: \"{mod['slug']}\"\n")
            dmf.write(f"  name: \"{mod['name']}\"\n")
            dmf.write(f"  game: \"{mod['game']}\"\n")
            dmf.write(f"  category: \"{mod['category']}\"\n")
            dmf.write(f"  version: \"{mod['version']}\"\n")
            dmf.write(f"  status: \"{mod['status']}\"\n")
            dmf.write(f"  badge_color: \"{mod['badge_color']}\"\n")
            dmf.write(f"  website_url: \"{mod['website_url']}\"\n")
            dmf.write(f"  thunderstore_url: \"{mod['thunderstore_url']}\"\n")
            dmf.write(f"  downloads: \"{mod['downloads']}\"\n")
            dmf.write(f"  icon: \"{mod['icon']}\"\n")
            dmf.write(f"  url: \"{mod['url']}\"\n")
            dmf.write(f"  description: {json.dumps(mod['description'])}\n")
            if mod['dependencies']:
                dmf.write("  dependencies:\n")
                for dep in mod['dependencies']:
                    dmf.write(f"    - \"{dep}\"\n")
            else:
                dmf.write("  dependencies: []\n")
            dmf.write("\n")

    discord_stats = fetch_discord_metrics("5YAJkRFBXt")

    # Save overall stats to _data/stats.yml
    stats_data = {
        "total_downloads_raw": total_all_downloads,
        "total_downloads": format_count(total_all_downloads) if total_all_downloads > 0 else "1.0M+",
        "active_mods": len(processed_mods),
        "valheim_mods": len([m for m in processed_mods if m["category"] == "valheim"]),
        "techtonica_mods": len([m for m in processed_mods if m["category"] == "techtonica"]),
        "discord_members": discord_stats["member_count"],
        "discord_members_raw": discord_stats["member_count_raw"],
        "discord_online": discord_stats["presence_count"],
        "discord_invite": discord_stats["invite_url"]
    }

    with open(os.path.join(DATA_DIR, "stats.yml"), "w", encoding="utf-8") as sf:
        for k, v in stats_data.items():
            sf.write(f"{k}: \"{v}\"\n")

    print(f"\nSuccessfully synced {len(processed_mods)} mods across all games! Total Downloads: {stats_data['total_downloads']} | Discord: {stats_data['discord_members']}")

if __name__ == "__main__":
    sync()
