/**
 * High-intent: Employer Not Paying Penalty Rates in Hospitality?
 * URL: /awards/hospitality-award/no-penalty-rates-paid
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
  { question: 'My employer says our industry doesn\'t use penalty rates \u2014 is that true?', answer: 'No \u2014 and that claim is wrong. If you\'ve been told this, there\'s a strong chance your pay has been incorrect. The Hospitality Award explicitly sets penalty rates for all covered employees.' },
  { question: 'What if I agreed to the flat rate when I started?', answer: 'You cannot legally agree to waive award entitlements. A contract or verbal agreement that does so is not enforceable. You\'re owed the award rate regardless of what was agreed at hire.' },
  { question: 'Can I be fired for raising this?', answer: 'The Fair Work Act\'s general protections provisions make it illegal for your employer to take adverse action \u2014 dismissal, demotion, reducing hours \u2014 because you raised a pay complaint. If that happens, it\'s a separate and serious breach.' },
];

export default function IntentNoPenaltyRates({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your employer is paying the same rate every day regardless of whether it&apos;s a Sunday or a public holiday, there&apos;s a high chance your penalty rates are being missed &mdash; intentionally or not. Penalty rates under the Hospitality Award are a legal minimum. They cannot be waived by agreement, explained away by a flat rate, or simply not applied because the employer prefers not to.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work weekends or public holidays and your pay doesn&apos;t reflect that &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual waitstaff, Level 2. Works 2 Sundays and 1 public holiday per month.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {rates ? formatCurrency(getLevel(rates, 2)?.casualRate ?? 0) : '$31.60'}/hr for every shift</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday casual = {rates ? formatCurrency(getLevel(rates, 2)?.sundayCasual ?? 0) : '$44.24'}/hr. Public holiday = {rates ? formatCurrency(getLevel(rates, 2)?.publicHolidayCasual ?? 0) : '$56.88'}/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$152 per Sunday shift, ~$202 per public holiday shift, ~$506/month, ~$6,072/year
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer applies one casual rate across the board. Penalty rates are never separated out. Worker assumes the rate is correct.
          </p>
        </div>
      </section>

      {/* When penalty rates are required */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When are penalty rates legally required?</h2>
        <p style={pStyle}>
          Under the Hospitality Industry (General) Award 2020, penalty rates must be applied for:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>All Saturday shifts</strong> &mdash; for both permanent and casual employees</li>
          <li><strong>All Sunday shifts</strong> &mdash; for both permanent and casual employees</li>
          <li><strong>All public holiday shifts</strong> &mdash; at 2.25&times; the ordinary rate</li>
          <li><strong>Evening shifts after 7pm</strong> &mdash; a per-hour loading applies</li>
          <li><strong>Late night shifts after midnight</strong> &mdash; a higher per-hour loading applies</li>
        </ul>
        <p style={pStyle}>
          These are the legal minimums. Your employer must apply them &mdash; regardless of what your contract says, regardless of whether it&apos;s stated on your roster, and regardless of any verbal agreement to the contrary.
        </p>
        <p style={pStyle}>
          If your payslip doesn&apos;t show separate lines for each day type, that&apos;s a red flag. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your penalty rates &rarr;</a>
        </p>
      </section>

      {/* Flat rate section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Can a flat rate legally replace penalty rates?</h2>
        <p style={pStyle}>
          Only under very strict conditions. A flat rate arrangement satisfies the award only if the employer can demonstrate &mdash; with actual calculations &mdash; that the flat rate is higher than every award entitlement across every possible shift scenario, including:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Sunday casual rates</li>
          <li>Public holiday rates (2.25&times;)</li>
          <li>Evening and late-night loadings</li>
          <li>All applicable allowances</li>
        </ul>
        <p style={pStyle}>
          If your employer claims a flat rate covers everything but hasn&apos;t shown you the numbers, that claim is very likely incorrect.
        </p>
        <p style={pStyle}>
          If you&apos;re on a flat rate and want to check, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your penalty rates &rarr;</a>
        </p>
      </section>

      {/* Warning box */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common situations where penalty rates are wrongly withheld</h2>

          <h3 style={h3Style}>&quot;Your rate includes weekends&quot;</h3>
          <p style={pStyle}>
            A verbal explanation is not a legal arrangement. Even if told this at the time of hire, the award applies. If the flat rate doesn&apos;t demonstrably cover the highest penalty scenarios, you&apos;re owed the difference.
          </p>

          <h3 style={h3Style}>Penalty rates paid at wrong multiplier</h3>
          <p style={pStyle}>
            Applying Saturday rate on Sundays, or double time (2&times;) instead of 2.25&times; on public holidays. The wrong multiplier on every affected shift is underpayment.
          </p>

          <h3 style={h3Style}>Casual employees told they&apos;re not entitled</h3>
          <p style={pStyle}>
            Casual employees are entitled to <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a> under the Hospitality Award. The 25% casual loading does not replace them.
          </p>

          <h3 style={h3Style}>Penalty rates applied to permanent rate instead of casual rate</h3>
          <p style={pStyle}>
            The penalty multiplier should be applied to the casual base rate (which already includes the loading). Applying it to the pre-loading base rate understates the amount owed.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if your employer refuses</h2>
        <p style={pStyle}>
          <strong>Step 1:</strong> Document your shifts &mdash; rosters, text messages, calendar records. Get your payslips together.
        </p>
        <p style={pStyle}>
          <strong>Step 2:</strong> Raise it with your employer in writing. State the award clause and the correct rate. Give them a reasonable timeframe to respond.
        </p>
        <p style={pStyle}>
          <strong>Step 3:</strong> If unresolved, lodge a complaint with the Fair Work Ombudsman at fairwork.gov.au or call 13 13 94. They investigate for free and can recover unpaid wages going back 6 years.
        </p>
        <p style={pStyle}>
          See the full <a href="/guides/how-to-report-underpayment" style={linkStyle}>guide to reporting underpayment</a>.
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
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts and see exactly what you should have been paid.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know the exact shortfall.
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
