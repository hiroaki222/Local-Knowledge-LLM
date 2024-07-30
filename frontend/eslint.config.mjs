import pluginJs from '@eslint/js'
import gitignore from 'eslint-config-flat-gitignore'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tailwind from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('typescript-eslint').Config}  */
export default [
  gitignore(),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  perfectionist.configs['recommended-natural'],
  ...tailwind.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
]
