/**
 * Scenario: Wrong Award for Cafe — /awards/restaurant-award/scenarios/wrong-award-cafe
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function RScenarioWrongAwardCafe({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const restSundayCasual = l3?.sundayCasual ?? 0;

  const faqData = [
    { question: 'My employer says we\'re definitely under the Hospitality Award — how do I check?', answer: 'Use the Fair Work Commission\'s Award Finder tool or contact the Fair Work Ombudsman on 13 13 94. The test is whether your cafe is standalone or part of a hotel/accommodation venue. Standalone cafes fall under the Restaurant Industry Award (MA000119).' },
    { question: 'My cafe is inside a hotel — which award applies?', answer: 'If the cafe operates within a hotel, motel, or accommodation venue, the Hospitality Industry (General) Award (MA000009) applies. The Restaurant Award covers standalone restaurants, cafes, and catering operations.' },
    { question: 'Can I recover the difference if I\'ve been paid under the wrong award?', answer: 'Yes. If you\'ve been underpaid because the wrong award was applied, you can claim the difference for up to 6 years under the Fair Work Act.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Probably not &mdash; if the caf&eacute; is standalone. Standalone caf&eacute;s fall under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> (MA000119), not the <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award</a> (MA000009). Being on the wrong award can mean different base rates, different <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates</a>, and different allowances.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in a standalone caf&eacute; and your payslip references the Hospitality Award &mdash; you may be on the wrong award.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Restaurant Industry Award (MA000119)</strong>: applies to standalone restaurants, caf&eacute;s, catering operations, and takeaway food businesses</li>
          <li><strong>Hospitality Industry Award (MA000009)</strong>: applies to caf&eacute;s and restaurants inside hotels, motels, or accommodation venues</li>
        </ul>
        <p style={pStyle}>The distinction is about the venue type, not what food you serve.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Sunday casual Level 3 comparison</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Hospitality Award Sunday casual L3: Hospitality Award rate</li>
            <li>Restaurant Award Sunday casual L3: {formatCurrency(restSundayCasual)}/hr</li>
            <li>The rates differ between awards &mdash; being on the wrong one can cost you per hour</li>
          </ul>
          <p style={smallStyle}>
            On a 6-hour Sunday shift, the wrong award can cost $10+ per shift. Over 50 Sundays: $500+/year. Exact figures depend on classification level.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Penalty rates, allowances, and overtime triggers can differ between the two awards. For a Level 3 casual working one 6-hour Sunday shift per week, the wrong award can mean a meaningful loss per shift. Over a year of regular shifts, total underpayment can easily exceed $1,000.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip reference MA000009 (Hospitality) or MA000119 (Restaurant)?</li>
          <li>Is your workplace a standalone caf&eacute; or part of a hotel/accommodation venue?</li>
          <li>Use the FWC Award Finder to confirm which award covers your employer</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>Not sure which award covers you? Check your pay against the right award.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at fairwork.gov.au.
      </p>

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
