/*!\n * jQuery Browser Plugin \n * https://github.com/melloware/jquery-browser-plugin\n *\n * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors\n * http://jquery.org/license\n *\n * Modifications Copyright 2015 Gabriel Cebrian, 2025 Melloware\n * https://github.com/melloware\n *\n * Released under the MIT license\n */
"use strict";
var jQBrowser = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/jquery.browser.ts
  var jquery_browser_exports = {};
  __export(jquery_browser_exports, {
    default: () => jquery_browser_default,
    factory: () => factory,
    uaMatch: () => uaMatch
  });
  function uaMatch(ua) {
    if (ua === void 0) {
      if (typeof window !== "undefined" && window.navigator) {
        ua = window.navigator.userAgent;
      } else {
        ua = "";
      }
    }
    ua = ua.toLowerCase();
    const match = (
      // Chromium Edge (Edg/EdgA/EdgIOS) - must come before Chrome to avoid false positives
      /(edg|edga|edgios)\/([\w.]+)/.exec(ua) || // Legacy Edge (EdgeHTML) - must come before Chrome
      /(edge)\/([\w.]+)/.exec(ua) || // Opera 15+ (OPR) - must come before Chrome
      /(opr)[\/]([\w.]+)/.exec(ua) || // Chrome - must come before Safari
      /(chrome)[ \/]([\w.]+)/.exec(ua) || // IE Mobile
      /(iemobile)[\/]([\w.]+)/.exec(ua) || // Safari (with version) - specific pattern for Safari
      /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || // Safari (alternative pattern)
      /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || // WebKit (generic) - catch-all for WebKit browsers
      /(webkit)[ \/]([\w.]+)/.exec(ua) || // Opera (legacy Presto engine)
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || // IE (legacy MSIE token)
      /(msie) ([\w.]+)/.exec(ua) || // IE 11 (Trident engine with rv: token)
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || // Firefox (Gecko engine, not compatible mode)
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || []
    );
    const platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) || /(kindle)/.exec(ua) || /(silk)/.exec(ua) || /(android)/.exec(ua) || /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/.exec(ua) || /(playbook)/.exec(ua) || /(bb)/.exec(ua) || /(blackberry)/.exec(ua) || [];
    const browser = {};
    const browserName = match[1] === "edg" || match[1] === "edga" || match[1] === "edgios" ? "msedge" : match[5] || match[3] || match[1] || "";
    const matched = {
      browser: browserName,
      version: match[2] || match[4] || "0",
      versionNumber: match[4] || match[2] || "0",
      platform: platform_match[0] || ""
    };
    if (matched.browser) {
      browser[matched.browser] = true;
      browser.version = matched.version;
      browser.versionNumber = parseInt(matched.versionNumber, 10);
    }
    if (matched.platform) {
      browser[matched.platform] = true;
    }
    if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"]) {
      browser.mobile = true;
    }
    if (browser.cros || browser.mac || browser.linux || browser.win) {
      browser.desktop = true;
    }
    if (browser.chrome || browser.opr || browser.safari || browser.msedge) {
      browser.webkit = true;
    }
    if (browser.rv || browser.iemobile) {
      const ie = "msie";
      matched.browser = ie;
      browser[ie] = true;
    }
    if (browser.edge) {
      delete browser.edge;
      const msedge_legacy = "msedge";
      matched.browser = msedge_legacy;
      browser[msedge_legacy] = true;
    }
    if (browser.opr && matched.browser === "opr") {
      matched.browser = "opera";
      browser.opera = true;
    }
    if (matched.platform) {
      const platformName = matched.platform.toLowerCase();
      if (platformName === "android" || platformName === "kindle" || platformName === "silk" || platformName === "blackberry" || platformName === "playbook") {
        if (matched.browser === "safari" || matched.browser === "webkit" || (!matched.browser || matched.browser === "")) {
          matched.browser = platformName;
          browser[platformName] = true;
        }
      }
    }
    if (browser.bb && !browser.blackberry) {
      browser.blackberry = true;
      matched.browser = "blackberry";
    }
    browser.name = matched.browser;
    browser.platform = matched.platform;
    browser.uaMatch = uaMatch;
    return browser;
  }
  function factory(jQuery) {
    if (typeof window !== "undefined") {
      window.jQBrowser = uaMatch(window.navigator.userAgent);
      window.jQBrowser.uaMatch = uaMatch;
      if (jQuery) {
        jQuery.browser = window.jQBrowser;
      }
      return window.jQBrowser;
    } else {
      const browser = uaMatch();
      browser.uaMatch = uaMatch;
      return browser;
    }
  }
  (function(factoryFunc) {
    const isESModule = typeof module !== "undefined" && module.exports && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(module, "exports")?.writable === false;
    if (!isESModule) {
      if (typeof define === "function" && define.amd) {
        define(["jquery"], function($) {
          return factoryFunc($);
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        try {
          module.exports = factoryFunc(__require("jquery"));
        } catch (e) {
          factoryFunc(typeof window !== "undefined" ? window.jQuery : void 0);
        }
      } else {
        factoryFunc(typeof window !== "undefined" ? window.jQuery : void 0);
      }
    }
  })(factory);
  var jquery_browser_default = factory;
  return __toCommonJS(jquery_browser_exports);
})();
