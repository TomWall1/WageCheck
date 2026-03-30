/**
 * Scenario: Wrong Classification Level — /awards/restaurant-award/scenarios/classification-level
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says they\'ll review my level at 6 months — is that right?', answer: 'No. Your classification is determined by the duties you actually perform right now, not by a future review date. If your current duties match a higher level, you should be paid at that level immediately.' },
  { question: 'My title says "senior" but I\'m paid at Level 2 — does my title matter?', answer: 'No. It\'s your actual duties that determine your classification level, not your job title. If your duties match Level 3 or higher, your title is irrelevant — you should be paid at the level matching your work.' },
  { question: 'Can I claim back pay for being misclassified?', answer: 'Yes. Under the Fair Work Act, you can claim underpayments from misclassification for up to 6 years. The difference compounds on every penalty shift, overtime hour, and allowance.' },
];

export default function RScenarioClassification({ rates }: { rates?: RestaurantRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l2Ft = l2?.ftRate ?? 24.10;
  const l3Ft = l3?.ftRate ?? 25.32;
  const baseGap = Math.round((l3Ft - l2Ft) * 100) / 100;
  const sundayGap = Math.round(baseGap * 1.5 * 100) / 100;
  const phGap = Math.round(baseGap * 2.25 * 100) / 100;
  // Estimate annual cost: 38hrs/wk base + some weekends
  const annualLow = Math.round(baseGap * 38 * 52 * 100) / 100;
  const annualHigh = Math.round(annualLow * 1.6 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Almost certainly not right. Your <a href="/awards/restaurant-award/classifications" style={linkStyle}>classification</a> under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> must reflect the duties you currently perform &mdash; not the level you were set at when you started. If your responsibilities have grown, your classification (and pay) should have too.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your duties have changed since you started &mdash; check your classification.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Classification is based on the actual duties you perform, not your job title or start date</li>
          <li>Your employer must classify you at the level matching your current work</li>
          <li>If your duties change, your classification must be updated accordingly</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Self-check: what level are you?</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li><strong>Taking orders independently?</strong> &rarr; Level 2 minimum</li>
            <li><strong>Completed training (RSA, RMLV)?</strong> &rarr; Level 3 minimum</li>
            <li><strong>Trade qualification (Cert III)?</strong> &rarr; Level 4 minimum</li>
            <li><strong>Supervising other staff?</strong> &rarr; Level 5 minimum</li>
          </ul>
          <p style={smallStyle}>
            These are minimums. If your duties span multiple indicators, you should be at the highest applicable level.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Each classification level step represents approximately {formatCurrency(baseGap)}/hr at base rate. That gap compounds on every penalty shift: a {formatCurrency(baseGap)}/hr base gap becomes {formatCurrency(sundayGap)}/hr on Sundays (1.5&times;) and {formatCurrency(phGap)}/hr on public holidays (2.25&times;). Over a year of full-time work with regular weekend shifts, one level of misclassification costs {formatCurrency(annualLow)}&ndash;{formatCurrency(annualHigh)}.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip show the correct classification level?</li>
          <li>Do your current duties match the level description in the award?</li>
          <li>Has your classification been updated since your responsibilities changed?</li>
          <li>Are you performing duties at a higher level without the corresponding pay?</li>
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
        <p style={pStyle}>Not sure if your classification is right? Check your pay against your actual duties.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
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
