declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gtagInitialized?: boolean;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string;

export function initGA() {
  console.log('initGA called, ID:', GA_MEASUREMENT_ID);
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA_MEASUREMENT_ID is missing!');
    return;
  }
  if (window.gtagInitialized) return;

  // Define dataLayer and gtag BEFORE loading the script
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  window.gtagInitialized = true;

  // Now load the script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Set default consent to denied until user makes a choice
  window.gtag('consent', 'default', { analytics_storage: 'denied' });

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

export function pageview(url: string) {
  if (!window.gtag) {
    console.warn('window.gtag is not defined when trying to send pageview!');
    return;
  }
  window.gtag('event', 'page_view', {
    page_path: url,
  });
}

function waitForGtag(callback: () => void, retries = 10) {
  if (typeof window.gtag === 'function') {
    callback();
  } else if (retries > 0) {
    setTimeout(() => waitForGtag(callback, retries - 1), 200);
  } else {
    console.warn('window.gtag is not defined after waiting!');
  }
}

export function updateAnalyticsConsent(granted: boolean) {
  waitForGtag(() => {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    });
  });
} 