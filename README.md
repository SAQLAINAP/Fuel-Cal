# Fuel-Cal (RoadCost)

Fuel-Cal (a.k.a. RoadCost) is a small React + TypeScript app that estimates fuel requirements and trip costs for road journeys. It uses pre-defined vehicle data and route distances to produce quick, shareable cost estimates. The project is built with Vite, styled using TailwindCSS, and is deployable to GitHub Pages.

Demo: https://saqlainap.github.io/Fuel-Cal/

**Tech stack:** Vite, React, TypeScript, TailwindCSS

**Main features**
- **Fuel cost estimates**: Choose a vehicle and route to calculate litres required and total fuel cost.
- **Pre-built data**: Includes `cars.json`, `routes.json`, and `fuel-prices.json` under `src/data/`.
- **Simple, responsive UI**: Tailwind-powered components and lightweight SVG icons.
- **GitHub Pages deploy**: Scripts included to publish to the `gh-pages` branch.

**Quick Links**
- Source: repository root
- App entry: `src/main.tsx`
- Main UI: `src/App.tsx`
- Calculator: `src/components/FuelCalculator.tsx`
- Local icons: `src/components/icons/index.tsx`
- Data: `src/data/*.json`

**Table of contents**
- Installation
- Development
- Build & Deploy
- Project structure
- Data format
- Troubleshooting
- Contributing
- License

**Installation**

Prerequisites:
- Node.js (16+ recommended)
- npm

Install dependencies:

```powershell
npm ci
```

**Development**

Start the dev server (Vite):

```powershell
npm run dev
```

Open `http://localhost:5173` and the app will hot-reload while you edit files.

**Build & Deploy**

Production build:

```powershell
npm run build
```

Deploy to GitHub Pages (the project includes `gh-pages` tooling):

```powershell
npm run deploy
```

Notes about the scripts:
- `predeploy` now runs `npm run build` and `deploy` publishes the `dist` folder with `gh-pages -d dist`. This avoids platform-specific `rm`/`mv` commands and works on Windows.

GitHub Pages configuration options (pick one):
- Publish from `gh-pages` branch (recommended): `npm run deploy` publishes to the `gh-pages` branch and GitHub serves the site from there.
- Publish from `main:/docs`: If you prefer to serve directly from `main:/docs`, commit the `dist` contents into `docs/` before pushing. Keep in mind the repo must contain the built assets in `main:/docs` for that option.

Important Vite/GitHub Pages notes
- `vite.config.ts` includes `base: '/Fuel-Cal/'` so generated asset URLs are correct when the site is served from `https://<username>.github.io/Fuel-Cal/`.
- Client-side routes require `BrowserRouter` to use a `basename` when the site is hosted under a non-root path. This project sets `basename="/Fuel-Cal"` in `src/App.tsx`.

If you see 404s for assets after publishing, either:
- Use `gh-pages` branch as Pages source so `gh-pages -d dist` and `base` align, or
- Rebuild with a different `base` and republish to match your Pages configuration, or
- Use relative paths in the published `index.html` (the repo currently uses absolute `/Fuel-Cal/` base to match GH Pages).

**Project structure**

- `index.html` — app shell
- `src/main.tsx` — React entry
- `src/App.tsx` — Router and pages
- `src/components/FuelCalculator.tsx` — main calculator UI
- `src/components/icons/index.tsx` — small set of inline SVG icons (localized to avoid adblocker filename issues)
- `src/data/` — JSON datasets:
	- `cars.json` — array `cars` with fields: `car`, `mileage`, `fuel`, `transmission`, `engine`
	- `routes.json` — array `routes` with fields: `city1`, `city2`, `distance_km`
	- `fuel-prices.json` — mapping of fuel type to price (used to pre-fill fuel price input)
- `dist/` — production build (generated)
- `docs/` — alternate build target (if you publish from `main:/docs`)

**Data formats & how to extend**

- Add a new car to `src/data/cars.json` as:

```json
{
	"car": "Example Car",
	"mileage": "18.5",
	"fuel": "Petrol",
	"transmission": "Manual",
	"engine": "1200 cc"
}
```

- Add a new route entry to `src/data/routes.json` as:

```json
{
	"city1": "CityA",
	"city2": "CityB",
	"distance_km": 420
}
```

**Icons & adblocker note**
- The project originally used `lucide-react` icons. Some browsers/adblockers block network requests when icon filenames contain words like `fingerprint`. To avoid `net::ERR_BLOCKED_BY_CLIENT` we replaced those imports with local inline SVG components in `src/components/icons/index.tsx`.

If you want to re-enable `lucide-react`, update the icon imports and be aware some icons may cause adblockers to block requests in dev if the filename triggers heuristics.

**Troubleshooting**
- Blank page or missing assets after publishing:
	- Confirm `vite.config.ts` `base` matches GitHub Pages path (e.g. `/Fuel-Cal/`).
	- Confirm Pages source (Settings → Pages) points to the branch/folder you published (either `gh-pages` root, or `main` `/docs`).
	- Hard-refresh the browser (Ctrl+F5) to clear cached asset paths.
- `net::ERR_BLOCKED_BY_CLIENT` for an icon file: usually a browser extension blocking filenames containing `fingerprint`. Either whitelist `localhost` while developing or use local SVG icons (already done in this repo).

**CI / Auto-deploy (optional)**
You can add a GitHub Actions workflow to build and deploy automatically on push to `main`. Example workflow (place under `.github/workflows/deploy.yml`):

```yaml
name: Build and Deploy
on:
	push:
		branches: [ main ]
jobs:
	build-deploy:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- name: Setup Node
				uses: actions/setup-node@v4
				with:
					node-version: '18'
			- run: npm ci
			- run: npm run build
			- name: Deploy
				uses: peaceiris/actions-gh-pages@v3
				with:
					publish_dir: ./dist

```

**Contributing**
- Fix bugs or add vehicles/routes by editing files in `src/` and submitting a pull request.
- Keep data changes limited to the `src/data/*` JSON files and validate numeric fields (mileage, distance, prices).

**License**
- This repository contains a `LICENSE` file in the root. Make sure to check it for usage rights.

---
If you'd like, I can also:
- Add a GitHub Action to auto-deploy on push (I included a suggested `deploy.yml` above).
- Remove the `lucide-react` dependency from `package.json` if you're not using it.
- Commit and push the README changes for you.

Tell me which of those you'd like me to do next.
