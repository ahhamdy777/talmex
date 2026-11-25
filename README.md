# TALMEX website (installable app)

Static bilingual site. Opens in **English** by default; the العربية button switches, and the
choice is remembered on that device.

## Publish on GitHub Pages
1. Create a public repository, e.g. `talmex`.
2. Upload everything in this folder (index.html, manifest.webmanifest, sw.js, assets/) to the repo root.
3. Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / root → Save.
4. After ~1 minute the site is live at `https://<your-username>.github.io/talmex/`.

## Install as an app
The site is a PWA (manifest + service worker), so it must be served over **https** –
GitHub Pages is fine; opening index.html from a USB stick is not.

- **Chrome / Edge (Android, Windows, Mac):** an "Install app" button appears in the header,
  plus a bar at the bottom. Chrome also shows an install icon in the address bar.
- **iPhone / iPad (Safari):** Share → Add to Home Screen. The site shows these steps when tapped.
- Once installed it opens in its own window with the TALMEX icon, no browser bar, and works
  offline (pages and images are cached by sw.js).

## After you change the site
Edit `index.html`, then bump the cache name in `sw.js` (`talmex-v4` → `talmex-v5`) so installed
copies pick up the new version.
