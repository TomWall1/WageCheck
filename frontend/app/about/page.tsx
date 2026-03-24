import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Review My Pay',
  description: 'Learn how Review My Pay helps Australian workers check if they are being paid correctly under their Fair Work modern award.',
};

export default function AboutPage() {
  const sectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    fontSize: '14.5px',
    color: '#37474F',
    lineHeight: 1.7,
  };

  const h2Style: React.CSSProperties = {
    fontFamily: 'Fraunces, Georgia, serif',
    fontWeight: 500,
    fontSize: '1.25rem',
    letterSpacing: '-0.02em',
    color: 'var(--secondary)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '560px' }}>

      {/* Header */}
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
          About Review My Pay
        </h1>
        <p style={{ fontSize: '15px', color: '#37474F', lineHeight: 1.65 }}>
          A free tool that helps Australian workers check if they&apos;re being paid what they&apos;re owed.
        </p>
      </div>

      {/* What we do */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>What we do</h2>
        <p>
          Review My Pay compares what you were actually paid against the minimum rates set by the{' '}
          <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 500 }}>
            Fair Work Commission
          </a>{' '}
          under your modern award. You enter your shifts, and we calculate what you should have earned —
          including penalty rates, overtime, allowances, and casual loading.
        </p>
        <p>
          The tool covers 19 of Australia&apos;s most common modern awards, including Hospitality,
          Retail, Fast Food, Fitness, Cleaning, and more.
        </p>
      </div>

      {/* Why it exists */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Why it exists</h2>
        <p>
          Wage theft is widespread in Australia. The Fair Work Ombudsman has recovered hundreds of millions
          of dollars in unpaid wages, and independent research suggests billions more go unreported every year.
          Many workers — particularly young, casual, or migrant workers — don&apos;t know what they&apos;re
          entitled to, or find the award system too complex to navigate.
        </p>
        <p>
          Review My Pay was built to close that gap. No jargon, no sign-ups, no cost. Just a
          straightforward way to check your pay.
        </p>
      </div>

      {/* How it works */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>How it works</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.25rem',
          background: 'var(--primary-light)',
          border: '1px solid rgba(0,77,64,0.12)',
          borderRadius: '10px',
        }}>
          {[
            { step: '1', label: 'Select your award', desc: 'Choose the modern award that covers your job.' },
            { step: '2', label: 'Tell us about your role', desc: 'Your employment type, age, and classification level.' },
            { step: '3', label: 'Enter your shifts', desc: 'Add the hours you worked over a pay period.' },
            { step: '4', label: 'Get your result', desc: 'See a breakdown of what you should have been paid, with penalty rates and allowances applied.' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 600,
                flexShrink: 0,
                marginTop: '1px',
              }}>
                {item.step}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--secondary)', fontSize: '14px' }}>{item.label}</div>
                <div style={{ fontSize: '13.5px', color: 'var(--secondary-muted)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Where rates come from */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Where our rates come from</h2>
        <p>
          All pay rates are sourced directly from the official Fair Work Commission pay guides,
          updated each July when new minimum rates take effect. We do not set or interpret rates —
          we reproduce the published minimums for each award, classification, and penalty category.
        </p>
        <p>
          If you spot a rate that looks wrong, please{' '}
          <a href="/contact" style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 500 }}>
            let us know
          </a>{' '}
          and we&apos;ll investigate.
        </p>
      </div>

      {/* What we're not */}
      <div style={{
        padding: '20px',
        background: 'var(--accent-light)',
        border: '1px solid rgba(255,183,77,0.35)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '8px',
        fontSize: '13.5px',
        color: 'var(--secondary)',
        lineHeight: 1.65,
      }}>
        <p style={{ fontWeight: 600, marginBottom: '6px' }}>Important</p>
        <p>
          Review My Pay provides general information only — not legal advice. We are not affiliated
          with the Fair Work Ombudsman or the Fair Work Commission. If you believe you are being
          underpaid, we recommend first raising it with your employer. If that doesn&apos;t resolve
          the issue, contact the{' '}
          <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: 'underline', fontWeight: 600 }}>
            Fair Work Ombudsman
          </a>{' '}
          on <strong>13 13 94</strong> or seek independent legal advice.
        </p>
      </div>

      {/* Built in Australia */}
      <div style={{
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--secondary-muted)',
        paddingTop: '0.5rem',
      }}>
        Built in Australia for Australian workers.
      </div>
    </div>
  );
}
