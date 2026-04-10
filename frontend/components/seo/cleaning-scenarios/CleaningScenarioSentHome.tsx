/**
 * Scenario: Sent Home Early From a Cleaning Shift
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
  { question: 'I was sent home after 1 hour — do I get paid for 3?', answer: 'If you\'re a casual cleaner, yes. The Cleaning Services Award guarantees a minimum engagement of 3 hours per shift for casuals. Even if your employer sends you home after 1 hour, they must pay you for 3 hours. Part-time workers must be paid for their rostered hours.' },
  { question: 'Does the minimum engagement apply if the client cancels?', answer: 'Yes. If your employer sends you to a site and the client cancels, or if you arrive and there\'s no work, the minimum engagement still applies. Your employer took the risk by rostering you — the cost is theirs, not yours.' },
  { question: 'What if my employer says I can go home early and I agree?', answer: 'Even if you voluntarily agree to leave early, the minimum engagement applies to casuals. For part-time workers, your employer should pay you for your rostered hours. You should not be pressured into accepting less pay because work ran out.' },
];

export default function CleaningScenarioSentHome({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you showed up for a cleaning shift and got sent home early, you must still be paid for a minimum of 3 hours. This is not a bonus or a favour &mdash; it is a legal requirement under the Cleaning Services Award. Your employer cannot roster you, benefit from your availability, and then send you home after an hour paying only for time worked.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Casual cleaners: <strong>minimum 3-hour engagement</strong> per shift</li>
            <li style={{ marginBottom: '6px' }}>Part-time cleaners: must be paid for <strong>rostered hours</strong></li>
            <li style={{ marginBottom: '6px' }}>Full-time cleaners: must be paid for <strong>rostered hours</strong> (typically 7.6 hours)</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual cleaner, Level 1 (~{l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr with casual loading), rostered for a 4-hour evening shift. Arrives at 6pm, employer says the building is already clean and sends them home at 7pm.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they paid:</strong> 1 hour &times; {l1 ? formatCurrency(l1.casualRate) : '&mdash;'} = {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should pay:</strong> 3 hours (minimum) &times; {l1 ? formatCurrency(l1.casualRate) : '&mdash;'} = {l1 ? formatCurrency(l1.casualRate * 3) : '&mdash;'}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpaid: {l1 ? formatCurrency(l1.casualRate * 2) : '&mdash;'} for that single shift.
          </p>
          <p style={smallStyle}>
            If this happens once a week, it adds up to $3,215/year in stolen wages.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Were you paid for at least 3 hours on every shift you attended?</li>
          <li style={{ marginBottom: '6px' }}>Does your payslip show the correct hours for shifts where you left early?</li>
          <li style={{ marginBottom: '6px' }}>Were you pressured to clock off early to avoid the minimum engagement?</li>
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
