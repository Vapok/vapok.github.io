# Vapok Modding - GitHub Pages Site

This repository contains the source code for the **Vapok Modding** official GitHub Pages site ([vapok.github.io](https://vapok.github.io)), built with [Jekyll](https://jekyllrb.com/) and styled with the **Midnight** theme.

---

## 📂 Site Structure

- `_config.yml` &mdash; Jekyll configuration file (site title, description, theme, navigation).
- `index.md` &mdash; Home page welcoming visitors to Vapok Modding.
- `terms-of-service.md` &mdash; Terms of Service page covering game mod usage, disclaimers, and IP rights.
- `privacy-policy.md` &mdash; Privacy Policy page covering data privacy and hosting terms.
- `.github/workflows/jekyll-gh-pages.yml` &mdash; GitHub Actions workflow for automatic deployment.

---

## 🚀 How Deployment Works (GitHub Pages)

You don't need to manually build HTML files! Everything is handled automatically by GitHub:

1. **Commit and Push**: Any time you push changes to the `main` branch, GitHub Actions automatically triggers the workflow defined in `.github/workflows/jekyll-gh-pages.yml`.
2. **Automatic Build**: GitHub builds the Jekyll site using your `_config.yml` settings and Markdown files.
3. **Live Site**: Within 1-2 minutes, your updated site goes live at `https://vapok.github.io`.

### GitHub Repository Settings Check
Make sure GitHub Pages is configured properly in your repository on GitHub:
1. Go to your repository on GitHub: `https://github.com/<your-username>/vapok.github.io`
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, ensure **GitHub Actions** is selected.

---

## 🛠️ How to Install and Run Jekyll Locally (Optional)

If you want to test and preview your site on your local computer before pushing changes to GitHub:

### 1. Prerequisites (Linux / Ubuntu / Debian)
Install Ruby and development tools:
```bash
sudo apt update
sudo apt install build-essential ruby-full zlib1g-dev
```

Configure Gem installation directory (no root required):
```bash
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Install Bundler and Jekyll:
```bash
gem install jekyll bundler
```

### 2. Install Project Dependencies
In this repository directory, run:
```bash
bundle install
```

### 3. Run Local Server
Start the Jekyll local development server:
```bash
bundle exec jekyll serve
```
Open your browser and navigate to `http://localhost:4000` to preview your site live as you edit!