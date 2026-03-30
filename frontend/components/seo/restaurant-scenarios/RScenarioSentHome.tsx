/**
 * Scenario: Sent Home Early — /awards/restaurant-award/scenarios/sent-home-early
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function RScenarioSentHome({ rates }: { rates?: RestaurantRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  const casualRate = l2?.casualRate ?? 0;
  const paid45min = Math.round(casualRate * 0.75 * 100) / 100;
  const minEngagement = Math.round(casualRate * 2 * 100) / 100;
  const shortfall = Math.round((minEngagement - paid45min) * 100) / 100;
  const yearlyShortfall = Math.round(shortfall * 50 * 100) / 100;

  const faqData = [
    { question: 'I arrived but my shift was cancelled — am I still owed pay?', answer: 'Yes. If you attended work as required, you\'re entitled to the minimum engagement pay — 2 hours for casuals. Even if you\'re told to go home immediately, the minimum engagement applies.' },
    { question: 'What is the public holiday minimum engagement?', answer: 'For permanent and part-time employees working on a public holiday, the minimum engagement is 4 hours. This means even if you\'re sent home after 1 hour on a public holiday, you must be paid for 4 hours at the applicable public holiday rate.' },
    { question: 'What rate am I paid for the minimum engagement period?', answer: 'You\'re paid at the applicable rate for that day and time. If the minimum engagement falls on a Sunday, you get the Sunday rate. If it\'s a public holiday, you get the public holiday rate. The minimum engagement doesn\'t reduce your rate — it guarantees minimum hours at the correct rate.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          At least 2 hours&apos; pay &mdash; that&apos;s the casual minimum engagement under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>. If you&apos;re permanent or part-time and it&apos;s a public holiday, the minimum is 4 hours. Your employer cannot roster you for less or send you home without paying the minimum.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Sent home after 30 minutes? You&apos;re still owed the full minimum engagement.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Casual employees: minimum engagement of 2 hours per shift</li>
          <li>Permanent/part-time on a public holiday: minimum engagement of 4 hours</li>
        </ul>
        <p style={pStyle}>These minimums apply regardless of how long you actually work. If you&apos;re sent home early, the minimum engagement pay is still owed.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Casual sent home after 45 minutes on a weekday</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Casual Level 2 weekday rate: {formatCurrency(casualRate)}/hr</li>
            <li>Paid for 45 minutes: {formatCurrency(paid45min)}</li>
            <li>Minimum engagement (2 hours): {formatCurrency(minEngagement)}</li>
            <li>Shortfall: {formatCurrency(shortfall)}</li>
          </ul>
          <p style={smallStyle}>
            If this happens once a week over a year, that&apos;s roughly {formatCurrency(yearlyShortfall)} in missing minimum engagement pay.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Were you paid for at least 2 hours on each casual shift?</li>
          <li>On public holidays, were you paid for at least 4 hours (permanent/PT)?</li>
          <li>Was the rate correct for the day and time of the shift?</li>
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
        <p style={pStyle}>Check your minimum engagement pay is correct for every shift.</p>
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
