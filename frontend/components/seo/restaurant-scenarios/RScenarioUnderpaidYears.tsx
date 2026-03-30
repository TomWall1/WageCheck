/**
 * Scenario: Underpaid for Years — /awards/restaurant-award/scenarios/underpaid-years
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData } from '@/lib/restaurant-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Is the Fair Work Ombudsman recovery process free?', answer: 'Yes. The Fair Work Ombudsman does not charge employees for assistance with underpayment claims. Their service is entirely free — you don\'t need to hire a lawyer to recover your pay.' },
  { question: 'What evidence do I need to make a claim?', answer: 'Payslips, bank statements showing employer payments, timesheets, roster records, employment contracts, and any written communication about your pay. Even if you don\'t have all of these, the FWO can still investigate — employers are required to keep records, and failure to do so works against them.' },
  { question: 'What if the business has already closed down?', answer: 'The Fair Work Ombudsman can still pursue the claim. Company directors may be personally liable for underpayments in certain circumstances. A closed business does not extinguish the debt owed to you.' },
];

export default function RScenarioUnderpaidYears({ rates }: { rates?: RestaurantRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You can recover up to 6 years of underpayments through the Fair Work Ombudsman &mdash; for free. It doesn&apos;t matter whether you&apos;re still employed there or have moved on. Under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>, every dollar below the correct <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>rate</a> is owed to you.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Underpaid for years? The recovery period is 6 years &mdash; and the process is free.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Steps to recover your pay</h2>
        <div style={exampleBoxStyle}>
          <ol style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Calculate what you&apos;re owed</strong> &mdash; use the pay checker tool below to compare your actual pay against the award rates for your hours and shift types</li>
            <li style={{ marginBottom: '8px' }}><strong>Gather your evidence</strong> &mdash; payslips, timesheets, bank statements, roster records, employment contracts</li>
            <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer</strong> &mdash; put it in writing (email or text) with the specific shortfall amount and the dates it covers</li>
            <li style={{ marginBottom: '8px' }}><strong>If unresolved, contact the FWO</strong> &mdash; call <strong>13 13 94</strong> or lodge a complaint at fairwork.gov.au</li>
          </ol>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Your legal protection</h2>
        <p style={pStyle}>
          You are legally protected from adverse action for exercising your workplace rights. This means your employer cannot fire you, cut your hours, demote you, or otherwise retaliate against you for raising a pay concern or making a complaint. If they do, that&apos;s a separate and serious contravention of the Fair Work Act with significant penalties.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Base hourly rate vs award minimum for your classification level</li>
          <li>Penalty rates for weekends, public holidays, and late nights</li>
          <li>Overtime for hours beyond 38/week or 7.6/day</li>
          <li>Allowances (tool allowance, meal allowance, etc.)</li>
          <li>Superannuation contributions</li>
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
        <p style={pStyle}>Start by calculating exactly what you should have been paid.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at fairwork.gov.au.
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
