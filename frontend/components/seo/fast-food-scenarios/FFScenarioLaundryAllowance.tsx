/**
 * Scenario: Washing My Own Uniform for Fast Food — Is There an Allowance?
 * /awards/fast-food-award/scenarios/laundry-allowance
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
  { question: 'How much is the laundry allowance under the Fast Food Award?', answer: 'The laundry allowance is $1.25 per shift where you are required to launder your own uniform. It applies every shift you work, not weekly or fortnightly. If you work 5 shifts a week, that\'s $6.25 per week.' },
  { question: 'Do I get the laundry allowance if my employer provides a uniform but no laundering?', answer: 'Yes. If your employer requires you to wear a uniform and does not provide laundering facilities or a laundering service, you are entitled to the laundry allowance for each shift you work. It doesn\'t matter whether the uniform was free — what matters is who washes it.' },
  { question: 'Can I claim back-pay for laundry allowance I was never paid?', answer: 'Yes. Like any award entitlement, you can recover unpaid laundry allowances going back up to 6 years. At $1.25 per shift over 5 shifts per week, that\'s approximately $325 per year — or nearly $2,000 over 6 years. Contact the Fair Work Ombudsman to lodge a free complaint.' },
];

export default function FFScenarioLaundryAllowance({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const allowance = 1.25;
  const shiftsPerWeek = 5;
  const weeklyTotal = Math.round(allowance * shiftsPerWeek * 100) / 100;
  const yearlyTotal = Math.round(weeklyTotal * 52 * 100) / 100;
  const sixYearTotal = Math.round(yearlyTotal * 6 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Yes — you&apos;re entitled to $1.25 per shift if you wash your own uniform. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, your employer must pay a laundry allowance for every shift where you are required to launder a uniform they make you wear. Most fast food workers never see this on their payslip.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) requires employers to pay a laundry allowance of $1.25 per shift to any employee who is required to wear a uniform and launder it themselves. The allowance applies whether you&apos;re full-time, part-time, or casual. If your employer provides on-site laundering or a laundering service, the allowance does not apply. But if you&apos;re taking your uniform home and washing it yourself, you are owed this amount every single shift.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What it adds up to</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Laundry allowance, {shiftsPerWeek} shifts per week</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Per shift: ${allowance.toFixed(2)}</li>
            <li>Per week ({shiftsPerWeek} shifts): ${weeklyTotal.toFixed(2)}</li>
            <li>Per year: ${yearlyTotal.toFixed(2)}</li>
            <li>Over 6 years (recovery limit): ${sixYearTotal.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            It&apos;s a small amount per shift, but over years of employment it adds up &mdash; and your employer is legally required to pay it.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is a laundry allowance listed as a separate line item on your payslip?</li>
          <li>Does the amount match $1.25 multiplied by the number of shifts you worked?</li>
          <li>Are you required to wear a uniform that your employer does not launder for you?</li>
          <li>Have you been receiving this allowance since your first shift?</li>
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
