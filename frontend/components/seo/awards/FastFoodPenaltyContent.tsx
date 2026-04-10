/**
 * Fast Food Award Penalty Rates content — /awards/fast-food-award/penalty-rates
 * Rates: FWO pay guide MA000003 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel, getLevelByStream, getTimeBandMultiplier } from '@/lib/award-rates';
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
  { question: 'Do casual employees get penalty rates under the Fast Food Award?', answer: 'Yes. Casual employees are entitled to penalty rates on Sundays and public holidays. The casual loading and penalties are completely separate entitlements — both apply. Any employer who says otherwise is wrong.' },
  { question: 'Why is there no Saturday penalty in fast food?', answer: 'The Fast Food Award treats Saturday as a normal working day at ordinary rates. This is different from many other awards. However, Sunday and public holiday penalties still apply in full and are frequently underpaid.' },
  { question: 'What if my shift started Saturday and ended Sunday morning?', answer: 'Sunday rates apply from midnight. The Saturday ordinary rate covers only the pre-midnight hours. Paying one rate for the whole overnight shift is a common error.' },
  { question: 'Can I recover penalty rates I was not paid?', answer: 'Yes — up to 6 years back under the Fair Work Act. The Fair Work Ombudsman can recover these on your behalf.' },
];

export default function FastFoodPenaltyContent({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const g3s = rates ? getLevelByStream(rates, 3, 'solo') : undefined;
  const g3r = rates ? getLevelByStream(rates, 3, 'responsible') : undefined;

  const eveningMult = rates ? getTimeBandMultiplier(rates, 'evening_10pm_to_midnight') : 0;
  const nightMult = rates ? getTimeBandMultiplier(rates, 'night_midnight_to_6am') : 0;
  const eveningPct = rates && eveningMult > 1 ? Math.round((eveningMult - 1) * 100) + '%' : '10%';
  const nightPct = rates && nightMult > 1 ? Math.round((nightMult - 1) * 100) + '%' : '15%';

  /* Example scenario values — Grade 1 casual */
  const g1CasRate = g1 ? g1.casualRate : 0;
  const g1SunCas = g1 ? g1.sundayCasual : 0;
  const exCasOrd = g1 ? formatCurrency(g1CasRate) : '&mdash;';
  const exCasOrdTotal = g1 ? formatCurrency(g1CasRate * 6) : '&mdash;';
  const exSunCas = g1 ? formatCurrency(g1SunCas) : '&mdash;';
  const exSunCasTotal = g1 ? formatCurrency(g1SunCas * 6) : '&mdash;';
  const exUnderpay = g1 ? formatCurrency((g1SunCas - g1CasRate) * 6) : '&mdash;';
  const exYearly = g1 ? formatCurrency((g1SunCas - g1CasRate) * 6 * 52) : '&mdash;';

  /* Grade 1 casual Sunday vs Grade 3 Responsible casual Sunday gap */
  const g3rSunCas = g3r ? g3r.sundayCasual : 0;
  const gapPerHr = g1 && g3r ? formatCurrency(g3rSunCas - g1SunCas) : '&mdash;';
  const gapPer6hr = g1 && g3r ? formatCurrency((g3rSunCas - g1SunCas) * 6) : '&mdash;';
  const gapPerYear = g1 && g3r ? formatCurrency((g3rSunCas - g1SunCas) * 6 * 52) : '&mdash;';

  /* Mini example: Grade 1 casual closing shift with late-night loading */
  const g1CasEve = g1 && eveningMult > 1 ? formatCurrency(g1.casualRate * eveningMult) : '&mdash;';
  const g1CasEveDiff = g1 && eveningMult > 1 ? formatCurrency(g1.casualRate * eveningMult * 2 - g1.casualRate * 2) : '&mdash;';

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work Sundays or public holidays in fast food, there is a high chance your penalty rates have been applied incorrectly &mdash; or not applied at all. Sunday shifts are the most frequently underpaid scenario across the entire award. This page shows every rate you are entitled to and the calculator checks your actual shifts.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work Sundays, public holidays, or late nights at any fast food venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual crew member, Grade 1. 6-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {exCasOrd}/hr (standard casual rate) &times; 6hrs = {exCasOrdTotal}</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday casual rate at Grade 1 &mdash; {exSunCas}/hr &times; 6hrs = {exSunCasTotal}</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            A 6-hour Sunday casual shift at Grade 1 should pay {exSunCasTotal} &mdash; not {exCasOrdTotal} at ordinary rates. That is {exUnderpay} underpaid on one shift alone.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Over a year of one Sunday shift per week: {exYearly} underpaid.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the same casual rate every day. The Sunday multiplier is never applied.
          </p>
        </div>
      </section>

      {/* At a glance */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>At a glance &mdash; Fast Food penalty rate multipliers</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Saturday</strong> &rarr; Ordinary rate (1.0&times;) &mdash; no penalty (unique to fast food)</li>
          <li><strong>Sunday (FT/PT)</strong> &rarr; 1.5&times; ordinary rate</li>
          <li><strong>Sunday (casual)</strong> &rarr; 1.75&times; ordinary rate (including casual loading)</li>
          <li><strong>Public holiday (FT/PT)</strong> &rarr; 2.5&times; ordinary rate</li>
          <li><strong>Public holiday (casual)</strong> &rarr; 2.75&times; ordinary rate (including casual loading)</li>
          <li><strong>Late night 10pm&ndash;midnight</strong> &rarr; +{eveningPct} loading on base rate</li>
          <li><strong>Late night midnight&ndash;6am</strong> &rarr; +{nightPct} loading on base rate</li>
        </ul>
      </section>

      {/* Context */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award Penalty Rates Australia (MA000003)</h2>
        <p style={pStyle}>
          The Fast Food Industry Award 2010 sets these rates as legal minimums. Your employer cannot pay less, regardless of what your contract or roster says.
        </p>
        <p style={pStyle}>
          If your payslip does not clearly show each day&apos;s rate separately, that is often a red flag.
        </p>
      </section>

      {/* Full penalty rates table — FT/PT */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Full penalty rates table &mdash; Full-time/Part-time (adult)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>When you work</th>
                <th style={thStyle}>Grade 1</th>
                <th style={thStyle}>Grade 2</th>
                <th style={thStyle}>Grade 3 Solo</th>
                <th style={thStyle}>Grade 3 Resp.</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Weekday ordinary</td><td style={tdStyle}>{g1 ? formatCurrency(g1.ftRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 ? formatCurrency(g2.ftRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s ? formatCurrency(g3s.ftRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r ? formatCurrency(g3r.ftRate) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>{g1 ? formatCurrency(g1.saturdayFt) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 ? formatCurrency(g2.saturdayFt) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s ? formatCurrency(g3s.saturdayFt) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r ? formatCurrency(g3r.saturdayFt) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Sunday (150%)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.sundayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.sundayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.sundayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.sundayFt) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Public holiday (250%)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.publicHolidayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.publicHolidayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.publicHolidayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.publicHolidayFt) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Late night (10pm&ndash;midnight)</td><td style={tdStyle}>{g1 && eveningMult > 1 ? formatCurrency(g1.ftRate * eveningMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 && eveningMult > 1 ? formatCurrency(g2.ftRate * eveningMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s && eveningMult > 1 ? formatCurrency(g3s.ftRate * eveningMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r && eveningMult > 1 ? formatCurrency(g3r.ftRate * eveningMult) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Late night (midnight&ndash;6am)</td><td style={tdStyle}>{g1 && nightMult > 1 ? formatCurrency(g1.ftRate * nightMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 && nightMult > 1 ? formatCurrency(g2.ftRate * nightMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s && nightMult > 1 ? formatCurrency(g3s.ftRate * nightMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r && nightMult > 1 ? formatCurrency(g3r.ftRate * nightMult) : '&mdash;'}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates for adult full-time/part-time employees. Based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Casual penalty rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Casual penalty rates table (adult)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>When you work</th>
                <th style={thStyle}>Grade 1</th>
                <th style={thStyle}>Grade 2</th>
                <th style={thStyle}>Grade 3 Solo</th>
                <th style={thStyle}>Grade 3 Resp.</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Weekday ordinary</td><td style={tdStyle}>{g1 ? formatCurrency(g1.casualRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 ? formatCurrency(g2.casualRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s ? formatCurrency(g3s.casualRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r ? formatCurrency(g3r.casualRate) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>{g1 ? formatCurrency(g1.saturdayCasual) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 ? formatCurrency(g2.saturdayCasual) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s ? formatCurrency(g3s.saturdayCasual) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r ? formatCurrency(g3r.saturdayCasual) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Sunday (175%)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.sundayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.sundayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.sundayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.sundayCasual) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Public holiday (275%)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.publicHolidayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.publicHolidayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.publicHolidayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.publicHolidayCasual) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Late night (10pm&ndash;midnight)</td><td style={tdStyle}>{g1 && eveningMult > 1 ? formatCurrency(g1.casualRate * eveningMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 && eveningMult > 1 ? formatCurrency(g2.casualRate * eveningMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s && eveningMult > 1 ? formatCurrency(g3s.casualRate * eveningMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r && eveningMult > 1 ? formatCurrency(g3r.casualRate * eveningMult) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Late night (midnight&ndash;6am)</td><td style={tdStyle}>{g1 && nightMult > 1 ? formatCurrency(g1.casualRate * nightMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 && nightMult > 1 ? formatCurrency(g2.casualRate * nightMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s && nightMult > 1 ? formatCurrency(g3s.casualRate * nightMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r && nightMult > 1 ? formatCurrency(g3r.casualRate * nightMult) : '&mdash;'}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Casual rates include the 25% loading. Based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
      </section>

      {/* Late-night loadings detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Late-night loadings</h2>
        <p style={pStyle}>
          Late-night loadings are one of the least understood parts of the Fast Food Award &mdash; and one of the biggest sources of underpayment for closing crews.
        </p>
        <p style={pStyle}>
          The loadings are additions to your base rate, applied per hour:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>10pm to midnight:</strong> {eveningPct} loading on ordinary rate</li>
          <li><strong>Midnight to 6am:</strong> {nightPct} loading on ordinary rate</li>
        </ul>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Mini example</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Grade 1 casual closing shift, 8pm to midnight:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>8pm &ndash; 10pm: {exCasOrd}/hr (ordinary casual rate)</li>
            <li>10pm &ndash; midnight: {g1CasEve}/hr (ordinary casual rate + {eveningPct} loading)</li>
          </ul>
          <p style={pStyle}>
            Most employers pay the same rate for the whole shift. The last 2 hours should be {g1CasEveDiff} more.
          </p>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common penalty rate underpayments</h2>

          <h3 style={h3Style}>Flat rate every day of the week</h3>
          <p style={pStyle}>
            One rate regardless of Sunday or public holiday. Unless the flat rate has been formally assessed against every penalty scenario, this is almost always underpayment.
          </p>

          <h3 style={h3Style}>Casual loading treated as a substitute for penalty rates</h3>
          <p style={pStyle}>
            The 25% casual loading and penalty rates are separate entitlements &mdash; both apply. See the <a href="/awards/fast-food-award/casual-employees" style={linkStyle}>Fast Food Award casual employees guide</a> for how they stack.
          </p>

          <h3 style={h3Style}>Late-night loadings never applied</h3>
          <p style={pStyle}>
            Closing shifts past 10pm attract a {eveningPct} loading. Overnight shifts past midnight attract {nightPct}. Many fast food employers never apply these, costing closing crews $3&ndash;$5 per hour.
          </p>

          <h3 style={h3Style}>Shift crossing midnight not split correctly</h3>
          <p style={pStyle}>
            If a Saturday shift runs past midnight, Sunday rates apply from midnight. Many employers pay the Saturday rate for the whole shift.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now &mdash; it takes 2 minutes.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Penalty rates by grade */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Why your grade matters for penalty rates</h2>
        <p style={pStyle}>
          Because penalty rates are calculated from your base rate, your classification grade directly affects every penalty you are paid. A misclassified worker is underpaid on every affected shift.
        </p>
        <p style={pStyle}>
          For example, a Grade 1 casual on a Sunday earns {g1 ? formatCurrency(g1.sundayCasual) : '&mdash;'}/hr. A Grade 3 Responsible casual on the same Sunday earns {g3r ? formatCurrency(g3r.sundayCasual) : '&mdash;'}/hr. That is {gapPerHr}/hr more &mdash; {gapPer6hr} on a 6-hour shift. Over a year of weekly Sundays, that is {gapPerYear} in the gap alone.
        </p>
        <p style={pStyle}>
          Not sure of your grade? See the <a href="/awards/fast-food-award/classifications" style={linkStyle}>Fast Food Award classifications guide</a>.
        </p>
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
          Not sure if you are being paid correctly? Check now.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every penalty rate, late-night loading, and public holiday multiplier.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you will know for certain if you have been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000003).
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fast Food Industry Award 2010 (MA000003), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
