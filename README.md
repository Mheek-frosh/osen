# Osen' Luxe

React and Vite storefront for Osen' Luxe — Elegant · Heritage · Luxury.

## Local development

```bash
npm install
npm run dev
```

## Production check

```bash
npm ci
npm run build
```

The production output is generated in `dist/`. Do not commit `node_modules/` or `dist/`; Vercel installs dependencies from `package-lock.json` and runs the build automatically.

## Deploying with Vercel

1. Commit and push the repository to GitHub.
2. Import the GitHub repository into Vercel.
3. Keep the detected framework as **Vite**.
4. Vercel will run `npm run build` and publish `dist/`.

The included `vercel.json` sends direct React routes such as `/shop`, `/cart`, and `/product/:id` to `index.html` while Vercel continues to serve static assets normally.
