/**
 * Scenario: Sunday Casual Rate — /awards/hospitality-award/scenarios/sunday-casual-rate
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left', borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

export default function ScenarioSundayCasual({ rates }: { rates?: HospitalityRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;
  const l5 = rates ? getLevel(rates, 5) : undefined;

  const l2CasualRate = l2?.casualRate ?? 0;
  const l2SunCasual = l2?.sundayCasual ?? 0;
  const l2FtRate = l2?.ftRate ?? 0;
  const l2SunFt = l2?.sundayFt ?? 0;
  const sunDiff = Math.round((l2SunCasual - l2CasualRate) * 100) / 100;

  const faqData = [
    { question: 'My employer says my casual loading covers the Sunday premium — is that right?', answer: 'No — and that claim is wrong. The 25% loading compensates for the absence of leave entitlements. It does not replace Sunday penalty rates, which are a separate and additional entitlement.' },
    { question: 'I\u0027ve been paid the wrong Sunday rate for years — can I recover it?', answer: 'Yes — up to 6 years under the Fair Work Act. If you work one Sunday per week, the cumulative shortfall can be very significant.' },
    { question: 'What\u0027s the Sunday rate for a permanent employee by comparison?', answer: `Lower than the casual Sunday rate. Permanent Level 2 Sunday = ${formatCurrency(l2SunFt)}/hr vs casual Level 2 Sunday = ${formatCurrency(l2SunCasual)}/hr.` },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Both &mdash; the casual rate and the Sunday rate are applied together, not as alternatives. This is the single most common misunderstanding about <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>casual</a> pay in hospitality. The 25% casual loading and the Sunday <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rate</a> are separate entitlements that both apply every Sunday. If you&apos;re being paid your ordinary casual rate on Sundays, you&apos;re being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work casual Sunday shifts in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>For casual employees under the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The 25% casual loading is applied to the ordinary base rate to produce the casual hourly rate</li>
          <li>The Sunday penalty multiplier is then applied to the casual rate</li>
        </ul>
        <p style={pStyle}>Both apply. The casual rate is the starting point for the Sunday calculation &mdash; not an alternative to it.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Sunday casual rate at each level</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Ordinary casual</th>
                <th style={thStyle}>Sunday casual</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Level 1</td><td style={tdStyle}>{formatCurrency(l1?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l1?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>{formatCurrency(l2CasualRate)}/hr</td><td style={tdStyle}>{formatCurrency(l2SunCasual)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>{formatCurrency(l3?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 4</td><td style={tdStyle}>{formatCurrency(l4?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l4?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 5</td><td style={tdStyle}>{formatCurrency(l5?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l5?.sundayCasual ?? 0)}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>Rates effective 1 July 2025.</p>
        <p style={pStyle}>
          If your Sunday pay matches your ordinary casual rate rather than the Sunday casual rate, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your Sunday shifts &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The maths</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 2 example</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Base rate: {formatCurrency(l2FtRate)}/hr</li>
            <li>Casual loading (25%): +{formatCurrency(l2CasualRate - l2FtRate)}/hr = {formatCurrency(l2CasualRate)}/hr (ordinary casual rate)</li>
            <li>Sunday penalty (1.4&times; the casual rate): {formatCurrency(l2SunCasual)}/hr</li>
          </ul>
          <p style={smallStyle}>
            Getting {formatCurrency(l2CasualRate)} on a Sunday means the Sunday penalty hasn&apos;t been applied. That&apos;s ~{formatCurrency(sunDiff)}/hr missing on every Sunday shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The gap between the ordinary casual rate and the Sunday casual rate at Level 2 is approximately {formatCurrency(sunDiff)}/hr. Working one 6-hour Sunday shift per week at the wrong rate: ~{formatCurrency(sunDiff * 6)}/week. Over 50 working weeks: ~{formatCurrency(sunDiff * 6 * 50)}/year &mdash; from a single shift type being underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does a separate Sunday rate line appear for Sunday shifts?</li>
          <li>Is the Sunday rate higher than your ordinary casual rate?</li>
          <li>Does your Sunday rate match the table above for your level?</li>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check exactly what your Sunday shifts should pay.</p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
