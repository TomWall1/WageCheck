/**
 * Scenario: Fast Food Roster Changed Last Minute — Am I Still Paid?
 * /awards/fast-food-award/scenarios/roster-changed
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How much notice must my employer give to change my roster?', answer: 'The Fast Food Industry Award requires 7 days\' notice for roster changes. This means your employer must give you at least 7 days\' warning before changing your start time, finish time, or days of work. Changes with less notice require your genuine agreement.' },
  { question: 'My shift was cancelled the night before — am I owed anything?', answer: 'If you\'re a permanent employee and your shift was cancelled with less than 7 days\' notice without your agreement, you should be paid for the rostered shift. Casual employees must still receive the minimum 2-hour engagement if they turn up for a shift. If your shift is cancelled before you arrive, there is no minimum payment for casuals, but you should check if a pattern of cancellations indicates you\'re not genuinely casual.' },
  { question: 'Can my employer change my hours from full-time to part-time without agreement?', answer: 'No. Changing your employment status from full-time to part-time is a significant change that requires your agreement. Your employer cannot unilaterally reduce your guaranteed hours. If they attempt to do this, it may constitute a constructive dismissal or breach of the award.' },
];

export default function FFScenarioRosterChanged({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const shift6 = Math.round(baseRate * 6 * 100) / 100;
  const casualRate = l1?.casualRate ?? 30.91;
  const minEngagement = Math.round(casualRate * 2 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Your employer must give you 7 days&apos; notice before changing your roster. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, last-minute roster changes without your genuine agreement are a breach of the award, and you may be entitled to pay for your original rostered hours.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) requires employers to provide 7 days&apos; notice of any change to an employee&apos;s roster, including start times, finish times, and days of work. Rosters must be posted in an accessible location or communicated in writing. Changes with less than 7 days&apos; notice can only be made by mutual agreement, in an emergency, or as a result of a genuine roster swap between employees.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Rostered 6 hours, shift cancelled with 1 day&apos;s notice</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Full-time/part-time: entitled to rostered hours &mdash; ${shift6.toFixed(2)}</li>
            <li>Casual (turned up): minimum 2-hour engagement &mdash; ${minEngagement.toFixed(2)}</li>
            <li>Casual (cancelled before arrival): no minimum payment, but keep records</li>
          </ul>
          <p style={smallStyle}>
            If your employer regularly cancels shifts last minute, this pattern could indicate broader non-compliance. Document every instance.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Were you paid for your originally rostered hours when a shift was changed without 7 days&apos; notice?</li>
          <li>Do your paid hours match what you were originally rostered to work?</li>
          <li>If you&apos;re part-time, are your guaranteed hours being maintained?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
