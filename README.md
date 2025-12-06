[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/@melloware%2Fjquery.browser.svg)](https://badge.fury.io/js/@melloware%2Fjquery.browser)
![NPM Downloads](https://img.shields.io/npm/dm/@melloware%2Fjquery.browser?color=purple)

# jQuery Browser Plugin

A jQuery plugin for browser detection. jQuery v1.9.1 dropped support for browser detection, and this project aims to keep the detection up-to-date. Now written in TypeScript with full type definitions and modern browser support including MS Edge.

## Installation

### NPM

```bash
npm install @melloware/jquery.browser
```

### Browser

Include script *after* the jQuery library:

```html
<script src="/path/to/jquery.browser.js"></script>
```

Alternatively, you can use the plugin without jQuery by using the global object `jQBrowser` instead of `$.browser`.

## Usage

### JavaScript

Returns true if the current useragent is some version of Microsoft's Edge browser. Supports both legacy and Chromium based edge)

```javascript
$.browser.msedge;
```

Returns true if the current useragent is some version of a WebKit browser (Safari, Chrome, Opera 15+, and Chromium Edge)

```javascript
$.browser.webkit;
```

Returns true if the current useragent is some version of Firefox

```javascript
$.browser.mozilla;
```

Reading the browser version

```javascript
$.browser.version
```

You can also examine arbitrary useragents

```javascript
jQBrowser.uaMatch("Mozilla/5.0...");
```

### TypeScript

The plugin includes full TypeScript type definitions:

```typescript
import { BrowserDetection, uaMatch } from '@melloware/jquery.browser';

// Use with jQuery
if ($.browser.chrome) {
  console.log(`Chrome version: ${$.browser.version}`);
}

// Use standalone
const browser = window.jQBrowser;
if (browser.msedge) {
  console.log('Microsoft Edge detected');
}

// Match arbitrary user agent
const detection = uaMatch("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...");
console.log(detection.name); // "msedge"
```

## Browser Detection Features

### Browser Detection

The plugin detects the following browsers:
- Chrome
- Firefox (mozilla)
- Safari
- Internet Explorer (msie) - including IE 11
- Microsoft Edge (msedge) - both Legacy EdgeHTML and Chromium-based Edge
- Opera (both Presto and Chromium-based)

### Platform Detection

Detect specifically Windows, Mac, Linux, iPad, iPhone, iPod, Android, Kindle, BlackBerry, Chrome OS, and Windows Phone useragents:

```javascript
$.browser.android
$.browser.blackberry
$.browser.cros
$.browser.ipad
$.browser.iphone
$.browser.ipod
$.browser.kindle
$.browser.linux
$.browser.mac
$.browser.msedge
$.browser.playbook
$.browser.silk
$.browser.win
$.browser["windows phone"]
```

### Device Classification

Alternatively, you can detect for generic classifications such as desktop or mobile:

```javascript
$.browser.desktop
$.browser.mobile
```

```javascript
// User Agent for Firefox on Windows
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0

$.browser.desktop // Returns true as a boolean
```

```javascript
// User Agent for Safari on iPhone
User-Agent: Mozilla/5.0(iPhone; CPU iPhone OS 7_0_3 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B508 Safari/9537.53

$.browser.mobile // Returns true as a boolean
```

### Version Detection

Detect the browser's major version:

```javascript
// User Agent for Chrome
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36

$.browser.versionNumber // Returns 32 as a number
$.browser.version // Returns "32.0.1664.3" as a string
```

## Features

- Support for new useragent on IE 11
- Support for Microsoft Edge (both Legacy EdgeHTML and Chromium-based)
- Support for WebKit based Opera browsers
- Written in TypeScript with full type definitions
- Modern build system using esbuild
- Comprehensive test suite using Vitest

## Development

### Prerequisites

- Node.js >= 20.0.0
- npm

### Building

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions (`.d.ts` files)
- Create IIFE bundle for browser use
- Generate minified version

The build outputs are placed in the `dist/` directory:
- `dist/jquery.browser.js` - Main bundle (IIFE format)
- `dist/jquery.browser.min.js` - Minified bundle
- `dist/jquery.browser.d.ts` - TypeScript type definitions
- `dist/jquery.browser.d.ts.map` - Source map for types

### Type Checking

Run TypeScript type checking without emitting files:

```bash
npm run type-check
```

### Testing

The plugin uses [Vitest](https://vitest.dev/) for testing. All tests run in a Node.js environment with jsdom for browser API simulation.

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

The test suite covers:
- All major browsers (Chrome, Firefox, Safari, IE, Edge, Opera)
- All platforms (Windows, Mac, Linux, mobile platforms)
- Browser version detection
- Platform detection
- Mobile/desktop classification
- Custom user agent matching

### Project Structure

```
├── src/
│   └── jquery.browser.ts    # TypeScript source
├── dist/
│   ├── jquery.browser.js     # Compiled IIFE bundle
│   ├── jquery.browser.min.js # Minified bundle
│   ├── jquery.browser.d.ts   # Type definitions
│   └── jquery.browser.d.ts.map # Type definition source map
├── test/
│   ├── jquery.browser.test.ts # Vitest test suite
│   └── setup.ts               # Test setup
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest configuration
├── package.json
└── README.md
```

## Publishing

### Pre-publish Checklist

Before publishing, ensure:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Verify package contents:**
   ```bash
   npm pack --dry-run
   ```
   This shows what files will be included in the published package.

4. **Check version number:**
   - Update version in `package.json` if needed
   - Update version in build script banners if needed

### Publishing to npm

## Publishing

Adjust the version in the `package.json` if necessary and commit files.
Then simply "Publish a Release" and the workflow will handle publishing to NPM.

Visit https://www.npmjs.com/package/@melloware/jquery.browser to confirm the package is published.

## Browser Support

The plugin supports detection for:
- Chrome (all versions)
- Firefox (all versions)
- Safari (all versions)
- Internet Explorer (IE 6-11)
- Microsoft Edge (Legacy EdgeHTML and Chromium-based)
- Opera (Presto and Chromium-based)
- Mobile browsers (Android, iOS Safari, Windows Phone)
- Other browsers (Kindle, Silk, BlackBerry)

## Contributing

- Source hosted at [GitHub](https://github.com/gabceb/jquery-browser-plugin)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/gabceb/jquery-browser-plugin/issues)

## License

MIT

## Attributions

- [Examples and original implementation](http://api.jquery.com/jQuery.browser/)
- [Original Gist used for the plugin](https://gist.github.com/adeelejaz/4714079)
- Original plugin by Gabriel Cebrian
- Modernized by Melloware
