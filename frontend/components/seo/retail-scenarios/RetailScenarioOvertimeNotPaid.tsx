/**
 * Scenario: Overtime Not Paid in Retail — /awards/retail-award/scenarios/overtime-not-paid
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'I stay 30 minutes late every shift to close — is that overtime?', answer: 'If those extra 30 minutes push you beyond your rostered hours and beyond the weekly or daily overtime threshold, yes. For full-time employees, overtime applies after 38 hours per week. For part-time employees, it applies after their agreed hours. Even 30 minutes per shift adds up to 2.5 hours per week of unpaid overtime.' },
  { question: 'My employer says I need to finish my tasks before I leave — do I get paid for that?', answer: 'Yes. Any time you are required to be at work performing duties is paid time. If those extra minutes push you into overtime, they must be paid at overtime rates. An employer cannot require you to work without pay by framing it as "finishing your duties."' },
  { question: 'Can I claim back years of unpaid overtime?', answer: 'Yes. You can recover unpaid overtime going back up to 6 years under the Fair Work Act. Keep records of your actual hours worked and compare them to your payslips.' },
];

export default function RetailScenarioOvertimeNotPaid({ rates }: { rates?: AwardRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Unpaid overtime in retail is extremely common and often goes unnoticed. Staying back to cash up registers, arriving early for stocktake, working through lunch during a sale &mdash; none of this is free labour. Under the <a href="/awards/retail-award/" style={linkStyle}>Retail Award</a>, overtime is paid at 1.5&times; for the first 3 hours and 2&times; after that.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Even 20 minutes of unpaid overtime per shift adds up to $2,500+ per year.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Part-time retail worker agreed to 25 hours per week. Regularly works 28 hours due to late closes and shelf restocking. Paid flat rate for all hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> 3 hours per week at 1.5&times; the ordinary rate.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Over a year: ~$3,500 in unpaid overtime from just 3 extra hours per week.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Overtime triggers under the Retail Award</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Full-time:</strong> After 38 hours/week or outside the spread of hours</li>
          <li><strong>Part-time:</strong> After agreed weekly hours or outside agreed days</li>
          <li><strong>All employees:</strong> Work on a rostered day off attracts overtime</li>
          <li><strong>Rate:</strong> First 3 hours at 1.5&times;, all subsequent hours at 2&times;</li>
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
        <p style={pStyle}>Calculate your actual overtime entitlement &mdash; it takes 2 minutes.</p>
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
