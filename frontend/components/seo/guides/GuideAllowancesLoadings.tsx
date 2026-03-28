/**
 * Award Allowances & Loadings guide — /guides/allowances-and-loadings
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getAllowance } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Do casual workers get allowances?', answer: 'Some. The first aid allowance (per shift) and tool allowance apply to casuals. The split shift and meal allowances are for permanent and part-time employees only.' },
  { question: 'My employer says my rate covers allowances — is that valid?', answer: 'Only if they can demonstrate with actual calculations that the rate paid exceeds the award rate plus all applicable allowances across all shifts.' },
  { question: 'How far back can I claim unpaid allowances?', answer: '6 years under the Fair Work Act. Given that allowances recur on every qualifying shift, the total can be significant.' },
];

export default function GuideAllowancesLoadings({ rates }: { rates?: HospitalityRateData }) {
  const splitShort = rates ? formatCurrency(getAllowance(rates, 'split_shift_short')) : '$3.53';
  const splitLong = rates ? formatCurrency(getAllowance(rates, 'split_shift_long')) : '$5.34';
  const mealAllowance = rates ? formatCurrency(getAllowance(rates, 'meal')) : '$16.73';
  const firstAidFt = rates ? formatCurrency(getAllowance(rates, 'first_aid_ft')) : '$12.82';
  const firstAidDaily = rates ? formatCurrency(getAllowance(rates, 'first_aid_ptcasual')) : '$2.56';
  const toolDaily = rates ? formatCurrency(getAllowance(rates, 'tool')) : '$2.03';
  const laundryFt = rates ? formatCurrency(getAllowance(rates, 'laundry_ft')) : '$6.00';
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If no allowances appear on your payslip, there&apos;s a good chance you&apos;re owed money that&apos;s been silently missed. Allowances are additional payments built into modern awards for specific conditions, expenses, or responsibilities &mdash; and they&apos;re the most frequently overlooked entitlement in Australia after penalty rates. This guide explains the most common ones and when you&apos;re entitled to them.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work split shifts, use your own tools, hold a first aid certificate, or wash your own uniform &mdash; allowances likely apply to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Cook, full-time, 5 years at the same venue. Brings their own knife roll to every shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> Hourly rate only</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Tool allowance of {toolDaily}/day under the Hospitality Award</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment (allowances alone): {toolDaily} &times; 5 days &times; 50 weeks &times; 5 years = ~$2,537
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Neither party knew the allowance existed. It was never mentioned, never paid.
          </p>
        </div>
      </section>

      {/* What are allowances */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are allowances?</h2>
        <p style={pStyle}>
          Allowances are additional payments your employer must make when specific working conditions apply. They&apos;re not discretionary &mdash; they&apos;re built into your award and are legally required.
        </p>
        <p style={pStyle}>
          They appear separately from your hourly rate. If your payslip shows only an hourly rate with no allowance lines despite applicable conditions, that&apos;s often a red flag.
        </p>
        <CheckPayCTA />
      </section>

      {/* Common allowances table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common allowances &mdash; Hospitality Award (MA000009)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Allowance</th>
                <th style={thStyle}>Rate</th>
                <th style={thStyle}>When it applies</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Split shift (2&ndash;3hr break)</td><td style={tdStyle}>{splitShort}/day</td><td style={tdStyle}>Shift broken into 2 periods, 2&ndash;3hr gap (perm/PT only)</td></tr>
              <tr><td style={tdStyle}>Split shift (3hr+ break)</td><td style={tdStyle}>{splitLong}/day</td><td style={tdStyle}>Same, gap over 3 hours</td></tr>
              <tr><td style={tdStyle}>Meal allowance (overtime)</td><td style={tdStyle}>{mealAllowance}/meal</td><td style={tdStyle}>Unplanned overtime spanning a meal time (FT/PT only)</td></tr>
              <tr><td style={tdStyle}>First aid (FT)</td><td style={tdStyle}>{firstAidFt}/week</td><td style={tdStyle}>Holds certificate, appointed responsible first aider</td></tr>
              <tr><td style={tdStyle}>First aid (PT/casual)</td><td style={tdStyle}>{firstAidDaily}/day</td><td style={tdStyle}>Same condition, per shift</td></tr>
              <tr><td style={tdStyle}>Laundry (FT catering)</td><td style={tdStyle}>{laundryFt}/week</td><td style={tdStyle}>Required to launder own uniform</td></tr>
              <tr><td style={tdStyle}>Tool/equipment</td><td style={tdStyle}>{toolDaily}/day</td><td style={tdStyle}>Cook required to provide own knives/tools</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on Fair Work Commission pay guide for MA000009, effective 1 July 2025. For other awards, check the relevant pay guide.
        </p>
      </section>

      {/* What are loadings */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are loadings?</h2>
        <p style={pStyle}>
          Loadings are percentage additions to your base rate for particular shift types:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Casual loading</strong> &mdash; 25% on top of base rate for all casual employees &rarr; See <a href="/guides/casual-loading-explained" style={linkStyle}>casual loading guide</a></li>
          <li><strong>Evening loading</strong> &mdash; per-hour addition for work after a set time (7pm in hospitality)</li>
          <li><strong>Late night loading</strong> &mdash; higher per-hour addition for shifts past midnight</li>
          <li><strong>Annual leave loading</strong> &mdash; 17.5% addition on top of annual leave payments (under some awards)</li>
        </ul>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common allowance underpayments</h2>

          <h3 style={h3Style}>Split shift allowance never paid</h3>
          <p style={pStyle}>
            Working morning and evening service with a break between is structurally common in hospitality and restaurants. The allowance applies every single day &mdash; and is almost never paid without being specifically claimed.
          </p>
          <p style={pStyle}>
            If you work split shifts and see no allowance on your payslip, check your pay now.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>First aid allowance ignored</h3>
          <p style={pStyle}>
            If you&apos;re the qualified first aider on shift, the allowance applies to every qualifying shift. Many employers provide the certificate as a workplace requirement and never add the payment.
          </p>

          <h3 style={h3Style}>Tool allowance never applied to tradesperson cooks</h3>
          <p style={pStyle}>
            {toolDaily}/day &times; 5 days &times; 50 weeks = $507.50/year that most cooks never see.
          </p>

          <h3 style={h3Style}>Laundry allowance not paid to catering staff</h3>
          <p style={pStyle}>
            If you&apos;re washing your own uniform at home, you&apos;re owed the allowance. Most catering workers have never heard of it.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
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

      {/* Find your award */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Find your award</h2>
        <p style={pStyle}>
          These rules apply across all modern awards — but the specific rates, penalty multipliers, and allowances vary by industry. If you&apos;re ready to check your actual pay:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Hospitality</strong> (hotels, bars, caf&eacute;s, clubs) &rarr; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award pay rates</a></li>
          <li><strong>Fast food and takeaway</strong> &rarr; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay rates</a></li>
          <li><strong>Restaurants and caf&eacute;s</strong> &rarr; <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Award pay rates</a></li>
          <li><strong>Retail</strong> (shops, supermarkets) &rarr; <a href="/awards/retail-award" style={linkStyle}>Retail Award pay rates</a></li>
          <li><strong>Admin and clerical</strong> &rarr; <a href="/awards/clerks-award" style={linkStyle}>Clerks Award pay rates</a></li>
          <li><strong>Cleaning</strong> &rarr; <a href="/awards/cleaning-award" style={linkStyle}>Cleaning Award pay rates</a></li>
        </ul>
        <p style={pStyle}>
          Not sure which applies to you? <a href="/awards" style={linkStyle}>Browse all awards</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; allowances add up quietly.
        </p>
        <p style={pStyle}>
          Enter your shifts and we&apos;ll check what you&apos;re owed &mdash; including all applicable allowances.
        </p>
        <CheckPayCTA />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
