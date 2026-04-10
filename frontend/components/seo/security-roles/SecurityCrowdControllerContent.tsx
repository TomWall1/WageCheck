/**
 * Security Award — Crowd Controller role page
 * Rates: FWO pay guide MA000016
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
  {
    question: 'Are crowd controllers paid more than standard security guards?',
    answer: 'Yes. Crowd controllers (bouncers) are typically classified at a higher level under the Security Services Industry Award because of the additional licence requirements and the nature of the work. A crowd controller licence requires specific training beyond a standard security licence, and the classification level — and pay rate — reflects this.',
  },
  {
    question: 'I work weekends at pubs and clubs — what penalty rates apply?',
    answer: 'Saturday and Sunday work attracts penalty rates under the award. Friday and Saturday nights are the most common crowd controller shifts, and the hours after midnight attract both night loadings and the next-day penalty rate. A shift from 9pm Friday to 3am Saturday means the post-midnight hours should be paid at the higher Saturday rate, not the Friday rate.',
  },
  {
    question: 'My employer pays me per event, not per hour — is that legal?',
    answer: 'Only if the per-event payment, when divided by the actual hours worked, equals or exceeds the correct award rate for every hour including all applicable penalty rates. If you work a 6-hour Friday night event and the flat event fee divided by 6 is less than the correct Friday night/Saturday morning rates, you are being underpaid. Per-event payments are particularly risky because they almost never account for the rate changes that occur when shifts cross midnight.',
  },
];

export default function SecurityCrowdControllerContent({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000016
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Crowd controllers &mdash; bouncers, door staff, and venue security &mdash; are covered by the Security Services Industry Award 2020 (MA000016). Crowd control work comes with higher licence requirements and higher physical risk, and the award recognises this with a higher classification level. The work also concentrates on the hours with the highest penalty rates: Friday and Saturday nights, crossing midnight, and public holiday events.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Crowd control is where flat-rate underpayment hits hardest. Almost every shift involves night loadings, weekend penalties, and often overtime.
        </p>
        <p style={pStyle}>
          For the full Security Award overview, see the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* Classification */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Crowd controller classification</h2>
        <p style={pStyle}>
          Crowd controllers require a specialised crowd control licence (or equivalent under state legislation) in addition to a standard security licence. Under the Security Services Industry Award, this typically places crowd controllers at a higher classification level than standard security guards, reflecting the additional training, licence requirements, and risk involved.
        </p>
        <p style={pStyle}>
          Your classification determines your base rate, and every penalty rate, overtime rate, and allowance builds from it. If your employer classifies you at the same level as a static guard, your base rate is wrong from the start.
        </p>
      </section>

      {/* Common shifts and what they should pay */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Typical crowd controller shifts</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '12px' }}>
            <strong>Friday night pub shift (9pm&ndash;3am):</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>9pm&ndash;midnight: Friday night rate (evening/night loading)</li>
            <li>Midnight&ndash;3am: Saturday rate (higher than Friday) plus night loading</li>
          </ul>
          <p style={{ ...pStyle, marginBottom: '12px' }}>
            <strong>Saturday night club shift (10pm&ndash;4am):</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>10pm&ndash;midnight: Saturday night rate</li>
            <li>Midnight&ndash;4am: Sunday rate (significantly higher) plus night loading</li>
          </ul>
          <p style={{ ...pStyle, marginBottom: '12px' }}>
            <strong>New Year&apos;s Eve (10pm&ndash;4am):</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>10pm&ndash;midnight: Evening/night rate</li>
            <li>Midnight&ndash;4am: Public holiday rate (New Year&apos;s Day) &mdash; 250%/275% of base</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Every crowd controller shift crosses at least one rate boundary. A flat rate misses all of them.
          </p>
        </div>
      </section>

      {/* Underpayment example */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How crowd controllers get underpaid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual crowd controller paid $35/hr flat for all shifts. Works Friday and Saturday nights (9pm&ndash;3am), plus occasional public holiday events.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            The $35/hr flat rate may cover the early evening hours on a Friday, but it fails on:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Post-midnight Saturday hours (should be at higher Saturday casual rate)</li>
            <li>Post-midnight Sunday hours on a Saturday night shift (Sunday casual rate is substantially higher)</li>
            <li>Public holiday events (casual rate should be 275% of base)</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            A crowd controller working 2 shifts per week at a flat $35/hr can easily be $150&ndash;$250 short per week.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Is your classification level correct for crowd control work (higher than a standard guard)?</li>
          <li style={{ marginBottom: '8px' }}>Do your post-midnight hours attract the correct next-day penalty rate?</li>
          <li style={{ marginBottom: '8px' }}>Are Saturday night shifts paying the Sunday rate after midnight?</li>
          <li style={{ marginBottom: '8px' }}>For public holiday events, is the rate at 250%/275% of base?</li>
          <li style={{ marginBottom: '8px' }}>Is the minimum 4-hour engagement met on every shift?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Enter your Friday and Saturday night shifts and see what they should actually pay.
        </p>
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

      {/* Related */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/security-award/penalty-rates" style={linkStyle}>Security Award penalty rates</a> &middot; <a href="/awards/security-award/overtime" style={linkStyle}>Security Award overtime</a> &middot; <a href="/awards/security-award/pay-rates" style={linkStyle}>Security Award pay rates</a>
        </p>
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Crowd control shifts are worth more than the flat rate. Check yours.
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
