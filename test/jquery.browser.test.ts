import { describe, it, expect, beforeEach, vi } from 'vitest';
import { uaMatch } from './helpers';
import type { BrowserDetection } from './helpers';

// User agent test data
const ua = {
  chrome: {
    windows: "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
    mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
    android: "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Mobile Safari/537.36",
    linux: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
    cros: "Mozilla/5.0 (X11; CrOS i686 14.811.2011) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.834.0 Safari/535.1",
    version: "32.0.1664.3",
    versionNumber: 32,
    chromeOsVersion: "14.0.834.0",
    chromeOsVersionNumber: 14,
    name: "chrome"
  },
  safari: {
    mac: "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9) AppleWebKit/537.71 (KHTML, like Gecko) Version/7.0 Safari/537.71",
    ipad: "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.71 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53",
    iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.71 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53",
    ipod: "Mozilla/5.0 (iPod; CPU iPod OS 7_0 like Mac OS X) AppleWebKit/537.71 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53",
    version: "537.71",
    versionNumber: 7,
    name: "safari"
  },
  firefox: {
    windows: "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0",
    mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
    linux: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:25.0) Gecko/20100101 Firefox/25.0",
    version: "25.0",
    versionNumber: 25,
    name: "mozilla"
  },
  ie: {
    windows: {
      v_9: "Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)",
      v_10: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
      v_11: "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko"
    },
    win_phone: {
      v_10: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 1020)",
      v_11: "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537"
    },
    name: "msie"
  },
  msedge: {
    windows: {
      v_12: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.0",
      v_13: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586",
      v_120: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
    },
    win_phone: {
      v_13: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; NOKIA; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/13.10586"
    },
    name: "msedge"
  },
  opera: {
    v_15: {
      mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.20 Safari/537.36 OPR/15.0.1147.18",
      windows: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.20 Safari/537.36 OPR/15.0.1147.18",
      version: "15.0.1147.18",
      versionNumber: 15
    },
    v_10: {
      mac: "Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.00",
      windows: "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.6.30 Version/10.00",
      version: "10.00",
      versionNumber: 10
    },
    v_12: {
      mac: "Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/12.11",
      windows: "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.6.30 Version/12.11",
      version: "12.11",
      versionNumber: 12
    },
    name: "opera"
  },
  android: {
    v_4_4: {
      android: "Mozilla/5.0 (Linux; Android 4.4.1; Nexus 5 Build/KOT49E) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36",
      version: "537.36",
      versionNumber: 4
    },
    name: "android"
  },
  kindle: {
    v_4: {
      kindle: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Kindle Fire Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
      version: "533.1",
      versionNumber: 4
    },
    name: "kindle"
  },
  silk: {
    v_5: {
      silk: "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true",
      version: "533.16",
      versionNumber: 5
    },
    name: "silk"
  },
  blackberry: {
    v_7: {
      blackberry: "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+",
      version: "534.11",
      versionNumber: 7
    },
    name: "blackberry"
  },
  bb: {
    v_10: {
      bb: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.1 (KHTML, like Gecko) Version/10.0.0.1337 Mobile Safari/537.1",
      version: "537.1",
      versionNumber: 10
    },
    name: "bb"
  },
  playbook: {
    v_7: {
      playbook: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML, like Gecko) Version/7.2.1.0 Safari/536.2+",
      version: "536.2",
      versionNumber: 7
    },
    name: "playbook"
  }
};

// Helper function to test browser detection with a mocked user agent
function testUserAgent(userAgent: string): BrowserDetection {
  // Use uaMatch directly with the provided user agent
  // This tests the core functionality without needing to mock navigator
  return uaMatch(userAgent);
}

