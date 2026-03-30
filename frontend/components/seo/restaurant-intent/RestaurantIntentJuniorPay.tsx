/**
 * High-intent: Restaurant Award Junior Pay Rates 2025-26
 * URL: /awards/restaurant-award/junior-pay-restaurant
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
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
  { question: 'My employer says I just get "the junior rate" — is that right?', answer: 'No. There is no single "junior rate." The junior percentage is applied to the adult base rate for your classification level, and then penalty rates (Saturday, Sunday, public holiday, late night) are applied on top. A flat junior rate with no penalties is almost always an underpayment.' },
  { question: 'I turned 21 but my rate hasn\'t changed — what do I do?', answer: 'Once you turn 21, you are entitled to the full adult rate for your classification level. Raise this with your employer immediately and request back pay from your 21st birthday if it wasn\'t adjusted.' },
  { question: 'Can I claim back underpayments from when I was a junior?', answer: 'Yes. You can claim back up to 6 years of underpayments under the Fair Work Act. This includes any period where junior penalties weren\'t applied correctly, your rate wasn\'t updated on a birthday, or you were kept on a junior rate past age 21.' },
];

export default function RestaurantIntentJuniorPay({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re under 21 and work in a restaurant or caf&eacute;, there&apos;s a high chance your pay has at least one error. The most common is a flat junior rate applied to every shift &mdash; regardless of the day, time, or penalty that should apply. Junior rates under the Restaurant Award are a percentage of the adult rate, but penalties still apply on top.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re under 21 and your pay is the same every shift &mdash; this applies to you.
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
            <strong>Scenario:</strong> 17-year-old casual food &amp; beverage attendant, Level 3, working Sunday brunch shifts. Paid a flat junior casual rate of {l3 ? formatCurrency(l3.casualRate * 0.6) : '~$18.17'}/hr.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> 60% &times; adult Level 3 casual rate &times; Sunday penalty multiplier = {l3 ? formatCurrency(l3.sundayCasual * 0.6) : '~$25.43'}/hr.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~{l3 ? formatCurrency((l3.sundayCasual * 0.6) - (l3.casualRate * 0.6)) : '$7.26'}/hr on every Sunday shift.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer applies the junior percentage to the base rate but then pays that same amount on every shift, ignoring weekend and public holiday penalties entirely.
          </p>
        </div>
      </section>

      {/* How junior rates work */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How junior rates work under the Restaurant Award</h2>
        <p style={pStyle}>
          Junior rates are a percentage of the adult rate for the same classification level and employment type:
        </p>
        <div style={exampleBoxStyle}>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: 'var(--secondary)' }}>Age</th>
                <th style={{ textAlign: 'right', padding: '8px', color: 'var(--secondary)' }}>% of adult rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Under 16', '50%'],
                ['16 years', '50%'],
                ['17 years', '60%'],
                ['18 years', '70%'],
                ['19 years', '80%'],
                ['20 years', '90%'],
                ['21 and over', '100%'],
              ].map(([age, pct], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '8px', color: 'var(--secondary-muted)' }}>{age}</td>
                  <td style={{ padding: '8px', textAlign: 'right', color: 'var(--secondary-muted)', fontWeight: age === '21 and over' ? 600 : 400 }}>{pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={pStyle}>
          <strong>The critical point:</strong> The junior rate is the <em>base</em>. Penalty rates for Saturday, Sunday, public holidays, and late-night work are then applied on top of this junior base rate. A flat junior rate that ignores penalties is wrong.
        </p>
      </section>

      {/* Common errors */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common junior pay errors in restaurants</h2>

          <h3 style={h3Style}>Flat junior rate applied every day</h3>
          <p style={pStyle}>
            The most frequent error. The employer calculates the junior percentage of the base rate and pays that amount on every shift &mdash; including weekends and public holidays where penalties should apply on top.
          </p>

          <h3 style={h3Style}>Rate not updated on birthday</h3>
          <p style={pStyle}>
            Each birthday triggers a new percentage tier. A 17-year-old who turns 18 should move from 60% to 70% of the adult rate. Many employers don&apos;t update this until it&apos;s raised.
          </p>

          <h3 style={h3Style}>Rate not updated to adult rate on 21st birthday</h3>
          <p style={pStyle}>
            On your 21st birthday, you&apos;re entitled to the full adult rate. Continuing to pay a junior rate after 21 is a clear underpayment.
          </p>
        </div>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if your junior rate looks wrong</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Check which percentage applies to your age.</strong> Use the table above to confirm your tier.</li>
          <li style={{ marginBottom: '8px' }}><strong>Calculate your correct rate including penalties.</strong> Use the tool below to enter your actual shifts and see what you should be paid. <a href="/check-my-pay?award=MA000119" style={linkStyle}>Check your junior pay now &rarr;</a></li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Present the calculation. Most junior pay errors are corrected once the employer sees the numbers.</li>
        </ol>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
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
          See also: <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Restaurant Award pay rates</a> &middot; <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates</a>
        </p>
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; enter your actual shifts and see what your junior pay should be.
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
        Rates sourced from the Fair Work Commission pay guide for the Restaurant Industry Award 2020 (MA000119), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
