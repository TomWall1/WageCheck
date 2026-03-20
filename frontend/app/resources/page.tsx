export default function ResourcesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '560px' }}>
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontWeight: 500,
          fontSize: '2rem',
          letterSpacing: '-0.03em',
          color: 'var(--secondary)',
          marginBottom: '0.5rem',
          lineHeight: 1.15,
        }}>
          Resources
        </h1>
        <p style={{ fontSize: '15px', color: '#37474F', lineHeight: 1.65 }}>
          Useful links and information about workplace rights in Australia.
        </p>
      </div>

      <div style={{
        padding: '20px',
        background: 'var(--accent-light)',
        border: '1px solid rgba(255,183,77,0.35)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '8px',
        fontSize: '13.5px',
        color: 'var(--secondary)',
        lineHeight: 1.6,
      }}>
        More resources coming soon. In the meantime, contact the{' '}
        <a
          href="https://www.fairwork.gov.au"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 600 }}
        >
          Fair Work Ombudsman
        </a>{' '}
        or call <strong>13 13 94</strong> for workplace advice.
      </div>
    </div>
  );
}
