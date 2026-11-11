# Vice City — OneScan360 Adaptive Experience & Review Engine

A luxury, intent-driven customer landing page and 1-tap Google Review generation engine built for **Vice City**.

## 🚀 Quick Start

Run locally with zero build steps:
```bash
# Start development server
npm run dev
# or
npx serve . -l 3000
```
Then open `http://localhost:3000` in your browser.

## 📁 Key File Map

- **`index.html`**: The entire self-contained app (single-file architecture).
  - Look for `STORE_CONFIG` (around line 1980) to update business name, Google Review link, address, phone, and WhatsApp.
  - Look for `SERVICE_HIGHLIGHT_LIBRARY` to customize services and dynamic review chips.
- **`ONESCAN360_BLUEPRINT_AND_REPLICATION_GUIDE.md`**: Complete architectural reference manual, UX logic diagrams, and customization checklist.
- **`assets/images/`**: Brand assets, storefront banners, logos, and gallery images.
- **`netlify.toml`**: Zero-configuration deployment config for Netlify.

## 🛠️ Customization Blueprint

When ready to tailor for Vice City:
1. Update `STORE_CONFIG` in `index.html`.
2. Swap service catalog and highlight library.
3. Replace photos in `assets/images/`.
4. Deploy to Netlify / Vercel with 1 click.
