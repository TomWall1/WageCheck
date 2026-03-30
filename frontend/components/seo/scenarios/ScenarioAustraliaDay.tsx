/**
 * Scenario: Worked Australia Day in Hospitality — Is It Double Time?
 * URL: /awards/hospitality-award/scenarios/australia-day-pay
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

const faqData = [
  { question: 'My employer paid me double time and said that was right — is it?', answer: 'For the Hospitality Award, no. 2.25\u00d7 is the required multiplier. Double time (2\u00d7) falls short by 0.25 of your ordinary rate per hour.' },
  { question: 'I didn\'t know the rate should be 2.25\u00d7 — can I claim the difference for previous years?', answer: 'Yes. You can recover underpayments going back 6 years under the Fair Work Act.' },
  { question: 'Australia Day was a substitute day for me — does the same rate apply?', answer: 'Yes. The substitute public holiday attracts the same 2.25\u00d7 rate as the original public holiday.' },
];

export default function ScenarioAustraliaDay({ rates }: { rates?: HospitalityRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l2FtRate = l2?.ftRate ?? 25.28;
  const doubleTime = l2FtRate * 2 * 8;
  const correctRate = l2FtRate * 2.25 * 8;
  const shortfall = correctRate - doubleTime;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Better than double time &mdash; it&apos;s 2.25&times;. Australia Day is a national public holiday, and the Hospitality Award specifies a public holiday rate of 2.25 times the ordinary rate &mdash; not 2&times;. If you were paid double time and thought that was correct, you may have been underpaid on every public holiday shift you&apos;ve worked.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you worked Australia Day in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), all national public holidays &mdash; including Australia Day (26 January) &mdash; must be paid at 2.25&times; the ordinary rate for both permanent and casual adult employees.
        </p>
        <p style={pStyle}>
          2&times; (double time) is not correct. Even if double time sounds right, the Hospitality Award specifies 2.25&times; &mdash; meaning double time falls short by 0.25&times; of your ordinary rate per hour.
        </p>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>On an 8-hour shift at Level 2 permanent ({formatCurrency(l2FtRate)}/hr):</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>2&times; = {formatCurrency(doubleTime)}</li>
            <li>2.25&times; = {formatCurrency(correctRate)}</li>
            <li><strong>Shortfall: {formatCurrency(shortfall)} for that single shift</strong></li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Australia Day and weekend interaction</h2>
        <p style={pStyle}>Australia Day sometimes falls on a weekend. When it does:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The public holiday rate (2.25&times;) applies &mdash; not the Saturday or Sunday rate</li>
          <li>A substitute public holiday may be observed &mdash; the substitute day also attracts the public holiday rate</li>
        </ul>
        <p style={pStyle}>
          If Australia Day fell on a weekend and you were paid the Saturday or Sunday rate rather than the public holiday rate, you were underpaid.
        </p>
        <p style={pStyle}>
          If your Australia Day pay was at 2&times; or less, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your public holiday pay &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The difference between double time (2&times;) and the correct rate (2.25&times;) is 0.25&times; your ordinary rate per hour. At Level 2 permanent, that&apos;s approximately $6/hr on every public holiday hour worked. An 8-hour Australia Day shift: ~$50 underpaid in a single day &mdash; every year, on every public holiday where the wrong multiplier is applied.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does a public holiday line appear for your Australia Day shift?</li>
          <li>Is the rate 2.25&times; your ordinary rate &mdash; not 1.5&times; or 2&times;?</li>
          <li>If Australia Day fell on a weekend, was the public holiday rate applied (not just the weekend rate)?</li>
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
        <p style={pStyle}>
          Don&apos;t guess &mdash; calculate what Australia Day should have paid.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
