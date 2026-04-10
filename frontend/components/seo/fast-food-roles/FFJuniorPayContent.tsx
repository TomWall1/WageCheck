/**
 * Fast Food Award — Junior Pay Rates role page
 * URL: /awards/fast-food-award/junior-pay-rates
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
  { question: 'Does my pay automatically go up on my birthday?', answer: 'Yes. Under the Fast Food Award, your employer must increase your rate from the first full pay period on or after your birthday. If your rate stayed the same after you turned 17, 18, 19, or 20, you have been underpaid since that date.' },
  { question: 'Do junior workers get penalty rates?', answer: 'Yes. Penalty rates apply on top of the junior base rate. A 17-year-old working a Sunday gets the Sunday penalty multiplier applied to their junior hourly rate. If your pay is the same every day of the week, penalty rates are not being applied.' },
  { question: 'I turned 21 — what rate should I be on?', answer: 'Once you turn 21, you move to the full adult rate for your classification level. There is no further age-based discount. If your employer is still paying you a junior percentage after your 21st birthday, raise it immediately.' },
];

export default function FFJuniorPayContent({ rates }: { rates?: AwardRateData }) {
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
          If you&rsquo;re under 21 and working in fast food, your pay rate depends on your age. That&rsquo;s normal &mdash; the Fast Food Industry Award allows employers to pay a percentage of the adult rate based on how old you are. What&rsquo;s not normal is getting the same rate after your birthday, or never seeing penalty rates on weekends or public holidays.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Your rate should change every birthday until you turn 21. If it hasn&rsquo;t, you&rsquo;re being underpaid.
        </p>
        <p style={pStyle}>
          For the full Fast Food Award overview, see the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay guide</a>.
        </p>
      </section>

      {/* Junior rate table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Junior pay rates &mdash; Fast Food Award 2025</h2>
        <p style={pStyle}>
          Junior rates are calculated as a percentage of the adult Level 1 base rate ({l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr). These are the minimum ordinary hourly rates &mdash; penalty rates apply on top.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Age</th>
                <th style={thStyle}>% of adult rate</th>
                <th style={thStyle}>Approx. base rate</th>
                <th style={thStyle}>Approx. casual rate (incl. 25%)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { age: 'Under 16', pct: '36.8%', base: l1 ? formatCurrency(l1.ftRate * 0.368) : '&mdash;', casual: l1 ? formatCurrency(l1.ftRate * 0.368 * 1.25) : '&mdash;' },
                { age: '16 years', pct: '47.3%', base: l1 ? formatCurrency(l1.ftRate * 0.473) : '&mdash;', casual: l1 ? formatCurrency(l1.ftRate * 0.473 * 1.25) : '&mdash;' },
                { age: '17 years', pct: '57.8%', base: l1 ? formatCurrency(l1.ftRate * 0.578) : '&mdash;', casual: l1 ? formatCurrency(l1.ftRate * 0.578 * 1.25) : '&mdash;' },
                { age: '18 years', pct: '68.3%', base: l1 ? formatCurrency(l1.ftRate * 0.683) : '&mdash;', casual: l1 ? formatCurrency(l1.ftRate * 0.683 * 1.25) : '&mdash;' },
                { age: '19 years', pct: '82.5%', base: l1 ? formatCurrency(l1.ftRate * 0.825) : '&mdash;', casual: l1 ? formatCurrency(l1.ftRate * 0.825 * 1.25) : '&mdash;' },
                { age: '20 years', pct: '97.7%', base: l1 ? formatCurrency(l1.ftRate * 0.977) : '&mdash;', casual: l1 ? formatCurrency(l1.ftRate * 0.977 * 1.25) : '&mdash;' },
                { age: '21+', pct: '100%', base: l1 ? formatCurrency(l1.ftRate) : '&mdash;', casual: l1 ? formatCurrency(l1.casualRate) : '&mdash;' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--secondary)' }}>{row.age}</td>
                  <td style={tdStyle}>{row.pct}</td>
                  <td style={tdStyle}>{row.base}/hr</td>
                  <td style={tdStyle}>{row.casual}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates are approximate and based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> 17-year-old casual crew member. Turned 18 in March. Employer never updated their rate. They work 15 hours/week including one Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid:</strong> {l1 ? formatCurrency(l1.ftRate * 0.578 * 1.25) : '&mdash;'}/hr flat (the 17-year-old casual rate) &mdash; same every day, including Sundays.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should have happened:</strong> From their 18th birthday: {l1 ? formatCurrency(l1.ftRate * 0.683 * 1.25) : '&mdash;'}/hr base casual rate, plus Sunday penalty rate for Sunday shifts.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Two errors stacked: wrong age rate + no Sunday penalty. Underpayment per Sunday shift (5 hrs): ~$88.50.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Payroll systems don&rsquo;t always auto-update on birthdays. If no one flags it, the old rate stays indefinitely. Penalty rates are a separate issue entirely &mdash; both must be fixed.
          </p>
        </div>
      </section>

      {/* Common errors */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common errors with junior pay</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Rate not updated on birthday', desc: 'Your rate must increase from the first full pay period on or after your birthday. If your payslip shows the same rate before and after, raise it immediately.' },
              { title: 'No penalty rates applied to junior rate', desc: 'Junior rates are lower, but penalty rates still apply on top. A 16-year-old working a public holiday gets the public holiday multiplier applied to their junior rate &mdash; not the flat junior rate.' },
              { title: 'Casual loading treated as "everything included"', desc: 'The 25% casual loading replaces leave entitlements. It does not replace weekend or public holiday penalties. Both apply.' },
              { title: 'Staying on junior rate after turning 21', desc: 'Once you turn 21, you are entitled to the full adult rate. There is no further age-based discount.' },
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
          See also: <a href="/awards/fast-food-award/crew-member-pay-rates" style={linkStyle}>Crew member pay rates</a> &middot; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award overview</a>
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
