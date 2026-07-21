# Osen' Luxe product CMS

The storefront is ready to read published products from Sanity. Until the CMS is configured, it safely uses the existing local catalog.

## 1. Create the Sanity project

1. Create an account at https://www.sanity.io/manage.
2. Create a project named `Osen Luxe` with a `production` dataset.
3. Copy the project ID from the project settings.

## 2. Connect the product-management Studio

Requires Node.js 22.12 or newer.

```powershell
cd studio
Copy-Item .env.example .env
```

Edit `studio/.env` and replace `your_project_id`, then run:

```powershell
npm install
npm run dev
```

Open the URL shown by Sanity, sign in, and select **Products**.

## 3. Connect the storefront

From the project root:

```powershell
Copy-Item .env.example .env
```

Set the same project ID in the root `.env`, then add these CORS origins in **Sanity Manage → API → CORS Origins**:

- `http://localhost:5173`
- Your deployed website URL, such as `https://your-site.vercel.app`

Restart the storefront after changing environment variables:

```powershell
npm run dev
```

For Vercel, add `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and `VITE_SANITY_API_VERSION` under **Project Settings → Environment Variables**, then redeploy.

## Daily product workflow

- **Add:** Products → Create → Product, complete every required field, generate the Product URL, then Publish.
- **Edit:** Open a product, change fields, then Publish.
- **Temporarily hide:** Turn off **Visible on storefront**, then Publish.
- **Remove:** Open the product menu and choose Delete. Hiding is safer if the product may return.
- **Reorder:** Set **Display order**; lower numbers appear first.
- **Replace an image:** Open the image field, upload/crop the new image, then Publish.

Only published documents with **Visible on storefront** enabled appear on the website. If the CMS cannot be reached, the storefront retains the bundled local catalog instead of becoming empty.

## Deploy the Studio

After confirming it works locally:

```powershell
cd studio
npm run deploy
```

Sanity will ask for a Studio hostname. Bookmark that `*.sanity.studio` address; it is the secure login used to manage products.
