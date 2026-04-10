/**
 * High-intent: Is My Fitness Industry Pay Rate Legal?
 * URL: /awards/fitness-award/hourly-rate-fitness
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
  { question: 'What is the minimum hourly rate for a fitness worker in 2025?', answer: 'It depends on your classification level and employment type. The Fitness Industry Award has multiple levels. A Level 1 employee (entry-level) earns a different rate to a Level 3 (experienced instructor). Casuals receive a 25% loading on top of the base rate. Check your payslip against the specific rate for your level.' },
  { question: 'Does the casual loading replace penalty rates?', answer: 'No. The 25% casual loading compensates for the lack of paid leave entitlements. It does not replace weekend penalty rates, public holiday rates, or overtime. If you work a Sunday as a casual, you get the Sunday penalty rate calculated on the base rate, plus your casual loading. These are separate entitlements.' },
  { question: 'My rate hasn\'t changed since I started — is that normal?', answer: 'Award rates are updated annually, usually effective 1 July each year. If your rate hasn\'t changed in over 12 months, it\'s likely out of date. Additionally, if your responsibilities have increased, you may be entitled to a higher classification level. Both of these should result in a higher hourly rate.' },
];

export default function FitnessIntentHourlyRate({ rates }: { rates?: AwardRateData }) {
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
          Your hourly rate under the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> is not a single number. It depends on your classification level, whether you&apos;re full-time, part-time, or casual, and when you work. Many fitness workers are told a flat hourly rate at hiring and never question whether it actually meets the award minimum &mdash; especially once penalties, allowances, and annual increases are factored in.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The question isn&apos;t just &ldquo;what&apos;s my base rate?&rdquo; &mdash; it&apos;s whether your total pay meets the award for every hour you actually work.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fitness Industry Award (MA000094) sets minimum hourly rates for each classification level. These rates are legal minimums &mdash; your employer cannot pay less. The rate varies by:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Classification level</strong> &mdash; based on your duties, qualifications, and experience</li>
          <li><strong>Employment type</strong> &mdash; casual employees receive a 25% loading</li>
          <li><strong>Day and time</strong> &mdash; weekends, public holidays, and early/late hours attract penalty rates</li>
          <li><strong>Overtime</strong> &mdash; hours beyond ordinary hours are paid at 150% or 200%</li>
        </ul>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual group fitness instructor. Told their rate is $30/hr. Works Monday, Wednesday, and Saturday mornings.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Monday &amp; Wednesday:</strong> $30/hr may be at or near the correct casual rate depending on their classification level &mdash; but this needs to be verified against the award.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Saturday:</strong> Weekend penalty rates apply. Their Saturday rate should be higher than their weekday rate. If they&apos;re still getting $30/hr on Saturday, they&apos;re underpaid on that day.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            A flat rate that looks &ldquo;about right&rdquo; on weekdays can still be illegal on weekends.
          </p>
          <p style={smallStyle}>
            <strong>Why it matters:</strong> Flat-rate arrangements that don&apos;t adjust for penalties are the most common form of underpayment in fitness.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Your classification level on your payslip &mdash; does it match your actual duties?</li>
          <li>Whether your rate meets the current award minimum for that level (rates update every July)</li>
          <li>Whether your weekend and public holiday pay is higher than your weekday pay</li>
          <li>Whether you receive a casual loading if you&apos;re a casual employee</li>
          <li>Whether split shift allowances are being paid when you work broken shifts</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Check your rate now</h2>
        <p style={pStyle}>
          Enter your classification, employment type, and shifts to see the exact legal minimum for every hour you work.
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
          Don&apos;t assume your rate is right &mdash; check it against the award in 2 minutes.
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
