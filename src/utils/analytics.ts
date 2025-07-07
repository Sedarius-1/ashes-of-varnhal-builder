declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gtagInitialized?: boolean;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string;

let gtagReady: Promise<void> | null = null;

function waitForRealGtag(callback: () => void, retries = 20) {
  // The real gtag has a 'length' property of 0 (it's a function), the stub does not
  if (typeof window.gtag === 'function' && window.gtag.length === 0) {
    callback();
  } else if (retries > 0) {
    setTimeout(() => waitForRealGtag(callback, retries - 1), 100);
  } else {
    console.warn('window.gtag is not the real GA4 gtag after waiting!');
  }
}

function loadGtagScript(): Promise<void> {
  if (window.gtagInitialized) return Promise.resolve();
  if (gtagReady) return gtagReady;
  gtagReady = new Promise((resolve) => {
    // Define dataLayer and gtag BEFORE loading the script
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => {
      window.gtagInitialized = true;
      resolve();
    };
    document.head.appendChild(script);
  });
  return gtagReady;
}

export async function initGA() {
  console.log('initGA called, ID:', GA_MEASUREMENT_ID);
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA_MEASUREMENT_ID is missing!');
    return;
  }
  await loadGtagScript();
  // Set default consent to denied until user makes a choice
  window.gtag('consent', 'default', { analytics_storage: 'denied' });
  // Wait for the real gtag to be available before config
  await new Promise<void>((resolve) => {
    waitForRealGtag(() => {
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
      resolve();
    });
  });
}

export async function pageview(url: string) {
  await loadGtagScript();
  await new Promise<void>((resolve) => {
    waitForRealGtag(() => {
      if (!window.gtag) {
        console.warn('window.gtag is not defined when trying to send pageview!');
        resolve();
        return;
      }
      console.log('Sending pageview for:', url);
      window.gtag('event', 'page_view', {
        page_path: url,
      });
      resolve();
    });
  });
}

export async function updateAnalyticsConsent(granted: boolean) {
  await loadGtagScript();
  await new Promise<void>((resolve) => {
    waitForRealGtag(() => {
      console.log('Updating analytics consent to:', granted ? 'granted' : 'denied');
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
      });
      resolve();
    });
  });
} 