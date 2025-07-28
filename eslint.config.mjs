import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort"; // <-- Add this import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Core Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Accessibility rules
  ...compat.extends("plugin:jsx-a11y/recommended", "plugin:jsx-a11y/strict"),

  // Plugin registration + custom rule overrides
  {
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Perceivable
      "jsx-a11y/alt-text": [
        "error",
        {
          elements: ["img", "object", "area", "input[type='image']"],
          img: ["Image"],
          object: ["Object"],
          area: ["Area"],
          "input[type='image']": ["InputImage"],
        },
      ],
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          assert: "both",
          controlComponents: [],
          labelAttributes: ["htmlFor"],
        },
      ],
      "jsx-a11y/color-contrast": ["warn", { threshold: 4.5 }],

      // Operable
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/no-noninteractive-tabindex": "error",
      "jsx-a11y/no-noninteractive-element-interactions": [
        "error",
        {
          handlers: ["onClick", "onKeyUp", "onKeyDown"],
        },
      ],
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          aspects: ["noHref", "invalidHref", "preferButton"],
        },
      ],

      // Understandable
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": ["error", { ignoreNonDom: false }],

      // Robust
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/no-aria-hidden-on-focusable": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];

export default eslintConfig;
