/**
 * Scenario: Level 3 Rate Breakdown — /awards/restaurant-award/scenarios/level-3-breakdown
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel, getLateNightLoading, getEarlyMorningLoading } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function RScenarioLevel3Breakdown({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const casualRate = l3?.casualRate ?? 0;
  const sundayCasual = l3?.sundayCasual ?? 0;
  const saturdayCasual = l3?.saturdayCasual ?? 0;
  const phCasual = l3?.publicHolidayCasual ?? 0;
  const lateNight = rates ? getLateNightLoading(rates) : 0;
  const earlyMorning = rates ? getEarlyMorningLoading(rates) : 0;
  const sundayGap = Math.round((sundayCasual - casualRate) * 100) / 100;
  const sundayShiftGap = Math.round(sundayGap * 6 * 100) / 100;

  const faqData = [
    { question: 'What\'s the difference between Level 3 and Level 2?', answer: 'Level 3 covers employees with additional skills or trade qualifications — such as qualified cooks, experienced bar staff, or those performing higher-level duties. Check the classification descriptions in the award to confirm your correct level based on your duties and training.' },
    { question: 'How do I verify my payslip matches the correct rate for each shift type?', answer: 'Compare each line item on your payslip against the award rate for that specific shift type. Weekday, Saturday, Sunday, public holiday, and late night shifts should all show different rates. If they\'re all the same, your penalty rates are likely wrong.' },
    { question: 'Do penalty loadings stack?', answer: 'Yes, certain loadings can stack. For example, a Saturday shift that runs past 10pm attracts both the Saturday penalty rate and the late night loading. Check each shift against the applicable combination of penalties for the day and time.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Most shifts at Level 3 attract extra pay above the ordinary weekday rate. Saturday, Sunday, public holidays, late nights after 10pm, and early morning shifts all have separate <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates</a> or loadings under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>. If you&apos;re being paid a flat rate regardless of when you work, you&apos;re almost certainly being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Level 3 and getting the same rate every shift? Check the breakdown below.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The full breakdown</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 3 casual rates by shift type</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li><strong>Ordinary weekday:</strong> base casual rate ({formatCurrency(casualRate)}/hr)</li>
            <li><strong>Saturday:</strong> {formatCurrency(saturdayCasual)}/hr</li>
            <li><strong>Sunday:</strong> {formatCurrency(sundayCasual)}/hr</li>
            <li><strong>Public holiday:</strong> {formatCurrency(phCasual)}/hr</li>
            <li><strong>Late night (10pm&ndash;midnight):</strong> base rate + {formatCurrency(lateNight)}/hr loading</li>
            <li><strong>Early morning (midnight&ndash;6am):</strong> base rate + {formatCurrency(earlyMorning)}/hr loading</li>
          </ul>
          <p style={smallStyle}>
            Each shift type has a distinct rate. A flat rate that doesn&apos;t change by day or time is a red flag.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>L3 casual receiving ordinary rate on weekends</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Saturday 6-hour shift gap: {formatCurrency(Math.round((saturdayCasual - casualRate) * 6 * 100) / 100)}</li>
            <li>Sunday 6-hour shift gap: {formatCurrency(sundayGap)}/hr &times; 6hrs = {formatCurrency(sundayShiftGap)}</li>
            <li>Combined weekly gap (1 Saturday + 1 Sunday): {formatCurrency(Math.round(((saturdayCasual - casualRate) * 6 + sundayShiftGap) * 100) / 100)}</li>
          </ul>
          <p style={smallStyle}>
            Over 50 weeks, the annual gap from just one Saturday and one Sunday shift per week exceeds {formatCurrency(Math.round(((saturdayCasual - casualRate) * 6 + sundayShiftGap) * 50 * 100) / 100)} &mdash; from penalty rates alone.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are Saturday, Sunday, and public holiday hours shown as separate line items?</li>
          <li>Does each line item show a different (higher) rate?</li>
          <li>Are late night hours (after 10pm) attracting a loading?</li>
          <li>Is your classification listed as Level 3?</li>
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
        <p style={pStyle}>Check every shift type against the correct Level 3 rate.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at fairwork.gov.au.
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
