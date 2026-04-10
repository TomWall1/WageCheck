/**
 * High-intent: Am I Being Underpaid in the Fitness Industry?
 * URL: /awards/fitness-award/underpaid-fitness
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
  { question: 'I work split shifts every day but my pay never changes — is that right?', answer: 'Almost certainly not. If you work a morning session and an evening session with a break of more than one hour in between, you\'re working a split shift. The Fitness Industry Award requires a split shift allowance on top of your base rate. If your payslip shows no allowance, you\'re being underpaid on every split shift day.' },
  { question: 'My employer says I\'m a contractor so the award doesn\'t apply — is that true?', answer: 'Not necessarily. If your employer controls when, where, and how you work — sets your roster, requires you to wear a uniform, provides the equipment — you are likely an employee regardless of what your contract says. Sham contracting is rampant in the fitness industry. The Fair Work Ombudsman determines your status based on the reality of your arrangement, not the label.' },
  { question: 'Can I recover underpayments from previous years?', answer: 'Yes. The Fair Work Ombudsman can recover underpayments going back up to 6 years. Many fitness workers recover significant amounts once split shift allowances, penalty rates, and correct classification levels are applied retrospectively.' },
];

export default function FitnessIntentUnderpaid({ rates }: { rates?: AwardRateData }) {
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
          If you work in a gym, fitness studio, or aquatic centre and suspect you&apos;re being underpaid &mdash; you probably are. The fitness industry has one of the highest rates of underpayment in Australia, driven by split shifts that go uncompensated, sham contracting arrangements, and employers who treat the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> as optional.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you teach a 6am class and a 6pm class and your pay looks the same as someone who works a straight 9&ndash;5 &mdash; something is wrong.
        </p>
        <p style={pStyle}>
          Split shifts are the norm in fitness, not the exception. The award recognises this and requires an allowance for every day you work a broken shift. That allowance is almost never paid.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Gym instructor, permanent part-time, works 6am&ndash;9am then 5pm&ndash;8pm, Monday to Friday. Paid a flat hourly rate for 30 hours per week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> No split shift allowance paid &mdash; that&apos;s 5 split shift allowances per week missing from every payslip.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> Early morning starts before 6am on some days attract penalty loadings that aren&apos;t being applied.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 3:</strong> Classification level hasn&apos;t been reviewed despite taking on program design responsibilities (should be a higher level).
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Combined underpayment: $80&ndash;$120+ per week across three separate errors.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Split shifts are so normal in fitness that workers assume they&apos;re not entitled to anything extra. Employers rely on that assumption.
          </p>
        </div>
      </section>

      {/* Most common signs */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Most common signs you&apos;re underpaid</h2>

        <h3 style={h3Style}>Your pay is the same whether you work a straight shift or a split shift</h3>
        <p style={pStyle}>
          A split shift &mdash; where you work a morning block, take an unpaid break of more than one hour, then work an evening block &mdash; triggers an allowance under the award. If your payslip doesn&apos;t show it, you&apos;re being shortchanged every day you work a broken shift.
        </p>

        <h3 style={h3Style}>You&apos;re called a &ldquo;contractor&rdquo; but treated like an employee</h3>
        <p style={pStyle}>
          If the gym sets your schedule, provides the space and equipment, tells you what to wear, and controls how you deliver sessions &mdash; you&apos;re an employee. Calling you a contractor doesn&apos;t change that. Sham contracting strips you of award rates, super, leave entitlements, and workers&apos; comp.
        </p>

        <h3 style={h3Style}>You work weekends and public holidays at the same rate</h3>
        <p style={pStyle}>
          Saturday and Sunday penalty rates apply under the Fitness Industry Award. Public holidays attract even higher rates. If your hourly rate doesn&apos;t change on these days, penalties are missing.
        </p>

        <h3 style={h3Style}>You&apos;ve taken on more responsibility but your pay hasn&apos;t moved</h3>
        <p style={pStyle}>
          The award has multiple classification levels. If you&apos;ve gone from running group classes to designing programs, supervising staff, or managing a facility area, your classification &mdash; and your rate &mdash; should reflect that.
        </p>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you think you&apos;re underpaid</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Calculate the exact amount.</strong> Use the tool below to enter your actual shifts and see what you should have been paid under the Fitness Industry Award. <a href="/check-my-pay?award=MA000094" style={linkStyle}>Check your pay now &rarr;</a></li>
          <li style={{ marginBottom: '8px' }}><strong>Raise it with your employer.</strong> Many underpayments are genuine mistakes &mdash; especially around split shift allowances. Presenting the calculation in writing often resolves it.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact the Fair Work Ombudsman.</strong> Call 13 13 94 if your employer doesn&apos;t respond. FWO investigates and can compel back payment.</li>
        </ol>
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
