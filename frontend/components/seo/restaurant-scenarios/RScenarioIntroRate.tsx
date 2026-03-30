/**
 * Scenario: Introductory Rate — /awards/restaurant-award/scenarios/introductory-rate
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

export default function RScenarioIntroRate({ rates }: { rates?: RestaurantRateData }) {
  const l0 = rates ? getLevel(rates, 0) : undefined;
  const l1 = rates ? getLevel(rates, 1) : undefined;

  const introCasual = l0?.casualRate ?? 0;
  const l1Casual = l1?.casualRate ?? 0;
  const gapPerHour = Math.round((l1Casual - introCasual) * 100) / 100;
  // 20hrs/week for 6 months = 20 * 26 = 520 hours
  const sixMonthGap = Math.round(gapPerHour * 520 * 100) / 100;

  const faqData = [
    { question: 'Is the 3-month introductory period at this employer or in the industry?', answer: 'In the restaurant industry — not just at your current employer. If you\'ve already worked 3 months or more in any restaurant, café, or catering role covered by the Restaurant Industry Award, the introductory rate no longer applies to you.' },
    { question: 'What if I worked at a different restaurant before this one?', answer: 'That experience counts toward your 3 months. The introductory rate is based on total time in the industry. If you spent 2 months at a previous restaurant and started a new job, the introductory rate should only apply for 1 more month at most.' },
    { question: 'How do I prove my industry experience?', answer: 'Employment records, payslips, bank statements showing restaurant employer payments, references, or even a statutory declaration can all serve as evidence of prior industry experience.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          The introductory rate under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> applies for the first 3 months in the restaurant industry only. After that, you must be paid at least the Level 1 <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>pay rate</a>. If you&apos;ve been in the industry longer than 3 months, the introductory rate no longer applies &mdash; regardless of how long you&apos;ve been at your current employer.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Still on the introductory rate after 3 months in the industry? You&apos;re being underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Restaurant Industry Award (MA000119), the introductory rate applies only for the first 3 months of employment in the restaurant industry. The clock runs on total industry experience, not just time at one employer. After 3 months, the minimum rate is Level 1.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Introductory vs Level 1 casual example</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Introductory casual rate: {formatCurrency(introCasual)}/hr</li>
            <li>Level 1 casual rate: {formatCurrency(l1Casual)}/hr</li>
            <li>Gap per hour: {formatCurrency(gapPerHour)}</li>
          </ul>
          <p style={smallStyle}>
            Working 20 hours/week for 6 months beyond the threshold: {formatCurrency(sixMonthGap)} underpaid.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Being kept on the introductory rate beyond 3 months of industry experience means losing money every single shift. Over 6 months of part-time work, the gap exceeds {formatCurrency(sixMonthGap)} &mdash; and that figure grows for every penalty rate shift, because penalties are calculated on the higher Level 1 base.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>What classification level are you listed at?</li>
          <li>Does your hourly rate match at least Level 1?</li>
          <li>Have you been in the restaurant industry for more than 3 months total?</li>
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
        <p style={pStyle}>Check whether your rate matches at least Level 1 for your employment type.</p>
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
