import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        collections: resolve(__dirname, 'collections.html'),
        search: resolve(__dirname, 'search.html'),
        product: resolve(__dirname, 'product.html'),
        cart: resolve(__dirname, 'cart.html'),
        checkout: resolve(__dirname, 'checkout.html')
      }
    }
  }
});
