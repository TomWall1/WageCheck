/**
 * Retail Award hub page content — /awards/retail-award/
 * Rates: FWO pay guide MA000004 effective 1 July 2025
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
  { question: 'What level am I under the Retail Award?', answer: 'Your level depends on your actual duties, not your job title. Level 1 covers basic sales assistant work. Level 2 adds specialised product knowledge or operating complex equipment. Level 3 covers supervisory duties or trade-qualified work. Levels 4\u20138 cover departmental managers, visual merchandisers, and senior specialists. If you have been doing the same duties for years without a level review, ask your employer for a written classification assessment.' },
  { question: 'Does the Saturday rate differ from the weekday rate under the Retail Award?', answer: 'Yes \u2014 and this is one of the most commonly missed entitlements. Saturday attracts a penalty rate that is different from the weekday rate. If your payslip shows the same rate on a Saturday as a Tuesday, you are being underpaid.' },
  { question: 'My Sunday rate is the same as my Saturday rate \u2014 is that right?', answer: 'No. Sunday rates are significantly higher than Saturday rates under the Retail Award. Casual Sunday rates attract a 200% multiplier (double time). If your Sunday pay looks the same as Saturday, your employer is almost certainly not applying the correct penalty.' },
  { question: 'Does casual loading replace penalty rates?', answer: 'No. The 25% casual loading compensates for not receiving paid leave. It does not replace weekend or public holiday penalty rates. Both apply. If your employer says the casual rate covers everything, that is incorrect unless they can prove the total exceeds every award entitlement in every scenario.' },
  { question: 'I work at a petrol station \u2014 which award covers me?', answer: 'Most petrol station attendants are covered by the General Retail Industry Award (MA000004). If you also perform mechanical or automotive work, a different award may apply. For straightforward retail duties at a service station, the Retail Award is almost always correct.' },
  { question: 'How far back can I claim underpayment?', answer: 'Six years. Under the Fair Work Act, you can claim underpayments going back up to 6 years from the date you lodge a complaint. Even small weekly shortfalls \u2014 a few dollars per shift \u2014 compound into large amounts over time.' },
  { question: 'Do I get paid more for working after 6pm on weekdays?', answer: 'Yes. The Retail Award provides an evening loading for hours worked after 6pm on weekdays. This is separate from your base rate and must appear on your payslip. Many retail workers are not aware of this entitlement.' },
  { question: 'What is the minimum shift length for casuals?', answer: 'Casual retail employees must be paid for a minimum of 3 hours per engagement, even if sent home early. If you are regularly rostered for 2-hour shifts, your employer is breaching the award.' },
];

export default function RetailHubContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;
  const l5 = rates ? getLevel(rates, 5) : undefined;
  const l6 = rates ? getLevel(rates, 6) : undefined;
  const l7 = rates ? getLevel(rates, 7) : undefined;
  const l8 = rates ? getLevel(rates, 8) : undefined;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000004
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your Sunday rate is the same as your Saturday rate, something&rsquo;s wrong. The General Retail Industry Award has distinct Saturday and Sunday penalty rates, and Sunday casuals should be receiving double time. Most retail workers never check &mdash; and that&rsquo;s how underpayments go unnoticed for years.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you work in a shop, department store, supermarket, or petrol station &mdash; this award likely applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual sales assistant, Level 1. Works one Saturday (6 hrs) and one Sunday (5 hrs) per week. Employer pays a flat casual rate of {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr every day.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What should have happened:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Saturday casual Level 1: ~{l1 ? formatCurrency(l1.saturdayCasual) : '&mdash;'}/hr &times; 6 = ~{l1 ? formatCurrency(l1.saturdayCasual * 6) : '&mdash;'}</li>
            <li>Sunday casual Level 1: ~{l1 ? formatCurrency(l1.sundayCasual) : '&mdash;'}/hr (200%) &times; 5 = ~{l1 ? formatCurrency(l1.sundayCasual * 5) : '&mdash;'}</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What they were paid:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>{l1 ? formatCurrency(l1.casualRate) : '&mdash;'} &times; 11 hours = {l1 ? formatCurrency(l1.casualRate * 11) : '&mdash;'}</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--secondary)' }}>
            Underpayment per weekend: ~$110. Over a year: ~$5,280.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employers pay a flat &quot;casual rate&quot; and never apply the separate Saturday or Sunday multipliers. Most workers assume their casual rate covers everything.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who the Retail Award covers</h2>
        <p style={pStyle}>
          The General Retail Industry Award 2020 (MA000004) covers employees in retail businesses across Australia. This is one of the largest awards by headcount.
        </p>
        <h3 style={h3Style}>&#10003; Covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Shops, department stores, supermarkets</li>
          <li>Petrol stations and convenience stores</li>
          <li>Hardware stores</li>
          <li>Pharmacies (retail staff, not pharmacists)</li>
          <li>Video, music, and book retailers</li>
          <li>Garden centres and nurseries</li>
        </ul>
        <h3 style={h3Style}>&#10007; Not covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Fast food outlets &rarr; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award</a></li>
          <li>Restaurants and caf&eacute;s &rarr; <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Award</a></li>
          <li>Hotels, pubs &rarr; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award</a></li>
        </ul>
      </section>

      {/* Classification summary */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Retail Award classification levels</h2>
        <p style={pStyle}>
          Your pay rate depends on your classification level. Levels are based on your actual duties, not your job title.
        </p>
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
                { level: 1, roles: 'Sales assistant, cashier, shelf stacker', rate: l1 ? formatCurrency(l1.ftRate) : '&mdash;' },
                { level: 2, roles: 'Experienced sales, product specialist', rate: l2 ? formatCurrency(l2.ftRate) : '&mdash;' },
                { level: 3, roles: 'Supervisor, trade-qualified, senior sales', rate: l3 ? formatCurrency(l3.ftRate) : '&mdash;' },
                { level: 4, roles: 'Department manager, team leader', rate: l4 ? formatCurrency(l4.ftRate) : '&mdash;' },
                { level: 5, roles: 'Assistant/deputy store manager', rate: l5 ? formatCurrency(l5.ftRate) : '&mdash;' },
                { level: 6, roles: 'Store manager (small store)', rate: l6 ? formatCurrency(l6.ftRate) : '&mdash;' },
                { level: 7, roles: 'Visual merchandiser, buyer', rate: l7 ? formatCurrency(l7.ftRate) : '&mdash;' },
                { level: 8, roles: 'Senior specialist, complex operations', rate: l8 ? formatCurrency(l8.ftRate) : '&mdash;' },
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
          Rates approximate, based on the Fair Work Commission pay guide for MA000004, effective 1 July 2025.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Retail Award?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Saturday rates:</strong> Higher than weekday rates for all employees</li>
          <li><strong>Sunday rates:</strong> 200% for casuals (double time) &mdash; significantly higher than Saturday</li>
          <li><strong>Public holiday rates:</strong> 250% for casuals</li>
          <li><strong>Evening loading:</strong> Additional loading for hours worked after 6pm on weekdays</li>
          <li><strong>Casual loading:</strong> 25% &mdash; does not replace penalty rates</li>
          <li><strong>Minimum engagement:</strong> 3 hours per shift for casuals</li>
          <li><strong>Overtime:</strong> After 38 hours per week or after the daily maximum</li>
          <li><strong>Meal breaks:</strong> After 5 hours continuous work</li>
        </ul>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Red flags your pay may be wrong</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Sunday rate is the same as Saturday',
              'No evening loading for shifts after 6pm',
              'Flat rate regardless of what day you work',
              'Shifts under 3 hours as a casual',
              'No payslip breakdown showing penalty rates separately',
              'Same rate for years despite taking on more responsibilities',
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
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments under the Retail Award</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Flat casual rate every day', desc: 'Saturday and Sunday attract different penalty rates under the Retail Award. A flat casual rate that never changes is almost always an underpayment.' },
              { title: 'Sunday rate equal to Saturday rate', desc: 'Sunday casual rates are 200% (double time) while Saturday rates are lower. If they look the same on your payslip, the Sunday penalty is not being applied.' },
              { title: 'No evening loading', desc: 'Hours worked after 6pm on weekdays attract an additional loading. Many retail employers do not apply this.' },
              { title: 'Level never reviewed', desc: 'If you have gained experience, taken on supervisory duties, or specialised in a product area, your level should have increased. Many workers stay at Level 1 for years despite doing Level 2 or 3 work.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 700, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />

      {/* Pay rates by role */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay rates by role</h2>
        <p style={pStyle}>See pay rates specific to your job:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/retail-award/sales-assistant-pay-rates', label: 'Sales assistant pay rates' },
            { href: '/awards/retail-award/cashier-pay-rates', label: 'Cashier pay rates' },
            { href: '/awards/retail-award/supervisor-pay-rates', label: 'Supervisor pay rates' },
            { href: '/awards/retail-award/pharmacy-assistant-pay-rates', label: 'Pharmacy assistant pay rates' },
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
          <li><a href="/awards/retail-award/am-i-being-underpaid" style={linkStyle}>Am I being underpaid?</a> &mdash; the signs and what to do</li>
          <li><a href="/awards/retail-award/no-penalty-rates" style={linkStyle}>No penalty rates paid?</a> &mdash; weekends and public holidays</li>
          <li><a href="/awards/retail-award/flat-rate-retail" style={linkStyle}>Flat rate &mdash; is it legal?</a> &mdash; the pass/fail test</li>
          <li><a href="/awards/retail-award/pay-too-low" style={linkStyle}>Pay feels too low?</a> &mdash; diagnostic checklist</li>
        </ul>
      </section>

      {/* Common scenarios */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common scenarios</h2>
        <p style={pStyle}>Answers to specific situations retail workers ask about:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
          {[
            { href: '/awards/retail-award/scenarios/sunday-double-time', label: 'Sunday rate looks wrong' },
            { href: '/awards/retail-award/scenarios/evening-loading-missing', label: 'No loading after 6pm' },
            { href: '/awards/retail-award/scenarios/christmas-day-retail', label: 'Worked Christmas Day' },
            { href: '/awards/retail-award/scenarios/sent-home-early', label: 'Sent home before 3 hours' },
            { href: '/awards/retail-award/scenarios/casual-overtime', label: 'Casual overtime not paid' },
            { href: '/awards/retail-award/scenarios/level-too-low', label: 'Doing supervisor work at Level 1 pay' },
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
          Enter your shifts below and see exactly what you should have been paid &mdash; including overtime, penalty rates, and allowances. It takes 2 minutes &mdash; and you&rsquo;ll know for certain.
        </p>
        <a
          href="/check-my-pay?award=MA000004"
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
          Based on official pay rates from the Fair Work Commission (MA000004).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the General Retail Industry Award 2020 (MA000004), effective 1 July 2025. General information only &mdash; not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
