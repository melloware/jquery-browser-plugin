/**
 * Vitest setup file
 * Configures jsdom environment for browser testing
 */
import { vi } from 'vitest';

// Mock window.navigator for tests that need it
if (typeof window !== 'undefined' && !window.navigator) {
  (window as any).navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  };
}

