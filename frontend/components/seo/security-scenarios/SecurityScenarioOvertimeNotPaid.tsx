/**
 * Scenario: Extra Hours in Security and No Overtime
 * URL: /awards/security-award/scenarios/overtime-not-paid
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
  { question: 'My shift was supposed to be 8 hours but I stayed for 12 — is the extra 4 hours overtime?', answer: 'Yes. Under the Security Services Industry Award, hours worked beyond the ordinary hours for the day trigger overtime. If your ordinary hours are 8 per day, the additional 4 hours are overtime — the first 2 at time-and-a-half and the next 2 at double time. Your employer cannot pay these hours at the ordinary rate.' },
  { question: 'I work 50 hours a week — does overtime apply?', answer: 'Yes. The standard full-time hours under the award are 38 per week. Hours beyond 38 in a week are overtime, even if no individual shift exceeds the daily ordinary hours threshold. At 50 hours per week, you are owed 12 hours of overtime pay every week.' },
  { question: 'Can my employer give me time off instead of overtime pay?', answer: 'Time off in lieu (TOIL) is permitted under the award, but only by genuine written agreement with the employee. The TOIL must be taken at the overtime rate — so 1 hour of overtime at time-and-a-half equals 1.5 hours of time off. If your employer is simply not paying overtime and not offering equivalent TOIL, that is underpayment.' },
];

export default function SecurityScenarioOvertimeNotPaid({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = l2?.ftRate ?? 28;
  const ot15 = Math.round(baseRate * 1.5 * 100) / 100;
  const ot20 = Math.round(baseRate * 2 * 100) / 100;
  const ordTotal = Math.round(baseRate * 8 * 100) / 100;
  const ot15Total = Math.round(ot15 * 2 * 100) / 100;
  const ot20Total = Math.round(ot20 * 2 * 100) / 100;
  const correctTotal = Math.round((ordTotal + ot15Total + ot20Total) * 100) / 100;
  const flatTotal = Math.round(baseRate * 12 * 100) / 100;
  const shortfall = Math.round((correctTotal - flatTotal) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You stayed late because your relief didn&apos;t show. You worked back-to-back shifts because the site was short-staffed. You hit 50 hours this week. And your pay looks the same as it would for 38. In the security industry, unpaid overtime is one of the most common and costly forms of underpayment. The award is explicit: overtime hours attract premium rates. Paying ordinary rates for overtime hours is not legal.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your employer benefits from you working extra hours, those hours must be paid at overtime rates.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Security Services Industry Award (MA000016):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Overtime is triggered by hours beyond ordinary in a day, or beyond 38 in a week</li>
          <li style={{ marginBottom: '6px' }}>First 2 overtime hours: 150% of the base rate (time and a half)</li>
          <li style={{ marginBottom: '6px' }}>After 2 overtime hours: 200% of the base rate (double time)</li>
          <li style={{ marginBottom: '6px' }}>Sunday overtime: 200% for the entire period</li>
          <li style={{ marginBottom: '6px' }}>Public holiday overtime: 250% of the base rate</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time security guard, base rate {formatCurrency(baseRate)}/hr. Rostered for 8-hour shifts but regularly works 12 hours because relief is late or doesn&apos;t show. Paid a flat {formatCurrency(baseRate)}/hr for all hours.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>First 8 hours (ordinary): {formatCurrency(baseRate)}/hr = {formatCurrency(ordTotal)}</li>
            <li>Next 2 hours (1.5x): {formatCurrency(ot15)}/hr = {formatCurrency(ot15Total)}</li>
            <li>Next 2 hours (2x): {formatCurrency(ot20)}/hr = {formatCurrency(ot20Total)}</li>
            <li>Correct total: {formatCurrency(correctTotal)}</li>
            <li>Flat rate total: {formatCurrency(baseRate)} x 12 = {formatCurrency(flatTotal)}</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Shortfall: {formatCurrency(shortfall)} per shift. If this happens twice a week, that is {formatCurrency(shortfall * 2)}/week or ~{formatCurrency(shortfall * 2 * 52)}/year.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Are overtime hours shown separately on your payslip?</li>
          <li style={{ marginBottom: '8px' }}>Is the overtime rate 1.5x or 2x your base rate?</li>
          <li style={{ marginBottom: '8px' }}>Do your total weekly hours exceed 38? If so, are the excess hours at overtime rates?</li>
          <li style={{ marginBottom: '8px' }}>Were you offered TOIL at the correct overtime-equivalent rate?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
