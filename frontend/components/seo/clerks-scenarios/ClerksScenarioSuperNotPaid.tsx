/**
 * Scenario: Super Not Paid — Clerks Award
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How do I check if my super is being paid?', answer: 'Log in to your super fund\'s website or app and check your recent contributions. Employers must pay super at least quarterly. If you see a gap of more than 3 months with no contribution, something is wrong. You can also check via myGov by linking your ATO account.' },
  { question: 'My employer says super is included in my hourly rate — is that legal?', answer: 'Only if your employment contract explicitly states that your hourly rate is inclusive of super AND the base rate (excluding super) still meets or exceeds the award minimum. In most cases, if an employer is paying the exact award rate and claiming super is included, the base rate is actually below the award minimum.' },
  { question: 'What if my employer hasn\'t paid super for months?', answer: 'Report it to the ATO using the "Report unpaid super contributions" form. The ATO can compel the employer to pay the outstanding super plus interest and an administration charge. Unpaid super is taken seriously — the ATO actively pursues these cases.' },
];

export default function ClerksScenarioSuperNotPaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Your employer must pay superannuation on top of your ordinary earnings at the current rate of 12%. This is not optional. It&apos;s not a bonus. It&apos;s a legal requirement under the Superannuation Guarantee. Unpaid super is one of the most widespread workplace violations in Australia, and clerical workers are frequently affected because they don&apos;t check.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          When was the last time you checked your super fund balance? If you don&apos;t know, check today.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What unpaid super costs you</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Level 3 clerk earning $55,000/year. Employer hasn&apos;t paid super for 2 years.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Super owed:</strong> $55,000 &times; 12% = $6,600/year &times; 2 years = $13,200
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Lost investment returns:</strong> At an average 7% annual return, those missing contributions would have grown by an additional $900+ over that period.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Total impact: $14,100+ missing from your retirement savings.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your super</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Log in to your super fund (AustralianSuper, REST, Sunsuper, etc.)</li>
          <li style={{ marginBottom: '6px' }}>Check contributions for the last 12 months</li>
          <li style={{ marginBottom: '6px' }}>Contributions should appear at least quarterly</li>
          <li style={{ marginBottom: '6px' }}>Each quarter should be roughly 12% of your gross ordinary earnings</li>
        </ol>
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
        <p style={pStyle}>Check your pay and super entitlements under the Clerks Award.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
