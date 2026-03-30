/**
 * Hospitality Award Overtime content — /awards/hospitality-award/overtime
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
  { question: 'My employer says my salary covers all hours \u2014 is that valid?', answer: 'Only if the salary exceeds all award obligations including overtime in every week you work. If you regularly work well beyond 38 hours, ask your employer to show you the calculation. If they can\u2019t, you may be owed the difference.' },
  { question: 'Can I claim back unpaid overtime from previous years?', answer: 'Yes \u2014 up to 6 years under the Fair Work Act. The Fair Work Ombudsman can investigate and recover this on your behalf.' },
  { question: 'Do supervisors and managers get overtime?', answer: 'Most do. The exemption only applies where a salary genuinely covers all overtime obligations. Most hospitality managers on fixed salaries are underpaid on this basis.' },
];

export default function HospitalityOvertimeContent({ rates }: { rates: HospitalityRateData }) {
  const level2 = getLevel(rates, 2);
  const level3 = getLevel(rates, 3);
  const l2Base = level2?.ftRate ?? 0;
  const l3Base = level3?.ftRate ?? 0;
  const l2Ot15 = Math.round(l2Base * 1.5 * 100) / 100;
  const l2Ot20 = Math.round(l2Base * 2.0 * 100) / 100;
  const l3Ot15 = Math.round(l3Base * 1.5 * 100) / 100;
  const l3Ot20 = Math.round(l3Base * 2.0 * 100) / 100;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 · Rates effective 1 July 2025 · MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you regularly work long hours in hospitality and your pay looks identical every week, there&apos;s a high chance overtime isn&apos;t being applied. Extra hours are common in the industry. Not being paid for them is just as common. This page explains when overtime applies and what you must receive.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work more than 38 hours a week or more than 10 hours in a single shift &mdash; overtime applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time cook, Level 3. Works 45 hours across one week &mdash; five 9-hour days.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l3Base)}/hr flat for all 45 hours</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> 38 hours at {formatCurrency(l3Base)}/hr; 7 hours at overtime rates ({formatCurrency(l3Ot15)}/hr then {formatCurrency(l3Ot20)}/hr)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$130 that week. ~$6,700/year if this happens weekly.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer treats any extra hours as &quot;part of the job.&quot; The overtime calculation is never run.
          </p>
        </div>
      </section>

      {/* When does overtime apply? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When does overtime apply?</h2>
        <p style={pStyle}>
          Under the Hospitality Award, overtime is triggered by two thresholds:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Daily:</strong> After more than 10 hours worked in a single day</li>
          <li><strong>Weekly:</strong> After more than 38 ordinary hours in a week</li>
        </ul>
        <p style={pStyle}>
          Both thresholds exist independently. Exceed either one &mdash; overtime applies to the excess hours.
        </p>
        <p style={pStyle}>
          If your payslip never shows overtime despite regularly working past these thresholds, that&apos;s a red flag.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Overtime rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hospitality overtime rates 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Hours worked</th>
                <th style={thStyle}>Rate</th>
                <th style={thStyle}>Level 2 example</th>
                <th style={thStyle}>Level 3 example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Ordinary (up to threshold)</td><td style={tdStyle}>1&times;</td><td style={tdStyle}>{formatCurrency(l2Base)}/hr</td><td style={tdStyle}>{formatCurrency(l3Base)}/hr</td></tr>
              <tr><td style={tdStyle}>Overtime &mdash; first 3 hours</td><td style={tdStyle}>1.5&times;</td><td style={tdStyle}>{formatCurrency(l2Ot15)}/hr</td><td style={tdStyle}>{formatCurrency(l3Ot15)}/hr</td></tr>
              <tr><td style={tdStyle}>Overtime &mdash; after 3 hours</td><td style={tdStyle}>2&times;</td><td style={tdStyle}>{formatCurrency(l2Ot20)}/hr</td><td style={tdStyle}>{formatCurrency(l3Ot20)}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates for permanent employees. Based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
      </section>

      {/* TOIL */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Time off in lieu (TOIL)</h2>
        <p style={pStyle}>
          Under some conditions, TOIL can substitute for overtime pay &mdash; but only if:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Agreed in writing before the overtime is worked</li>
          <li>Taken at the overtime rate &mdash; 1 hour at time-and-a-half equals 1.5 hours TOIL, not 1 hour</li>
        </ul>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Hour-for-hour TOIL is underpayment.
        </p>
        <p style={pStyle}>
          If you&apos;ve been taking TOIL on a 1:1 basis, the difference is owed.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Casual overtime */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Does overtime apply to casual employees?</h2>
        <p style={pStyle}>
          Daily overtime does. A casual working more than 10 hours in a day is entitled to overtime on the excess hours.
        </p>
        <p style={pStyle}>
          Weekly overtime in the same way as permanent employees generally does not apply to casuals under this award. But the daily threshold applies regardless of employment type.
        </p>
        <p style={pStyle}>
          For more on casual entitlements, see the <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Hospitality Award casual employees guide</a>
        </p>
      </section>

      {/* Common overtime underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common overtime underpayments</h2>

          <h3 style={h3Style}>Long shifts with no overtime applied</h3>
          <p style={pStyle}>
            A 12-hour shift contains 2 hours of overtime under this award. Many employers pay a flat shift rate regardless of length.
          </p>
          <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />

          <h3 style={h3Style}>Salary that &quot;absorbs&quot; all hours</h3>
          <p style={pStyle}>
            A salary only covers overtime if it demonstrably exceeds total award obligations across every week worked. Most don&apos;t &mdash; especially during peak periods.
          </p>

          <h3 style={h3Style}>Part-time workers pushed beyond agreed hours</h3>
          <p style={pStyle}>
            Agreed hours for a part-time worker are ordinary hours. Work beyond them is overtime &mdash; even if the total week doesn&apos;t exceed 38.
          </p>

          <h3 style={h3Style}>TOIL taken hour-for-hour</h3>
          <p style={pStyle}>
            1 hour at time-and-a-half = 1.5 hours TOIL minimum. Anything less is underpayment.
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

      {/* Related pages */}
      <section style={sectionStyle}>
        <p style={smallStyle}>
          See also: <a href="/awards/hospitality-award/" style={linkStyle}>Full Hospitality Award guide</a> | <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>Penalty rates</a> | <a href="/awards/hospitality-award/pay-rates" style={linkStyle}>Pay rate tables</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every overtime threshold.
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
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
