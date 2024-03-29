import * as path from "path";
import { PluginOption, defineConfig } from "vite";
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
  plugins: [
    peerDepsExternal({ includeDependencies: true }) as PluginOption,
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "ooui",
      formats: ["es"],
      fileName: (format) => `powerpjs.${format}.js`,
    },
  },
});
