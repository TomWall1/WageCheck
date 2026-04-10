/**
 * Scenario: No Break on a 5-Hour Fast Food Shift — Is That Legal?
 * /awards/fast-food-award/scenarios/no-break
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How long does my break need to be?', answer: 'If you work more than 5 hours, you\'re entitled to an unpaid meal break of between 30 and 60 minutes. The break must be taken no later than 5 hours after starting work. If you work more than 4 hours but not more than 5, your employer is not obligated to give you a meal break, but many do.' },
  { question: 'What if I\'m told to keep working through my break?', answer: 'If your employer directs you to work through your meal break, those minutes must be paid at your ordinary rate (or applicable penalty rate). You cannot be asked to work unpaid during a break period. If this happens regularly, it may indicate a broader issue with staffing and compliance.' },
  { question: 'Can my break be split into two shorter breaks?', answer: 'The award allows for a rest break of 10 minutes (paid) for shifts of 4 hours or more, in addition to the meal break. However, a rest break cannot replace a meal break. If you work over 5 hours, you must still receive a full 30-60 minute meal break.' },
];

export default function FFScenarioNoBreak({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const missedBreakPay = Math.round(baseRate * 0.5 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No, it is not legal to deny you a break on a 5-hour fast food shift. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, if you work more than 5 hours you must receive an unpaid meal break of 30 to 60 minutes.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) requires employers to provide a meal break of between 30 and 60 minutes to any employee who works more than 5 consecutive hours. The break must be given no later than 5 hours after the start of work. Additionally, employees who work 4 hours or more are entitled to a paid 10-minute rest break. These are minimum entitlements — your employer cannot contract out of them.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>If you worked through a 30-minute break</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Base hourly rate (Grade 1): ${baseRate.toFixed(2)}/hr</li>
            <li>30 minutes worked through break: ${missedBreakPay.toFixed(2)}</li>
            <li>This must be paid at your applicable rate for that time of day</li>
          </ul>
          <p style={smallStyle}>
            If you were directed to work through your break, those 30 minutes are paid time. If penalties apply (weekend, late night), the rate is higher.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your shift length minus break time match the hours shown on your payslip?</li>
          <li>If you worked through your break, were those minutes included as paid time?</li>
          <li>Are your total hours consistent with what you actually worked, including any missed breaks?</li>
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
