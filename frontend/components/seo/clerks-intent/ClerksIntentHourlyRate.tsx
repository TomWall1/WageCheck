/**
 * High-intent: What Is My Hourly Rate Under the Clerks Award?
 * URL: /awards/clerks-award/hourly-rate-clerks
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
  { question: 'How do I know which classification level I am?', answer: 'Your classification depends on the duties you actually perform, not your job title. Level 1 covers basic clerical tasks under supervision. Level 2 includes regular clerical work with some autonomy. Level 3 involves applying knowledge to more complex tasks. Level 4 and above cover supervisory or specialist roles. If your duties have expanded since you started, your level should have too.' },
  { question: 'Is the casual rate the same as the permanent rate plus 25%?', answer: 'Yes. The casual loading under the Clerks Award is 25% on top of the ordinary hourly rate. This compensates for the lack of paid leave, notice periods, and redundancy entitlements. But penalty rates for weekends and overtime still apply on top of the casual rate.' },
  { question: 'My employer pays me above the Level 1 rate — does that mean I\'m fine?', answer: 'Not necessarily. If you\'re performing Level 2 or Level 3 duties, you need to be paid at or above that level\'s rate. Being paid $1 above Level 1 doesn\'t satisfy the award if your actual duties put you at Level 3.' },
];

export default function ClerksIntentHourlyRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Your hourly rate under the Clerks Award depends on two things: your classification level (1 through 5) and your employment type (full-time, part-time, or casual). The classification is based on the duties you actually do, not the title on your contract.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve never been told your classification level, there&apos;s a good chance you&apos;re being paid at the wrong one.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How classification levels work</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}><strong>Level 1:</strong> Basic clerical duties under close supervision &mdash; filing, photocopying, simple data entry</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 2:</strong> Regular clerical duties with some autonomy &mdash; answering phones, processing standard paperwork, reception</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 3:</strong> Applying specialist knowledge &mdash; bookkeeping, accounts payable/receivable, complex correspondence, scheduling</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 4:</strong> Supervisory or technical work &mdash; managing other clerks, complex reporting, payroll administration</li>
            <li style={{ marginBottom: '6px' }}><strong>Level 5:</strong> Advanced specialist or management duties</li>
          </ul>
        </div>
        <p style={pStyle}>
          Most admin assistants and receptionists sit at Level 2 or Level 3. If you handle any bookkeeping, payroll, or accounts work, you&apos;re almost certainly Level 3 or above.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The cost of being at the wrong level</h2>
        <p style={pStyle}>
          The gap between Level 1 and Level 3 is roughly $3&ndash;$5 per hour. On a 38-hour week, that&apos;s $114&ndash;$190 per week. Over a year, $5,900&ndash;$9,900. Many clerks are hired at Level 1 rates and never reclassified even as their duties expand significantly.
        </p>
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
        <p style={pStyle}>Enter your role details and find out your exact minimum hourly rate in under 2 minutes.</p>
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
