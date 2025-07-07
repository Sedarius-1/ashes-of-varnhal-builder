import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, pageview } from '../utils/analytics';

const COOKIE_KEY = 'analytics_consent';

const AnalyticsListener = () => {
  const location = useLocation();
  const [consent, setConsent] = useState<string | null>(null);
  const [gaInitialized, setGaInitialized] = useState(false);

  useEffect(() => {
    setConsent(localStorage.getItem(COOKIE_KEY));
  }, []);

  // Initialize GA only after consent is granted
  useEffect(() => {
    if (consent === 'granted' && !gaInitialized) {
      initGA();
      setGaInitialized(true);
    }
    // If denied, do not init analytics
  }, [consent, gaInitialized]);

  // Send pageview only after GA is initialized and consent is granted
  useEffect(() => {
    if (consent === 'granted' && gaInitialized) {
      // Wait for gtag to be ready, then send pageview
      const sendPageviewWhenReady = (url: string) => {
        if (typeof window.gtag === 'function') {
          pageview(url);
        } else {
          setTimeout(() => sendPageviewWhenReady(url), 200);
        }
      };
      sendPageviewWhenReady(location.pathname + location.search);
    }
  }, [location, consent, gaInitialized]);

  return null;
};

export default AnalyticsListener; 