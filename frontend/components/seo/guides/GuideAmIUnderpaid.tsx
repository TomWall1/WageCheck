/**
 * Am I Being Underpaid? — /guides/am-i-being-underpaid
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
  { question: 'I signed a contract agreeing to the rate — does that mean I can\'t claim?', answer: 'No. A contract cannot override award entitlements. If the contracted rate falls below the award minimum, you\'re owed the difference regardless.' },
  { question: 'My employer seems like a good person — could this really be happening?', answer: 'Yes. Many underpayments aren\'t deliberate. Payroll errors, incorrect award interpretation, and outdated systems are common causes.' },
  { question: 'How far back can I claim?', answer: '6 years under the Fair Work Act.' },
];

export default function GuideAmIUnderpaid() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re asking this question, there&apos;s a high chance the answer is yes. Wage underpayment is widespread in Australia &mdash; the Fair Work Ombudsman recovers tens of millions in underpaid wages every year, and research consistently shows that&apos;s a fraction of the total. Most underpayment never gets reported because workers either don&apos;t know it&apos;s happening or don&apos;t know how to check. This guide gives you a clear process.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in hospitality, retail, fast food, cleaning, or almost any non-professional role and have never checked your award &mdash; start here.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual retail worker, 3 years in role. Paid $26/hr on Sundays &mdash; assumed it was correct.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Retail Award Sunday casual rate is significantly higher than $26/hr.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$50&ndash;80 per Sunday, ~$2,600&ndash;4,200/year
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> No reference point. The employer paid what was convenient. The worker never checked.
          </p>
        </div>
      </section>

      {/* Signs you might be underpaid */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Signs you might be underpaid</h2>
        <p style={pStyle}>These are the most common indicators:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Same rate every day</strong> &mdash; weekdays, Saturdays, Sundays, public holidays all look identical on your payslip</li>
          <li><strong>Overtime never appears</strong> &mdash; you regularly work 40+ hours but never see overtime on your payslip</li>
          <li><strong>No classification shown</strong> &mdash; your payslip doesn&apos;t list an award or classification level</li>
          <li><strong>Flat rate explained as covering everything</strong> &mdash; your employer says your rate includes weekends</li>
          <li><strong>Cash paid with no payslip</strong> &mdash; no documentation of hours or rates</li>
        </ul>
        <p style={pStyle}>
          Any one of these is a red flag. Multiple together is a strong signal something is wrong.
        </p>
        <CheckPayCTA />
      </section>

      {/* How to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check &mdash; step by step</h2>

        <h3 style={h3Style}>Step 1: Find your award</h3>
        <p style={pStyle}>
          Check your payslip, contract, or letter of engagement &mdash; the award should be named. If not, use the Fair Work Award Finder at fairwork.gov.au. See <a href="/guides/what-is-a-modern-award" style={linkStyle}>what is a modern award</a>
        </p>

        <h3 style={h3Style}>Step 2: Find your classification level</h3>
        <p style={pStyle}>
          Your pay rate depends on your classification. Check your payslip or ask your employer &mdash; they&apos;re required to tell you.
        </p>

        <h3 style={h3Style}>Step 3: Check the penalty rates</h3>
        <p style={pStyle}>
          Did you work any Saturdays, Sundays, or public holidays? Check the pay guide for your award and compare against what you actually received.
        </p>

        <h3 style={h3Style}>Step 4: Check your allowances</h3>
        <p style={pStyle}>
          Do you work split shifts, use your own tools, hold a first aid certificate? Check the pay guide for applicable allowances. See <a href="/guides/allowances-and-loadings" style={linkStyle}>award allowances explained</a>
        </p>

        <h3 style={h3Style}>Step 5: Run the numbers</h3>
        <p style={pStyle}>
          The fastest way: enter your actual shifts in the calculator below. It applies your award&apos;s specific rates to your hours and tells you if there&apos;s a shortfall.
        </p>
        <p style={pStyle}>
          If any step reveals a gap, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* Most underpaid industries */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The most underpaid industries in Australia</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Hospitality</strong> &mdash; flat rates, missed penalty rates, misclassification &mdash; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award guide</a></li>
          <li><strong>Retail</strong> &mdash; incorrect Sunday rates, overtime missed</li>
          <li><strong>Fast food</strong> &mdash; junior rates misapplied, Sunday rates wrong</li>
          <li><strong>Cleaning</strong> &mdash; missed allowances, incorrect shift rates</li>
        </ul>
        <p style={pStyle}>
          If you work in these industries and have never checked against the award, use the tool. It takes 2 minutes.
        </p>
      </section>

      {/* What to do if you find a shortfall */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you find a shortfall</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Document everything &mdash; payslips, rosters, any record of hours worked</li>
          <li>Raise it with your employer &mdash; many underpayments are genuine errors</li>
          <li>If unresolved, contact the Fair Work Ombudsman on 13 13 94</li>
        </ul>
        <p style={pStyle}>
          See <a href="/guides/how-to-report-underpayment" style={linkStyle}>how to report underpayment</a>
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
          Don&apos;t guess &mdash; find out in 2 minutes.
        </p>
        <p style={pStyle}>
          Enter your shifts and see exactly what you should have been paid.
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
