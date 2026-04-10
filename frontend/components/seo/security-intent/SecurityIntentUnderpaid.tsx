/**
 * High-intent: Am I Being Underpaid as a Security Guard?
 * URL: /awards/security-award/underpaid-security
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
  { question: 'My employer says the flat rate covers everything — is that true?', answer: 'Almost never. A flat rate can only be legal if it genuinely compensates you for every penalty, loading, and overtime entitlement across all hours worked. For overnight security work, the penalty rates are so significant that a flat rate virtually never passes the "better off overall" test. If your pay is the same at 2am as it is at 2pm, you are almost certainly being underpaid.' },
  { question: 'Can I recover underpayments from previous years?', answer: 'Yes. The Fair Work Ombudsman can recover underpayments going back up to 6 years under the Fair Work Act. Security workers doing regular overnight shifts often find the accumulated shortfall runs into tens of thousands of dollars once correct night loadings and weekend penalties are applied.' },
  { question: 'What if I signed a contract agreeing to a flat rate?', answer: 'A contract cannot override the award. The Security Services Industry Award sets minimum pay rates, penalty rates, and overtime entitlements that apply regardless of what your contract says. If your contract pays less than the award, the award prevails. Your employer cannot contract out of their legal obligations.' },
];

export default function SecurityIntentUnderpaid({ rates }: { rates?: AwardRateData }) {
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
          If you work security and your pay looks the same regardless of whether you&apos;re working at 2pm or 2am, you are almost certainly being underpaid. The Security Services Industry Award has some of the most significant penalty rate entitlements of any award &mdash; night loadings, weekend penalties, and overtime rates that can more than double your base pay. When employers pay a flat hourly rate, the overnight and weekend shortfall compounds fast.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Here&apos;s the test: if your pay doesn&apos;t change between a Tuesday afternoon shift and a Saturday overnight shift, something is wrong.
        </p>
        <p style={pStyle}>
          For the full Security Award overview, see the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2, works two 12-hour overnight shifts per week (6pm&ndash;6am, Friday and Saturday nights). Paid a flat rate of $30/hr for every hour.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> No night loading applied. Hours between midnight and 6am attract significant penalty loadings under the award.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> Saturday and Sunday rates should be higher than weekday rates &mdash; but the flat rate ignores this entirely.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 3:</strong> On a 12-hour shift, overtime kicks in &mdash; the last hours should be at time-and-a-half or double time, not the flat rate.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Combined underpayment: $200+ per week across three separate errors.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Security companies often quote a single &quot;all-in&quot; rate that sounds reasonable on the surface but falls well short once correct penalty rates, night loadings, and overtime are calculated across a 12-hour overnight shift.
          </p>
        </div>
      </section>

      {/* Warning signs */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Signs you&apos;re being underpaid</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Your pay is identical whether you work day shifts, night shifts, weekends, or public holidays</li>
          <li style={{ marginBottom: '8px' }}>You work 12-hour shifts but your pay is calculated at a flat hourly rate with no overtime component</li>
          <li style={{ marginBottom: '8px' }}>You&apos;ve been at the same company for years but your classification level has never changed</li>
          <li style={{ marginBottom: '8px' }}>Your overnight shifts don&apos;t attract any night loading or penalty</li>
          <li style={{ marginBottom: '8px' }}>You hold a security licence but you&apos;re paid at the lowest classification level</li>
        </ul>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you think you&apos;re underpaid</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the exact amount.</strong> Use the tool below to enter your actual shifts and see what you should have been paid under the Security Award. <a href="/check-my-pay?award=MA000016" style={linkStyle}>Check your pay now &rarr;</a></li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Many underpayments in security are systemic rather than intentional. Presenting the calculation often starts the conversation.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact the Fair Work Ombudsman.</strong> Call 13 13 94 if your employer doesn&apos;t respond. FWO investigates and can compel back payment going back 6 years.</li>
        </ol>
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
          Don&apos;t guess &mdash; enter your actual shifts and find out in 2 minutes.
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
