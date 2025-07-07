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

  useEffect(() => {
    if (consent === 'granted' && !gaInitialized) {
      (async () => {
        await initGA();
        setGaInitialized(true);
      })();
    }
  }, [consent, gaInitialized]);

  useEffect(() => {
    if (consent === 'granted' && gaInitialized) {
      (async () => {
        await pageview(location.pathname + location.search);
      })();
    }
  }, [location, consent, gaInitialized]);

  return null;
};

export default AnalyticsListener; 