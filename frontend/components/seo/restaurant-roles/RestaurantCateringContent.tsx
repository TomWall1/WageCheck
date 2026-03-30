/**
 * Restaurant Award — Catering Worker role page
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
    question: 'I work for a dedicated catering company — which award covers me?',
    answer: 'If your employer is primarily a catering company (not a restaurant that also does catering), you\'re likely covered by the Hospitality Industry (General) Award (MA000009), not the Restaurant Award. The Restaurant Award applies when catering is incidental to a restaurant business — for example, a restaurant that occasionally caters private events. Check with the Fair Work Award Finder if you\'re unsure.',
  },
  {
    question: 'My employer pays an "event rate" of $X per hour — is that legal?',
    answer: 'It depends on whether that rate meets the minimum for every hour worked. If any of your hours fall on a Sunday or public holiday, the flat event rate must still meet the Sunday or public holiday minimum rate for your classification level. A flat rate that works on a weekday may fall short on a Sunday. Ask your employer for a written breakdown showing how the rate covers each day\'s minimum.',
  },
  {
    question: 'What is the casual minimum engagement for catering shifts?',
    answer: 'Under the Restaurant Industry Award, casual employees must be engaged and paid for a minimum of 2 hours per shift. If you\'re called in for a catering function and sent home after 1 hour, you must still be paid for 2 hours. For permanent employees, the minimum engagement is 4 hours.',
  },
];

export default function RestaurantCateringContent({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);

  const casualL3 = l3?.casualRate ?? 0;
  const sunCasualL3 = l3?.sundayCasual ?? 0;

  // Example: 6hr Sunday function at flat rate vs correct Sunday casual L3
  const flatPay = casualL3 * 6;
  const correctPay = sunCasualL3 * 6;
  const sundayDiff = Math.round((correctPay - flatPay) * 100) / 100;

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective {rates.effectiveDate} &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Catering work under the Restaurant Industry Award is complex &mdash; partly because coverage depends on the type of employer. The Restaurant Award applies when catering is incidental to a restaurant business (e.g., a restaurant that also caters private functions and events). If the employer is a dedicated catering company, the Hospitality Award may apply instead.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The most common issue for catering workers: flat &quot;event rates&quot; that ignore weekend and public holiday penalties.
        </p>
        <p style={pStyle}>
          For the full Restaurant Award overview, see the <a href="/awards/restaurant-award/" style={linkStyle}>Restaurant Award pay guide</a>.
        </p>
      </section>

      {/* Which award covers you */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Which award covers catering workers?</h2>
        <p style={pStyle}>
          <strong>Restaurant that also does catering</strong> (catering is part of an existing restaurant business) &rarr; <strong>Restaurant Industry Award</strong> (MA000119).
        </p>
        <p style={pStyle}>
          <strong>Dedicated catering company</strong> (catering is the primary business) &rarr; <strong>Hospitality Industry (General) Award</strong> (MA000009).
        </p>
        <p style={pStyle}>
          If your employer runs a restaurant and occasionally caters events, functions, or off-site services, the Restaurant Award covers that work.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual food &amp; beverage attendant, Level 3, working a Sunday function for a restaurant&apos;s catering arm. 6-hour shift. Employer pays a flat &quot;event rate&quot; equal to the ordinary casual rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid:</strong> {formatCurrency(casualL3)}/hr &times; 6 hours = {formatCurrency(flatPay)} (flat event rate)
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should have been paid:</strong> Sunday casual L3 {formatCurrency(sunCasualL3)}/hr &times; 6 hours = {formatCurrency(correctPay)}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(sundayDiff)} on a single Sunday function.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The employer sets a flat &quot;event rate&quot; that doesn&apos;t account for the day of the week. Sunday penalty rates are a separate entitlement and must be applied regardless of whether the shift is a regular service or a catered event.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Catering worker pay rates &mdash; Restaurant Award 2025</h2>
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
              {[2, 3, 4].map(lvl => {
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
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for catering workers</h2>

          <h3 style={h3Style}>Flat &quot;event rate&quot; regardless of day</h3>
          <p style={pStyle}>
            The most common issue. Employers pay a single rate for catering shifts whether the event falls on a weekday, Saturday, Sunday, or public holiday. Weekend and public holiday penalties must still be applied &mdash; a catered event on a Sunday is no different from a regular Sunday shift.
          </p>

          <h3 style={h3Style}>Public holiday minimum engagement ignored</h3>
          <p style={pStyle}>
            Permanent employees have a minimum engagement of 4 hours on a public holiday. Casual employees have a 2-hour minimum. If you&apos;re called in for a short catering job on a public holiday, you must be paid for the full minimum engagement period.
          </p>

          <h3 style={h3Style}>Wrong award applied to catering arm</h3>
          <p style={pStyle}>
            When a restaurant does catering as part of its business, those catering workers are covered by the Restaurant Award. Some employers incorrectly apply the Hospitality Award or no specific award to their catering operations.
          </p>

          <h3 style={h3Style}>Late night loading missed on events past 10pm</h3>
          <p style={pStyle}>
            Evening events and functions that run past 10pm attract a late night loading for every hour worked between 10pm and midnight. This is frequently overlooked on catering shifts that run late.
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
          See also: <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates</a> &middot; <a href="/awards/restaurant-award/allowances" style={linkStyle}>Restaurant Award allowances</a> &middot; <a href="/awards/restaurant-award/overtime" style={linkStyle}>Restaurant Award overtime</a>
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
