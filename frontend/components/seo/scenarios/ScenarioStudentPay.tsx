/**
 * Scenario: Student Pay Rates — /awards/hospitality-award/scenarios/student-pay-rates
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left', borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'I\u0027m 20 and studying full-time — do junior rates still apply?', answer: 'Yes. Junior rates apply based on age, not student status. Being a full-time student doesn\u0027t change the applicable rate.' },
  { question: 'I turned 21 six months ago and my rate hasn\u0027t changed — can I claim back pay?', answer: 'Yes. Your employer should have updated your rate on your 21st birthday. The shortfall from that date is recoverable.' },
  { question: 'I\u0027m 17 and working as a bartender — do adult rates apply because I\u0027m in liquor service?', answer: 'Yes. Employees in liquor service receive adult rates regardless of age under the Hospitality Award.' },
];

export default function ScenarioStudentPay({ rates }: { rates?: HospitalityRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l1SundayCasual = l1?.sundayCasual ?? 42.18;
  const juniorSunday = Math.round(l1SundayCasual * 0.70 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Being a student doesn&apos;t change your entitlements &mdash; but your age might. If you&apos;re under 21, junior rates may apply under the Hospitality Award. But those junior rates still include <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a> for weekends and public holidays, and they can only apply for as long as you&apos;re under 21. Once you turn 21, full adult rates apply from that birthday.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a student working in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), junior rates apply to employees under 21 years of age. They are calculated as a percentage of the adult rate:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Age</th>
                <th style={thStyle}>% of adult rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Under 16</td><td style={tdStyle}>40%</td></tr>
              <tr><td style={tdStyle}>16 years</td><td style={tdStyle}>50%</td></tr>
              <tr><td style={tdStyle}>17 years</td><td style={tdStyle}>60%</td></tr>
              <tr><td style={tdStyle}>18 years</td><td style={tdStyle}>70%</td></tr>
              <tr><td style={tdStyle}>19 years</td><td style={tdStyle}>80%</td></tr>
              <tr><td style={tdStyle}>20 years</td><td style={tdStyle}>90%</td></tr>
              <tr><td style={tdStyle}>21 and over</td><td style={tdStyle}>100% (adult rate)</td></tr>
            </tbody>
          </table>
        </div>
        <p style={pStyle}>
          <strong>Important exceptions:</strong> Junior rates do not apply if you hold a trade qualification or are a liquor service employee &mdash; in those cases, adult rates apply regardless of age.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Junior rates still include penalty rates</h2>
        <p style={pStyle}>
          Many employers apply a flat junior rate every day. Junior rates are still subject to penalty rate multipliers for Saturday, Sunday, and public holidays.
        </p>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Example: 18-year-old casual Level 1 working Sunday</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Adult casual Sunday rate: {formatCurrency(l1SundayCasual)}/hr</li>
            <li>Junior rate (70%): {formatCurrency(l1SundayCasual)} &times; 0.70 = {formatCurrency(juniorSunday)}/hr</li>
          </ul>
          <p style={smallStyle}>
            If your Sunday rate looks identical to your Tuesday rate as a junior employee, the penalty multiplier isn&apos;t being applied.
          </p>
        </div>
        <p style={pStyle}>
          If your weekend rates look the same as weekday rates, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your age-based rate &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A worker who turned 21 six months ago and hasn&apos;t had their rate updated is being paid at 90% of the adult rate instead of 100%. At Level 2 base, that gap is approximately {formatCurrency((l2?.casualRate ?? 25.92) * 0.10)}/hr. Working 20hrs/week for 6 months: approximately $1,347 in underpayment since the 21st birthday.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What changes on your 21st birthday</h2>
        <p style={pStyle}>
          On the day you turn 21, adult rates apply from that date. Your employer should update your pay automatically &mdash; many don&apos;t. If you turned 21 and your rate didn&apos;t change, you&apos;ve been underpaid from that date.
        </p>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check whether the right rate is being applied for your age.</p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at fairwork.gov.au.
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
