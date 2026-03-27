/**
 * Hospitality Award Casual Employees content — /awards/hospitality-award/casual-employees
 * Rates: FWO pay guide MA000009 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

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
  { question: 'Does the 25% loading mean I earn more than a permanent worker?', answer: 'On ordinary weekdays, yes. But permanent workers accrue leave entitlements and receive notice on termination \u2014 benefits that have real monetary value over time.' },
  { question: 'Can my employer remove the loading if I get other benefits?', answer: 'Not without a formal, legally compliant arrangement. The loading is an award entitlement and cannot be waived informally.' },
  { question: 'My roster is the same every week \u2014 am I still casual?', answer: 'Possibly not after 12 months. Regular and systematic work \u2014 even with varying hours \u2014 can trigger conversion rights. If your employer has never raised this after 12 months, they may be in breach.' },
];

export default function HospitalityCasualContent({ rates }: { rates: HospitalityRateData }) {
  const l1 = getLevel(rates, 1);
  const l2 = getLevel(rates, 2);
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 · Rates effective 1 July 2025 · MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re a casual hospitality worker, there&apos;s a high chance you&apos;ve been told the 25% loading covers weekends. It doesn&apos;t. The loading and penalty rates are separate entitlements &mdash; both apply every time. This is one of the most common misrepresentations in the industry, and it costs casual workers significantly every weekend.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work casual shifts in any hospitality venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual food and beverage attendant, Level 2. 6-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l2?.casualRate ?? 0)}/hr (casual base &mdash; loading included)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Casual Sunday rate at Level 2 &mdash; {formatCurrency(l2?.sundayCasual ?? 0)}/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~{formatCurrency(((l2?.sundayCasual ?? 0) - (l2?.casualRate ?? 0)) * 6)} for one shift. ~{formatCurrency(((l2?.sundayCasual ?? 0) - (l2?.casualRate ?? 0)) * 6 * 52)}/year on one Sunday per week.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the casual rate every day assuming the loading covers the penalty. It doesn&apos;t.
          </p>
        </div>
      </section>

      {/* What is the 25% casual loading? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is the 25% casual loading?</h2>
        <p style={pStyle}>
          The casual loading compensates for entitlements you don&apos;t receive as a casual employee:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>No paid annual leave</li>
          <li>No paid personal leave</li>
          <li>No notice of termination</li>
          <li>No redundancy pay</li>
        </ul>
        <p style={pStyle}>
          It is applied to the base rate to produce your casual ordinary hourly rate. That&apos;s your starting point &mdash; not your full entitlement on weekends.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The loading does not replace penalty rates. Both apply.
        </p>
        <p style={pStyle}>
          If your payslip shows one rate every day and doesn&apos;t break out separate penalty rates, that&apos;s often a red flag.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Casual pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hospitality Casual Pay Rates 2025 &mdash; by classification</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Casual ordinary rate</th>
                <th style={thStyle}>Casual Saturday</th>
                <th style={thStyle}>Casual Sunday</th>
                <th style={thStyle}>Casual public holiday</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 5).map(l => (
                <tr key={l.level}><td style={tdStyle}>Level {l.level}</td><td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td><td style={tdStyle}>{formatCurrency(l.saturdayCasual)}/hr</td><td style={tdStyle}>{formatCurrency(l.sundayCasual)}/hr</td><td style={tdStyle}>{formatCurrency(l.publicHolidayCasual)}/hr</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          For the full breakdown of how these multipliers are calculated, see the <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>Hospitality Award penalty rates guide</a>
        </p>
      </section>

      {/* Minimum engagement */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Minimum engagement &mdash; 3 hours per shift</h2>
        <p style={pStyle}>
          Every casual shift must be paid for a minimum of 3 hours, even if you&apos;re sent home early. If you&apos;re regularly paid for less than 3 hours on short shifts, you&apos;re owed the difference.
        </p>
      </section>

      {/* Common casual underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common casual underpayments</h2>

          <h3 style={h3Style}>Penalty rates not applied on top of loading</h3>
          <p style={pStyle}>
            The penalty applies to the casual base rate. A casual Sunday is not {formatCurrency(l1?.casualRate ?? 0)}/hr &mdash; it&apos;s {formatCurrency(l1?.sundayCasual ?? 0)}/hr at Level 1. Many employers pay the same rate daily.
          </p>
          <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />

          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={pStyle}>
            Casual workers are entitled to correct classification exactly like permanent staff. Level 1 pay for Level 2 duties means every hour &mdash; including every Sunday &mdash; is underpaid.
          </p>

          <h3 style={h3Style}>Minimum engagement not honoured</h3>
          <p style={pStyle}>
            Sent home after 2 hours? You&apos;re still owed 3 hours. This is frequently missed on short event or function shifts.
          </p>

          <h3 style={h3Style}>No superannuation paid</h3>
          <p style={pStyle}>
            Since November 2022, all casual employees are entitled to super regardless of earnings. If super isn&apos;t appearing on your payslip, it may not be being paid. See the superannuation for casual workers guide for more details.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Casual conversion */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Casual conversion &mdash; your right after 12 months</h2>
        <p style={pStyle}>
          After 12 months of regular and systematic casual work, you have the right to request conversion to permanent part-time or full-time employment.
        </p>
        <p style={pStyle}>
          Ask yourself: are you being rostered on a consistent pattern, trusted with regular responsibilities, and expected to be available week to week? If yes, you may already qualify.
        </p>
        <p style={pStyle}>
          Your employer must respond in writing and, if declining, must provide genuine operational reasons. Vague refusals can be challenged at the Fair Work Commission.
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
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including your loading and every applicable penalty rate.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
