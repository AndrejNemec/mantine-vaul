const pluginJs = require("@eslint/js");
const unusedImports = require("eslint-plugin-unused-imports");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const pluginReact = require("eslint-plugin-react");
const pluginReactHooks = require("eslint-plugin-react-hooks");

module.exports = [
  { ignores: ["dist"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        pragma: "React",
        fragment: "Fragment",
        version: "detect",
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      "react-hooks": pluginReactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/jsx-key": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      semi: "off",
      "@typescript-eslint/quotes": [
        "error",
        "single",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      quotes: "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/semi": ["error", "never"],
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "none",
            requireLast: true,
          },
          singleline: {
            delimiter: "comma",
            requireLast: true,
          },
          multilineDetection: "brackets",
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "react/prop-types": "off",
    },
  },
];