describe('jQuery Browser Plugin', () => {
  beforeEach(() => {
    // Reset window.jQBrowser before each test
    delete (window as any).jQBrowser;
    delete (window as any).jQuery;
  });

  describe('Chrome detection', () => {
    it('should detect Chrome on Windows', () => {
      const browser = testUserAgent(ua.chrome.windows);
      
      expect(browser.chrome).toBe(true);
      expect(browser.name).toBe(ua.chrome.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.chrome.version);
      expect(browser.versionNumber).toBe(ua.chrome.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
    });

    it('should detect Chrome on Mac', () => {
      const browser = testUserAgent(ua.chrome.mac);
      
      expect(browser.chrome).toBe(true);
      expect(browser.name).toBe(ua.chrome.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.chrome.version);
      expect(browser.versionNumber).toBe(ua.chrome.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.mac).toBe(true);
    });

    it('should detect Chrome on Android', () => {
      const browser = testUserAgent(ua.chrome.android);
      
      expect(browser.chrome).toBe(true);
      expect(browser.name).toBe(ua.chrome.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.chrome.version);
      expect(browser.versionNumber).toBe(ua.chrome.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.android).toBe(true);
    });

    it('should detect Chrome on Linux', () => {
      const browser = testUserAgent(ua.chrome.linux);
      
      expect(browser.chrome).toBe(true);
      expect(browser.name).toBe(ua.chrome.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.chrome.version);
      expect(browser.versionNumber).toBe(ua.chrome.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.linux).toBe(true);
    });

    it('should detect Chrome on Chrome OS', () => {
      const browser = testUserAgent(ua.chrome.cros);
      
      expect(browser.chrome).toBe(true);
      expect(browser.name).toBe(ua.chrome.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.chrome.chromeOsVersion);
      expect(browser.versionNumber).toBe(ua.chrome.chromeOsVersionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.cros).toBe(true);
    });
  });

  describe('Firefox detection', () => {
    it('should detect Firefox on Windows', () => {
      const browser = testUserAgent(ua.firefox.windows);
      
      expect(browser.mozilla).toBe(true);
      expect(browser.name).toBe(ua.firefox.name);
      expect(browser.version).toBe(ua.firefox.version);
      expect(browser.versionNumber).toBe(ua.firefox.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect Firefox on Mac', () => {
      const browser = testUserAgent(ua.firefox.mac);
      
      expect(browser.mozilla).toBe(true);
      expect(browser.name).toBe(ua.firefox.name);
      expect(browser.version).toBe(ua.firefox.version);
      expect(browser.versionNumber).toBe(ua.firefox.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.mac).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect Firefox on Linux', () => {
      const browser = testUserAgent(ua.firefox.linux);
      
      expect(browser.mozilla).toBe(true);
      expect(browser.name).toBe(ua.firefox.name);
      expect(browser.version).toBe(ua.firefox.version);
      expect(browser.versionNumber).toBe(ua.firefox.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.linux).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });
  });

  describe('Safari detection', () => {
    it('should detect Safari on Mac', () => {
      const browser = testUserAgent(ua.safari.mac);
      
      expect(browser.safari).toBe(true);
      expect(browser.name).toBe(ua.safari.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.safari.version);
      expect(browser.versionNumber).toBe(ua.safari.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.mac).toBe(true);
    });

    it('should detect Safari on iPad', () => {
      const browser = testUserAgent(ua.safari.ipad);
      
      expect(browser.safari).toBe(true);
      expect(browser.name).toBe(ua.safari.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.safari.version);
      expect(browser.versionNumber).toBe(ua.safari.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.ipad).toBe(true);
    });

    it('should detect Safari on iPhone', () => {
      const browser = testUserAgent(ua.safari.iphone);
      
      expect(browser.safari).toBe(true);
      expect(browser.name).toBe(ua.safari.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.safari.version);
      expect(browser.versionNumber).toBe(ua.safari.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.iphone).toBe(true);
    });

    it('should detect Safari on iPod', () => {
      const browser = testUserAgent(ua.safari.ipod);
      
      expect(browser.safari).toBe(true);
      expect(browser.name).toBe(ua.safari.name);
      expect(browser.webkit).toBe(true);
      expect(browser.version).toBe(ua.safari.version);
      expect(browser.versionNumber).toBe(ua.safari.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.ipod).toBe(true);
    });
  });

  describe('Internet Explorer detection', () => {
    it('should detect IE9', () => {
      const browser = testUserAgent(ua.ie.windows.v_9);
      
      expect(browser.msie).toBe(true);
      expect(browser.name).toBe(ua.ie.name);
      expect(browser.version).toBe("9.0");
      expect(browser.versionNumber).toBe(9);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect IE10', () => {
      const browser = testUserAgent(ua.ie.windows.v_10);
      
      expect(browser.msie).toBe(true);
      expect(browser.name).toBe(ua.ie.name);
      expect(browser.version).toBe("10.0");
      expect(browser.versionNumber).toBe(10);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect IE11', () => {
      const browser = testUserAgent(ua.ie.windows.v_11);
      
      expect(browser.msie).toBe(true);
      expect(browser.name).toBe(ua.ie.name);
      expect(browser.version).toBe("11.0");
      expect(browser.versionNumber).toBe(11);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect IE10 on Windows Phone', () => {
      const browser = testUserAgent(ua.ie.win_phone.v_10);
      
      expect(browser.msie).toBe(true);
      expect(browser.name).toBe(ua.ie.name);
      expect(browser.version).toBe("10.0");
      expect(browser.versionNumber).toBe(10);
      expect(browser.mobile).toBe(true);
      expect(browser["windows phone"]).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect IE11 on Windows Phone', () => {
      const browser = testUserAgent(ua.ie.win_phone.v_11);
      
      expect(browser.msie).toBe(true);
      expect(browser.name).toBe(ua.ie.name);
      expect(browser.version).toBe("11.0");
      expect(browser.versionNumber).toBe(11);
      expect(browser.mobile).toBe(true);
      expect(browser["windows phone"]).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });
  });

  describe('Microsoft Edge detection', () => {
    it('should detect Legacy Edge 12', () => {
      const browser = testUserAgent(ua.msedge.windows.v_12);
      
      expect(browser.msedge).toBe(true);
      expect(browser.name).toBe(ua.msedge.name);
      expect(browser.version).toBe("12.0");
      expect(browser.versionNumber).toBe(12);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      // Legacy Edge is not webkit-based
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect Legacy Edge 13', () => {
      const browser = testUserAgent(ua.msedge.windows.v_13);
      
      expect(browser.msedge).toBe(true);
      expect(browser.name).toBe(ua.msedge.name);
      expect(browser.version).toBe("13.10586");
      expect(browser.versionNumber).toBe(13);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      // Legacy Edge is not webkit-based
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect Chromium Edge 120', () => {
      const browser = testUserAgent(ua.msedge.windows.v_120);
      
      expect(browser.msedge).toBe(true);
      expect(browser.name).toBe(ua.msedge.name);
      expect(browser.version).toBe("120.0.0.0");
      expect(browser.versionNumber).toBe(120);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      // Chromium Edge is webkit-based
      expect(browser.webkit).toBe(true);
    });

    it('should detect Edge 13 on Windows Phone', () => {
      const browser = testUserAgent(ua.msedge.win_phone.v_13);
      
      expect(browser.msedge).toBe(true);
      expect(browser.name).toBe(ua.msedge.name);
      expect(browser.version).toBe("13.10586");
      expect(browser.versionNumber).toBe(13);
      expect(browser.mobile).toBe(true);
      expect(browser["windows phone"]).toBe(true);
      // Legacy Edge is not webkit-based
      expect(browser.webkit).toBeUndefined();
    });
  });

  describe('Opera detection', () => {
    it('should detect Opera 15+ on Windows', () => {
      const browser = testUserAgent(ua.opera.v_15.windows);
      
      expect(browser.opr).toBe(true);
      expect(browser.name).toBe(ua.opera.name);
      expect(browser.version).toBe(ua.opera.v_15.version);
      expect(browser.versionNumber).toBe(ua.opera.v_15.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      expect(browser.webkit).toBe(true);
    });

    it('should detect Opera 15+ on Mac', () => {
      const browser = testUserAgent(ua.opera.v_15.mac);
      
      expect(browser.opr).toBe(true);
      expect(browser.name).toBe(ua.opera.name);
      expect(browser.version).toBe(ua.opera.v_15.version);
      expect(browser.versionNumber).toBe(ua.opera.v_15.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.mac).toBe(true);
      expect(browser.webkit).toBe(true);
    });

    it('should detect Opera 10 on Windows', () => {
      const browser = testUserAgent(ua.opera.v_10.windows);
      
      expect(browser.opera).toBe(true);
      expect(browser.name).toBe(ua.opera.name);
      expect(browser.version).toBe(ua.opera.v_10.version);
      expect(browser.versionNumber).toBe(ua.opera.v_10.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect Opera 10 on Mac', () => {
      const browser = testUserAgent(ua.opera.v_10.mac);
      
      expect(browser.opera).toBe(true);
      expect(browser.name).toBe(ua.opera.name);
      expect(browser.version).toBe(ua.opera.v_10.version);
      expect(browser.versionNumber).toBe(ua.opera.v_10.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.mac).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect Opera 12.11 on Windows', () => {
      const browser = testUserAgent(ua.opera.v_12.windows);
      
      expect(browser.opera).toBe(true);
      expect(browser.name).toBe(ua.opera.name);
      expect(browser.version).toBe(ua.opera.v_12.version);
      expect(browser.versionNumber).toBe(ua.opera.v_12.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.win).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });

    it('should detect Opera 12.11 on Mac', () => {
      const browser = testUserAgent(ua.opera.v_12.mac);
      
      expect(browser.opera).toBe(true);
      expect(browser.name).toBe(ua.opera.name);
      expect(browser.version).toBe(ua.opera.v_12.version);
      expect(browser.versionNumber).toBe(ua.opera.v_12.versionNumber);
      expect(browser.desktop).toBe(true);
      expect(browser.mac).toBe(true);
      expect(browser.webkit).toBeUndefined();
    });
  });

  describe('Android browser detection', () => {
    it('should detect Android 4.4 stock browser', () => {
      const browser = testUserAgent(ua.android.v_4_4.android);
      
      expect(browser.android).toBe(true);
      expect(browser.name).toBe(ua.android.name);
      expect(browser.version).toBe(ua.android.v_4_4.version);
      expect(browser.versionNumber).toBe(ua.android.v_4_4.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.webkit).toBe(true);
    });
  });

  describe('Kindle browser detection', () => {
    it('should detect Kindle 4 stock browser', () => {
      const browser = testUserAgent(ua.kindle.v_4.kindle);
      
      expect(browser.kindle).toBe(true);
      expect(browser.name).toBe(ua.kindle.name);
      expect(browser.version).toBe(ua.kindle.v_4.version);
      expect(browser.versionNumber).toBe(ua.kindle.v_4.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.webkit).toBe(true);
    });
  });

  describe('Silk browser detection', () => {
    it('should detect Kindle Silk 5 browser', () => {
      const browser = testUserAgent(ua.silk.v_5.silk);
      
      expect(browser.silk).toBe(true);
      expect(browser.name).toBe(ua.silk.name);
      expect(browser.version).toBe(ua.silk.v_5.version);
      expect(browser.versionNumber).toBe(ua.silk.v_5.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.webkit).toBe(true);
    });
  });

  describe('BlackBerry browser detection', () => {
    it('should detect BlackBerry 7 stock browser', () => {
      const browser = testUserAgent(ua.blackberry.v_7.blackberry);
      
      expect(browser.blackberry).toBe(true);
      expect(browser.name).toBe(ua.blackberry.name);
      expect(browser.version).toBe(ua.blackberry.v_7.version);
      expect(browser.versionNumber).toBe(ua.blackberry.v_7.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.webkit).toBe(true);
    });

    it('should detect BB10 stock browser', () => {
      const browser = testUserAgent(ua.bb.v_10.bb);
      
      expect(browser.bb).toBe(true);
      expect(browser.blackberry).toBe(true);
      // BB10 browser name should be "blackberry" (normalized from "bb")
      expect(browser.name).toBe("blackberry");
      expect(browser.version).toBe(ua.bb.v_10.version);
      expect(browser.versionNumber).toBe(ua.bb.v_10.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.webkit).toBe(true);
    });

    it('should detect BlackBerry PlayBook stock browser', () => {
      const browser = testUserAgent(ua.playbook.v_7.playbook);
      
      expect(browser.playbook).toBe(true);
      expect(browser.name).toBe(ua.playbook.name);
      expect(browser.version).toBe(ua.playbook.v_7.version);
      expect(browser.versionNumber).toBe(ua.playbook.v_7.versionNumber);
      expect(browser.mobile).toBe(true);
      expect(browser.webkit).toBe(true);
    });
  });

  describe('uaMatch function', () => {
    it('should match arbitrary user agent strings', () => {
      const browser = testUserAgent(ua.chrome.mac);
      const matchedBrowser = browser.uaMatch(ua.chrome.windows);
      
      expect(matchedBrowser.chrome).toBe(true);
      expect(matchedBrowser.name).toBe(ua.chrome.name);
      expect(matchedBrowser.webkit).toBe(true);
      expect(matchedBrowser.version).toBe(ua.chrome.version);
      expect(matchedBrowser.versionNumber).toBe(ua.chrome.versionNumber);
      expect(matchedBrowser.desktop).toBe(true);
      expect(matchedBrowser.win).toBe(true);
    });
  });
});

