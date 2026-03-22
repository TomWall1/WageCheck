'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdMobileAnchor() {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className="block md:hidden" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      textAlign: 'center',
      background: 'rgba(255,255,255,0.97)',
      borderTop: '1px solid var(--border)',
      padding: '4px 0',
    }}>
      <ins className="adsbygoogle"
        style={{ display: 'inline-block', width: '320px', height: '50px' }}
        data-ad-client="ca-pub-2221570965183279"
        data-ad-slot=""
        data-ad-format="horizontal"
      />
    </div>
  );
}
