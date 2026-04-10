/**
 * Scenario: Fast Food Delivery Driver Pay — Am I Being Paid Correctly?
 * /awards/fast-food-award/scenarios/delivery-driver-pay
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
  { question: 'Does the Fast Food Award cover delivery drivers?', answer: 'If you\'re employed directly by a fast food business (e.g., a pizza shop) to deliver food, you\'re likely covered by the Fast Food Industry Award. If you work for a platform like Uber Eats or DoorDash as an independent contractor, different rules apply. The key question is whether you\'re an employee or a contractor.' },
  { question: 'Am I entitled to a vehicle allowance for using my own car?', answer: 'The Fast Food Industry Award provides a vehicle allowance for employees required to use their own vehicle for work purposes. This covers fuel, wear, and maintenance costs. If your employer requires you to use your own car or motorbike for deliveries, check the current per-kilometre allowance rate.' },
  { question: 'I get paid per delivery — is that legal?', answer: 'If you\'re an employee (not a contractor), you must be paid at least the minimum hourly rate under the award for every hour worked, regardless of how many deliveries you complete. A per-delivery payment structure is only legal if it meets or exceeds the hourly minimum when calculated across your hours. Waiting time between deliveries must also be paid.' },
];

export default function FFScenarioDeliveryDriverPay({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const casualRate = g1?.casualRate ?? 30.91;
  const lateNightRate = Math.round(baseRate * 1.10 * 100) / 100;
  const perDelivery = 6.00;
  const deliveriesPerHour = 3;
  const effectiveRate = perDelivery * deliveriesPerHour;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you are employed by a fast food business to deliver food, you must be paid at least the minimum award rate for every hour worked — not per delivery. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> covers delivery drivers who are direct employees, and all penalty rates and loadings apply.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fast Food Industry Award (MA000003), employees engaged in delivery work are entitled to the same minimum rates, penalty rates, and loadings as other fast food workers. This includes Sunday penalties, late night loadings, public holiday rates, and overtime. If you use your own vehicle, you may also be entitled to a vehicle allowance. All waiting time between deliveries is paid time. Your employer cannot pay you only for time spent actively delivering.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Per-delivery pay vs award minimum — evening shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Award minimum (Grade 1): ${baseRate.toFixed(2)}/hr</li>
            <li>Casual rate: ${casualRate.toFixed(2)}/hr</li>
            <li>Late night rate (after 10pm): ${lateNightRate.toFixed(2)}/hr</li>
            <li>Per-delivery at $6.00 &times; 3 deliveries/hr: ${effectiveRate.toFixed(2)}/hr</li>
          </ul>
          <p style={smallStyle}>
            At ${effectiveRate.toFixed(2)}/hr effective, a per-delivery model falls below the casual minimum of ${casualRate.toFixed(2)}/hr — and that&apos;s before penalties and vehicle costs.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are you paid per hour or per delivery? If per delivery, does it meet the hourly minimum?</li>
          <li>Is waiting time between deliveries included in your paid hours?</li>
          <li>Are late night loadings applied when you deliver after 10pm?</li>
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
