/**
 * High-intent: Is My Retail Pay Rate Legal?
 * URL: /awards/retail-award/hourly-rate-retail
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
  { question: 'What is the minimum hourly rate for retail in Australia?', answer: 'The minimum base rate depends on your classification level under the Retail Award. Level 1 (entry) is the lowest, while Level 8 is the highest. Casual employees receive an additional 25% casual loading on top of the base rate. Your actual minimum also depends on when you work — weekends and public holidays attract higher rates.' },
  { question: 'I\'m 18 — do I get paid less than an adult in retail?', answer: 'If you are under 21, junior rates may apply under the Retail Award. These are a percentage of the adult rate based on your age. At 18, the rate is 70% of the adult rate. Once you turn 21, you must be paid the full adult rate.' },
  { question: 'My employer says they pay above award — how do I check?', answer: 'Ask for a written breakdown showing which award rate they are comparing to, including your classification level, employment type, and any applicable penalty rates. An employer may pay above the weekday base rate but still underpay on Sundays or public holidays. The only way to know is to check every component.' },
];

export default function RetailIntentHourlyRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Your retail pay rate is legal only if it meets or exceeds the General Retail Industry Award minimum for your classification level, employment type, and the day and time you work. There is no single &quot;legal rate&quot; for retail &mdash; it depends on at least four factors, and getting any one of them wrong means you&apos;re underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you don&apos;t know your classification level, start there. That single number determines your entire pay structure.
        </p>
        <p style={pStyle}>
          See the full <a href="/awards/retail-award/pay-rates" style={linkStyle}>Retail Award pay rates</a> table.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>How to check your rate</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Step 1:</strong> Find your classification level on your payslip or employment contract (Level 1 through Level 8).
          </p>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Step 2:</strong> Determine your employment type &mdash; full-time, part-time, or casual.
          </p>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Step 3:</strong> Check the award rate for your level, type, and each day you work. Weekdays, Saturdays, Sundays, and public holidays all have different minimum rates.
          </p>
          <p style={smallStyle}>
            If any single shift falls below the award minimum for that specific day and time, you are being underpaid for that shift &mdash; even if your average looks fine.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common issues with retail hourly rates</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Wrong classification level:</strong> You&apos;re doing Level 3 work but paid at Level 1.</li>
          <li><strong>Missing casual loading:</strong> The 25% casual loading is not applied.</li>
          <li><strong>Junior rates applied after 21:</strong> You&apos;ve turned 21 but your rate hasn&apos;t increased to the adult rate.</li>
          <li><strong>Flat rate ignoring penalties:</strong> One rate for every day, ignoring Saturday, Sunday, and public holiday loadings.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Enter your details into the calculator below to see your exact legal minimum.</li>
          <li style={{ marginBottom: '8px' }}>Compare it to your payslip line by line.</li>
          <li style={{ marginBottom: '8px' }}>If there&apos;s a gap, raise it with your employer or call Fair Work on 13 13 94.</li>
        </ol>
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
        <p style={pStyle}>Check your rate is legal &mdash; it takes 2 minutes.</p>
        <p style={smallStyle}>Based on official pay rates from the Fair Work Commission (MA000004).</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the General Retail Industry Award 2020 (MA000004), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
