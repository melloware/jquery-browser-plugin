/**
 * Browser detection result interface
 */
export interface BrowserDetection {
  // Browser flags
  msie?: boolean;
  webkit?: boolean;
  mozilla?: boolean;
  chrome?: boolean;
  safari?: boolean;
  opr?: boolean;
  opera?: boolean;
  msedge?: boolean;
  edge?: boolean;
  rv?: boolean;
  iemobile?: boolean;
  
  // Platform flags
  android?: boolean;
  blackberry?: boolean;
  cros?: boolean;
  ipad?: boolean;
  iphone?: boolean;
  ipod?: boolean;
  kindle?: boolean;
  linux?: boolean;
  mac?: boolean;
  playbook?: boolean;
  silk?: boolean;
  win?: boolean;
  "windows phone"?: boolean;
  bb?: boolean;
  
  // Classification flags
  mobile?: boolean;
  desktop?: boolean;
  
  // Metadata
  name: string;
  version: string;
  versionNumber: number;
  platform: string;
  
  // Function to match arbitrary user agents
  uaMatch: (ua?: string) => BrowserDetection;
}

/**
 * jQuery interface extension
 */
interface JQueryStatic {
  browser: BrowserDetection;
}

/**
 * Global window interface extension
 */
declare global {
  interface Window {
    jQBrowser: BrowserDetection;
    jQuery?: JQueryStatic;
  }
}

/**
 * Matches a user agent string and returns browser detection information
 * @param ua - Optional user agent string. If not provided, uses navigator.userAgent
 * @returns Browser detection object
 */
