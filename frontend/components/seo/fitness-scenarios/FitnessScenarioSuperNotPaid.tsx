/**
 * Scenario: Fitness Industry Super Not Being Paid
 * URL: /awards/fitness-award/scenarios/super-not-paid
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
  { question: 'How do I check if my super is being paid?', answer: 'Log into myGov and link to the ATO. Your super account will show all contributions received. You can also log directly into your super fund\'s website or app. Compare the contributions against your payslips — super should be paid on your ordinary time earnings at the current rate of 12%.' },
  { question: 'My employer says I earn too little to qualify for super — is that right?', answer: 'No. Since 1 July 2022, there is no minimum earnings threshold for super. Every employee is entitled to super regardless of how much they earn. If your employer claims you earn too little, they are either misinformed or deliberately avoiding their obligation.' },
  { question: 'I\'m a casual fitness worker — do I still get super?', answer: 'Yes. All employees are entitled to super, regardless of employment type. Full-time, part-time, and casual employees all receive super at the current rate (12%) on their ordinary time earnings. There are no exemptions for casuals.' },
];

export default function FitnessScenarioSuperNotPaid({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Missing super is one of the most common issues in the fitness industry &mdash; and one of the most expensive over time. Many fitness workers, especially those on casual or cash-in-hand arrangements, have zero or minimal super contributions despite years of work. Under the law, your employer must pay superannuation on top of your wages. It&apos;s not optional and there&apos;s no minimum earnings threshold.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Every dollar of missing super is a dollar that should be growing in your retirement account. Over a career, it compounds into tens of thousands.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Employers must pay superannuation at the rate of <strong>12%</strong> of your ordinary time earnings into your nominated super fund. Super must be paid at least quarterly. There is no minimum earnings threshold &mdash; even if you earn $50 in a quarter, super is owed. If your employer misclassifies you as a contractor when you&apos;re actually an employee (common in fitness), they still owe you super for the entire period.
        </p>
        <p style={pStyle}>
          The ATO can recover unpaid super plus interest and penalties. You can report unpaid super directly to the ATO.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Personal trainer earning $800/week gross. Has worked at the same gym for 3 years. Checks myGov and finds zero super contributions from this employer.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What was owed:</strong> $800 &times; 12% = $96/week in super.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Over 3 years:</strong> $96 &times; 52 weeks &times; 3 years = approximately $14,976 in missing super contributions.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Plus lost investment returns:</strong> That $14,976 should have been growing in the super fund. With average returns, the real loss is even higher.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Three years of missing super: ~$15,000+ in contributions alone, before interest.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Log into myGov and check your super fund for contributions from your current employer</li>
          <li>Compare contributions received against your payslips &mdash; super should be 12% of ordinary time earnings</li>
          <li>Check the frequency &mdash; super must be paid at least quarterly</li>
          <li>If you&apos;re classified as a contractor, assess whether you&apos;re actually an employee (see <a href="/awards/fitness-award/scenarios/cash-in-hand" style={linkStyle}>sham contracting</a>)</li>
          <li>If super is missing, report it to the ATO via the &ldquo;Report unpaid super&rdquo; form on the ATO website</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Disclaimer */}
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
