/**
 * High-intent: Hospitality Award Applied to a Restaurant or Cafe — Is That Wrong?
 * URL: /awards/restaurant-award/wrong-award-restaurant
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
  { question: 'My employer insists we\'re definitely under the Hospitality Award — how do I check?', answer: 'Use the Fair Work Award Finder tool at fairwork.gov.au. Enter the business type and your role. If the venue is a standalone restaurant or cafe not operating within a hotel, the Restaurant Industry Award (MA000119) almost certainly applies.' },
  { question: 'I work at a cafe inside a hotel — which award applies?', answer: 'If the cafe operates within a hotel, the Hospitality Industry (General) Award (MA000009) applies, not the Restaurant Award. The test is whether the venue is standalone or part of a larger hospitality operation like a hotel or resort.' },
  { question: 'Can I claim back the difference if the wrong award was applied?', answer: 'Yes. You can claim the difference between what you were paid and what you should have been paid under the correct award. The Fair Work Act allows claims going back up to 6 years.' },
];

export default function RestaurantIntentWrongAward({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your employer is applying Hospitality Industry Award rates to a standalone restaurant or caf&eacute;, there&apos;s a very high chance that every Saturday and Sunday shift is being calculated from the wrong penalty multipliers. The Restaurant Industry Award (MA000119) and the Hospitality Industry Award (MA000009) have different penalty rate structures &mdash; and applying the wrong one can result in systematic underpayment across every weekend shift.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your payslip or contract references &quot;MA000009&quot; or &quot;Hospitality Award&quot; but you work in a standalone restaurant or caf&eacute; &mdash; this applies to you.
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
            <strong>Scenario:</strong> Casual Level 3 waitstaff at a standalone restaurant. Employer applies the Hospitality Award instead of the Restaurant Award.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Hospitality Award Sunday casual rate (Level 3):</strong> ~$44.91/hr (1.5&times; multiplier)
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Restaurant Award Sunday casual rate (Level 3):</strong> {l3 ? formatCurrency(l3.sundayCasual) : '~$42.39'}/hr (different multiplier structure)
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            The rates differ because the two awards use different penalty multipliers for the same days.
          </p>
          <p style={smallStyle}>
            <strong>Why it matters:</strong> Even when the Hospitality Award rate happens to be higher on one day, the overall structure mismatch means other entitlements &mdash; allowances, overtime triggers, and classification definitions &mdash; are all wrong. The cumulative effect across weeks compounds significantly.
          </p>
        </div>
      </section>

      {/* Which award applies */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Which award applies to your workplace?</h2>

        <h3 style={h3Style}>Restaurant Industry Award (MA000119)</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Standalone restaurants</li>
          <li>Standalone caf&eacute;s</li>
          <li>Reception centres and function venues</li>
          <li>Nightclubs (standalone)</li>
          <li>Catering services operated by a standalone restaurant</li>
        </ul>

        <h3 style={h3Style}>Hospitality Industry Award (MA000009)</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Restaurants and caf&eacute;s inside hotels or resorts</li>
          <li>Contract catering operations</li>
          <li>Pubs and bars</li>
          <li>Accommodation venues</li>
          <li>Clubs (licensed)</li>
        </ul>

        <p style={pStyle}>
          The key test is whether the venue operates as a standalone restaurant or caf&eacute;. If it does, the Restaurant Award applies &mdash; regardless of what the employer&apos;s payroll system says.
        </p>
      </section>

      {/* Penalty rate differences */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Why the award difference matters</h2>
          <p style={pStyle}>
            The two awards have different penalty rate multipliers, different allowance structures, and different classification definitions. This means:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li><strong>Saturday and Sunday multipliers</strong> differ between the two awards</li>
            <li><strong>Overtime triggers</strong> may differ in how they apply to different employment types</li>
            <li><strong>Allowances</strong> (split shift, meal, tools) have different amounts and conditions</li>
            <li><strong>Classification levels</strong> have different descriptions and duties, meaning your level may be wrong under the incorrect award</li>
          </ul>
          <p style={pStyle}>
            Applying the wrong award isn&apos;t just a technical issue &mdash; it affects the calculation of every shift you work.
          </p>
        </div>
      </section>

      {/* How to confirm */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to confirm which award applies</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Check your payslip.</strong> The award code (MA000119 or MA000009) should appear on your payslip. If it says MA000009 and you work in a standalone restaurant, it&apos;s likely wrong.</li>
          <li style={{ marginBottom: '8px' }}><strong>Use the Fair Work Award Finder.</strong> Visit <a href="https://www.fairwork.gov.au/awards-and-agreements/awards/find-my-award" style={linkStyle} target="_blank" rel="noopener noreferrer">fairwork.gov.au/awards-and-agreements/awards/find-my-award</a> and enter your workplace details.</li>
          <li style={{ marginBottom: '8px' }}><strong>Check the ABN.</strong> Search the business on the ABR (abr.business.gov.au). The industry classification can indicate which award applies.</li>
        </ol>
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
          See also: <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates</a> &middot; <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Restaurant Award pay rates</a>
        </p>
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess which award applies &mdash; check your pay under the correct one.
        </p>
        <p style={pStyle}>
          Enter your shifts and the tool will calculate exactly what you&apos;re owed under the Restaurant Award.
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
