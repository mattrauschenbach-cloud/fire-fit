import reactRefresh from 'eslint-plugin-react-refresh'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { files: ['**/*.{js,ts,tsx}'],
    languageOptions: { ecmaVersion: 2020, sourceType: 'module' },
    plugins: { 'react-refresh': reactRefresh, 'react-hooks': reactHooks },
    rules: { 'react-refresh/only-export-components': 'warn', 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'warn' }
  }
]
