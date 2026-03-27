/**
 * Hospitality Award hub page content — /awards/hospitality-award/
 * Content from: content/Hospitality Award Pay Rates 2025.docx
 * Rates: FWO pay guide MA000009 effective 1 July 2025 (casual rates shown)
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif',
  fontSize: '1.15rem',
  fontWeight: 500,
  color: 'var(--secondary)',
  marginBottom: '10px',
  marginTop: '0',
};

const h3Style: React.CSSProperties = {
  fontSize: '14.5px',
  fontWeight: 600,
  color: 'var(--secondary)',
  marginBottom: '6px',
  marginTop: '0',
};

const pStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.7,
  marginBottom: '1rem',
};

const smallStyle: React.CSSProperties = {
  fontSize: '12.5px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.6,
};

const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)',
  border: '1.5px solid var(--accent)',
  borderRadius: '10px',
  padding: '16px 20px',
  marginBottom: '1.5rem',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2.5rem',
};

export default function HospitalityHubContent({ rates }: { rates: HospitalityRateData }) {
  const levelRoles: Record<number, string> = {
    1: 'Kitchen hand, food & beverage attendant',
    2: 'Bar attendant, waitstaff, guest service',
    3: 'Experienced F&B, Cook Grade 2, front desk',
    4: 'Cook Grade 3, front office supervisor',
    5: 'Senior supervisor, Cook Grade 4–5',
  };
  const l2 = getLevel(rates, 2);
  return (
    <>
      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in hospitality, there's a high chance you've been underpaid — especially on weekends or public holidays. The Hospitality Award sets strict rules for pay rates, overtime, and penalties. If your employer isn't following them exactly, even small mistakes can cost you thousands per year. This page shows what you should be paid — and the calculator below tells you if you've been underpaid based on your actual shifts.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you work in a pub, bar, hotel, or accommodation venue — this likely applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={{
          background: '#f8f9fa',
          border: '1.5px solid var(--border)',
          borderRadius: '10px',
          padding: '20px',
        }}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> You work 5 shifts in a week — 3 weekdays, one Sunday, one public holiday. What you were paid: $25/hour flat across every shift.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What should have happened:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Weekday shifts: $25/hr &#10003; (within range for Level 2)</li>
            <li>Sunday shift: ~{formatCurrency(l2?.sundayCasual ?? 0)}/hr (casual Sunday rate at Level 2)</li>
            <li>Public holiday shift: ~{formatCurrency(l2?.publicHolidayCasual ?? 0)}/hr (casual public holiday rate at Level 2)</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Estimated underpayment: $75–$185 in that week alone.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Many employers pay a flat rate and never break out the penalty rates. Most employees never check — and most never realise.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hospitality Award Pay Rates Australia (MA000009)</h2>
        <p style={pStyle}>
          The Hospitality Industry (General) Award 2020 (MA000009) covers employees working in hotels, motels, resorts, caravan parks, pubs, bars, cafes, clubs, function centres, and accommodation venues across Australia. Common roles include waitstaff, kitchen hands, cooks, bartenders, hotel receptionists, housekeepers, front office staff, and gaming attendants.
        </p>
        <p style={pStyle}>
          If your employer operates a standalone restaurant or cafe that isn't part of a hotel or accommodation business, you may be covered by the <a href="/awards/restaurant-award" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Restaurant Industry Award (MA000119)</a> instead. Not sure? The <a href="https://www.fairwork.gov.au/awards-and-agreements/awards/find-my-award" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Fair Work Award Finder</a> can confirm it.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Hospitality Award?</h2>
        <p style={pStyle}>
          These are the rules that determine what you should actually be paid. Most underpayments happen when one or more of these is applied incorrectly — and if your payslip doesn't clearly show each of these separately, that's often a red flag.
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Casual loading:</strong> 25% on top of the base rate, applied to every hour worked — this does not replace penalty rates, both apply</li>
          <li><strong>Saturday rates:</strong> A penalty rate applies for all employees working Saturday</li>
          <li><strong>Sunday rates:</strong> A higher penalty rate — one of the most commonly underpaid entitlements in hospitality</li>
          <li><strong>Public holiday rates:</strong> Double time or double time and a half depending on your employment type</li>
          <li><strong>Overtime:</strong> Triggered after 38 ordinary hours per week, or more than 10 hours in a single day</li>
          <li><strong>Split shift allowance:</strong> Applies when your shift is broken into two or more separate periods with an unpaid gap</li>
          <li><strong>Meal allowance:</strong> Applies when you work extended hours without a meal break provided by your employer</li>
        </ul>
        <p style={smallStyle}>
          If you're unsure how weekend rates should apply to your shifts, see the full <a href="/awards/hospitality-award/penalty-rates" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Hospitality Award penalty rates guide</a> — or skip the reading and check your pay directly below. For overtime thresholds and worked examples, see the <a href="/awards/hospitality-award/overtime" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Hospitality Award overtime guide</a>.
        </p>
      </section>

      {/* Common underpayment patterns */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common ways people get underpaid under the Hospitality Award</h2>
          <p style={{ ...smallStyle, marginBottom: '12px' }}>These are the exact patterns we see when people have been underpaid:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Flat hourly rate paid regardless of day', desc: 'A flat rate that doesn\'t change on weekends or public holidays almost always means penalty rates are being absorbed illegally. Unless the employer can prove the flat rate covers all entitlements in every scenario, it doesn\'t count.' },
              { title: 'No overtime paid despite regular 40+ hour weeks', desc: 'Overtime kicks in at 38 hours per week. Many employees work over this consistently and see nothing extra on their payslip.' },
              { title: 'Casual loading applied, but penalty rates ignored', desc: 'These are separate entitlements. Getting the 25% loading doesn\'t mean Sunday or public holiday rates don\'t also apply on top.' },
              { title: 'Misclassification at Level 2 instead of Level 3', desc: 'If you\'re supervising others, training new staff, or working independently without oversight, you may already be performing Level 3 duties. The pay difference is over $2/hr.' },
              { title: 'Unpaid trial shifts', desc: 'Any trial shift of more than about an hour must be paid. Unpaid trials are almost never legal, regardless of what an employer tells you.' },
              { title: 'No split shift or meal allowance paid', desc: 'If your shift is broken into separate blocks, or you work extended hours without a provided meal break, you are owed additional amounts on top of your hourly rate.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...pStyle, marginTop: '12px', marginBottom: '0' }}>
            Most people experiencing one of these issues are underpaid by hundreds — sometimes thousands — of dollars per year.
          </p>
        </div>
      </section>

      {/* CTA mid-page */}
      <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />

      {/* Pay rates table */}
      <section style={{ ...sectionStyle, marginTop: '2.5rem' }}>
        <h2 style={h2Style}>Hospitality Casual Pay Rates 2025 — Classification Levels</h2>
        <p style={pStyle}>
          Under the Hospitality Award, your pay rate depends on your classification level and the day you work. The table below shows the minimum casual rates for each level effective 1 July 2025.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Level</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Typical roles</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Ordinary</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Saturday</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Sunday</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Public Holiday</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 5).map(l => (
                <tr key={l.level} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Level {l.level}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)', fontSize: '12.5px' }}>{levelRoles[l.level] ?? ''}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.casualRate)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.saturdayCasual)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.sundayCasual)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.publicHolidayCasual)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates are casual rates based on the Fair Work Commission pay guide for MA000009 effective 1 July 2025. Actual rates may vary slightly by sub-classification.
        </p>
        <p style={pStyle}>
          Your employer is required to classify you based on your actual duties, not just your job title. Being classified one level too low is one of the easiest ways employers underpay staff — and the difference adds up to roughly $80/week or $4,000/year.
        </p>
        <p style={pStyle}>
          Ask yourself: are you being trusted to run shifts, solve problems, or train others? If yes, you may already be working above your current classification. Not sure of your level? See the <a href="/awards/hospitality-award/classifications" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>full Hospitality Award classifications guide</a>.
        </p>
      </section>

      {/* FAQ — with FAQPage schema */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            { q: 'Do I get a higher rate for working Sundays?', a: 'Yes — and Sunday shifts are one of the most commonly underpaid parts of the Hospitality Award. If you\'re getting roughly the same hourly rate on a Sunday as a weekday, there\'s a high chance you\'re being underpaid. Both permanent and casual employees are entitled to the Sunday penalty rate — no exceptions.' },
            { q: 'Does casual loading replace penalty rates?', a: 'No — and this is one of the most common misunderstandings in the industry. Casual loading (25%) compensates for not receiving paid leave. It does not replace penalty rates. A casual working a Sunday receives their base rate, plus the 25% loading, plus the Sunday penalty rate. If you\'re only getting the loading and not the Sunday rate, you\'re being underpaid.' },
            { q: 'When does overtime apply?', a: 'Overtime kicks in after 38 ordinary hours in a week, or after 10 hours in a single day. The first three hours attract time-and-a-half; double time applies after that. If you\'re regularly working more than 38 hours and not seeing overtime on your payslip, you\'re almost certainly owed money — and it compounds quickly across weeks.' },
            { q: 'Am I owed a split shift allowance?', a: 'In most cases, yes — and this is one of the most commonly missed entitlements in hospitality. If your working day is broken into two or more separate periods with an unpaid gap, the split shift allowance applies on top of your hourly rate. Most workers in this situation don\'t know they\'re entitled to it.' },
            { q: 'Can my employer pay me a flat rate instead of award rates?', a: 'Only if that flat rate is demonstrably higher than every scenario under the award across all shifts worked — including penalty rates and allowances. A flat rate that averages lower than award entitlements is not legal, and this is a common underpayment tactic.' },
            { q: 'My employer says casuals don\'t get penalty rates — is that right?', a: 'No — and this claim is wrong. If you\'ve been told this, there\'s a strong chance your pay is incorrect. Casual employees are entitled to penalty rates under the Hospitality Award. The loading and penalties are completely separate entitlements that both apply.' },
            { q: 'What if I think I\'ve been underpaid?', a: 'Check your pay using the tool below. If it shows a shortfall, raise it with your employer first. If that doesn\'t resolve it, contact the Fair Work Ombudsman on 13 13 94 — they have the power to recover unpaid wages on your behalf and have recovered hundreds of millions of dollars doing exactly that.' },
            { q: 'Does the award cover trial shifts?', a: 'Yes — and unpaid trial shifts are almost never legal. Any trial shift longer than a reasonable period must be paid. If you worked a trial shift without pay, you are likely owed money for that time regardless of what your employer told you.' },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h3 style={h3Style}>{item.q}</h3>
              <p style={{ ...pStyle, marginBottom: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Do I get a higher rate for working Sundays?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — both permanent and casual employees are entitled to the Sunday penalty rate under the Hospitality Award. If you\'re getting the same hourly rate on a Sunday as a weekday, you\'re likely being underpaid.' } },
              { '@type': 'Question', name: 'Does casual loading replace penalty rates?', acceptedAnswer: { '@type': 'Answer', text: 'No. Casual loading (25%) compensates for not receiving paid leave. Penalty rates are separate and apply on top. A casual working a Sunday receives base rate + 25% loading + Sunday penalty rate.' } },
              { '@type': 'Question', name: 'When does overtime apply under the Hospitality Award?', acceptedAnswer: { '@type': 'Answer', text: 'Overtime kicks in after 38 ordinary hours in a week, or after 10 hours in a single day. The first three hours attract time-and-a-half; double time applies after that.' } },
              { '@type': 'Question', name: 'Can my employer pay me a flat rate instead of award rates?', acceptedAnswer: { '@type': 'Answer', text: 'Only if that flat rate is demonstrably higher than every scenario under the award across all shifts worked — including penalty rates and allowances. A flat rate that averages lower is not legal.' } },
              { '@type': 'Question', name: 'Do casual employees get penalty rates?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Casual employees are entitled to penalty rates under the Hospitality Award. The casual loading and penalty rates are completely separate entitlements that both apply.' } },
              { '@type': 'Question', name: 'Does the Hospitality Award cover trial shifts?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Unpaid trial shifts are almost never legal. Any trial shift longer than a reasonable period must be paid.' } },
            ],
          }),
        }}
      />

      {/* Final CTA */}
      <section style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ ...h2Style, fontSize: '1.25rem', textAlign: 'center' }}>
          Don't guess — small underpayments add up fast.
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '500px', margin: '0 auto 16px' }}>
          Enter your shifts below and see exactly what you should have been paid — including overtime, penalty rates, and allowances. It takes 2 minutes — and you'll know for certain.
        </p>
        <a
          href="/check-my-pay?award=MA000009"
          style={{
            display: 'inline-block',
            background: 'var(--primary)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '15px',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Check my pay &rarr;
        </a>
        <p style={{ ...smallStyle, marginTop: '12px' }}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only — not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
