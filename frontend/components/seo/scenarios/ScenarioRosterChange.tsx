/**
 * Scenario: My Hospitality Roster Changed at the Last Minute — Am I Still Paid?
 * URL: /awards/hospitality-award/scenarios/roster-change-short-notice
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My shift was cancelled before I arrived — do I still get paid?', answer: 'This is more complex. If you weren\'t given reasonable notice of the cancellation and made yourself available, there may be an argument for payment. This is fact-specific — contact the Fair Work Ombudsman for advice.' },
  { question: 'My employer keeps changing my roster to avoid overtime — is that allowed?', answer: 'Roster manipulation to avoid overtime obligations is a grey area, but the Fair Work Act\'s sham arrangement provisions may apply if the practice is deliberate and systematic.' },
  { question: 'I\'m permanent and my shifts keep changing — what are my rights?', answer: 'Permanent employees have agreed ordinary hours. Ongoing unilateral roster changes may amount to a variation of your employment terms, which requires your agreement.' },
];

export default function ScenarioRosterChange({ rates }: { rates?: HospitalityRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const satCasual = l2?.saturdayCasual ?? 37.92;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          It depends on the circumstances &mdash; but in most cases, yes. The Hospitality Award has provisions about roster changes, minimum engagement, and when workers are entitled to be paid for a shift that&apos;s cancelled or changed at short notice. Being told at the last minute that you&apos;re not needed doesn&apos;t always mean you can be sent home unpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your hospitality roster has been changed or cancelled without adequate notice &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Casual employees</strong> must be paid for a minimum of 3 hours per engagement, even if they arrive and are <a href="/awards/hospitality-award/scenarios/sent-home-early" style={linkStyle}>sent home early</a>. If you arrived for a rostered shift and were sent home after an hour, you&apos;re owed 3 hours&apos; pay at the applicable rate.</li>
          <li><strong>Permanent employees</strong> have rostered ordinary hours. Significant changes to rosters require reasonable notice &mdash; typically 7 days under the award&apos;s rostering provisions, though operational requirements can apply.</li>
          <li><strong>Overtime triggered by a roster change</strong> &mdash; if you&apos;re called in on a day you weren&apos;t rostered and it pushes your week past 38 hours, those extra hours are <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a>.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Example:</strong> Arrived for a Saturday casual shift (Level 2), sent home after 1 hour.
          </p>
          <p style={pStyle}>
            You&apos;re owed 3 &times; {formatCurrency(satCasual)} = {formatCurrency(satCasual * 3)}, not 1 hour.
          </p>
        </div>
        <p style={pStyle}>
          If you were sent home and paid for less than 3 hours, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check what your shifted roster should pay &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          If you arrived for a rostered Saturday shift and were sent home after 1 hour, you&apos;re owed 3 hours at the Saturday casual rate &mdash; not 1 hour at the weekday rate. The difference on a single instance is often $60&ndash;$90. If this happens regularly, the cumulative shortfall is significant.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Were you paid for at least 3 hours on any shift where you were sent home early?</li>
          <li>If you were called in at short notice and it created overtime, does overtime appear on your payslip?</li>
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
        <p style={pStyle}>
          Don&apos;t guess &mdash; check what you&apos;re owed.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at fairwork.gov.au.
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
