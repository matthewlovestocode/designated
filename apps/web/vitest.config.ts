import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    coverage: {
      exclude: [
        "**/*.d.ts",
        "**/.next/**",
        "**/node_modules/**",
        "**/test/**",
        "app/layout.tsx",
        "app/theme-provider.tsx",
        "next.config.ts"
      ],
      include: ["app/components/**/*.{ts,tsx}"],
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "./coverage"
    },
    css: false,
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"]
  }
});
