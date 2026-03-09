import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      name: "vite-build-search-index",
      writeBundle: {
        order: "post",
        sequential: false,
        handler: async () => {
          // Dynamic import to avoid issues during dependency scanning
          const { buildAndCacheSearchIndex } = await import("./src/lib/build_index")
          console.log("Building search index...")
          await buildAndCacheSearchIndex()
        },
      },
    },
  ],
  optimizeDeps: {
    // Exclude problematic dependencies from pre-bundling during dev
    exclude: ["@supabase/auth-ui-svelte"],
  },
  server: {
    // Increase timeout for dependency optimization
    warmup: {
      clientFiles: [],
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    globals: true, /// allows to skip import of test functions like `describe`, `it`, `expect`, etc.
  },
})
