/**
 * Fast Food Award Pay Rates content — /awards/fast-food-award/pay-rates
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
  { question: 'My payslip does not show a classification grade — is that a problem?', answer: 'Yes. Your employer is required to tell you your classification grade. If it is not on your payslip, you have no way of verifying your rate is correct. Ask your employer to confirm your grade in writing.' },
  { question: 'I have been working for over 6 months — should I still be Grade 1?', answer: 'Possibly not. If you now operate equipment independently, handle stock, or work without direct supervision, you are performing Grade 2 duties and should be reclassified. The pay difference is $0.87/hr — roughly $1,700/year on full-time hours.' },
  { question: 'Can my employer set my grade lower than what my duties require?', answer: 'No. Your classification is determined by the work you actually perform, not what your employer decides. If your duties match a higher grade, you must be paid at that grade — and you may be owed back pay for the difference.' },
];

export default function FastFoodPayRatesContent({ rates }: { rates?: AwardRateData }) {
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

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in fast food and have never checked your classification grade against the award, there is a high chance your base rate is wrong. Your grade determines your minimum hourly rate &mdash; and every penalty, overtime, and leave payment flows from it. Get the base wrong and everything else is wrong too.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work under the Fast Food Industry Award &mdash; this applies to you.
        </p>
        <p style={pStyle}>
          For the full Fast Food Award overview, see the <a href="/awards/fast-food-award/" style={linkStyle}>Fast Food Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example &mdash; what a Sunday shift should pay</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual crew member, Grade 1. 6-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {exCasOrd}/hr (casual ordinary rate) &times; 6hrs = {exCasOrdTotal}</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday casual rate at Grade 1 &mdash; {exSunCas}/hr &times; 6hrs = {exSunCasTotal}</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {exUnderpay} for one shift. {exYearly}/year if this happens every Sunday.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the casual rate every day. The Sunday multiplier is never applied.
          </p>
        </div>
      </section>

      {/* Full pay rates table — FT/PT */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award pay rates 2025 &mdash; Full-time and Part-time</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Ordinary rate</th>
                <th style={thStyle}>Saturday</th>
                <th style={thStyle}>Sunday (150%)</th>
                <th style={thStyle}>Public holiday (250%)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Grade 1</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.ftRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g1 ? formatCurrency(g1.saturdayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.sundayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.publicHolidayFt) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 2</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.ftRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 ? formatCurrency(g2.saturdayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.sundayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.publicHolidayFt) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Solo)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.ftRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s ? formatCurrency(g3s.saturdayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.sundayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.publicHolidayFt) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Responsible)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.ftRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r ? formatCurrency(g3r.saturdayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.sundayFt) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.publicHolidayFt) : '&mdash;'}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Saturday is paid at the ordinary rate under this award. Rates based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
      </section>

      {/* Full pay rates table — Casual */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award casual pay rates 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Casual ordinary rate</th>
                <th style={thStyle}>Saturday</th>
                <th style={thStyle}>Sunday (175%)</th>
                <th style={thStyle}>Public holiday (275%)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Grade 1</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.casualRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g1 ? formatCurrency(g1.saturdayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.sundayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.publicHolidayCasual) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 2</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.casualRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g2 ? formatCurrency(g2.saturdayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.sundayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.publicHolidayCasual) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Solo)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.casualRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3s ? formatCurrency(g3s.saturdayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.sundayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.publicHolidayCasual) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Responsible)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.casualRate) : '&mdash;'}/hr</td><td style={tdStyle}>{g3r ? formatCurrency(g3r.saturdayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.sundayCasual) : '&mdash;'}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.publicHolidayCasual) : '&mdash;'}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Casual rates include the 25% loading. Saturday is paid at the casual ordinary rate (no penalty). Rates based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          For the full breakdown of penalty rate multipliers, see the <a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Fast Food Award penalty rates guide</a>. Not sure of your grade? Check the <a href="/awards/fast-food-award/classifications" style={linkStyle}>Fast Food Award classifications guide</a>. For overtime rules, see the <a href="/awards/fast-food-award/overtime" style={linkStyle}>Fast Food Award overtime guide</a>.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Late-night loadings */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Late-night loadings</h2>
        <p style={pStyle}>
          If you work closing shifts or overnight shifts, late-night loadings apply on top of your ordinary or penalty rate:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Time period</th>
                <th style={thStyle}>Loading</th>
                <th style={thStyle}>Grade 1 FT/PT example</th>
                <th style={thStyle}>Grade 1 casual example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>10pm &ndash; midnight</td><td style={tdStyle}>{eveningPct}</td><td style={tdStyle}>{g1 && eveningMult > 1 ? formatCurrency(g1.ftRate * eveningMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g1 && eveningMult > 1 ? formatCurrency(g1.casualRate * eveningMult) : '&mdash;'}/hr</td></tr>
              <tr><td style={tdStyle}>Midnight &ndash; 6am</td><td style={tdStyle}>{nightPct}</td><td style={tdStyle}>{g1 && nightMult > 1 ? formatCurrency(g1.ftRate * nightMult) : '&mdash;'}/hr</td><td style={tdStyle}>{g1 && nightMult > 1 ? formatCurrency(g1.casualRate * nightMult) : '&mdash;'}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          These loadings are calculated on the ordinary rate. They apply on top of any penalty rate already in effect.
        </p>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Red flags for incorrect pay rates</h2>

          <h3 style={h3Style}>Your grade has not changed since you started</h3>
          <p style={pStyle}>
            If your duties have expanded but your classification has not moved, there is a good chance your base rate is too low.
          </p>

          <h3 style={h3Style}>You work alone or supervise others but are paid Grade 1</h3>
          <p style={pStyle}>
            Opening or closing a store alone is a Grade 3 Solo duty. Supervising two or more employees is Grade 3 Responsible. Being paid Grade 1 for either of these is underpayment on every hour worked.
          </p>

          <h3 style={h3Style}>Your payslip does not show your classification</h3>
          <p style={pStyle}>
            If your payslip does not state your classification grade, you have no way to verify your rate. Ask your employer to confirm it in writing.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and because classification affects your base rate, even a one-grade error compounds across every penalty, overtime, and leave payment.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
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
          Enter your shifts below and see exactly what you should have been paid &mdash; at the correct classification grade, with every penalty rate and loading applied.
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
