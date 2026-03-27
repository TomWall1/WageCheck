/**
 * Hospitality Award Penalty Rates content — /awards/hospitality-award/penalty-rates
 * Rates: FWO pay guide MA000009 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500,
  color: 'var(--secondary)', marginBottom: '10px', marginTop: '0',
};
const h3Style: React.CSSProperties = {
  fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0',
};
const pStyle: React.CSSProperties = {
  fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem',
};
const smallStyle: React.CSSProperties = {
  fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6,
};
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)', border: '1.5px solid var(--accent)',
  borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem',
};
const exampleBoxStyle: React.CSSProperties = {
  background: '#f8f9fa', border: '1.5px solid var(--border)',
  borderRadius: '10px', padding: '20px', marginBottom: '1.5rem',
};
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left', borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Do casual employees get penalty rates?', answer: 'Yes — and any employer who says otherwise is wrong. If you\'ve been told this, there\'s a strong chance your pay is incorrect. Casual penalty rates are non-negotiable.' },
  { question: 'Can my employer pay a flat rate that covers everything?', answer: 'Only if they can prove, with actual numbers, that the flat rate exceeds award entitlements in every scenario including public holidays and late-night shifts. In practice, most can\'t.' },
  { question: 'What if my shift started Saturday and ended Sunday morning?', answer: 'Sunday rates apply from midnight. The Saturday rate covers only the pre-midnight hours. Paying one rate for the whole overnight shift is a frequently missed issue.' },
  { question: 'Can I recover penalty rates I wasn\'t paid?', answer: 'Yes — up to 6 years back under the Fair Work Act. The Fair Work Ombudsman can recover these on your behalf.' },
];

export default function HospitalityPenaltyContent() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 · Rates effective 1 July 2025 · MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work weekends or public holidays in hospitality, there&apos;s a high chance your penalty rates have been applied incorrectly — or not applied at all. Sunday shifts are the most frequently underpaid scenario across the entire award. This page shows every rate you&apos;re entitled to and the calculator checks your actual shifts.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work Saturdays, Sundays, public holidays, or late nights in any hospitality venue — this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual kitchen hand, Level 1. 6-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> $30.13/hr (standard casual rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday casual rate at Level 1 — $42.18/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$73 for one shift. ~$3,800/year working one Sunday per week.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the same casual rate every day. The Sunday multiplier is never applied.
          </p>
        </div>
      </section>

      {/* At a glance */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>At a glance — Hospitality penalty rate multipliers</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Saturday</strong> → 1.25× ordinary rate</li>
          <li><strong>Sunday</strong> → 1.5× ordinary rate</li>
          <li><strong>Public holiday</strong> → 2.25× ordinary rate</li>
          <li><strong>Evening (7pm–midnight)</strong> → +$2.47/hr on top of base</li>
          <li><strong>Late night (midnight–7am)</strong> → +$4.82/hr on top of base</li>
        </ul>
      </section>

      {/* Context */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hospitality Award Penalty Rates Australia (MA000009)</h2>
        <p style={pStyle}>
          The Hospitality Industry (General) Award 2020 sets these rates as legal minimums. Your employer cannot pay less, regardless of what your contract or roster says.
        </p>
        <p style={pStyle}>
          If your payslip doesn&apos;t clearly show each day&apos;s rate separately, that&apos;s often a red flag.
        </p>
      </section>

      {/* Full penalty rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Full penalty rates table — Level 1 (adult)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>When you work</th>
                <th style={thStyle}>Permanent</th>
                <th style={thStyle}>Casual</th>
                <th style={thStyle}>Example (6hr shift)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Weekday ordinary</td><td style={tdStyle}>$24.10/hr</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>Permanent: $144.60</td></tr>
              <tr><td style={tdStyle}>Weekday evening (7pm–midnight)</td><td style={tdStyle}>$26.57/hr</td><td style={tdStyle}>$32.60/hr</td><td style={tdStyle}>Permanent: $159.42</td></tr>
              <tr><td style={tdStyle}>Late night (midnight–7am)</td><td style={tdStyle}>$28.92/hr</td><td style={tdStyle}>$35.07/hr</td><td style={tdStyle}>Permanent: $173.52</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>$36.15/hr</td><td style={tdStyle}>Casual: $216.90</td></tr>
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>$36.15/hr</td><td style={tdStyle}>$42.18/hr</td><td style={tdStyle}>Casual: $253.05</td></tr>
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>$54.23/hr</td><td style={tdStyle}>$54.23/hr</td><td style={tdStyle}>Either: $325.35</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates for Level 1 adult employees. Higher classification levels receive higher dollar amounts. Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If your Sunday rate is close to your Tuesday rate, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Evening and late-night penalties */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Evening and late-night penalties</h2>
        <p style={pStyle}>
          This is one of the least understood parts of the award — and one of the biggest sources of underpayment.
        </p>
        <p style={pStyle}>
          The evening and late-night loadings are additions to your base rate, applied per hour. They stack on top of any weekend rate already in effect.
        </p>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Mini example</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            You work a Saturday shift from 8pm to 2am.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>Hours 8pm–midnight = Saturday rate + evening loading</li>
            <li>Hours midnight–2am = Sunday rate + late-night loading</li>
          </ul>
          <p style={pStyle}>
            Most employers pay Saturday rate for the whole shift. That&apos;s wrong from midnight onwards.
          </p>
        </div>
        <p style={pStyle}>
          Most payslips don&apos;t show these separately — but they must still be paid.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common penalty rate underpayments</h2>

          <h3 style={h3Style}>Flat rate every day of the week</h3>
          <p style={pStyle}>
            One rate regardless of Saturday, Sunday, or public holiday. Unless the flat rate has been formally assessed against every penalty scenario, this is almost always underpayment.
          </p>

          <h3 style={h3Style}>Casual loading treated as a substitute for penalty rates</h3>
          <p style={pStyle}>
            The 25% casual loading and penalty rates are separate entitlements — both apply. See the <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Hospitality Award casual employees guide</a> for how they stack.
          </p>

          <h3 style={h3Style}>Wrong public holiday multiplier</h3>
          <p style={pStyle}>
            Some employers apply 2× when the award specifies 2.25×. On a full shift, that&apos;s a meaningful shortfall on every public holiday worked.
          </p>

          <h3 style={h3Style}>Shift crossing midnight not split correctly</h3>
          <p style={pStyle}>
            Saturday rates end at midnight. From midnight, Sunday rates apply. Many employers pay one rate for the whole overnight shift.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation — and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now — it takes 2 minutes.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Penalty rates by classification level */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Penalty rates by classification level</h2>
        <p style={pStyle}>
          Because penalty rates are calculated from your base rate, your classification level directly affects every penalty you&apos;re paid. A misclassified worker is underpaid on every affected shift.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Sunday (permanent)</th>
                <th style={thStyle}>Sunday (casual)</th>
                <th style={thStyle}>Public holiday</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Level 1</td><td style={tdStyle}>$36.15/hr</td><td style={tdStyle}>$42.18/hr</td><td style={tdStyle}>$54.23/hr</td></tr>
              <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>$37.92/hr</td><td style={tdStyle}>$44.24/hr</td><td style={tdStyle}>$56.88/hr</td></tr>
              <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>$39.15/hr</td><td style={tdStyle}>$45.68/hr</td><td style={tdStyle}>$58.73/hr</td></tr>
              <tr><td style={tdStyle}>Level 4</td><td style={tdStyle}>$40.98/hr</td><td style={tdStyle}>$47.81/hr</td><td style={tdStyle}>$61.47/hr</td></tr>
              <tr><td style={tdStyle}>Level 5</td><td style={tdStyle}>$42.90/hr</td><td style={tdStyle}>$50.05/hr</td><td style={tdStyle}>$64.35/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Not sure of your classification? See the <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a>
        </p>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess — small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid — including every penalty rate, evening loading, and public holiday multiplier.
        </p>
        <p style={pStyle}>
          It takes 2 minutes — and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only — not legal advice. Verify at fairwork.gov.au.
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
