/**
 * Retail Award — Cashier role page
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
  { question: 'I am a cashier at a supermarket. Which award covers me?', answer: 'If you work at a supermarket like Coles, Woolworths, Aldi, or IGA, you are covered by the General Retail Industry Award (MA000004). Some large retailers have enterprise agreements that must meet or exceed the award.' },
  { question: 'I operate a self-checkout area and supervise multiple registers. Am I still Level 1?', answer: 'Likely not. If you are responsible for supervising a section, managing self-checkout issues, handling customer escalations, or training new staff, you may be classified at Level 2 or higher. Your duties determine your level, not your job title.' },
  { question: 'My shift finishes at 10pm after closing. Do I get extra?', answer: 'Yes. Hours worked after 6pm on weekdays attract a late night loading under the Retail Award. If your payslip shows the same rate for your entire shift regardless of whether it extends past 6pm, the loading is not being applied.' },
];

export default function RetailCashierContent({ rates }: { rates?: AwardRateData }) {
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
          Cashiers make up a huge proportion of Australia&apos;s retail workforce. Whether you work at a supermarket checkout, a department store register, or a small shop counter, the Retail Award sets your minimum pay. Most cashiers are classified at Level 1, but if you handle additional responsibilities, you may be entitled to a higher rate.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Weekend and evening work pushes your minimum rate significantly higher than the base &mdash; if your employer is not applying those penalties, you are losing money every week.
        </p>
        <p style={pStyle}>
          For the full Retail Award overview, see the <a href="/awards/retail-award/" style={linkStyle}>Retail Award pay guide</a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual cashier, Level 1, supermarket. Works Saturday 9am&ndash;5pm and Sunday 10am&ndash;4pm every week. Paid {formatCurrency(casualRate)}/hr flat.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Saturday casual rate (125% + casual loading): should be higher than {formatCurrency(casualRate)}/hr</li>
            <li>Sunday casual rate (200% of base): ~{formatCurrency(sundayRate)}/hr</li>
            <li>Paid for 14 hours at {formatCurrency(casualRate)} = {formatCurrency(casualRate * 14)}</li>
            <li>Should have been paid closer to {formatCurrency(casualRate * 8 + sundayRate * 6)}+ for those same 14 hours</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Underpayment: ~$95 per weekend. Over a year: ~$4,500+.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common underpayments for cashiers</h2>
          <h3 style={h3Style}>Flat rate for weekend shifts</h3>
          <p style={pStyle}>
            Saturday and Sunday have different penalty rates. Most cashiers work weekends. If your rate never changes, both days are being underpaid.
          </p>
          <h3 style={h3Style}>No late night loading for closing shifts</h3>
          <p style={pStyle}>
            Cashiers who close the store often work past 6pm. The late night loading applies to all hours after 6pm on weekdays.
          </p>
          <h3 style={h3Style}>Minimum engagement not met</h3>
          <p style={pStyle}>
            Casual employees must be paid for a minimum number of hours per shift, even if sent home early. If you are called in for a 2-hour shift, you may be owed more.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are Saturday and Sunday hours shown at different rates?</li>
          <li>Is there a late night loading for hours after 6pm?</li>
          <li>Does your classification level match your actual duties?</li>
          <li>Is super (12%) being paid on top of your gross?</li>
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
