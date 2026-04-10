/**
 * Scenario: Meal Allowance in Fast Food — Am I Entitled?
 * /awards/fast-food-award/scenarios/meal-allowance
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
  { question: 'Do I get a free meal during my shift?', answer: 'The Fast Food Industry Award does not require employers to provide a free meal. However, many fast food chains offer discounted or free meals as a company policy. If your employer provides a meal benefit, it cannot be used to offset or reduce your hourly rate below the award minimum.' },
  { question: 'When does the meal allowance apply?', answer: 'A meal allowance is typically triggered when you are required to work overtime beyond a certain threshold. If you work overtime of more than 1.5 hours and were not told the day before that you would need to work overtime, you may be entitled to a meal allowance. Check the current allowance amount in the award.' },
  { question: 'Can my employer deduct the cost of staff meals from my pay?', answer: 'Only if you have given written consent and the deduction is reasonable. An employer cannot automatically deduct meal costs from your wages without your prior authorisation. Even with consent, the deduction must not reduce your pay below the applicable award rate for the hours worked.' },
];

export default function FFScenarioMealAllowance({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const ot150 = Math.round(baseRate * 1.5 * 100) / 100;
  const mealAllowance = 15.20;
  const otShift3 = Math.round(ot150 * 3 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You may be entitled to a meal allowance if you are required to work overtime without prior notice. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, a meal allowance is payable when overtime exceeds 1.5 hours and you were not notified the previous day.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) provides for a meal allowance when an employee is required to work overtime of more than 1.5 hours and was not informed by the end of the previous day or shift that overtime would be required. The allowance is designed to cover the cost of purchasing a meal when you cannot plan ahead. The current meal allowance amount is indexed annually — check the current rate as it increases each year on 1 July.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1, asked to stay 3 hours overtime without prior notice</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Overtime rate (150%): ${ot150.toFixed(2)}/hr</li>
            <li>3 hours overtime pay: ${otShift3.toFixed(2)}</li>
            <li>Meal allowance (approx): ${mealAllowance.toFixed(2)}</li>
            <li>Total owed: ${(otShift3 + mealAllowance).toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            Without the meal allowance, you&apos;re short ${mealAllowance.toFixed(2)}. Many employers miss this entitlement entirely.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>When you work overtime without prior notice, is a meal allowance shown on your payslip?</li>
          <li>Is the allowance amount consistent with the current indexed rate?</li>
          <li>Are any meal deductions being taken from your pay without your written consent?</li>
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
