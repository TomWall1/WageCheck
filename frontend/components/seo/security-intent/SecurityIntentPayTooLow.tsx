/**
 * High-intent: My Security Pay Seems Too Low
 * URL: /awards/security-award/pay-too-low-security
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'What are the most common reasons security pay is too low?', answer: 'The top three are: (1) flat rate pay that ignores night loadings and weekend penalties, (2) no overtime paid on 12-hour shifts, and (3) wrong classification level. Security work involves significant penalty entitlements because of overnight and weekend work — when these are missing, the shortfall is substantial.' },
  { question: 'How much should a security guard earn per hour in Australia?', answer: 'It depends on your classification level, employment type, and when you work. The base award rate is the absolute minimum, but most security shifts involve nights or weekends that push the actual minimum well above the base. A casual guard working an overnight Saturday shift should earn significantly more than the base weekday rate.' },
  { question: 'Is it worth raising a small difference with my employer?', answer: 'Yes. In security, even a small hourly shortfall compounds dramatically across 12-hour shifts, multiple shifts per week, and 52 weeks a year. A $3/hr shortfall on two 12-hour shifts per week adds up to over $3,700 per year. And if the shortfall has been ongoing for several years, the total can be recovered going back up to 6 years.' },
];

export default function SecurityIntentPayTooLow({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000016
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your security pay feels too low, trust that instinct. Security is one of the industries where the gap between what workers are paid and what the award requires is widest. The reason is straightforward: the Security Services Industry Award has significant penalty loadings for the exact hours security guards work most &mdash; nights, weekends, and public holidays. When employers ignore these loadings, the result is pay that looks low because it is low.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          You don&apos;t need to know the exact rates to start. You just need to know your shift times.
        </p>
        <p style={pStyle}>
          See the full breakdown at the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* Where the gap comes from */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Where the gap comes from</h2>
        <p style={pStyle}>Security pay feels low because it often is. Here are the three most common reasons:</p>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}><strong>1. Night loadings missing.</strong> Hours between midnight and 6am attract penalty loadings under the award. On a standard overnight shift, this can add $5&ndash;$10+/hr above the base rate for those hours. Most flat-rate employers pay nothing extra.</p>
          <p style={{ ...pStyle, marginBottom: '8px' }}><strong>2. Overtime not paid on long shifts.</strong> A 12-hour shift includes overtime hours that should be at 1.5x or 2x the base rate. Paid at a flat rate, you lose the overtime premium entirely.</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>3. Weekend penalties ignored.</strong> Saturday and Sunday rates are higher than weekday rates. If your hourly rate never changes regardless of the day, you&apos;re missing weekend penalties.</p>
        </div>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What the numbers look like</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time security guard, Level 2, works three 12-hour overnight shifts per week (6pm&ndash;6am), including one Saturday night. Paid a flat $29/hr.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What&apos;s missing:</strong> Night loadings for midnight&ndash;6am hours, overtime for hours beyond ordinary, and Saturday/Sunday penalty rates.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Estimated weekly shortfall: $250&ndash;$350+ depending on exact shift times and classification.
          </p>
          <p style={smallStyle}>
            Over a year, that&apos;s $13,000&ndash;$18,000 in underpayment &mdash; and it can be recovered going back 6 years.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Does your payslip show different rates for nights vs. days?</li>
          <li style={{ marginBottom: '8px' }}>Are Saturday and Sunday hours paid at a higher rate than weekdays?</li>
          <li style={{ marginBottom: '8px' }}>On shifts over 8 hours, are the extra hours shown as overtime?</li>
          <li style={{ marginBottom: '8px' }}>Is your classification level correct for the work you perform?</li>
          <li style={{ marginBottom: '8px' }}>Are you receiving a uniform or equipment allowance if applicable?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>Stop guessing. Enter your shifts and see the exact amount you should be earning.</p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Two minutes is all it takes to find out.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000016).
        </p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Security Services Industry Award 2020 (MA000016), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
