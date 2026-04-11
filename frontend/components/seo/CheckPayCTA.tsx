/**
 * Reusable "Check your pay" call-to-action block.
 * Links to /check-my-pay with optional award pre-fill.
 *
 * Button styling is in globals.css (.cta-button) with !important
 * to override Tailwind Preflight's anchor colour reset.
 */

interface Props {
  awardCode?: string;
  awardName?: string;
}

export default function CheckPayCTA({ awardCode, awardName }: Props) {
  const href = awardCode ? `/check-my-pay?award=${awardCode}` : '/check-my-pay';

  return (
    <div style={{
      background: '#004D40',
      borderRadius: '12px',
      padding: '32px 28px',
      textAlign: 'center' as const,
      marginTop: '2rem',
      borderTop: '4px solid #FFB74D',
    }}>
      <p style={{
        fontFamily: 'Fraunces, Georgia, serif',
        fontSize: '1.35rem',
        fontWeight: 600,
        color: '#ffffff',
        marginBottom: '8px',
        lineHeight: 1.3,
      }}>
        {awardName
          ? `Not sure if your ${awardName} pay is right?`
          : 'Not sure if you\u2019re being paid correctly?'}
      </p>
      <p style={{
        fontSize: '14.5px',
        color: 'rgba(255, 255, 255, 0.85)',
        marginBottom: '24px',
        lineHeight: 1.5,
        maxWidth: '420px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Enter your shifts and find out in 2 minutes. Free, instant, based on official Fair Work rates.
      </p>
      <a href={href} className="cta-button">
        Check my pay now
      </a>
      <p style={{
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: '14px',
        marginBottom: 0,
      }}>
        No sign-up required
      </p>
    </div>
  );
}
