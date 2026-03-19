interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Step number row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        marginBottom: '10px',
      }}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isUpcoming = step > currentStep;

          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: step < totalSteps ? 1 : 'none' }}>
              {/* Step dot */}
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
                background: isCompleted ? 'var(--primary)'
                          : isCurrent   ? 'var(--primary)'
                          : 'var(--secondary-light)',
                color: isCompleted || isCurrent ? '#ffffff' : 'var(--secondary-muted)',
                border: isUpcoming ? '1.5px solid var(--border-strong)' : 'none',
              }}>
                {isCompleted ? (
                  /* Checkmark for completed */
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>

              {/* Connector line */}
              {step < totalSteps && (
                <div style={{
                  flex: 1,
                  height: '1.5px',
                  background: isCompleted ? 'var(--primary)' : 'var(--border)',
                  transition: 'background 0.2s ease',
                  margin: '0 2px',
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Current step label */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}>
        <span style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--primary)',
          fontWeight: 600,
        }}>
          {labels[currentStep - 1]}
        </span>
        <span style={{
          fontSize: '11px',
          color: 'var(--secondary-muted)',
          letterSpacing: '0.04em',
          opacity: 0.75,
        }}>
          {currentStep} / {totalSteps}
        </span>
      </div>
    </div>
  );
}
