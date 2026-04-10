/**
 * Clerks Award — Data Entry Operator role page
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
  { question: 'I was hired for data entry but now I also clean up databases and run reports. What level am I?', answer: 'If you\'re identifying and correcting errors, running reports, cross-referencing data across systems, or making decisions about how to categorise information, those are Level 2 duties at minimum. Straight copy-typing with no interpretation is Level 1. The moment you apply judgement or work without step-by-step instructions, you\'ve moved beyond Level 1.' },
  { question: 'My employer says data entry operators don\'t qualify for overtime because the work is "task-based." Is that right?', answer: 'No. The Clerks Award doesn\'t have a task-based exemption. Overtime applies after 7.6 hours per day or 38 hours per week for full-time employees. If you\'re expected to finish a batch before you leave — even if that takes you past your rostered hours — those extra hours are overtime and must be paid at time-and-a-half (first 3 hours) then double time.' },
  { question: 'I\'m a casual data entry operator. Do I get overtime too?', answer: 'Yes. Casual employees under the Clerks Award receive overtime after 38 hours per week or 7.6 hours per day. Overtime is calculated on your base rate (not including casual loading). So you\'d receive your base rate x 1.5 for the first 3 overtime hours, then base rate x 2 — on top of the work already being casual.' },
  { question: 'My pay hasn\'t changed in two years but I\'m still above the minimum. Does the award still apply to me?', answer: 'The award sets a floor, not a ceiling. If you were hired above the minimum, your employer isn\'t required to give you annual increases unless your rate falls below the new minimum each July. However, if your duties have expanded — from basic entry to data validation, reporting, or system administration — you may be entitled to a higher classification level regardless.' },
];

export default function ClerksDataEntryContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Data entry operators are one of the most commonly misclassified roles under the Clerks Award. The pattern is simple: you&apos;re hired to type numbers into a spreadsheet, but within weeks you&apos;re also verifying data, running reports, updating databases, and fixing errors. Your duties have moved from Level 1 to Level 2. Your pay hasn&apos;t.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you do anything beyond pure copy-typing, you&apos;re not Level 1 anymore. Your pay rate should reflect the work you actually do.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Data entry classification under the Clerks Award</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}><strong>Level 1:</strong> Routine data entry from source documents, copy-typing, basic keyboard work under close supervision with clear instructions for every task</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 2:</strong> Data entry requiring interpretation or judgement, verifying and correcting data, maintaining spreadsheets or databases, generating standard reports, working under general (not close) supervision</li>
          </ul>
        </div>
        <p style={pStyle}>
          The key distinction is judgement. Level 1 means you&apos;re copying exactly what&apos;s in front of you. Level 2 means you&apos;re making decisions &mdash; what to enter, how to categorise it, whether something looks wrong. Most data entry operators cross that line within their first few weeks.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Trigger moments: when your classification should change</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You start checking data for errors or inconsistencies before entering it</li>
          <li style={{ marginBottom: '6px' }}>You&apos;re asked to run reports, exports, or summaries from the data you enter</li>
          <li style={{ marginBottom: '6px' }}>You update or maintain databases, CRM systems, or spreadsheet templates</li>
          <li style={{ marginBottom: '6px' }}>You categorise, code, or sort information using your own judgement</li>
          <li style={{ marginBottom: '6px' }}>You work without someone checking every entry before you submit it</li>
        </ul>
        <p style={pStyle}>
          If any of these describe your day, you&apos;re performing Level 2 duties. Your pay should match.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayments for data entry operators</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Classified below actual duties:</strong> Level 1 pay for Level 2 work &mdash; typically $1.50&ndash;$3/hr below what you should earn, or $3,000&ndash;$6,000/year for full-time</li>
          <li style={{ marginBottom: '6px' }}><strong>No overtime paid:</strong> Expected to &quot;finish the batch&quot; before leaving, even if it takes 8.5 or 9 hours &mdash; unpaid overtime of 30 minutes/day adds up to $3,000&ndash;$5,000/year</li>
          <li style={{ marginBottom: '6px' }}><strong>Missed rest breaks:</strong> Data entry is intensive screen work. You&apos;re entitled to paid rest breaks &mdash; 10 minutes per 4 hours. Skipping them doesn&apos;t save the employer money, but it costs you your health</li>
          <li style={{ marginBottom: '6px' }}><strong>Flat rate for all hours:</strong> Saturday and Sunday work must be paid at penalty rates, even if the work is identical to weekday tasks</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Real-world example</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Data entry operator at a logistics company, Sydney</h3>
          <p style={{ ...smallStyle, marginBottom: '8px' }}>
            Hired as Level 1 to enter delivery records. Within a month, he was cross-referencing manifests against invoices, flagging discrepancies, updating the tracking database, and generating weekly reports for the operations manager. All Level 2 duties. He also regularly stayed 30&ndash;45 minutes past his shift to finish the day&apos;s batch with no overtime recorded.
          </p>
          <p style={{ ...smallStyle, fontWeight: 600, marginBottom: 0 }}>
            Estimated underpayment: ~$7,500/year from misclassification and unpaid overtime combined.
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
