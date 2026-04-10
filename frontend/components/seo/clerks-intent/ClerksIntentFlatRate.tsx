/**
 * High-intent: Flat Rate Pay Under the Clerks Award
 * URL: /awards/clerks-award/flat-rate-clerks
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
  { question: 'My employer says my salary covers everything — is a flat rate legal?', answer: 'A salary can cover overtime and penalty rates, but only if the total salary is high enough that every hour worked meets or exceeds the award rate for that hour. If you work any overtime, weekends, or public holidays, and your flat salary doesn\'t increase, your employer must demonstrate mathematically that the salary covers all entitlements. Most flat-rate arrangements in clerical roles fail this test.' },
  { question: 'I get paid the same every fortnight regardless of hours — is that normal?', answer: 'For a standard 38-hour week with no overtime, yes. But if your hours vary — if some weeks you work 40 or 42 hours — the flat pay should still cover overtime rates for those extra hours. If it doesn\'t, you\'re being underpaid on every longer week.' },
  { question: 'What about TOIL instead of overtime pay?', answer: 'Time off in lieu (TOIL) is permitted under the Clerks Award, but only by genuine agreement with the employee and must be taken at the overtime rate equivalent. One hour of overtime at time-and-a-half means 1.5 hours of TOIL. If your employer gives you straight hour-for-hour time off, that\'s not compliant.' },
];

export default function ClerksIntentFlatRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          A flat rate means you get paid the same amount regardless of when or how many hours you work. In office jobs, this often looks like a fixed weekly or fortnightly salary with no separate overtime line. Under the Clerks Award, a flat rate is only lawful if it covers every entitlement for every hour worked &mdash; including penalty rates and overtime.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your pay is identical every week but your hours aren&apos;t &mdash; something is wrong.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The flat rate trap for office workers</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> A Level 3 clerk earns a flat $55,000/year salary. They work 40 hours most weeks and occasionally work Saturdays during month-end.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>The maths:</strong> $55,000 &divide; 52 weeks = $1,057.69/week. Divided by 40 hours = $26.44/hr. But the Level 3 base rate is {l3 ? formatCurrency(l3.ftRate) : '~$28'}/hr, the 2 overtime hours each week should be at time-and-a-half, and Saturday hours should attract the Saturday penalty rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Result:</strong> Once overtime and Saturday rates are properly calculated, the salary falls short of the award minimum by roughly $80&ndash;$120/week.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Annual shortfall: $4,100&ndash;$6,200. And the worker had no idea.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>When a flat rate fails</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You work more than 38 hours in some weeks but your pay stays the same</li>
          <li style={{ marginBottom: '6px' }}>You work Saturdays or public holidays at the same rate</li>
          <li style={{ marginBottom: '6px' }}>Your employer can&apos;t produce a written calculation showing the salary covers all entitlements</li>
          <li style={{ marginBottom: '6px' }}>Your salary hasn&apos;t increased since the last annual award rate change (1 July)</li>
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
        <p style={pStyle}>Enter your salary and actual hours. We&apos;ll calculate whether it covers what the award requires.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Clerks &mdash; Private Sector Award 2020 (MA000002), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
