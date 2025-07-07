import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, pageview } from '../utils/analytics';

const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default AnalyticsListener; 