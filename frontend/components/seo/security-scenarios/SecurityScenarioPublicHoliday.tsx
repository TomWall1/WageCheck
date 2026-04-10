/**
 * Scenario: Worked a Public Holiday in Security
 * URL: /awards/security-award/scenarios/public-holiday
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
  { question: 'Can my employer force me to work a public holiday?', answer: 'Your employer can request you to work a public holiday, but you can refuse if the request is unreasonable. However, for security workers, public holiday work is often considered reasonable given the nature of the industry. If you do work, you must be paid the correct public holiday rate — which is significantly higher than normal rates.' },
  { question: 'What if the public holiday falls on my normal rostered day off?', answer: 'If you are a permanent employee and a public holiday falls on a day you would normally work, you are entitled to be paid for the day even if you don\'t work. If it falls on your rostered day off, you may be entitled to a substitute day or additional pay depending on the arrangement.' },
  { question: 'Do casual security guards get public holiday rates?', answer: 'Yes. Casual employees are entitled to public holiday penalty rates under the award. The casual public holiday rate is calculated on the base rate (not the casual rate including loading) and is typically 250% of the base rate. This is one of the highest penalty entitlements under the award.' },
];

export default function SecurityScenarioPublicHoliday({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = l2?.ftRate ?? 24.50;
  const phCasualRate = l2?.publicHolidayCasual ?? 67.38;
  const phTotal = Math.round(phCasualRate * 8 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Security never stops &mdash; and that means guards are often working Christmas Day, ANZAC Day, and every other public holiday. The Security Services Industry Award requires employers to pay significantly higher rates for public holiday work. For casuals, public holiday rates can be more than double the standard rate. If you worked a public holiday and got paid the same as any other shift, you were underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Public holiday work in security should be among your highest-paid shifts of the year.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Security Services Industry Award (MA000016):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Full-time and part-time employees: 250% of the base rate (double time and a half) for public holiday work</li>
          <li style={{ marginBottom: '6px' }}>Casual employees: 275% of the base rate for public holiday work</li>
          <li style={{ marginBottom: '6px' }}>Minimum engagement periods apply &mdash; even if you only work 2 hours on a public holiday, you must be paid for the minimum</li>
          <li style={{ marginBottom: '6px' }}>Overtime on a public holiday is at the public holiday overtime rate</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2, works an 8-hour shift on Christmas Day. Base rate: {formatCurrency(baseRate)}/hr.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Correct public holiday casual rate: 275% of base = ~{formatCurrency(phCasualRate)}/hr</li>
            <li>Correct pay for 8 hours: ~{formatCurrency(phTotal)}</li>
            <li>Flat rate pay ($30/hr x 8): $240.00</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Shortfall: ~{formatCurrency(phTotal - 240)} for a single public holiday shift.
          </p>
          <p style={smallStyle}>
            With 8+ public holidays per year, the accumulated shortfall from incorrect public holiday rates alone can exceed $2,000 annually.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Was the public holiday rate shown separately on your payslip?</li>
          <li style={{ marginBottom: '8px' }}>Was the rate at least 250% (permanent) or 275% (casual) of your base?</li>
          <li style={{ marginBottom: '8px' }}>If the shift crossed midnight into a public holiday, were the post-midnight hours paid at the public holiday rate?</li>
          <li style={{ marginBottom: '8px' }}>Were you paid for the minimum engagement hours even if sent home early?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
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
        General information only. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
