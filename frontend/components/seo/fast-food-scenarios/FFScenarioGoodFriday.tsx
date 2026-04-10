/**
 * Scenario: Worked Good Friday in Fast Food — What's the Rate?
 * /awards/fast-food-award/scenarios/good-friday
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
  { question: 'Is Good Friday the same rate as other public holidays in fast food?', answer: 'Yes. Good Friday attracts the standard public holiday rate under the Fast Food Industry Award — 250% for permanent employees and 275% for casuals. There is no special "enhanced" rate for Good Friday versus other public holidays.' },
  { question: 'What about Easter Saturday, Sunday, and Monday?', answer: 'Easter Saturday is a public holiday in all states and territories except WA and TAS — check your state. Easter Sunday is a public holiday in ACT, NSW, and QLD. Easter Monday is a national public holiday. Each day that qualifies as a public holiday attracts the full 250%/275% rate.' },
  { question: 'I refused to work Good Friday and was threatened with losing shifts — is that legal?', answer: 'No. You have the right to refuse to work on a public holiday if the request is unreasonable. Your employer cannot punish you by reducing your future shifts. If they do, this may constitute adverse action, which is illegal under the Fair Work Act.' },
];

export default function FFScenarioGoodFriday({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const phRate = Math.round(baseRate * 2.5 * 100) / 100;
  const phCasual = Math.round(baseRate * 2.75 * 100) / 100;
  const shift5 = Math.round(phRate * 5 * 100) / 100;
  const ordShift5 = Math.round(baseRate * 5 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Good Friday pays 250% of your ordinary rate if you&apos;re permanent, or 275% if you&apos;re casual. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, Good Friday is a national public holiday and full penalty rates apply to every hour worked.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Good Friday is a national public holiday under the Fair Work Act. The Fast Food Industry Award (MA000003) requires 250% of the ordinary hourly rate for full-time and part-time employees and 275% for casuals. Permanent employees who don&apos;t work on Good Friday but would normally be rostered receive a paid day off at their ordinary rate. Minimum casual engagement of 2 hours still applies.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 permanent, 5-hour Good Friday shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Good Friday rate (250%): ${phRate.toFixed(2)}/hr</li>
            <li>Casual Good Friday rate (275%): ${phCasual.toFixed(2)}/hr</li>
            <li>5-hour permanent shift: ${shift5.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At the ordinary rate, that shift pays ${ordShift5.toFixed(2)} &mdash; a shortfall of ${(shift5 - ordShift5).toFixed(2)} for one day.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is Good Friday listed as a public holiday with the correct penalty rate?</li>
          <li>Does the rate match 250% (permanent) or 275% (casual)?</li>
          <li>If you didn&apos;t work and it&apos;s your normal day, were you paid your ordinary rate?</li>
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
