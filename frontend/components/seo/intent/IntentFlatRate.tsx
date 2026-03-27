/**
 * High-intent: Is a Flat Rate Legal in Hospitality?
 * URL: /awards/hospitality-award/flat-rate-hospitality
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
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
  { question: 'I signed a contract agreeing to the flat rate \u2014 can I still claim?', answer: 'Yes. A contract cannot legally waive your award entitlements. If the flat rate doesn\'t cover all award obligations, you\'re owed the difference regardless of what you signed.' },
  { question: 'My rate is $40/hr \u2014 surely that covers everything?', answer: 'Compare it against the public holiday rate for your classification and employment type. At Level 2 casual, the public holiday rate is $56.88/hr. $40/hr doesn\'t cover a public holiday shift.' },
  { question: 'If I raise this, will my employer just change my rate?', answer: 'They may adjust your rate going forward \u2014 but your entitlement to back pay for past underpayments remains. You can claim up to 6 years of the shortfall under the Fair Work Act.' },
];

export default function IntentFlatRate({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your employer pays you one rate every shift regardless of whether it&apos;s a Tuesday or a public holiday, there&apos;s a high chance that arrangement doesn&apos;t meet the legal requirements. Flat rates in hospitality are legal &mdash; but only when they genuinely cover every award entitlement across every possible shift. In practice, that bar is very rarely met when a venue operates on weekends and public holidays.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re paid the same rate every day regardless of when you work &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual waitstaff told $38/hr &quot;covers all penalties including weekends.&quot;
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>The check:</strong> Level 2 casual public holiday rate = {rates ? formatCurrency(getLevel(rates, 2)?.publicHolidayCasual ?? 0) : '$56.88'}/hr. $38 doesn&apos;t cover it.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment on one 8-hour public holiday shift: ~$151
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer picks a number above the ordinary weekday rate and assumes it covers everything. Nobody checks the worst-case scenario &mdash; which is always the public holiday rate.
          </p>
        </div>
      </section>

      {/* When is flat rate legal */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When is a flat rate legal under the Hospitality Award?</h2>
        <p style={pStyle}>
          A flat rate arrangement satisfies the Hospitality Award only when:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The flat rate is demonstrably higher than the award rate across every possible shift &mdash; including the highest penalty scenarios</li>
          <li>The assessment covers all allowances that might apply (split shift, meal, tools)</li>
          <li>The assessment is applied to each individual pay period &mdash; not just averaged across good and bad weeks</li>
          <li>For casual employees, the 25% loading is included in the flat rate before comparing against penalty scenarios</li>
        </ul>
        <p style={pStyle}>
          The public holiday rate at 2.25&times; is almost always the critical test. If your flat rate falls below the public holiday rate for your classification &mdash; at any point &mdash; the flat rate fails.
        </p>
        <p style={pStyle}>
          If your flat rate is lower than the Sunday or public holiday rate for your level, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now</a>.
        </p>
      </section>

      {/* Common failures */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; The most common flat rate failures in hospitality</h2>

          <h3 style={h3Style}>Rate set above weekday rate but below Sunday or public holiday rate</h3>
          <p style={pStyle}>
            The most common scenario. $35/hr clears the casual weekday rate ({rates ? formatCurrency(getLevel(rates, 2)?.casualRate ?? 0) : '$31.60'} at Level 2) but falls short of the Sunday rate ({rates ? formatCurrency(getLevel(rates, 2)?.sundayCasual ?? 0) : '$44.24'}/hr) and well short of the public holiday rate ({rates ? formatCurrency(getLevel(rates, 2)?.publicHolidayCasual ?? 0) : '$56.88'}/hr).
          </p>

          <h3 style={h3Style}>Arrangement never formally assessed against all scenarios</h3>
          <p style={pStyle}>
            Many flat rate arrangements were set informally &mdash; a number quoted at hire, accepted by the worker, never verified. These are almost always legally insufficient.
          </p>

          <h3 style={h3Style}>Casual loading not factored in before the penalty comparison</h3>
          <p style={pStyle}>
            The casual loading must be included in the flat rate. A flat rate of $35/hr for a casual that&apos;s being compared against the penalty multiplier without including the loading is mathematically wrong.
          </p>

          <h3 style={h3Style}>Allowances not included</h3>
          <p style={pStyle}>
            Even if penalty rates are covered, a flat rate that doesn&apos;t account for applicable allowances (split shift, meal) fails the test on shifts where those allowances apply.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
      </section>

      {/* What to ask */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to ask your employer</h2>
        <p style={pStyle}>
          If you&apos;re on a flat rate, you&apos;re entitled to ask your employer to demonstrate compliance. Specifically:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Show the calculation proving the flat rate exceeds the award rate for every shift type &mdash; including public holidays</li>
          <li>Confirm which allowances are included</li>
          <li>Confirm how overtime is handled when hours exceed 38 per week</li>
        </ul>
        <p style={pStyle}>
          If they can&apos;t or won&apos;t provide this, that&apos;s a strong signal the arrangement isn&apos;t compliant. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your pay now</a>.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
          Don&apos;t guess &mdash; enter your actual shifts and find out.
        </p>
        <p style={pStyle}>
          The tool calculates exactly what you should have been paid under the award for every shift &mdash; regardless of the flat rate arrangement.
        </p>
        <p style={pStyle}>
          It takes 2 minutes.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
