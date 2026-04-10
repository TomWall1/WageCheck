/**
 * High-intent: Are My Fast Food Junior Rates Correct?
 * URL: /awards/fast-food-award/junior-rates-fast-food
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'When does my rate go up after my birthday?', answer: 'Immediately. Your new rate applies from the first shift on or after your birthday. If your employer waits until the next pay cycle, roster period, or \"review\" to update your rate, every shift in between is underpaid.' },
  { question: 'Do I get penalty rates on top of junior rates?', answer: 'Yes. Penalty rates for Sundays, public holidays, and late-night shifts apply on top of your junior rate. A 17-year-old casual working Sunday gets 175% of their junior base rate, not 175% of the adult rate — but they must get that penalty.' },
  { question: 'I turned 21 mid-shift — what rate do I get?', answer: 'You get the full adult rate from the start of that shift. In practice, the rate change applies from the first shift on or after your 21st birthday.' },
  { question: 'Can my employer keep me on junior rates if I\'m doing the same work as adults?', answer: 'Yes, junior rates are based purely on age under the Fast Food Award. However, you must still be classified correctly by grade. If you are performing Grade 2 duties, you should be on the Grade 2 junior rate, not Grade 1.' },
];

// Junior percentage multipliers by age
const juniorPcts = [
  { age: 'Under 16', pct: 0.368 },
  { age: '16 years', pct: 0.473 },
  { age: '17 years', pct: 0.578 },
  { age: '18 years', pct: 0.683 },
  { age: '19 years', pct: 0.825 },
  { age: '20 years', pct: 0.977 },
];

export default function FFIntentJuniorRates({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;

  const g1Ft = g1 ? formatCurrency(g1.ftRate) : '&mdash;';
  const g1Casual = g1 ? formatCurrency(g1.casualRate) : '&mdash;';
  const g2Ft = g2 ? formatCurrency(g2.ftRate) : '&mdash;';

  // Build junior rate rows dynamically
  const juniorRows = juniorPcts.map(j => ({
    age: j.age,
    pct: `${(j.pct * 100).toFixed(1)}%`,
    base: g1 ? formatCurrency(Math.round(g1.ftRate * j.pct * 100) / 100) : formatCurrency(Math.round(24.73 * j.pct * 100) / 100),
    casual: g1 ? formatCurrency(Math.round(g1.casualRate * j.pct * 100) / 100) : formatCurrency(Math.round(30.91 * j.pct * 100) / 100),
  }));

  // 17-year-old example values
  const j17Base = g1 ? Math.round(g1.ftRate * 0.578 * 100) / 100 : 14.29;
  const j17SundayCasual = Math.round(j17Base * 1.75 * 100) / 100;
  const j17Casual = Math.round(j17Base * 1.25 * 100) / 100;
  const j17ShortfallHr = Math.round((j17SundayCasual - j17Casual) * 100) / 100;
  const j17Shortfall5hr = Math.round(j17ShortfallHr * 5 * 100) / 100;

  // 20-year-old base
  const j20Base = g1 ? Math.round(g1.ftRate * 0.977 * 100) / 100 : 24.16;

  // 17→18 jump
  const j17BaseVal = g1 ? Math.round(g1.ftRate * 0.578 * 100) / 100 : 14.29;
  const j18BaseVal = g1 ? Math.round(g1.ftRate * 0.683 * 100) / 100 : 16.89;
  const jump17to18 = Math.round((j18BaseVal - j17BaseVal) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re under 21 and working in fast food, you&apos;re on a junior rate. That&apos;s legal. But there are specific percentages for each age, and your rate must increase on your birthday &mdash; not when your employer gets around to it. Many young fast food workers are paid less than their correct junior rate, and most don&apos;t know it.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Your age determines your base rate. But penalty rates still apply on top. If you&apos;re not getting both right, you&apos;re being underpaid.
        </p>
      </section>

      {/* Junior rate table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food junior rates by age (Grade 1)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--secondary)' }}>Age</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>% of adult</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>Base rate</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>Casual rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...juniorRows,
                { age: '21+ (adult)', pct: '100%', base: g1Ft, casual: g1Casual },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: row.age === '21+ (adult)' ? 'var(--primary-light)' : undefined }}>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)', fontWeight: row.age === '21+ (adult)' ? 600 : 400 }}>{row.age}</td>
                  <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)' }}>{row.pct}</td>
                  <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)' }}>{row.base}</td>
                  <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)' }}>{row.casual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates shown are Grade 1. Grade 2 junior rates are calculated using the same percentages applied to the Grade 2 adult base of {g2Ft}/hr.
        </p>
      </section>

      {/* Common error: birthday rate update */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Your rate must change on your birthday</h2>
          <p style={pStyle}>
            This is the most common error with junior rates. Your employer must increase your rate from the first shift on or after your birthday. There is no grace period, no &quot;next review cycle,&quot; no waiting for the manager to update the system.
          </p>
          <p style={pStyle}>
            If you turned 18 three weeks ago and you&apos;re still being paid the 17-year-old rate, every shift since your birthday has been underpaid. The jump from 17 to 18 alone is a {formatCurrency(jump17to18)}/hr increase on the base rate.
          </p>
        </div>
      </section>

      {/* Penalty rates still apply */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Penalty rates apply on top of junior rates</h2>
        <p style={pStyle}>
          Some employers believe juniors don&apos;t get penalty rates. This is wrong. A 17-year-old casual working Sunday gets 175% of their junior base rate. Here&apos;s what that looks like:
        </p>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Example: 17-year-old casual, Grade 1, working Sunday</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Junior base rate (57.8% of {g1Ft}): <strong>{formatCurrency(j17Base)}/hr</strong>
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Sunday casual rate (175%): <strong>{formatCurrency(j17SundayCasual)}/hr</strong>
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            If paid flat casual rate instead: {formatCurrency(j17Casual)}/hr
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Shortfall: {formatCurrency(j17ShortfallHr)} per hour. On a 5-hour shift, that&apos;s {formatCurrency(j17Shortfall5hr)} missing.
          </p>
        </div>
      </section>

      {/* What happens at 21 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What happens when you turn 21</h2>
        <p style={pStyle}>
          At 21, junior rates end. You must be paid the full adult rate &mdash; {g1Ft}/hr base or {g1Casual}/hr casual for Grade 1. This is not a gradual transition. It applies immediately from your birthday.
        </p>
        <p style={pStyle}>
          The jump from 20 to 21 is small ({formatCurrency(j20Base)} to {g1Ft} base) because the 20-year-old rate is already 97.7% of adult. But if your employer has been underpaying your junior rate for years, the gap at 21 can be much larger than expected.
        </p>
      </section>

      {/* Check your rate */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Not sure if your junior rate is right?</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Find your age on the table above and check it against your payslip.</li>
          <li style={{ marginBottom: '8px' }}>Check whether Sunday and public holiday shifts show a higher rate.</li>
          <li style={{ marginBottom: '8px' }}>If your birthday was recent, verify the rate changed from your first shift after it.</li>
          <li style={{ marginBottom: '8px' }}>Use our calculator for the exact figure. <a href="/check-my-pay?award=MA000003" style={linkStyle}>Check your pay &rarr;</a></li>
        </ol>
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

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Being young doesn&apos;t mean you don&apos;t have rights. Your rate is set by law &mdash; check it.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000003).
        </p>
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
