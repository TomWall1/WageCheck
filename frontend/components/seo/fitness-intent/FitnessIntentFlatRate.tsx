/**
 * High-intent: Is a Flat Rate Legal in the Fitness Industry?
 * URL: /awards/fitness-award/flat-rate-fitness
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
  { question: 'My gym pays me a flat rate per class — is that legal?', answer: 'It depends. If the flat rate per class, when broken down to an hourly rate (including preparation, pack-down, and any required attendance time), meets or exceeds the award minimum for every hour worked — including penalty rates on weekends — it may be lawful. But it rarely does. Most flat per-class rates fail on weekends and public holidays where higher penalties apply.' },
  { question: 'Can a flat rate include penalty rates and allowances?', answer: 'An employer can set a rate that is intended to compensate for penalties and allowances, but they must be able to demonstrate that the employee is "better off overall" compared to what the award would pay for the same hours. This means the flat rate must cover the worst-case scenario — including weekend penalties, overtime, and split shift allowances. If it falls short in any pay period, the employer must top up the difference.' },
  { question: 'I signed a contract agreeing to a flat rate — does that override the award?', answer: 'No. A contract cannot reduce your entitlements below the award. Any contract term that pays less than the Fitness Industry Award minimum is void to the extent of the inconsistency. You are entitled to the difference regardless of what you signed.' },
];

export default function FitnessIntentFlatRate({ rates }: { rates?: AwardRateData }) {
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
          Flat rates are everywhere in the fitness industry. &ldquo;$35 per class.&rdquo; &ldquo;$28 an hour, all-in.&rdquo; &ldquo;$500 a week, doesn&apos;t matter what days you work.&rdquo; These arrangements are so common that most fitness workers assume they&apos;re normal. They are common. They are not always legal.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A flat rate is only lawful if it meets or exceeds what the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> would pay for every hour you actually work &mdash; including penalties, overtime, and allowances.
        </p>
        <p style={pStyle}>
          The moment your flat rate falls below the award entitlement in any pay period &mdash; even one weekend shift &mdash; your employer owes you the difference.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fair Work Act, an employer can pay above the award rate as an &ldquo;all-inclusive&rdquo; or flat rate, but the employee must be <strong>better off overall</strong> compared to the award. This is not a one-time test at hiring &mdash; it must hold true in every pay period. If you work a public holiday or overtime in any given week, your flat rate must still cover the higher penalties those hours attract.
        </p>
        <p style={pStyle}>
          A flat per-class rate must also account for all time worked &mdash; not just time in front of clients. Preparation, pack-down, required meetings, and mandatory training all count as hours worked.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Group fitness instructor paid $40 per one-hour class. Works 5 classes Monday&ndash;Friday and 2 classes on Saturday. Total: 7 classes = $280/week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>The problem:</strong> Each class involves 15 minutes of setup and 15 minutes of pack-down. Actual time worked per class is 1.5 hours. That makes the real hourly rate $40 &divide; 1.5 = $26.67/hr &mdash; which may be below the award minimum of {l1 ? formatCurrency(l1.ftRate) : '~$25'}/hr for Level 1.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Saturday issue:</strong> The 2 Saturday classes should attract a weekend penalty loading. At a flat $40/class, the Saturday rate is the same as weekday &mdash; meaning penalties are not being paid.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            The flat rate fails on two counts: the effective hourly rate is below the award, and Saturday penalties are missing.
          </p>
          <p style={smallStyle}>
            <strong>Why it matters:</strong> Flat per-class rates in fitness almost always fail the &ldquo;better off overall&rdquo; test once you include non-class time and weekend penalties.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Calculate your true hourly rate: total pay divided by total hours worked (including preparation, travel between split shifts, required attendance)</li>
          <li>Compare that hourly rate to the award minimum for your classification level</li>
          <li>Check whether the flat rate covers weekend and public holiday penalties in weeks you work those days</li>
          <li>Check whether overtime is accounted for in weeks where you exceed ordinary hours</li>
          <li>Verify that split shift allowances are covered if you work broken shifts</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Test your flat rate against the award</h2>
        <p style={pStyle}>
          Enter your actual shifts &mdash; including weekends &mdash; and see whether your flat rate meets the legal minimum.
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
          A flat rate isn&apos;t automatically wrong &mdash; but it usually is. Check yours in 2 minutes.
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
