/**
 * High-intent: Is a Flat Rate Legal for Cleaning Work?
 * URL: /awards/cleaning-award/cleaning-flat-rate
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
  { question: 'My cleaning company pays per building — is that legal?', answer: 'Only if the effective hourly rate for the time you actually spend meets or exceeds the award minimum including all applicable penalties. In practice, flat per-building rates almost never comply. If you spend 3 hours cleaning a building and get paid $60, that\'s $20/hr — well below the minimum.' },
  { question: 'I signed a contract agreeing to a flat rate — am I stuck with it?', answer: 'No. A contract cannot override the Cleaning Services Award. If the contract pays less than the award minimum, the contract term is void and your employer must pay the award rate. You can claim the difference for up to 6 years.' },
  { question: 'What about piece rates for cleaning?', answer: 'The Cleaning Services Award does not provide for piece rates. You must be paid an hourly rate that meets the minimum for your classification level. Any arrangement that pays per room, per building, or per task instead of per hour is almost certainly non-compliant.' },
];

export default function CleaningIntentFlatRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          A flat rate for cleaning work is almost never compliant with the law. The Cleaning Services Award requires employers to pay an hourly rate that meets the minimum for your classification level, plus penalty rates for weekends, public holidays, overtime, and evening/night work. A flat rate wipes all of that out.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re paid the same amount regardless of when or how long you work, your employer is almost certainly breaking the law.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why flat rates fail</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            A flat rate only complies if it covers <strong>every possible scenario</strong> &mdash; the highest penalty rate on the worst day of the year. In practice, that means:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>It must cover base rate + Saturday penalties (1.5&times;)</li>
            <li style={{ marginBottom: '6px' }}>It must cover Sunday penalties (2&times;)</li>
            <li style={{ marginBottom: '6px' }}>It must cover public holiday penalties (2.5&times;)</li>
            <li style={{ marginBottom: '6px' }}>It must cover overtime (1.5&times; then 2&times;)</li>
            <li style={{ marginBottom: '6px' }}>It must include casual loading (25%) if you&apos;re casual</li>
          </ul>
        </div>
        <p style={pStyle}>
          No flat rate in the cleaning industry actually does this. The maths simply doesn&apos;t work at the rates cleaners are typically paid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual cleaner paid a flat $150 to clean an office every Saturday. The job takes 5 hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Effective rate:</strong> $150 &divide; 5 hours = $30/hr
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Legal minimum:</strong> Casual Level 1 base ({l1 ? formatCurrency(l1.casualRate) : '&mdash;'}) &times; 1.5 Saturday penalty = {l1 ? formatCurrency(l1.saturdayCasual) : '&mdash;'}/hr
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Should be paid: {l1 ? formatCurrency(l1.saturdayCasual * 5) : '&mdash;'}. Getting $150. Underpaid {l1 ? formatCurrency(l1.saturdayCasual * 5 - 150) : '&mdash;'} per shift &mdash; {l1 ? formatCurrency((l1.saturdayCasual * 5 - 150) * 52) : '&mdash;'}/year on one shift per week.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Divide your flat payment by the actual hours worked &mdash; is the effective rate above the minimum?</li>
          <li style={{ marginBottom: '6px' }}>Does the flat rate cover penalty rates for the actual days and times you work?</li>
          <li style={{ marginBottom: '6px' }}>Are you receiving a payslip that breaks down hours and rates?</li>
          <li style={{ marginBottom: '6px' }}>Is your employer paying superannuation on top of the flat rate?</li>
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

      <section style={sectionStyle}>
        <p style={pStyle}>Flat rate doesn&apos;t mean fair rate. Check what you&apos;re actually owed.</p>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Cleaning Services Award 2020 (MA000022), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
