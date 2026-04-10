/**
 * Scenario: Christmas Day Pay in Retail — /awards/retail-award/scenarios/christmas-day
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
  { question: 'The shop is closed on Christmas Day — do I still get paid?', answer: 'Yes, if you are a permanent (full-time or part-time) employee and Christmas Day falls on a day you would normally work. You are entitled to a paid day off at your ordinary rate. You do not lose pay because the store is closed.' },
  { question: 'Can my employer force me to work on Christmas Day?', answer: 'An employer can request you work on Christmas Day, but you can refuse if the request is unreasonable. Factors include the nature of the work, personal circumstances, the amount of notice given, and whether you will be adequately compensated.' },
  { question: 'What if Christmas Day falls on a Saturday or Sunday?', answer: 'The public holiday rate applies — not the Saturday or Sunday rate. You get the higher public holiday rate for Christmas Day, regardless of what day of the week it falls on. If a substitute day is declared, you may get the public holiday rate on that day instead.' },
];

export default function RetailScenarioChristmasDay({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 22.61;
  const phRate = l1?.publicHolidayFt ?? Math.round(baseRate * 2.5 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Christmas Day pay under the <a href="/awards/retail-award" style={linkStyle}>General Retail Industry Award</a> is 250% of the ordinary rate for permanent employees and 275% for casuals. Minimum engagement is 3 hours. If you worked Christmas Day at your normal rate, you were significantly underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Working a 5-hour Christmas Day shift at the wrong rate can cost you $150+.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Christmas Day is a national public holiday. Under the Retail Award (MA000004), permanent employees are paid 250% of their ordinary hourly rate. Casual employees receive 275% of the ordinary base rate. Minimum engagement is 3 hours for all employees.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What you should be paid</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Level 1 permanent, 5-hour Christmas Day shift:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary rate: ~{formatCurrency(baseRate)}/hr</li>
            <li>Christmas Day rate (250%): ~{formatCurrency(phRate)}/hr</li>
            <li>5-hour shift: ~{formatCurrency(phRate * 5)}</li>
          </ul>
          <p style={smallStyle}>
            If paid at the ordinary rate, you&apos;d receive only ~{formatCurrency(baseRate * 5)}. That&apos;s a shortfall of ~{formatCurrency(phRate * 5 - baseRate * 5)} for one shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is Christmas Day shown as a public holiday line item?</li>
          <li>Is the rate 250% (permanent) or 275% (casual) of your ordinary rate?</li>
          <li>Were you paid for at least 3 hours?</li>
          <li>If you didn&apos;t work but it&apos;s your normal day, were you paid your ordinary rate?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>Check your Christmas Day rate matches the public holiday entitlement.</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at fairwork.gov.au.
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
