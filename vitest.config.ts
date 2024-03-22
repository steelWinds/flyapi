import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'url';

export default defineConfig({
	resolve: {
		alias: {
      'src': fileURLToPath(new URL('./src', import.meta.url)),
    },
	},
  test: {
    exclude: ['node_modules', 'dist/*', '*.config.*', 'docs/**/*'],
    include: ['./src/__tests__/**']
  },
})
