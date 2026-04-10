/**
 * Fast Food Award hub page content — /awards/fast-food-award/
 * Rates: FWO pay guide MA000003 — dynamically fetched from API
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel, getLevelByStream, getAllowanceAmount } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif',
  fontSize: '1.15rem',
  fontWeight: 500,
  color: 'var(--secondary)',
  marginBottom: '10px',
  marginTop: '0',
};

const h3Style: React.CSSProperties = {
  fontSize: '14.5px',
  fontWeight: 600,
  color: 'var(--secondary)',
  marginBottom: '6px',
  marginTop: '0',
};

const pStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.7,
  marginBottom: '1rem',
};

const smallStyle: React.CSSProperties = {
  fontSize: '12.5px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.6,
};

const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)',
  border: '1.5px solid var(--accent)',
  borderRadius: '10px',
  padding: '16px 20px',
  marginBottom: '1.5rem',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2.5rem',
};

const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Do I get penalty rates on Saturdays under the Fast Food Award?', answer: 'No. Saturday is paid at the ordinary rate under the Fast Food Award. This is different from many other awards. However, Sunday and public holiday penalty rates still apply in full.' },
  { question: 'Does casual loading replace Sunday penalty rates?', answer: 'No. The 25% casual loading and Sunday penalty rates are completely separate entitlements. A casual working a Sunday receives their base rate plus loading plus the Sunday penalty. If you only receive the casual rate on Sundays, you are being underpaid.' },
  { question: 'When does overtime apply under the Fast Food Award?', answer: 'Overtime kicks in after 38 ordinary hours per week for full-time employees, or after 10 hours in a single day for casuals. The first 2 hours of overtime attract time-and-a-half; double time applies after that.' },
  { question: 'What is the minimum engagement for casual fast food workers?', answer: 'Casual employees must be paid for a minimum of 2 hours per shift, even if sent home early. If you are regularly paid for less than 2 hours, you are owed the difference.' },
  { question: 'Am I entitled to a late-night loading?', answer: 'Yes. If you work between 10pm and midnight, you receive a 10% loading on your base rate. Between midnight and 6am, the loading increases to 15%. These apply on top of your ordinary or penalty rate.' },
  { question: 'What grade should I be classified as?', answer: 'Your grade depends on your actual duties, not your job title. Grade 1 is entry level (counter service, basic food prep). Grade 2 is experienced (operating equipment, stock control). Grade 3 Solo means you work alone or open/close the store. Grade 3 Responsible means you supervise two or more employees.' },
  { question: 'Can my employer pay a flat rate that covers everything?', answer: 'Only if that flat rate demonstrably exceeds every award entitlement in every scenario — including Sundays, public holidays, overtime, and late-night loadings. A flat rate that averages lower than award entitlements is not legal.' },
  { question: 'What if I think I have been underpaid?', answer: 'Check your pay using the calculator below. If it shows a shortfall, raise it with your employer first. If that does not resolve it, contact the Fair Work Ombudsman on 13 13 94. They can recover unpaid wages on your behalf going back up to 6 years.' },
];

export default function FastFoodHubContent({ rates }: { rates?: AwardRateData }) {
  // Grade 1 & 2 (general stream)
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  // Grade 3 has two variants with different streams
  const g3s = rates ? getLevelByStream(rates, 3, 'solo') : undefined;
  const g3r = rates ? getLevelByStream(rates, 3, 'responsible') : undefined;
  // Meal allowance
  const mealAllowance = rates ? getAllowanceAmount(rates, 'meal') : 0;

  return (
    <>
      {/* Trigger intro */}
      <section style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your Sunday rate is the same as your Tuesday rate, you are almost certainly being underpaid.
        </p>
        <p style={pStyle}>
          The Fast Food Industry Award sets strict rules for pay rates, overtime, penalties, and late-night loadings. If your employer is not following them exactly, even small errors cost you hundreds per year. This page shows what you should be paid &mdash; and the calculator below tells you if you have been underpaid based on your actual shifts.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you work at a takeaway, QSR, pizza shop, burger chain, or delivery operation &mdash; this likely applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={{
          background: '#f8f9fa',
          border: '1.5px solid var(--border)',
          borderRadius: '10px',
          padding: '20px',
        }}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> You work 5 shifts in a week &mdash; 3 weekdays, one Sunday, one public holiday. You are paid $25/hour flat across every shift.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What should have happened:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Weekday shifts: {g1 ? formatCurrency(g1.ftRate) : '&mdash;'}/hr base &#10003; (within range for Grade 1)</li>
            <li>Sunday shift (casual): {g1 ? formatCurrency(g1.sundayCasual) : '&mdash;'}/hr (175% of casual rate at Grade 1)</li>
            <li>Public holiday shift (casual): {g1 ? formatCurrency(g1.publicHolidayCasual) : '&mdash;'}/hr (275% of casual rate at Grade 1)</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Estimated underpayment: $110&ndash;$340 in that week alone.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Many fast food employers pay a flat rate and never apply penalty rates. Most employees never check &mdash; and most never realise.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award Pay Rates Australia (MA000003)</h2>
        <p style={pStyle}>
          The Fast Food Industry Award 2010 (MA000003) covers employees working in takeaway food and drink outlets, drive-through restaurants, quick service restaurants, pizza delivery, and similar food retail operations across Australia. Common roles include crew members, team leaders, shift supervisors, cooks, counter staff, and delivery drivers.
        </p>
        <p style={pStyle}>
          If your employer operates a sit-down restaurant with table service, you may be covered by the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award (MA000119)</a> instead. If you work in a hotel, pub, or accommodation venue, see the <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award (MA000009)</a>. Not sure? The <a href="https://www.fairwork.gov.au/awards-and-agreements/awards/find-my-award" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Award Finder</a> can confirm it.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Fast Food Award?</h2>
        <p style={pStyle}>
          These are the rules that determine what you should actually be paid. Most underpayments happen when one or more of these is applied incorrectly &mdash; and if your payslip does not clearly show each of these separately, that is often a red flag.
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Casual loading:</strong> 25% on top of the base rate, applied to every hour worked &mdash; this does not replace penalty rates, both apply</li>
          <li><strong>Saturday rates:</strong> Ordinary rate (no penalty) &mdash; this is unique to fast food</li>
          <li><strong>Sunday rates:</strong> 150% for full-time/part-time, 175% for casual &mdash; one of the most commonly underpaid entitlements</li>
          <li><strong>Public holiday rates:</strong> 250% for full-time/part-time, 275% for casual</li>
          <li><strong>Overtime:</strong> Triggered after 38 ordinary hours per week, or more than 10 hours in a single day</li>
          <li><strong>Late-night loadings:</strong> 10% extra between 10pm&ndash;midnight, 15% extra between midnight&ndash;6am</li>
          <li><strong>Meal allowance:</strong> {mealAllowance ? formatCurrency(mealAllowance) : '&mdash;'} when required to work overtime without a meal break</li>
        </ul>
        <p style={smallStyle}>
          If you are unsure how Sunday rates should apply to your shifts, see the full <a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Fast Food Award penalty rates guide</a>. For overtime thresholds and worked examples, see the <a href="/awards/fast-food-award/overtime" style={linkStyle}>Fast Food Award overtime guide</a>.
        </p>
      </section>

      {/* Common underpayment patterns */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common ways people get underpaid under the Fast Food Award</h2>
          <p style={{ ...smallStyle, marginBottom: '12px' }}>These are the exact patterns we see when people have been underpaid:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Flat hourly rate paid regardless of day', desc: 'A flat rate that does not change on Sundays or public holidays almost always means penalty rates are being absorbed illegally. Unless the employer can prove the flat rate covers all entitlements in every scenario, it does not count.' },
              { title: 'No overtime paid despite regular 40+ hour weeks', desc: 'Overtime kicks in at 38 hours per week. Many employees work over this consistently and see nothing extra on their payslip.' },
              { title: 'Casual loading applied, but Sunday rates ignored', desc: 'These are separate entitlements. Getting the 25% loading does not mean Sunday or public holiday rates do not also apply on top.' },
              { title: 'Classified as Grade 1 after months of experience', desc: 'If you operate equipment independently, handle stock control, or work without direct supervision, you are performing Grade 2 or Grade 3 duties. The pay difference is over $1\u2013$2/hr.' },
              { title: 'Late-night loadings never applied', desc: 'Closing shifts that run past 10pm attract a 10% loading. Overnight shifts past midnight attract 15%. Many employers never apply these.' },
              { title: 'Minimum engagement not honoured', desc: 'Casual fast food workers must be paid for a minimum of 2 hours per shift, even if sent home early.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...pStyle, marginTop: '12px', marginBottom: '0' }}>
            Most people experiencing one of these issues are underpaid by hundreds &mdash; sometimes thousands &mdash; of dollars per year.
          </p>
        </div>
      </section>

      {/* CTA mid-page */}
      <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />

      {/* Classification table */}
      <section style={{ ...sectionStyle, marginTop: '2.5rem' }}>
        <h2 style={h2Style}>Fast Food Award Pay Rates 2025 &mdash; Classification Grades</h2>
        <p style={pStyle}>
          Under the Fast Food Award, your pay rate depends on your classification grade and the day you work. The table below shows the minimum rates for each grade effective 1 July 2025.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Base rate (FT/PT)</th>
                <th style={thStyle}>Casual rate</th>
                <th style={thStyle}>Typical roles</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={tdStyle}>Grade 1</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.ftRate) : '&mdash;'}/hr</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g1 ? formatCurrency(g1.casualRate) : '&mdash;'}/hr</td>
                <td style={tdStyle}>Counter service, basic food prep, cleaning</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={tdStyle}>Grade 2</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.ftRate) : '&mdash;'}/hr</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g2 ? formatCurrency(g2.casualRate) : '&mdash;'}/hr</td>
                <td style={tdStyle}>Operating equipment, stock control, experienced crew</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={tdStyle}>Grade 3 (Solo)</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.ftRate) : '&mdash;'}/hr</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3s ? formatCurrency(g3s.casualRate) : '&mdash;'}/hr</td>
                <td style={tdStyle}>Works alone, opens/closes store</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={tdStyle}>Grade 3 (Responsible)</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.ftRate) : '&mdash;'}/hr</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{g3r ? formatCurrency(g3r.casualRate) : '&mdash;'}/hr</td>
                <td style={tdStyle}>Supervises 2+ employees, shift supervisor</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000003 effective 1 July 2025. Casual rates include the 25% loading.
        </p>
        <p style={pStyle}>
          Your employer is required to classify you based on your actual duties, not just your job title. Being classified one grade too low is one of the easiest ways employers underpay staff &mdash; and the difference adds up to roughly $35&ndash;$75/week or $1,800&ndash;$3,900/year.
        </p>
        <p style={pStyle}>
          Not sure of your grade? See the <a href="/awards/fast-food-award/classifications" style={linkStyle}>full Fast Food Award classifications guide</a>.
        </p>
      </section>

      {/* Sub-page navigation */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award guides</h2>
        <p style={pStyle}>Explore each topic in detail:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/fast-food-award/pay-rates', label: 'Full pay rates table' },
            { href: '/awards/fast-food-award/penalty-rates', label: 'Penalty rates' },
            { href: '/awards/fast-food-award/casual-employees', label: 'Casual employees' },
            { href: '/awards/fast-food-award/overtime', label: 'Overtime' },
            { href: '/awards/fast-food-award/allowances', label: 'Allowances' },
            { href: '/awards/fast-food-award/classifications', label: 'Classifications' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: 'block', padding: '12px 16px', border: '1.5px solid var(--border)',
              borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
              color: 'var(--secondary)',
            }}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* Role quick links */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay rates by role</h2>
        <p style={pStyle}>See pay rates specific to your job:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/fast-food-award/junior-pay-rates', label: 'Junior pay rates' },
            { href: '/awards/fast-food-award/crew-member-pay-rates', label: 'Crew member pay rates' },
            { href: '/awards/fast-food-award/delivery-driver-pay-rates', label: 'Delivery driver pay rates' },
            { href: '/awards/fast-food-award/shift-supervisor-pay-rates', label: 'Shift supervisor pay rates' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: 'block', padding: '12px 16px', border: '1.5px solid var(--border)',
              borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
              color: 'var(--secondary)',
            }}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {faqData.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h3 style={h3Style}>{item.question}</h3>
              <p style={{ ...pStyle, marginBottom: 0 }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map(q => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          }),
        }}
      />

      {/* Final CTA */}
      <section style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ ...h2Style, fontSize: '1.25rem', textAlign: 'center' }}>
          Not sure if you are being paid correctly? Check now.
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '500px', margin: '0 auto 16px' }}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including overtime, penalty rates, and allowances. It takes 2 minutes &mdash; and you will know for certain.
        </p>
        <a
          href="/check-my-pay?award=MA000003"
          style={{
            display: 'inline-block',
            background: 'var(--primary)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '15px',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Check my pay &rarr;
        </a>
        <p style={{ ...smallStyle, marginTop: '12px' }}>
          Based on official pay rates from the Fair Work Commission (MA000003).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fast Food Industry Award 2010 (MA000003), effective 1 July 2025. General information only &mdash; not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
