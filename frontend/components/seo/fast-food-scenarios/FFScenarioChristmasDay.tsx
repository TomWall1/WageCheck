/**
 * Scenario: Worked Christmas Day in Fast Food — What's the Rate?
 * /awards/fast-food-award/scenarios/christmas-day
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
  { question: 'Is Christmas Day double time or triple time in fast food?', answer: 'Christmas Day is paid at 250% (2.5 times) your ordinary rate for full-time and part-time employees under the Fast Food Industry Award. Casuals receive 275% (2.75 times). It\'s sometimes called "double time and a half" — higher than standard double time.' },
  { question: 'I\'m permanent and the store was closed on Christmas — do I lose a day\'s pay?', answer: 'No. If Christmas Day falls on a day you would normally work, you are entitled to be paid your ordinary rate for that day even though the store is closed. You don\'t lose pay because your employer chose not to open.' },
  { question: 'Does the penalty rate apply to the whole shift or just hours on Christmas Day?', answer: 'The 250%/275% rate applies only to hours worked on Christmas Day itself (midnight to midnight). If your shift starts on Christmas Eve and runs past midnight, only the hours after midnight attract the Christmas Day rate. Similarly, if your shift extends past midnight on Christmas Day, only the hours on the 25th are penalised.' },
];

export default function FFScenarioChristmasDay({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const phRate = Math.round(baseRate * 2.5 * 100) / 100;
  const phCasual = Math.round(baseRate * 2.75 * 100) / 100;
  const shift6 = Math.round(phRate * 6 * 100) / 100;
  const ordShift6 = Math.round(baseRate * 6 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Christmas Day in fast food pays 250% of your ordinary rate if you&apos;re permanent, or 275% if you&apos;re casual. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, this is one of the highest-paying days of the year — and your employer cannot pay you less.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Christmas Day is a national public holiday under the Fair Work Act. The Fast Food Industry Award (MA000003) requires employers to pay 250% of the ordinary hourly rate to full-time and part-time employees, and 275% to casuals, for all work performed on 25 December. Permanent employees who are not required to work but whose normal roster includes Christmas Day receive a paid day off at their ordinary rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1, 6-hour Christmas Day shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary hourly rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Christmas Day full-time rate (250%): ${phRate.toFixed(2)}/hr</li>
            <li>Christmas Day casual rate (275%): ${phCasual.toFixed(2)}/hr</li>
            <li>6-hour full-time shift: ${shift6.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At the ordinary rate you&apos;d only receive ${ordShift6.toFixed(2)} &mdash; a shortfall of ${(shift6 - ordShift6).toFixed(2)} for one shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is 25 December shown as a public holiday with a separate penalty rate line?</li>
          <li>Does the hourly rate match 250% (permanent) or 275% (casual)?</li>
          <li>If you didn&apos;t work Christmas Day but it&apos;s your normal day, is it shown as a paid absence?</li>
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
