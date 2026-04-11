/**
 * Fitness Award hub page content — /awards/fitness-award/
 * Rates: FWO pay guide MA000094 effective 1 July 2025
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
  { question: 'What level am I under the Fitness Award?', answer: 'Level 1 covers gym floor attendants, reception, and basic duties. Level 2 covers group fitness instructors, gym instructors with Cert III, and swim teachers. Level 3 covers personal trainers with Cert IV, senior instructors, and program coordinators. Level 4 covers fitness centre managers and head trainers. Your classification depends on your qualifications and actual duties.' },
  { question: 'I am a personal trainer paid per session. Is that legal?', answer: 'Only if you are genuinely self-employed (your own ABN, your own clients, setting your own prices). If you work set hours at a gym, use their equipment, wear their branding, and they allocate your clients, you are likely an employee entitled to award rates \u2014 not per-session pay. This is one of the most common sham contracting arrangements in the fitness industry.' },
  { question: 'Do I get paid for the gap between morning and evening classes?', answer: 'If your employer requires you to be available or stay on-site between classes, that time must be paid. If you are free to leave and return, and your shift is genuinely split into two separate blocks, you are entitled to a split shift allowance on top of your hourly rate.' },
  { question: 'Does casual loading replace penalty rates for fitness workers?', answer: 'No. The 25% casual loading compensates for lack of leave entitlements. Penalty rates for Saturdays, Sundays, and public holidays are separate. Both must be paid.' },
  { question: 'I teach group classes and do PT sessions. What level should I be on?', answer: 'If you hold a Certificate IV in Fitness and deliver personal training sessions, you should be at least Level 3. Having both group fitness and PT qualifications typically places you at Level 3 minimum, regardless of which activities you spend more time on.' },
  { question: 'How far back can I claim underpayment?', answer: 'Six years. Under the Fair Work Act, you can recover underpayments going back up to 6 years. Personal trainers who have been incorrectly classified as contractors for years may have very large accumulated claims.' },
  { question: 'What is the split shift allowance?', answer: 'The split shift allowance is a payment made when your working day is broken into two or more separate periods with an unpaid gap. It compensates for the inconvenience of having to attend work twice in one day. This is extremely common in the fitness industry \u2014 early morning classes, a gap during the day, then evening classes \u2014 and the allowance is almost never paid.' },
  { question: 'Do swim teachers fall under the Fitness Award?', answer: 'Yes. Swim teachers and aquatic program instructors are covered by the Fitness Industry Award. They are typically classified at Level 2 if they hold relevant qualifications.' },
];

export default function FitnessHubContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Split shifts are standard in the fitness industry &mdash; and the split shift allowance is almost never paid. If you teach a 6am class, go home, and come back for a 5pm class, your employer owes you an allowance on top of your hourly rate. Most fitness workers have never heard of this entitlement, and most employers count on that.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you work as a personal trainer, gym instructor, group fitness instructor, or swim teacher &mdash; this award applies to you (if you&rsquo;re an employee, not a genuine contractor).
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Gym instructor, Level 2, casual. Works 6am&ndash;9am (3 hrs) then 4pm&ndash;7pm (3 hrs), Monday to Friday. Paid a flat $32/hr with no split shift allowance. Also works Saturday mornings (4 hrs) at the same rate.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What&rsquo;s missing:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Split shift allowance for every day the shift is broken &mdash; 5 days/week</li>
            <li>Saturday penalty rate &mdash; should be higher than $32/hr</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--secondary)' }}>
            Estimated underpayment: $50&ndash;$80/week from the missing split shift allowance alone. Over a year: $2,400&ndash;$3,840 &mdash; before counting the Saturday penalty shortfall.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Split shifts are so common in fitness that workers accept them as normal without realising the allowance exists. Employers rarely volunteer this information.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who the Fitness Award covers</h2>
        <p style={pStyle}>
          The Fitness Industry Award 2020 (MA000094) covers employees in the fitness, recreation, and aquatic industry.
        </p>
        <h3 style={h3Style}>&#10003; Covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Personal trainers (employed, not genuine contractors)</li>
          <li>Group fitness instructors</li>
          <li>Gym floor attendants</li>
          <li>Swim teachers and aquatic instructors</li>
          <li>Fitness centre receptionists</li>
          <li>Program coordinators</li>
        </ul>
        <h3 style={h3Style}>&#10007; Not typically covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Self-employed personal trainers operating their own business with their own clients</li>
          <li>Physiotherapists or allied health professionals &rarr; separate award</li>
        </ul>
        <p style={smallStyle}>
          If your gym calls you a &quot;contractor&quot; but you work set hours, use their equipment, and they allocate your clients &mdash; you may actually be an employee entitled to full award rates. See the <a href="https://www.fairwork.gov.au/find-help-for/independent-contractors" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work contractor vs employee guide</a>.
        </p>
      </section>

      {/* Classification levels */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fitness Award classification levels</h2>
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
                { level: 1, roles: 'Gym floor attendant, reception, basic duties', rate: l1 ? formatCurrency(l1.ftRate) : '&mdash;' },
                { level: 2, roles: 'Group fitness instructor (Cert III), swim teacher, gym instructor', rate: l2 ? formatCurrency(l2.ftRate) : '&mdash;' },
                { level: 3, roles: 'Personal trainer (Cert IV), senior instructor, program coordinator', rate: l3 ? formatCurrency(l3.ftRate) : '&mdash;' },
                { level: 4, roles: 'Fitness centre manager, head trainer', rate: l4 ? formatCurrency(l4.ftRate) : '&mdash;' },
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
          Rates approximate, based on the Fair Work Commission pay guide for MA000094, effective 1 July 2025.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Fitness Award?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Split shift allowance:</strong> When your working day is broken into two or more periods &mdash; the most commonly missed entitlement in fitness</li>
          <li><strong>Saturday rates:</strong> Penalty rate for all Saturday work</li>
          <li><strong>Sunday rates:</strong> Higher penalty rate</li>
          <li><strong>Public holiday rates:</strong> Double time and a half for casuals</li>
          <li><strong>Casual loading:</strong> 25% &mdash; does not replace penalty rates</li>
          <li><strong>Overtime:</strong> After 38 hours per week or after the daily maximum</li>
          <li><strong>Minimum engagement:</strong> Minimum hours per shift for casuals</li>
          <li><strong>Uniform allowance:</strong> If required to wear and maintain branded clothing</li>
        </ul>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments under the Fitness Award</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Split shift allowance never paid', desc: 'This is the single most common underpayment in the fitness industry. If your shift is split into a morning block and an evening block with an unpaid gap, the allowance applies every single day.' },
              { title: 'Sham contracting', desc: 'Many gyms classify instructors and PTs as contractors when they are actually employees. If you work set hours, use their equipment, and they control your schedule, you are likely an employee entitled to award rates, super, and leave.' },
              { title: 'Per-class or per-session pay below award', desc: 'Being paid per class or per session is only legal if the total amount exceeds what you would earn at the correct award rate for those hours. If you teach a 1-hour class but arrive 15 minutes early and stay 15 minutes late, you should be paid for 1.5 hours.' },
              { title: 'No Saturday or Sunday penalty', desc: 'Weekend classes are extremely common in fitness. If your rate does not change on weekends, penalty rates are not being applied.' },
              { title: 'Classification too low', desc: 'If you hold a Cert IV and deliver personal training, you should be Level 3 minimum. Many gyms keep all floor staff at Level 1 regardless of qualifications.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 700, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />

      {/* Pay rates by role */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay rates by role</h2>
        <p style={pStyle}>See pay rates specific to your job:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/fitness-award/personal-trainer-pay-rates', label: 'Personal trainer pay rates' },
            { href: '/awards/fitness-award/group-fitness-instructor-pay-rates', label: 'Group fitness instructor pay rates' },
            { href: '/awards/fitness-award/swim-teacher-pay-rates', label: 'Swim teacher pay rates' },
            { href: '/awards/fitness-award/gym-attendant-pay-rates', label: 'Gym attendant pay rates' },
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
          <li><a href="/awards/fitness-award/am-i-being-underpaid" style={linkStyle}>Am I being underpaid?</a> &mdash; the signs and what to do</li>
          <li><a href="/awards/fitness-award/contractor-or-employee" style={linkStyle}>Contractor or employee?</a> &mdash; the sham contracting test</li>
          <li><a href="/awards/fitness-award/split-shift-allowance" style={linkStyle}>Split shift allowance</a> &mdash; what you&rsquo;re owed</li>
          <li><a href="/awards/fitness-award/per-session-pay" style={linkStyle}>Per-session pay</a> &mdash; does it meet the award?</li>
        </ul>
      </section>

      {/* Common scenarios */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common scenarios</h2>
        <p style={pStyle}>Answers to specific situations fitness workers ask about:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
          {[
            { href: '/awards/fitness-award/scenarios/split-shift-no-allowance', label: 'Morning and evening classes \u2014 no split shift allowance' },
            { href: '/awards/fitness-award/scenarios/pt-contractor', label: 'PT classified as contractor' },
            { href: '/awards/fitness-award/scenarios/per-class-below-award', label: 'Per-class pay below the award' },
            { href: '/awards/fitness-award/scenarios/saturday-same-rate', label: 'Saturday classes at weekday rate' },
            { href: '/awards/fitness-award/scenarios/no-super-pt', label: 'No super being paid' },
            { href: '/awards/fitness-award/scenarios/swim-teacher-level', label: 'Swim teacher at wrong level' },
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
          Enter your shifts and see exactly what you should have been paid &mdash; including split shift allowances, penalty rates, and overtime. It takes 2 minutes.
        </p>
        <a
          href="/check-my-pay?award=MA000094"
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
          Based on official pay rates from the Fair Work Commission (MA000094).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fitness Industry Award 2020 (MA000094), effective 1 July 2025. General information only &mdash; not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
