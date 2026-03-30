/**
 * High-intent: Am I Being Underpaid in a Restaurant or Cafe?
 * URL: /awards/restaurant-award/underpaid-restaurant
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
  { question: 'I\'ve been here 3 years — can I recover all of that?', answer: 'Yes. The Fair Work Ombudsman can recover underpayments going back up to 6 years under the Fair Work Act. Many restaurant workers recover multiple years of shortfalls once the correct rates are calculated.' },
  { question: 'My employer seems fair and pays above minimum wage — could I still be underpaid?', answer: 'Absolutely. Many underpayments in restaurants are genuine mistakes. The base rate might be correct, but penalty rates, classification levels, or allowances are miscalculated. It doesn\'t require bad intent to result in underpayment.' },
  { question: 'What if my employer gets angry when I raise this?', answer: 'You are legally protected from adverse action under the Fair Work Act. An employer cannot reduce your hours, change your roster, or terminate you for raising a pay concern. If they do, that\'s a separate and serious legal breach.' },
];

export default function RestaurantIntentUnderpaid({ rates }: { rates: RestaurantRateData }) {
  const l2 = getLevel(rates, 2);
  const l3 = getLevel(rates, 3);

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you think you&apos;re being underpaid at a restaurant or caf&eacute;, there&apos;s a high chance you&apos;re right. Restaurants and caf&eacute;s are consistently among the highest-investigated industries for underpayment by the Fair Work Ombudsman. The Restaurant Industry Award has multiple layers &mdash; base rates, classification levels, penalty rates that vary by day, late-night loadings, and allowances &mdash; and errors at any layer compound quickly.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your pay looks the same every week regardless of when you work &mdash; this applies to you.
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
            <strong>Scenario:</strong> Casual waitstaff, classified Level 2, 3 years at the same venue. Works Saturday and Sunday shifts. Paid a flat rate of {l2 ? formatCurrency(l2.casualRate) : '$29.66'}/hr every shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> Sunday casual rate should be {l2 ? formatCurrency(l2.sundayCasual) : '$41.52'}/hr, not the weekday rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> After 3 years at Level 2, they should have been reclassified to Level 3 (base casual rate: {l3 ? formatCurrency(l3.casualRate) : '$30.28'}/hr).
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 3:</strong> Works split shifts but no split shift allowance paid.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Combined underpayment: $120+ per week across three separate errors.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Each error is small in isolation, but restaurant underpayments almost always involve multiple overlapping issues.
          </p>
        </div>
      </section>

      {/* Most common signs */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Most common signs you&apos;re underpaid</h2>

          <h3 style={h3Style}>Your pay is the same every day regardless of when you work</h3>
          <p style={pStyle}>
            Saturday and Sunday rates under the Restaurant Award are higher than weekday rates. If your pay doesn&apos;t change on weekends, penalty rates are almost certainly missing.
          </p>

          <h3 style={h3Style}>You&apos;ve been here more than 3 months but your rate hasn&apos;t changed</h3>
          <p style={pStyle}>
            The Restaurant Award requires progression through classification levels as skills develop. If you&apos;ve gained new responsibilities or completed training, your level &mdash; and your rate &mdash; should have increased.
          </p>

          <h3 style={h3Style}>You have a trade qualification but you&apos;re paid below Level 4</h3>
          <p style={pStyle}>
            A trade-qualified cook or chef should be classified at Level 4 or above. If you hold a Certificate III or IV and you&apos;re paid at Level 2 or 3, you&apos;re being underpaid at the base level.
          </p>

          <h3 style={h3Style}>You work split shifts but don&apos;t receive a split shift allowance</h3>
          <p style={pStyle}>
            The Restaurant Award provides a split shift allowance when your shift is broken into two or more parts. This is common in restaurants with lunch and dinner services and is frequently missed.
          </p>

          <h3 style={h3Style}>Your employer uses the Hospitality Award for a standalone restaurant</h3>
          <p style={pStyle}>
            Standalone restaurants and caf&eacute;s are covered by the Restaurant Award (MA000119), not the Hospitality Award (MA000009). The penalty rate structures are different, and applying the wrong award can mean every weekend shift is underpaid.
          </p>
        </div>
      </section>

      {/* Related guides */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates</a> &middot; <a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications</a> &middot; <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Restaurant Award pay rates</a>
        </p>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you think you&apos;re underpaid</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the exact amount.</strong> Use the tool below to enter your actual shifts and see what you should have been paid under the Restaurant Award. <a href="/check-my-pay?award=MA000119" style={linkStyle}>Check your pay now &rarr;</a></li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Many underpayments are genuine mistakes. Presenting the calculation often resolves the issue quickly.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact the Fair Work Ombudsman.</strong> Call 13 13 94 if your employer doesn&apos;t respond or disputes the claim. FWO investigates and can compel back payment.</li>
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

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; enter your actual shifts and find out in 2 minutes.
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
