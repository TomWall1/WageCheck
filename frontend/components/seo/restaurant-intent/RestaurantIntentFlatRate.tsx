/**
 * High-intent: Is a Flat Rate Legal in a Restaurant or Cafe?
 * URL: /awards/restaurant-award/flat-rate-restaurant
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'I signed a contract that says my rate covers all penalties — can I still claim?', answer: 'Yes. A contract cannot override your award entitlements. If the flat rate doesn\'t cover every award obligation for every shift you work, you\'re owed the difference regardless of what the contract says. You can claim up to 6 years of underpayments.' },
  { question: 'What should I ask my employer?', answer: 'Ask for a written calculation that shows how the flat rate covers every shift type — including Sunday, public holiday, late night, and overtime scenarios. If they can\'t provide this, the arrangement almost certainly doesn\'t comply.' },
  { question: 'Can I claim back the difference if my flat rate was too low?', answer: 'Yes. You can claim the difference between what you were paid and what the award required for every shift, going back up to 6 years. Calculate the exact amount first, then raise it with your employer or contact the Fair Work Ombudsman on 13 13 94.' },
];

export default function RestaurantIntentFlatRate({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your employer pays you one rate for every shift regardless of the day, time, or hours worked, there&apos;s a high chance that arrangement doesn&apos;t meet the legal requirements under the Restaurant Industry Award. A flat rate is only legal when it demonstrably exceeds every award entitlement &mdash; including Sunday rates, public holiday rates, late-night loadings, allowances, and overtime. In practice, that bar is rarely met.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re paid the same rate every day regardless of when you work &mdash; this applies to you.
        </p>
        <p style={pStyle}>
          For the full Restaurant Award overview, see the <a href="/awards/restaurant-award/" style={linkStyle}>Restaurant Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual Level 3 food &amp; beverage attendant told &quot;$35/hr covers everything.&quot; Works weekdays, Saturdays, and Sundays.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>The check:</strong> Sunday casual Level 3 rate = {l3 ? formatCurrency(l3.sundayCasual) : '~$42.39'}/hr. Public holiday casual Level 3 rate = {l3 ? formatCurrency(l3.publicHolidayCasual) : '~$54.50'}/hr.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            $35/hr fails on every Sunday and every public holiday shift. Underpayment on one 8-hour Sunday: ~{l3 ? formatCurrency((l3.sundayCasual - 35) * 8) : '$59'}.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer picks a number above the weekday casual rate and assumes it covers everything. Nobody checks the Sunday or public holiday scenario &mdash; which is where flat rates almost always fail.
          </p>
        </div>
      </section>

      {/* When flat rate legal */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When is a flat rate legal under the Restaurant Award?</h2>
        <p style={pStyle}>
          A flat rate arrangement satisfies the Restaurant Industry Award only when:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The flat rate is demonstrably higher than the award rate for <strong>every possible shift type</strong> &mdash; including the highest penalty scenario (public holidays)</li>
          <li>The assessment covers all applicable allowances (split shift, meal, tools)</li>
          <li>The assessment is applied to <strong>each individual pay period</strong> &mdash; not averaged across good and bad weeks</li>
          <li>For casual employees, the 25% loading is included in the flat rate before comparing against penalty scenarios</li>
          <li>Overtime is accounted for when hours exceed 7.6 per day or 38 per week</li>
        </ul>
        <p style={pStyle}>
          The public holiday rate at 2.25&times; (or 2.5&times; for casuals) is almost always the critical test. If your flat rate falls below the public holiday rate for your classification at any point, the flat rate fails.
        </p>
      </section>

      {/* Pass/fail test */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; The flat rate pass/fail test</h2>
          <p style={pStyle}>
            A flat rate fails the Restaurant Award if any of these are true:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li><strong>Lower than Sunday rate</strong> &mdash; fails on every Sunday shift</li>
            <li><strong>Lower than public holiday rate</strong> &mdash; fails on every public holiday shift</li>
            <li><strong>No late-night loading</strong> &mdash; fails on shifts finishing after midnight</li>
            <li><strong>No allowances included</strong> &mdash; fails on split shifts, meal break issues</li>
            <li><strong>No written calculation</strong> &mdash; no evidence of compliance</li>
          </ul>
          <p style={pStyle}>
            Even one failure means the flat rate doesn&apos;t comply &mdash; and the employer owes the difference for every affected shift.
          </p>
        </div>
      </section>

      {/* Common failures */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Most common flat rate failures in restaurants</h2>

        <h3 style={h3Style}>Rate above weekday but below Sunday/public holiday</h3>
        <p style={pStyle}>
          The most common scenario. A rate of $35/hr clears the weekday casual rate ({l3 ? formatCurrency(l3.casualRate) : '~$30.28'} at Level 3) but falls well short of the Sunday rate ({l3 ? formatCurrency(l3.sundayCasual) : '~$42.39'}) and the public holiday rate ({l3 ? formatCurrency(l3.publicHolidayCasual) : '~$54.50'}).
        </p>

        <h3 style={h3Style}>Agreed informally without checking the numbers</h3>
        <p style={pStyle}>
          Many flat rate arrangements are agreed verbally at hire. A number that &quot;sounds about right&quot; is picked without anyone running the full comparison against every shift scenario. These arrangements are almost always non-compliant.
        </p>

        <h3 style={h3Style}>Allowances not included in the comparison</h3>
        <p style={pStyle}>
          Even if penalty rates are covered, a flat rate that doesn&apos;t account for split shift allowances, meal allowances, or late-night loadings fails the test on shifts where those entitlements apply.
        </p>
      </section>

      {/* What to ask */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to ask your employer</h2>
        <p style={pStyle}>
          If you&apos;re on a flat rate, you&apos;re entitled to ask your employer to demonstrate compliance. Specifically:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Show the written calculation proving the flat rate exceeds the award rate for every shift type &mdash; including public holidays</li>
          <li>Confirm which allowances are included</li>
          <li>Confirm how overtime is handled when hours exceed 7.6 per day or 38 per week</li>
        </ul>
        <p style={pStyle}>
          If they can&apos;t or won&apos;t provide this, that&apos;s a strong signal the arrangement isn&apos;t compliant. <a href="/check-my-pay?award=MA000119" style={linkStyle}>Check if your flat rate is compliant &rarr;</a>
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
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

      {/* Related guides */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates</a> &middot; <a href="/awards/restaurant-award/allowances" style={linkStyle}>Restaurant Award allowances</a>
        </p>
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; enter your actual shifts and find out if your flat rate covers what the award requires.
        </p>
        <p style={pStyle}>
          The tool calculates exactly what you should have been paid under the award for every shift &mdash; regardless of the flat rate arrangement.
        </p>
        <p style={pStyle}>
          It takes 2 minutes.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000119).
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Restaurant Industry Award 2020 (MA000119), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>

      {/* FAQPage Schema */}
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
