export default function ContactPage() {
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
          Contact
        </h1>
        <p style={{ fontSize: '15px', color: '#37474F', lineHeight: 1.65 }}>
          Get in touch with questions about the tool, or to report a calculation error.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '14.5px', color: '#37474F', lineHeight: 1.7 }}>
        <p>
          If you&apos;ve spotted a rate that looks wrong, a missing award, or a bug in the calculator, we want to know.
          Please include as much detail as you can — the award, classification, shift type, and what you expected to see.
        </p>
        <p>
          We also welcome general questions about how the tool works, feedback on the experience, or suggestions for awards to add.
        </p>
        <div style={{
          padding: '16px 20px',
          background: 'var(--primary-light)',
          border: '1.5px solid var(--primary)',
          borderRadius: '10px',
        }}>
          <p style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</p>
          <a
            href="mailto:reviewmypayapp@gmail.com"
            style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}
          >
            reviewmypayapp@gmail.com
          </a>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--secondary-muted)' }}>
          This tool provides general information only — not legal advice. For urgent workplace issues,
          contact the Fair Work Ombudsman on <strong style={{ color: 'var(--secondary)' }}>13 13 94</strong> or visit{' '}
          <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--secondary)' }}>
            fairwork.gov.au
          </a>.
        </p>
      </div>
    </div>
  );
}
