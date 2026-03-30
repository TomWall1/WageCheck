/**
 * Restaurant Award Allowances content — /awards/restaurant-award/allowances
 * Rates: FWO pay guide MA000119 effective 1 July 2025
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
  { question: 'Do casual employees get the split shift allowance?', answer: 'No. The split shift allowance under the Restaurant Award applies to full-time and part-time employees only. Casual employees are not entitled to it.' },
  { question: 'My employer says my rate already covers the tool allowance for knives \u2014 is that right?', answer: 'Only if they can demonstrably show that your hourly rate has been increased to account for the tool allowance separately. In practice, most can\'t. If the allowance isn\'t itemised on your payslip, it\'s likely not being paid.' },
  { question: 'How far back can I claim unpaid allowances?', answer: 'Up to 6 years under the Fair Work Act. If you\'ve been missing a split shift allowance for years, the back pay can be significant.' },
];

export default function RestaurantAllowancesContent({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If no allowances appear on your payslip, you&apos;re very likely owed money that&apos;s been quietly missed &mdash; often for years. Allowances are extra payments on top of your base rate for specific conditions, skills, or expenses. Under the Restaurant Award, they are one of the most commonly missed entitlements after penalty rates.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work split shifts, use your own knives, or wear a uniform you launder yourself &mdash; this applies to you.
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
            <strong>Scenario:</strong> Permanent waitstaff, Level 3. Works split shifts 5 days per week &mdash; morning service then evening service with a 3-hour gap. No split shift allowance paid.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> Base rate only &mdash; no split shift allowance</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Split shift allowance paid for each day a split shift is worked</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: The allowance is owed for every qualifying split shift day &mdash; 5 days a week adds up quickly over months and years.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer never accounts for the allowance. The worker assumes their hourly rate covers everything.
          </p>
        </div>
      </section>

      {/* Allowances table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Restaurant Award allowances 2025 &mdash; full list</h2>
        {rates.allowances.length > 0 ? (
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Per</th>
                </tr>
              </thead>
              <tbody>
                {rates.allowances.map((a, i) => (
                  <tr key={i}><td style={tdStyle}>{a.type}</td><td style={tdStyle}>{a.name}</td><td style={tdStyle}>{formatCurrency(a.amount)}</td><td style={tdStyle}>{a.perUnit}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={pStyle}>Allowance data is currently being updated. Check back soon.</p>
        )}
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If you meet the conditions for any of these allowances and they&apos;re not on your payslip, you&apos;re likely being underpaid.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Most commonly missed */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Most commonly missed allowances</h2>

          <h3 style={h3Style}>Split shift allowance</h3>
          <p style={pStyle}>
            This is the biggest hidden entitlement under the Restaurant Award. If your roster has a gap between two periods of work in the same day (morning service, then evening service), you&apos;re entitled to the split shift allowance for each day it occurs. Many employers treat split shifts as two separate shifts and skip the allowance entirely.
          </p>

          <h3 style={h3Style}>Tool allowance (cooks using own knives)</h3>
          <p style={pStyle}>
            Cooks who supply and maintain their own knives and tools are entitled to a daily tool allowance. This is rarely paid unless the employee specifically asks.
          </p>

          <h3 style={h3Style}>Meal allowance (unplanned late shifts)</h3>
          <p style={pStyle}>
            If you&apos;re a permanent employee required to work overtime and a meal break falls during that overtime, you&apos;re entitled to a meal allowance. This is frequently missed on busy nights.
          </p>

          <h3 style={h3Style}>Special clothing</h3>
          <p style={pStyle}>
            If your employer requires you to wear a uniform or special clothing, they must either provide it or pay you for its purchase and maintenance. If you&apos;re buying and laundering your own uniform with no reimbursement, that&apos;s the employer&apos;s obligation being passed to you.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Related pages */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Related guides</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/overtime" style={linkStyle}>Restaurant Award overtime guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/casual-employees" style={linkStyle}>Restaurant Award casual employees guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Full pay rates table &rarr;</a></li>
        </ul>
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

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; missing allowances add up over time.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every allowance, penalty rate, and loading you&apos;re entitled to.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
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
