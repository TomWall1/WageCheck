/**
 * Scenario: My Fast Food Job Pays a Flat Rate — Is It Legal?
 * /awards/fast-food-award/scenarios/flat-rate
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
  { question: 'Can I agree to a flat rate in my contract?', answer: 'You can agree to a flat rate that is higher than the award, but it must cover all entitlements you would otherwise receive — including penalty rates, overtime, and loadings. If the flat rate doesn\'t fully compensate you for every shift worked at every applicable rate, you\'re being underpaid.' },
  { question: 'How do I check if my flat rate covers the award?', answer: 'Calculate what you would earn under the award for every hour you worked, including weekend penalties, late night loadings, overtime, and public holidays. Compare this total to what you actually received. If the award total is higher, the flat rate is not enough.' },
  { question: 'My employer says $28/hr flat covers everything — is that right?', answer: 'It depends entirely on when you work. At $28/hr, you\'re above the Grade 1 base rate of $24.73 during weekday hours. But on Sundays (150% = $37.10) and public holidays (250% = $61.83), $28/hr falls well short. If you work any weekends or public holidays, a $28 flat rate almost certainly underpays you.' },
];

export default function FFScenarioFlatRate({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const flatRate = 28.00;
  const sundayRate = Math.round(baseRate * 1.5 * 100) / 100;
  const phRate = Math.round(baseRate * 2.5 * 100) / 100;
  const weekday8 = Math.round(flatRate * 8 * 100) / 100;
  const sunday6 = Math.round(flatRate * 6 * 100) / 100;
  const sunday6Award = Math.round(sundayRate * 6 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          A flat rate is only legal if it covers every entitlement you would receive under the award — and in fast food, it almost never does. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> includes penalty rates, overtime, and loadings that a flat rate must fully compensate for every hour you work.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under Australian workplace law, an employer can pay an hourly rate above the award minimum, but the total pay for each pay period must meet or exceed what the employee would have earned under the Fast Food Industry Award (MA000003) including all penalties, loadings, and overtime. This is called the &quot;better off overall&quot; test. A flat rate that looks generous on weekdays can leave you significantly underpaid on Sundays, late nights, and public holidays.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>$28/hr flat rate vs award — Grade 1 with a Sunday shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Flat rate Sunday (6 hrs): ${sunday6.toFixed(2)}</li>
            <li>Award Sunday rate (150%, 6 hrs): ${sunday6Award.toFixed(2)}</li>
            <li>Shortfall on Sunday alone: ${(sunday6Award - sunday6).toFixed(2)}</li>
            <li>Award public holiday rate (250%): ${phRate.toFixed(2)}/hr</li>
          </ul>
          <p style={smallStyle}>
            The flat rate appears fine on weekdays (${flatRate.toFixed(2)} vs ${baseRate.toFixed(2)}) but fails badly on penalty days.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is the same rate shown for every shift regardless of day or time?</li>
          <li>Are weekends, public holidays, and late nights all paid at the same hourly amount?</li>
          <li>Calculate your total award entitlement for the pay period and compare it to what you received.</li>
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
