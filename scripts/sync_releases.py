#!/usr/bin/env python3
"""
Vapok Modding — Releases Synchronizer with Live Thunderstore Metrics
Synchronizes /home/vapok/Modding/Releases into Jekyll _mods collection,
fetches live downloads from Thunderstore API for author 'Vapok',
copies icons, extracts manifest metadata, READMEs, and CHANGELOGs.
"""

import os
import json
import re
import shutil
import urllib.request

RELEASES_DIR = "/home/vapok/Modding/Releases"
SITE_DIR = "/home/vapok/Modding/Vapok GitHub Pages/vapok.github.io"
MODS_DIR = os.path.join(SITE_DIR, "_mods")
DATA_DIR = os.path.join(SITE_DIR, "_data")
CHANGELOGS_DIR = os.path.join(SITE_DIR, "_includes", "changelogs")
ASSETS_IMG_DIR = os.path.join(SITE_DIR, "assets", "images", "mods")

os.makedirs(MODS_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(CHANGELOGS_DIR, exist_ok=True)
os.makedirs(ASSETS_IMG_DIR, exist_ok=True)

def slugify(text):
    return re.sub(r'[\s_]+', '-', re.sub(r'[^\w\s-]', '', text).strip().lower())

def format_count(count):
    if count >= 1_000_000:
        return f"{count / 1_000_000:.1f}M+"
    if count >= 1_000:
        return f"{count / 1_000:.1f}K+"
    return f"{count:,}"

def fetch_thunderstore_metrics():
    url = "https://thunderstore.io/c/valheim/api/v1/package/"
    metrics = {}
    total = 0
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "VapokModdingSync/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            for p in data:
                owner = (p.get("owner") or p.get("namespace") or "").strip()
                if owner.lower() == "vapok":
                    name = p.get("name", "")
                    dl = sum(v.get("downloads", 0) for v in p.get("versions", [])) or p.get("downloads", 0)
                    pkg_url = p.get("package_url") or f"https://valheim.thunderstore.io/package/Vapok/{name}/"
                    metrics[name.lower()] = {
                        "downloads": dl,
                        "downloads_formatted": format_count(dl),
                        "thunderstore_url": pkg_url
                    }
                    total += dl
        print(f"Successfully fetched Thunderstore stats for {len(metrics)} Vapok mods (Total: {total:,})")
    except Exception as e:
        print(f"Warning: Could not fetch Thunderstore API ({e}). Using existing/fallback stats.")
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
                print(f"Successfully fetched Discord stats: {m:,} members ({p:,} online)")
    except Exception as e:
        print(f"Warning: Could not fetch Discord API ({e}). Using default stats.")
    return result

def sync():
    if not os.path.exists(RELEASES_DIR):
        print(f"Releases directory not found at {RELEASES_DIR}")
        return

    ts_metrics, ts_total = fetch_thunderstore_metrics()

    folders = sorted(os.listdir(RELEASES_DIR))
    processed_mods = []

    # Clean existing _mods to prevent deleted releases from lingering
    for old_file in os.listdir(MODS_DIR):
        if old_file.endswith(".md"):
            os.remove(os.path.join(MODS_DIR, old_file))

    for folder_name in folders:
        # Exclude SpikeHimself or non-Vapok releases
        if folder_name.lower() in ["xportal-vapok", "xportal"]:
            continue

        folder_path = os.path.join(RELEASES_DIR, folder_name)
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

        # Extract Fields
        raw_name = manifest.get("name") or folder_name.replace("-Vapok", "")
        version = manifest.get("version_number", "1.0.0")
        description = manifest.get("description", "").strip()
        website_url = manifest.get("website_url", f"https://github.com/Vapok/{raw_name}")
        dependencies = manifest.get("dependencies", [])

        slug = slugify(raw_name)
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
                readme_content = f.read()

        # Fix Kramdown markdown inside HTML block tags (e.g. <div align="center">)
        def enable_kramdown_html_markdown(text):
            # Replace <div ...> with <div ... markdown="1"> if not already present
            def div_repl(m):
                attrs = m.group(1)
                if 'markdown=' not in attrs:
                    return f'<div{attrs} markdown="1">'
                return m.group(0)
            text = re.sub(r'<div([^>]*?)>', div_repl, text, flags=re.IGNORECASE)
            return text

        readme_content = enable_kramdown_html_markdown(readme_content)

        # Read CHANGELOG
        changelog_content = ""
        if os.path.exists(changelog_path):
            with open(changelog_path, "r", encoding="utf-8-sig", errors="replace") as f:
                changelog_content = enable_kramdown_html_markdown(f.read())

        # Check metrics
        mod_metrics = ts_metrics.get(raw_name.lower(), {})
        downloads_formatted = mod_metrics.get("downloads_formatted", "")
        ts_url = mod_metrics.get("thunderstore_url", f"https://valheim.thunderstore.io/package/Vapok/{raw_name}/")

        # Save changelog
        with open(os.path.join(CHANGELOGS_DIR, f"{slug}.md"), "w", encoding="utf-8") as cf:
            cf.write(changelog_content)

        # Save mod document
        mod_file_path = os.path.join(MODS_DIR, f"{slug}.md")
        deps_yaml = "\n".join([f'  - "{d}"' for d in dependencies]) if dependencies else "  []"

        frontmatter = f"""---
layout: mod
title: "{raw_name}"
slug: "{slug}"
name: "{raw_name}"
game: "Valheim"
category: "valheim"
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

        print(f"Synced mod: {raw_name} (v{version}) [Downloads: {downloads_formatted or 'N/A'}]")
        processed_mods.append({
            "id": slug,
            "slug": slug,
            "name": raw_name,
            "game": "Valheim",
            "category": "valheim",
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
        "total_downloads_raw": ts_total,
        "total_downloads": format_count(ts_total) if ts_total > 0 else "1.0M+",
        "active_mods": len(processed_mods),
        "target_game": "Valheim",
        "discord_members": discord_stats["member_count"],
        "discord_members_raw": discord_stats["member_count_raw"],
        "discord_online": discord_stats["presence_count"],
        "discord_invite": discord_stats["invite_url"]
    }

    with open(os.path.join(DATA_DIR, "stats.yml"), "w", encoding="utf-8") as sf:
        for k, v in stats_data.items():
            sf.write(f"{k}: \"{v}\"\n")

    print(f"\nSuccessfully synced {len(processed_mods)} Vapok mods! Total Downloads: {stats_data['total_downloads']} | Discord: {stats_data['discord_members']}")

if __name__ == "__main__":
    sync()
