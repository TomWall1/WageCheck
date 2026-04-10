/**
 * Scenario: Paid Below Award Rate as a Cleaner
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
  { question: 'How do I know if I\'m below the award rate?', answer: 'Check your hourly rate against the Cleaning Services Award minimums for your level. If you\'re paid less than the minimum for your classification, you\'re below award. Remember to also check penalty rates for weekends and public holidays — many cleaners have a compliant base rate but missing penalties.' },
  { question: 'My employer has an enterprise agreement — does the award still apply?', answer: 'An enterprise agreement can set different rates, but it must pass the "better off overall test" (BOOT). This means you must be better off overall under the agreement than you would be under the Cleaning Services Award. If the agreement pays less overall, it may be invalid.' },
  { question: 'How far back can I claim underpayments?', answer: 'You can claim underpayments going back up to 6 years from the date you make a complaint to the Fair Work Ombudsman. For a cleaner underpaid by $5/hr working 30 hours/week, that\'s potentially $46,800 over 6 years in base rate alone — more with missing penalties and super.' },
];

export default function CleaningScenarioBelowAward({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Being paid below the award rate as a cleaner is illegal. It doesn&apos;t matter what your contract says, what you agreed to verbally, or whether you&apos;re on a visa. The Cleaning Services Award sets a floor that cannot be undercut. If your employer pays less, they owe you the difference &mdash; going back up to 6 years.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The award rate is not a suggestion. It is the legal minimum. Anything less is wage theft.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Level 1 (general cleaning): <strong>~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr</strong> (permanent) / <strong>~{l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr</strong> (casual)</li>
            <li style={{ marginBottom: '6px' }}>Level 2 (specialised equipment): <strong>~{l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr</strong> (permanent) / <strong>~{l2 ? formatCurrency(l2.casualRate) : '&mdash;'}/hr</strong> (casual)</li>
            <li style={{ marginBottom: '6px' }}>Level 3 (supervisor): <strong>~{l3 ? formatCurrency(l3.ftRate) : '&mdash;'}/hr</strong> (permanent) / <strong>~{l3 ? formatCurrency(l3.casualRate) : '&mdash;'}/hr</strong> (casual)</li>
            <li style={{ marginBottom: '6px' }}>These are <strong>base rates only</strong> &mdash; penalties for weekends, public holidays, and overtime apply on top</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual cleaner paid $22/hr, works 20 hours/week (all weekdays). No penalty rates, no super.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they get:</strong> 20 &times; $22 = $440/week
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should get:</strong> 20 &times; {l1 ? formatCurrency(l1.casualRate) : '&mdash;'} = {l1 ? formatCurrency(l1.casualRate * 20) : '&mdash;'}/week, plus 12% super ({l1 ? formatCurrency(l1.casualRate * 20 * 0.12) : '&mdash;'}/week)
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpaid: $252.38/week including super. That&apos;s $13,124/year.
          </p>
          <p style={smallStyle}>
            Over 3 years, this cleaner is owed nearly $40,000. Over the full 6-year recovery period, it&apos;s nearly $80,000.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Compare your hourly rate to the minimums listed above</li>
          <li style={{ marginBottom: '6px' }}>Check if your rate has been updated each July when award rates increase</li>
          <li style={{ marginBottom: '6px' }}>Verify your classification matches your actual duties</li>
          <li style={{ marginBottom: '6px' }}>Confirm super is being paid (check your super fund, not just your payslip)</li>
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
