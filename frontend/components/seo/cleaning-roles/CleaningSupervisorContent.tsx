/**
 * Cleaning Award — Supervisor role page
 * Cleaning Supervisor Pay Rates 2025–26
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
  { question: 'When does a cleaner become a supervisor under the award?', answer: 'You\'re a cleaning supervisor (Level 3) when you direct, coordinate, or oversee the work of other cleaning employees. This includes allocating tasks, checking work quality, managing rosters for your team, training new cleaners, and being responsible for a building or site. If other cleaners report to you, you\'re a supervisor.' },
  { question: 'I supervise cleaners but I\'m still paid Level 1 rates — can I claim back pay?', answer: 'Yes. If you\'ve been performing Level 3 supervisory duties while paid at Level 1 or Level 2, you can claim the difference going back up to 6 years. The gap between levels can add up to thousands per year in underpayment.' },
  { question: 'Do cleaning supervisors get overtime?', answer: 'Yes. Supervisors are entitled to overtime on the same basis as other cleaners — after 7.6 hours/day or 38 hours/week. The first 2 hours at 1.5x, then double time. Supervisors often work extra hours coordinating teams and handling issues, and these hours must be paid as overtime.' },
];

export default function CleaningSupervisorContent({ rates }: { rates?: AwardRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cleaning supervisors are classified at Level 3 under the Cleaning Services Award. If you manage a team of cleaners, allocate work across a site, train new staff, or are responsible for quality on a building &mdash; you&apos;re a supervisor. Many cleaning companies promote workers to supervisory roles without adjusting their pay, which is a classification-based underpayment.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you direct other cleaners&apos; work, you are Level 3. Level 1 or Level 2 pay for supervisory duties is underpayment.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Supervisor classification &mdash; Level 3</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>Level 3 applies when your duties include any of the following:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Directing and coordinating the work of other cleaning employees</li>
            <li style={{ marginBottom: '6px' }}>Allocating tasks and managing workflows across a site</li>
            <li style={{ marginBottom: '6px' }}>Training and inducting new cleaners</li>
            <li style={{ marginBottom: '6px' }}>Inspecting and signing off on completed work</li>
            <li style={{ marginBottom: '6px' }}>Managing cleaning supplies, equipment, and inventory for a site</li>
            <li style={{ marginBottom: '6px' }}>Being the primary point of contact for clients on site</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Supervisor pay rates</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Full-time/part-time base: <strong>~{l3 ? formatCurrency(l3.ftRate) : '&mdash;'}/hr</strong></li>
            <li style={{ marginBottom: '6px' }}>Casual (incl. 25% loading): <strong>~{l3 ? formatCurrency(l3.casualRate) : '&mdash;'}/hr</strong></li>
            <li style={{ marginBottom: '6px' }}>Saturday: <strong>~{l3 ? formatCurrency(l3.saturdayFt) : '&mdash;'}/hr</strong> (1.5&times;) permanent / <strong>~{l3 ? formatCurrency(l3.saturdayCasual) : '&mdash;'}/hr</strong> casual</li>
            <li style={{ marginBottom: '6px' }}>Sunday: <strong>~{l3 ? formatCurrency(l3.sundayFt) : '&mdash;'}/hr</strong> (2&times;) permanent</li>
            <li style={{ marginBottom: '6px' }}>Public holiday: <strong>~{l3 ? formatCurrency(l3.publicHolidayFt) : '&mdash;'}/hr</strong> (2.5&times;) permanent</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayment patterns for supervisors</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Paid as Level 1:</strong> Still on general cleaner rates despite managing a team &mdash; ~$1.90/hr gap, $3,754/year</li>
          <li style={{ marginBottom: '6px' }}><strong>Unpaid coordination time:</strong> Time spent on phone calls, emails, and admin before/after shifts not recorded</li>
          <li style={{ marginBottom: '6px' }}><strong>No overtime:</strong> Supervisors often start early and finish late to manage teams, but extra hours go unpaid</li>
          <li style={{ marginBottom: '6px' }}><strong>Flat salary:</strong> A weekly salary that doesn&apos;t cover overtime, penalties, or the Level 3 rate</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Cleaning supervisor, manages 6 cleaners across 3 sites. Works 42 hours/week (Mon&ndash;Fri plus Saturday morning). Employer pays Level 1 rate for all hours, no overtime.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they pay:</strong> 42 &times; $24.73 = $1,038.66 (using Level 1 rate)
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Correct calculation:</strong> 38 weekday hours &times; {l3 ? formatCurrency(l3.ftRate) : '&mdash;'} = {l3 ? formatCurrency(l3.ftRate * 38) : '&mdash;'}. Plus 2 hours OT &times; {l3 ? formatCurrency(l3.saturdayFt) : '&mdash;'} (1.5&times;) = {l3 ? formatCurrency(l3.saturdayFt * 2) : '&mdash;'}. Plus 2 Saturday hours &times; {l3 ? formatCurrency(l3.saturdayFt) : '&mdash;'} (1.5&times;) = {l3 ? formatCurrency(l3.saturdayFt * 2) : '&mdash;'}.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Should be: {l3 ? formatCurrency(l3.ftRate * 38 + l3.saturdayFt * 4) : '&mdash;'}. Getting $1,038.66. Underpaid {l3 ? formatCurrency(l3.ftRate * 38 + l3.saturdayFt * 4 - 1038.66) : '&mdash;'}/week &mdash; {l3 ? formatCurrency((l3.ftRate * 38 + l3.saturdayFt * 4 - 1038.66) * 52) : '&mdash;'}/year.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>If you manage other cleaners, make sure your pay reflects it.</p>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Cleaning Services Award 2020 (MA000022), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
