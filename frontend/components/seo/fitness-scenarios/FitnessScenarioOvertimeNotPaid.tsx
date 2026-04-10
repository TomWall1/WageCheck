/**
 * Scenario: Extra Hours in the Fitness Industry and No Overtime
 * URL: /awards/fitness-award/scenarios/overtime-not-paid
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
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Do I get overtime for covering someone else\'s class?', answer: 'If covering that class pushes your total hours beyond the overtime threshold (e.g., beyond 38 hours/week for full-time, or beyond your agreed hours for part-time), then yes — the extra hours should be paid at overtime rates. It doesn\'t matter that you\'re covering for someone else.' },
  { question: 'My employer says overtime doesn\'t apply to fitness workers — is that true?', answer: 'No. The Fitness Industry Award includes overtime provisions that apply to all employees covered by the award. There is no exemption for fitness workers. If you exceed your ordinary hours, overtime rates apply.' },
  { question: 'What if I agreed to work the extra hours without overtime?', answer: 'You cannot agree to waive your overtime entitlements. The award sets minimum rates that cannot be contracted out of. Even if you voluntarily agreed to work extra hours at ordinary rates, you are still legally entitled to overtime pay for those hours.' },
];

export default function FitnessScenarioOvertimeNotPaid({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          In the fitness industry, extra hours creep in gradually. You cover a class when someone calls in sick. You stay late to clean up. You come in early to set up for the first session. Over a week, these extras add up &mdash; but they almost never appear as overtime on your payslip. Under the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a>, hours beyond your ordinary hours attract overtime rates. If you&apos;re not seeing overtime pay, you&apos;re being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          &ldquo;Just covering a class&rdquo; doesn&apos;t mean the hours are free. Overtime is overtime regardless of the reason.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fitness Industry Award, overtime is paid at <strong>150%</strong> for the first two hours and <strong>200%</strong> thereafter. For full-time employees, overtime triggers after 38 hours per week or beyond the daily maximum. For part-time employees, overtime applies when you work beyond your agreed contracted hours. Casuals also receive overtime once the relevant threshold is exceeded.
        </p>
        <p style={pStyle}>
          All time worked counts &mdash; setup, pack-down, mandatory meetings, required training. If you&apos;re at work and can&apos;t leave, you&apos;re working.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Part-time fitness instructor, contracted for 25 hours per week. Covers 2 extra classes per week (2 additional hours) and arrives 15 minutes early for every shift to set up (1.25 extra hours/week). Total: 28.25 hours worked. Paid for 25 hours at ordinary rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> The 3.25 extra hours should be paid at overtime rates (150% for the first 2 hours, 200% thereafter).
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What actually happens:</strong> The extra classes are paid at the ordinary rate. The setup time isn&apos;t paid at all.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: 1.25 hours completely unpaid + 2 hours at ordinary instead of overtime = $40&ndash;$60+ per week.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Count your actual hours worked each week, including setup, pack-down, and cover shifts</li>
          <li>Compare total hours to your contracted ordinary hours</li>
          <li>Check whether overtime is shown as a separate line item on your payslip</li>
          <li>Verify that overtime is at 150%/200%, not at the ordinary rate</li>
          <li>Check whether mandatory meetings and training are included in your paid hours</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
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

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
