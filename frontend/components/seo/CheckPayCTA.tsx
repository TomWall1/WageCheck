/**
 * Reusable "Check your pay" call-to-action block.
 * Links to /check-my-pay with optional award pre-fill.
 */

interface Props {
  awardCode?: string;
  awardName?: string;
}

export default function CheckPayCTA({ awardCode, awardName }: Props) {
  const href = awardCode ? `/check-my-pay?award=${awardCode}` : '/check-my-pay';

  return (
    <div style={{
      background: 'var(--primary-light)',
      border: '1.5px solid var(--primary)',
      borderRadius: '10px',
      padding: '24px',
      textAlign: 'center',
      marginTop: '2rem',
    }}>
      <p style={{
        fontFamily: 'Fraunces, Georgia, serif',
        fontSize: '1.15rem',
        fontWeight: 600,
        color: 'var(--secondary)',
        marginBottom: '8px',
      }}>
        {awardName
          ? `Check your ${awardName} pay now`
          : 'Check if you\'re being paid correctly'}
      </p>
      <p style={{
        fontSize: '13.5px',
        color: 'var(--secondary-muted)',
        marginBottom: '16px',
        lineHeight: 1.5,
      }}>
        Enter your shifts and we'll calculate exactly what you should be paid under your award.
      </p>
      <a
        href={href}
        style={{
          display: 'inline-block',
          background: 'var(--primary)',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '14px',
          padding: '10px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        Check my pay &rarr;
      </a>
    </div>
  );
}
