/**
 * High-intent: My Retail Pay Seems Too Low
 * URL: /awards/retail-award/pay-too-low-retail
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
  { question: 'I feel like I\'m being paid too little but I\'m not sure — where do I start?', answer: 'Start by finding your classification level and employment type on your payslip. Then compare your hourly rate for each day you work against the Retail Award minimum for that day. Weekday, Saturday, Sunday, and public holiday rates are all different. If any single rate is below the award, you are being underpaid.' },
  { question: 'My pay went up on 1 July but it still feels low — could it still be wrong?', answer: 'Yes. Award rates increase each year on 1 July, but if your employer was already paying below the award before the increase, the new rate might still be too low. The increase only brings you up to the new minimum if your employer actually applies the correct new rate.' },
  { question: 'I work at a small shop — does the Retail Award still apply?', answer: 'Yes. The General Retail Industry Award applies to all retail businesses in Australia regardless of size. A single-employee corner shop has the same pay obligations as a national chain.' },
];

export default function RetailIntentPayTooLow({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your retail pay feels too low, trust that instinct. Retail is one of the top industries for wage underpayment in Australia. The most common reason is missing penalty rates &mdash; your base rate might be correct, but if Saturdays, Sundays, and public holidays aren&apos;t attracting higher rates, you&apos;re being shortchanged on those shifts.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The gap between what you should earn and what you actually earn is often $50&ndash;$150 per week. Over a year, that&apos;s thousands.
        </p>
        <p style={pStyle}>
          For the full Retail Award overview, see the <a href="/awards/retail-award/" style={linkStyle}>Retail Award pay guide</a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Why retail pay feels low</h2>
          <h3 style={h3Style}>Missing weekend penalties</h3>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            A casual Level 1 retail worker should earn around {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr on weekdays, more on Saturdays, and roughly double on Sundays. If you see the same rate every day, penalty rates are missing.
          </p>
          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            If you&apos;re handling cash, operating a register, or supervising other staff, you may be classified too low. Each level up adds roughly $1&ndash;$2/hr to every rate.
          </p>
          <h3 style={h3Style}>Annual increase not applied</h3>
          <p style={smallStyle}>
            Award rates increase on 1 July each year. If your rate hasn&apos;t changed since you started, it may be below the current minimum.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Quick self-check</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Look at your most recent payslip. Is there a separate rate for weekdays vs weekends?</li>
          <li style={{ marginBottom: '8px' }}>Check whether your rate changed on 1 July last year.</li>
          <li style={{ marginBottom: '8px' }}>Confirm your classification level matches the work you actually do.</li>
          <li style={{ marginBottom: '8px' }}>Use the calculator below to compare your pay against the award minimum.</li>
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
        <p style={pStyle}>Find out in 2 minutes whether your pay is below the legal minimum.</p>
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
