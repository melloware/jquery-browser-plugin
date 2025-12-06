/**
 * Browser detection result interface
 */
export interface BrowserDetection {
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
    mobile?: boolean;
    desktop?: boolean;
    name: string;
    version: string;
    versionNumber: number;
    platform: string;
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
declare function uaMatch(ua?: string): BrowserDetection;
/**
 * Factory function for module systems (AMD, CommonJS, Browser globals)
 */
declare function factory(jQuery?: JQueryStatic): BrowserDetection;
export { uaMatch, factory };
export default factory;
//# sourceMappingURL=jquery.browser.d.ts.map