/**
 * Penalty Rates in Australia — /guides/penalty-rates-australia
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Do casual employees get penalty rates?', answer: 'Yes — and any employer who claims otherwise is wrong. If you\'ve been told casuals don\'t get penalty rates, there\'s a strong chance your pay has been incorrect. Casual penalty rates are built into every modern award.' },
  { question: 'Can my employer pay a flat rate that covers all penalties?', answer: 'Only if they can prove with actual numbers that the flat rate exceeds award entitlements in every scenario. If they haven\'t shown you the calculation, that\'s worth questioning.' },
  { question: 'I\'ve been underpaid penalty rates for years — can I claim back pay?', answer: 'Yes — up to 6 years under the Fair Work Act.' },
];

export default function GuidePenaltyRates() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work weekends or public holidays and your pay looks the same as a regular weekday, there&apos;s a high chance your penalty rates aren&apos;t being applied. Penalty rates are one of the most commonly missed entitlements in Australia &mdash; and in industries like hospitality, retail, and fast food, a single underpaid Sunday shift adds up significantly over a year.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work any shifts outside of Monday to Friday ordinary hours &mdash; penalty rates almost certainly apply to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual retail worker. Works 2 Sundays per month &mdash; paid the same weekday rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> $30/hr on Sundays (ordinary casual rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Retail Award Sunday casual rate &mdash; significantly higher</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$40&ndash;80 per Sunday shift, ~$960&ndash;$1,920/year
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays a single casual rate every day. Sunday rate never applied.
          </p>
        </div>
      </section>

      {/* What are penalty rates? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are penalty rates?</h2>
        <p style={pStyle}>
          Penalty rates are higher pay rates that apply when you work at times considered less desirable or more disruptive. They&apos;re built into modern awards to compensate workers for working evenings, weekends, and public holidays.
        </p>
        <p style={pStyle}>
          The rate depends on the day, the time, and your award. These rates are legal minimums &mdash; they cannot be waived by agreement.
        </p>
        <p style={pStyle}>
          If your payslip doesn&apos;t show different rates for different days, that&apos;s often a red flag.
        </p>
        <CheckPayCTA />
      </section>

      {/* Penalty rate multipliers table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Penalty rate multipliers by award &mdash; comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Award</th>
                <th style={thStyle}>Sunday (permanent)</th>
                <th style={thStyle}>Public holiday</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Hospitality Award (MA000009)</td><td style={tdStyle}>1.5&times;</td><td style={tdStyle}>2.25&times;</td></tr>
              <tr><td style={tdStyle}>Restaurant Award (MA000119)</td><td style={tdStyle}>1.75&times;</td><td style={tdStyle}>2.25&times;</td></tr>
              <tr><td style={tdStyle}>Fast Food Award (MA000003)</td><td style={tdStyle}>1.5&times;</td><td style={tdStyle}>2.5&times;</td></tr>
              <tr><td style={tdStyle}>Retail Award (MA000004)</td><td style={tdStyle}>2.0&times;</td><td style={tdStyle}>2.25&times;</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Effective 1 July 2025. Casual rates differ from permanent rates &mdash; see your award&apos;s specific pay guide.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common penalty rate underpayments</h2>

          <h3 style={h3Style}>Flat rate paid every day of the week</h3>
          <p style={pStyle}>
            One rate regardless of Saturday, Sunday, or public holiday. Unless the employer can prove the flat rate covers all penalty scenarios, this is almost always underpayment.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Casual loading treated as a substitute for penalty rates</h3>
          <p style={pStyle}>
            The 25% casual loading and penalty rates are separate. Both apply. See the <a href="/guides/casual-loading-explained" style={linkStyle}>casual loading guide</a> for exactly how they stack.
          </p>

          <h3 style={h3Style}>Wrong multiplier on public holidays</h3>
          <p style={pStyle}>
            Some employers apply double time (2&times;) when the award specifies 2.25&times;. On a full shift, that&apos;s a real shortfall on every holiday shift worked.
          </p>

          <h3 style={h3Style}>Penalty rates not applied to overtime hours</h3>
          <p style={pStyle}>
            Working overtime on a Sunday? The penalty rate interacts with the overtime rate. Paying only the overtime multiplier without the day penalty is underpayment.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* How to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your penalty rates</h2>
        <p style={pStyle}>
          Find your award and look at the pay guide published by the Fair Work Commission. Every award pay guide lists exact penalty rate multipliers and dollar amounts by classification.
        </p>
        <p style={pStyle}>For the most common awards:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>Hospitality Award penalty rates</a></li>
          <li><span>Retail Award penalty rates</span></li>
          <li><span>Fast Food Award penalty rates</span></li>
        </ul>
        <p style={pStyle}>
          Or enter your actual shifts in the tool below &mdash; it applies your award&apos;s specific rates to your hours.
        </p>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer} {i === 2 && <> See <a href="/guides/how-to-report-underpayment" style={linkStyle}>how to report underpayment</a></>}</p>
          </details>
        ))}
      </section>

      {/* Find your award */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Find your award</h2>
        <p style={pStyle}>
          These rules apply across all modern awards — but the specific rates, penalty multipliers, and allowances vary by industry. If you&apos;re ready to check your actual pay:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Hospitality</strong> (hotels, bars, caf&eacute;s, clubs) &rarr; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award pay rates</a></li>
          <li><strong>Fast food and takeaway</strong> &rarr; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay rates</a></li>
          <li><strong>Restaurants and caf&eacute;s</strong> &rarr; <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Award pay rates</a></li>
          <li><strong>Retail</strong> (shops, supermarkets) &rarr; <a href="/awards/retail-award" style={linkStyle}>Retail Award pay rates</a></li>
          <li><strong>Admin and clerical</strong> &rarr; <a href="/awards/clerks-award" style={linkStyle}>Clerks Award pay rates</a></li>
          <li><strong>Cleaning</strong> &rarr; <a href="/awards/cleaning-award" style={linkStyle}>Cleaning Award pay rates</a></li>
        </ul>
        <p style={pStyle}>
          Not sure which applies to you? <a href="/awards" style={linkStyle}>Browse all awards</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid.
        </p>
        <CheckPayCTA />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
