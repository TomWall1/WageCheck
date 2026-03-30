/**
 * Restaurant Award — Café Worker role page
 * Rates: FWO pay guide MA000119
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel, getAllowance } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500,
  color: 'var(--secondary)', marginBottom: '10px', marginTop: '0',
};
const h3Style: React.CSSProperties = {
  fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0',
};
const pStyle: React.CSSProperties = {
  fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem',
};
const smallStyle: React.CSSProperties = {
  fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6,
};
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)', border: '1.5px solid var(--accent)',
  borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem',
};
const exampleBoxStyle: React.CSSProperties = {
  background: '#f8f9fa', border: '1.5px solid var(--border)',
  borderRadius: '10px', padding: '20px', marginBottom: '1.5rem',
};
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  {
    question: 'My employer says we\'re on the Hospitality Award — how do I check?',
    answer: 'Use the Fair Work Award Finder tool at fairwork.gov.au to confirm which award covers your workplace. If you work in a standalone café or restaurant (not attached to a hotel, motel, or accommodation venue), the Restaurant Industry Award (MA000119) almost certainly applies. The Hospitality Award covers cafés and restaurants that are part of an accommodation or hotel business.',
  },
  {
    question: 'Does working in a shopping centre café change the award?',
    answer: 'No. If the café is a standalone business — even if it\'s located inside a shopping centre, food court, or retail complex — the Restaurant Industry Award applies. The location doesn\'t determine the award; the nature of the business does. A standalone café is covered by the Restaurant Award regardless of where it operates.',
  },
  {
    question: 'What level should a barista be classified at?',
    answer: 'Most baristas are classified at Level 2 (food and beverage attendant grade 2) as a standard. If you\'ve completed formal barista training, have supervisory responsibilities, or are performing higher-skilled duties like training other staff, you should be at Level 3. Being kept at Level 1 beyond the introductory period is a red flag.',
  },
];

export default function RestaurantCafeWorkerContent({ rates }: { rates: RestaurantRateData }) {
  const l1 = getLevel(rates, 1);
  const l2 = getLevel(rates, 2);

  const casualL2 = l2?.casualRate ?? 0;
  const sunCasualL2 = l2?.sundayCasual ?? 0;

  // Example: wrong-award gap — show L2 casual rate difference
  const flatPay = casualL2 * 6;
  const sunPay = sunCasualL2 * 6;
  const sundayDiff = Math.round((sunPay - flatPay) * 100) / 100;

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective {rates.effectiveDate} &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in a standalone caf&eacute;, the most common issue isn&apos;t just your rate &mdash; it&apos;s that the wrong award has been applied entirely. Many standalone caf&eacute; workers are incorrectly placed on the Hospitality Industry (General) Award when they should be covered by the Restaurant Industry Award (MA000119).
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The wrong award means different base rates, different penalties, and different entitlements &mdash; and it compounds across every shift.
        </p>
        <p style={pStyle}>
          For the full Restaurant Award overview, see the <a href="/awards/restaurant-award/" style={linkStyle}>Restaurant Award pay guide</a>.
        </p>
      </section>

      {/* Which award covers you */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Which award covers caf&eacute; workers?</h2>
        <p style={pStyle}>
          <strong>Standalone caf&eacute;</strong> (including caf&eacute;s inside shopping centres, food courts, or retail areas) &rarr; <strong>Restaurant Industry Award</strong> (MA000119).
        </p>
        <p style={pStyle}>
          <strong>Caf&eacute; inside a hotel, motel, or accommodation venue</strong> &rarr; <strong>Hospitality Industry (General) Award</strong> (MA000009).
        </p>
        <p style={pStyle}>
          If you&apos;re unsure, check the <a href="https://www.fairwork.gov.au/find-help-for/hospitality-and-food-services" style={linkStyle} target="_blank" rel="noopener noreferrer">Fair Work Award Finder</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual barista and food &amp; beverage attendant, Level 2, working in a standalone caf&eacute;. Employer applies the Hospitality Award instead of the Restaurant Award. Worker does a 6-hour Sunday shift and is paid the flat casual rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid:</strong> {formatCurrency(casualL2)}/hr &times; 6 hours = {formatCurrency(flatPay)} (flat casual rate, no Sunday penalty)
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should have been paid:</strong> Sunday casual L2 {formatCurrency(sunCasualL2)}/hr &times; 6 hours = {formatCurrency(sunPay)}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(sundayDiff)} on a single Sunday. Over a year of weekly Sunday shifts, that&apos;s ~{formatCurrency(Math.round(sundayDiff * 52))}.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The employer applies the wrong award and pays a flat casual rate with no weekend penalties. Two issues compounding together.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Caf&eacute; worker pay rates &mdash; Restaurant Award 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Casual Rate</th>
                <th style={thStyle}>Saturday (Casual)</th>
                <th style={thStyle}>Sunday (Casual)</th>
                <th style={thStyle}>Public Holiday (Casual)</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(lvl => {
                const l = getLevel(rates, lvl);
                if (!l) return null;
                return (
                  <tr key={lvl}>
                    <td style={tdStyle}>Level {lvl}</td>
                    <td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td>
                    <td style={tdStyle}>{formatCurrency(l.saturdayCasual)}/hr</td>
                    <td style={tdStyle}>{formatCurrency(l.sundayCasual)}/hr</td>
                    <td style={tdStyle}>{formatCurrency(l.publicHolidayCasual)}/hr</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective {rates.effectiveDate}.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for caf&eacute; workers</h2>

          <h3 style={h3Style}>Wrong award applied</h3>
          <p style={pStyle}>
            Standalone caf&eacute;s are covered by the Restaurant Award, not the Hospitality Award. Different awards mean different base rates and penalty structures. Being on the wrong award can result in underpayment across every entitlement.
          </p>

          <h3 style={h3Style}>Flat casual rate on weekends</h3>
          <p style={pStyle}>
            Casual employees are entitled to Saturday, Sunday, and public holiday penalty rates on top of their casual base rate. A flat rate that doesn&apos;t change on weekends is almost certainly wrong.
          </p>

          <h3 style={h3Style}>Kept at Level 1 or introductory level too long</h3>
          <p style={pStyle}>
            The introductory classification is only for the first 3 months with no prior experience. After 3 months, you must be reclassified to at least Level 1. Most caf&eacute; workers performing standard duties should be Level 2.
          </p>

          <h3 style={h3Style}>Casual loading &quot;covers&quot; weekends</h3>
          <p style={pStyle}>
            The 25% casual loading compensates for lack of leave entitlements. It does not replace weekend or public holiday penalties. These are separate, additional entitlements.
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

      {/* Related guides */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates</a> &middot; <a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications</a> &middot; <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Restaurant Award pay rates</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts and see exactly what you should have been paid.
        </p>
        <p style={pStyle}>
          It takes 2 minutes.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000119).
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Restaurant Industry Award 2020 (MA000119), effective {rates.effectiveDate}. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
