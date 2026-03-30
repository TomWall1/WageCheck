/**
 * Restaurant Award — Cook/Chef role page
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
    question: 'I\'m a qualified chef but my employer calls me a "cook" — does that affect my pay?',
    answer: 'No. Your job title doesn\'t determine your classification or pay rate under the award. What matters is your qualifications and the work you actually perform. If you hold a Certificate III (or equivalent trade qualification) and use it in your role, you must be classified at Level 4 minimum — regardless of whether your employer calls you a cook, a kitchen hand, or anything else.',
  },
  {
    question: 'I\'m a salaried chef — can my employer ignore overtime?',
    answer: 'Only if your salary has been set to genuinely cover all hours worked, including overtime and penalty rates, and the arrangement meets the "better off overall" test. Your employer must be able to demonstrate that your annual salary, when broken down across all hours worked (including overtime, weekends, and public holidays), equals or exceeds what you would have earned under the award. If it doesn\'t, you\'re being underpaid.',
  },
  {
    question: 'Does overtime start after 7.6 hours or 10 hours?',
    answer: 'For permanent (full-time and part-time) employees, overtime is triggered after 7.6 hours in a single day, or after 38 hours in a week. If you work a 10-hour shift as a permanent employee, you\'re entitled to 2.4 hours of overtime pay. For casual employees, the daily overtime trigger may differ — check your specific roster arrangement.',
  },
];

export default function RestaurantCookContent({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);
  const l4 = getLevel(rates, 4);

  const l3Ft = l3?.ftRate ?? 0;
  const l4Ft = l4?.ftRate ?? 0;
  const diffPerHour = Math.round((l4Ft - l3Ft) * 100) / 100;
  const diffPerWeek = Math.round(diffPerHour * 38 * 100) / 100;

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective {rates.effectiveDate} &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Cooks and chefs are among the most consistently underpaid workers under the Restaurant Industry Award. The most common issue: trade-qualified cooks being classified at Level 2 or Level 3 when they should be at Level 4 minimum. If you hold a Certificate III (or equivalent) and use it in your role, Level 4 is your floor.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A one-level classification error on a cook&apos;s pay compounds across every hour, every penalty, and every overtime payment.
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
            <strong>Scenario:</strong> Permanent cook, Certificate III qualified, classified and paid as Level 3.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid:</strong> {formatCurrency(l3Ft)}/hr (Level 3 base rate)
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should have been paid:</strong> {formatCurrency(l4Ft)}/hr (Level 4 &mdash; trade qualification = Level 4 minimum)
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(diffPerHour)}/hr &times; 38hrs = ~{formatCurrency(diffPerWeek)}/week. ~{formatCurrency(Math.round(diffPerWeek * 52))}/year &mdash; before penalties and overtime.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The employer never updates the classification when the cook completes their trade qualification. The worker assumes Level 3 is correct because it&apos;s what they&apos;ve always been paid.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Cook &amp; chef pay rates &mdash; Restaurant Award 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>FT/PT Rate</th>
                <th style={thStyle}>Casual Rate</th>
                <th style={thStyle}>Sunday (FT)</th>
                <th style={thStyle}>Sunday (Casual)</th>
              </tr>
            </thead>
            <tbody>
              {[3, 4, 5].map(lvl => {
                const l = getLevel(rates, lvl);
                if (!l) return null;
                return (
                  <tr key={lvl}>
                    <td style={tdStyle}>Level {lvl}</td>
                    <td style={tdStyle}>{formatCurrency(l.ftRate)}/hr</td>
                    <td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td>
                    <td style={tdStyle}>{formatCurrency(l.sundayFt)}/hr</td>
                    <td style={tdStyle}>{formatCurrency(l.sundayCasual)}/hr</td>
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
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for cooks and chefs</h2>

          <h3 style={h3Style}>Trade-qualified cook on Level 2 or 3</h3>
          <p style={pStyle}>
            If you hold a Certificate III or equivalent trade qualification and use it in your role, you must be classified at Level 4 minimum. This is the single most common source of underpayment for cooks.
          </p>

          <h3 style={h3Style}>Daily overtime ignored</h3>
          <p style={pStyle}>
            For permanent employees, overtime is triggered after 7.6 hours in a day. A standard 10-hour kitchen shift means 2.4 hours of overtime pay &mdash; at 1.5&times; for the first 2 hours and 2&times; after that. Many employers treat 10 hours as a standard shift and pay ordinary rates for the full day.
          </p>

          <h3 style={h3Style}>Tool allowance not paid</h3>
          <p style={pStyle}>
            If you supply and maintain your own knives or cooking tools, you&apos;re entitled to a tool allowance under the award. This is frequently overlooked, especially for cooks who bring their own knife kits.
          </p>

          <h3 style={h3Style}>Sunday rate at the wrong level</h3>
          <p style={pStyle}>
            Even when the base rate is correct, Sunday penalty rates are sometimes calculated against the wrong classification level &mdash; meaning you&apos;re underpaid on every Sunday shift.
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
          See also: <a href="/awards/restaurant-award/overtime" style={linkStyle}>Restaurant Award overtime</a> &middot; <a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications</a> &middot; <a href="/awards/restaurant-award/allowances" style={linkStyle}>Restaurant Award allowances</a>
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
