import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { "@": path.resolve(root, "src") } },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: ["src/built-output.test.ts", "node_modules/**"],
  },
});
