/**
 * High-intent: Is My Hospitality Pay Rate Legal?
 * URL: /awards/hospitality-award/hourly-rate-check
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left', borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'My employer says $X/hr is "the award rate" \u2014 how do I verify?', answer: 'Check the Fair Work Commission pay guide for MA000009 directly at fairwork.gov.au \u2014 it lists every rate for every classification and shift type. Or use the tool below which applies those rates to your actual shifts.' },
  { question: 'My rate is above minimum wage but I\'m not sure about the award \u2014 what applies?', answer: 'The award applies \u2014 not just the minimum wage. The award rates vary by classification and day type, and are what your employer must comply with. The national minimum wage is only relevant if your award rate falls below it (which it sometimes does at entry level, in which case the minimum wage applies instead).' },
  { question: 'I think I\'m classified incorrectly \u2014 does that affect this?', answer: 'Significantly. If your classification is set too low, your legal minimum rate is calculated from the wrong base \u2014 meaning every ordinary hour and every penalty rate is also underpaid.' },
];

export default function IntentHourlyRateCheck({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re not sure whether your hourly rate is correct under the Hospitality Award, the answer isn&apos;t a single number &mdash; it depends on your classification level, whether you&apos;re permanent or casual, and what day and time you&apos;re working. A rate that&apos;s legal on a Tuesday morning may be significantly underpaid on a Sunday afternoon. This page gives you the real answer for your situation.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in hospitality and you&apos;ve ever wondered whether your hourly rate is right &mdash; this page will tell you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual bartender, Level 2, told $32/hr is their award rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>The truth:</strong> $32/hr is below the casual Sunday rate ({rates ? formatCurrency(getLevel(rates, 2)?.sundayCasual ?? 0) : '$44.24'}/hr) and below the casual public holiday rate ({rates ? formatCurrency(getLevel(rates, 2)?.publicHolidayCasual ?? 0) : '$56.88'}/hr) for Level 2. It&apos;s also below the casual Saturday rate ({rates ? formatCurrency(getLevel(rates, 2)?.saturdayCasual ?? 0) : '$37.92'}/hr).
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment on one 8-hour Sunday shift: ~$98
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The employer quotes the ordinary casual rate as if it applies every day. It doesn&apos;t &mdash; and many workers never check.
          </p>
        </div>
      </section>

      {/* Permanent rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The minimum legal rates under the Hospitality Award (MA000009)</h2>
        <p style={pStyle}>
          The legal minimum depends on four things: your level, your employment type, the day, and the time. Here are the key rates for adult employees:
        </p>

        <h3 style={h3Style}>Permanent (full-time or part-time) minimum rates</h3>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Weekday</th>
                <th style={thStyle}>Saturday</th>
                <th style={thStyle}>Sunday</th>
                <th style={thStyle}>Public holiday</th>
              </tr>
            </thead>
            <tbody>
              {rates ? rates.levels.filter(l => l.level >= 1 && l.level <= 5).map(l => (
                <tr key={l.level}>
                  <td style={tdStyle}>Level {l.level}</td>
                  <td style={tdStyle}>{formatCurrency(l.ftRate)}/hr</td>
                  <td style={tdStyle}>{formatCurrency(l.saturdayFt)}/hr</td>
                  <td style={tdStyle}>{formatCurrency(l.sundayFt)}/hr</td>
                  <td style={tdStyle}>{formatCurrency(l.publicHolidayFt)}/hr</td>
                </tr>
              )) : (
                <>
                  <tr><td style={tdStyle}>Level 1</td><td style={tdStyle}>$24.10/hr</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>$36.15/hr</td><td style={tdStyle}>$54.23/hr</td></tr>
                  <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>$25.28/hr</td><td style={tdStyle}>$31.60/hr</td><td style={tdStyle}>$37.92/hr</td><td style={tdStyle}>$56.88/hr</td></tr>
                  <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>$26.10/hr</td><td style={tdStyle}>$32.63/hr</td><td style={tdStyle}>$39.15/hr</td><td style={tdStyle}>$58.73/hr</td></tr>
                  <tr><td style={tdStyle}>Level 4</td><td style={tdStyle}>$27.32/hr</td><td style={tdStyle}>$34.15/hr</td><td style={tdStyle}>$40.98/hr</td><td style={tdStyle}>$61.47/hr</td></tr>
                  <tr><td style={tdStyle}>Level 5</td><td style={tdStyle}>$28.60/hr</td><td style={tdStyle}>$35.75/hr</td><td style={tdStyle}>$42.90/hr</td><td style={tdStyle}>$64.35/hr</td></tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <h3 style={h3Style}>Casual minimum rates (25% loading included)</h3>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Weekday</th>
                <th style={thStyle}>Saturday</th>
                <th style={thStyle}>Sunday</th>
                <th style={thStyle}>Public holiday</th>
              </tr>
            </thead>
            <tbody>
              {rates ? rates.levels.filter(l => l.level >= 1 && l.level <= 5).map(l => (
                <tr key={l.level}>
                  <td style={tdStyle}>Level {l.level}</td>
                  <td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td>
                  <td style={tdStyle}>{formatCurrency(l.saturdayCasual)}/hr</td>
                  <td style={tdStyle}>{formatCurrency(l.sundayCasual)}/hr</td>
                  <td style={tdStyle}>{formatCurrency(l.publicHolidayCasual)}/hr</td>
                </tr>
              )) : (
                <>
                  <tr><td style={tdStyle}>Level 1</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>$36.15/hr</td><td style={tdStyle}>$42.18/hr</td><td style={tdStyle}>$54.23/hr</td></tr>
                  <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>$31.60/hr</td><td style={tdStyle}>$37.92/hr</td><td style={tdStyle}>$44.24/hr</td><td style={tdStyle}>$56.88/hr</td></tr>
                  <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>$32.63/hr</td><td style={tdStyle}>$39.15/hr</td><td style={tdStyle}>$45.68/hr</td><td style={tdStyle}>$58.73/hr</td></tr>
                  <tr><td style={tdStyle}>Level 4</td><td style={tdStyle}>$34.15/hr</td><td style={tdStyle}>$40.98/hr</td><td style={tdStyle}>$47.81/hr</td><td style={tdStyle}>$61.47/hr</td></tr>
                  <tr><td style={tdStyle}>Level 5</td><td style={tdStyle}>$35.75/hr</td><td style={tdStyle}>$42.90/hr</td><td style={tdStyle}>$50.05/hr</td><td style={tdStyle}>$64.35/hr</td></tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Compare your rate against the table. If what you&apos;re paid falls below the relevant cell, you&apos;re being underpaid. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your pay now</a>.
        </p>
      </section>

      {/* What if above weekday but work weekends */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What if my rate is above the weekday minimum but I work weekends?</h2>
        <p style={pStyle}>
          This is the most common situation. A rate that looks fine on a weekday is often insufficient when you factor in weekend and public holiday rates. If you&apos;re paid $34/hr flat but work Sundays, compare $34 against the Sunday rate for your level &mdash; not just the weekday rate.
        </p>
        <p style={pStyle}>
          If your flat rate doesn&apos;t clear the Sunday or public holiday rate for your classification, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now</a>.
        </p>
      </section>

      {/* Classification */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What if I don&apos;t know my classification level?</h2>
        <p style={pStyle}>
          Your classification should appear on your payslip. If it doesn&apos;t, ask your employer &mdash; they&apos;re legally required to tell you. You can also compare your typical duties against the level descriptions:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Doing basic tasks under supervision</strong> &rarr; Level 1</li>
          <li><strong>Working independently in your area</strong> &rarr; Level 2</li>
          <li><strong>Training others, handling complaints, running sections</strong> &rarr; Level 3</li>
          <li><strong>Supervising a team or holding a trade qualification</strong> &rarr; Level 4</li>
        </ul>
        <p style={pStyle}>
          See the full <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a>.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
          Don&apos;t guess &mdash; enter your shifts and find out.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain whether your rate is correct.
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
