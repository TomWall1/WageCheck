/**
 * Scenario: Good Friday Pay — /awards/hospitality-award/scenarios/good-friday-pay
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

const faqData = [
  { question: 'My employer paid me double time on Good Friday — is that right?', answer: 'No. The Hospitality Award specifies 2.25\u00d7 — double time (2\u00d7) falls short. The difference on an 8-hour shift at Level 2 is over $45.' },
  { question: 'What about Easter Saturday?', answer: 'Easter Saturday is a public holiday in some states but not others. The applicable rate depends on the state where you work.' },
  { question: 'I wasn\u0027t asked to work but Good Friday would have been my ordinary working day — am I owed anything?', answer: 'If you\u0027re a permanent employee, yes — you\u0027re entitled to a paid day off on Good Friday if it falls on a day you\u0027d ordinarily work.' },
];

export default function ScenarioGoodFriday({ rates }: { rates?: HospitalityRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;
  const l5 = rates ? getLevel(rates, 5) : undefined;

  const l2PhCasual = l2?.publicHolidayCasual ?? 0;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          2.25&times; your ordinary rate. Good Friday is a national public holiday, and the Hospitality Award specifies a public holiday rate of 2.25 times the ordinary rate. If you were paid your standard rate, a weekend rate, or even double time &mdash; you were underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you worked Good Friday in any hospitality venue &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Good Friday is a national public holiday under the National Employment Standards. Under the Hospitality Award (MA000009), the public holiday rate for all adult employees is 2.25&times; the ordinary rate.
        </p>
        <p style={pStyle}>This is applied to:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The ordinary hourly rate for permanent employees</li>
          <li>The <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>casual</a> base rate (including 25% loading) for casual employees</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What Good Friday should pay</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Permanent</th>
                <th style={thStyle}>Casual</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Level 1</td><td style={tdStyle}>{formatCurrency(l1?.publicHolidayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l1?.publicHolidayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>{formatCurrency(l2?.publicHolidayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l2?.publicHolidayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>{formatCurrency(l3?.publicHolidayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.publicHolidayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 4</td><td style={tdStyle}>{formatCurrency(l4?.publicHolidayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l4?.publicHolidayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Level 5</td><td style={tdStyle}>{formatCurrency(l5?.publicHolidayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l5?.publicHolidayCasual ?? 0)}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>Rates effective 1 July 2025.</p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Example</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            6-hour Good Friday shift, Level 2 casual = 6 &times; {formatCurrency(l2PhCasual)} = {formatCurrency(l2PhCasual * 6)}
          </p>
        </div>
        <p style={pStyle}>
          If you received significantly less than this for a Good Friday shift, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your Good Friday pay &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The difference between double time (2&times;) and the correct rate (2.25&times;) is 0.25&times; your ordinary rate per hour. At Level 2 permanent over an 8-hour Good Friday shift: approximately {formatCurrency((l2?.ftRate ?? 0) * 0.25 * 8)} underpaid. Multiply across Easter Friday, Easter Monday, Christmas Day, Boxing Day, and Australia Day &mdash; the annual total from this single multiplier error is often $200&ndash;$300.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does a public holiday rate line appear for your Good Friday shift?</li>
          <li>Is the rate 2.25&times; your ordinary rate &mdash; not 1.5&times; or 2&times;?</li>
          <li>If you worked Easter Saturday as well, that day may be a public holiday in your state &mdash; check applicable state public holidays.</li>
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
        <p style={pStyle}>Don&apos;t guess &mdash; calculate what Good Friday should have paid.</p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
