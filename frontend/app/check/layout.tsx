'use client';

import { Suspense } from 'react';
import { WageCheckProvider, useWageCheck, TOTAL_STEPS, STEP_LABELS } from '@/contexts/WageCheckContext';
import ProgressBar from '@/components/ui/ProgressBar';

function CheckLayoutInner({ children }: { children: React.ReactNode }) {
  const { awardCode, awardName, currentStep, handleStartOver } = useWageCheck();

  if (!awardCode) {
    return null; // Provider will redirect to /
  }

  return (
    <div className="space-y-6">
      {/* Award label + restart */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '1rem',
        borderBottom: '1.5px solid var(--border)',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: 'var(--primary)',
            padding: '2px 7px',
            borderRadius: '4px',
          }}>
            {awardCode}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--secondary-muted)' }}>{awardName}</span>
        </div>
        <button
          onClick={handleStartOver}
          style={{
            fontSize: '12px',
            color: 'var(--secondary-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
          onMouseOver={e => (e.currentTarget.style.color = 'var(--secondary)')}
          onMouseOut={e => (e.currentTarget.style.color = 'var(--secondary-muted)')}
        >
          Change award
        </button>
      </div>

      <ProgressBar
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        labels={STEP_LABELS}
      />

      {children}
    </div>
  );
}

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      <Suspense>
        <WageCheckProvider>
          <CheckLayoutInner>{children}</CheckLayoutInner>
        </WageCheckProvider>
      </Suspense>
    </div>
  );
}
