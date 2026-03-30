/**
 * Scenario: Chef on Salary — /awards/restaurant-award/scenarios/chef-salary
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How do I check if my salary actually covers all my award entitlements?', answer: 'Take your actual hours worked each week — including overtime, weekends, and public holidays — and calculate what the award would pay for those exact hours. Compare that total to your weekly salary. If the award calculation exceeds your salary in any week, you\'re being underpaid that week.' },
  { question: 'My employer says my salary covers everything — is that enough?', answer: 'No. A verbal assurance isn\'t sufficient. Ask for a written calculation showing how your salary covers base rates, overtime, penalties, and allowances for your actual working pattern. If they can\'t provide one, the arrangement likely doesn\'t comply.' },
  { question: 'Can I claim back pay if I\'ve been underpaid on salary?', answer: 'Yes. You can recover up to 6 years of underpayments. The comparison is done week by week — so even if your salary covered the award in quieter weeks, you\'re owed the shortfall for every week where it didn\'t.' },
];

export default function RScenarioChefSalary({ rates }: { rates?: RestaurantRateData }) {
  const l4 = rates ? getLevel(rates, 4) : undefined;
  const l4Ft = l4?.ftRate ?? 27.31;
  // 50hrs/week with Saturdays: 38 base + 12 OT; estimate award total vs $60k salary
  const awardWeekly = Math.round((38 * l4Ft + 4 * l4Ft * 1.25 + 2 * l4Ft * 1.5 + 6 * l4Ft * 1.5) * 100) / 100;
  const salaryWeekly = Math.round(60000 / 52 * 100) / 100;
  const weeklyGap = Math.round(Math.max(awardWeekly - salaryWeekly, 0) * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your salary doesn&apos;t demonstrably exceed all <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> obligations in every week you work &mdash; including <a href="/awards/restaurant-award/overtime" style={linkStyle}>overtime</a> and <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates</a> &mdash; you&apos;re likely owed additional pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A salary doesn&apos;t override the award &mdash; it has to beat it every single week.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          A salaried arrangement is valid only if the salary covers all award entitlements in every pay period. This includes base rates, overtime, weekend and public holiday penalties, late night loadings, and allowances. The test is applied week by week, not averaged over the year.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Warning signs</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Fixed salary regardless of how many hours you work</li>
            <li>No overtime lines ever appear on your payslip</li>
            <li>No annual reconciliation comparing salary to award entitlements</li>
            <li>Working 50+ hour weeks regularly with no additional pay</li>
            <li>Salary hasn&apos;t increased when award rates increased</li>
          </ul>
          <p style={smallStyle}>
            A Level 4 chef working 50 hours/week including Saturdays could be owed {formatCurrency(weeklyGap)}+ per week above a typical $60k salary when all penalties and overtime are calculated under the award.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          During busy periods &mdash; weekends, public holidays, long service &mdash; the award calculation for a chef&apos;s actual hours can far exceed the salary. The shortfall compounds rapidly: a {formatCurrency(weeklyGap)}/week gap over 50 weeks is {formatCurrency(weeklyGap * 50)} per year underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Record your actual hours worked each week, including start/finish times</li>
          <li>Note every weekend, public holiday, and late night shift</li>
          <li>Calculate the award entitlement for those actual hours</li>
          <li>Compare to your weekly salary &mdash; if the award exceeds it, you&apos;re owed the difference</li>
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
        <p style={pStyle}>Calculate what the award would actually pay for your hours.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
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
