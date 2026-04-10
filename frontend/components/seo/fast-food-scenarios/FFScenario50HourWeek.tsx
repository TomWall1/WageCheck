/**
 * Scenario: No Overtime for a 50-Hour Fast Food Week
 * /awards/fast-food-award/scenarios/50-hour-week
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
  { question: 'At what point does overtime start in fast food?', answer: 'For full-time employees, overtime starts after 38 hours per week or after the agreed number of daily ordinary hours. For part-time employees, overtime applies to hours worked beyond their agreed hours. Any hours over 38 per week must be paid at overtime rates.' },
  { question: 'What is the overtime rate under the Fast Food Award?', answer: 'The first 2 hours of overtime are paid at 150% (time and a half) of the ordinary hourly rate. After 2 hours of overtime, the rate increases to 200% (double time). These rates apply per day, not per week — so each day\'s overtime is calculated separately.' },
  { question: 'Can my employer ask me to work 50 hours without overtime pay?', answer: 'No. If you\'re a full-time employee, any hours over 38 per week (or your agreed daily ordinary hours) must be paid at overtime rates. Your employer cannot ask you to work 50 hours at a flat rate. Even if you agreed to it verbally, the award entitlements cannot be contracted out of.' },
];

export default function FFScenario50HourWeek({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const ot150 = Math.round(baseRate * 1.5 * 100) / 100;
  const ot200 = Math.round(baseRate * 2.0 * 100) / 100;
  const ordPay = Math.round(baseRate * 38 * 100) / 100;
  const otPay = Math.round(ot150 * 2 * 5 * 100) / 100 + Math.round(ot200 * 0 * 100) / 100;
  // 50hrs = 38 ord + 12 OT. Assume 2hrs OT per day for 5 days = 10hrs at 150%, 2hrs at 200%
  const otFirst = Math.round(ot150 * 10 * 100) / 100;
  const otSecond = Math.round(ot200 * 2 * 100) / 100;
  const totalCorrect = Math.round((ordPay + otFirst + otSecond) * 100) / 100;
  const flatTotal = Math.round(baseRate * 50 * 100) / 100;
  const shortfall = Math.round((totalCorrect - flatTotal) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you worked 50 hours in a week at a fast food job and weren&apos;t paid overtime, you are being underpaid. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> requires overtime rates for every hour over 38 per week.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fast Food Industry Award (MA000003), ordinary hours for a full-time employee are 38 per week. Any time worked beyond 38 hours is overtime. The first 2 hours of overtime each day are paid at 150% (time and a half). After that, the rate jumps to 200% (double time). Your employer cannot avoid paying overtime by calling it &quot;extra shifts&quot; or rostering you across multiple roles.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 full-time, 50-hour week (Mon&ndash;Fri, 10 hrs/day)</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>38 ordinary hours at ${baseRate.toFixed(2)}/hr: ${ordPay.toFixed(2)}</li>
            <li>10 hours overtime at 150%: ${otFirst.toFixed(2)}</li>
            <li>2 hours overtime at 200%: ${otSecond.toFixed(2)}</li>
            <li>Correct total: ${totalCorrect.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At a flat ${baseRate.toFixed(2)}/hr for all 50 hours, you&apos;d receive ${flatTotal.toFixed(2)} &mdash; a shortfall of ${shortfall.toFixed(2)} per week.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are hours beyond 38 per week shown at a higher rate?</li>
          <li>Is overtime itemised as 150% and 200% separately?</li>
          <li>Does your total pay reflect the overtime, not just a flat rate for all hours?</li>
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
