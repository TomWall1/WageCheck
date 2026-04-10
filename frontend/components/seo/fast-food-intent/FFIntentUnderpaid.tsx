/**
 * High-intent: Am I Being Underpaid in Fast Food?
 * URL: /awards/fast-food-award/underpaid-fast-food
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How far back can I claim underpaid wages in fast food?', answer: 'The Fair Work Ombudsman can recover underpayments going back up to 6 years. If you have been receiving a flat rate without penalty rates for years, the total owed can be substantial. Keep any payslips, rosters, or bank statements you have.' },
  { question: 'My manager says casuals don\'t get penalty rates because the 25% loading covers it. Is that true?', answer: 'No. The casual loading compensates for lack of leave entitlements and job security. It does not replace penalty rates. Casual workers are entitled to penalty rates on top of their casual rate for Sundays, public holidays, and late-night shifts.' },
  { question: 'I\'m under 21 — can I still be underpaid?', answer: 'Yes. Junior rates are lower than adult rates, but penalty rates still apply on top of junior rates. If you work Sundays or public holidays and your pay doesn\'t change, you are almost certainly being underpaid regardless of your age.' },
  { question: 'What if my employer retaliates when I raise this?', answer: 'You are legally protected under the Fair Work Act. Your employer cannot cut your hours, change your shifts, or terminate you for raising a pay concern. If they do, that is a separate legal breach with serious consequences for the employer.' },
  { question: 'Do I need a lawyer to recover underpaid wages?', answer: 'Not usually. You can lodge a complaint directly with the Fair Work Ombudsman (13 13 94) at no cost. They investigate and can compel your employer to back-pay. For larger claims, community legal centres can help for free.' },
];

export default function FFIntentUnderpaid({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;

  const g1Ft = g1 ? formatCurrency(g1.ftRate) : '&mdash;';
  const g1Casual = g1 ? formatCurrency(g1.casualRate) : '&mdash;';
  const g1SundayCasual = g1 ? formatCurrency(g1.sundayCasual) : '&mdash;';
  const g2Ft = g2 ? formatCurrency(g2.ftRate) : '&mdash;';
  const g2Casual = g2 ? formatCurrency(g2.casualRate) : '&mdash;';

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If something feels off about your fast food pay, trust that instinct. Fast food and takeaway businesses are among the most investigated industries for underpayment in Australia. The Fast Food Industry Award (MA000003) sets minimum rates that many employers get wrong &mdash; sometimes deliberately, often by accident, but always at your expense.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your pay looks the same whether you work Tuesday or Sunday &mdash; you need to read this.
        </p>
        <p style={pStyle}>
          For the full Fast Food Award breakdown, see the <a href="/awards/fast-food-award/" style={linkStyle}>Fast Food Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual crew member, 22 years old, Grade 1, working at a burger chain. Works 3 weekday shifts and 1 Sunday shift per week (total 20 hours). Paid a flat $25.00/hr every shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> The casual Grade 1 rate is {g1Casual}/hr, not $25.00. Every single hour is underpaid by {g1 ? formatCurrency(g1.casualRate - 25) : '&mdash;'}.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> Sunday casual rate should be {g1SundayCasual}/hr (175% of {g1Ft}). The 5-hour Sunday shift alone is short by {g1 ? formatCurrency(g1.sundayCasual - 25) : '&mdash;'}/hr &mdash; that&apos;s {g1 ? formatCurrency((g1.sundayCasual - 25) * 5) : '&mdash;'} every Sunday.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 3:</strong> No late-night loading applied for shifts finishing after 10pm.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Combined underpayment: $180+ per week. Over a year, that&apos;s more than $9,000 missing from this worker&apos;s pocket.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The employer offers a &quot;flat rate&quot; that sounds reasonable but is actually below the minimum casual rate &mdash; and completely ignores penalty rates.
          </p>
        </div>
      </section>

      {/* Warning box: common signs */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Three signs you&apos;re being underpaid</h2>

          <h3 style={h3Style}>1. You get the same rate every day of the week</h3>
          <p style={pStyle}>
            Sunday rates in fast food are 150% for full-timers and 175% for casuals. If your payslip shows the same hourly rate on Sunday as it does on Wednesday, penalty rates are missing. Saturday is ordinary time under this award &mdash; but Sunday is not.
          </p>

          <h3 style={h3Style}>2. No late-night loading on closing shifts</h3>
          <p style={pStyle}>
            If you work past 10pm, you should receive a 15% loading on top of your base rate. Closing shifts at fast food outlets routinely run past 10pm, and this loading is frequently omitted.
          </p>

          <h3 style={h3Style}>3. You&apos;re still on Grade 1 after 6+ months</h3>
          <p style={pStyle}>
            Grade 1 is the entry level. Once you operate kitchen equipment, handle cash, or prepare food without direct supervision, you should be classified as Grade 2 ({g2Ft}/hr base, {g2Casual} casual). Many workers stay on Grade 1 rates long after their duties justify Grade 2.
          </p>
        </div>
      </section>

      {/* Common underpayment patterns */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayment patterns in fast food</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Flat rate with no penalties:</strong> Employer pays a single hourly rate regardless of day or time. This is the most common pattern and almost always results in underpayment.</li>
          <li style={{ marginBottom: '8px' }}><strong>Junior rate applied after turning 21:</strong> Once you turn 21, you must be paid the full adult rate immediately. Some employers keep paying the 20-year-old rate (97.7%) or worse.</li>
          <li style={{ marginBottom: '8px' }}><strong>No Sunday penalty:</strong> Sunday is the single biggest penalty day in fast food. Missing it costs casual workers over {g1 ? formatCurrency(g1.sundayCasual - g1.casualRate) : '&mdash;'}/hr on every Sunday shift.</li>
          <li style={{ marginBottom: '8px' }}><strong>Cash in hand:</strong> Cash payments often come with no payslips and rates well below the award. This is illegal on multiple fronts.</li>
        </ul>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you find a shortfall</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the exact amount.</strong> Use our calculator to enter your actual shifts and see what you should have been paid. <a href="/check-my-pay?award=MA000003" style={linkStyle}>Check your pay now &rarr;</a></li>
          <li style={{ marginBottom: '8px' }}><strong>Gather your records.</strong> Payslips, rosters, bank statements, text messages about shifts &mdash; anything that shows when you worked and what you were paid.</li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Many fast food underpayments are fixable once the numbers are clear. Present the calculation.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact Fair Work if needed.</strong> Call 13 13 94 or lodge a complaint online. The Fair Work Ombudsman investigates for free and can compel back payment.</li>
        </ol>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Related guides */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Fast Food penalty rates</a> &middot; <a href="/awards/fast-food-award/junior-rates" style={linkStyle}>Fast Food junior rates</a> &middot; <a href="/awards/fast-food-award/pay-rates" style={linkStyle}>Fast Food pay rates</a>
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

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t wait for someone else to notice. Enter your shifts and find out in 2 minutes.
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
