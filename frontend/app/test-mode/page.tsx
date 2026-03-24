'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function TestModeInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const key = searchParams.get('key');
    if (!key) {
      const stored = localStorage.getItem('wagecheck_test_mode');
      setStatus(stored ? 'Test mode is active.' : 'Test mode is not active.');
      return;
    }
    if (key === 'off') {
      localStorage.removeItem('wagecheck_test_mode');
      setStatus('Test mode deactivated.');
    } else {
      localStorage.setItem('wagecheck_test_mode', key);
      setStatus('Test mode activated.');
    }
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto py-20 text-center">
      <p className="text-lg text-gray-700">{status}</p>
    </div>
  );
}

export default function TestModePage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto py-20 text-center"><p className="text-lg text-gray-400">Loading...</p></div>}>
      <TestModeInner />
    </Suspense>
  );
}
