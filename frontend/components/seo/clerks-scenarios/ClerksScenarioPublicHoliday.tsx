/**
 * Scenario: Public Holiday Rates — Clerks Award
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
  { question: 'I normally have Mondays off — do I get paid if a public holiday falls on Monday?', answer: 'If you\'re full-time, yes. Full-time employees are entitled to be paid for a public holiday that falls on a day they would ordinarily work. If Monday is your regular day off by roster arrangement, you may not be entitled — but if you normally work Mondays, you get the day paid at your ordinary rate even if you don\'t work.' },
  { question: 'My employer asked me to work from home on a public holiday — does the penalty rate still apply?', answer: 'Yes. Working from home on a public holiday attracts the same penalty rates as working on-site. The location doesn\'t change the entitlement. If you work on a public holiday, you\'re owed the public holiday rate regardless of where the work happens.' },
  { question: 'Can I be forced to work on a public holiday?', answer: 'An employer can request it, but you can refuse if the request is unreasonable. Reasonableness considers the nature of the business, your personal situation, notice given, and whether you\'ll be adequately compensated.' },
];

export default function ClerksScenarioPublicHoliday({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Under the Clerks Award, full-time and part-time employees who work on a public holiday are entitled to 2.5&times; the ordinary hourly rate. Casual employees receive their applicable public holiday casual rate. Some offices require clerical staff to work public holidays for end-of-quarter processing, tax deadlines, or other business needs &mdash; and the penalty rate is frequently missed.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you worked a public holiday and your payslip doesn&apos;t show a separate, higher rate for those hours &mdash; you were underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Full-time/part-time: 2.5&times; ordinary hourly rate for all hours worked</li>
          <li style={{ marginBottom: '6px' }}>Casual: applicable casual public holiday rate</li>
          <li style={{ marginBottom: '6px' }}>If you don&apos;t work: full-time employees are paid their ordinary rate for the day</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Level 3 clerk, base rate ~{l3 ? formatCurrency(l3.ftRate) : '&mdash;'}/hr, works a 7.6-hour shift on Australia Day to process quarter-end reports.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Should be paid:</strong> {l3 ? formatCurrency(l3.ftRate) : '&mdash;'} &times; 2.5 = {l3 ? formatCurrency(l3.publicHolidayFt) : '&mdash;'}/hr &times; 7.6hrs = {l3 ? formatCurrency(l3.publicHolidayFt * 7.6) : '&mdash;'} for the day
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Actually paid:</strong> {l3 ? formatCurrency(l3.ftRate) : '&mdash;'} &times; 7.6hrs = {l3 ? formatCurrency(l3.ftRate * 7.6) : '&mdash;'} (ordinary rate)
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment on a single public holiday: {l3 ? formatCurrency(l3.publicHolidayFt * 7.6 - l3.ftRate * 7.6) : '&mdash;'}
          </p>
        </div>
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
        <p style={pStyle}>Worked a public holiday? Check your payslip matches the award rate.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
      </section>

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
