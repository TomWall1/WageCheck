/**
 * Wage Theft in Australia guide — /guides/wage-theft-australia
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
  { question: 'Is underpayment the same as wage theft?', answer: 'Legally, "wage theft" now refers to intentional underpayment. But any underpayment — deliberate or not — gives you the right to recover the amount owed.' },
  { question: 'What if my employer has since closed?', answer: 'You may still recover wages through the FWO or liquidation proceedings. The 6-year limitation still applies.' },
  { question: 'What protection do I have if I raise a complaint?', answer: 'The Fair Work Act\'s general protections provisions prevent employers from taking adverse action — dismissal, demotion, reduction in hours — against employees who raise pay complaints.' },
];

export default function GuideWageTheft() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Wage theft is not a niche problem in Australia. It is endemic. The Fair Work Ombudsman recovers tens of millions of dollars in underpaid wages every year &mdash; and research consistently shows that represents a fraction of the total. Most underpayment never gets reported, not because it doesn&apos;t exist, but because most workers don&apos;t know it&apos;s happening to them.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in hospitality, retail, fast food, cleaning, or construction &mdash; your industry is among the highest risk.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Large retail chain systematically underpaid thousands of workers over 6 years &mdash; penalty rates for evenings and weekends calculated incorrectly.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>Total underpayment:</strong> Tens of millions of dollars across the workforce</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>How it was discovered:</strong> A single employee checked their payslip against the award</p>
          <p style={smallStyle}>
            <strong>Lesson:</strong> Systemic underpayment often persists for years because no one checks. One person&apos;s complaint can expose a problem affecting thousands.
          </p>
        </div>
      </section>

      {/* Scale */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The scale of wage theft in Australia</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The Fair Work Ombudsman recovers tens of millions in underpaid wages annually, with large employer self-reported underpayments adding hundreds of millions more</li>
          <li>Independent research suggests the true figure of underpayment across Australian workplaces is significantly higher than what gets reported</li>
          <li>Hospitality, retail, and fast food consistently top the list of most investigated industries</li>
          <li>Workers aged 15&ndash;24 are the most likely to be underpaid &mdash; and the least likely to report it</li>
        </ul>
        <p style={pStyle}>
          These figures represent real money that should be in workers&apos; pockets.
        </p>
      </section>

      {/* Deliberate vs not */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Is it always deliberate?</h2>
        <p style={pStyle}>
          No. Underpayment falls into three categories:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Deliberate</strong> &mdash; knowing underpayment to reduce costs. Flat rates designed to absorb penalties, keeping workers on wrong classification levels.</li>
          <li><strong>Systemic payroll errors</strong> &mdash; incorrect award interpretation, misconfigured payroll software. Often affects large numbers simultaneously.</li>
          <li><strong>Ignorance</strong> &mdash; small employers who don&apos;t understand the award system.</li>
        </ul>
        <p style={pStyle}>
          All three result in underpayment. The worker&apos;s entitlement is the same regardless of whether the cause was intentional.
        </p>
      </section>

      {/* Criminal laws */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The new criminal wage theft laws</h2>
        <p style={pStyle}>
          From 1 January 2025, deliberate wage theft is a criminal offence under federal law:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Fines of up to 3&times; the amount underpaid (or $7.8m for corporations, whichever is higher)</li>
          <li>For individuals: up to 10 years imprisonment in the most serious cases</li>
        </ul>
        <p style={pStyle}>
          This applies to intentional underpayment. The threshold for &quot;intentional&quot; has widened significantly, and the consequences for employers who routinely underpay are now severe.
        </p>
      </section>

      {/* Most underpaid industries */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; The most underpaid industries</h2>

          <h3 style={h3Style}>Hospitality</h3>
          <p style={pStyle}>
            Flat rates, misclassification, missed allowances. Most complex award in Australia. &rarr; <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>Hospitality Award penalty rates guide</a>
          </p>

          <h3 style={h3Style}>Retail</h3>
          <p style={pStyle}>
            Incorrect Sunday rates, junior rates past 21, overtime absorbed by salary.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Fast food</h3>
          <p style={pStyle}>
            Young workforce, high turnover, junior rates frequently misapplied.
          </p>

          <h3 style={h3Style}>Cleaning</h3>
          <p style={pStyle}>
            High proportion of migrant workers, cash arrangements, shift allowances routinely ignored.
          </p>
        </div>
        <p style={pStyle}>
          If you work in any of these industries and have never checked your pay against the award, check now. It takes 2 minutes.
        </p>
        <CheckPayCTA />
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
          Don&apos;t wait &mdash; underpayment compounds.
        </p>
        <p style={pStyle}>
          The longer it continues, the more is owed &mdash; and the harder records are to reconstruct.
        </p>
        <CheckPayCTA />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Contact Fair Work Ombudsman on 13 13 94. Verify at fairwork.gov.au.
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
