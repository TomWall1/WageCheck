/**
 * Scenario: Casual Conversion — /awards/restaurant-award/scenarios/casual-conversion
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

const faqData = [
  { question: 'My hours vary a bit — do I still qualify for casual conversion?', answer: 'Potentially yes. A consistent pattern of work with some variation can still qualify as "regular and systematic." The test is whether there is an identifiable pattern, not whether every week is identical.' },
  { question: 'My employer says they need the flexibility — can they refuse?', answer: 'An employer can only refuse on reasonable grounds, and must provide genuine, specific operational reasons in writing within 21 days of your request. A vague claim about flexibility is not sufficient.' },
  { question: 'Will I earn less if I convert?', answer: 'Your hourly rate will fall because you lose the 25% casual loading. However, you gain annual leave (4 weeks paid), personal/carer\'s leave (10 days paid), and other entitlements. For most workers doing regular hours, the leave entitlements more than compensate.' },
];

export default function RScenarioCasualConversion({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l3Ft = l3?.ftRate ?? 26.10;
  const annualLeave = Math.round(4 * 20 * l3Ft * 100) / 100;
  const personalLeave = Math.round(10 * 4 * l3Ft * 100) / 100;
  const totalLeave = Math.round((annualLeave + personalLeave) * 100) / 100;
  const casualLoading = Math.round(l3Ft * 0.25 * 20 * 52 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Yes &mdash; after 12 months of regular and systematic work, you can request conversion to permanent (full-time or part-time) employment. Your employer must respond in writing. This right applies to <a href="/awards/restaurant-award/casual-employees" style={linkStyle}>casual employees</a> under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> and is backed by the Fair Work Act.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve been working regular shifts for over 12 months as a casual &mdash; you may have the right to convert.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Fair Work Act casual conversion provisions:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>After 12 months of employment with regular and systematic shifts, a casual employee can request conversion</li>
          <li>The employer must respond in writing within 21 days</li>
          <li>Refusal requires genuine, specific operational grounds</li>
          <li>Small business employers (under 15 employees) have different obligations</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What changes when you convert</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>You lose the 25% casual loading</li>
          <li>You gain 4 weeks paid annual leave per year</li>
          <li>You gain 10 days paid personal/carer&apos;s leave per year</li>
          <li>You gain redundancy entitlements and notice of termination</li>
          <li>Your hours are guaranteed in your employment contract</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What conversion is worth</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Part-time 20 hours/week at Level 3</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Annual leave value (4 weeks &times; 20 hrs &times; {formatCurrency(l3Ft)}/hr): {formatCurrency(annualLeave)}/year</li>
            <li>Personal leave value (10 days &times; 4 hrs/day &times; {formatCurrency(l3Ft)}/hr): {formatCurrency(personalLeave)}/year</li>
            <li>Total leave entitlement value: {formatCurrency(totalLeave)}/year</li>
          </ul>
          <p style={smallStyle}>
            The 25% casual loading on 20 hrs/week at Level 3 is worth {formatCurrency(casualLoading)}/year. But leave entitlements plus job security often provide greater overall value for workers doing consistent hours.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Have you worked regular shifts for 12+ months?</li>
          <li>Is there a consistent pattern to your rostered hours?</li>
          <li>Has your employer offered or discussed conversion?</li>
          <li>Have you made a written request and received a written response?</li>
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
        <p style={pStyle}>Thinking about casual conversion? Start by checking your current pay is correct.</p>
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
