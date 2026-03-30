/**
 * Scenario: Trade Qualified Cook Wrong Level — /awards/restaurant-award/scenarios/trade-qualified-cook
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

export default function RScenarioTradeQualified({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;

  const l3ft = l3?.ftRate ?? 0;
  const l4ft = l4?.ftRate ?? 0;
  const gapPerHour = Math.round((l4ft - l3ft) * 100) / 100;
  const gapPerWeek = Math.round(gapPerHour * 38 * 100) / 100;
  const gapPerYear = Math.round(gapPerWeek * 50 * 100) / 100;

  const faqData = [
    { question: 'Is Level 4 only for head chefs?', answer: 'No. Level 4 under the Restaurant Award applies to any cook or chef who holds a trade qualification (Certificate III in Commercial Cookery or equivalent). It is not limited to head chefs or supervisors.' },
    { question: 'I completed my apprenticeship 3 years ago but I\'m still on Level 3 — can I claim the difference?', answer: 'Yes. You should have been classified at Level 4 from the date you obtained your trade qualification. You can claim the underpayment for up to 6 years under the Fair Work Act.' },
    { question: 'What counts as a trade qualification?', answer: 'A Certificate III in Commercial Cookery (or equivalent) is the standard trade qualification. This includes completion of a formal apprenticeship or equivalent recognition of prior learning.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Almost certainly not. If you hold a trade qualification &mdash; such as a Certificate III in Commercial Cookery &mdash; the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> requires your employer to classify you at Level 4 minimum. This is an award requirement, not something at your employer&apos;s discretion.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a trade-qualified cook being paid at Level 3 &mdash; you&apos;re being underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Level 4 applies to any cook or chef with a relevant trade qualification</li>
          <li>This is a minimum &mdash; your employer must classify you at Level 4 or above from the date you obtain the qualification</li>
          <li>The classification is based on the qualification itself, not your role title or employer&apos;s preference</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 3 vs Level 4 permanent</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Level 3 permanent: {formatCurrency(l3ft)}/hr</li>
            <li>Level 4 permanent: {formatCurrency(l4ft)}/hr</li>
            <li>Gap per hour: {formatCurrency(gapPerHour)}</li>
            <li>Gap per 38-hour week: {formatCurrency(gapPerWeek)}</li>
            <li>Gap per year (50 weeks): {formatCurrency(gapPerYear)}</li>
          </ul>
          <p style={smallStyle}>
            This is the base rate gap alone &mdash; before Sunday penalties, public holiday rates, and overtime multipliers compound the difference further.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The {formatCurrency(gapPerHour)}/hr gap at base rate might seem modest, but it compounds on every penalty shift. A Sunday shift at 1.5&times; turns a {formatCurrency(gapPerHour)} gap into {formatCurrency(Math.round(gapPerHour * 1.5 * 100) / 100)}/hr. A public holiday at 2.25&times; turns it into {formatCurrency(Math.round(gapPerHour * 2.25 * 100) / 100)}/hr. Over a year of full-time work with regular weekend shifts, the total underpayment easily exceeds $3,000.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip show Level 4 (or higher) classification?</li>
          <li>Does your hourly rate match the Level 4 minimum for your employment type?</li>
          <li>If you completed your qualification mid-employment, was your rate updated from that date?</li>
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
        <p style={pStyle}>Trade-qualified and unsure about your rate? Check it now.</p>
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
