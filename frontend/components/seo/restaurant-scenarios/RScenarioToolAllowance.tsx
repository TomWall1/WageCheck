/**
 * Scenario: Tool Allowance (Knives) — /awards/restaurant-award/scenarios/tool-allowance
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getAllowance } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer provides knives but I prefer to use my own — do I get the allowance?', answer: 'No. The tool allowance applies only when the employer requires you to supply your own knives or tools. If the employer provides adequate tools and you choose to use your own, the allowance is not triggered.' },
  { question: 'Does the tool allowance apply to all cooks?', answer: 'Only when the cook is required to supply and use their own tools. If the employer provides all necessary knives and equipment, the allowance doesn\'t apply — even if you\'re classified as a cook.' },
  { question: 'How far back can I claim unpaid tool allowance?', answer: 'Up to 6 years under the Fair Work Act. If you\'ve been required to supply your own knives for years without receiving the allowance, you can recover the full amount for every day worked during that period.' },
];

export default function RScenarioToolAllowance({ rates }: { rates?: RestaurantRateData }) {
  const toolAllow = rates ? getAllowance(rates, 'tool') : 1.95;
  const annualTool = Math.round(toolAllow * 250 * 100) / 100;
  const threeYearTool = Math.round(annualTool * 3 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Yes &mdash; the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> includes a tool allowance payable per day when you&apos;re required to supply your own knives or tools. It&apos;s a small daily amount, but over a year of full-time work it adds up to a meaningful sum that many cooks never receive.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Required to bring your own knives? You should be getting a daily tool allowance.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Restaurant Industry Award (MA000119), a tool allowance is payable per day to any cook or chef who is required by their employer to supply and use their own tools or knives. The allowance is paid for each day worked where this requirement applies.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Full-time cook using own knives</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Tool allowance: {formatCurrency(toolAllow)} per day worked</li>
            <li>Working 5 days/week, ~250 days/year</li>
            <li>Annual tool allowance total: {formatCurrency(annualTool)}/year</li>
          </ul>
          <p style={smallStyle}>
            Over 3 years without the allowance: {formatCurrency(threeYearTool)} in back-pay &mdash; enough to cover a full professional knife set. Many cooks don&apos;t know this allowance exists. Exact amount depends on your classification level.
          </p>
        </div>
        <p style={smallStyle}>
          Figures are approximate based on rates effective 1 July 2025. Exact amounts depend on your classification level. Use the calculator below for your specific shifts.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a tool or knife allowance line item on your payslip?</li>
          <li>Does it appear for every day you worked using your own tools?</li>
          <li>Are you required by your employer to supply your own knives?</li>
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
        <p style={pStyle}>Check whether your pay includes all applicable allowances.</p>
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
