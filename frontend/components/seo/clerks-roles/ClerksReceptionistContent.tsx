/**
 * Clerks Award — Receptionist role page
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
  { question: 'I answer phones but also manage calendars and order supplies — am I still Level 2?', answer: 'Probably not. If you coordinate schedules across multiple staff, manage office supplies and vendor relationships, handle correspondence, or process invoices, those are Level 3 duties. Your classification is based on what you actually do, not your job title. Many receptionists are performing Level 3 work while being paid at Level 2.' },
  { question: 'My employer says receptionists don\'t get overtime because it\'s part of the role. Is that true?', answer: 'No. Under the Clerks Award, overtime applies after 7.6 hours per day or 38 hours per week for full-time employees. If you open the office early, stay late to lock up, or work through lunch because you can\'t leave the front desk, those extra hours must be paid at overtime rates — time-and-a-half for the first 3 hours, then double time.' },
  { question: 'I work every second Saturday at normal rates. Is that correct?', answer: 'No. Saturday work attracts a 150% penalty rate (time-and-a-half) under the Clerks Award for full-time and part-time employees. If you\'ve been paid at your ordinary hourly rate for Saturday shifts, you\'ve been underpaid. This is especially common in medical practices, real estate agencies, and retail offices.' },
  { question: 'I\'m a casual receptionist — do I still get penalty rates on top of the casual loading?', answer: 'Yes. Casual employees receive their base rate plus 25% casual loading, and penalty rates apply on top of that. Saturday work for casuals is 175% of the base rate. Sunday is 200%. If your employer only pays the casual loading without weekend penalties, that\'s an underpayment.' },
];

export default function ClerksReceptionistContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Receptionists are the first point of contact for every business, yet they&apos;re routinely underpaid. The two most common problems: being classified at Level 1 or Level 2 when the actual duties are Level 3, and not being paid penalty rates for Saturday shifts. If you&apos;re doing more than answering a phone and greeting visitors, your pay should reflect that.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Your job title says &quot;receptionist.&quot; Your duties might say Level 3. Your pay should match the duties.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Where receptionists sit in the Clerks Award</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}><strong>Level 2:</strong> Answering and directing calls, greeting visitors, basic filing, sorting mail, simple data entry, operating office equipment under general supervision</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 3:</strong> Managing appointment calendars, processing invoices, drafting correspondence, coordinating meetings, ordering supplies and managing vendor accounts, handling confidential information</li>
          </ul>
        </div>
        <p style={pStyle}>
          Most receptionists start at Level 2 duties but within months are handling Level 3 tasks. The moment you&apos;re coordinating calendars, processing payments, or managing office accounts, you should be classified &mdash; and paid &mdash; at Level 3.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Trigger moments: when your pay should go up</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You start managing appointment bookings or calendars for multiple staff</li>
          <li style={{ marginBottom: '6px' }}>You&apos;re asked to process invoices, receipts, or petty cash</li>
          <li style={{ marginBottom: '6px' }}>You draft letters, emails, or documents on behalf of the business</li>
          <li style={{ marginBottom: '6px' }}>You coordinate meetings, room bookings, or travel</li>
          <li style={{ marginBottom: '6px' }}>You train or supervise other reception staff</li>
        </ul>
        <p style={pStyle}>
          Any of these means your duties have moved beyond Level 2. Your employer should reclassify you and adjust your rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayments for receptionists</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Misclassification:</strong> Level 2 pay for Level 3 duties &mdash; typically $2&ndash;$4/hr below what you should earn, or $4,000&ndash;$8,000/year</li>
          <li style={{ marginBottom: '6px' }}><strong>No overtime for extra hours:</strong> Opening early or closing late without overtime &mdash; 20 minutes a day adds up to $2,500&ndash;$4,000/year</li>
          <li style={{ marginBottom: '6px' }}><strong>Saturday rates missed:</strong> Working Saturdays at ordinary rates instead of 150% &mdash; one Saturday shift per fortnight at flat rates costs you $2,000&ndash;$3,000/year</li>
          <li style={{ marginBottom: '6px' }}><strong>Skipped annual increases:</strong> The award minimum goes up every July &mdash; if your rate hasn&apos;t changed since you started, you may be below the current minimum</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Real-world example</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Medical practice receptionist, Melbourne</h3>
          <p style={{ ...smallStyle, marginBottom: '8px' }}>
            Hired as a Level 2 receptionist. Within 3 months, she was managing patient appointment calendars for 4 doctors, processing Medicare claims, handling accounts receivable, and training a new receptionist. All Level 3 duties. She also worked every second Saturday at her weekday rate.
          </p>
          <p style={{ ...smallStyle, fontWeight: 600, marginBottom: 0 }}>
            Estimated underpayment: ~$8,500/year from misclassification and missed Saturday penalties combined.
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
