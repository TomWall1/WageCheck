/**
 * Scenario: Overtime Not Paid — Clerks Award
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
  { question: 'Does working through my lunch break count as overtime?', answer: 'If you\'re required to work through your unpaid meal break, that time counts as hours worked. If it pushes you beyond 7.6 hours in the day or 38 hours in the week, those extra hours are overtime and must be paid at penalty rates.' },
  { question: 'My employer says overtime must be pre-approved — can they refuse to pay it?', answer: 'If you worked the hours and the employer knew about it or benefited from it, the hours must be paid regardless of whether they were formally approved. An employer cannot direct you to work overtime and then refuse to pay it because no one signed a form.' },
  { question: 'I\'m a part-time clerk — when does my overtime start?', answer: 'Part-time overtime under the Clerks Award starts when you exceed your agreed ordinary hours in a day or week, or when you work outside your agreed span of hours. You don\'t need to reach 38 hours before overtime kicks in — it\'s based on your contract, not full-time hours.' },
];

export default function ClerksScenarioOvertimeNotPaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Unpaid overtime is the single most common underpayment under the Clerks Award. It doesn&apos;t look dramatic &mdash; it&apos;s 20 minutes here, half an hour there. Staying back to finish a report. Starting early to set up the office. Answering emails at home. None of it gets recorded, none of it gets paid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Under the Clerks Award, overtime is payable after 7.6 hours per day or 38 hours per week. First 3 hours at 1.5&times;, then 2&times;.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Level 2 clerk, base rate ~{l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr. Works 30 minutes extra each day, 5 days/week. None of it recorded as overtime.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Weekly overtime missed:</strong> 2.5 hours &times; {l2 ? formatCurrency(l2.ftRate * 1.5) : '&mdash;'}/hr (1.5&times;) = {l2 ? formatCurrency(l2.ftRate * 1.5 * 2.5) : '&mdash;'}/week
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Annual cost: {l2 ? formatCurrency(l2.ftRate * 1.5 * 2.5 * 52) : '&mdash;'} in unpaid overtime
          </p>
          <p style={smallStyle}>
            That&apos;s from just 30 minutes per day. Many clerks work 45&ndash;50 minutes extra without thinking twice about it.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Is there a separate overtime rate line?</li>
          <li style={{ marginBottom: '6px' }}>Does the total hours match your actual hours, including early starts and late finishes?</li>
          <li style={{ marginBottom: '6px' }}>If you&apos;re salaried, has your employer provided a written calculation showing the salary covers overtime?</li>
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
        <p style={pStyle}>Track your actual start and finish times for a week. Then run the numbers.</p>
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
