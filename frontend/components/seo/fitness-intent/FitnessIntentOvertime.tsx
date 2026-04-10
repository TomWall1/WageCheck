/**
 * High-intent: Not Getting Overtime in the Fitness Industry?
 * URL: /awards/fitness-award/overtime-fitness
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
  { question: 'Does overtime apply to part-time fitness workers?', answer: 'Yes. Part-time employees are entitled to overtime when they work beyond their agreed hours, or beyond the daily or weekly overtime triggers in the award. If your contract says 25 hours per week and you regularly work 30, those extra 5 hours should be paid at overtime rates.' },
  { question: 'I cover extra classes when someone calls in sick — is that overtime?', answer: 'It can be. If covering that class pushes you beyond your ordinary hours for the day or week, overtime rates apply. Your employer can\'t just add hours to your roster without triggering overtime entitlements once you exceed the threshold.' },
  { question: 'My employer says casual workers don\'t get overtime — is that true?', answer: 'No. Casual employees are entitled to overtime under the Fitness Industry Award. The triggers may differ slightly (e.g., after 38 hours in a week or after the daily maximum), but casuals absolutely receive overtime. The casual loading does not replace overtime pay.' },
];

export default function FitnessIntentOvertime({ rates }: { rates?: AwardRateData }) {
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
          If you work extra hours in a gym or fitness centre and don&apos;t see overtime on your payslip, you&apos;re likely being underpaid. The <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> has clear overtime provisions, and they apply to full-time, part-time, and casual employees. Fitness employers frequently ignore overtime because the work often looks like &ldquo;just one more class&rdquo; &mdash; but the law doesn&apos;t care about the format.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly work beyond your agreed hours and your pay doesn&apos;t reflect it &mdash; you&apos;re owed overtime.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fitness Industry Award, overtime is payable at <strong>150%</strong> (time and a half) for the first two hours and <strong>200%</strong> (double time) after that. For full-time employees, overtime triggers after <strong>38 ordinary hours per week</strong> or beyond the maximum ordinary hours in a single day. Part-time employees trigger overtime when they work beyond their agreed hours.
        </p>
        <p style={pStyle}>
          Overtime also applies on Saturdays, Sundays, and public holidays at specific rates under the award.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time gym instructor, contracted for 38 hours/week. Regularly covers 3 extra classes per week (approx. 3 additional hours). Paid at the ordinary hourly rate for all hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> The first 2 extra hours should be at 150% of the base rate. The third hour should be at 200%.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What actually happens:</strong> Employer pays ordinary rate for all 41 hours, treating the extra classes as part of the normal roster.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Estimated underpayment: $30&ndash;$50+ per week just on overtime alone.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Fitness work is often rostered in class blocks. Employers treat &ldquo;picking up a class&rdquo; as informal, but the hours still count toward overtime thresholds.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Total hours worked vs. your contracted ordinary hours</li>
          <li>Whether overtime is listed as a separate line item at 150% or 200%</li>
          <li>Whether extra classes or cover shifts appear at ordinary rate or overtime rate</li>
          <li>Whether Saturday work beyond ordinary hours triggers overtime</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Calculate your overtime entitlement</h2>
        <p style={pStyle}>
          Enter your actual hours worked and see exactly what your pay should be &mdash; including overtime rates.
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
          Don&apos;t guess &mdash; enter your actual shifts and find out in 2 minutes.
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
