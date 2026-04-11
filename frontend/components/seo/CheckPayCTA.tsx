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
      background: 'linear-gradient(135deg, #004D40 0%, #00695C 100%)',
      borderRadius: '12px',
      padding: '32px 28px',
      textAlign: 'center',
      marginTop: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle accent stripe */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'var(--accent)',
      }} />

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
        marginBottom: '20px',
        lineHeight: 1.5,
        maxWidth: '420px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Enter your shifts and find out in 2 minutes. Free, instant, based on official Fair Work rates.
      </p>
      <a
        href={href}
        className="cta-button"
        style={{
          display: 'inline-block',
          background: 'var(--accent)',
          color: '#263238',
          fontWeight: 700,
          fontSize: '16px',
          padding: '14px 36px',
          borderRadius: '8px',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
      >
        Check my pay now
      </a>
      <p style={{
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: '12px',
        margin: '12px 0 0 0',
      }}>
        No sign-up required
      </p>
    </div>
  );
}
