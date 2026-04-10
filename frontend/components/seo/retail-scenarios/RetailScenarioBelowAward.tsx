/**
 * Scenario: Below Award Rate in Retail — /awards/retail-award/scenarios/below-award
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Can my employer pay me below the award if I agree to it?', answer: 'No. The award sets the legal minimum. An employee cannot agree to be paid below the award rate, and any contract or agreement that does so is unenforceable to that extent. Your employer owes you the difference for every pay period where you were underpaid.' },
  { question: 'I\'m on a traineeship — do lower rates apply?', answer: 'Trainees and apprentices may have different rates under the award, but those rates are still legal minimums. If you are on a registered traineeship, check the specific trainee rates in the Retail Award. If you are not on a registered traineeship, the full adult rates apply regardless of what your employer calls your role.' },
  { question: 'What evidence do I need to prove I\'m paid below award?', answer: 'Your payslips (if you have them), bank statements showing payments received, records of hours and days worked, and your employment contract. The Fair Work Ombudsman can also compel your employer to produce records. Even if you don\'t have perfect records, make a complaint — the burden of proof shifts to the employer if their records are incomplete.' },
];

export default function RetailScenarioBelowAward({ rates }: { rates?: AwardRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Paying below the <a href="/awards/retail-award/" style={linkStyle}>Retail Award</a> rate is illegal. It does not matter what your contract says, what you agreed to verbally, or what your employer claims is standard. The award is the law. If your hourly rate for any shift falls below the award minimum for that day, time, and employment type, you are being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Employers cannot contract out of the award. A signed agreement to accept less than the award rate is not enforceable.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>How below-award pay happens</h2>
          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            You&apos;re performing Level 3 duties (supervising, cash handling, training) but classified and paid as Level 1. The base rate difference is $1&ndash;$3/hr, and it compounds with every penalty rate.
          </p>
          <h3 style={h3Style}>Annual increase not applied</h3>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            Award rates increase every 1 July. If your rate hasn&apos;t changed in over a year, it may have fallen below the current minimum.
          </p>
          <h3 style={h3Style}>Casual loading missing</h3>
          <p style={smallStyle}>
            Casual employees must receive a 25% loading on top of the base rate. If you&apos;re casual and paid the same as the full-time rate, the loading is missing.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Check your rate against the current award minimum for your level and employment type.</li>
          <li style={{ marginBottom: '8px' }}>Calculate the total shortfall across all pay periods.</li>
          <li style={{ marginBottom: '8px' }}>Raise it with your employer in writing, or call Fair Work on 13 13 94.</li>
        </ol>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
        <p style={pStyle}>Check whether your pay meets the award minimum &mdash; it takes 2 minutes.</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
