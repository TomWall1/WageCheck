/**
 * Scenario: Worked a Public Holiday Cleaning
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'What is the public holiday rate for cleaners?', answer: 'Under the Cleaning Services Award, full-time and part-time cleaners working on a public holiday are paid at 250% of their base rate (2.5 times). Casuals receive 275% of the ordinary base rate.' },
  { question: 'Can my cleaning employer force me to work on a public holiday?', answer: 'Your employer can request you work on a public holiday, but you can refuse if the request is unreasonable or the refusal is reasonable. Factors include your personal circumstances, the nature of the work, and whether you were given adequate notice. If you do work, you must be paid the public holiday penalty rate.' },
  { question: 'I worked Christmas Day cleaning — what should I have been paid?', answer: 'Christmas Day is a public holiday. You should be paid at 250% (permanent) or 275% (casual) of your base rate for all hours worked.' },
];

export default function CleaningScenarioPublicHoliday({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you cleaned on a public holiday and got paid your normal rate, your employer stole from you. Public holidays attract the highest penalty rate under the Cleaning Services Award &mdash; 2.5 times your base rate for permanent workers, 2.75 times for casuals. There is no exemption for cleaning work, and your employer cannot offset the penalty with a day off unless you specifically agree.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Full-time / part-time: <strong>250% of base rate</strong></li>
            <li style={{ marginBottom: '6px' }}>Casual: <strong>275% of ordinary base rate</strong></li>
            <li style={{ marginBottom: '6px' }}>Applies to all hours worked on the public holiday</li>
            <li style={{ marginBottom: '6px' }}>Full-time/part-time workers who don&apos;t work get paid their ordinary hours (paid day off)</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual cleaner, Level 1 (~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'} base), works a 4-hour shift on Australia Day cleaning a venue.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should pay:</strong> 4 hours &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} &times; 2.75 = {l1 ? formatCurrency(l1.ftRate * 2.75 * 4) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What many employers pay:</strong> 4 hours &times; {l1 ? formatCurrency(l1.casualRate) : '&mdash;'} (casual weekday) = {l1 ? formatCurrency(l1.casualRate * 4) : '&mdash;'}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpaid: {l1 ? formatCurrency(l1.ftRate * 2.75 * 4 - l1.casualRate * 4) : '&mdash;'} on a single public holiday shift.
          </p>
          <p style={smallStyle}>
            Multiply this across ANZAC Day, Easter, Christmas, and state-specific holidays and the total becomes significant.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Does your payslip show a separate, higher rate for public holiday hours?</li>
          <li style={{ marginBottom: '6px' }}>Were you paid at 2.5&times; (permanent) or 2.75&times; (casual)?</li>
          <li style={{ marginBottom: '6px' }}>If you didn&apos;t work the public holiday, were you still paid for it (full-time/part-time)?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
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
