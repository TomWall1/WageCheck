/**
 * Scenario: Wrong Classification Level — Clerks Award
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
  { question: 'My employer never told me my classification level — what level am I?', answer: 'Your classification is determined by the duties you actually perform, not what your employer assigns you. Look at the Clerks Award classification descriptors for Levels 1 through 5 and match your daily tasks. If you process invoices, manage accounts, or handle complex correspondence, you\'re likely Level 3 or above — even if your employer has you listed as Level 1.' },
  { question: 'Can I be classified at different levels for different tasks?', answer: 'No. You should be classified at the level that best reflects the majority of your duties and the highest level of skill required by your role. If 60% of your work is Level 3 tasks and 40% is Level 2, you should be classified at Level 3.' },
  { question: 'My duties changed 6 months ago but my pay didn\'t — can I backdate the increase?', answer: 'Yes. If you\'ve been performing higher-level duties since a specific date and your pay wasn\'t adjusted, you\'re owed the difference from the date those duties started. Keep records of when you took on the new responsibilities.' },
];

export default function ClerksScenarioClassification({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          The Clerks Award has 5 classification levels. Each level has a different minimum hourly rate. If you&apos;re classified at the wrong level, every single hour you work is underpaid. This is one of the most expensive errors under the Clerks Award because it affects your base rate, your overtime rate, your penalty rates &mdash; everything.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Your classification is based on the work you actually do, not the title your employer gave you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common misclassifications</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 1 pay for Level 3 work</h3>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            You were hired to do filing and data entry (Level 1). Six months later, you&apos;re processing invoices, managing accounts receivable, preparing management reports, and coordinating schedules. That&apos;s Level 3 work. The rate difference is $3&ndash;$5/hr.
          </p>
          <h3 style={h3Style}>Level 2 pay for Level 4 work</h3>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            You&apos;re the office manager. You supervise other staff, run payroll, manage budgets, and handle HR administration. That&apos;s Level 4 or above. If you&apos;re still classified at Level 2, the gap is $5&ndash;$8/hr &mdash; over $10,000/year on a 38-hour week.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to determine your correct level</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Write down everything you do in a typical week</li>
          <li style={{ marginBottom: '6px' }}>Compare your duties to the Clerks Award classification descriptors</li>
          <li style={{ marginBottom: '6px' }}>Focus on the highest-level duties you regularly perform</li>
          <li style={{ marginBottom: '6px' }}>If you supervise others, you&apos;re at least Level 4</li>
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
        <p style={pStyle}>Not sure about your classification? Enter your details and we&apos;ll show you the minimum rate for your level.</p>
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
