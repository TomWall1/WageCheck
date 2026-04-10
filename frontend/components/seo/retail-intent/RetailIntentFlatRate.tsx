/**
 * High-intent: Is a Flat Rate Legal in Retail?
 * URL: /awards/retail-award/flat-rate-retail
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
  { question: 'My employer says the flat rate is above the award — is that enough?', answer: 'Only if the flat rate covers every entitlement for every hour you actually work. If you work Sundays or public holidays, the flat rate must be high enough to cover those penalty rates as well. A rate that is above the weekday minimum can still be below the Sunday minimum.' },
  { question: 'Can I agree to a flat rate in my employment contract?', answer: 'You can agree to a higher-than-award flat rate, but it must demonstrably cover all award entitlements including penalty rates, overtime, and allowances for every hour worked. If the flat rate results in you receiving less than the award for any pay period, the employer owes you the shortfall.' },
  { question: 'How do I prove a flat rate is underpaying me?', answer: 'Calculate what you should have been paid under the Retail Award for every shift — including penalty rates and overtime — then compare the total to what you were actually paid. If the award total exceeds the flat rate total for any pay period, you have been underpaid for that period.' },
];

export default function RetailIntentFlatRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          A flat rate in retail is only legal if it covers every award entitlement for every hour you work. That includes Saturday loadings, Sunday penalty rates at 200%, public holiday rates, overtime, and any applicable allowances. If the flat rate falls short on any of those components in any pay period, your employer owes you the difference.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Most flat rates in retail fail the Sunday test. If you work Sundays at a flat rate, there&apos;s a strong chance you&apos;re being underpaid.
        </p>
        <p style={pStyle}>
          For the full Retail Award details, see the <a href="/awards/retail-award/" style={linkStyle}>Retail Award pay guide</a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>The flat rate trap</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual retail worker paid a flat $30/hr regardless of day. Works 2 weekday shifts, 1 Saturday, and 1 Sunday per week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Weekday:</strong> $30/hr is above the casual Level 1 weekday rate. No issue on those days.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Sunday:</strong> The Sunday casual rate under the Retail Award is 200% of the base &mdash; well above $30/hr. The flat rate fails.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Result: The worker is underpaid every Sunday they work, even though the flat rate &quot;looks good&quot; on weekdays.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>When is a flat rate actually legal?</h2>
        <p style={pStyle}>
          A flat rate is legal when it passes the &quot;better off overall&quot; test for every pay period. That means calculating the total award entitlement for the actual hours worked in each pay period and confirming the flat rate total meets or exceeds it. The test must be applied per pay period, not averaged over a year.
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>It must cover all penalty rates for every shift actually worked</li>
          <li>It must cover overtime if applicable</li>
          <li>It must be rechecked whenever your roster changes</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Enter your actual shifts into the tool below to see the award total for each pay period.</li>
          <li style={{ marginBottom: '8px' }}>Compare it to your flat rate total for the same period.</li>
          <li style={{ marginBottom: '8px' }}>If the award total is higher, your flat rate is illegal for that period.</li>
        </ol>
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
        <p style={pStyle}>Check whether your flat rate actually covers the award &mdash; it takes 2 minutes.</p>
        <p style={smallStyle}>Based on official pay rates from the Fair Work Commission (MA000004).</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the General Retail Industry Award 2020 (MA000004), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
