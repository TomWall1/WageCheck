/**
 * High-intent: Is My Cleaning Pay Rate Legal?
 * URL: /awards/cleaning-award/cleaning-hourly-rate
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
  { question: 'What is the minimum hourly rate for a cleaner in Australia?', answer: 'Under the Cleaning Services Award, the minimum base rate for an adult full-time or part-time cleaner (Level 1) is the rate set by the Fair Work Commission, updated each July. Casuals receive an additional 25% loading on top. If you earn less than these minimums, you are being underpaid.' },
  { question: 'Does my hourly rate change on weekends?', answer: 'Yes. Saturday work attracts a 150% rate (time-and-a-half) for full-time and part-time workers. Sunday is 200% (double time). These penalty rates are not optional — they are part of the legal minimum. Casuals receive these penalties on top of their casual loading.' },
  { question: 'I earn $25/hr as a casual cleaner — is that legal?', answer: 'Almost certainly not. The casual minimum for a Level 1 cleaner is the base rate plus 25% casual loading — well above $25/hr. You could be underpaid by several dollars per hour. Over a 20-hour week, the shortfall adds up to thousands per year in stolen wages.' },
];

export default function CleaningIntentHourlyRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re earning between $24 and $26 per hour as a cleaner, you need to check whether that rate is actually legal. It depends on your employment type. For permanent (full-time or part-time) cleaners, the Level 1 base rate is approximately {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr. For casuals, the minimum is approximately {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr because of the 25% casual loading.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A rate of $25/hr is legal for a permanent cleaner but illegal for a casual &mdash; the casual minimum is {l1 ? formatCurrency(l1.casualRate) : '~$30.91'}/hr. Know which one you are.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Quick rate check</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}><strong>Full-time/part-time Level 1:</strong> ~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr base</li>
            <li style={{ marginBottom: '6px' }}><strong>Full-time/part-time Level 2:</strong> ~{l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr base</li>
            <li style={{ marginBottom: '6px' }}><strong>Full-time/part-time Level 3:</strong> ~{l3 ? formatCurrency(l3.ftRate) : '&mdash;'}/hr base</li>
            <li style={{ marginBottom: '6px' }}><strong>Casual Level 1:</strong> ~{l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr (includes 25% loading)</li>
            <li style={{ marginBottom: '6px' }}><strong>Casual Level 2:</strong> ~{l2 ? formatCurrency(l2.casualRate) : '&mdash;'}/hr (includes 25% loading)</li>
            <li style={{ marginBottom: '6px' }}><strong>Casual Level 3:</strong> ~{l3 ? formatCurrency(l3.casualRate) : '&mdash;'}/hr (includes 25% loading)</li>
          </ul>
        </div>
        <p style={pStyle}>
          These are <strong>base rates only</strong>. Weekday rates. If you work evenings, weekends, or public holidays, the rate must be higher. If your employer pays a flat rate regardless of when you work, they are almost certainly underpaying you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Red flags</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You&apos;re paid the same rate whether you work Tuesday or Sunday</li>
          <li style={{ marginBottom: '6px' }}>Your rate hasn&apos;t changed since you started the job</li>
          <li style={{ marginBottom: '6px' }}>You&apos;re a casual but your rate is below {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr</li>
          <li style={{ marginBottom: '6px' }}>You clean specialised environments (medical, industrial) but get the same rate as general cleaning</li>
          <li style={{ marginBottom: '6px' }}>Your employer deducts money for equipment, uniforms, or &quot;insurance&quot;</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Confirm your employment type.</strong> Are you casual, part-time, or full-time? Check your contract or payslip.</li>
          <li style={{ marginBottom: '8px' }}><strong>Check your classification.</strong> Level 1 is general cleaning. Level 2 involves specialised equipment. Level 3 is supervisory work.</li>
          <li style={{ marginBottom: '8px' }}><strong>Run the numbers.</strong> Use the calculator below to compare your actual pay to the legal minimum.</li>
        </ol>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
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
        <p style={pStyle}>Stop guessing. Enter your details and find out in 2 minutes.</p>
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
