/**
 * Minimum Wage Australia 2025–26 — /guides/minimum-wage-australia-2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
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
  { question: 'Is the minimum wage the same in every state?', answer: 'Yes — the National Minimum Wage applies across all states and territories for private sector employees.' },
  { question: 'Is super included in the minimum wage?', answer: 'No. Superannuation is paid in addition to wages. From July 2025, the rate is 12% on top of ordinary time earnings.' },
  { question: 'What if my employer says they can\'t afford the minimum wage?', answer: 'That is not a legal exemption. The minimum wage applies regardless of employer circumstances.' },
];

export default function GuideMinimumWage({ rates }: { rates?: HospitalityRateData }) {
  const l1Ft = rates ? formatCurrency(getLevel(rates, 1)?.ftRate ?? 0) : '$24.10';
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Effective 1 July 2025
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re checking whether your pay is legal, knowing the national minimum wage is a starting point &mdash; but it&apos;s probably not the number that applies to you. Most Australian workers are covered by a modern award, which sets a minimum that varies by classification level and shift type. This guide explains both &mdash; and which one actually matters for your pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re trying to check whether your pay is legal in Australia &mdash; start here, then check your specific award.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Retail worker assumes their $25/hr rate is fine because it&apos;s above minimum wage.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> The Retail Award Sunday casual rate is higher than $25/hr. The national minimum wage was not the relevant number.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Workers who check only against minimum wage miss award entitlements entirely.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Most workers know about the minimum wage. Far fewer know their award rate &mdash; which is what actually applies.
          </p>
        </div>
      </section>

      {/* What is the NMW */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is the national minimum wage?</h2>
        <p style={pStyle}>
          The National Minimum Wage is the absolute floor that any adult employee in Australia can be paid. From 1 July 2025:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>$24.95 per hour</strong></li>
          <li><strong>$948.10 per week</strong> (38 ordinary hours)</li>
        </ul>
        <p style={pStyle}>
          Set annually by the Fair Work Commission through the Annual Wage Review, effective 1 July each year.
        </p>
      </section>

      {/* Does it apply to me? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Does the national minimum wage apply to me?</h2>
        <p style={pStyle}>
          Probably not directly. The NMW applies only to employees not covered by a modern award or enterprise agreement. The vast majority of Australian workers are covered by an award.
        </p>
        <p style={pStyle}>
          If you&apos;re covered by an award, the award minimums apply to you &mdash; not just the NMW. And award rates vary significantly by classification, day, and time.
        </p>
        <p style={pStyle}>
          If your payslip doesn&apos;t show your award or classification, that&apos;s often a red flag.
        </p>
        <CheckPayCTA />
      </section>

      {/* Award minimums vs NMW table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Award minimums vs the national minimum wage</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Award</th>
                <th style={thStyle}>Entry level base rate</th>
                <th style={thStyle}>NMW comparison</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Hospitality Award (MA000009)</td><td style={tdStyle}>{l1Ft}/hr (Level 1)</td><td style={tdStyle}>Below NMW &mdash; NMW applies instead</td></tr>
              <tr><td style={tdStyle}>Retail Award (MA000004)</td><td style={tdStyle}>$24.10/hr (Level 1)</td><td style={tdStyle}>Below NMW &mdash; NMW applies instead</td></tr>
              <tr><td style={tdStyle}>Fast Food Award (MA000003)</td><td style={tdStyle}>$24.10/hr (Level 1)</td><td style={tdStyle}>Below NMW &mdash; NMW applies instead</td></tr>
              <tr><td style={tdStyle}>Clerks Award (MA000002)</td><td style={tdStyle}>$24.10/hr (Level 1)</td><td style={tdStyle}>Below NMW &mdash; NMW applies instead</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Note: The NMW acts as a floor even within awards. Where an award rate falls below the NMW, the NMW applies. Rates effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Even at minimum wage, penalty rates and allowances apply on top for evenings, weekends, and public holidays.
        </p>
      </section>

      {/* Annual Wage Review */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The Annual Wage Review</h2>
        <p style={pStyle}>
          Each year, the Fair Work Commission reviews and typically increases minimum wages. The new rates take effect from the first full pay period on or after 1 July.
        </p>
        <p style={pStyle}>
          Employers must update pay rates from 1 July. Paying the previous year&apos;s rate after this date is underpayment &mdash; even if the increase was small.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common minimum wage underpayments</h2>

          <h3 style={h3Style}>July rate increases not applied on time</h3>
          <p style={pStyle}>
            Employers who don&apos;t update their payroll system continue paying the old rate. Every week of delay is a week of underpayment.
          </p>

          <h3 style={h3Style}>Penalty rates calculated from a wrong base</h3>
          <p style={pStyle}>
            If your base rate is below the correct award minimum, every penalty rate calculated from it is also wrong.
          </p>

          <h3 style={h3Style}>Junior rates applied to workers aged 21+</h3>
          <p style={pStyle}>
            Junior rates cannot be applied once a worker turns 21. Many payroll systems don&apos;t update automatically on the worker&apos;s birthday.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer} {i === 1 && <> See <a href="/guides/superannuation-casual-workers" style={linkStyle}>superannuation for casual workers guide</a></>}</p>
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
          Don&apos;t guess &mdash; your award rate is what matters.
        </p>
        <p style={pStyle}>
          Enter your shifts and we&apos;ll calculate what you&apos;re owed under your specific award &mdash; not just the minimum wage.
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
