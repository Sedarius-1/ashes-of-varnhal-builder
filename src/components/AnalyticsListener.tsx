import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, pageview } from '../utils/analytics';

const COOKIE_KEY = 'analytics_consent';

const AnalyticsListener = () => {
  const location = useLocation();
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem(COOKIE_KEY));
  }, []);

  // Helper to send pageview only when gtag is ready
  const sendPageviewWhenReady = (url: string) => {
    if (typeof window.gtag === 'function') {
      pageview(url);
    } else {
      setTimeout(() => sendPageviewWhenReady(url), 200);
    }
  };

  useEffect(() => {
    if (consent === 'granted') {
      initGA();
      sendPageviewWhenReady(location.pathname + location.search);
    }
    // If denied, do not init analytics or send pageview
  }, [consent, location]);

  return null;
};

export default AnalyticsListener; 