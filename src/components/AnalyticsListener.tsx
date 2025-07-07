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

  useEffect(() => {
    if (consent === 'granted') {
      initGA();
    }
    // If denied, do not init analytics
  }, [consent]);

  useEffect(() => {
    if (consent === 'granted') {
      pageview(location.pathname + location.search);
    }
    // If denied, do not send pageview
  }, [location, consent]);

  return null;
};

export default AnalyticsListener; 