/**
 * Scenario: Underpaid Super — /awards/hospitality-award/scenarios/underpaid-super
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says I\u0027m not entitled to super because I\u0027m casual — is that right?', answer: 'No — and that claim is wrong. Since November 2022, all casual employees are entitled to super regardless of earnings.' },
  { question: 'How far back can I recover unpaid super?', answer: 'The ATO can pursue unpaid super going back approximately 5 years. Act sooner rather than later.' },
  { question: 'My payslip shows super contributions but nothing has appeared in my fund in months — what should I do?', answer: 'Contact the ATO immediately. This is a serious breach — it means your employer is withholding super they\u0027ve deducted from your entitlements.' },
];

export default function ScenarioUnderpaidSuper() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You can recover unpaid super &mdash; and the ATO will help you do it. Superannuation underpayment in hospitality is widespread, particularly for <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>casual</a> workers, cash-paid workers, and workers earning lower amounts who previously fell below the old $450/month threshold. Since November 2022 that threshold has been abolished &mdash; all hospitality workers are entitled to super regardless of earnings.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a hospitality worker and you&apos;ve never verified your super contributions &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          From 1 November 2022, all employees &mdash; including casual workers &mdash; are entitled to superannuation regardless of their earnings. The current rate (from 1 July 2025) is 11.5% of ordinary time earnings, paid quarterly at minimum.
        </p>
        <p style={pStyle}>
          Super must be paid on top of wages &mdash; it cannot be included in your hourly rate as a substitute for the actual super contribution.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your super</h2>
        <p style={pStyle}><strong>Step 1:</strong> Log in to your super fund &mdash; most have apps or online portals showing incoming contributions.</p>
        <p style={pStyle}><strong>Step 2:</strong> Check that contributions appear at least quarterly (28 October, 28 January, 28 April, 28 July).</p>
        <p style={pStyle}><strong>Step 3:</strong> Check the amount &mdash; it should be approximately 11.5% of your gross ordinary time earnings for the relevant period.</p>
        <p style={pStyle}><strong>Step 4:</strong> Compare your payslip super figure with what actually appeared in your fund. They don&apos;t always match.</p>
        <p style={pStyle}>
          If contributions are missing, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your pay and super &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common super underpayments in hospitality</h2>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>$450 threshold still being applied despite 2022 change</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Many small hospitality employers haven&apos;t updated their systems. Low-earning casual workers continue to receive no super.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Super on payslip but not actually remitted</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            The payslip shows a super line but the money never reaches the fund. Always verify with the fund directly.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Wrong rate applied</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Super rates increased from 10% to 10.5% (July 2022), to 11% (July 2023), to 11.5% (July 2025). Employers still applying earlier rates are underpaying.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Super at 11.5% on $500/week in earnings = $57.50/week owed. If super hasn&apos;t been paid at all: $57.50 &times; 52 = ~$3,000/year in retirement savings not accumulating. Over 3 years: ~$9,000 &mdash; plus lost investment returns on that balance. The compounding effect over a working lifetime is substantial.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Log in to your super fund and check contributions</li>
          <li>If missing or incorrect, contact the ATO on 13 10 20 &mdash; they pursue unpaid super directly from employers</li>
          <li>You can also raise it with the Fair Work Ombudsman as part of a broader underpayment complaint</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>Don&apos;t guess &mdash; check your pay and your super fund.</p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. For super queries, contact the ATO on 13 10 20. Verify at fairwork.gov.au.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(q => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: { '@type': 'Answer', text: q.answer },
        })),
      }) }} />
    </>
  );
}
