/**
 * Fast Food Award Overtime content — /awards/fast-food-award/overtime
 * Rates: FWO pay guide MA000003 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel, getLevelByStream } from '@/lib/award-rates';

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
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'My employer says my pay covers all hours — is that valid?', answer: 'Only if the pay exceeds all award obligations including overtime in every week you work. If you regularly work well beyond 38 hours, ask your employer to show you the calculation. If they cannot, you may be owed the difference.' },
  { question: 'Can I claim back unpaid overtime from previous years?', answer: 'Yes — up to 6 years under the Fair Work Act. The Fair Work Ombudsman can investigate and recover this on your behalf.' },
  { question: 'Does overtime apply to casual fast food workers?', answer: 'Yes. A casual working more than 10 hours in a single day is entitled to overtime on the excess hours. This daily threshold applies regardless of employment type.' },
  { question: 'What is the difference between overtime for first 2 hours and after?', answer: 'Under the Fast Food Award, the first 2 hours of overtime in a day are paid at time-and-a-half (1.5x). All overtime hours after that are paid at double time (2x). This is different from some other awards where the first 3 hours are at 1.5x.' },
];

export default function FastFoodOvertimeContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3r = rates ? getLevelByStream(rates, 3, 'responsible') : undefined;
  /* Pre-calculated overtime rates */
  const g2Base = l2?.ftRate ?? 25.60;
  const g2Ot15 = Math.round(g2Base * 1.5 * 100) / 100;
  const g2Ot20 = Math.round(g2Base * 2.0 * 100) / 100;
  const g1Base = l1?.ftRate ?? 24.73;
  const g1Ot15 = Math.round(g1Base * 1.5 * 100) / 100;
  const g1Ot20 = Math.round(g1Base * 2.0 * 100) / 100;
  const g3rBase = l3r?.ftRate ?? 26.68;
  const g3rOt15 = Math.round(g3rBase * 1.5 * 100) / 100;
  const g3rOt20 = Math.round(g3rBase * 2.0 * 100) / 100;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you regularly work long hours in fast food and your pay looks identical every week, there is a high chance overtime is not being applied. Extra hours are common in the industry. Not being paid for them is just as common. This page explains when overtime applies and what you must receive.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work more than 38 hours a week or more than 10 hours in a single shift &mdash; overtime applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example &mdash; crew member working a 45-hour week</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time crew member, Grade 2. Works 45 hours across one week &mdash; five 9-hour days.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> ${g2Base}/hr flat for all 45 hours = ${(g2Base * 45).toFixed(2)}</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong></p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>38 hours at ${g2Base}/hr = ${(g2Base * 38).toFixed(2)}</li>
            <li>First 2 overtime hours at ${g2Ot15}/hr (1.5&times;) = ${(g2Ot15 * 2).toFixed(2)}</li>
            <li>Remaining 5 overtime hours at ${g2Ot20}/hr (2&times;) = ${(g2Ot20 * 5).toFixed(2)}</li>
            <li>Correct total = ${(g2Base * 38 + g2Ot15 * 2 + g2Ot20 * 5).toFixed(2)}</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~${((g2Base * 38 + g2Ot15 * 2 + g2Ot20 * 5) - g2Base * 45).toFixed(2)} that week. ~${(((g2Base * 38 + g2Ot15 * 2 + g2Ot20 * 5) - g2Base * 45) * 52).toFixed(0)}/year if this happens weekly.
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
          Under the Fast Food Award, overtime is triggered by two thresholds:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Weekly:</strong> After more than 38 ordinary hours in a week for full-time employees</li>
          <li><strong>Daily:</strong> After more than 10 hours worked in a single day (applies to all employees including casuals)</li>
        </ul>
        <p style={pStyle}>
          Both thresholds exist independently. Exceed either one &mdash; overtime applies to the excess hours.
        </p>
        <p style={pStyle}>
          If your payslip never shows overtime despite regularly working past these thresholds, that is a red flag.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Overtime rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food overtime rates 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Hours worked</th>
                <th style={thStyle}>Rate</th>
                <th style={thStyle}>Grade 1</th>
                <th style={thStyle}>Grade 2</th>
                <th style={thStyle}>Grade 3 Resp.</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Ordinary (up to threshold)</td><td style={tdStyle}>1&times;</td><td style={tdStyle}>${g1Base}/hr</td><td style={tdStyle}>${g2Base}/hr</td><td style={tdStyle}>${g3rBase}/hr</td></tr>
              <tr><td style={tdStyle}>Overtime &mdash; first 2 hours</td><td style={tdStyle}>1.5&times;</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>${g1Ot15}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>${g2Ot15}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>${g3rOt15}/hr</td></tr>
              <tr><td style={tdStyle}>Overtime &mdash; after 2 hours</td><td style={tdStyle}>2&times;</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>${g1Ot20}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>${g2Ot20}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>${g3rOt20}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates for full-time/part-time employees. First 2 hours at 1.5&times;, then 2&times;. Based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
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
          If you have been taking TOIL on a 1:1 basis, the difference is owed.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Casual overtime */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Does overtime apply to casual employees?</h2>
        <p style={pStyle}>
          Yes &mdash; daily overtime applies. A casual working more than 10 hours in a day is entitled to overtime on the excess hours. The daily threshold applies regardless of employment type.
        </p>
        <p style={pStyle}>
          For more on casual entitlements, see the <a href="/awards/fast-food-award/casual-employees" style={linkStyle}>Fast Food Award casual employees guide</a>.
        </p>
      </section>

      {/* Part-time overtime */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Part-time workers and overtime</h2>
        <p style={pStyle}>
          If you are part-time, your agreed hours are your ordinary hours. Work beyond those agreed hours can trigger overtime &mdash; even if the total week does not exceed 38 hours.
        </p>
        <p style={pStyle}>
          If your employer regularly rosters you beyond your agreed hours without paying overtime, you are likely owed money.
        </p>
      </section>

      {/* Common overtime underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common overtime underpayments</h2>

          <h3 style={h3Style}>Long shifts with no overtime applied</h3>
          <p style={pStyle}>
            An 11-hour shift contains 1 hour of overtime under this award. Many employers pay a flat shift rate regardless of length.
          </p>
          <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />

          <h3 style={h3Style}>Pay that &quot;absorbs&quot; all hours</h3>
          <p style={pStyle}>
            A salary or flat rate only covers overtime if it demonstrably exceeds total award obligations across every week worked. Most do not &mdash; especially during peak periods.
          </p>

          <h3 style={h3Style}>Part-time workers pushed beyond agreed hours</h3>
          <p style={pStyle}>
            Agreed hours for a part-time worker are ordinary hours. Work beyond them is overtime &mdash; even if the total week does not exceed 38.
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
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
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
          See also: <a href="/awards/fast-food-award/" style={linkStyle}>Full Fast Food Award guide</a> | <a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Penalty rates</a> | <a href="/awards/fast-food-award/pay-rates" style={linkStyle}>Pay rate tables</a> | <a href="/awards/fast-food-award/casual-employees" style={linkStyle}>Casual employees</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Not sure if you are being paid correctly? Check now.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every overtime threshold.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you will know for certain if you have been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000003).
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fast Food Industry Award 2010 (MA000003), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
