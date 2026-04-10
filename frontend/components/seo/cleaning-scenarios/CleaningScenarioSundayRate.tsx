/**
 * Scenario: My Cleaning Sunday Pay Looks Wrong
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
  { question: 'What is the Sunday rate for cleaners?', answer: 'Under the Cleaning Services Award, Sunday work for full-time and part-time cleaners is paid at 200% of the base rate (double time). Casuals receive 200% of their base rate (not including casual loading separately — it\'s built into the 200%).' },
  { question: 'My employer says casual cleaners don\'t get Sunday penalties — true?', answer: 'False. Casual cleaners absolutely receive Sunday penalty rates under the Cleaning Services Award. The casual Sunday rate is 200% of the ordinary base rate. Your employer is either wrong or deliberately misleading you.' },
  { question: 'I work every Sunday but get paid the same as weekdays — how much am I owed?', answer: 'For each Sunday hour, you\'re owed the difference between your weekday rate and the Sunday rate. For a Level 1 permanent cleaner working a 5-hour Sunday shift, that\'s roughly $123.65 instead of $123.65 at double time vs ~$123.65 at the base rate — roughly $123 in missing penalty pay per shift, or $6,400+/year.' },
];

export default function CleaningScenarioSundayRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Sunday cleaning shifts must be paid at double time. If your payslip shows the same rate on Sunday as it does on Tuesday, your employer is underpaying you. This is one of the most straightforward breaches in cleaning &mdash; and one of the most expensive for workers.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Full-time / part-time Sunday rate: <strong>200% of base rate (double time)</strong></li>
            <li style={{ marginBottom: '6px' }}>Casual Sunday rate: <strong>200% of ordinary base rate</strong></li>
            <li style={{ marginBottom: '6px' }}>This applies to all hours worked on Sunday, not just hours over a threshold</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Part-time cleaner, Level 1 (~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr base), works a 4-hour Sunday shift cleaning a shopping centre. Employer pays {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr (weekday rate).
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they paid:</strong> 4 hours &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} = {l1 ? formatCurrency(l1.ftRate * 4) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should pay:</strong> 4 hours &times; {l1 ? formatCurrency(l1.sundayFt) : '&mdash;'} (200%) = {l1 ? formatCurrency(l1.sundayFt * 4) : '&mdash;'}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpaid: {l1 ? formatCurrency(l1.sundayFt * 4 - l1.ftRate * 4) : '&mdash;'} per shift. Over a year of weekly Sunday shifts, that&apos;s {l1 ? formatCurrency((l1.sundayFt * 4 - l1.ftRate * 4) * 52) : '&mdash;'}.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Does your payslip show a separate, higher rate for Sunday hours?</li>
          <li style={{ marginBottom: '6px' }}>Is the Sunday rate exactly double your base rate?</li>
          <li style={{ marginBottom: '6px' }}>Are your Sunday hours correctly recorded?</li>
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
