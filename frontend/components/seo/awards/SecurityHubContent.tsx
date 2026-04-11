/**
 * Security Award hub page content — /awards/security-award/
 * Rates: FWO pay guide MA000016 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 700, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'What level am I under the Security Award?', answer: 'Level 1 covers entry-level security guards performing static guarding, gatehouse, or basic patrol duties. Level 2 covers guards with a Certificate II or equivalent experience performing monitoring, alarm response, or crowd control. Level 3 covers senior guards, dog handlers, or those with Certificate III. Level 4 covers supervisors and control room operators. Level 5 covers managers or specialists with advanced qualifications.' },
  { question: 'Do I get paid more for overnight shifts?', answer: 'Yes. The Security Award provides significant penalty rates for night work, with higher rates applying between midnight and 6am. If your hourly rate is the same at 2am as it is at 2pm, you are being underpaid.' },
  { question: 'I work 12-hour shifts \u2014 when does overtime start?', answer: 'Overtime applies after 7.6 hours in a day (for a 5-day worker) or after 38 hours in a week. On a 12-hour shift, you should be receiving at least 4.4 hours of overtime pay. If your payslip shows a flat rate for the full 12 hours, overtime is not being paid.' },
  { question: 'Does casual loading replace night penalties?', answer: 'No. The 25% casual loading compensates for lack of leave. Night shift loadings and penalty rates are separate entitlements. Both apply. A casual working a Saturday overnight shift should receive the casual rate plus the Saturday penalty plus the night loading.' },
  { question: 'My employer pays me a flat $30/hr for all shifts. Is that enough?', answer: 'It depends on when you work. A flat $30/hr may cover weekday day shifts, but it almost certainly falls short on nights, weekends, and public holidays where penalties can push the minimum rate well above $40\u2013$50/hr. If your rate never changes regardless of when you work, you need to check.' },
  { question: 'I do crowd control at events \u2014 which award covers me?', answer: 'If you are employed by a security company to perform crowd control, the Security Services Industry Award (MA000016) applies. Crowd controllers typically fall under Level 2 or 3 depending on their qualifications and experience.' },
  { question: 'How far back can I claim underpayment?', answer: 'Six years. Under the Fair Work Act, you can recover underpayments going back up to 6 years. Security workers on flat rates who regularly work nights and weekends often have very large accumulated underpayments.' },
  { question: 'Do I get a uniform or laundry allowance?', answer: 'Yes. If your employer requires you to wear a uniform that you must maintain, you are entitled to a laundry allowance. If you are required to purchase any part of your uniform, you must be reimbursed. Check your payslip for these line items.' },
];

export default function SecurityHubContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;
  const l5 = rates ? getLevel(rates, 5) : undefined;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000016
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Overnight security shifts should attract significant loadings. If your pay is flat regardless of the hour, keep reading. The Security Services Industry Award has some of the most generous night and weekend penalties of any award &mdash; and they are routinely ignored, especially by subcontractors and labour hire firms.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you work as a security guard, patrol officer, crowd controller, or alarm monitor &mdash; this award applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2. Works a 10pm&ndash;6am overnight shift on Saturday nights. Employer pays a flat $32/hr.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What should have happened:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Saturday night casual rate (Level 2): significantly higher than $32/hr</li>
            <li>Hours between midnight and 6am attract additional night loading on top</li>
            <li>Hours beyond 7.6 attract overtime rates</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--secondary)' }}>
            Estimated underpayment: $80&ndash;$120 per overnight shift. Over 48 weeks: $3,840&ndash;$5,760 per year.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Security companies often quote a flat hourly rate that looks reasonable on paper but falls far short when night loadings, weekend penalties, and overtime thresholds are properly calculated.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who the Security Award covers</h2>
        <p style={pStyle}>
          The Security Services Industry Award 2020 (MA000016) covers employees in the private security industry.
        </p>
        <h3 style={h3Style}>&#10003; Covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Static security guards</li>
          <li>Mobile patrol officers</li>
          <li>Crowd controllers and bouncers</li>
          <li>Alarm monitoring and response</li>
          <li>CCTV operators</li>
          <li>Cash-in-transit officers</li>
          <li>Event security</li>
        </ul>
        <h3 style={h3Style}>&#10007; Not typically covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>In-house security at hotels &rarr; may be <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award</a></li>
          <li>Government security officers &rarr; separate enterprise agreements</li>
        </ul>
      </section>

      {/* Classification levels */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Security Award classification levels</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Typical roles</th>
                <th style={thStyle}>Approx. base rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { level: 1, roles: 'Entry-level guard, static guarding, gatehouse', rate: l1 ? formatCurrency(l1.ftRate) : '&mdash;' },
                { level: 2, roles: 'Cert II, alarm response, crowd control, patrol', rate: l2 ? formatCurrency(l2.ftRate) : '&mdash;' },
                { level: 3, roles: 'Cert III, dog handler, senior guard', rate: l3 ? formatCurrency(l3.ftRate) : '&mdash;' },
                { level: 4, roles: 'Control room operator, supervisor', rate: l4 ? formatCurrency(l4.ftRate) : '&mdash;' },
                { level: 5, roles: 'Manager, advanced specialist', rate: l5 ? formatCurrency(l5.ftRate) : '&mdash;' },
              ].map((row) => (
                <tr key={row.level}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--secondary)' }}>Level {row.level}</td>
                  <td style={tdStyle}>{row.roles}</td>
                  <td style={tdStyle}>{row.rate}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates approximate, based on the Fair Work Commission pay guide for MA000016, effective 1 July 2025.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Security Award?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Night shift loading:</strong> Significant loading for hours worked between 10pm and 6am</li>
          <li><strong>Saturday rates:</strong> Penalty rate for all Saturday work</li>
          <li><strong>Sunday rates:</strong> Higher penalty rate &mdash; commonly missed</li>
          <li><strong>Public holiday rates:</strong> Double time and a half for casuals</li>
          <li><strong>Overtime:</strong> After 7.6 hours/day or 38 hours/week</li>
          <li><strong>Casual loading:</strong> 25% &mdash; does not replace penalty rates or night loadings</li>
          <li><strong>Uniform/laundry allowance:</strong> When required to wear and maintain a uniform</li>
          <li><strong>First aid allowance:</strong> When required to hold and use first aid qualifications</li>
          <li><strong>Minimum engagement:</strong> 4 hours per shift for casuals</li>
        </ul>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Red flags your pay may be wrong</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Same rate at 2am as 2pm',
              'No separate night loading on payslip',
              'Flat rate regardless of weekend or weekday',
              'No overtime despite 12-hour shifts',
              'No uniform or laundry allowance',
              'Told you are a "contractor" but you work set shifts',
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>&bull; {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments under the Security Award</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Flat rate for overnight shifts', desc: 'Night loadings are substantial under the Security Award. A flat rate that doesn\u2019t change between day and night shifts is almost always an underpayment.' },
              { title: 'No overtime on long shifts', desc: '12-hour security shifts are common. Overtime kicks in after 7.6 hours. That means almost every long shift should include overtime pay.' },
              { title: 'Weekend penalties not applied', desc: 'Saturday and Sunday attract separate penalty rates. If your rate is the same every day, weekends are not being calculated correctly.' },
              { title: 'Sham contracting', desc: 'Some security companies classify guards as contractors to avoid award obligations. If you work set shifts, wear their uniform, and use their systems, you are likely an employee.' },
              { title: 'No first aid or uniform allowance', desc: 'If you hold a first aid certificate or are required to maintain a uniform, specific allowances apply. These are frequently unpaid.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 700, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000016" awardName="Security Award" />

      {/* Pay rates by role */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay rates by role</h2>
        <p style={pStyle}>See pay rates specific to your job:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/security-award/security-guard-pay-rates', label: 'Security guard pay rates' },
            { href: '/awards/security-award/crowd-controller-pay-rates', label: 'Crowd controller pay rates' },
            { href: '/awards/security-award/patrol-officer-pay-rates', label: 'Patrol officer pay rates' },
            { href: '/awards/security-award/control-room-pay-rates', label: 'Control room operator pay rates' },
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
          <li><a href="/awards/security-award/am-i-being-underpaid" style={linkStyle}>Am I being underpaid?</a> &mdash; the signs and what to do</li>
          <li><a href="/awards/security-award/flat-rate-security" style={linkStyle}>Flat rate &mdash; is it legal?</a> &mdash; the night shift test</li>
          <li><a href="/awards/security-award/not-getting-overtime" style={linkStyle}>Not getting overtime?</a> &mdash; the 7.6-hour trigger</li>
          <li><a href="/awards/security-award/no-night-loading" style={linkStyle}>No night loading?</a> &mdash; your entitlements after 10pm</li>
        </ul>
      </section>

      {/* Common scenarios */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common scenarios</h2>
        <p style={pStyle}>Answers to specific situations security workers ask about:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
          {[
            { href: '/awards/security-award/scenarios/overnight-flat-rate', label: 'Flat rate for overnight shifts' },
            { href: '/awards/security-award/scenarios/12-hour-no-overtime', label: '12-hour shifts with no overtime' },
            { href: '/awards/security-award/scenarios/weekend-same-rate', label: 'Weekend rate same as weekday' },
            { href: '/awards/security-award/scenarios/public-holiday-security', label: 'Worked a public holiday' },
            { href: '/awards/security-award/scenarios/contractor-or-employee', label: 'Am I really a contractor?' },
            { href: '/awards/security-award/scenarios/no-uniform-allowance', label: 'No uniform allowance paid' },
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
          Enter your shifts and see exactly what you should have been paid &mdash; including overtime, penalty rates, and night loadings. It takes 2 minutes.
        </p>
        <a
          href="/check-my-pay?award=MA000016"
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: '#263238',
            fontWeight: 700,
            fontSize: '16px',
            padding: '14px 36px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Check my pay now
        </a>
        <p style={{ ...smallStyle, marginTop: '12px' }}>
          Based on official pay rates from the Fair Work Commission (MA000016).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the Security Services Industry Award 2020 (MA000016), effective 1 July 2025. General information only &mdash; not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
