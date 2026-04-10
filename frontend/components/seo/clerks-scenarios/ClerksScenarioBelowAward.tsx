/**
 * Scenario: Paid Below Award Rate — Clerks Award
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
  { question: 'Can my employer pay below the award if I agreed to it in my contract?', answer: 'No. The award sets the legal minimum. Any contract clause that pays less than the award is void. Even if you signed it voluntarily, you\'re entitled to the difference between what you were paid and what the award required.' },
  { question: 'My employer applied the wrong annual increase — what should I do?', answer: 'Ask for a written breakdown of your rate and how it was calculated. Compare it to the current Clerks Award pay guide effective 1 July 2025. If the rate is below the minimum for your classification level, raise it in writing and keep a copy.' },
  { question: 'What if I was below award for years but only just found out?', answer: 'You can recover up to 6 years of underpayments through the Fair Work Ombudsman. Start by calculating the gap for each pay period using your payslips and the award rates that applied at the time.' },
];

export default function ClerksScenarioBelowAward({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Being paid below the award minimum is illegal. Full stop. It doesn&apos;t matter what your contract says, what you agreed to verbally, or how small the business is. The Clerks Award sets a floor, and your employer must meet it for every hour you work.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The most common way clerks end up below award: their rate was correct when they started, but the annual increase wasn&apos;t applied, or their duties grew beyond their classification level.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>How it happens</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Year 1:</strong> Hired at Level 1, {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr. Correct at the time.
          </p>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Year 2:</strong> July increase raises Level 1 to $25.50. Employer doesn&apos;t update the rate. Gap: $0.77/hr &times; 38hrs = $29.26/week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Year 3:</strong> Now performing Level 2 duties (reception, scheduling, processing invoices). Still paid at the old Level 1 rate. Actual Level 2 rate is {l2 ? formatCurrency(l2.ftRate) : '&mdash;'}. Gap widens further each year.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Cumulative underpayment over 2 years: $4,400+
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Red flags to look for</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Your hourly rate hasn&apos;t changed since you were hired</li>
          <li style={{ marginBottom: '6px' }}>You were never told your classification level</li>
          <li style={{ marginBottom: '6px' }}>Your duties have expanded but your pay hasn&apos;t</li>
          <li style={{ marginBottom: '6px' }}>Your employer says &quot;we don&apos;t follow the award&quot; but can&apos;t show an enterprise agreement</li>
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
        <p style={pStyle}>Check your rate against the current Clerks Award minimum. It takes 2 minutes.</p>
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
