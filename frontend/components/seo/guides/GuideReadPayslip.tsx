/**
 * How to Read Your Payslip guide — /guides/how-to-read-your-payslip
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData } from '@/lib/hospitality-rates';

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
  { question: 'My payslip shows one rate — how do I know if it\'s right?', answer: 'Find your award pay guide and compare the rate against your classification\'s base rate. Then check whether you worked Saturdays, Sundays, or public holidays that period — if you did, separate lines should exist.' },
  { question: 'My employer says I don\'t need a payslip because I\'m casual — is that true?', answer: 'No. Every employee — permanent, part-time, and casual — is entitled to a payslip every pay period.' },
  { question: 'My payslip shows super but I can\'t see it in my fund', answer: 'Log into your super fund and check incoming contributions. If they\'re on the payslip but not appearing in the fund, contact the ATO\'s unpaid super line on 13 10 20.' },
];

export default function GuideReadPayslip({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Most Australian workers glance at their payslip total and move on. But for anyone covered by a modern award, the payslip is where underpayment is either confirmed or concealed. Knowing how to read yours takes 5 minutes and could reveal whether you&apos;ve been missing significant entitlements for months.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in an award-covered job and have never looked at your payslip line by line &mdash; start here.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Worker receives payslip showing &quot;40 hours &times; $29.50/hr.&quot; No other lines.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>The problem:</strong> Worked 2 Sundays and a public holiday. No penalty rates shown &mdash; meaning they weren&apos;t paid.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment identified: ~$80&ndash;150 for that pay period alone
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Single-rate payslip format actively obscures missing penalty rates. Most workers never question it.
          </p>
        </div>
      </section>

      {/* What must be on your payslip */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What must be on your payslip?</h2>
        <p style={pStyle}>
          Under the Fair Work Act, every employee must receive a payslip within one working day of each pay period. It must include:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Employer name and ABN</li>
          <li>Employee name</li>
          <li>Pay period (dates covered)</li>
          <li>Classification level and award (if award-covered)</li>
          <li>Gross pay and net pay</li>
          <li>Tax withheld (PAYG)</li>
          <li>Ordinary hours worked and the rate applied</li>
          <li>Any penalty rates &mdash; separate line for each day type</li>
          <li>Any allowances paid</li>
          <li>Superannuation contributions</li>
        </ul>
        <p style={pStyle}>
          If your payslip is missing any of these &mdash; particularly the classification level, award name, or penalty rate breakdown &mdash; that&apos;s a red flag.
        </p>
        <CheckPayCTA />
      </section>

      {/* Line-by-line guide */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Line-by-line guide</h2>

        <h3 style={h3Style}>Ordinary hours / base rate</h3>
        <p style={pStyle}>
          Shows your weekday hours and the rate applied. Check this matches your award classification. If the rate looks low, your classification may be wrong. &rarr; See <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a>
        </p>

        <h3 style={h3Style}>Saturday / Sunday / public holiday lines</h3>
        <p style={pStyle}>
          These should appear as separate line items showing hours and the rate for each day type. If you worked a Sunday and there&apos;s no Sunday rate line, penalty rates almost certainly haven&apos;t been applied.
        </p>
        <p style={pStyle}>
          If you worked weekends and see only one rate line, check your pay now.
        </p>
        <CheckPayCTA />

        <h3 style={h3Style}>Casual loading</h3>
        <p style={pStyle}>
          If you&apos;re casual, the loading should be visible &mdash; either as a percentage or built into the casual rate. A rate below the award casual minimum is a red flag.
        </p>

        <h3 style={h3Style}>Allowances</h3>
        <p style={pStyle}>
          Any applicable allowances (split shift, meal, tools) should appear separately. Missing allowance lines mean they&apos;re not being paid. &rarr; See <a href="/guides/allowances-and-loadings" style={linkStyle}>award allowances explained</a>
        </p>

        <h3 style={h3Style}>Superannuation</h3>
        <p style={pStyle}>
          Should show the fund name and the contribution amount. The rate is 12% of ordinary time earnings from July 2025. If it&apos;s absent or looks low, check your super fund directly. &rarr; See <a href="/guides/superannuation-casual-workers" style={linkStyle}>superannuation for casual workers guide</a>
        </p>
      </section>

      {/* Biggest red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; The biggest red flags</h2>

          <h3 style={h3Style}>Single rate line for all hours regardless of day</h3>
          <p style={pStyle}>
            One line: &quot;Hours: 40 &times; $29.50.&quot; No breakdown by day type. This is the most common sign that penalty rates are not being applied.
          </p>

          <h3 style={h3Style}>No award or classification shown</h3>
          <p style={pStyle}>
            If your award and classification aren&apos;t listed, there&apos;s a real chance they&apos;ve never been set correctly.
          </p>

          <h3 style={h3Style}>Super not appearing</h3>
          <p style={pStyle}>
            Super must be paid quarterly at minimum. If it&apos;s consistently absent from payslips, it may not be being paid at all.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>No payslip at all</h3>
          <p style={pStyle}>
            Failure to issue a payslip is a breach of the Fair Work Act &mdash; separate from any underpayment issue. Raise it in writing.
          </p>
        </div>
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
          Don&apos;t guess &mdash; check the numbers.
        </p>
        <p style={pStyle}>
          Enter your shifts and compare what you were actually paid against what you should have been paid.
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
