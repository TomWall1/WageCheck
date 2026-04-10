/**
 * Scenario: Paid Below Award Rate in Security
 * URL: /awards/security-award/scenarios/below-award
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
  { question: 'Can my employer pay below the award if I agreed to it?', answer: 'No. The Security Services Industry Award sets legally binding minimum rates. You cannot agree to be paid less, even in writing. Any contract or agreement that pays below the award is void to the extent it falls short. The award minimum is a floor, not a starting point for negotiation downward.' },
  { question: 'How do I know if my rate is below the award?', answer: 'Check your hourly rate against the current pay guide for your classification level and employment type. Remember that the "award rate" is not just the base rate — it includes penalty rates for nights, weekends, and public holidays. You might be above the base rate but below the award once penalties are included.' },
  { question: 'What can I recover if I have been paid below award?', answer: 'You can recover the full difference between what you were paid and what you should have been paid, going back up to 6 years. This includes base rate shortfalls, missing penalty rates, unpaid overtime, and missing superannuation. Interest may also apply. The Fair Work Ombudsman can assist with recovery at no cost to you.' },
];

export default function SecurityScenarioBelowAward({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const phCasualRate = l2?.publicHolidayCasual ?? 55;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Being paid below the award rate in security is more common than most people realise. It doesn&apos;t always look like an obviously low hourly number &mdash; often the base rate appears reasonable, but penalty rates, night loadings, and overtime are missing or miscalculated. The result is the same: you&apos;re taking home less than the law requires.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Below-award pay in security usually hides in the penalties, not the base rate. That&apos;s why it goes unnoticed.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>The Security Services Industry Award (MA000016) sets minimum rates that employers must meet or exceed:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Base hourly rate: varies by classification level (Level 1 through Level 5)</li>
          <li style={{ marginBottom: '6px' }}>Casual loading: 25% on top of the base rate</li>
          <li style={{ marginBottom: '6px' }}>Penalty rates: apply for evening, night, Saturday, Sunday, and public holiday work</li>
          <li style={{ marginBottom: '6px' }}>Overtime: 1.5x for the first 2 hours, 2x thereafter</li>
          <li style={{ marginBottom: '6px' }}>Allowances: uniform, equipment, and other allowances where applicable</li>
        </ul>
        <p style={pStyle}>
          Every one of these components is part of the minimum. Missing any one of them means you are being paid below the award.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2. Employer pays $30/hr for all shifts. The guard works a mix of weekday evenings, Friday/Saturday overnights, and occasional public holidays.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Weekday evening:</strong> $30/hr may meet or slightly exceed the casual rate with evening loading. Borderline.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Saturday overnight:</strong> The correct Saturday night casual rate is well above $30/hr. Below award.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Public holiday:</strong> The casual public holiday rate exceeds {formatCurrency(phCasualRate)}/hr. Massively below award.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            The $30/hr rate passes on weekday evenings but fails on every weekend, overnight, and public holiday shift.
          </p>
          <p style={smallStyle}>
            Because most security hours are worked at these premium times, the overall underpayment is significant.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Compare your payslip rate to the current award rate for your level and employment type</li>
          <li style={{ marginBottom: '8px' }}>Check that penalty rates are applied correctly for each shift type</li>
          <li style={{ marginBottom: '8px' }}>Verify your classification level matches the duties you actually perform</li>
          <li style={{ marginBottom: '8px' }}>Confirm overtime is calculated at 1.5x/2x, not the ordinary rate</li>
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
