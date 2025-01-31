import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),
    {
        languageOptions: {
            ecmaVersion: "latest", // Supports the latest ECMAScript version
            sourceType: "module", // Use ES Modules
            globals: {
                console: "readonly", // Allows `console` without modification
                process: "readonly", // Allows `process` without modification
                __dirname: "readonly", // Include other Node.js globals if needed
                __filename: "readonly",
                module: "readonly",
                require: "readonly",
            },
        },
        rules: {
            semi: ["error", "always"], // Enforce semicolons
            indent: ["error", 4], // Enforce 4 spaces for indentation
            "no-unused-vars": "warn", // Warn on unused variables
            "no-undef": "error", // Error on undefined variables
            "no-console": "off", // Allow console statements
        },
    },
];
