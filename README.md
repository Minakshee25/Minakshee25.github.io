# Minakshee Narayankar — Portfolio

Static portfolio website designed for **GitHub Pages**. No Node.js, React, package manager, or build process is required.

## Local preview

For a full local preview (recommended because the site uses relative asset paths):

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/> in your browser. Run the command inside the repository folder.

## Website structure

- `index.html` — page content, project data, and recommendation excerpts.
- `assets/css/styles.css` — all site styles. CSS order is preserved from the approved Version 33.
- `assets/js/main.js` — navigation, projects, theme toggle, and recommendation animation.
- `assets/images/` — original embedded images, SVG illustrations, university and company logos, reviewer photos, and portrait. Images were **extracted losslessly**, not resized or recompressed.
- `.nojekyll` — ensures GitHub Pages serves all files as static assets.

## Publishing

1. Create a **public** GitHub repository named exactly `Minakshee25.github.io` under your GitHub account `Minakshee25`.
2. Upload this folder's **contents** into the root of the repository (not a second nested folder) and commit to `main`.
3. Open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select `main`, `/ (root)`, and Save.
4. Visit <https://minakshee25.github.io/> after deployment completes.

Your repository and published site will be public. Review all text, images, links, and contact details before publishing.

## Make later changes

```bash
git clone https://github.com/Minakshee25/Minakshee25.github.io.git
cd Minakshee25.github.io
# edit files, preview the site, then:
git add .
git commit -m "Update portfolio"
git push origin main
```

To get the latest remote changes on another computer:

```bash
git pull origin main
```

GitHub Pages automatically publishes after a push to the configured branch.

## Notes

This package retains Version 33's content and interaction logic; it only restructures the source into individual files and updates the browser tab title to remove an old version label. If you edit the project list or quote data in `index.html`, keep the JSON valid and preserve existing element IDs.
