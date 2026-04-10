/**
 * High-intent: Is a Flat Rate Legal in Security?
 * URL: /awards/security-award/flat-rate-security
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
  { question: 'My employer advertised the job as a flat rate — does that make it legal?', answer: 'No. An advertised rate does not override the award. The Security Services Industry Award sets legally binding minimums that cannot be contracted out of, regardless of what was advertised, agreed to, or signed. If the flat rate results in you receiving less than the award for any shift, the employer is in breach.' },
  { question: 'How high would a flat rate need to be to cover overnight security work?', answer: 'Very high. To genuinely cover night loadings, weekend penalties, overtime on 12-hour shifts, and other entitlements for a typical overnight security roster, a flat rate would need to be well above the base award rate — often 30-50% or more above. Most flat rates in the security industry fall far short of this threshold.' },
  { question: 'Can I be on a salary instead of hourly in security?', answer: 'Yes, but the salary must pass the "better off overall" test. This means your annual salary, when broken down across all hours actually worked (including overtime, nights, weekends, and public holidays), must equal or exceed what you would earn under the award with all penalty rates applied. If it doesn\'t, you\'re being underpaid even if you\'re on a salary.' },
];

export default function SecurityIntentFlatRate({ rates }: { rates?: AwardRateData }) {
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
          Flat rates are endemic in the security industry. A single hourly rate for all shifts &mdash; days, nights, weekends, public holidays &mdash; is how most security companies operate. The problem: the Security Services Industry Award requires different rates for different times, and the penalties for overnight and weekend work are significant. A flat rate that might cover a Tuesday afternoon shift will almost never cover a Saturday overnight.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The short answer: a flat rate is only legal if it leaves you better off overall than the award. In security, it almost never does.
        </p>
        <p style={pStyle}>
          For the full penalty rate schedule, see the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Security Services Industry Award (MA000016) sets minimum rates that vary by time, day, and shift length. An employer can pay a flat rate only if it meets or exceeds the award entitlement for every shift pattern the worker actually performs. This is called the &quot;better off overall&quot; (BOOT) test.
        </p>
        <p style={pStyle}>
          In practice, this means the flat rate must cover:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Night shift loadings for hours between midnight and 6am</li>
          <li style={{ marginBottom: '6px' }}>Saturday and Sunday penalty rates</li>
          <li style={{ marginBottom: '6px' }}>Overtime for hours beyond ordinary (especially on 12-hour shifts)</li>
          <li style={{ marginBottom: '6px' }}>Public holiday rates (2.5x base for casuals)</li>
          <li style={{ marginBottom: '6px' }}>Any applicable allowances (uniform, equipment, travel)</li>
        </ul>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Why flat rates fail in security</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual guard paid a flat $32/hr. Works a mix of day and overnight shifts including weekends.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Tuesday day shift (8hrs):</strong> $32/hr may cover the weekday casual rate. No issue here.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Saturday overnight (12hrs, 6pm&ndash;6am):</strong> After midnight the Sunday casual rate applies &mdash; potentially $45+/hr. Plus overtime for hours beyond ordinary. The flat $32/hr falls well short.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Public holiday (8hrs):</strong> Public holiday casual rate can exceed $55+/hr. The $32 flat rate covers barely half the entitlement.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            The flat rate &quot;works&quot; on weekday days. It fails on every other shift pattern &mdash; which is where most security hours are worked.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Is your rate the same at 2am as it is at 2pm? If yes, night loadings are missing.</li>
          <li style={{ marginBottom: '8px' }}>Is your rate the same on Saturday and Sunday as Monday? If yes, weekend penalties are missing.</li>
          <li style={{ marginBottom: '8px' }}>On 12-hour shifts, are any hours paid at overtime rates? If all hours are the same, overtime is missing.</li>
          <li style={{ marginBottom: '8px' }}>Have you worked a public holiday at your flat rate? The correct rate is likely 2&ndash;2.5x the base.</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>Enter your shift pattern and see what you should actually be earning under the award.</p>
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
          Flat rates in security are the norm. That doesn&apos;t make them legal.
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
