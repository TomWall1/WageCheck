/**
 * Fitness Award — Personal Trainer role page
 * Focus: sham contracting, employee vs contractor distinction
 * Rates: FWO pay guide MA000094
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
  { question: 'I\'m called a "contractor" at my gym — am I actually an employee?', answer: 'If the gym controls your schedule, requires you to wear their uniform, provides the equipment and space, sets the prices for your sessions, and determines how you deliver your services — you are likely an employee regardless of what your contract says. The Fair Work Act looks at the real nature of the relationship, not the label. Sham contracting is a serious contravention with significant penalties for the employer.' },
  { question: 'What do I lose as a sham contractor vs a real employee?', answer: 'As a sham contractor, you miss out on: minimum award rates, penalty rates for weekends and public holidays, overtime pay, paid annual leave, paid sick leave, superannuation, workers\' compensation insurance, unfair dismissal protections, and payslips. The cost over a year is typically $10,000–$20,000+ in lost entitlements.' },
  { question: 'Can I claim back entitlements if I was a sham contractor?', answer: 'Yes. If you were misclassified as a contractor when you were actually an employee, you can recover all entitlements you should have received — including award rates, penalties, leave, and super — going back up to 6 years. Contact the Fair Work Ombudsman on 13 13 94 to start the process.' },
];

export default function FitnessPersonalTrainerContent({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Personal training is one of the most affected occupations in Australia for sham contracting. Many PTs are told they&apos;re &ldquo;independent contractors&rdquo; and handed an ABN, when in reality they work set hours at a single gym, wear the gym&apos;s uniform, use the gym&apos;s equipment, and follow the gym&apos;s rules. That&apos;s not a contractor. That&apos;s an employee &mdash; and it means the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> applies.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If a gym controls when, where, and how you work &mdash; you&apos;re an employee, no matter what the contract says.
        </p>
        <p style={pStyle}>
          For the full Fitness Industry Award overview, see the <a href="/awards/fitness-award/" style={linkStyle}>Fitness Award pay guide</a>.
        </p>
      </section>

      {/* Sham contracting warning */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Sham contracting: the biggest issue for PTs</h2>

          <h3 style={h3Style}>Signs you&apos;re a sham contractor</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>The gym sets your schedule or roster</li>
            <li>You must wear the gym&apos;s uniform or branded clothing</li>
            <li>You use the gym&apos;s equipment exclusively</li>
            <li>The gym sets or approves the price of your sessions</li>
            <li>You can&apos;t send a replacement if you&apos;re unavailable</li>
            <li>You work predominantly or exclusively for one gym</li>
            <li>You were told to get an ABN as a condition of the job</li>
          </ul>

          <h3 style={h3Style}>Signs you&apos;re a genuine contractor</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>You set your own hours and choose which clients to take</li>
            <li>You provide your own equipment</li>
            <li>You set your own prices</li>
            <li>You can (and do) work at multiple locations</li>
            <li>You can delegate work to someone else</li>
            <li>You bear your own financial risk (insurance, marketing, etc.)</li>
          </ul>

          <p style={smallStyle}>
            Most PTs in commercial gyms fall on the &ldquo;employee&rdquo; side of this test. If even a few of the sham contractor signs apply to you, the arrangement is likely unlawful.
          </p>
        </div>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> PT at a chain gym. Works 30 hours/week including 6am split shifts. Classified as a &ldquo;contractor&rdquo; and paid $35/hr with no super, no leave, no penalties. Wears the gym&apos;s shirt. Uses the gym&apos;s equipment. Can&apos;t work at competing gyms.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>If correctly classified as an employee:</strong> Entitled to award minimum rates, weekend penalties, split shift allowances, 12% super, paid annual and sick leave, overtime for hours beyond 38/week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Missing super alone:</strong> $35 &times; 30hrs &times; 12% = $126/week = $6,552/year.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Missing leave:</strong> 4 weeks annual leave + 10 days personal leave = ~$7,000/year in leave entitlements.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Total estimated loss from sham contracting: $15,000&ndash;$20,000+ per year.
          </p>
        </div>
      </section>

      {/* PT pay rates */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Personal trainer pay rates &mdash; Fitness Award 2025&ndash;26</h2>
        <p style={pStyle}>
          If you are an employee (not a genuine independent contractor), your minimum pay rate is determined by your classification level under the Fitness Industry Award. Personal trainers typically fall at Level 2 or Level 3, depending on their qualifications and responsibilities.
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Level 2:</strong> Qualified PT delivering sessions under general supervision</li>
          <li><strong>Level 3:</strong> Experienced PT with program design responsibilities or supervising other staff</li>
        </ul>
        <p style={pStyle}>
          On top of the base rate, you&apos;re entitled to casual loading (if casual), weekend penalties, public holiday rates, overtime, and split shift allowances. Use the calculator below to see your exact entitlement.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayments for personal trainers</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Sham contracting:</strong> Being called a contractor when you&apos;re an employee &mdash; losing all award entitlements</li>
          <li><strong>Flat per-session rates:</strong> Paid per session without accounting for non-client time (admin, cleaning, setup)</li>
          <li><strong>No split shift allowance:</strong> Working 6am clients and 6pm clients with nothing for the broken shift</li>
          <li><strong>Weekend penalties missing:</strong> Same rate on Saturday and Sunday as weekdays</li>
          <li><strong>No super:</strong> Especially common under sham contracting arrangements</li>
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

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; if you&apos;re an employee, check exactly what you should be earning.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000094).
        </p>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fitness Industry Award 2020 (MA000094), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
