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

export {};

