/**
 * Retail Award — Supervisor role page
 * Rates: FWO pay guide MA000004
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
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'What classification level is a retail supervisor?', answer: 'Supervisors in retail typically fall under Level 4 or higher of the Retail Award. Level 4 covers employees who supervise staff within a section or department. If you manage an entire store or multiple departments, you may be classified higher. Your actual duties, not your job title, determine your level.' },
  { question: 'I manage the store on weekends but I am paid Level 1 rates. Is that right?', answer: 'No. If you are performing supervisory duties, managing staff, handling escalations, and making operational decisions, you are not a Level 1 employee. Your employer must classify you based on the work you actually do. Being the sole person in charge of a store is supervisory work.' },
  { question: 'I do not get overtime even though I regularly work 42+ hours. Why?', answer: 'If you are a full-time employee, overtime applies after 38 hours per week (or after your ordinary hours per day). If your payslip does not show overtime for hours above 38 per week, your employer is not applying it. Supervisors are not exempt from overtime under the Retail Award.' },
];

export default function RetailSupervisorContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 22.61;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Retail supervisors are frequently underpaid because employers classify them at a lower level than their duties warrant. If you manage staff, open or close the store, handle customer complaints, or make ordering decisions, you are performing work above Level 1 &mdash; and your pay should reflect that.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The gap between Level 1 and Level 4 is significant &mdash; and it multiplies on weekends, evenings, and public holidays.
        </p>
        <p style={pStyle}>
          For the full Retail Award overview, see the <a href="/awards/retail-award/" style={linkStyle}>Retail Award pay guide</a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time retail supervisor classified as Level 1. Works 40 hours/week including Saturday. Paid {formatCurrency(baseRate)}/hr flat rate.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Should be classified at Level 4 or higher based on duties</li>
            <li>Level 4 base rate is higher than Level 1</li>
            <li>2 hours per week overtime (38+2) not being paid</li>
            <li>Saturday penalty rate not applied</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Combined underpayment from wrong classification, missing overtime, and missing Saturday rate: $150&ndash;$200+ per week.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common underpayments for retail supervisors</h2>
          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={pStyle}>
            This is the biggest issue. Employers classify supervisors at Level 1 or 2 despite them performing Level 4+ duties. The base rate difference alone adds up to thousands per year.
          </p>
          <h3 style={h3Style}>Unpaid overtime</h3>
          <p style={pStyle}>
            Supervisors are not exempt from overtime under the Retail Award. If you regularly stay late to close or come in early to open, every hour beyond your ordinary hours should be overtime.
          </p>
          <h3 style={h3Style}>Salaried but below the award</h3>
          <p style={pStyle}>
            Some supervisors are put on a salary. That salary must still meet or exceed what you would receive under the award when all hours, penalties, and overtime are calculated. Many retail salaries fall short.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>What classification level are you listed as?</li>
          <li>Does your base rate match that level (or higher)?</li>
          <li>Are you paid overtime for hours beyond 38 per week?</li>
          <li>Are weekend and evening penalty rates applied?</li>
          <li>If salaried, does your salary cover all award entitlements when broken down hourly?</li>
        </ul>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
        <p style={pStyle}>Don&apos;t guess &mdash; enter your shifts and find out in 2 minutes.</p>
        <p style={smallStyle}>Based on official pay rates from the Fair Work Commission (MA000004).</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
