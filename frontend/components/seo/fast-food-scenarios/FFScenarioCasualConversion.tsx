/**
 * Scenario: Casual to Permanent in Fast Food — Can I Convert?
 * /awards/fast-food-award/scenarios/casual-conversion
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
  { question: 'After 12 months as a casual in fast food, can I request permanent employment?', answer: 'Yes. Under the Fair Work Act, if you have been employed as a casual for at least 12 months and have worked a regular pattern of hours for at least the last 6 months, you can give your employer a written request to convert to permanent (full-time or part-time) employment. Your employer must respond within 21 days.' },
  { question: 'Will I lose my casual loading if I convert to permanent?', answer: 'Yes — the 25% casual loading stops when you convert. However, you gain paid annual leave (4 weeks), paid personal/carer\'s leave (10 days), and paid public holidays. For most workers doing regular hours, the value of leave entitlements exceeds the casual loading.' },
  { question: 'Can my employer refuse my conversion request?', answer: 'Your employer can only refuse on reasonable business grounds, such as your position being genuinely temporary or your hours needing to significantly change. They must give you the reasons in writing. If you believe the refusal is not genuine, you can raise a dispute through the Fair Work Commission.' },
];

export default function FFScenarioCasualConversion({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const casualRate = g1?.casualRate ?? 30.91;
  const casualWeekly = Math.round(casualRate * 25 * 100) / 100;
  const permWeekly = Math.round(baseRate * 25 * 100) / 100;
  const annualLeaveValue = Math.round(baseRate * 25 * 4 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Yes, you can request to convert to permanent employment after 12 months of regular casual work. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> and the Fair Work Act, your employer must respond to your written request within 21 days and can only refuse on reasonable business grounds.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fair Work Act gives casual employees the right to request conversion to permanent employment after 12 months of service, provided they have worked a regular pattern of hours for at least the last 6 months that could continue as a permanent employee. For small business employers (fewer than 15 employees), different rules apply — but most fast food outlets are part of larger enterprises and must comply with the standard pathway.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What conversion looks like</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 casual working 25 hrs/week converting to part-time</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Current casual rate: ${casualRate.toFixed(2)}/hr (includes 25% loading)</li>
            <li>Permanent rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Weekly pay as casual: ${casualWeekly.toFixed(2)}</li>
            <li>Weekly pay as permanent: ${permWeekly.toFixed(2)}</li>
            <li>Annual leave gained: 4 weeks = ${annualLeaveValue.toFixed(2)} in value</li>
          </ul>
          <p style={smallStyle}>
            You lose the 25% loading but gain paid leave, sick leave, and public holidays &mdash; typically worth more over a year.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Have you been working a regular pattern of hours for at least 6 months?</li>
          <li>Does your start date confirm at least 12 months of service?</li>
          <li>Are your hours consistent enough to be defined as part-time or full-time?</li>
          <li>After conversion, does your payslip show leave accruals instead of casual loading?</li>
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
