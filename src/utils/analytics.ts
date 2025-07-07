declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gtagInitialized?: boolean;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string;

export function initGA() {
  if (!GA_MEASUREMENT_ID) return;
  if (window.gtagInitialized) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  window.gtagInitialized = true;

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

export function pageview(url: string) {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: url,
  });
} 