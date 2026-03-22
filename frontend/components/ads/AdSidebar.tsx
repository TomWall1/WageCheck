'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSidebar() {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block', width: '300px', height: '250px' }}
      data-ad-client="ca-pub-2221570965183279"
      data-ad-slot=""
      data-ad-format="auto"
    />
  );
}
