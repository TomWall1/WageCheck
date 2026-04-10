/**
 * Scenario: Sunday Fast Food Shift — Where's My Penalty Rate?
 * /awards/fast-food-award/scenarios/sunday-no-penalty
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Do all fast food workers get Sunday penalty rates?', answer: 'Yes. Under the Fast Food Industry Award (MA000003), every employee working on a Sunday receives a penalty rate — 150% for full-time and part-time workers, and 175% for casuals. There are no exceptions based on role or seniority.' },
  { question: 'Can my employer average out my Sunday rate across the week?', answer: 'No. Sunday penalty rates must be paid for each hour worked on a Sunday. Your employer cannot spread the loading across the week to make it look like you\'re being paid correctly. Each day\'s pay must reflect the correct rate for that day.' },
  { question: 'What if my contract says I agreed to no penalty rates on Sundays?', answer: 'An employment contract or agreement cannot pay you less than the award rate. Even if you signed something agreeing to a flat rate, you are still legally entitled to Sunday penalties under the Fast Food Industry Award. Any clause that undercuts the award is void.' },
];

export default function FFScenarioSundayNoPenalty({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const casualRate = l1?.casualRate ?? 30.91;
  const sundayFt = Math.round(baseRate * 1.5 * 100) / 100;
  const sundayCasual = Math.round(casualRate * 1.75 / 1.25 * 100) / 100;
  const shift6hr = Math.round(sundayFt * 6 * 100) / 100;
  const flatPay = Math.round(baseRate * 6 * 100) / 100;
  const shortfall = Math.round((shift6hr - flatPay) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you worked a Sunday shift in fast food and were paid your normal weekday rate, you have been underpaid. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> requires penalty rates for every hour worked on a Sunday — no exceptions.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fast Food Industry Award (MA000003), full-time and part-time employees must be paid 150% of their ordinary hourly rate for all work performed on a Sunday. Casual employees receive 175% of the ordinary rate (not on top of casual loading — the 175% replaces the base casual rate for Sunday work). These rates apply from midnight Saturday to midnight Sunday.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 full-time, 6-hour Sunday shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary hourly rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Sunday rate (150%): ${sundayFt.toFixed(2)}/hr</li>
            <li>6-hour shift: ${shift6hr.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            If paid at the ordinary rate, you&apos;d receive ${flatPay.toFixed(2)} &mdash; a shortfall of ${shortfall.toFixed(2)} for a single shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is your Sunday shift listed as a separate line item with a penalty rate?</li>
          <li>Does the hourly rate shown for Sunday match 150% (permanent) or 175% (casual)?</li>
          <li>Are all hours between midnight Saturday and midnight Sunday captured at the penalty rate?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
