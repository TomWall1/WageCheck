/**
 * Scenario: Hospitality Trainee Pay Rates 2025 — What Rate Applies?
 * URL: /awards/hospitality-award/scenarios/trainee-pay
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
  { question: 'My employer says I\'m "just a trainee" so the award doesn\'t fully apply — is that right?', answer: 'No. Trainees are covered by the award. The rates may differ from adult rates in some respects, but minimum thresholds and penalty rates still apply.' },
  { question: 'What year-of-apprenticeship rate should apply to me?', answer: 'Apprentice rates are percentage-based. Check your formal apprenticeship agreement and compare against the current pay guide. If you\'re not sure, contact the Fair Work Ombudsman.' },
  { question: 'When do I move from trainee to standard classification?', answer: 'At the end of your formal traineeship or apprenticeship, or after 3 months for introductory-level workers. Adult rates apply from that point.' },
];

export default function ScenarioTraineePay({ rates }: { rates?: HospitalityRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Trainees in hospitality are entitled to specific minimum rates &mdash; and those rates still include <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a> for weekends and public holidays. Being a trainee doesn&apos;t mean an employer can pay whatever they want. The Hospitality Award sets minimum rates for trainees and apprentice cooks, and all the standard penalty rate provisions still apply on top.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a trainee or apprentice cook in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Introductory level (first 3 months):</strong> A rate below the standard Level 1 rate may apply for new entrants in their first 3 months in the industry. After 3 months, at least Level 1 must apply.</li>
          <li><strong>Apprentice cooks:</strong> Apprentices have percentage-based rates calculated as a proportion of the Cook Grade 3 rate. These are set by the National Training Wage provisions and vary by year of apprenticeship.</li>
          <li><strong>Traineeships:</strong> Workers undertaking a formal traineeship may be on specific trainee rates &mdash; but these still have minimum thresholds and all penalty rate provisions apply.</li>
        </ul>
        <p style={pStyle}>
          For all trainees: penalty rates for weekends and public holidays still apply. Being a trainee doesn&apos;t remove weekend rate entitlements.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common trainee underpayments</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Introductory rate kept beyond 3 months</h3>
          <p style={pStyle}>
            The introductory rate is for the first 3 months in the industry &mdash; not 3 months at a specific venue. After that, at least Level 1 applies.
          </p>
          <h3 style={h3Style}>Penalty rates not applied to trainee shifts</h3>
          <p style={pStyle}>
            Some employers assume trainee rates are flat regardless of the day. They&apos;re not. Saturday, Sunday, and public holiday rates apply to trainees just as they do to any other employee.
          </p>
          <h3 style={h3Style}>Apprentice cook rate applied to non-apprentice cooks</h3>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            If you haven&apos;t signed a formal apprenticeship agreement, you&apos;re not an apprentice &mdash; you should be classified as a Cook Grade 1 or above under ordinary <a href="/awards/hospitality-award/classifications" style={linkStyle}>classifications</a>.
          </p>
        </div>
        <p style={pStyle}>
          If you&apos;ve been on the introductory rate for longer than 3 months, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your trainee rate &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Being held on an introductory rate beyond the 3-month threshold means being paid below Level 1 for every hour worked. Working 20 hours/week past that 3-month mark at the Level 1 rate of {formatCurrency(l1?.ftRate ?? 0)}/hr, the shortfall adds up. Over 6 months of incorrect rate, the total can reach hundreds of dollars.
        </p>
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
          Don&apos;t guess &mdash; check what your trainee shifts should pay.
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
