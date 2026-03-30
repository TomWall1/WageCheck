/**
 * Restaurant Award — Waitstaff role page
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
    question: 'Does having my RSA move me to Level 3?',
    answer: 'Having an RSA alone doesn\'t automatically make you Level 3. However, if you hold your RSA and are performing full table service duties — wine service, menu knowledge, handling complaints — that combination is a strong indicator of Level 3 classification. If your employer requires you to have an RSA to do your job and you\'re performing skilled service work, you should be classified at Level 3.',
  },
  {
    question: 'I work at a café in a shopping centre — which award covers me?',
    answer: 'If the café is a standalone business (even inside a shopping centre), you\'re covered by the Restaurant Industry Award (MA000119). The Hospitality Award would only apply if the café is part of a hotel, motel, or similar accommodation business. A standalone café or restaurant — regardless of location — falls under the Restaurant Award.',
  },
  {
    question: 'My employer says the casual rate covers everything including weekends — is that true?',
    answer: 'No. The 25% casual loading compensates for lack of leave entitlements — it does not replace weekend penalty rates. Casual employees are entitled to Saturday rates, Sunday rates, and public holiday rates on top of their casual base rate. If your employer is paying you a flat casual rate on weekends, ask them for a written calculation showing how your rate meets the award minimum for that day.',
  },
];

export default function RestaurantWaitstaffContent({ rates }: { rates: RestaurantRateData }) {
  const l2 = getLevel(rates, 2);
  const l3 = getLevel(rates, 3);

  const satCasualL2 = l2?.saturdayCasual ?? 0;
  const sunCasualL2 = l2?.sundayCasual ?? 0;
  const casualL2 = l2?.casualRate ?? 0;

  // Example: 5hr Saturday + 5hr Sunday at flat casual vs correct rates
  const flatPay = casualL2 * 10;
  const correctPay = (satCasualL2 * 5) + (sunCasualL2 * 5);
  const weekendDiff = Math.round((correctPay - flatPay) * 100) / 100;

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective {rates.effectiveDate} &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Waitstaff are one of the most commonly underpaid roles in Australian hospitality. Most waitstaff in restaurants and caf&eacute;s are classified at Level 2 or Level 3 under the Restaurant Industry Award. If you&apos;ve completed formal service training &mdash; such as an RSA, wine service qualification, or RMLV &mdash; and you&apos;re performing skilled table service, you should be at Level 3 minimum.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The difference between Level 2 and Level 3 adds up fast &mdash; especially on weekends.
        </p>
        <p style={pStyle}>
          For the full Restaurant Award overview, see the <a href="/awards/restaurant-award/" style={linkStyle}>Restaurant Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual waitstaff, Level 2, works a Saturday evening shift (5 hours) and a Sunday brunch shift (5 hours). Employer pays a flat casual rate for both days.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid:</strong> {formatCurrency(casualL2)}/hr &times; 10 hours = {formatCurrency(flatPay)}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should have been paid:</strong> Saturday casual L2 {formatCurrency(satCasualL2)}/hr &times; 5hrs + Sunday casual L2 {formatCurrency(sunCasualL2)}/hr &times; 5hrs = {formatCurrency(correctPay)}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(weekendDiff)} on a single weekend. Over a year of weekends, that&apos;s ~{formatCurrency(Math.round(weekendDiff * 52))}.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The employer pays a single &quot;casual rate&quot; regardless of the day. Saturday and Sunday penalty rates are separate entitlements that must be applied on top of the casual base rate.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Waitstaff pay rates &mdash; Restaurant Award 2025</h2>
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
              {[2, 3].map(lvl => {
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
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for waitstaff</h2>

          <h3 style={h3Style}>Flat casual rate regardless of day</h3>
          <p style={pStyle}>
            The most common issue. Employers pay the same casual hourly rate whether it&apos;s a Tuesday or a Sunday. Weekend and public holiday penalty rates are separate entitlements &mdash; they must be applied on top of the casual rate.
          </p>

          <h3 style={h3Style}>Level 2 pay for Level 3 work</h3>
          <p style={pStyle}>
            If you hold an RSA, wine service qualification, or RMLV and you&apos;re performing skilled table service duties, you should be classified at Level 3. Many employers keep waitstaff at Level 2 regardless of qualifications.
          </p>

          <h3 style={h3Style}>Split shift allowance never paid</h3>
          <p style={pStyle}>
            If you work a split shift (e.g., lunch and dinner with a break in between), you&apos;re entitled to a split shift allowance. This is frequently missed in restaurants that roster staff for both service periods.
          </p>

          <h3 style={h3Style}>Late night loading missed on dinner service</h3>
          <p style={pStyle}>
            If your dinner shift extends past 10pm, you&apos;re entitled to a late night loading for every hour worked between 10pm and midnight. This is often overlooked entirely.
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
          See also: <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates</a> &middot; <a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications</a> &middot; <a href="/awards/restaurant-award/allowances" style={linkStyle}>Restaurant Award allowances</a>
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
