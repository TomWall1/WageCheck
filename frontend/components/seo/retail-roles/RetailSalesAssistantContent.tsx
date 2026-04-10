/**
 * Retail Award — Sales Assistant role page
 * Rates: FWO pay guide MA000004
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
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Am I Level 1 or Level 2 as a sales assistant?', answer: 'Level 1 covers employees performing basic retail tasks under direct supervision: stacking shelves, operating a register, basic customer service. Level 2 applies if you have completed a relevant Certificate II or equivalent, or if you independently handle more complex tasks like visual merchandising, stock ordering, or resolving customer complaints without a supervisor.' },
  { question: 'I work in a department store. Am I under the Retail Award?', answer: 'Almost certainly yes. Department stores, clothing stores, electronics retailers, supermarkets, and general retail outlets all fall under the General Retail Industry Award. The main exceptions are fast food outlets and pharmacies which have their own awards.' },
  { question: 'My employer pays me a flat casual rate for all shifts. Is that correct?', answer: 'No. The casual rate is your base rate for weekday daytime work. Saturday, Sunday, public holiday, and late night work all attract separate penalty rates on top of the casual base. A flat rate that never changes regardless of when you work is almost always an underpayment.' },
];

export default function RetailSalesAssistantContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const casualRate = l1?.casualRate ?? 28.26;
  const sundayRate = l1?.sundayCasual ?? 45.22;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Sales assistants are the most common role in Australian retail and one of the most frequently underpaid. Most sales assistants fall under Level 1 or Level 2 of the General Retail Industry Award. The difference matters &mdash; and weekend penalty rates matter even more.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work Saturdays, Sundays, or late nights and your pay never changes, you are almost certainly being underpaid.
        </p>
        <p style={pStyle}>
          For the full Retail Award overview, see the <a href="/awards/retail-award/" style={linkStyle}>Retail Award pay guide</a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual sales assistant, Level 1. Works Monday, Thursday evening, and Sunday. Employer pays a flat {formatCurrency(casualRate)}/hr for all shifts.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Monday (daytime): {formatCurrency(casualRate)}/hr &mdash; correct</li>
            <li>Thursday after 6pm: should attract a late night loading &mdash; not paid</li>
            <li>Sunday: should be 200% of the base (~{formatCurrency(sundayRate)}/hr) &mdash; paid at flat casual rate instead</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Underpayment on a single 6-hour Sunday: ~$101. Over a year: ~$5,000+.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common underpayments for sales assistants</h2>
          <h3 style={h3Style}>Flat rate regardless of day</h3>
          <p style={pStyle}>
            The single most common issue. Saturday, Sunday, public holidays, and evenings after 6pm all attract different penalty rates. A flat rate ignores all of them.
          </p>
          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={pStyle}>
            If you handle duties beyond basic stacking and register work &mdash; visual merchandising, stock management, training new staff &mdash; you may be entitled to Level 2 or Level 3 rates.
          </p>
          <h3 style={h3Style}>Junior rate not updated on birthday</h3>
          <p style={pStyle}>
            Junior employees receive percentage-based rates that increase each year. If your rate did not change when you turned a year older, you are owed the difference.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is your classification level stated?</li>
          <li>Are there separate line items for Saturday, Sunday, and evening hours?</li>
          <li>Are those rates different from your weekday daytime rate?</li>
          <li>Is superannuation (12%) being paid on top of your gross?</li>
        </ul>
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
        <p style={pStyle}>
          See also: <a href="/awards/retail-award/penalty-rates" style={linkStyle}>Retail Award penalty rates</a> &middot; <a href="/awards/retail-award/scenarios/sunday-rate" style={linkStyle}>Sunday rates in retail</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>Don&apos;t guess &mdash; enter your shifts and find out in 2 minutes.</p>
        <p style={smallStyle}>Based on official pay rates from the Fair Work Commission (MA000004).</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
