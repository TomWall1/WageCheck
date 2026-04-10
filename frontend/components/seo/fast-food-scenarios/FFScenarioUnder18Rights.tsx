/**
 * Scenario: Under 18 Working Fast Food — What Are My Pay Rights?
 * /awards/fast-food-award/scenarios/under-18-rights
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'What is the minimum pay rate for a 16-year-old in fast food?', answer: 'A 16-year-old receives 60% of the adult rate under the Fast Food Industry Award. For Grade 1, that\'s approximately $14.84/hr (60% of $24.73). Casual 16-year-olds receive 60% of the adult rate plus the 25% casual loading.' },
  { question: 'Do under-18s get penalty rates on weekends and public holidays?', answer: 'Yes. Junior employees receive the same penalty rate percentages as adults — 150% on Sundays, 250%/275% on public holidays, and late night loadings. These percentages are applied to the junior base rate, not the adult rate, but the penalty entitlement is identical.' },
  { question: 'Are there restrictions on when under-18s can work in fast food?', answer: 'While the Fast Food Industry Award doesn\'t set specific hour restrictions for under-18s, state and territory child employment laws may limit the hours and times that minors can work, particularly on school nights. Check your state\'s rules — for example, in Victoria, under-15s cannot work during school hours and have limits on shift lengths.' },
];

export default function FFScenarioUnder18Rights({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const adultBase = l1?.ftRate ?? 24.73;
  const rate16 = Math.round(adultBase * 0.60 * 100) / 100;
  const rate17 = Math.round(adultBase * 0.70 * 100) / 100;
  const rate16Casual = Math.round(rate16 * 1.25 * 100) / 100;
  const rate17Casual = Math.round(rate17 * 1.25 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You have the same workplace rights as adult workers, but at a junior pay rate. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, workers under 18 receive a percentage of the adult rate based on their age — and are still entitled to penalty rates, breaks, and minimum engagement hours.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) sets junior rates as a percentage of the adult rate: 50% at age 15 and under, 60% at 16, 70% at 17, 80% at 18, 90% at 19, and 97% at 20. At 21, you receive the full adult rate. All other award entitlements — penalty rates, break provisions, minimum engagement, overtime — apply equally to junior employees. Your employer cannot use your age as a reason to deny you these rights.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 junior rates</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Age 16 base rate (60%): ${rate16.toFixed(2)}/hr</li>
            <li>Age 16 casual rate: ${rate16Casual.toFixed(2)}/hr</li>
            <li>Age 17 base rate (70%): ${rate17.toFixed(2)}/hr</li>
            <li>Age 17 casual rate: ${rate17Casual.toFixed(2)}/hr</li>
            <li>Adult base rate (21+): ${adultBase.toFixed(2)}/hr</li>
          </ul>
          <p style={smallStyle}>
            These are minimum rates. Penalty rates (Sunday, public holiday, late night) are calculated as percentages on top of these junior base rates.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your hourly rate match the correct junior percentage for your age?</li>
          <li>Are penalty rates applied on top of your junior rate for weekends and public holidays?</li>
          <li>Are you receiving the 25% casual loading if you&apos;re engaged as a casual?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
