/**
 * Scenario: Cleaning Super Not Being Paid
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
  { question: 'How much super should my cleaning employer pay?', answer: 'As of 1 July 2025, the superannuation guarantee rate is 12% of your ordinary time earnings. This is paid on top of your wages, not deducted from them.' },
  { question: 'I\'m a casual cleaner — do I get super?', answer: 'Yes. All employees are entitled to super regardless of employment type. Casual, part-time, full-time — it makes no difference. There is no minimum hours threshold or minimum earnings threshold for super entitlements.' },
  { question: 'How do I check if my super is actually being paid?', answer: 'Log into your super fund\'s website or app and check your contribution history. Employers must pay super at least quarterly (by the 28th of the month after each quarter ends). If you see gaps or the amounts seem low, your employer may not be paying. You can also contact the ATO to report unpaid super.' },
];

export default function CleaningScenarioSuperNotPaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Unpaid super is wage theft that you won&apos;t notice unless you check. Unlike your payslip, super doesn&apos;t land in your bank account each week. It goes to a fund you might not log into for years. Cleaning employers know this, and many exploit it &mdash; especially those paying cash in hand.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Every employer must pay 12% super on top of your ordinary wages. No exceptions for cleaning work, casual employment, or cash payments.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Super rate: <strong>12% of ordinary time earnings</strong> (as of 1 July 2025)</li>
            <li style={{ marginBottom: '6px' }}>Paid <strong>on top of</strong> your wages, not deducted from them</li>
            <li style={{ marginBottom: '6px' }}>Due <strong>quarterly</strong> &mdash; by 28 October, 28 January, 28 April, 28 July</li>
            <li style={{ marginBottom: '6px' }}>Applies to <strong>all employees</strong> &mdash; casual, part-time, full-time</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Part-time cleaner working 25 hours/week at {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr. Employer has never paid super in 2 years.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Weekly ordinary earnings:</strong> 25 &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} = {l1 ? formatCurrency(l1.ftRate * 25) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Weekly super owed:</strong> {l1 ? formatCurrency(l1.ftRate * 25) : '&mdash;'} &times; 12% = {l1 ? formatCurrency(l1.ftRate * 25 * 0.12) : '&mdash;'}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Over 2 years: {l1 ? formatCurrency(l1.ftRate * 25 * 0.12 * 104) : '&mdash;'} in unpaid super &mdash; plus interest and the super guarantee charge.
          </p>
          <p style={smallStyle}>
            The ATO charges employers a penalty (the super guarantee charge) on top of unpaid super. This means the employer owes even more than the base amount.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Log into your super fund and check your contribution history</li>
          <li style={{ marginBottom: '6px' }}>Contributions should appear quarterly &mdash; look for gaps</li>
          <li style={{ marginBottom: '6px' }}>The amounts should be roughly 12% of your gross pay for each quarter</li>
          <li style={{ marginBottom: '6px' }}>If you don&apos;t know which fund you&apos;re with, use the ATO&apos;s &quot;Find your super&quot; tool via myGov</li>
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
        General information only &mdash; not legal advice. Report unpaid super to the ATO. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