function uaMatch(ua?: string): BrowserDetection {
  // If an UA is not provided, default to the current browser UA.
  if (ua === undefined) {
    if (typeof window !== 'undefined' && window.navigator) {
      ua = window.navigator.userAgent;
    } else {
      ua = '';
    }
  }
  ua = ua.toLowerCase();

  const match =
    // Chromium Edge (Edg/EdgA/EdgIOS) - must come before Chrome to avoid false positives
    /(edg|edga|edgios)\/([\w.]+)/.exec(ua) ||
    // Legacy Edge (EdgeHTML) - must come before Chrome
    /(edge)\/([\w.]+)/.exec(ua) ||
    // Opera 15+ (OPR) - must come before Chrome
    /(opr)[\/]([\w.]+)/.exec(ua) ||
    // Chrome - must come before Safari
    /(chrome)[ \/]([\w.]+)/.exec(ua) ||
    // IE Mobile
    /(iemobile)[\/]([\w.]+)/.exec(ua) ||
    // Safari (with version) - specific pattern for Safari
    /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
    // Safari (alternative pattern)
    /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
    // WebKit (generic) - catch-all for WebKit browsers
    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
    // Opera (legacy Presto engine)
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
    // IE (legacy MSIE token)
    /(msie) ([\w.]+)/.exec(ua) ||
    // IE 11 (Trident engine with rv: token)
    (ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua)) ||
    // Firefox (Gecko engine, not compatible mode)
    (ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
    [];

  const platform_match =
    /(ipad)/.exec(ua) ||
    /(ipod)/.exec(ua) ||
    /(windows phone)/.exec(ua) ||
    /(iphone)/.exec(ua) ||
    /(kindle)/.exec(ua) ||
    /(silk)/.exec(ua) ||
    /(android)/.exec(ua) ||
    /(win)/.exec(ua) ||
    /(mac)/.exec(ua) ||
    /(linux)/.exec(ua) ||
    /(cros)/.exec(ua) ||
    /(playbook)/.exec(ua) ||
    /(bb)/.exec(ua) ||
    /(blackberry)/.exec(ua) ||
    [];

  const browser: BrowserDetection = {} as BrowserDetection;

  // Normalize new Chromium Edge naming
  const browserName =
    match[1] === "edg" ||
    match[1] === "edga" ||
    match[1] === "edgios"
      ? "msedge"
      : match[5] || match[3] || match[1] || "";

  const matched = {
    browser: browserName,
    version: match[2] || match[4] || "0",
    versionNumber: match[4] || match[2] || "0",
    platform: platform_match[0] || ""
  };

  if (matched.browser) {
    (browser as any)[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }

  if (matched.platform) {
    (browser as any)[matched.platform] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if (
    browser.android ||
    browser.bb ||
    browser.blackberry ||
    browser.ipad ||
    browser.iphone ||
    browser.ipod ||
    browser.kindle ||
    browser.playbook ||
    browser.silk ||
    browser["windows phone"]
  ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms
  if (browser.cros || browser.mac || browser.linux || browser.win) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  // Note: Modern Edge (Chromium) is also webkit-based
  if (browser.chrome || browser.opr || browser.safari || browser.msedge) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if (browser.rv || browser.iemobile) {
    const ie = "msie";
    matched.browser = ie;
    (browser as any)[ie] = true;
  }

  // Legacy Edge is officially known as Microsoft Edge, so rewrite the key
  if (browser.edge) {
    delete browser.edge;
    const msedge_legacy = "msedge";
    matched.browser = msedge_legacy;
    (browser as any)[msedge_legacy] = true;
  }

  // Opera 15+ (OPR) should normalize to "opera" for consistency
  if (browser.opr && matched.browser === "opr") {
    matched.browser = "opera";
    browser.opera = true;
  }

  // Platform-based browsers: if platform is detected and it's a browser platform,
  // use it as the browser name (Android, Kindle, Silk, BlackBerry, PlayBook)
  if (matched.platform) {
    const platformName = matched.platform.toLowerCase();
    if (
      platformName === "android" ||
      platformName === "kindle" ||
      platformName === "silk" ||
      platformName === "blackberry" ||
      platformName === "playbook"
    ) {
      // Only override if we haven't already set a specific browser name
      // (e.g., don't override Chrome on Android)
      if (
        matched.browser === "safari" ||
        matched.browser === "webkit" ||
        (!matched.browser || matched.browser === "")
      ) {
        matched.browser = platformName;
        (browser as any)[platformName] = true;
      }
    }
  }

  // BB10 platform should normalize to blackberry browser name
  if (browser.bb && !browser.blackberry) {
    browser.blackberry = true;
    matched.browser = "blackberry";
  }

  // Assign name & platform
  browser.name = matched.browser;
  browser.platform = matched.platform;

  // Add uaMatch function to the browser object
  browser.uaMatch = uaMatch;

  return browser;
}

/**
 * Factory function for module systems (AMD, CommonJS, Browser globals)
 */
function factory(jQuery?: JQueryStatic): BrowserDetection {
  // Run the matching process, also assign the function to the returned object
  // for manual, jQuery-free use if desired
  if (typeof window !== 'undefined') {
    window.jQBrowser = uaMatch(window.navigator.userAgent);
    window.jQBrowser.uaMatch = uaMatch;

    // Only assign to jQuery.browser if jQuery is loaded
    if (jQuery) {
      jQuery.browser = window.jQBrowser;
    }

    return window.jQBrowser;
  } else {
    // Node.js environment
    const browser = uaMatch();
    browser.uaMatch = uaMatch;
    return browser;
  }
}

// Declare AMD and CommonJS globals for TypeScript
declare const define: {
  (deps: string[], factory: (...args: any[]) => any): void;
  amd?: boolean;
} | undefined;

declare const module: {
  exports: any;
} | undefined;

declare function require(id: string): any;

// UMD wrapper - matches original pattern exactly
// Only execute in non-ES module environments (browser, AMD, CommonJS)
// In ES module environments, exports are handled by the export statements below
(function (factoryFunc: (jQuery?: JQueryStatic) => BrowserDetection) {
  // Check if we're in an ES module environment
  // In ES modules, module.exports might be read-only, so we check for that
  const isESModule = typeof module !== 'undefined' && module.exports && 
    Object.getOwnPropertyDescriptor && 
    Object.getOwnPropertyDescriptor(module, 'exports')?.writable === false;
  
  if (!isESModule) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], function ($: JQueryStatic) {
        return factoryFunc($);
      });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
      // CommonJS environment
      try {
        module.exports = factoryFunc(require('jquery'));
      } catch (e) {
        // If require fails or module.exports is read-only, just execute factory for browser
        factoryFunc(typeof window !== 'undefined' ? (window as any).jQuery : undefined);
      }
    } else {
      // Browser globals
      factoryFunc(typeof window !== 'undefined' ? (window as any).jQuery : undefined);
    }
  }
}(factory));

// Export for ES modules and TypeScript (for development/testing)
export { uaMatch, factory };
export default factory;

