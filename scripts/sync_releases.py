#!/usr/bin/env python3
"""
Vapok Modding — Releases Synchronizer
Synchronizes /home/vapok/Modding/Releases into Jekyll _mods collection,
copies icons, extracts manifest metadata, READMEs, and CHANGELOGs.
"""

import os
import json
import re
import shutil

RELEASES_DIR = "/home/vapok/Modding/Releases"
SITE_DIR = "/home/vapok/Modding/Vapok GitHub Pages/vapok.github.io"
MODS_DIR = os.path.join(SITE_DIR, "_mods")
ASSETS_IMG_DIR = os.path.join(SITE_DIR, "assets", "images", "mods")

os.makedirs(MODS_DIR, exist_ok=True)
os.makedirs(ASSETS_IMG_DIR, exist_ok=True)

def slugify(text):
    return re.sub(r'[\s_]+', '-', re.sub(r'[^\w\s-]', '', text).strip().lower())

def sync():
    if not os.path.exists(RELEASES_DIR):
        print(f"Releases directory not found at {RELEASES_DIR}")
        return

    folders = sorted(os.listdir(RELEASES_DIR))
    processed_mods = []

    for folder_name in folders:
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

        # Read CHANGELOG
        changelog_content = ""
        if os.path.exists(changelog_path):
            with open(changelog_path, "r", encoding="utf-8-sig", errors="replace") as f:
                changelog_content = f.read()

        # Escape potential triple dashes or liquid tags inside README/CHANGELOG if any
        # Format markdown page for Jekyll collection
        mod_file_path = os.path.join(MODS_DIR, f"{slug}.md")

        # Create frontmatter
        deps_yaml = "\n".join([f'  - "{d}"' for d in dependencies]) if dependencies else "  []"
        
        # Save changelog to _includes/changelogs for dynamic rendering
        changelog_file_path = os.path.join(SITE_DIR, "_includes", "changelogs")
        os.makedirs(changelog_file_path, exist_ok=True)
        with open(os.path.join(changelog_file_path, f"{slug}.md"), "w", encoding="utf-8") as cf:
            cf.write(changelog_content)

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

        print(f"Synced mod: {raw_name} -> {mod_file_path}")
        processed_mods.append({
            "name": raw_name,
            "slug": slug,
            "version": version
        })

    print(f"\nSuccessfully synced {len(processed_mods)} mods from Releases!")

if __name__ == "__main__":
    sync()
