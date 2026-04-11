/**
 * High-intent: Am I Being Underpaid as a Cleaner?
 * URL: /awards/cleaning-award/underpaid-cleaner
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
  { question: 'I get paid cash — does the Cleaning Award still apply to me?', answer: 'Yes. Every employee in Australia is covered by workplace laws regardless of how they\'re paid. Being paid cash does not make you a contractor and does not exempt your employer from the Cleaning Services Award. If someone controls your hours, provides your equipment, and tells you where to work, you\'re an employee.' },
  { question: 'My employer says I\'m a contractor — can they pay below the award?', answer: 'If you work set hours, use the employer\'s equipment, wear their uniform, and clean where they tell you to clean, you\'re almost certainly an employee regardless of what the contract says. Sham contracting is rampant in the cleaning industry. The Fair Work Ombudsman can determine your real status.' },
  { question: 'Can I recover underpayments from previous years?', answer: 'Yes. The Fair Work Ombudsman can recover underpayments going back up to 6 years. For cleaning workers paid below award rates for extended periods, back-pay claims can be significant \u2014 the amount depends on the size of the shortfall and how long it continued.' },
];

export default function CleaningIntentUnderpaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re a cleaner getting paid cash with no payslip, you are almost certainly being underpaid. This is not a guess &mdash; it is the most common wage theft pattern in Australia. The cleaning industry has the highest rate of underpayment of any sector, and it overwhelmingly affects migrant workers, international students, and people who don&apos;t know their rights.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The Cleaning Services Award sets a legal minimum. If your employer pays less than that, they are breaking the law &mdash; full stop.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Signs you&apos;re being underpaid</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You&apos;re paid a flat rate per job or per building instead of per hour</li>
          <li style={{ marginBottom: '6px' }}>You don&apos;t receive a payslip</li>
          <li style={{ marginBottom: '6px' }}>You&apos;re paid cash in hand</li>
          <li style={{ marginBottom: '6px' }}>Your hourly rate is below {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr</li>
          <li style={{ marginBottom: '6px' }}>You work weekends or public holidays at the same rate as weekdays</li>
          <li style={{ marginBottom: '6px' }}>You&apos;ve never received superannuation</li>
          <li style={{ marginBottom: '6px' }}>Your employer calls you a &quot;contractor&quot; but controls your hours and location</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> A cleaner works 5 shifts per week, 4 hours each, cleaning offices from 6pm to 10pm. Paid $20/hr cash, no payslip, no super.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> Base rate should be ~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr minimum (Level 1) &mdash; significantly underpaid per hour &times; 20 hours per week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> No superannuation paid &mdash; that&apos;s another 12% ({l1 ? formatCurrency(l1.ftRate * 20 * 0.12) : '&mdash;'}/week) the employer is pocketing.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 3:</strong> No payslip is itself a breach of the Fair Work Act.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Total underpayment: ~$154/week, or $8,000+/year.
          </p>
          <p style={smallStyle}>
            This is a conservative estimate. If any shifts fall on weekends or public holidays, the gap is even larger.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do next</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Check your rate.</strong> Enter your hours and pay below to see what the Cleaning Award says you should earn.</li>
          <li style={{ marginBottom: '8px' }}><strong>Keep records.</strong> Write down your hours, what you were paid, and when. Text messages and bank transfers count as evidence.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact Fair Work.</strong> Call 13 13 94 or use the online complaint form. Your visa status does not matter &mdash; the FWO protects all workers.</li>
        </ol>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>You deserve to know what you&apos;re owed. Check your pay in 2 minutes.</p>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Cleaning Services Award 2020 (MA000022), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
