/**
 * High-intent: Not Getting Overtime in Hospitality?
 * URL: /awards/hospitality-award/not-getting-overtime
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
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
  { question: 'My employer says long hours are just part of working in hospitality \u2014 is that right?', answer: 'No. The Hospitality Award applies regardless of industry culture. An employer can ask you to work additional hours, but those hours must be paid at overtime rates once the thresholds are exceeded.' },
  { question: 'I\'m on a salary \u2014 do I still get overtime?', answer: 'You\'re entitled to overtime unless your salary is demonstrably higher than all award obligations every week you work. If you consistently work well over 38 hours, the salary probably doesn\'t cover it. Check your pay to find out.' },
  { question: 'Can I claim back unpaid overtime from previous years?', answer: 'Yes \u2014 up to 6 years under the Fair Work Act. The Fair Work Ombudsman can recover this on your behalf.' },
  { question: 'Does overtime apply on Sundays or public holidays?', answer: 'Yes \u2014 the daily threshold (10 hours) applies every day including weekends and public holidays. The higher rate (overtime or penalty rate, whichever is greater) applies to those excess hours.' },
];

export default function IntentNotGettingOvertime({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you regularly work more than 38 hours a week in hospitality and your pay looks identical every week, there&apos;s a high chance you&apos;re owed overtime that&apos;s never been paid. Long hours are normalised in the industry &mdash; but normalised doesn&apos;t mean legal. The Hospitality Award is clear about when overtime applies and what it must pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in any hospitality venue and regularly work past 38 hours a week or 10 hours in a single shift &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time kitchen supervisor, Level 4. Works 46 hours across 6 days every week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {rates ? formatCurrency(getLevel(rates, 4)?.ftRate ?? 0) : '$27.32'}/hr for all 46 hours &mdash; flat</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> 38 hours at {rates ? formatCurrency(getLevel(rates, 4)?.ftRate ?? 0) : '$27.32'}/hr; 8 hours of overtime at $40.98/hr (first 2hrs) then $54.64/hr (remaining 6hrs)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$165/week. ~$8,580/year.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer treats extra hours as &quot;part of the job.&quot; The overtime calculation is never run because the worker never asks and the employer never volunteers it.
          </p>
        </div>
      </section>

      {/* When does overtime apply */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When does overtime apply under the Hospitality Award?</h2>
        <p style={pStyle}>
          Overtime is triggered by two thresholds &mdash; either one is enough:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>More than 10 hours in a single day</strong> &rarr; overtime applies to every hour beyond 10</li>
          <li><strong>More than 38 ordinary hours in a week</strong> &rarr; overtime applies to every hour beyond 38</li>
        </ul>
        <p style={pStyle}>The rates:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>First 2 hours of overtime</strong> &rarr; 1.5&times; your ordinary rate (time-and-a-half)</li>
          <li><strong>After 2 hours</strong> &rarr; 2&times; your ordinary rate (double time)</li>
        </ul>
        <p style={pStyle}>
          If your payslip never shows overtime despite consistently working past these thresholds, that&apos;s a red flag. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Calculate your overtime shortfall &rarr;</a>
        </p>
      </section>

      {/* Common overtime underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common overtime underpayments in hospitality</h2>

          <h3 style={h3Style}>&quot;Extra shifts&quot; treated as ordinary hours</h3>
          <p style={pStyle}>
            Being asked to cover someone&apos;s shift or come in on a rostered day off. These hours count toward the weekly total and trigger overtime when 38 is exceeded.
          </p>
          <p style={pStyle}>
            If you regularly cover extra shifts, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Calculate your overtime shortfall &rarr;</a>
          </p>

          <h3 style={h3Style}>Long single shifts with no daily overtime applied</h3>
          <p style={pStyle}>
            A 12-hour shift contains 2 hours of daily overtime. Many employers pay a flat shift rate regardless of length. The daily threshold exists independently of the weekly one &mdash; exceed either and overtime applies.
          </p>

          <h3 style={h3Style}>Salary that &quot;absorbs&quot; all hours</h3>
          <p style={pStyle}>
            A salary arrangement is only legal if it demonstrably exceeds all award obligations &mdash; including overtime &mdash; in every week worked. If you regularly work 44+ hour weeks on a fixed salary, ask your employer to show you the calculation. If they can&apos;t, you&apos;re owed the difference.
          </p>

          <h3 style={h3Style}>TOIL taken hour-for-hour instead of at the overtime rate</h3>
          <p style={pStyle}>
            If you take time off in lieu instead of overtime pay, 1 hour of overtime at time-and-a-half = 1.5 hours TOIL &mdash; not 1 hour. Hour-for-hour TOIL is underpayment.
          </p>

          <h3 style={h3Style}>Part-time workers pushed beyond their agreed hours</h3>
          <p style={pStyle}>
            If you&apos;re part-time with agreed ordinary hours, work beyond those hours is overtime &mdash; even if the total week doesn&apos;t exceed 38.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>
              {faq.answer}
              {i === 2 && <> See <a href="/guides/how-to-report-underpayment" style={linkStyle}>how to report underpayment</a>.</>}
            </p>
          </details>
        ))}
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every overtime threshold.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
