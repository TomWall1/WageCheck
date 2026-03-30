/**
 * High-intent: Not Getting Overtime at a Restaurant or Cafe?
 * URL: /awards/restaurant-award/overtime-restaurant
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
  { question: 'Long hours are just how restaurants work — does the award really apply?', answer: 'Yes. The Restaurant Industry Award applies regardless of industry norms. Working long hours is common in kitchens, but overtime rates are a legal entitlement. "That\'s just how it is" is not a valid reason to withhold overtime pay.' },
  { question: 'I\'m on a salary — does overtime still apply?', answer: 'Only if the salary demonstrably covers all award entitlements including overtime for every hour actually worked. If your salary divided by actual hours drops below what the award requires for those hours (including overtime rates), you\'re being underpaid.' },
  { question: 'Can I claim back unpaid overtime?', answer: 'Yes. You can claim unpaid overtime going back up to 6 years under the Fair Work Act. Calculate the exact amount first, then raise it with your employer or the Fair Work Ombudsman on 13 13 94.' },
];

export default function RestaurantIntentOvertime({ rates }: { rates: RestaurantRateData }) {
  const l4 = getLevel(rates, 4);

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you regularly work long hours in a restaurant or caf&eacute; and your pay looks the same regardless of how many hours you clock, there&apos;s a high chance overtime isn&apos;t being calculated correctly. The 7.6-hour daily overtime trigger is lower than many people realise &mdash; and in an industry where 10 to 12-hour kitchen shifts are common, that trigger is hit almost every day.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work more than 7.6 hours in a day or more than 38 hours in a week &mdash; this applies to you.
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
            <strong>Scenario:</strong> Full-time Level 4 cook working 10-hour shifts, 5 days per week &mdash; 50 hours total. Paid a flat rate for all hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginTop: '0' }}>
            <li>38 hours at ordinary rate ({l4 ? formatCurrency(l4.ftRate) : '$27.41'}/hr)</li>
            <li>First 2 hours overtime each day (2 hrs &times; 5 days = 10 hrs) at 1.5&times; = {l4 ? formatCurrency(l4.ftRate * 1.5) : '$41.12'}/hr</li>
            <li>Any hours beyond 10 in a day at 2&times; = {l4 ? formatCurrency(l4.ftRate * 2) : '$54.82'}/hr</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~{l4 ? formatCurrency(l4.ftRate * 0.5 * 10) : '$137'}/week in missed overtime alone.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer treats all hours as ordinary time. In a busy kitchen, nobody tracks the 7.6-hour threshold per day.
          </p>
        </div>
      </section>

      {/* When overtime applies */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When does overtime apply under the Restaurant Award?</h2>
        <p style={pStyle}>
          Overtime under the Restaurant Industry Award is triggered by two independent thresholds:
        </p>

        <h3 style={h3Style}>Daily threshold</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Full-time and part-time:</strong> Overtime applies after 7.6 hours in a day (or 10 hours by agreement)</li>
          <li><strong>Casual:</strong> Overtime applies after 12 hours in a day</li>
        </ul>

        <h3 style={h3Style}>Weekly threshold</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Full-time:</strong> Overtime applies after 38 hours in a week</li>
          <li><strong>Part-time:</strong> Overtime applies after the agreed ordinary hours</li>
        </ul>

        <p style={pStyle}>
          Both thresholds operate independently. You can trigger daily overtime without exceeding the weekly threshold, and vice versa. The first 2 hours of overtime are paid at 1.5&times; the ordinary rate, and all hours after that at 2&times;.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common overtime underpayments in restaurants</h2>

          <h3 style={h3Style}>Long kitchen shifts paid at flat rate</h3>
          <p style={pStyle}>
            A 10-hour shift means 2.4 hours of overtime every day. Over a 5-day week, that&apos;s 12 hours of overtime paid at the ordinary rate &mdash; a significant shortfall.
          </p>

          <h3 style={h3Style}>Salary assumed to absorb all hours</h3>
          <p style={pStyle}>
            A salary only covers overtime if the annualised amount demonstrably exceeds what the award requires for every hour actually worked. If it doesn&apos;t, the employer owes the difference.
          </p>

          <h3 style={h3Style}>TOIL offered at 1:1 instead of the overtime rate</h3>
          <p style={pStyle}>
            Time off in lieu must be taken at the overtime rate equivalent &mdash; 1 hour of overtime at 1.5&times; equals 1.5 hours of TOIL. Offering 1:1 TOIL is an underpayment.
          </p>

          <h3 style={h3Style}>Casual daily threshold ignored</h3>
          <p style={pStyle}>
            Casual employees trigger overtime after 12 hours in a single shift. Long casual shifts in busy periods often exceed this without overtime being applied.
          </p>
        </div>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if overtime is missing</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the exact amount.</strong> Enter your actual shifts and hours into the tool below to see what your overtime should be. <a href="/check-my-pay?award=MA000119" style={linkStyle}>Check your overtime now &rarr;</a></li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Present the calculation. Many employers don&apos;t realise the 7.6-hour daily trigger applies.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact the Fair Work Ombudsman.</strong> Call 13 13 94 if the issue isn&apos;t resolved. FWO can compel repayment of unpaid overtime.</li>
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
          Don&apos;t guess &mdash; enter your actual hours and see what your overtime should be.
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
