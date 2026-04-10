/**
 * Scenario: Worked a Public Holiday in Fast Food — What Am I Owed?
 * /awards/fast-food-award/scenarios/public-holiday
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
  { question: 'Can my fast food employer force me to work on a public holiday?', answer: 'Your employer can request you to work on a public holiday, but you can refuse if the request is unreasonable or if you have reasonable grounds. Factors include the nature of your role, your personal circumstances, and how much notice you were given. If you agree to work, you must be paid the public holiday penalty rate.' },
  { question: 'I\'m casual — do I get penalty rates on public holidays?', answer: 'Yes. Casual employees receive 275% of the ordinary hourly rate for public holiday work under the Fast Food Industry Award. This is separate from and higher than the standard 25% casual loading. The 275% rate applies to every hour worked on the public holiday.' },
  { question: 'What if my employer says the penalty rate is included in my flat rate?', answer: 'A flat rate or salary must still meet or exceed what you would earn under the award, including all penalty rates. If your employer pays $30/hr flat and you work public holidays, they need to demonstrate that your overall pay covers all entitlements. In most cases, a flat rate won\'t cover a 250% or 275% penalty.' },
];

export default function FFScenarioPublicHoliday({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const phFt = Math.round(baseRate * 2.5 * 100) / 100;
  const phCasual = Math.round(baseRate * 2.75 * 100) / 100;
  const shift5 = Math.round(phFt * 5 * 100) / 100;
  const ordShift5 = Math.round(baseRate * 5 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You are owed 250% of your ordinary rate (or 275% if casual) for every hour worked on a public holiday in fast food. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> makes no exceptions — public holiday rates apply to all employees.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fast Food Industry Award (MA000003), full-time and part-time employees receive 250% of the ordinary hourly rate for all work on a public holiday. Casual employees receive 275% of the ordinary rate. These rates apply to all national and state/territory public holidays. Permanent employees who don&apos;t work on a public holiday that falls on their normal working day are entitled to be paid their ordinary rate for that day.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 full-time, 5-hour public holiday shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary hourly rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Public holiday rate (250%): ${phFt.toFixed(2)}/hr</li>
            <li>Casual public holiday rate (275%): ${phCasual.toFixed(2)}/hr</li>
            <li>5-hour full-time shift: ${shift5.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At the ordinary rate, that shift would pay only ${ordShift5.toFixed(2)} &mdash; a shortfall of ${(shift5 - ordShift5).toFixed(2)}.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is the public holiday shown as a separate line item with the correct penalty rate?</li>
          <li>Does the rate match 250% (permanent) or 275% (casual) of your ordinary rate?</li>
          <li>If you didn&apos;t work and you&apos;re permanent, were you still paid for the day?</li>
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
