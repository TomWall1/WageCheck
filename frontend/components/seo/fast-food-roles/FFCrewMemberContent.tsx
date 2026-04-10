/**
 * Fast Food Award — Crew Member Pay Rates role page
 * URL: /awards/fast-food-award/crew-member-pay-rates
 * Award: MA000003
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'What is the difference between Grade 1 and Grade 2?', answer: 'Grade 1 covers entry-level duties: taking orders, basic food prep, cleaning. Grade 2 is for workers who have completed relevant training or have enough experience to work with limited supervision. If you have been there more than a few months and are trusted to work independently, you should be Grade 2.' },
  { question: 'My employer pays me the same rate on Sundays as weekdays. Is that legal?', answer: 'Almost certainly not. Under the Fast Food Award, Sunday attracts a 150% penalty rate for permanent employees and a correspondingly higher rate for casuals. If your pay does not change on Sundays, penalty rates are not being applied.' },
  { question: 'Does casual loading replace weekend penalty rates?', answer: 'No. The 25% casual loading compensates for not receiving paid leave. Penalty rates for Saturdays, Sundays, and public holidays are separate entitlements that apply on top. Both must be paid.' },
];

export default function FFCrewMemberContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Most fast food workers in Australia are crew members &mdash; classified as Grade 1 or Grade 2 under the Fast Food Industry Award. The difference between the two grades is small on weekdays but adds up on weekends and public holidays when penalty rates kick in. If your pay looks the same every day regardless of when you work, something is wrong.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A casual crew member working one Sunday shift per week at the wrong rate loses over $2,500 a year.
        </p>
        <p style={pStyle}>
          For the full award overview, see the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay guide</a>.
        </p>
      </section>

      {/* Rate table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Crew member pay rates &mdash; Fast Food Award 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Base (perm)</th>
                <th style={thStyle}>Casual rate</th>
                <th style={thStyle}>Saturday (casual)</th>
                <th style={thStyle}>Sunday (casual)</th>
                <th style={thStyle}>Public Holiday (casual)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: 'Grade 1', base: l1 ? formatCurrency(l1.ftRate) : '&mdash;', casual: l1 ? formatCurrency(l1.casualRate) : '&mdash;', sat: l1 ? formatCurrency(l1.saturdayCasual) : '&mdash;', sun: l1 ? formatCurrency(l1.sundayCasual) : '&mdash;', ph: l1 ? formatCurrency(l1.publicHolidayCasual) : '&mdash;' },
                { grade: 'Grade 2', base: l2 ? formatCurrency(l2.ftRate) : '&mdash;', casual: l2 ? formatCurrency(l2.casualRate) : '&mdash;', sat: l2 ? formatCurrency(l2.saturdayCasual) : '&mdash;', sun: l2 ? formatCurrency(l2.sundayCasual) : '&mdash;', ph: l2 ? formatCurrency(l2.publicHolidayCasual) : '&mdash;' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--secondary)' }}>{row.grade}</td>
                  <td style={tdStyle}>{row.base}/hr</td>
                  <td style={tdStyle}>{row.casual}/hr</td>
                  <td style={tdStyle}>{row.sat}/hr</td>
                  <td style={tdStyle}>{row.sun}/hr</td>
                  <td style={tdStyle}>{row.ph}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025. Casual rates include the 25% loading.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual Grade 1 crew member. Works 4 shifts per week: 3 weekday shifts (5 hrs each) and 1 Sunday shift (6 hrs). Employer pays a flat {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr every day.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid for Sunday:</strong> {l1 ? formatCurrency(l1.casualRate) : '&mdash;'} &times; 6 = {l1 ? formatCurrency(l1.casualRate * 6) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should have been paid for Sunday:</strong> {l1 ? formatCurrency(l1.sundayCasual) : '&mdash;'} &times; 6 = {l1 ? formatCurrency(l1.sundayCasual * 6) : '&mdash;'}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {l1 ? formatCurrency(l1.sundayCasual * 6 - l1.casualRate * 6) : '&mdash;'} every Sunday. Over 48 working Sundays: {l1 ? formatCurrency((l1.sundayCasual * 6 - l1.casualRate * 6) * 48) : '&mdash;'} per year.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The employer pays the correct casual weekday rate but never applies the Sunday penalty multiplier. The worker sees a &quot;casual rate&quot; on every payslip and assumes it&rsquo;s correct.
          </p>
        </div>
      </section>

      {/* Public holiday example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Public holiday example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Same crew member works a 6-hour shift on Christmas Day.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Correct casual PH rate (Grade 1):</strong> {l1 ? formatCurrency(l1.publicHolidayCasual) : '&mdash;'}/hr &times; 6 = {l1 ? formatCurrency(l1.publicHolidayCasual * 6) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>If paid flat casual rate:</strong> {l1 ? formatCurrency(l1.casualRate) : '&mdash;'} &times; 6 = {l1 ? formatCurrency(l1.casualRate * 6) : '&mdash;'}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Underpayment on a single public holiday shift: {l1 ? formatCurrency(l1.publicHolidayCasual * 6 - l1.casualRate * 6) : '&mdash;'}.
          </p>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments for crew members</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Flat rate regardless of day', desc: 'If your casual rate is the same on a Sunday as a Tuesday, penalty rates are not being applied. This is the single most common underpayment in fast food.' },
              { title: 'Grade 1 pay for Grade 2 work', desc: 'If you have completed any formal training or have been working independently for several months, you should be classified as Grade 2. The difference is small per hour but adds up across all penalties.' },
              { title: 'No late-night loading', desc: 'Shifts finishing after 10pm attract a late-night loading under the Fast Food Award. Many fast food employers do not apply this.' },
              { title: 'Minimum engagement not met', desc: 'Casual crew members must be paid for a minimum of 3 hours per shift, even if sent home early.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />

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

      {/* Related */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/fast-food-award/junior-pay-rates" style={linkStyle}>Junior pay rates</a> &middot; <a href="/awards/fast-food-award/shift-supervisor-pay-rates" style={linkStyle}>Shift supervisor pay rates</a> &middot; <a href="/awards/fast-food-award/delivery-driver-pay-rates" style={linkStyle}>Delivery driver pay rates</a>
        </p>
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
