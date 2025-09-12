import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  pluginVue.configs["flat/essential"],
  pluginJs.configs.recommended,
{
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: { globals: globals.browser },
},
  globalIgnores([
    "dist/**/*",
    "build/*.js",
    "config/*.js",
    "eslint.config.js"
  ]),
]);