/**
 * Scenario: Fast Food Cash in Hand — Is This Legal?
 * /awards/fast-food-award/scenarios/cash-in-hand
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
  { question: 'Can I get in trouble for being paid cash in hand?', answer: 'You are required to declare all income to the ATO regardless of how you\'re paid. If your employer is paying you cash to avoid tax and super obligations, the employer is breaking the law — not you. However, you should report it to protect your own entitlements.' },
  { question: 'Am I still entitled to super if I\'m paid cash?', answer: 'Yes. Superannuation is based on your earnings, not how you\'re paid. If you earn more than $450 per month (or any amount from 1 July 2024 onwards), your employer must pay super at the current rate of 12%. Cash-in-hand arrangements often skip super, costing you thousands over time.' },
  { question: 'What should I do if my fast food employer only pays cash?', answer: 'Start keeping your own records of hours worked and amounts paid. You can report the employer to the Fair Work Ombudsman anonymously. You\'re also entitled to request payslips — employers must provide them within one working day of pay day.' },
];

export default function FFScenarioCashInHand({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const superRate = 0.12;
  const superPerHour = Math.round(baseRate * superRate * 100) / 100;
  const weeklySuper = Math.round(superPerHour * 20 * 100) / 100;
  const yearlySuper = Math.round(weeklySuper * 52 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Paying cash in hand to avoid tax, super, and award obligations is illegal. If your fast food employer pays you cash with no payslip and no tax withheld, they are almost certainly breaching the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> and Australian tax law.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under Australian law, employers must withhold PAYG tax, pay superannuation (currently 12%), and provide payslips within one working day of pay day. The Fast Food Industry Award (MA000003) sets minimum rates that apply regardless of how you are paid. Cash-in-hand arrangements typically mean no tax, no super, no leave accrual, and no payslips — all of which are legal obligations your employer is dodging.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>What you&apos;re missing with cash in hand (Grade 1, 20 hrs/week)</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Minimum hourly rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Super owed per hour (12%): ${superPerHour.toFixed(2)}</li>
            <li>Super owed per week (20 hrs): ${weeklySuper.toFixed(2)}</li>
            <li>Super owed per year: ${yearlySuper.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            On top of missing super, you also lose penalty rates, leave entitlements, and any protection if you&apos;re injured at work.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Do you receive a payslip at all? Employers must provide one within 1 business day of pay day.</li>
          <li>Is tax being withheld? Check your myGov/ATO account to see if your employer is reporting your income.</li>
          <li>Is superannuation appearing in your super fund? Log in and check for contributions.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
      </p>

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
