/**
 * Scenario: 21st Birthday Rate Change — /awards/restaurant-award/scenarios/21st-birthday
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

export default function RScenario21stBirthday({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const adultCasual = l3?.casualRate ?? 0;
  const juniorRate = Math.round(adultCasual * 0.9 * 100) / 100;
  const gapPerHour = Math.round((adultCasual - juniorRate) * 100) / 100;
  // 20hrs/week for 6 months = 520 hours
  const sixMonthGap = Math.round(gapPerHour * 520 * 100) / 100;

  const faqData = [
    { question: 'How do I know if my rate was updated when I turned 21?', answer: 'Check your payslip for the pay period that includes your 21st birthday. Your hourly rate should have increased to the full adult rate from that date. If it stayed the same, you\'ve been underpaid from your birthday onward.' },
    { question: 'I turned 21 months ago and my rate never changed — can I claim it back?', answer: 'Yes. You can claim the difference between what you were paid (the junior or under-21 rate) and the full adult rate for every hour worked from your 21st birthday onward. You have up to 6 years to recover underpayments.' },
    { question: 'My employer says my rate will be updated at the next review — is that right?', answer: 'No. Under the Restaurant Industry Award, the full adult rate applies automatically from your 21st birthday — not from the next pay review, performance review, or any other date your employer chooses. The change is immediate by law.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          It should have changed from your 21st birthday. If it hasn&apos;t, you&apos;ve been underpaid from that date. Under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>, full adult rates apply automatically from the day you turn 21 &mdash; no review, no waiting period, no employer discretion.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your rate didn&apos;t change on your 21st birthday &mdash; you&apos;re owed the difference.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Restaurant Industry Award (MA000119), full adult <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>pay rates</a> apply from an employee&apos;s 21st birthday. This change is automatic under the award &mdash; it does not depend on your employer updating your rate or conducting a review. If you were on a junior percentage rate, you move to 100% of the adult rate from your birthday.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 3 casual example</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>20-year-old rate (90% of adult): {formatCurrency(juniorRate)}/hr</li>
            <li>Full adult casual rate at Level 3: {formatCurrency(adultCasual)}/hr</li>
            <li>Gap per hour: {formatCurrency(gapPerHour)}</li>
          </ul>
          <p style={smallStyle}>
            Working 20 hours/week for 6 months at the wrong rate: {formatCurrency(sixMonthGap)} underpaid.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The gap between a 20-year-old rate and the full adult rate may look small per hour, but it compounds quickly. Over 6 months of part-time work, the shortfall can easily exceed {formatCurrency(sixMonthGap)} &mdash; and that&apos;s before penalties, overtime, and public holiday rates are considered. Those are all calculated on the adult base rate too.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Raise the issue with your employer in writing (email or text)</li>
          <li>State that adult rates apply from your 21st birthday under MA000119</li>
          <li>Request the shortfall be back-paid from your birthday</li>
          <li>If not resolved, contact the Fair Work Ombudsman on 13 13 94</li>
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
        <p style={pStyle}>Check whether your rate matches the full adult rate for your level.</p>
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
