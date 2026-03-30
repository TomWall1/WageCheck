/**
 * Scenario: Flat Rate Compliance — /awards/restaurant-award/scenarios/flat-rate
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData } from '@/lib/restaurant-rates';

const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function RScenarioFlatRate({ rates }: { rates?: RestaurantRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          A flat rate is only legal under the Restaurant Award when it demonstrably exceeds every award entitlement &mdash; including Sunday and public holiday rates at your classification level. Most flat rate arrangements in restaurants and caf&eacute;s don&apos;t pass this test.
        </p>
        <p style={pStyle}>
          For the full analysis, pass/fail checklist, worked examples, and FAQs, see the complete guide:
        </p>
        <p style={pStyle}>
          <a href="/awards/restaurant-award/flat-rate-restaurant" style={linkStyle}>
            Is a flat rate legal in a restaurant or caf&eacute;? &mdash; Full guide &rarr;
          </a>
        </p>
      </section>

      <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
