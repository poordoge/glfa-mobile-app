# GitHub Repository Setup Instructions

This document provides step-by-step instructions to push the GLFA mobile app code to GitHub.

## Option 1: Create a New Repository on GitHub (Recommended)

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Sign in with your GitHub account (or create one at https://github.com/signup)
3. Fill in the repository details:
   - **Repository name:** `glfa-mobile-app`
   - **Description:** "Golden Lion Football Academy Mobile App - React Native + Expo"
   - **Visibility:** Public (recommended for open source) or Private
   - **Initialize repository:** Leave unchecked (we already have code)
4. Click "Create repository"

### Step 2: Add Remote and Push Code

Copy the repository URL from GitHub (e.g., `https://github.com/sieksovann/glfa-mobile-app.git`)

Then run these commands on your local machine:

```bash
cd /path/to/glfa-mobile-app

# Add the remote repository
git remote add origin https://github.com/sieksovann/glfa-mobile-app.git

# Rename branch to main (if needed)
git branch -M main

# Push all code to GitHub
git push -u origin main
```

### Step 3: Verify on GitHub

1. Go to https://github.com/sieksovann/glfa-mobile-app
2. Verify all files are present
3. Check that BUILD_GUIDE.md and README_GITHUB.md are visible

---

## Option 2: Using GitHub CLI (Faster)

If you have GitHub CLI installed:

```bash
# Install GitHub CLI (if not already installed)
# macOS: brew install gh
# Windows: choco install gh
# Linux: https://github.com/cli/cli/releases

# Authenticate with GitHub
gh auth login

# Create and push repository
cd /path/to/glfa-mobile-app
gh repo create glfa-mobile-app --public --source=. --remote=origin --push
```

---

## Repository Structure on GitHub

After pushing, your GitHub repository will contain:

```
glfa-mobile-app/
├── README_GITHUB.md          # Main project documentation
├── BUILD_GUIDE.md            # Comprehensive build instructions
├── GITHUB_SETUP.md           # This file
├── app/                      # App screens and routing
├── components/               # Reusable components
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and configuration
├── locales/                  # Translation files (EN, KH, CN)
├── assets/                   # Images and icons
├── app.config.ts             # Expo configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── theme.config.js           # Theme configuration
└── .gitignore                # Git ignore rules
```

---

## Sharing the Repository

Once the repository is on GitHub, you can share it:

### Public Repository Link
```
https://github.com/sieksovann/glfa-mobile-app
```

### Clone Command for Others
```bash
git clone https://github.com/sieksovann/glfa-mobile-app.git
```

### For Collaboration
1. Go to repository Settings → Collaborators
2. Add team members by their GitHub username
3. They can then clone and contribute

---

## Next Steps

### For Building the App

1. Clone the repository
2. Follow instructions in [BUILD_GUIDE.md](./BUILD_GUIDE.md)
3. Build APK and IPA files using EAS

### For Continuous Integration (Optional)

You can set up GitHub Actions to automatically build the app on every push:

1. Create `.github/workflows/build.yml`
2. Configure EAS build workflow
3. Automatic builds on every commit

Example workflow file:
```yaml
name: EAS Build
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install -g eas-cli
      - run: eas build --platform android --non-interactive
```

---

## Troubleshooting

### "Permission denied (publickey)"

**Solution:**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add SSH key to GitHub
# https://github.com/settings/keys
```

### "fatal: not a git repository"

**Solution:**
```bash
cd /path/to/glfa-mobile-app
git init
git add .
git commit -m "Initial commit"
```

### "remote already exists"

**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/sieksovann/glfa-mobile-app.git
```

---

## Resources

- **GitHub Documentation:** https://docs.github.com/
- **Git Documentation:** https://git-scm.com/doc
- **GitHub CLI:** https://cli.github.com/
- **GitHub SSH Setup:** https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

**Last Updated:** February 28, 2026
