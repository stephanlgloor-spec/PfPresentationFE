import { defineConfig } from 'vitest/config';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [await tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'test/setupTests.ts',
    include: ['test/**/*.spec.ts'],
    // Allow switching coverage reporters via COVERAGE_REPORTER env var
    // coverage: {
    //   provider: 'v8',
    //   reporter: coverageReporters,
    //   reportsDirectory: coverageDir,
    // },
    // Allow switching reporters (e.g. "default", "verbose", "junit") via env var
    // reporters: vitestReporters as any,
  },
  css: undefined,

});
