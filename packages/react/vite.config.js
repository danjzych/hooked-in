import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
		include: ['src/**/*.{test,spec}.{js,ts}'],
		passWithNoTests: true,
		reporters: 'verbose',
	},
});
