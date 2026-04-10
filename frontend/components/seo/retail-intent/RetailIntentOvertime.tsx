/**
 * High-intent: Not Getting Overtime in Retail?
 * URL: /awards/retail-award/overtime-retail
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
  { question: 'I\'m casual — do I get overtime in retail?', answer: 'Yes. Casual retail employees are entitled to overtime after working more than 38 hours in a week or beyond the maximum daily hours. The first 3 hours are at 1.5 times the ordinary rate, and all hours after that at double time.' },
  { question: 'My manager says overtime isn\'t approved — can they refuse to pay it?', answer: 'If you worked the hours with your employer\'s knowledge or at their direction, overtime must be paid regardless of whether it was formally "approved." Employers cannot benefit from unpaid work simply by not authorising it after the fact.' },
  { question: 'Does staying back to close the store count as overtime?', answer: 'Yes. If closing duties push you past your rostered hours and beyond the daily or weekly overtime threshold, those hours must be paid at overtime rates. This is one of the most common sources of unpaid overtime in retail.' },
];

export default function RetailIntentOvertime({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Unpaid overtime is rampant in retail. Staying back 15 minutes to close, coming in early for stocktake, working through your break during a sale &mdash; it adds up. Under the Retail Award, overtime kicks in after 38 hours per week for full-time employees or after the agreed hours for part-timers. The first 3 hours are at 1.5&times; your ordinary rate. Every hour after that is double time.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly work more than your rostered hours and your pay doesn&apos;t change &mdash; you&apos;re owed overtime.
        </p>
        <p style={pStyle}>
          See the <a href="/awards/retail-award/" style={linkStyle}>Retail Award pay guide</a> for full details.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time Level 2 retail worker rostered 38 hours but consistently works 42 hours per week due to late closes and stocktake shifts. Paid a flat weekly rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> 4 hours of overtime per week at 1.5&times; the ordinary rate.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$60&ndash;$70/week in missed overtime. Over a year, that&apos;s $3,000+.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employers treat extra hours as part of the job. Under the award, they&apos;re overtime and must be paid at the higher rate.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>When does overtime apply in retail?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Full-time:</strong> After 38 hours/week or beyond rostered daily hours</li>
          <li><strong>Part-time:</strong> After the agreed hours in the employment contract</li>
          <li><strong>Casual:</strong> After 38 hours/week</li>
          <li><strong>Rate:</strong> First 3 hours at 1.5&times;, then 2&times; for all hours after</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if overtime is missing</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the exact amount.</strong> Enter your actual shifts and see what your overtime should be.</li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Present the calculation clearly.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact the Fair Work Ombudsman</strong> on 13 13 94 if the issue isn&apos;t resolved.</li>
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
        <p style={pStyle}>Don&apos;t guess &mdash; enter your actual hours and see what you&apos;re owed.</p>
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
