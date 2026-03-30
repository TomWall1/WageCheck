/**
 * Restaurant Award Penalty Rates content — /awards/restaurant-award/penalty-rates
 * Rates: FWO pay guide MA000119 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel, getLateNightLoading, getEarlyMorningLoading } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500,
  color: 'var(--secondary)', marginBottom: '10px', marginTop: '0',
};
const h3Style: React.CSSProperties = {
  fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0',
};
const pStyle: React.CSSProperties = {
  fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem',
};
const smallStyle: React.CSSProperties = {
  fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6,
};
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)', border: '1.5px solid var(--accent)',
  borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem',
};
const exampleBoxStyle: React.CSSProperties = {
  background: '#f8f9fa', border: '1.5px solid var(--border)',
  borderRadius: '10px', padding: '20px', marginBottom: '1.5rem',
};
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Can my employer pay a flat rate that covers all penalties?', answer: 'Only if they can prove, with actual numbers, that the flat rate exceeds award entitlements in every scenario including public holidays, Sundays, and late-night shifts. In practice, most can\'t.' },
  { question: 'Do casual employees get penalty rates on top of the loading?', answer: 'Yes. The 25% casual loading and penalty rates are separate entitlements \u2014 both apply. Any employer who says the loading covers weekends is wrong.' },
  { question: 'Is the Sunday rate different under the Restaurant Award compared to the Hospitality Award?', answer: 'The multiplier structure is similar (1.5\u00d7 for permanent Sunday), but the Restaurant Award has level-dependent Sunday casual rates \u2014 Level 1\u20132 workers attract a different casual Sunday multiplier than Level 3\u20136 workers.' },
  { question: 'What happens if my shift starts Saturday and crosses midnight into Sunday?', answer: 'Sunday rates apply from midnight. The Saturday rate covers only the pre-midnight hours. Paying one rate for the whole overnight shift is a frequently missed issue.' },
];

export default function RestaurantPenaltyContent({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);
  const l3Cas = l3?.casualRate ?? 0;
  const l3SunCas = l3?.sundayCasual ?? 0;
  const lateNight = getLateNightLoading(rates);
  const earlyMorning = getEarlyMorningLoading(rates);
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work Sundays in a restaurant or caf&eacute; and your pay looks the same as a weekday, you&apos;re very likely being underpaid. Sunday shifts are the most frequently underpaid scenario across the entire award. This page shows every penalty rate you&apos;re entitled to and the calculator checks your actual shifts.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work Saturdays, Sundays, public holidays, or late nights in any restaurant or caf&eacute; &mdash; this applies to you.
        </p>
        <p style={pStyle}>
          For the full Restaurant Award overview, see the <a href="/awards/restaurant-award/" style={linkStyle}>Restaurant Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual food and beverage attendant, Level 3. 6-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l3Cas)}/hr (standard casual rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday casual rate at Level 3 &mdash; {formatCurrency(l3SunCas)}/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~{formatCurrency((l3SunCas - l3Cas) * 6)} for one shift. ~{formatCurrency((l3SunCas - l3Cas) * 6 * 52)}/year working one Sunday per week.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the same casual rate every day. The Sunday multiplier is never applied.
          </p>
        </div>
      </section>

      {/* At a glance */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>At a glance &mdash; Restaurant Award penalty rate multipliers</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Saturday</strong> &rarr; 1.25&times; ordinary rate</li>
          <li><strong>Sunday</strong> &rarr; 1.5&times; ordinary rate</li>
          <li><strong>Public holiday</strong> &rarr; 2.25&times; ordinary rate</li>
          <li><strong>Late night (10pm&ndash;midnight)</strong> &rarr; +{formatCurrency(lateNight)}/hr on top of base</li>
          <li><strong>Early morning (midnight&ndash;6am)</strong> &rarr; +{formatCurrency(earlyMorning)}/hr on top of base</li>
        </ul>
        <p style={pStyle}>
          Note: Unlike the Hospitality Award, the Restaurant Award does not apply an evening loading before 10pm. The late-night loading begins at 10pm, not 7pm.
        </p>
      </section>

      {/* Level-dependent Sunday rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Level-dependent Sunday casual rates</h2>
        <p style={pStyle}>
          Sunday casual rates differ by classification level &mdash; Level 1&ndash;2 workers attract a lower multiplier than Level 3&ndash;6 workers. This is a key difference from the Hospitality Award where a single Sunday multiplier applies across all levels.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Sunday (permanent)</th>
                <th style={thStyle}>Sunday (casual)</th>
                <th style={thStyle}>Public holiday (casual)</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 6).map(l => (
                <tr key={l.level}><td style={tdStyle}>Level {l.level}</td><td style={tdStyle}>{formatCurrency(l.sundayFt)}/hr</td><td style={tdStyle}>{formatCurrency(l.sundayCasual)}/hr</td><td style={tdStyle}>{formatCurrency(l.publicHolidayCasual)}/hr</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Not sure of your classification? See the <a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications guide</a>.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Late night and early morning loadings */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Late night and early morning loadings</h2>
        <p style={pStyle}>
          These loadings are additions to your base rate, applied per hour. They compensate for the unsociable hours of late-night and early-morning work.
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>10pm to midnight:</strong> +{formatCurrency(lateNight)}/hr on top of your ordinary or penalty rate</li>
          <li><strong>Midnight to 6am:</strong> +{formatCurrency(earlyMorning)}/hr on top of your ordinary or penalty rate</li>
        </ul>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Mini example</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            You work a Saturday shift from 8pm to 1am.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>Hours 8pm&ndash;10pm = Saturday rate (no loading)</li>
            <li>Hours 10pm&ndash;midnight = Saturday rate + late-night loading</li>
            <li>Hours midnight&ndash;1am = Sunday rate + early-morning loading</li>
          </ul>
          <p style={pStyle}>
            Most employers pay Saturday rate for the whole shift. That&apos;s wrong from 10pm onwards.
          </p>
        </div>
        <p style={pStyle}>
          Most payslips don&apos;t show these separately &mdash; but they must still be paid.
        </p>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common penalty rate underpayments</h2>

          <h3 style={h3Style}>Same rate on Saturdays, Sundays, and public holidays</h3>
          <p style={pStyle}>
            One rate regardless of the day. Unless the flat rate has been formally assessed against every penalty scenario, this is almost always underpayment.
          </p>

          <h3 style={h3Style}>Sunday line missing from payslip</h3>
          <p style={pStyle}>
            If your payslip doesn&apos;t break out Sunday hours separately with a different rate, it&apos;s likely the penalty isn&apos;t being applied.
          </p>

          <h3 style={h3Style}>No loading for shifts after 10pm</h3>
          <p style={pStyle}>
            The late-night loading of +{formatCurrency(lateNight)}/hr applies from 10pm. If your late shifts show the same rate as an afternoon shift, the loading is missing.
          </p>

          <h3 style={h3Style}>Casual loading explained as covering weekends</h3>
          <p style={pStyle}>
            The 25% casual loading and penalty rates are separate entitlements &mdash; both apply. See the <a href="/awards/restaurant-award/casual-employees" style={linkStyle}>Restaurant Award casual employees guide</a> for how they stack.
          </p>

          <p style={pStyle}>
            If your employer isn&apos;t paying overtime on long shifts either, see the <a href="/awards/restaurant-award/overtime" style={linkStyle}>Restaurant Award overtime guide</a>.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now &mdash; it takes 2 minutes.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every penalty rate, late-night loading, and public holiday multiplier.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000119).
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Restaurant Industry Award 2020 (MA000119), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>

      {/* FAQPage Schema */}
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
