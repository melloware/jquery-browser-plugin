/**
 * Test helper to expose uaMatch function from the built dist file
 */
import type { BrowserDetection } from '../src/jquery.browser.d.ts';

// Import the built dist file - it exports via CommonJS
const jQBrowser = require('../dist/jquery.browser.js') as BrowserDetection;

// Wrap uaMatch to ensure the returned browser object has uaMatch attached (for test compatibility)
const originalUaMatch = jQBrowser.uaMatch;
export function uaMatch(ua?: string): BrowserDetection {
  const browser = originalUaMatch(ua);
  // Attach uaMatch to the returned browser object for test compatibility
  browser.uaMatch = uaMatch;
  return browser;
}

export type { BrowserDetection } from '../src/jquery.browser.d.ts';
