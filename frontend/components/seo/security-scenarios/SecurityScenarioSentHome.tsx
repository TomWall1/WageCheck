/**
 * Scenario: Sent Home Early From a Security Shift
 * URL: /awards/security-award/scenarios/sent-home-early
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
  { question: 'I was sent home after 1 hour — what am I owed?', answer: 'If you are a casual employee, you must be paid for the minimum engagement period (typically 4 hours under the Security Award), even if you only worked 1 hour. Your employer cannot reduce your pay below the minimum engagement just because the site or event finished early.' },
  { question: 'Does minimum engagement apply if the client cancels?', answer: 'Yes. The minimum engagement is between you and your employer, not the client. If your employer sends you to a site and the client cancels, your employer still owes you the minimum engagement pay. How they handle it with the client is their problem, not yours.' },
  { question: 'What if my employer asks me to go to another site instead?', answer: 'If your employer redirects you to another site to complete the shift, they can count those hours toward the minimum engagement. However, any travel time between sites should also be paid, and you should not be out of pocket for travel costs.' },
];

export default function SecurityScenarioSentHome({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const satCasual = l2?.saturdayCasual ?? 0;
  const shortfall = satCasual > 0 ? formatCurrency(satCasual * 2.5) : '&mdash;';

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You turned up. You got ready. You were sent home after an hour because the event was cancelled or the site didn&apos;t need you. Your employer wants to pay you for 1 hour. The award says otherwise. The Security Services Industry Award has minimum engagement provisions that protect you from exactly this situation.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you attended work as required, you&apos;re owed the minimum engagement pay &mdash; regardless of how long you actually worked.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Security Services Industry Award (MA000016):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Casual employees: minimum engagement of 4 hours per shift</li>
          <li style={{ marginBottom: '6px' }}>Part-time employees: minimum engagement of 4 hours per shift</li>
          <li style={{ marginBottom: '6px' }}>The minimum applies even if you are sent home early, the event is cancelled, or the site doesn&apos;t need you</li>
        </ul>
        <p style={pStyle}>
          This is non-negotiable. Your employer cannot roster you for less than 4 hours or pay you less than 4 hours if you attended as required.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2, rostered for an 8-hour Saturday night shift at an event. Event cancelled after 90 minutes. Employer pays for 90 minutes only.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Paid: 1.5 hours at Saturday casual rate</li>
            <li>Owed: 4 hours at Saturday casual rate (minimum engagement)</li>
            <li>Shortfall: 2.5 hours at the Saturday casual rate</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            At a Saturday casual rate, the shortfall for this single shift could exceed {shortfall}.
          </p>
          <p style={smallStyle}>
            Security work involves frequent event cancellations and early finishes. If this happens regularly, the cumulative shortfall is significant.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Were you paid for at least 4 hours on each shift you attended?</li>
          <li style={{ marginBottom: '8px' }}>Was the rate correct for the day and time (Saturday, Sunday, public holiday)?</li>
          <li style={{ marginBottom: '8px' }}>If you were redirected to another site, was travel time between sites paid?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
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
        General information only. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
