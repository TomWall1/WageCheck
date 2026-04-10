/**
 * High-intent: Am I Being Underpaid Under the Clerks Award?
 * URL: /awards/clerks-award/underpaid-clerks
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
  { question: 'I work in an office — does the Clerks Award even apply to me?', answer: 'If you perform clerical, administrative, or office support work and your employer isn\'t covered by a more specific enterprise agreement, the Clerks Award almost certainly applies. It covers admin assistants, receptionists, data entry operators, accounts clerks, and similar roles across nearly every industry.' },
  { question: 'My employer says I\'m on a salary so the award doesn\'t apply — is that true?', answer: 'No. Being salaried does not exempt your employer from the Clerks Award. Your salary must equal or exceed what you would earn under the award for all hours worked, including overtime and penalty rates. Many salaried clerks are underpaid once overtime hours are factored in.' },
  { question: 'Can I recover underpayments from previous years?', answer: 'Yes. The Fair Work Ombudsman can recover underpayments going back up to 6 years. If you\'ve been underpaid at the wrong classification level or missing overtime rates, the cumulative amount can be substantial.' },
];

export default function ClerksIntentUnderpaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Most office workers don&apos;t think of themselves as &quot;award-covered.&quot; They assume awards are for hospitality or retail. That assumption costs thousands of people real money every year. The Clerks &mdash; Private Sector Award covers admin assistants, receptionists, data entry operators, accounts clerks, and most other office support roles in private businesses across Australia.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you do admin, reception, or data entry work and you&apos;re not sure what award you&apos;re on &mdash; it&apos;s probably the Clerks Award.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time admin assistant, classified Level 2, works 40 hours per week. Employer pays a flat salary of $950/week with no overtime rate for the extra 2 hours above the 38-hour standard week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> 2 hours of overtime per week at time-and-a-half are not being paid &mdash; that&apos;s roughly $45/week missing.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> After 12 months performing Level 3 duties (accounts reconciliation, report preparation), they should have been reclassified upward.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Combined underpayment: $70+ per week across two separate errors.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Small offices often set a &quot;salary&quot; that seems reasonable but doesn&apos;t account for overtime or classification progression under the award.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Signs you might be underpaid</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You regularly work more than 38 hours but your pay never changes</li>
          <li style={{ marginBottom: '6px' }}>Your job title changed or your duties expanded but your pay didn&apos;t</li>
          <li style={{ marginBottom: '6px' }}>You&apos;ve been at the same rate for years with no classification review</li>
          <li style={{ marginBottom: '6px' }}>You work Saturdays occasionally but get paid your normal hourly rate</li>
          <li style={{ marginBottom: '6px' }}>Your employer says you&apos;re &quot;award-free&quot; but can&apos;t show you an enterprise agreement</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do next</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the gap.</strong> Enter your actual hours and shifts below to see what the Clerks Award says you should earn.</li>
          <li style={{ marginBottom: '8px' }}><strong>Talk to your employer.</strong> Most office underpayments are genuine oversights, not deliberate. A clear calculation usually resolves it.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact Fair Work.</strong> If your employer won&apos;t fix it, call 13 13 94. The FWO can investigate and compel back payment.</li>
        </ol>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
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
        <p style={pStyle}>Don&apos;t assume your pay is right because it&apos;s a salary. Check it in 2 minutes.</p>
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
