/**
 * Scenario: Working Extra Hours in Fast Food and Not Getting Overtime
 * /awards/fast-food-award/scenarios/overtime-not-paid
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
  { question: 'I\'m told overtime doesn\'t apply to fast food — is that true?', answer: 'That is completely false. The Fast Food Industry Award explicitly provides for overtime rates. Full-time employees earn overtime after 38 hours per week or beyond their daily ordinary hours. Part-time employees earn overtime for hours beyond their agreed hours. No employer can opt out of this.' },
  { question: 'What counts as overtime — staying late or being rostered extra shifts?', answer: 'Both. Overtime includes any hours worked beyond your ordinary hours, whether that\'s staying back to finish closing, being asked to come in on a day off, or being rostered for more than 38 hours in a week. The trigger is the total hours worked, not how they were scheduled.' },
  { question: 'Can my employer give me time off instead of overtime pay?', answer: 'Time off in lieu (TOIL) is possible under the award, but only by mutual written agreement and the time off must be at the overtime rate equivalent. For example, 1 hour of overtime at 150% equals 1.5 hours of time off. Your employer cannot unilaterally substitute TOIL for overtime pay.' },
];

export default function FFScenarioOvertimeNotPaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const ot150 = Math.round(baseRate * 1.5 * 100) / 100;
  const ot200 = Math.round(baseRate * 2.0 * 100) / 100;
  const extraHrs3 = Math.round(ot150 * 2 * 100) / 100 + Math.round(ot200 * 1 * 100) / 100;
  const flatPay3 = Math.round(baseRate * 3 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you are working extra hours in fast food and not receiving overtime pay, your employer is breaking the law. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> requires overtime rates of 150% for the first 2 hours and 200% thereafter for all hours beyond your ordinary hours.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) defines ordinary hours as a maximum of 38 per week for full-time employees. Any hours worked beyond this are overtime. Part-time employees trigger overtime when they exceed their agreed hours. The first 2 hours of overtime each day are paid at 150%. After 2 hours, the rate increases to 200%. These are minimum entitlements that apply regardless of any verbal agreement with your employer.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1, staying 3 hours extra after an 8-hour shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Base rate: ${baseRate.toFixed(2)}/hr</li>
            <li>First 2 hours overtime (150%): ${ot150.toFixed(2)}/hr = ${(ot150 * 2).toFixed(2)}</li>
            <li>Third hour overtime (200%): ${ot200.toFixed(2)}/hr</li>
            <li>Total overtime pay for 3 hours: ${extraHrs3.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At your flat rate, 3 extra hours would pay ${flatPay3.toFixed(2)} &mdash; you&apos;re owed ${(extraHrs3 - flatPay3).toFixed(2)} more.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are your extra hours shown at a higher rate than your ordinary hours?</li>
          <li>Is overtime split into 150% and 200% bands?</li>
          <li>Do your total hours on the payslip match what you actually worked, including staying late?</li>
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
