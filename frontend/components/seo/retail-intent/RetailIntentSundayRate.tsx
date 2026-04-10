/**
 * High-intent: Is My Retail Sunday Rate Correct?
 * URL: /awards/retail-award/sunday-rate-retail
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
  { question: 'Is the Sunday rate different for casuals vs permanent employees in retail?', answer: 'Yes. Permanent full-time and part-time retail employees receive 200% of the ordinary rate on Sundays. Casual employees also receive 200% of the ordinary rate (which already includes the casual loading). Both are significantly higher than weekday rates.' },
  { question: 'My employer says Sunday rates were reduced — is that true?', answer: 'Sunday penalty rates for retail were reduced over several years from 2017 to 2020 under transitional arrangements. Since 1 July 2020, the permanent Sunday rate in retail has been 200% and the casual Sunday rate has also been 200%. These are now the settled rates.' },
  { question: 'I only work Sundays — can my employer pay me a flat rate?', answer: 'No. Even if you only work Sundays, you must be paid the Sunday penalty rate. A flat rate that falls below the Sunday award rate is an underpayment, regardless of what your contract says.' },
];

export default function RetailIntentSundayRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Sunday penalty rates in retail are 200% of the ordinary base rate for both permanent and casual employees. That means your Sunday hourly rate should be roughly double your Monday-to-Friday rate. If your pay looks the same on Sundays as it does the rest of the week, you are being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A casual retail worker earning {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr on weekdays should be earning significantly more on Sundays. If you&apos;re not &mdash; check it now.
        </p>
        <p style={pStyle}>
          See the full <a href="/awards/retail-award/penalty-rates" style={linkStyle}>Retail Award penalty rates</a> breakdown.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual Level 1 retail worker doing 6-hour Sunday shifts every week. Paid the same flat casual rate as weekday shifts.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid:</strong> ~{l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr &times; 6 hours = ~{l1 ? formatCurrency(l1.casualRate * 6) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should have been paid:</strong> Sunday casual rate (200%) &times; 6 hours = significantly more
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: $80+ per Sunday shift. Over a year of Sundays, that&apos;s $4,000+.
          </p>
          <p style={smallStyle}>
            <strong>Trigger moment:</strong> You check your payslip and the hourly rate is the same on Sunday as it is on Wednesday. That&apos;s the sign.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the General Retail Industry Award (MA000004), Sunday work attracts a 200% penalty rate for all employees &mdash; permanent full-time, part-time, and casual. This is calculated as a percentage of the ordinary hourly rate (or the casual rate for casuals). The penalty is automatic and applies to every hour worked on a Sunday.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Check your payslip.</strong> Look for a separate Sunday rate or penalty line item. If it&apos;s not there, your Sunday rate is wrong.</li>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the difference.</strong> Use the tool below to see exactly what your Sunday pay should be.</li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer or call Fair Work</strong> on 13 13 94.</li>
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
        <p style={pStyle}>Not sure if your Sunday rate is right? Enter your shifts and find out in 2 minutes.</p>
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
