/**
 * Hospitality Award Allowances content — /awards/hospitality-award/allowances
 * Rates: FWO pay guide MA000009 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getAllowance } from '@/lib/hospitality-rates';
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
  { question: 'Can my employer refuse to pay allowances if they\'re not in my contract?', answer: 'No. Allowances are set by the award, not your contract. If the conditions are met (e.g. you use your own tools, you work a split shift), the allowance is owed regardless of what your contract says.' },
  { question: 'What is the difference between all-purpose and non-all-purpose allowances?', answer: 'All-purpose allowances are included in your base rate for calculating overtime, penalty rates, and leave. Non-all-purpose allowances are flat amounts paid only when the specific condition applies \u2014 they don\'t affect other calculations.' },
  { question: 'Do casual employees get allowances?', answer: 'Yes. Most allowances apply to casuals. For example, first aid allowance is $2.56/day for casuals, and tool allowance for cooks is $2.03/day regardless of employment type.' },
  { question: 'Should allowances appear separately on my payslip?', answer: 'Yes. Employers must itemise allowances on payslips. If your allowances are bundled into a single hourly rate with no breakdown, you have no way of verifying they\'re actually being paid.' },
];

export default function HospitalityAllowancesContent({ rates }: { rates: HospitalityRateData }) {
  const splitShort = getAllowance(rates, 'split_shift_short');
  const splitLong = getAllowance(rates, 'split_shift_long');
  const firstAidFt = getAllowance(rates, 'first_aid_ft');
  const firstAidDaily = getAllowance(rates, 'first_aid_ptcasual');
  const toolDaily = getAllowance(rates, 'tool');
  const airportTravel = getAllowance(rates, 'airport_travel');
  const laundryFt = getAllowance(rates, 'laundry_ft');
  const laundryPtCasual = getAllowance(rates, 'laundry_ptcasual');
  const mealAllowance = getAllowance(rates, 'meal');
  const vehicleAllowance = getAllowance(rates, 'vehicle');
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Allowances are extra payments on top of your base rate for specific conditions, skills, or expenses. Under the Hospitality Award, they are one of the most commonly missed entitlements after penalty rates. Many workers don&apos;t know they exist &mdash; and many employers don&apos;t pay them unless asked.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work split shifts, use your own tools, hold a first aid certificate, or wear a uniform you launder yourself &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time cook, Level 3. Brings own knives to work every day. Works 5 days per week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> Base rate only &mdash; no tool allowance</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Tool allowance of {formatCurrency(toolDaily)}/day (capped at $9.94/week)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$9.94/week. ~$517/year &mdash; just from one missing allowance.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer never accounts for tool allowance. The cook assumes their hourly rate covers everything.
          </p>
        </div>
      </section>

      {/* All-purpose vs non-all-purpose */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>All-purpose vs non-all-purpose allowances</h2>
        <p style={pStyle}>
          This distinction matters more than most workers realise. It affects how much you&apos;re paid on overtime, weekends, and leave.
        </p>
        <h3 style={h3Style}>All-purpose allowances</h3>
        <p style={pStyle}>
          These are treated as part of your ordinary rate. That means they flow through to overtime, penalty rates, annual leave, and any other calculation based on your base rate. If an all-purpose allowance isn&apos;t included in those calculations, every affected hour is underpaid.
        </p>
        <h3 style={h3Style}>Non-all-purpose allowances</h3>
        <p style={pStyle}>
          These are flat payments for specific conditions &mdash; like a meal allowance when overtime is worked. They don&apos;t compound into other rates. They&apos;re paid when the condition applies and that&apos;s it.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Most allowances under the Hospitality Award are non-all-purpose &mdash; but it&apos;s still essential they&apos;re actually being paid.
        </p>
      </section>

      {/* Allowance tables */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hospitality Award allowances 2025 &mdash; full list</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Allowance</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Who it applies to</th>
                <th style={thStyle}>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Split/broken shift (2&ndash;3hr gap)</td><td style={tdStyle}>{formatCurrency(splitShort)}/day</td><td style={tdStyle}>FT/PT only</td><td style={tdStyle}>Non-all-purpose</td></tr>
              <tr><td style={tdStyle}>Split/broken shift (&gt;3hr gap)</td><td style={tdStyle}>{formatCurrency(splitLong)}/day</td><td style={tdStyle}>FT/PT only</td><td style={tdStyle}>Non-all-purpose</td></tr>
              <tr><td style={tdStyle}>First aid</td><td style={tdStyle}>{formatCurrency(firstAidFt)}/week (FT) · {formatCurrency(firstAidDaily)}/day (PT/casual)</td><td style={tdStyle}>All types</td><td style={tdStyle}>Non-all-purpose</td></tr>
              <tr><td style={tdStyle}>Tool allowance (cooks)</td><td style={tdStyle}>{formatCurrency(toolDaily)}/day (max $9.94/week)</td><td style={tdStyle}>All types</td><td style={tdStyle}>Non-all-purpose</td></tr>
              <tr><td style={tdStyle}>Airport travel</td><td style={tdStyle}>{formatCurrency(airportTravel)}/day</td><td style={tdStyle}>All types</td><td style={tdStyle}>Non-all-purpose</td></tr>
              <tr><td style={tdStyle}>Laundry (catering)</td><td style={tdStyle}>{formatCurrency(laundryFt)}/week (FT) · {formatCurrency(laundryPtCasual)}/uniform (PT/casual)</td><td style={tdStyle}>Catering employees</td><td style={tdStyle}>Non-all-purpose</td></tr>
              <tr><td style={tdStyle}>Meal allowance (overtime)</td><td style={tdStyle}>{formatCurrency(mealAllowance)}</td><td style={tdStyle}>FT/PT only</td><td style={tdStyle}>Non-all-purpose</td></tr>
              <tr><td style={tdStyle}>Vehicle (managerial hotel)</td><td style={tdStyle}>{formatCurrency(vehicleAllowance)}/km</td><td style={tdStyle}>Managerial hotel employees</td><td style={tdStyle}>Non-all-purpose</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If you meet the conditions for any of these allowances and they&apos;re not on your payslip, you&apos;re likely being underpaid.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Common allowance underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common allowance issues</h2>

          <h3 style={h3Style}>Split shift allowance not paid</h3>
          <p style={pStyle}>
            If your roster has a gap of 2 hours or more between two periods of work in the same day, you&apos;re entitled to the split shift allowance. Many employers treat split shifts as two separate shifts and skip the allowance entirely.
          </p>

          <h3 style={h3Style}>Tool allowance missing for cooks</h3>
          <p style={pStyle}>
            Cooks who supply and maintain their own knives and tools are entitled to {formatCurrency(toolDaily)} per day (up to $9.94/week). This is rarely paid unless the employee specifically asks.
          </p>

          <h3 style={h3Style}>First aid allowance not applied</h3>
          <p style={pStyle}>
            If you hold a current first aid certificate and your employer requires you to be the designated first aider, you&apos;re owed {formatCurrency(firstAidFt)}/week (full-time) or {formatCurrency(firstAidDaily)}/day (part-time/casual). Many employers pocket the benefit of having a qualified first aider without paying the allowance.
          </p>

          <h3 style={h3Style}>Meal allowance skipped on overtime</h3>
          <p style={pStyle}>
            If you&apos;re a permanent employee required to work overtime and a meal break falls during that overtime, you&apos;re entitled to {formatCurrency(mealAllowance)}. This is frequently missed on busy nights.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Related pages */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Related guides</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>Hospitality Award penalty rates guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/overtime" style={linkStyle}>Hospitality Award overtime guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Hospitality Award casual employees guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/pay-rates" style={linkStyle}>Full pay rates table &rarr;</a></li>
        </ul>
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
          Don&apos;t guess &mdash; missing allowances add up over time.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every allowance, penalty rate, and loading you&apos;re entitled to.
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
