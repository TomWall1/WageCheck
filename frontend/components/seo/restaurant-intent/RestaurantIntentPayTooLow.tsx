/**
 * High-intent: My Restaurant or Cafe Pay Feels Too Low — Check What You're Owed
 * URL: /awards/restaurant-award/pay-too-low-restaurant
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
  { question: 'I don\'t know my classification level — how do I find out?', answer: 'Check your payslip or employment contract — it should list your classification level. If it doesn\'t, ask your employer directly. Your level is based on your duties and qualifications, not your job title. Use the Restaurant Award classification descriptions to see which level matches your actual work.' },
  { question: 'My employer says my rate is correct — how do I verify?', answer: 'Use the pay calculator tool below to enter your actual shifts, classification level, and employment type. The tool calculates exactly what the Restaurant Award requires for each shift. If the numbers don\'t match your payslip, you have a clear basis for a conversation.' },
  { question: 'I think there are multiple issues — where do I start?', answer: 'Start by calculating the complete picture. Enter all your shifts into the tool and compare the total against what you were actually paid. The tool identifies all underpayment sources at once — base rate, penalties, overtime, and allowances — so you can see the full amount before raising it with your employer.' },
];

export default function RestaurantIntentPayTooLow({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          This page walks through every possible source of underpayment under the Restaurant Award, one by one. Work through the list &mdash; if any step reveals a gap, the calculator below will show you exactly how much.
        </p>
        <p style={pStyle}>
          Restaurant and caf&eacute; pay has multiple layers: base rates that vary by classification level, penalty rates for weekends and public holidays, late-night loadings, split shift allowances, overtime after 7.6 hours, and meal allowances. An error in any one of these layers can leave you short &mdash; and in practice, underpayments rarely involve just one issue.
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
            <strong>Scenario:</strong> Permanent food &amp; beverage attendant, Level 3, 18 months at the same restaurant. Pay &quot;feels low&quot; but nothing obvious stands out.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Audit reveals three issues:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginTop: '0' }}>
            <li><strong>Classification:</strong> Correct at Level 3 &mdash; no issue here</li>
            <li><strong>Weekday rate:</strong> Correct at {l3 ? formatCurrency(l3.ftRate) : '$26.53'}/hr &mdash; no issue</li>
            <li><strong>Sunday rate:</strong> Missing. Paid weekday rate on Sundays instead of {l3 ? formatCurrency(l3.sundayFt) : '$37.14'}/hr &mdash; underpayment</li>
            <li><strong>Split shift allowance:</strong> Works split shifts twice a week but no allowance paid &mdash; underpayment</li>
            <li><strong>Late-night loading:</strong> Finishes after midnight twice a week but no loading applied &mdash; underpayment</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Combined shortfall: $80+ per week from three separate issues, none of which were obvious at first glance.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Restaurant pay checklist</h2>
        <p style={pStyle}>
          Work through each item below. If any one fails, your pay is likely wrong.
        </p>

        <div style={warningBoxStyle}>
          <ol style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '0' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Is your base rate correct for your classification level?</strong><br />
              <span style={smallStyle}>Check your hourly rate against the Restaurant Award pay rates for your level. <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>See current pay rates &rarr;</a></span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Are penalty rates appearing on your payslip for weekends?</strong><br />
              <span style={smallStyle}>Saturday and Sunday rates should be higher than weekday rates. If your pay is the same every day, penalties are missing. <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>See penalty rates &rarr;</a></span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Is the correct award being applied?</strong><br />
              <span style={smallStyle}>Standalone restaurants use MA000119, not the Hospitality Award (MA000009). <a href="/awards/restaurant-award/wrong-award-restaurant" style={linkStyle}>Check if wrong award is applied &rarr;</a></span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Is your classification level correct?</strong><br />
              <span style={smallStyle}>Your level should match your duties and qualifications. A trade-qualified cook should be Level 4+. <a href="/awards/restaurant-award/classifications" style={linkStyle}>See classification levels &rarr;</a></span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Are you receiving split shift allowance?</strong><br />
              <span style={smallStyle}>If your shift is broken into two or more parts (e.g., lunch and dinner service), you&apos;re entitled to a split shift allowance. <a href="/awards/restaurant-award/allowances" style={linkStyle}>See allowances &rarr;</a></span>
            </li>
            <li style={{ marginBottom: '0' }}>
              <strong>Is overtime appearing when you work long shifts?</strong><br />
              <span style={smallStyle}>Full-time and part-time employees trigger overtime after 7.6 hours per day. <a href="/awards/restaurant-award/overtime-restaurant" style={linkStyle}>Check overtime rules &rarr;</a></span>
            </li>
          </ol>
        </div>
      </section>

      {/* What payslip should show */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What your payslip should show</h2>
        <p style={pStyle}>
          A compliant payslip under the Restaurant Award should clearly show:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Your classification level (e.g., &quot;Level 3 &mdash; Food and Beverage Attendant&quot;)</li>
          <li>Separate line items for ordinary hours, Saturday hours, Sunday hours, and public holiday hours</li>
          <li>The hourly rate for each category (not just a blended total)</li>
          <li>Any allowances paid (split shift, meal, late night)</li>
          <li>Overtime hours and rates where applicable</li>
          <li>Casual loading (25%) if you&apos;re casual</li>
        </ul>
        <p style={pStyle}>
          If your payslip shows a single hourly rate or a lump sum with no breakdown, it&apos;s impossible to verify compliance &mdash; and that alone is a red flag.
        </p>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do next</h2>
        <p style={pStyle}>
          The fastest way to identify every issue at once is to enter your actual shifts into the calculator. It checks base rates, penalties, overtime, and allowances in one pass.
        </p>
        <p style={pStyle}>
          If you found one issue, check for the others too &mdash; underpayment rarely happens on just one dimension. Calculate the complete picture first, then raise everything together. A specific dollar figure makes the conversation easier.
        </p>
        <p style={pStyle}>
          If your employer won&apos;t fix it, contact the Fair Work Ombudsman on 13 13 94. They recover unpaid wages for free &mdash; going back up to 6 years.
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

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; check every layer at once. Enter your shifts and see exactly what you&apos;re owed.
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
