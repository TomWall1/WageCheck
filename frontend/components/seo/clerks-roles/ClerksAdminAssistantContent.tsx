/**
 * Clerks Award — Admin Assistant role page
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
  { question: 'I\'m an admin assistant but I also do bookkeeping — what level am I?', answer: 'If you handle bookkeeping duties like processing invoices, bank reconciliation, or managing accounts payable/receivable, you\'re performing Level 3 work at minimum. Many admin assistants are paid at Level 1 or 2 while doing Level 3 or even Level 4 tasks. Your classification must reflect the duties you actually perform.' },
  { question: 'My job ad said "admin assistant" but I run the entire office — does that matter?', answer: 'The job title is irrelevant. What matters is the work you do. If you manage other staff, handle budgets, coordinate across departments, or make operational decisions, those are Level 4 or 5 duties. The title "admin assistant" doesn\'t limit your classification.' },
  { question: 'Do admin assistants get overtime under the Clerks Award?', answer: 'Yes. Overtime applies after 7.6 hours per day or 38 hours per week. The first 3 hours are at time-and-a-half, then double time. If you regularly stay back to finish tasks, answer calls after hours, or start early to prepare the office, those hours must be recorded and paid as overtime.' },
];

export default function ClerksAdminAssistantContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Admin assistants are the backbone of most offices. They&apos;re also one of the most commonly underpaid roles under the Clerks Award. The problem is straightforward: most admin assistants are hired at Level 1 or Level 2 rates but quickly take on duties that belong to Level 3 or higher. Filing turns into accounts processing. Answering phones turns into managing the office. The duties expand, but the pay doesn&apos;t.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your role has grown beyond what you were originally hired for, your pay should have grown too.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Typical admin assistant classification</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}><strong>Level 1:</strong> Basic filing, photocopying, simple data entry under direct supervision</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 2:</strong> Reception duties, scheduling, processing standard forms, general admin with some autonomy</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 3:</strong> Invoicing, accounts processing, report preparation, complex correspondence, coordinating calendars</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 4:</strong> Office management, supervising other staff, budget management, payroll</li>
          </ul>
        </div>
        <p style={pStyle}>
          Most experienced admin assistants fall at Level 2 or Level 3. If you handle any financial tasks, scheduling coordination, or correspondence drafting, you&apos;re Level 3 minimum.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayments for admin assistants</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Wrong classification:</strong> Level 1 pay for Level 3 duties &mdash; $3&ndash;$5/hr gap, $6,000&ndash;$10,000/year</li>
          <li style={{ marginBottom: '6px' }}><strong>Unpaid overtime:</strong> Staying 20&ndash;30 minutes extra daily without overtime pay &mdash; $3,000&ndash;$5,000/year</li>
          <li style={{ marginBottom: '6px' }}><strong>No annual increase:</strong> Rate frozen since hire while the award minimum increased each July</li>
          <li style={{ marginBottom: '6px' }}><strong>Saturday work at weekday rates:</strong> Common in real estate, medical, and professional services offices</li>
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
        <p style={pStyle}>Enter your duties and hours. Find out in 2 minutes if you&apos;re being paid correctly.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Clerks &mdash; Private Sector Award 2020 (MA000002), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
