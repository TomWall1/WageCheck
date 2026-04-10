/**
 * Scenario: Early Morning Fitness Shift — What's the Loading?
 * URL: /awards/fitness-award/scenarios/early-morning
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
  { question: 'Does a 5:30am class count as an early morning shift?', answer: 'Yes. If your shift starts before the ordinary span of hours defined in the award, you are working outside ordinary hours. This typically triggers penalty loadings or overtime rates depending on the specific provisions. Even arriving at 5:15am to set up counts as time worked.' },
  { question: 'I start at 5am every day — can my employer roster me at that time?', answer: 'Your employer can roster early starts, but hours worked outside the ordinary span attract higher rates. If you\'re being paid ordinary rates for 5am starts, the penalty component is missing from your pay.' },
  { question: 'Does the early morning loading stack with weekend penalties?', answer: 'It depends on the specific award provisions. Generally, you receive the highest applicable penalty rate rather than stacking multiple penalties. However, an early Saturday morning shift would attract the Saturday penalty rate, which is typically higher than the early morning loading on its own.' },
];

export default function FitnessScenarioEarlyMorning({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Early morning starts are a defining feature of fitness work. The 5am, 5:30am, 6am classes that gyms rely on are staffed by instructors and trainers who are rarely paid correctly for those hours. The <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> recognises that work outside ordinary hours attracts higher rates &mdash; but many employers treat 5am the same as 10am on the payslip.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re starting before the ordinary span of hours, you should be earning more than your standard rate.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fitness Industry Award defines a span of ordinary hours. Work performed outside this span &mdash; including early morning starts before the defined start time &mdash; attracts penalty loadings or is treated as overtime. The specific rate depends on whether the hours are before the ordinary span on a weekday, Saturday, or Sunday.
        </p>
        <p style={pStyle}>
          Time spent setting up before a class counts as time worked. If your 6am class requires you to arrive at 5:45am to unlock, set up equipment, and prepare &mdash; your shift starts at 5:45am, not 6am.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual group fitness instructor. Works 5:30am&ndash;8:30am Monday to Friday. Paid a flat casual rate for all 3 hours each day.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> Hours worked before the ordinary span should attract a penalty loading. The portion of the shift before the span starts is paid at a higher rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What actually happens:</strong> Employer pays the same flat casual rate for all hours, regardless of when they fall.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Over 5 early starts per week, the missing early morning loading adds up to $20&ndash;$40+ per week.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>What time does the ordinary span of hours start under the award?</li>
          <li>Does your payslip show a different rate for hours worked before that time?</li>
          <li>Is your setup/preparation time before the first class included in your paid hours?</li>
          <li>If you work early mornings on weekends, are weekend penalties being applied as well?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
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

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
