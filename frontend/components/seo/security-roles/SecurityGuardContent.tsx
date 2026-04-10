/**
 * Security Award — Security Guard role page
 * Rates: FWO pay guide MA000016
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  {
    question: 'What is the minimum hourly rate for a security guard in 2025?',
    answer: 'The minimum depends on your classification level and employment type under the Security Services Industry Award (MA000016). Security guards are typically classified at Level 2 or above. Casual employees receive a 25% casual loading on top of the base rate. The rate also varies significantly depending on when you work — nights and weekends attract penalty loadings that substantially increase the minimum.',
  },
  {
    question: 'I work overnight static guarding — should I be paid more than a day shift?',
    answer: 'Yes. The Security Services Industry Award provides penalty loadings for overnight hours. Hours worked between midnight and 6am attract higher rates than standard evening or daytime hours. If your employer pays the same rate for a 2pm shift and a 2am shift, the overnight rate is wrong.',
  },
  {
    question: 'My security company changed — does my classification level reset?',
    answer: 'No. Your classification level is based on your skills, qualifications, and the duties you perform — not how long you have been with a particular employer. If you were Level 3 at your previous company and perform the same duties at a new company, you should be classified at Level 3 or above from day one.',
  },
];

export default function SecurityGuardContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000016
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Security guards are covered by the Security Services Industry Award 2020 (MA000016). This includes static guards, mobile guards, alarm response officers, and general security operatives. The award sets minimum hourly rates, penalty loadings for night and weekend work, overtime rates, and allowances. Security guard pay should vary significantly depending on when you work &mdash; if it doesn&apos;t, something is wrong.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Most security guard underpayments come from the same source: flat-rate pay that ignores the night and weekend penalties the award requires.
        </p>
        <p style={pStyle}>
          For the full Security Award overview, see the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* Classification */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Security guard classification levels</h2>
        <p style={pStyle}>Under the Security Services Industry Award, security guards are classified based on their duties, qualifications, and responsibilities:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Level 1:</strong> Entry-level security duties under direct supervision. New entrants to the industry.</li>
          <li style={{ marginBottom: '8px' }}><strong>Level 2:</strong> Licensed security officer performing standard guarding, access control, or monitoring duties. This is the most common level for security guards.</li>
          <li style={{ marginBottom: '8px' }}><strong>Level 3:</strong> Senior security officer with additional responsibilities, training duties, or specialised skills.</li>
          <li style={{ marginBottom: '8px' }}><strong>Level 4:</strong> Supervisory or advanced roles with responsibility for other officers or complex security operations.</li>
          <li style={{ marginBottom: '8px' }}><strong>Level 5:</strong> Senior supervisory or management-level security roles.</li>
        </ul>
        <p style={pStyle}>
          Your classification determines your base rate. Every penalty rate, overtime rate, and allowance builds from this base. If your classification is wrong, every other calculation is also wrong.
        </p>
      </section>

      {/* Common underpayment */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How security guards get underpaid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2, works three 12-hour overnight shifts per week (6pm&ndash;6am). Two weeknight shifts and one Saturday night. Paid a flat $30/hr for all hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What&apos;s missing:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Night loading for hours between midnight and 6am (every shift)</li>
            <li>Saturday penalty rate for the Saturday shift</li>
            <li>Sunday rate for post-midnight hours on the Saturday night shift</li>
            <li>Overtime for hours beyond ordinary on every 12-hour shift</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Estimated weekly shortfall: $250&ndash;$400+, or $13,000&ndash;$20,000+ per year.
          </p>
          <p style={smallStyle}>
            This is the most common pattern in security: the flat rate looks decent but falls far short once night, weekend, and overtime penalties are correctly applied.
          </p>
        </div>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Key entitlements for security guards</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Night shift loadings:</strong> Premium rates for hours worked overnight, particularly between midnight and 6am</li>
          <li style={{ marginBottom: '8px' }}><strong>Weekend penalties:</strong> Higher rates for Saturday and Sunday work</li>
          <li style={{ marginBottom: '8px' }}><strong>Public holiday rates:</strong> 250% (permanent) or 275% (casual) of the base rate</li>
          <li style={{ marginBottom: '8px' }}><strong>Overtime:</strong> 1.5x for the first 2 hours, 2x after that</li>
          <li style={{ marginBottom: '8px' }}><strong>Minimum engagement:</strong> 4 hours per shift for casuals</li>
          <li style={{ marginBottom: '8px' }}><strong>Uniform and equipment allowances:</strong> Where you supply or maintain your own</li>
          <li style={{ marginBottom: '8px' }}><strong>Superannuation:</strong> 12% of ordinary time earnings, paid on top of wages</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Enter your actual shift times and find out exactly what you should be earning.
        </p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Related */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/security-award/penalty-rates" style={linkStyle}>Security Award penalty rates</a> &middot; <a href="/awards/security-award/overtime" style={linkStyle}>Security Award overtime</a> &middot; <a href="/awards/security-award/pay-rates" style={linkStyle}>Security Award pay rates</a>
        </p>
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t accept a flat rate as the final word. Check every shift.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000016).
        </p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Security Services Industry Award 2020 (MA000016), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
