/**
 * Scenario: Saturday Rate — Clerks Award
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
  { question: 'My employer says Saturday is just a normal working day — is that right?', answer: 'Under the Clerks Award, Saturday attracts a penalty rate of 1.5\u00d7 for full-time and part-time employees for ordinary hours. If Saturday is a regular part of your roster, you still get the Saturday loading. The employer cannot average it into your weekday rate.' },
  { question: 'I\'m casual and work Saturdays — do I get both the casual loading and the Saturday rate?', answer: 'Yes. Casual employees receive the Saturday casual rate, which includes both the casual loading and the Saturday penalty. It\'s a single combined rate, not one or the other. Check your payslip for the correct Saturday casual rate for your classification level.' },
  { question: 'What if I only work a few hours on Saturday, not a full day?', answer: 'The Saturday penalty rate applies to every hour worked on Saturday, regardless of the duration. Whether you work 2 hours or 8 hours, each hour must be paid at the Saturday rate for your employment type and classification level.' },
];

export default function ClerksScenarioSaturdayRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Some office roles require Saturday work &mdash; real estate admin, medical receptionists, retail back-office. Under the Clerks Award, Saturday hours attract a higher rate. Full-time and part-time employees get 1.5&times; the ordinary rate for ordinary Saturday hours. If your pay is the same on Saturday as it is Monday through Friday, you&apos;re being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Saturday is not a normal weekday under the Clerks Award. Every Saturday hour you work at the weekday rate is money you&apos;re owed.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Level 2 clerk, works every Saturday morning (4 hours) at a real estate agency. Paid the same {l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr weekday rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Should be paid:</strong> {l2 ? formatCurrency(l2.ftRate) : '&mdash;'} &times; 1.5 = {l2 ? formatCurrency(l2.saturdayFt) : '&mdash;'}/hr &times; 4hrs = {l2 ? formatCurrency(l2.saturdayFt * 4) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Actually paid:</strong> {l2 ? formatCurrency(l2.ftRate) : '&mdash;'} &times; 4hrs = {l2 ? formatCurrency(l2.ftRate * 4) : '&mdash;'}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {l2 ? formatCurrency(l2.saturdayFt * 4 - l2.ftRate * 4) : '&mdash;'} every Saturday. Over a year: {l2 ? formatCurrency((l2.saturdayFt * 4 - l2.ftRate * 4) * 52) : '&mdash;'}.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Saturday overtime</h2>
        <p style={pStyle}>
          If you work overtime on a Saturday (beyond your ordinary hours), the rate increases further. The first 3 hours of Saturday overtime are at 1.5&times;, then 2&times; after that. These rates apply regardless of whether Saturday is your regular working day.
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
        <p style={pStyle}>Work Saturdays? Check that your rate matches what the award requires.</p>
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
