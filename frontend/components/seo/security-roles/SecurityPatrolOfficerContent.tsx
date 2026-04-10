/**
 * Security Award — Patrol Officer role page
 * Rates: FWO pay guide MA000016
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  {
    question: 'Should I be paid for driving time between patrol sites?',
    answer: 'Yes. If you are required to travel between sites as part of your duties, that travel time is work time and must be paid. You should also be reimbursed for vehicle running costs if you use your own car, or an appropriate vehicle allowance should be paid under the award. Unpaid travel between sites is a common source of underpayment for patrol officers.',
  },
  {
    question: 'What classification level is a patrol officer?',
    answer: 'Patrol officers who perform mobile patrol duties, alarm response, or lock-up/unlock services are typically classified at Level 2 or above under the Security Services Industry Award. If you also perform alarm monitoring, armed response, or supervisory duties, you may be classified higher. Your classification should reflect the full scope of duties you actually perform, not the lowest level your employer can argue.',
  },
  {
    question: 'My shifts are overnight and I am alone — does that attract extra pay?',
    answer: 'Night shift loadings apply to overnight hours regardless of whether you work alone or with others. The fact that you work alone does not create an additional loading under the award, but the overnight penalty rates still apply in full. If your employer is not paying night loadings because patrol officers work independently, that is incorrect — the loading is based on the time of work, not the staffing arrangement.',
  },
];

export default function SecurityPatrolOfficerContent({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000016
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Patrol officers &mdash; mobile security, alarm response, lock-up/unlock services &mdash; are covered by the Security Services Industry Award 2020 (MA000016). Patrol work is almost exclusively overnight, often solo, and involves driving between multiple sites during a shift. This creates three common underpayment risks: missing night loadings, unpaid travel time between sites, and no vehicle or mileage allowance.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you drive between sites as part of your job and don&apos;t see travel time or a vehicle allowance on your payslip, start there.
        </p>
        <p style={pStyle}>
          For the full Security Award overview, see the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* What patrol officers do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Patrol officer duties and classification</h2>
        <p style={pStyle}>Patrol officers under the Security Award typically perform:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Mobile patrols of commercial, industrial, or residential premises</li>
          <li style={{ marginBottom: '6px' }}>Alarm response and investigation</li>
          <li style={{ marginBottom: '6px' }}>Lock-up and unlock services</li>
          <li style={{ marginBottom: '6px' }}>Alarm monitoring and communication</li>
          <li style={{ marginBottom: '6px' }}>Reporting and incident documentation</li>
        </ul>
        <p style={pStyle}>
          These duties typically place patrol officers at Level 2 or above. If you also perform armed duties, alarm system monitoring, or supervise other officers, your level should be higher.
        </p>
      </section>

      {/* Unique issues for patrol */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay issues specific to patrol officers</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '12px' }}>
            <strong>1. Travel time between sites.</strong> If you visit 15 sites in a shift, the driving time between each site is work time. Some employers only pay for the time &quot;on site&quot; and exclude travel. That&apos;s wrong &mdash; you are working the entire time you are on patrol, including while driving.
          </p>
          <p style={{ ...pStyle, marginBottom: '12px' }}>
            <strong>2. Vehicle running costs.</strong> If you use your own car for patrol work, you are entitled to reimbursement for vehicle running costs. The ATO per-kilometre rate or an award vehicle allowance should apply. Fuel, wear, and insurance are not your burden when the vehicle is used for work.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>3. Night loadings on every shift.</strong> Patrol work is overwhelmingly overnight. If your employer pays a flat rate regardless of shift time, night loadings are missing on virtually every hour you work.
          </p>
        </div>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual patrol officer, Level 2, works five overnight shifts per week (10pm&ndash;6am). Uses own car. Visits 12&ndash;15 sites per shift. Paid $31/hr flat, no vehicle allowance.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Night loadings missing: the post-midnight hours (6 out of 8) should attract a higher rate</li>
            <li>Weekend shifts (if any) should attract Saturday/Sunday penalties on top</li>
            <li>Vehicle allowance: at roughly 200km per shift, the running cost adds up fast</li>
            <li>If weekly hours exceed 38, overtime is owed on the excess</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Between missing night loadings, no vehicle allowance, and potential overtime, the weekly shortfall can exceed $200+.
          </p>
          <p style={smallStyle}>
            Over a year, that&apos;s $10,000+ in underpayment &mdash; and the vehicle costs come directly out of your pocket.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Is all driving time between sites counted as paid work time?</li>
          <li style={{ marginBottom: '8px' }}>Are you receiving a vehicle or mileage allowance if using your own car?</li>
          <li style={{ marginBottom: '8px' }}>Are night loadings applied to your overnight hours?</li>
          <li style={{ marginBottom: '8px' }}>Is your classification level correct for patrol duties?</li>
          <li style={{ marginBottom: '8px' }}>If you work more than 38 hours per week, is the excess at overtime rates?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Enter your patrol shifts and see the correct rate for every hour.
        </p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Related */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/security-award/penalty-rates" style={linkStyle}>Security Award penalty rates</a> &middot; <a href="/awards/security-award/allowances" style={linkStyle}>Security Award allowances</a> &middot; <a href="/awards/security-award/pay-rates" style={linkStyle}>Security Award pay rates</a>
        </p>
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Patrol work is overnight work. Overnight work means premium rates. Check yours.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000016).
        </p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Security Services Industry Award 2020 (MA000016), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
