/**
 * Scenario: Paid Below Award Rate in Fast Food — What Can I Do?
 * /awards/fast-food-award/scenarios/below-award
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
  { question: 'How far back can I claim underpaid wages in fast food?', answer: 'You can recover underpaid wages going back 6 years from the date you file your claim. This applies whether you\'re still employed or have already left the job. The sooner you act, the more complete your records are likely to be.' },
  { question: 'Does it cost anything to lodge an underpayment claim with the Fair Work Ombudsman?', answer: 'No. Filing a complaint with the Fair Work Ombudsman is completely free. You can do it online at fairwork.gov.au. You don\'t need a lawyer, though you can seek free advice from community legal centres if your case is complex.' },
  { question: 'Can my employer fire me for asking about underpayment?', answer: 'No. It is illegal for your employer to take adverse action against you for raising a workplace complaint or exercising a workplace right. This includes reducing your hours, changing your roster unfavourably, or terminating your employment. If this happens, it\'s a separate breach of the Fair Work Act.' },
];

export default function FFScenarioBelowAward({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const casualRate = g1?.casualRate ?? 30.91;
  const weeklyShortfall = Math.round((baseRate - 22.0) * 20 * 100) / 100;
  const yearlyShortfall = Math.round(weeklyShortfall * 52 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You can recover every dollar you&apos;re owed, going back up to 6 years. Filing a complaint with the Fair Work Ombudsman is free and you don&apos;t need a lawyer. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, no employer can legally pay you below the minimum rate — and &quot;that&apos;s just what we pay&quot; is not a defence.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) sets legally binding minimum rates. For a Grade 1 adult employee, the minimum is ${baseRate.toFixed(2)}/hr (or ${casualRate.toFixed(2)}/hr for casuals including the 25% loading). Your employer cannot contract out of these rates, even if you signed an agreement accepting less. Under the Fair Work Act, you have 6 years to recover underpayments. The Fair Work Ombudsman can investigate, issue compliance notices, and pursue penalties against employers.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How much you could be owed</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 worker paid $22.00/hr instead of ${baseRate.toFixed(2)}/hr, 20 hours/week</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Shortfall per hour: ${(baseRate - 22.0).toFixed(2)}</li>
            <li>Shortfall per week (20 hrs): ${weeklyShortfall.toFixed(2)}</li>
            <li>Shortfall per year: ${yearlyShortfall.toFixed(2)}</li>
            <li>Over 6 years: ${(yearlyShortfall * 6).toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            This is base rate only &mdash; missing penalties, super, and allowances add up further.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is your hourly rate at least ${baseRate.toFixed(2)} (permanent) or ${casualRate.toFixed(2)} (casual)?</li>
          <li>Are penalty rates, overtime, and allowances shown as separate line items?</li>
          <li>Does your super contribution appear at 12% of ordinary time earnings?</li>
          <li>Are your total hours recorded accurately — including all time worked?</li>
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
