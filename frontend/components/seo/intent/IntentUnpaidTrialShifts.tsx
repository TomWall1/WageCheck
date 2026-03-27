/**
 * High-intent: Unpaid Trial Shifts in Hospitality — Are They Legal?
 * URL: /awards/hospitality-award/unpaid-trial-shifts
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
  { question: 'What if the employer says I didn\'t perform well enough to deserve pay?', answer: 'Performance during a trial is irrelevant to the obligation to pay. If you worked, you must be paid.' },
  { question: 'What if I signed something agreeing to an unpaid trial?', answer: 'That agreement is very likely unenforceable. Award entitlements cannot be waived by agreement. The Fair Work Ombudsman has successfully recovered wages for workers who signed such agreements.' },
  { question: 'It was only 2 hours \u2014 is it worth pursuing?', answer: 'Yes. The minimum engagement period under the Hospitality Award is 3 hours per shift \u2014 meaning even a 2-hour trial triggers a 3-hour payment obligation. The amount may be more than you think.' },
];

export default function IntentUnpaidTrialShifts({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;ve worked a trial shift in hospitality and weren&apos;t paid for it, there&apos;s a high chance that was illegal. Unpaid trial shifts are one of the most commonly used unlawful practices in the industry &mdash; particularly targeting young workers and people new to the workforce who are unlikely to know their rights. The law on this is clear and has been for years.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve ever worked a trial shift in hospitality without being paid &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> 19-year-old applies for a kitchen hand role. Told to come in for a &quot;trial&quot; on Saturday from 10am to 4pm &mdash; unpaid.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Any trial shift beyond a short, genuine assessment must be paid. 6 hours of genuine work must be compensated.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Amount owed: 6 hours &times; Saturday casual Level 1 rate ({rates ? formatCurrency(getLevel(rates, 1)?.saturdayCasual ?? 0) : '$36.15'}/hr) = {rates ? formatCurrency((getLevel(rates, 1)?.saturdayCasual ?? 0) * 6) : '$216.90'}
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer frames it as &quot;seeing if you&apos;re a good fit.&quot; Young workers don&apos;t question it. The practice is widespread and almost always unlawful.
          </p>
        </div>
      </section>

      {/* What does the law say */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What does the law say about trial shifts?</h2>
        <p style={pStyle}>
          Under the Fair Work Act and the Hospitality Award, all work must be paid. There is no legal provision for unpaid trial shifts of any significant duration.
        </p>
        <p style={pStyle}>
          The Fair Work Ombudsman&apos;s position is clear:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>A very brief observation of a candidate&apos;s skills &mdash; typically no more than one hour &mdash; may be acceptable as an unpaid assessment</li>
          <li>Any work beyond that brief assessment must be paid at the applicable award rate</li>
          <li>A 4, 5, or 6-hour &quot;trial&quot; where the person is actually working &mdash; serving customers, preparing food, cleaning &mdash; is employment, not a trial</li>
        </ul>
        <p style={pStyle}>
          If you worked more than about an hour on a trial shift and weren&apos;t paid, you&apos;re almost certainly owed money for that time.
        </p>
        <p style={pStyle}>
          If this has happened to you, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check what you&apos;re owed now</a>.
        </p>
      </section>

      {/* What should you have been paid */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What should you have been paid?</h2>
        <p style={pStyle}>
          If the trial shift was unpaid and it exceeded the reasonable short-assessment threshold, you&apos;re owed the applicable award rate for every hour worked:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Your classification level (likely Level 1 for a first shift)</li>
          <li>The correct day rate (including Saturday or Sunday rates if applicable)</li>
          <li>The minimum engagement period &mdash; 3 hours &mdash; even if the trial was shorter</li>
        </ul>
        <div style={exampleBoxStyle}>
          <p style={pStyle}>
            <strong>Example:</strong> A 3-hour unpaid Sunday trial for a kitchen hand (Level 1 casual) = 3 &times; {rates ? formatCurrency(getLevel(rates, 1)?.sundayCasual ?? 0) : '$42.18'} = {rates ? formatCurrency((getLevel(rates, 1)?.sundayCasual ?? 0) * 3) : '$126.54'} owed.
          </p>
        </div>
      </section>

      {/* Warning box */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; How unpaid trials are framed &mdash; and why they&apos;re still illegal</h2>

          <h3 style={h3Style}>&quot;It&apos;s just to see if you&apos;re a good fit&quot;</h3>
          <p style={pStyle}>
            The framing doesn&apos;t change the legal position. If productive work was performed, it must be paid.
          </p>

          <h3 style={h3Style}>&quot;Everyone does a trial shift here&quot;</h3>
          <p style={pStyle}>
            Industry prevalence doesn&apos;t make it legal. The Fair Work Act applies regardless of what&apos;s common practice at a particular venue.
          </p>

          <h3 style={h3Style}>&quot;You didn&apos;t get the job so we don&apos;t owe you anything&quot;</h3>
          <p style={pStyle}>
            The obligation to pay arises when the work is performed &mdash; not when the job is offered. Whether you got the role is irrelevant.
          </p>

          <h3 style={h3Style}>&quot;You agreed to the trial&quot;</h3>
          <p style={pStyle}>
            You cannot legally agree to waive your entitlement to pay for work performed. Any such agreement is not enforceable under the Fair Work Act.
          </p>
        </div>
      </section>

      {/* How to recover */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to recover payment for an unpaid trial shift</h2>
        <p style={pStyle}>
          <strong>Step 1:</strong> Document what you can &mdash; when the shift was, how long it lasted, what work you did. Text messages, emails, or even a written note made at the time all help.
        </p>
        <p style={pStyle}>
          <strong>Step 2:</strong> Contact the employer in writing. State the hours worked, the applicable rate, and the amount owed. Many employers pay immediately when approached directly.
        </p>
        <p style={pStyle}>
          <strong>Step 3:</strong> If no response or refusal, contact the Fair Work Ombudsman on 13 13 94 or lodge online at fairwork.gov.au. They investigate these claims and can recover payment.
        </p>
        <p style={pStyle}>
          See the full <a href="/guides/how-to-report-underpayment" style={linkStyle}>guide to reporting underpayment</a>.
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
          Don&apos;t guess &mdash; calculate what you were owed.
        </p>
        <p style={pStyle}>
          Enter the trial shift details below and see exactly what should have been paid.
        </p>
        <p style={pStyle}>
          It takes 2 minutes.
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
