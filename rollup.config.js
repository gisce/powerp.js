import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json");

export default {
  input: "lib/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: "inline",
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: "inline",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ preferBuiltins: true }),
    commonjs(),
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: ["/spec/**/*.spec.ts"],
      },
    }),
    terser(),
  ],
};
