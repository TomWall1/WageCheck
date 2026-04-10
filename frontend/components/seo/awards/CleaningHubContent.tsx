/**
 * Cleaning Award hub page content — /awards/cleaning-award/
 * Rates: FWO pay guide MA000022 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'What level am I under the Cleaning Award?', answer: 'Level 1 covers general cleaning duties: vacuuming, mopping, emptying bins, surface wiping. Level 2 covers experienced cleaners who work with limited supervision or operate specialist equipment. Level 3 covers supervisors or employees with trade qualifications in cleaning. Your employer must classify you based on your actual duties.' },
  { question: 'I get paid cash \u2014 does the award still apply?', answer: 'Yes. The Cleaning Award applies regardless of how you are paid. Cash-in-hand payment does not remove your entitlements. If you are paid cash and your employer is not paying superannuation, tax, penalty rates, or leave, multiple laws are being broken simultaneously.' },
  { question: 'Does casual loading replace penalty rates for cleaners?', answer: 'No. The 25% casual loading compensates for not receiving paid leave. It does not replace weekend, public holiday, or early morning penalty rates. Both apply on top of each other.' },
  { question: 'I clean an office building at 5am \u2014 do I get extra pay?', answer: 'Yes. The Cleaning Award provides penalty rates for early morning work (before 6am on weekdays). If your shift starts before 6am and your hourly rate does not change, your employer is not applying the early morning loading.' },
  { question: 'How far back can I claim underpaid wages?', answer: 'Six years. Under the Fair Work Act, you can recover underpayments going back up to 6 years. For cleaning workers paid cash without proper records, the Fair Work Ombudsman can use your testimony and bank records to build a claim.' },
  { question: 'My employer says I am a contractor, not an employee. Is that true?', answer: 'Often not. Many cleaning businesses classify workers as contractors to avoid paying award rates, super, and leave. If you work set hours, use your employer\u2019s equipment, wear their uniform, and cannot delegate work to someone else, you are likely an employee regardless of what your contract says. The Fair Work Ombudsman can assess your situation.' },
];

export default function CleaningHubContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Cleaning workers &mdash; particularly those paid cash &mdash; are among the most underpaid in Australia. The Cleaning Services Award sets minimum rates, penalty rates, and allowances that apply regardless of how your employer pays you. If you&rsquo;re a cleaner getting a flat rate with no payslip, no super, and no penalty rates, multiple laws are being broken.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you clean offices, schools, hospitals, shopping centres, or residential buildings for a cleaning company &mdash; this award applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Cleaner paid $22/hr cash, no payslip. Works 5am&ndash;9am Monday to Friday and 6 hours on Saturday. No super, no penalty rates.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What should have happened (Level 1 casual):</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Weekday early morning rate (before 6am): higher than the standard casual rate</li>
            <li>Standard weekday casual rate: ~{l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr (base + 25% loading)</li>
            <li>Saturday casual rate: penalty rate on top of casual base</li>
            <li>Superannuation: 12% on top of gross pay</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Estimated underpayment: $300&ndash;$400 per week, or $15,000&ndash;$20,000 per year &mdash; before accounting for missing super.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Cash-in-hand cleaning is widespread. The worker often has limited English, limited knowledge of their rights, and fears losing the job. The employer counts on this.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who the Cleaning Award covers</h2>
        <p style={pStyle}>
          The Cleaning Services Award 2020 (MA000022) covers employees performing cleaning work in the contract cleaning industry.
        </p>
        <h3 style={h3Style}>&#10003; Covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Commercial cleaners (offices, shopping centres)</li>
          <li>School and hospital cleaners employed by cleaning companies</li>
          <li>Window cleaners</li>
          <li>Carpet cleaners</li>
          <li>Janitors employed by cleaning contractors</li>
        </ul>
        <h3 style={h3Style}>&#10007; Not typically covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Cleaners employed directly by a hotel &rarr; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award</a></li>
          <li>Cleaners employed directly by a school or hospital (not through a contractor) &rarr; may fall under a different award</li>
        </ul>
      </section>

      {/* Classification levels */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Cleaning Award classification levels</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Typical duties</th>
                <th style={thStyle}>Approx. base rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { level: 1, duties: 'General cleaning: vacuuming, mopping, wiping, bins', rate: l1 ? formatCurrency(l1.ftRate) : '&mdash;' },
                { level: 2, duties: 'Experienced cleaner, specialist equipment, limited supervision', rate: l2 ? formatCurrency(l2.ftRate) : '&mdash;' },
                { level: 3, duties: 'Supervisor, team leader, trade-qualified', rate: l3 ? formatCurrency(l3.ftRate) : '&mdash;' },
              ].map((row) => (
                <tr key={row.level}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--secondary)' }}>Level {row.level}</td>
                  <td style={tdStyle}>{row.duties}</td>
                  <td style={tdStyle}>{row.rate}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates approximate, based on the Fair Work Commission pay guide for MA000022, effective 1 July 2025.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Cleaning Award?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Casual loading:</strong> 25% on top of base rate &mdash; does not replace penalty rates</li>
          <li><strong>Saturday rates:</strong> Penalty rate for all Saturday work</li>
          <li><strong>Sunday rates:</strong> Higher penalty rate &mdash; commonly missed</li>
          <li><strong>Public holiday rates:</strong> Double time or double time and a half</li>
          <li><strong>Early morning/late night loadings:</strong> Additional loading for unsociable hours</li>
          <li><strong>Broken shift allowance:</strong> If your shift is split into two or more periods</li>
          <li><strong>Overtime:</strong> After 38 hours per week or after 7.6 hours in a day</li>
          <li><strong>Minimum engagement:</strong> Casuals must be paid for minimum hours per shift</li>
          <li><strong>Superannuation:</strong> 12% on top of gross pay &mdash; regardless of payment method</li>
        </ul>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments under the Cleaning Award</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Cash-in-hand with no payslips', desc: 'If you are paid cash with no payslip, your employer is already breaking the law. You are almost certainly not receiving correct penalty rates, super, or leave entitlements.' },
              { title: 'Flat rate regardless of hours or day', desc: 'Early morning, Saturday, Sunday, and public holiday work all attract higher rates. A flat rate that never changes is a red flag.' },
              { title: 'Sham contracting', desc: 'If your employer calls you a contractor but you work set hours, use their equipment, and cannot sub-contract the work, you are likely an employee entitled to full award rates.' },
              { title: 'No superannuation', desc: 'Super must be paid at 12% on top of your gross wages. Cash-in-hand employers almost never pay super, which costs you thousands per year in retirement savings.' },
              { title: 'No broken shift allowance', desc: 'If you clean one building in the morning and another in the evening with an unpaid gap, you are owed a broken shift allowance.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />

      {/* Pay rates by role */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay rates by role</h2>
        <p style={pStyle}>See pay rates specific to your job:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/cleaning-award/commercial-cleaner-pay-rates', label: 'Commercial cleaner pay rates' },
            { href: '/awards/cleaning-award/window-cleaner-pay-rates', label: 'Window cleaner pay rates' },
            { href: '/awards/cleaning-award/cleaning-supervisor-pay-rates', label: 'Cleaning supervisor pay rates' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: 'block', padding: '12px 16px', border: '1.5px solid var(--border)',
              borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
              color: 'var(--secondary)',
            }}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* Intent page links */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Think something&apos;s wrong with your pay?</h2>
        <p style={pStyle}>Start with the issue that sounds most like your situation:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/cleaning-award/am-i-being-underpaid" style={linkStyle}>Am I being underpaid?</a> &mdash; the signs and what to do</li>
          <li><a href="/awards/cleaning-award/cash-in-hand" style={linkStyle}>Paid cash in hand?</a> &mdash; your rights still apply</li>
          <li><a href="/awards/cleaning-award/no-penalty-rates" style={linkStyle}>No penalty rates paid?</a> &mdash; weekends and early mornings</li>
          <li><a href="/awards/cleaning-award/sham-contracting" style={linkStyle}>Called a contractor?</a> &mdash; you might actually be an employee</li>
        </ul>
      </section>

      {/* Common scenarios */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common scenarios</h2>
        <p style={pStyle}>Answers to specific situations cleaning workers ask about:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
          {[
            { href: '/awards/cleaning-award/scenarios/early-morning-no-loading', label: 'No loading for 5am starts' },
            { href: '/awards/cleaning-award/scenarios/cash-no-super', label: 'Paid cash with no super' },
            { href: '/awards/cleaning-award/scenarios/broken-shift-allowance', label: 'Split between two buildings' },
            { href: '/awards/cleaning-award/scenarios/below-award-cleaning', label: 'Rate is below the award minimum' },
            { href: '/awards/cleaning-award/scenarios/public-holiday-cleaning', label: 'Worked a public holiday' },
            { href: '/awards/cleaning-award/scenarios/contractor-or-employee', label: 'Am I really a contractor?' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: 'block', padding: '10px 14px', fontSize: '13.5px',
              color: 'var(--secondary)', textDecoration: 'underline', textDecorationColor: 'var(--border)',
            }}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ ...sectionStyle, marginTop: '2.5rem' }}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {faqData.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h3 style={h3Style}>{item.question}</h3>
              <p style={{ ...pStyle, marginBottom: 0 }}>{item.answer}</p>
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
            mainEntity: faqData.map(q => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          }),
        }}
      />

      {/* Final CTA */}
      <section style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ ...h2Style, fontSize: '1.25rem', textAlign: 'center' }}>
          Don&rsquo;t guess &mdash; small underpayments add up fast.
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '500px', margin: '0 auto 16px' }}>
          Enter your shifts and see exactly what you should have been paid &mdash; including overtime, penalty rates, and allowances. It takes 2 minutes.
        </p>
        <a
          href="/check-my-pay?award=MA000022"
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
          Based on official pay rates from the Fair Work Commission (MA000022).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the Cleaning Services Award 2020 (MA000022), effective 1 July 2025. General information only &mdash; not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
