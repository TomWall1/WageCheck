/**
 * High-intent: My Fitness Industry Pay Seems Too Low
 * URL: /awards/fitness-award/pay-too-low-fitness
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
  { question: 'I feel like I\'m paid too low but I don\'t know the exact rate I should get — how do I check?', answer: 'You need to know two things: your classification level under the Fitness Industry Award and your employment type (full-time, part-time, or casual). Once you have those, you can look up the minimum hourly rate in the current pay guide. Use the pay checker below to see the exact rate for your situation.' },
  { question: 'My employer says the industry just doesn\'t pay well — is that a valid excuse?', answer: 'No. The award sets legal minimums that every employer must meet regardless of industry norms or business size. "The industry doesn\'t pay well" is not a defence for paying below the award. If your rate is below the minimum for your classification level, your employer is breaking the law.' },
  { question: 'I\'m a student working part-time at a gym — do I still get award rates?', answer: 'Yes. Being a student does not reduce your entitlements under the Fitness Industry Award. You are entitled to the full award rate for your classification level and employment type. The only exception is if you are under 21, in which case junior rates may apply — but junior rates are still set by the award and have specific minimums.' },
];

export default function FitnessIntentPayTooLow({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your fitness industry pay feels too low, trust that instinct. The <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> sets minimum rates that many employers fail to meet &mdash; not always deliberately, but consistently. Between split shift allowances that are never paid, classification levels that are never reviewed, and annual rate increases that are never applied, the gap between what you earn and what you&apos;re owed can be significant.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Feeling underpaid isn&apos;t just a feeling. In fitness, it&apos;s usually a fact you can calculate.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Every fitness worker covered by the Fitness Industry Award (MA000094) has a legally enforceable minimum hourly rate. This rate depends on your classification level and employment type, and it increases each year (usually from 1 July). On top of the base rate, you&apos;re entitled to penalty rates for weekends and public holidays, overtime for excess hours, and allowances for things like split shifts.
        </p>
        <p style={pStyle}>
          If any of these components are missing from your pay, you&apos;re being paid below your legal entitlement.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Part-time swim teacher, works 20 hours per week across early morning and evening sessions (split shifts). Has been at the same gym for 2 years. Rate hasn&apos;t changed since starting.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Issue 1:</strong> Rate hasn&apos;t been updated to reflect the latest annual increase &mdash; immediately below the current award minimum.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Issue 2:</strong> Works split shifts 4 days a week but receives no split shift allowance.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Issue 3:</strong> After 2 years and increased responsibility (now runs the junior swim program), classification level should have been reviewed.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Three separate issues, each small on its own, that together add up to $60&ndash;$100+ per week.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Has your hourly rate increased since the last 1 July annual review?</li>
          <li>Does your classification level match your actual duties and experience?</li>
          <li>Are you receiving split shift allowances when you work broken shifts?</li>
          <li>Do your weekend and public holiday rates differ from your weekday rate?</li>
          <li>Is superannuation being paid on top of your wages (currently 12%)?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Find out exactly what you should be earning</h2>
        <p style={pStyle}>
          Enter your shifts, classification, and employment type. The calculator compares your actual pay against the award.
        </p>
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

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Stop wondering &mdash; check your pay against the award in 2 minutes.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000094).
        </p>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fitness Industry Award 2020 (MA000094), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
