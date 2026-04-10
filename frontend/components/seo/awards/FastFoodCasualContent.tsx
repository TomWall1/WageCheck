/**
 * Fast Food Award Casual Employees content — /awards/fast-food-award/casual-employees
 * Rates: FWO pay guide MA000003 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel, getLevelByStream } from '@/lib/award-rates';
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
  { question: 'Does the 25% loading mean I earn more than a permanent worker?', answer: 'On ordinary weekdays, yes. But permanent workers accrue paid leave and receive notice on termination — benefits that have real monetary value over time.' },
  { question: 'Can my employer remove the loading if I get other benefits?', answer: 'Not without a formal, legally compliant arrangement. The loading is an award entitlement and cannot be waived informally.' },
  { question: 'My roster is the same every week — am I still casual?', answer: 'Possibly not after 12 months. Regular and systematic work — even with varying hours — can trigger conversion rights. If your employer has never raised this after 12 months, they may be in breach.' },
  { question: 'Does casual loading replace my Sunday penalty rate?', answer: 'No. This is the single most common misconception in fast food. The loading compensates for not receiving paid leave. The Sunday penalty rate compensates for working on Sunday. They are separate. Both apply.' },
];

export default function FastFoodCasualContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3s = rates ? getLevelByStream(rates, 3, 'solo') : undefined;
  const l3r = rates ? getLevelByStream(rates, 3, 'responsible') : undefined;
  const g1Base = l1?.ftRate ?? 24.73;
  const g1Casual = l1?.casualRate ?? 30.91;
  const g1Sunday = l1?.sundayCasual ?? 43.28;
  const g1PH = l1?.publicHolidayCasual ?? 68.01;
  const g2Casual = l2?.casualRate ?? 32.00;
  const g2Sunday = l2?.sundayCasual ?? 44.80;
  const g2PH = l2?.publicHolidayCasual ?? 70.40;
  const g3sCasual = l3s?.casualRate ?? 32.83;
  const g3sSunday = l3s?.sundayCasual ?? 45.96;
  const g3sPH = l3s?.publicHolidayCasual ?? 72.22;
  const g3rCasual = l3r?.casualRate ?? 33.35;
  const g3rSunday = l3r?.sundayCasual ?? 46.69;
  const g3rPH = l3r?.publicHolidayCasual ?? 73.37;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you are a casual fast food worker, there is a high chance you have been told the 25% loading covers Sundays. It does not. The loading and penalty rates are separate entitlements &mdash; both apply every time. This is the single most common misrepresentation in the industry, and it costs casual workers significantly every weekend.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work casual shifts at any fast food or takeaway venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual crew member, Grade 1. 6-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(g1Casual)}/hr (casual base &mdash; loading included) &times; 6hrs = {formatCurrency(g1Casual * 6)}</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Casual Sunday rate at Grade 1 &mdash; {formatCurrency(g1Sunday)}/hr &times; 6hrs = {formatCurrency(g1Sunday * 6)}</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(g1Sunday * 6 - g1Casual * 6)} for one shift. {formatCurrency((g1Sunday * 6 - g1Casual * 6) * 52)}/year on one Sunday per week.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the casual rate every day assuming the loading covers the penalty. It does not.
          </p>
        </div>
      </section>

      {/* What is the 25% casual loading? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is the 25% casual loading?</h2>
        <p style={pStyle}>
          The casual loading compensates for entitlements you do not receive as a casual employee:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>No paid annual leave</li>
          <li>No paid personal leave</li>
          <li>No notice of termination</li>
          <li>No redundancy pay</li>
        </ul>
        <p style={pStyle}>
          It is applied to the base rate to produce your casual ordinary hourly rate. That is your starting point &mdash; not your full entitlement on Sundays or public holidays.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The loading does NOT replace Sunday rates. Both apply.
        </p>
        <p style={pStyle}>
          If your payslip shows one rate every day and does not break out separate penalty rates, that is a red flag.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* How casual loading interacts with penalties */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How casual loading interacts with penalty rates</h2>
        <p style={pStyle}>
          Under the Fast Food Award, casual penalty rates are calculated as a percentage of the ordinary base rate (not the casual rate). The casual loading is built into the multiplier. Here is how it works for Grade 1:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Scenario</th>
                <th style={thStyle}>Base rate</th>
                <th style={thStyle}>Multiplier</th>
                <th style={thStyle}>Casual rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Weekday ordinary</td><td style={tdStyle}>{formatCurrency(g1Base)}</td><td style={tdStyle}>125%</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g1Casual)}/hr</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>{formatCurrency(g1Base)}</td><td style={tdStyle}>125%</td><td style={tdStyle}>{formatCurrency(g1Casual)}/hr</td></tr>
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>{formatCurrency(g1Base)}</td><td style={tdStyle}>175%</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g1Sunday)}/hr</td></tr>
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>{formatCurrency(g1Base)}</td><td style={tdStyle}>275%</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g1PH)}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          The casual Sunday rate of {formatCurrency(g1Sunday)}/hr is {formatCurrency(g1Sunday - g1Casual)} more than the ordinary casual rate of {formatCurrency(g1Casual)}/hr. This is the amount you lose every Sunday hour if your employer only pays the ordinary casual rate.
        </p>
      </section>

      {/* Casual pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food casual pay rates 2025 &mdash; by grade</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Casual ordinary</th>
                <th style={thStyle}>Sunday (175%)</th>
                <th style={thStyle}>Public holiday (275%)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Grade 1</td><td style={tdStyle}>{formatCurrency(g1Casual)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g1Sunday)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g1PH)}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 2</td><td style={tdStyle}>{formatCurrency(g2Casual)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g2Sunday)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g2PH)}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Solo)</td><td style={tdStyle}>{formatCurrency(g3sCasual)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3sSunday)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3sPH)}/hr</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Responsible)</td><td style={tdStyle}>{formatCurrency(g3rCasual)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3rSunday)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3rPH)}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          For the full breakdown of how these multipliers are calculated, see the <a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Fast Food Award penalty rates guide</a>.
        </p>
      </section>

      {/* Minimum engagement */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Minimum engagement &mdash; 2 hours per shift</h2>
        <p style={pStyle}>
          Every casual shift under the Fast Food Award must be paid for a minimum of 2 hours, even if you are sent home early. If you are regularly paid for less than 2 hours on short shifts, you are owed the difference.
        </p>
        <p style={pStyle}>
          This is lower than the 3-hour minimum in many other awards, but it still applies. A 90-minute shift must be paid as 2 hours.
        </p>
      </section>

      {/* Common casual underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common casual underpayments</h2>

          <h3 style={h3Style}>Penalty rates not applied on top of loading</h3>
          <p style={pStyle}>
            A casual Sunday is not {formatCurrency(g1Casual)}/hr &mdash; it is {formatCurrency(g1Sunday)}/hr at Grade 1. Many employers pay the same rate daily.
          </p>
          <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />

          <h3 style={h3Style}>Wrong classification grade</h3>
          <p style={pStyle}>
            Casual workers are entitled to correct classification exactly like permanent staff. Grade 1 pay for Grade 2 duties means every hour &mdash; including every Sunday &mdash; is underpaid.
          </p>

          <h3 style={h3Style}>Minimum engagement not honoured</h3>
          <p style={pStyle}>
            Sent home after 90 minutes? You are still owed 2 hours. This is frequently missed on quiet shifts.
          </p>

          <h3 style={h3Style}>No superannuation paid</h3>
          <p style={pStyle}>
            Since November 2022, all casual employees are entitled to super regardless of earnings. If super is not appearing on your payslip, it may not be being paid.
          </p>

          <h3 style={h3Style}>Late-night loadings not applied</h3>
          <p style={pStyle}>
            Casual workers on closing shifts past 10pm are owed a 10% loading. Past midnight, it is 15%. These are rarely applied on casual payslips.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Casual conversion */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Casual conversion &mdash; your right after 12 months</h2>
        <p style={pStyle}>
          After 12 months of regular and systematic casual work, you have the right to request conversion to permanent part-time or full-time employment.
        </p>
        <p style={pStyle}>
          Ask yourself: are you being rostered on a consistent pattern, trusted with regular responsibilities, and expected to be available week to week? If yes, you may already qualify.
        </p>
        <p style={pStyle}>
          Your employer must respond in writing and, if declining, must provide genuine operational reasons. Vague refusals can be challenged at the Fair Work Commission.
        </p>
        <p style={pStyle}>
          Converting to permanent employment gives you access to paid annual leave, personal leave, and notice of termination &mdash; entitlements that add significant value over time.
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

      {/* Related pages */}
      <section style={sectionStyle}>
        <p style={smallStyle}>
          See also: <a href="/awards/fast-food-award/" style={linkStyle}>Full Fast Food Award guide</a> | <a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Penalty rates</a> | <a href="/awards/fast-food-award/pay-rates" style={linkStyle}>Pay rate tables</a> | <a href="/awards/fast-food-award/overtime" style={linkStyle}>Overtime</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Not sure if you are being paid correctly? Check now.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including your loading and every applicable penalty rate.
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
