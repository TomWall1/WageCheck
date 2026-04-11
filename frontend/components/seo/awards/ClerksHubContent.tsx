/**
 * Clerks Award hub page content — /awards/clerks-award/
 * Rates: FWO pay guide MA000002 effective 1 July 2025
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
  { question: 'What level am I under the Clerks Award?', answer: 'Level 1 covers basic admin: filing, photocopying, basic data entry under direct supervision. Level 2 covers reception, more complex data entry, accounts receivable/payable under general supervision. Level 3 covers experienced admin workers, payroll processing, bookkeeping. Level 4 covers specialised or supervisory roles. Level 5 covers senior admin with significant autonomy. If you handle payroll, manage accounts, or supervise others, you should be at least Level 3.' },
  { question: 'I work in an office \u2014 am I definitely covered by the Clerks Award?', answer: 'Not necessarily. The Clerks Award covers clerical and administrative work across most industries, but some industries have their own award that covers office workers. For example, a receptionist at a law firm is likely covered by the Clerks Award, but a receptionist at a hotel is covered by the Hospitality Award. Your award depends on both your duties and your employer\u2019s industry.' },
  { question: 'Does the Clerks Award have overtime?', answer: 'Yes. Overtime applies after 38 ordinary hours per week or after 7.6 hours in a day. The first three hours attract time-and-a-half, then double time after that. Office workers are among the most likely to work unpaid overtime because they often stay late to finish tasks without realising they are entitled to be paid for it.' },
  { question: 'I do payroll but I am classified as Level 1. Is that right?', answer: 'Almost certainly not. Payroll processing involves specialised knowledge and responsibility. Under the Clerks Award, this should be classified at Level 3 minimum. The difference between Level 1 and Level 3 is approximately $1.53/hr \u2014 which is $3,000+ per year on a full-time basis.' },
  { question: 'Does casual loading replace overtime?', answer: 'No. Casual loading (25%) compensates for lack of leave. Overtime is a separate entitlement triggered by working beyond ordinary hours. If you are a casual working more than 38 hours per week, you are entitled to both the casual loading and overtime rates.' },
  { question: 'How far back can I claim underpayment?', answer: 'Six years. The Fair Work Ombudsman can recover underpayments going back up to 6 years. For office workers who have been misclassified for years, the total owed can be very significant.' },
  { question: 'My employer says I am on an annualised salary that covers everything. Is that legal?', answer: 'Only if the salary genuinely covers all entitlements in every scenario \u2014 including overtime, penalty rates, and allowances. Your employer must conduct an annual reconciliation to prove the salary covers what you would have earned under the award. If they cannot produce this, the annualised salary arrangement may not be compliant.' },
  { question: 'Do I get a higher rate for working Saturdays?', answer: 'Yes. The Clerks Award provides penalty rates for Saturday work. If your pay does not change on a Saturday, you are being underpaid. This is commonly missed for office workers who occasionally work weekends.' },
];

export default function ClerksHubContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;
  const l5 = rates ? getLevel(rates, 5) : undefined;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Office workers rarely check their award &mdash; and that&rsquo;s exactly when misclassification happens. The Clerks &mdash; Private Sector Award covers receptionists, data entry operators, accounts staff, admin assistants, and payroll officers. If you&rsquo;ve been doing Level 3 work but getting paid at Level 1, the difference adds up to thousands per year.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you do clerical or administrative work in a private sector business &mdash; this award likely applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time receptionist doing data entry, accounts payable, and payroll. Classified as Level 1. Works 40 hours most weeks. No overtime paid.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What should have happened:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Classification: Level 3 minimum ({l3 ? formatCurrency(l3.ftRate) : '&mdash;'}/hr) based on duties</li>
            <li>Overtime: 2 hours/week at time-and-a-half = ~{l3 ? formatCurrency(l3.ftRate * 1.5 * 2) : '&mdash;'}/week</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What they were paid:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Level 1 rate ({l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr) &times; 40 hours = {l1 ? formatCurrency(l1.ftRate * 40) : '&mdash;'}/week, no overtime</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--secondary)' }}>
            Underpayment: ~$140/week from misclassification + missing overtime. Over a year: ~$7,280.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Office workers are often classified at Level 1 when hired and never reclassified as their duties expand. Overtime is normalised as &quot;part of the job.&quot;
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who the Clerks Award covers</h2>
        <p style={pStyle}>
          The Clerks &mdash; Private Sector Award 2020 (MA000002) covers employees performing clerical and administrative duties in the private sector.
        </p>
        <h3 style={h3Style}>&#10003; Covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Receptionists and admin assistants</li>
          <li>Data entry operators</li>
          <li>Accounts receivable/payable staff</li>
          <li>Payroll officers</li>
          <li>Bookkeepers</li>
          <li>Office managers (clerical duties)</li>
          <li>Personal assistants and secretaries</li>
        </ul>
        <h3 style={h3Style}>&#10007; Not typically covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Admin staff at hotels or hospitality venues &rarr; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award</a></li>
          <li>Admin in retail businesses &rarr; may be <a href="/awards/retail-award" style={linkStyle}>Retail Award</a></li>
          <li>Government employees &rarr; separate enterprise agreements</li>
        </ul>
      </section>

      {/* Classification levels */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Clerks Award classification levels</h2>
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
                { level: 1, duties: 'Filing, photocopying, basic data entry, mail', rate: l1 ? formatCurrency(l1.ftRate) : '&mdash;' },
                { level: 2, duties: 'Reception, accounts receivable/payable, intermediate data entry', rate: l2 ? formatCurrency(l2.ftRate) : '&mdash;' },
                { level: 3, duties: 'Payroll, bookkeeping, experienced admin, limited supervision', rate: l3 ? formatCurrency(l3.ftRate) : '&mdash;' },
                { level: 4, duties: 'Specialised admin, supervisory, complex systems', rate: l4 ? formatCurrency(l4.ftRate) : '&mdash;' },
                { level: 5, duties: 'Senior admin, significant autonomy, staff management', rate: l5 ? formatCurrency(l5.ftRate) : '&mdash;' },
              ].map((row) => (
                <tr key={row.level}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--secondary)' }}>Level {row.level}</td>
                  <td style={tdStyle}>{row.duties}</td>
                  <td style={tdStyle}>{row.rate}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates approximate, based on the Fair Work Commission pay guide for MA000002, effective 1 July 2025.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Clerks Award?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Overtime:</strong> After 38 hours/week or 7.6 hours/day &mdash; time-and-a-half then double time</li>
          <li><strong>Saturday rates:</strong> Penalty rate for all Saturday work</li>
          <li><strong>Sunday rates:</strong> Higher penalty rate &mdash; double time for casuals</li>
          <li><strong>Public holiday rates:</strong> Double time and a half for casuals</li>
          <li><strong>Casual loading:</strong> 25% &mdash; does not replace penalty rates or overtime</li>
          <li><strong>Meal allowance:</strong> When required to work overtime beyond 1.5 hours after normal finish</li>
          <li><strong>Minimum engagement:</strong> 3 hours per shift for casuals</li>
        </ul>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments under the Clerks Award</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Misclassification at Level 1', desc: 'The most common issue. Workers performing Level 2 or 3 duties are classified (and paid) at Level 1. If you do payroll, bookkeeping, or work without direct supervision, you should be higher.' },
              { title: 'Unpaid overtime normalised', desc: 'Office workers frequently stay 15\u201330 minutes late without thinking about it. Over a year, that adds up. Any time beyond 7.6 hours/day or 38 hours/week must be paid at overtime rates.' },
              { title: 'Annualised salary that doesn\u2019t reconcile', desc: 'If you are on a salary, your employer must reconcile it annually against what you would have earned under the award. Many never do this, and the salary often falls short when overtime is accounted for.' },
              { title: 'No Saturday penalty for occasional weekend work', desc: 'If you work any hours on a Saturday, those hours attract a penalty rate. "It\u2019s just a few hours" does not remove the entitlement.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 700, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />

      {/* Pay rates by role */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay rates by role</h2>
        <p style={pStyle}>See pay rates specific to your job:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/clerks-award/receptionist-pay-rates', label: 'Receptionist pay rates' },
            { href: '/awards/clerks-award/data-entry-pay-rates', label: 'Data entry pay rates' },
            { href: '/awards/clerks-award/payroll-officer-pay-rates', label: 'Payroll officer pay rates' },
            { href: '/awards/clerks-award/admin-assistant-pay-rates', label: 'Admin assistant pay rates' },
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
          <li><a href="/awards/clerks-award/am-i-being-underpaid" style={linkStyle}>Am I being underpaid?</a> &mdash; the signs and what to do</li>
          <li><a href="/awards/clerks-award/not-getting-overtime" style={linkStyle}>Not getting overtime?</a> &mdash; the 7.6-hour trigger</li>
          <li><a href="/awards/clerks-award/wrong-classification" style={linkStyle}>Wrong classification?</a> &mdash; Level 1 vs Level 3</li>
          <li><a href="/awards/clerks-award/salary-vs-award" style={linkStyle}>Salary vs award rates</a> &mdash; does your salary stack up?</li>
        </ul>
      </section>

      {/* Common scenarios */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common scenarios</h2>
        <p style={pStyle}>Answers to specific situations office workers ask about:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
          {[
            { href: '/awards/clerks-award/scenarios/overtime-not-paid', label: 'Working late every day \u2014 no overtime' },
            { href: '/awards/clerks-award/scenarios/level-too-low', label: 'Doing Level 3 work at Level 1 pay' },
            { href: '/awards/clerks-award/scenarios/saturday-work', label: 'Occasional Saturday work \u2014 no penalty' },
            { href: '/awards/clerks-award/scenarios/salary-shortfall', label: 'Salary doesn\u2019t cover award entitlements' },
            { href: '/awards/clerks-award/scenarios/casual-overtime', label: 'Casual working 40+ hours' },
            { href: '/awards/clerks-award/scenarios/no-meal-allowance', label: 'Working late with no meal allowance' },
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
          href="/check-my-pay?award=MA000002"
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
          Based on official pay rates from the Fair Work Commission (MA000002).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the Clerks &mdash; Private Sector Award 2020 (MA000002), effective 1 July 2025. General information only &mdash; not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
