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
                background: isCompleted ? '#1B5A9C'
                          : isCurrent   ? '#1B5A9C'
                          : '#F5F4F0',
                color: isCompleted || isCurrent ? '#FFFFFF' : '#A09890',
                border: isUpcoming ? '1.5px solid #D5D0C8' : 'none',
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
                  background: isCompleted ? '#1B5A9C' : '#E4DFD8',
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
          color: '#1B5A9C',
          fontWeight: 600,
        }}>
          {labels[currentStep - 1]}
        </span>
        <span style={{
          fontSize: '11px',
          color: '#A09890',
          letterSpacing: '0.04em',
        }}>
          {currentStep} / {totalSteps}
        </span>
      </div>
    </div>
  );
}
