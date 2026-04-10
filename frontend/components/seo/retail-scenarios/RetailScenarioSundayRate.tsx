/**
 * Scenario: Sunday Rate in Retail — /awards/retail-award/scenarios/sunday-rate
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
  { question: 'Is the Sunday rate the same for casuals and permanents in retail?', answer: 'Both receive 200% of the ordinary base rate on Sundays. For casuals, this is calculated on the ordinary (non-casual-loaded) base rate at 200%, which means the casual loading is effectively absorbed into the penalty. The result is the same multiplier for both employment types.' },
  { question: 'My employer pays me a "weekend rate" — is that enough for Sundays?', answer: 'Not necessarily. Saturday and Sunday rates under the Retail Award are different. Saturday is 125% for permanent employees and 150% for casuals, while Sunday is 200% for all. A blended "weekend rate" almost always underpays Sundays.' },
  { question: 'I only work Sundays — can I be paid less because of that?', answer: 'No. The Sunday penalty rate applies to every hour worked on a Sunday, regardless of whether you also work other days. Your employer cannot reduce your Sunday rate because you are a Sunday-only worker.' },
];

export default function RetailScenarioSundayRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const casualRate = l1?.casualRate ?? 28.26;
  const sundayRate = l1?.sundayCasual ?? 45.22;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Sunday work in retail pays 200% of the ordinary base rate for all employees &mdash; permanent and casual. If your Sunday pay looks the same as your weekday pay, you are being underpaid. This is the single most common underpayment in Australian retail.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A 6-hour Sunday shift at the wrong rate can cost you $80+ every single week.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the <a href="/awards/retail-award/penalty-rates" style={linkStyle}>General Retail Industry Award</a> (MA000004), all hours worked on a Sunday attract a 200% penalty rate. This applies to full-time, part-time, and casual employees. For casuals, the 200% is calculated on the ordinary base rate (the casual loading is not added on top).
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What this looks like in practice</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Level 1 casual retail worker, 6-hour Sunday shift:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Weekday casual rate: ~{formatCurrency(casualRate)}/hr</li>
            <li>Sunday rate (200% of base): ~{formatCurrency(sundayRate)}/hr</li>
            <li>Correct Sunday pay: ~{formatCurrency(sundayRate * 6)} for 6 hours</li>
            <li>If paid weekday rate: ~{formatCurrency(casualRate * 6)} for 6 hours</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Shortfall: ~{formatCurrency(sundayRate * 6 - casualRate * 6)} on a single 6-hour shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate line for Sunday hours at a higher rate?</li>
          <li>Is the Sunday rate roughly double your weekday rate?</li>
          <li>Are Saturday and Sunday rates different from each other?</li>
        </ul>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
        <p style={pStyle}>Check your Sunday rate matches the award &mdash; it takes 2 minutes.</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
