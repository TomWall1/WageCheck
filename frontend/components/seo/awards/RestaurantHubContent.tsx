/**
 * Restaurant Award hub page content — /awards/restaurant-award/
 * Rates: FWO pay guide MA000119 effective 1 July 2025 (casual rates shown)
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif',
  fontSize: '1.15rem',
  fontWeight: 500,
  color: 'var(--secondary)',
  marginBottom: '10px',
  marginTop: '0',
};

const h3Style: React.CSSProperties = {
  fontSize: '14.5px',
  fontWeight: 600,
  color: 'var(--secondary)',
  marginBottom: '6px',
  marginTop: '0',
};

const pStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.7,
  marginBottom: '1rem',
};

const smallStyle: React.CSSProperties = {
  fontSize: '12.5px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.6,
};

const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)',
  border: '1.5px solid var(--accent)',
  borderRadius: '10px',
  padding: '16px 20px',
  marginBottom: '1.5rem',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2.5rem',
};

export default function RestaurantHubContent({ rates }: { rates: RestaurantRateData }) {
  const levelRoles: Record<number, string> = {
    1: 'F&B attendant (basic)',
    2: 'F&B attendant (experienced)',
    3: 'Trained attendant, Cook Grade 2',
    4: 'Trade qualified cook',
    5: 'Supervisor, advanced tradesperson',
    6: 'Specialist cook',
  };
  const l3 = getLevel(rates, 3);
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in a restaurant or caf&eacute; in Australia, there&rsquo;s a high chance your Sunday pay is wrong. The Restaurant Industry Award has one of the highest Sunday penalty rates of any award in the country &mdash; and it&rsquo;s frequently either not applied at all, or applied using incorrect multipliers from the Hospitality Award.
        </p>
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          If you work at a standalone restaurant, caf&eacute;, or bistro &mdash; this award applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={{
          background: '#f8f9fa',
          border: '1.5px solid var(--border)',
          borderRadius: '10px',
          padding: '20px',
        }}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual waitstaff, Level 3, standalone restaurant. Working one Sunday per week.
          </p>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What they were paid:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>{formatCurrency(l3?.casualRate ?? 0)}/hr &mdash; same every day</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 500, marginBottom: '4px' }}>What should have happened:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>Sunday casual Level 3 &mdash; {formatCurrency(l3?.sundayCasual ?? 0)}/hr</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Underpayment per Sunday shift: {formatCurrency((l3?.sundayCasual ?? 0) - (l3?.casualRate ?? 0))}/hr difference.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Many employers pay a flat casual rate and never apply the Sunday multiplier. Most employees never check &mdash; and most never realise.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who the Restaurant Award covers</h2>
        <p style={pStyle}>
          The Restaurant Industry Award 2020 (MA000119) applies to standalone restaurants and caf&eacute;s.
        </p>
        <h3 style={h3Style}>&#10003; Covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Standalone restaurants</li>
          <li>Standalone caf&eacute;s</li>
          <li>Reception centres</li>
          <li>Nightclubs</li>
          <li>Catering as part of a restaurant business</li>
        </ul>
        <h3 style={h3Style}>&#10007; Not covered</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
          <li>Restaurants or caf&eacute;s inside hotels &rarr; <a href="/awards/hospitality-award" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Hospitality Award</a></li>
          <li>Contract catering &rarr; <a href="/awards/hospitality-award" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Hospitality Award</a></li>
        </ul>
        <p style={smallStyle}>
          Not sure which award applies? See <a href="/awards/restaurant-award/wrong-award-applied" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>what happens when the wrong award is applied</a>.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What are you entitled to under the Restaurant Award?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Saturday rates:</strong> 1.25&times; ordinary rate (permanent)</li>
          <li><strong>Sunday rates:</strong> 1.5&times; ordinary rate (permanent); casual rate is higher and level-dependent</li>
          <li><strong>Public holiday rates:</strong> 2.25&times; ordinary rate (permanent), 2.5&times; casual base rate</li>
          <li><strong>Late night (10pm&ndash;midnight):</strong> loading on top of applicable rate</li>
          <li><strong>Early morning (midnight&ndash;6am):</strong> loading on top</li>
          <li><strong>No evening loading before 10pm</strong> &mdash; unlike the Hospitality Award</li>
          <li><strong>Casual loading:</strong> 25% &mdash; does not replace penalty rates, both apply</li>
          <li><strong>Minimum casual engagement:</strong> 2 hours per shift</li>
          <li><strong>Overtime:</strong> After 7.6 hours in a day or 38 hours in a week (permanent)</li>
          <li><strong>Split shift allowance:</strong> per shift (permanent and part-time)</li>
          <li><strong>Tool allowance:</strong> per day for cooks using own knives</li>
        </ul>
        <p style={smallStyle}>
          For weekend and public holiday multipliers, see the full <a href="/awards/restaurant-award/penalty-rates" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Restaurant Award penalty rates guide</a>. For overtime thresholds and worked examples, see the <a href="/awards/restaurant-award/overtime" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Restaurant Award overtime guide</a>.
        </p>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Restaurant Casual Pay Rates 2025 &mdash; Classification Levels</h2>
        <p style={pStyle}>
          Under the Restaurant Award, your pay rate depends on your classification level and the day you work. The table below shows the minimum casual rates for each level effective 1 July 2025.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Level</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Typical roles</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Ordinary (casual)</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Saturday</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Sunday</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Public Holiday</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 6).map(l => (
                <tr key={l.level} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Level {l.level}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)', fontSize: '12.5px' }}>{levelRoles[l.level] ?? ''}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.casualRate)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.saturdayCasual)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.sundayCasual)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.publicHolidayCasual)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates are casual rates based on the Fair Work Commission pay guide for MA000119 effective 1 July 2025. Actual rates may vary slightly by sub-classification.
        </p>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Red flags your pay may be wrong</h2>
          <p style={{ ...smallStyle, marginBottom: '12px' }}>If any of these apply, there&rsquo;s a good chance you&rsquo;re being underpaid:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Same rate on Sundays as Tuesdays',
              'No separate penalty rate lines on payslip',
              'No change in pay after getting trade qualification',
              'Casual loading explained as "covering weekends"',
              'Flat rate quoted regardless of day',
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', margin: 0 }}>&bull; {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments under the Restaurant Award</h2>
          <p style={{ ...smallStyle, marginBottom: '12px' }}>These are the exact patterns we see when people have been underpaid:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Wrong award applied', desc: 'Hospitality Award rates used instead of Restaurant Award rates. The two awards have different penalty multipliers and different classification structures.' },
              { title: 'Flat casual rate every day', desc: 'A flat casual rate that doesn\'t change on weekends or public holidays almost always means penalty rates are being absorbed illegally.' },
              { title: 'Level set too low and never reviewed', desc: 'Your employer must classify you based on your actual duties. If you\'ve gained qualifications or taken on more responsibility, your level should have increased.' },
              { title: 'Split shift allowance never paid', desc: 'If your working day is broken into two or more separate periods with an unpaid gap, you\'re owed the split shift allowance on top of your hourly rate.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...pStyle, marginTop: '12px', marginBottom: '0' }}>
            Most people experiencing one of these issues are underpaid by hundreds &mdash; sometimes thousands &mdash; of dollars per year.
          </p>
        </div>
      </section>

      {/* CTA mid-page */}
      <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />

      {/* Pay rates by role */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Pay rates by role</h2>
        <p style={pStyle}>See pay rates specific to your job:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/awards/restaurant-award/waitstaff-pay-rates', label: 'Waitstaff pay rates' },
            { href: '/awards/restaurant-award/cook-pay-rates', label: 'Cook & chef pay rates' },
            { href: '/awards/restaurant-award/cafe-worker-pay-rates', label: 'Café worker pay rates' },
            { href: '/awards/restaurant-award/catering-worker-pay-rates', label: 'Catering worker pay rates' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: 'block', padding: '12px 16px', border: '1.5px solid var(--border)',
              borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
              color: 'var(--secondary)',
            }}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* Intent page links */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Think something&apos;s wrong with your pay?</h2>
        <p style={pStyle}>Start with the issue that sounds most like your situation:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/restaurant-award/am-i-being-underpaid" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Am I being underpaid?</a> &mdash; the signs and what to do</li>
          <li><a href="/awards/restaurant-award/wrong-award-applied" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Wrong award applied?</a> &mdash; Hospitality vs Restaurant Award</li>
          <li><a href="/awards/restaurant-award/not-getting-overtime" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Not getting overtime?</a> &mdash; the 7.6-hour daily trigger</li>
          <li><a href="/awards/restaurant-award/junior-pay-rates" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Junior pay rates</a> &mdash; under-21 rates and penalties</li>
          <li><a href="/awards/restaurant-award/pay-too-low" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Pay feels too low?</a> &mdash; diagnostic checklist</li>
          <li><a href="/awards/restaurant-award/flat-rate-restaurant" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Flat rate — is it legal?</a> &mdash; the pass/fail test</li>
        </ul>
      </section>

      {/* Common scenarios */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Common scenarios</h2>
        <p style={pStyle}>Answers to specific situations restaurant and caf&eacute; workers ask about:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
          {[
            { href: '/awards/restaurant-award/scenarios/sunday-rate-wrong', label: 'My Sunday rate looks wrong' },
            { href: '/awards/restaurant-award/scenarios/wrong-award-cafe', label: 'My café uses the Hospitality Award' },
            { href: '/awards/restaurant-award/scenarios/trade-qualified-wrong-level', label: 'Trade-qualified but below Level 4' },
            { href: '/awards/restaurant-award/scenarios/split-shift-allowance-missing', label: 'Split shift allowance missing' },
            { href: '/awards/restaurant-award/scenarios/kitchen-overtime-unpaid', label: 'Long kitchen shifts, no overtime' },
            { href: '/awards/restaurant-award/scenarios/late-night-no-loading', label: 'No loading after 10pm' },
            { href: '/awards/restaurant-award/scenarios/public-holiday-restaurant', label: 'Worked a public holiday' },
            { href: '/awards/restaurant-award/scenarios/christmas-day-restaurant', label: 'Worked Christmas Day' },
            { href: '/awards/restaurant-award/scenarios/chef-salary-overtime', label: 'Chef on salary — overtime owed?' },
            { href: '/awards/restaurant-award/scenarios/underpaid-years', label: 'Underpaid for years — what now?' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: 'block', padding: '10px 14px', fontSize: '13.5px',
              color: 'var(--secondary)', textDecoration: 'underline', textDecorationColor: 'var(--border)',
            }}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ ...sectionStyle, marginTop: '2.5rem' }}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            { q: 'Does the Restaurant Award apply to caf\u00e9s?', a: 'Yes \u2014 the Restaurant Industry Award covers standalone caf\u00e9s. If the caf\u00e9 is part of a hotel or accommodation venue, the Hospitality Award applies instead. For standalone caf\u00e9s operating independently, the Restaurant Award is the correct award.' },
            { q: 'My Sunday rate looks the same as a Tuesday \u2014 is that ever legal?', a: 'Rarely. Under the Restaurant Award, Sunday attracts a significant penalty rate for both permanent and casual employees. If you\u2019re being paid the same rate on a Sunday as a Tuesday, it\u2019s almost certainly an underpayment \u2014 unless your employer can prove a flat rate that demonstrably exceeds every award entitlement in every scenario.' },
            { q: 'I have a Certificate III in Commercial Cookery \u2014 what level am I?', a: 'Level 4 minimum. A Certificate III in Commercial Cookery is a trade qualification, and the Restaurant Award requires that trade-qualified cooks be classified at Level 4 or above. If you\u2019re still being paid at Level 2 or 3, you\u2019re being underpaid.' },
            { q: 'Does casual loading replace my penalty rates?', a: 'No \u2014 and this is one of the most common misunderstandings. Casual loading (25%) compensates for not receiving paid leave. Penalty rates are separate and apply on top. A casual working a Sunday receives their base rate, plus the 25% loading, plus the Sunday penalty rate. If you\u2019re only getting the loading, you\u2019re being underpaid.' },
            { q: 'How far back can I claim underpayment?', a: 'Six years. Under the Fair Work Act, you can claim underpayments going back up to 6 years from the date you lodge. That means even small weekly underpayments can add up to very large amounts over time. Don\u2019t wait \u2014 the longer you leave it, the more you may lose as older shifts fall outside the window.' },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h3 style={h3Style}>{item.q}</h3>
              <p style={{ ...pStyle, marginBottom: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Does the Restaurant Award apply to caf\u00e9s?', acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 the Restaurant Industry Award covers standalone caf\u00e9s. If the caf\u00e9 is part of a hotel or accommodation venue, the Hospitality Award applies instead.' } },
              { '@type': 'Question', name: 'My Sunday rate looks the same as a Tuesday \u2014 is that ever legal?', acceptedAnswer: { '@type': 'Answer', text: 'Rarely. Under the Restaurant Award, Sunday attracts a significant penalty rate. If you\u2019re being paid the same on Sunday as Tuesday, it\u2019s almost certainly an underpayment.' } },
              { '@type': 'Question', name: 'I have a Certificate III in Commercial Cookery \u2014 what level am I?', acceptedAnswer: { '@type': 'Answer', text: 'Level 4 minimum. A Certificate III in Commercial Cookery is a trade qualification, and the Restaurant Award requires trade-qualified cooks be classified at Level 4 or above.' } },
              { '@type': 'Question', name: 'Does casual loading replace my penalty rates?', acceptedAnswer: { '@type': 'Answer', text: 'No. Casual loading (25%) compensates for not receiving paid leave. Penalty rates are separate and apply on top. A casual working a Sunday receives base rate + 25% loading + Sunday penalty rate.' } },
              { '@type': 'Question', name: 'How far back can I claim underpayment?', acceptedAnswer: { '@type': 'Answer', text: 'Six years. Under the Fair Work Act, you can claim underpayments going back up to 6 years from the date you lodge.' } },
            ],
          }),
        }}
      />

      {/* Final CTA */}
      <section style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ ...h2Style, fontSize: '1.25rem', textAlign: 'center' }}>
          Don&rsquo;t guess &mdash; small underpayments add up fast.
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '500px', margin: '0 auto 16px' }}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including overtime, penalty rates, and allowances. It takes 2 minutes &mdash; and you&rsquo;ll know for certain.
        </p>
        <a
          href="/check-my-pay?award=MA000119"
          style={{
            display: 'inline-block',
            background: 'var(--primary)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '15px',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Check my pay &rarr;
        </a>
        <p style={{ ...smallStyle, marginTop: '12px' }}>
          Based on official pay rates from the Fair Work Commission (MA000119).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for MA000119, effective 1 July 2025. General information only &mdash; not legal advice. Verify rates at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
