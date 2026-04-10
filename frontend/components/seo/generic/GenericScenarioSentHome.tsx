/**
 * Generic "Sent Home Early" scenario — works for any award.
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

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
}

export default function GenericScenarioSentHome({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const minHours = 3;

  const faqData = [
    { question: `Can my employer send me home early under the ${awardName}?`, answer: `Yes, your employer can send you home early, but they must still pay you for the minimum engagement period. Under most awards, casuals are entitled to a minimum of 2 to 3 hours pay. This means even if you only work 30 minutes, you must be paid for the full minimum period.` },
    { question: 'Does minimum engagement apply to full-time and part-time employees?', answer: 'Minimum engagement rules primarily protect casual employees. However, part-time employees are generally entitled to be paid for their rostered hours. If your employer regularly cuts your rostered shifts short, that may be a breach of your part-time agreement.' },
    { question: 'What if my employer says I agreed to go home early?', answer: 'Even if you agreed to leave, minimum engagement still applies. The entitlement cannot be waived by agreement between you and your employer. If you were rostered and attended work, you are entitled to the minimum hours of pay.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you were sent home early from a {awardName} shift, you are still owed pay for the minimum engagement period &mdash; typically {minHours} hours for casuals.{l1 && <> At the Level 1 casual rate of {formatCurrency(l1.casualRate)}/hr, that means at least {formatCurrency(l1.casualRate * minHours)} even if you only worked a fraction of that time.</>} Your employer cannot send you home after 30 minutes and only pay you for 30 minutes.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The {awardName} includes minimum engagement provisions to protect workers from being called in for unreasonably short shifts. Casual employees are typically entitled to a minimum of 2 to 3 hours of work (or pay) each time they start a shift. This applies regardless of how much work is actually available. The rule exists because you have travel costs, preparation time, and lost opportunity to work elsewhere.
        </p>
      </section>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Casual Level 1 employee under the {awardName} arrives for a rostered shift but is sent home after 1 hour because it is quiet.
            </p>
            <p style={pStyle}>
              <strong>Employer pays:</strong> 1 hour &times; {formatCurrency(l1.casualRate)}/hr = {formatCurrency(l1.casualRate)}
            </p>
            <p style={pStyle}>
              <strong>You are owed:</strong> {minHours} hours &times; {formatCurrency(l1.casualRate)}/hr = <strong>{formatCurrency(l1.casualRate * minHours)}</strong>
            </p>
            <p style={smallStyle}>
              Shortfall: <strong>{formatCurrency(l1.casualRate * (minHours - 1))}</strong>. If this happens once a week for a year, that is {formatCurrency(l1.casualRate * (minHours - 1) * 48)} in lost wages.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Each shift shows at least the minimum engagement hours (typically {minHours} hours for casuals)</li>
          <li style={{ marginBottom: '6px' }}>The hourly rate matches your correct classification level under the {awardName}</li>
          <li style={{ marginBottom: '6px' }}>Short shifts are not rounded down to actual time worked</li>
          <li style={{ marginBottom: '6px' }}>If the shift fell on a weekend or public holiday, the penalty rate was applied to the minimum hours</li>
        </ul>
        <CheckPayCTA awardCode={awardCode} awardName={awardName} />
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
        Rates sourced from the Fair Work Commission pay guide for the {awardName} ({awardCode}), effective {rates?.effectiveDate || '1 July 2025'}. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
