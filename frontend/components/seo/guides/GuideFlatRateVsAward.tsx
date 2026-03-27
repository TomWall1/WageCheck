/**
 * Flat Rate vs Award Pay guide — /guides/flat-rate-vs-award
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
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'My contract says flat rate — doesn\'t that mean I agreed to it?', answer: 'Not legally. A contract cannot exclude award entitlements. If the flat rate doesn\'t cover all obligations, you\'re entitled to the difference regardless of what you signed.' },
  { question: 'My employer says my flat rate includes everything — what should I ask?', answer: 'Ask them to show you the calculation proving the flat rate exceeds the award in every scenario including public holidays. If they can\'t produce it, that tells you something.' },
  { question: 'What if I\'ve been on a flat rate for years — can I still claim?', answer: 'Yes. Under the Fair Work Act you can recover underpayments going back 6 years.' },
];

export default function GuideFlatRateVsAward({ rates }: { rates?: HospitalityRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l2PhCas = rates ? formatCurrency(l2?.publicHolidayCasual ?? 0) : '$56.88';
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your employer pays you one rate every shift regardless of the day, there&apos;s a high chance you&apos;re being underpaid. Flat rates are legal in Australia &mdash; but only under very specific conditions that most employers don&apos;t actually meet. This page explains those conditions and how to check if yours qualifies.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re paid the same rate every shift no matter what day it is &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Hospitality worker told their $34/hr flat rate &quot;covers everything including weekends.&quot;
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>The problem:</strong> Level 2 casual public holiday rate is {l2PhCas}/hr. A $34/hr flat rate doesn&apos;t come close.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment on one 8-hour public holiday shift: ~$183
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer picks a number above the ordinary rate and assumes it covers everything. Nobody checks the public holiday scenario.
          </p>
        </div>
      </section>

      {/* When is a flat rate legal */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When is a flat rate legal?</h2>
        <p style={pStyle}>
          A flat rate is legal only if it is demonstrably higher than the total amount owed under the award across every possible shift scenario, including:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>All penalty rates (Saturday, Sunday, public holiday)</li>
          <li>All applicable allowances (split shift, meal, tool)</li>
          <li>Overtime rates for any hours beyond the threshold</li>
        </ul>
        <p style={pStyle}>
          This test must be met across every single pay period &mdash; not just on average. A flat rate that looks fine on a quiet Monday-to-Friday week may fail the moment a public holiday or late-night Sunday shift occurs.
        </p>
        <p style={pStyle}>
          If your employer hasn&apos;t shown you the calculation proving this &mdash; that&apos;s a red flag.
        </p>
        <CheckPayCTA />
      </section>

      {/* How to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check if your flat rate is legal</h2>
        <p style={pStyle}>
          <strong>Step 1:</strong> Find your award and classification level. &rarr; See <a href="/guides/what-is-a-modern-award" style={linkStyle}>what is a modern award</a>
        </p>
        <p style={pStyle}>
          <strong>Step 2:</strong> Find the public holiday rate &mdash; the highest penalty rate in your award. If your flat rate is lower than this, it can&apos;t legally apply to public holiday shifts.
        </p>
        <p style={pStyle}>
          <strong>Step 3:</strong> Check penalty rates for every day type you work. &rarr; See your award&apos;s <a href="/guides/penalty-rates-australia" style={linkStyle}>penalty rates guide</a>
        </p>
        <p style={pStyle}>
          <strong>Step 4:</strong> Check allowances. Does your flat rate include any applicable split shift, meal, or tool allowances? &rarr; See <a href="/guides/allowances-and-loadings" style={linkStyle}>award allowances explained</a>
        </p>
        <p style={pStyle}>
          <strong>Step 5:</strong> Enter your actual shifts into the calculator. It will compare what you were paid against what you were owed.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common flat rate underpayments</h2>

          <h3 style={h3Style}>Flat rate set above ordinary weekday rate but below weekend rates</h3>
          <p style={pStyle}>
            A rate higher than Monday rates doesn&apos;t mean it covers Sunday or public holiday rates. Many employers make this mistake.
          </p>
          <p style={pStyle}>
            If your flat rate is lower than the Sunday or public holiday rate for your classification, check your pay now.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Flat rate covers penalties but not allowances</h3>
          <p style={pStyle}>
            A rate that covers penalty rates may still underpay if it doesn&apos;t include split shift or meal allowances.
          </p>

          <h3 style={h3Style}>Flat rate arrangement never formally assessed</h3>
          <p style={pStyle}>
            Many flat rates are set informally &mdash; someone quoted a number, the worker accepted it, no one ran the numbers. These are often legally insufficient.
          </p>

          <h3 style={h3Style}>Flat rate applied to casuals without loading</h3>
          <p style={pStyle}>
            The casual loading must be included in the flat rate before comparing against award penalty scenarios. A flat rate that forgets the loading is almost always insufficient.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
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

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; enter your actual shifts and find out.
        </p>
        <CheckPayCTA />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
