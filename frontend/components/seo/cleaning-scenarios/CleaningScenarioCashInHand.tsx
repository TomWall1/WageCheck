/**
 * Scenario: Cleaning Cash in Hand — Is This Legal?
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Is it illegal to be paid cash as a cleaner?', answer: 'Being paid in cash is not illegal by itself. What is illegal is using cash to avoid paying the correct award rate, skip superannuation, not provide payslips, and not report income to the ATO. In practice, cash-in-hand cleaning arrangements almost always involve one or more of these breaches.' },
  { question: 'My employer says cash means I don\'t pay tax so it\'s better for me — is that true?', answer: 'This is a trap. You\'re still legally required to declare all income. If the ATO audits you, you\'ll owe back taxes plus penalties. Meanwhile, your employer is avoiding super, WorkCover, payslips, and usually paying below the award rate. The "benefit" is an illusion that puts you at risk.' },
  { question: 'I\'m on a visa — will I get in trouble if I report my employer?', answer: 'No. The Fair Work Ombudsman has a specific assurance for visa holders: they will not cancel your visa for reporting workplace issues. This protection exists precisely because employers exploit visa holders by threatening deportation. Report underpayment without fear.' },
];

export default function CleaningScenarioCashInHand({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cash-in-hand cleaning jobs are the single biggest source of wage theft in Australia. Being paid cash is not illegal on its own, but it is almost always a sign that your employer is breaking multiple laws: paying below the award rate, skipping super, not providing payslips, and not paying tax. If you&apos;re a cleaner being paid cash, you are almost certainly being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Cash does not exempt your employer from any workplace law. Not one.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>The Cleaning Services Award applies <strong>regardless of payment method</strong></li>
            <li style={{ marginBottom: '6px' }}>Employers must still pay <strong>minimum award rates</strong>, penalty rates, and overtime</li>
            <li style={{ marginBottom: '6px' }}>Employers must still pay <strong>12% superannuation</strong></li>
            <li style={{ marginBottom: '6px' }}>Employers must still provide a <strong>payslip within 1 business day</strong></li>
            <li style={{ marginBottom: '6px' }}>Employers must still have <strong>WorkCover insurance</strong></li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Cleaner paid $18/hr cash, works 30 hours/week including Saturdays. No payslip, no super.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they get:</strong> 30 hours &times; $18 = $540/week
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should get:</strong> 24 weekday hours &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} = {l1 ? formatCurrency(l1.ftRate * 24) : '&mdash;'} + 6 Saturday hours &times; {l1 ? formatCurrency(l1.saturdayFt) : '&mdash;'} (1.5&times;) = {l1 ? formatCurrency(l1.saturdayFt * 6) : '&mdash;'} = {l1 ? formatCurrency(l1.ftRate * 24 + l1.saturdayFt * 6) : '&mdash;'}/week. Plus 12% super ({l1 ? formatCurrency((l1.ftRate * 24 + l1.saturdayFt * 6) * 0.12) : '&mdash;'}/week).
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpaid: $374.05/week including super. That&apos;s $19,451/year in stolen wages and super.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Divide your total cash payment by hours worked &mdash; is the effective rate above {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr (permanent) or {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr (casual)?</li>
          <li style={{ marginBottom: '6px' }}>Check your super fund &mdash; has your employer made any contributions?</li>
          <li style={{ marginBottom: '6px' }}>Do you receive payslips?</li>
          <li style={{ marginBottom: '6px' }}>Are you paid extra for weekends and public holidays?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
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
