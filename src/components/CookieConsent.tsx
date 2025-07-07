import { useState, useEffect } from 'react';

const COOKIE_KEY = 'analytics_consent';

function clearAllCookies() {
  // Remove all cookies
  document.cookie.split(';').forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  });
}

export default function CookieConsent({ onConsent }: { onConsent: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
    else if (consent === 'granted') onConsent();
    else if (consent === 'denied') clearAllCookies();
  }, [onConsent]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'granted');
    setVisible(false);
    onConsent();
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'denied');
    setVisible(false);
    clearAllCookies();
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
      background: '#222', color: '#fff', padding: '1rem', textAlign: 'center'
    }}>
      This website uses cookies for analytics. Do you consent to data collection?
      <button onClick={handleAccept} style={{ margin: '0 1rem', padding: '0.5rem 1rem' }}>Accept</button>
      <button onClick={handleDecline} style={{ padding: '0.5rem 1rem' }}>Decline</button>
    </div>
  );
} 