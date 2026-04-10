/**
 * High-intent: Am I Being Underpaid in Retail?
 * URL: /awards/retail-award/underpaid-retail
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
  { question: 'I get paid above minimum wage — can I still be underpaid?', answer: 'Yes. The minimum wage is not the same as your award rate. Under the Retail Award, your minimum rate depends on your classification level, employment type, and the day and time you work. Penalty rates on weekends and public holidays can push your legal minimum well above the national minimum wage.' },
  { question: 'How far back can I claim underpayment?', answer: 'You can recover underpayments going back up to 6 years under the Fair Work Act. Many retail workers discover they have been underpaid for years once they check their Sunday and public holiday rates against the award.' },
  { question: 'What if I signed a contract agreeing to a flat rate?', answer: 'A contract cannot override the award. If your flat rate results in you being paid less than the award requires — including penalty rates — your employer owes you the difference. The contract is unenforceable to the extent it undercuts the award.' },
];

export default function RetailIntentUnderpaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Retail is one of the most underpaid industries in Australia. The Fair Work Ombudsman recovers millions in unpaid wages from retail employers every year. The General Retail Industry Award has classification levels, weekend penalty rates, and public holiday loadings that are frequently miscalculated or ignored entirely.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your pay is the same every week regardless of whether you work Sundays or public holidays &mdash; you are almost certainly being underpaid.
        </p>
        <p style={pStyle}>
          For the full Retail Award overview, see the <a href="/awards/retail-award/" style={linkStyle}>Retail Award pay guide</a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual sales assistant, Level 1, works every Saturday and Sunday. Paid a flat rate of {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr for all shifts.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> Sunday casual rate should be 200% of the base rate &mdash; significantly higher than the weekday casual rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> Saturday casual rate should include a 125% loading on the base, plus the 25% casual loading.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Combined underpayment: $80&ndash;$120+ per week depending on hours.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employers pay a single &quot;casual rate&quot; regardless of the day. Saturday and Sunday loadings are separate legal entitlements.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you think you&apos;re underpaid</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the exact amount.</strong> Use the tool below to enter your actual shifts and see what you should have been paid under the Retail Award.</li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Many underpayments are genuine mistakes. Presenting the calculation often resolves the issue.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact the Fair Work Ombudsman.</strong> Call 13 13 94 if your employer doesn&apos;t respond. FWO can compel back payment.</li>
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
        <p style={pStyle}>Don&apos;t guess &mdash; enter your actual shifts and find out in 2 minutes.</p>
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
