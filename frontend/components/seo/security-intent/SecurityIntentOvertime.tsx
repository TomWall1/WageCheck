/**
 * High-intent: Not Getting Overtime in Security?
 * URL: /awards/security-award/overtime-security
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
  { question: 'Does overtime apply on a 12-hour security shift?', answer: 'Yes. Under the Security Services Industry Award, overtime is triggered after the ordinary hours threshold for the day. On a 12-hour shift, several hours will typically attract overtime rates. The first 2 overtime hours are at time-and-a-half (1.5x), and any hours beyond that are at double time (2x). Many security employers pay the same flat rate for all 12 hours — that is not correct.' },
  { question: 'I am a casual — do I still get overtime?', answer: 'Yes. Casual employees are entitled to overtime under the Security Award. The casual loading does not replace overtime entitlements. If you work beyond the ordinary hours threshold for your shift arrangement, overtime rates apply on top of your casual rate (minus the casual loading for those overtime hours, as the overtime rate replaces it).' },
  { question: 'My employer says overtime is built into my hourly rate — is that legal?', answer: 'Only if the rate genuinely compensates you for every overtime hour at the correct multiplier. If you regularly work 12-hour shifts and your pay is calculated at a flat rate for all hours, it almost certainly does not cover the overtime entitlement. The employer must be able to demonstrate the "better off overall" test is met.' },
];

export default function SecurityIntentOvertime({ rates }: { rates?: AwardRateData }) {
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
          Security work and overtime go hand in hand. The industry runs on long shifts &mdash; 10, 12, sometimes 14 hours &mdash; and the Security Services Industry Award is clear: hours beyond the ordinary threshold attract overtime rates. Time-and-a-half for the first 2 hours, double time after that. If you&apos;re working 12-hour shifts and your pay doesn&apos;t reflect overtime, you have a problem.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          On a standard 12-hour security shift, you could be owed several hours of overtime pay that you&apos;re not receiving.
        </p>
        <p style={pStyle}>
          For the full overtime rules, see the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Security Services Industry Award (MA000016):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Overtime is payable for hours worked beyond ordinary hours in a day or 38 hours in a week</li>
          <li style={{ marginBottom: '6px' }}>First 2 overtime hours: time-and-a-half (1.5x base rate)</li>
          <li style={{ marginBottom: '6px' }}>After 2 overtime hours: double time (2x base rate)</li>
          <li style={{ marginBottom: '6px' }}>Overtime on a Sunday: double time for the entire overtime period</li>
          <li style={{ marginBottom: '6px' }}>Overtime on a public holiday: double time and a half (2.5x)</li>
        </ul>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time security guard, Level 2, works a 12-hour weekday shift (6pm&ndash;6am). Ordinary hours are 8 per day under the roster arrangement. Base rate: {l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>First 8 hours: {l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr = {l2 ? formatCurrency(l2.ftRate * 8) : '&mdash;'}</li>
            <li>Next 2 hours (1.5x): {l2 ? formatCurrency(l2.ftRate * 1.5) : '&mdash;'}/hr = {l2 ? formatCurrency(l2.ftRate * 1.5 * 2) : '&mdash;'}</li>
            <li>Final 2 hours (2x): {l2 ? formatCurrency(l2.ftRate * 2) : '&mdash;'}/hr = {l2 ? formatCurrency(l2.ftRate * 2 * 2) : '&mdash;'}</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Correct total: {l2 ? formatCurrency(l2.ftRate * 8 + l2.ftRate * 1.5 * 2 + l2.ftRate * 2 * 2) : '&mdash;'}. Flat rate total ({l2 ? formatCurrency(l2.ftRate) : '&mdash;'} x 12): {l2 ? formatCurrency(l2.ftRate * 12) : '&mdash;'}. Shortfall: {l2 ? formatCurrency(l2.ftRate * 8 + l2.ftRate * 1.5 * 2 + l2.ftRate * 2 * 2 - l2.ftRate * 12) : '&mdash;'} per shift.
          </p>
          <p style={smallStyle}>
            Two 12-hour shifts per week = $171 underpaid per week, or roughly $8,900 per year.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Are overtime hours listed separately from ordinary hours?</li>
          <li style={{ marginBottom: '8px' }}>Is the overtime rate shown as 1.5x or 2x your base rate?</li>
          <li style={{ marginBottom: '8px' }}>On shifts over 8 hours, are the extra hours paid at the overtime rate?</li>
          <li style={{ marginBottom: '8px' }}>Do your weekly hours exceed 38? If so, check all excess hours are at overtime rates.</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>Enter your actual shifts and see if your overtime has been calculated correctly.</p>
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
          Don&apos;t let overtime go unchecked &mdash; it&apos;s often the biggest single source of underpayment in security.
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
