/**
 * Scenario: Closing Duties After Clock-Off in Fast Food — Is That Legal?
 * /awards/fast-food-award/scenarios/closing-shift
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
  { question: 'My manager says closing duties are "part of the job" and don\'t count — is that right?', answer: 'No. If you are performing work — cleaning, mopping, cashing up, restocking, locking up — that is paid time. Every minute you spend on closing duties after your rostered finish time must be recorded and paid. Your employer cannot require you to work off the clock.' },
  { question: 'I stay 20 minutes after every shift to close — is that overtime?', answer: 'If those 20 minutes push you beyond your daily ordinary hours or beyond 38 hours in the week, yes — it\'s overtime and must be paid at 150% or 200%. Even if it doesn\'t trigger overtime, those 20 minutes must still be paid at your applicable rate, including any late night loading if it\'s after 10pm.' },
  { question: 'What if I\'m told to clock off before I start cleaning?', answer: 'This is wage theft. If your employer instructs you to clock off and then continue working, they are deliberately not paying you for time worked. Record the actual times you start and finish work (not just the clock-in system) and raise a complaint with the Fair Work Ombudsman.' },
];

export default function FFScenarioClosingShift({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const lateNightRate = Math.round(baseRate * 1.10 * 100) / 100;
  const mins30 = Math.round(lateNightRate * 0.5 * 100) / 100;
  const weeklyLoss = Math.round(mins30 * 5 * 100) / 100;
  const yearlyLoss = Math.round(weeklyLoss * 52 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No, working after you clock off is not legal. Every minute you spend performing closing duties in a fast food outlet must be paid. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, if you are directed to mop floors, clean equipment, or cash up after your shift, that time is work and must be compensated.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under Australian workplace law and the Fast Food Industry Award (MA000003), any time an employee is required to perform duties constitutes work and must be paid. This includes cleaning, restocking, cashing up, taking out rubbish, and locking up the premises. Your employer must record all hours worked accurately. Directing an employee to clock off before their duties are complete is a form of wage theft and carries significant penalties.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1, 30 mins unpaid closing after 10pm &times; 5 nights/week</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Late night rate (after 10pm, 110%): ${lateNightRate.toFixed(2)}/hr</li>
            <li>30 minutes unpaid per night: ${mins30.toFixed(2)}</li>
            <li>Weekly loss (5 nights): ${weeklyLoss.toFixed(2)}</li>
            <li>Annual loss: ${yearlyLoss.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            Over a year, 30 minutes of unpaid closing per night adds up to ${yearlyLoss.toFixed(2)} in stolen wages — and that&apos;s at the base late night rate before any overtime applies.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your clock-off time match when you actually finished all duties?</li>
          <li>Are you paid for the full time you&apos;re on the premises working?</li>
          <li>If closing duties push you past 10pm, is the late night loading applied?</li>
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
