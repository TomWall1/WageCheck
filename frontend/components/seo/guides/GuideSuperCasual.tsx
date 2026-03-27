/**
 * Superannuation for Casual Workers guide — /guides/superannuation-casual-workers
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData } from '@/lib/hospitality-rates';

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
  { question: 'My employer says I\'m not entitled to super because I\'m casual — is that right?', answer: 'No — and that claim is wrong. Since November 2022, all employees including casuals are entitled to super. If you\'ve been told this, there\'s a strong chance your super hasn\'t been paid.' },
  { question: 'I have multiple casual jobs — do I get super from each employer?', answer: 'Yes. Each employer calculates and pays super independently on your earnings with them.' },
  { question: 'My employer is paying at 10% — is that still correct?', answer: 'No. From 1 July 2024 the rate was 11%. From 1 July 2025 it is 11.5%. If your employer is still at 10%, they\'re underpaying your super.' },
  { question: 'How far back can I claim unpaid super?', answer: 'The ATO can pursue unpaid super going back 5 years in most cases. Act sooner rather than later.' },
];

export default function GuideSuperCasual({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rate: 11.5% from 1 July 2025
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re a casual worker in Australia, there&apos;s a good chance your employer is either not paying super or underpaying it &mdash; and it may have been happening for years without your knowledge. Since 2022, all casual workers are entitled to superannuation regardless of earnings. There is no longer a minimum earnings threshold. This page explains what you&apos;re owed and how to check.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a casual worker in Australia and you&apos;ve never verified your super contributions &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual kitchen hand, earning ~$400/week. Before 2022, fell below the $450/month super threshold &mdash; employer never paid super.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>Post-2022 reality:</strong> Threshold abolished. Super must be paid on all earnings regardless of amount.</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What many employers are still doing:</strong> Not updating payroll systems. Continuing not to pay super for low-earning casuals.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Missed super per year: $400 &times; 52 &times; 11.5% = ~$2,392
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> System wasn&apos;t updated. Worker doesn&apos;t check the fund. Years pass.
          </p>
        </div>
      </section>

      {/* Who is entitled */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who is entitled to super?</h2>
        <p style={pStyle}>
          From 1 November 2022, the $450/month threshold was abolished. Now, all employees &mdash; including casual workers &mdash; are entitled to super contributions regardless of:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>How much they earn</li>
          <li>How many hours they work</li>
          <li>Whether they have another job</li>
          <li>Their age (with limited exceptions)</li>
        </ul>
        <p style={pStyle}>
          The rate from 1 July 2025 is 11.5% of ordinary time earnings.
        </p>
        <p style={pStyle}>
          If you&apos;re a casual worker who hasn&apos;t verified your super recently, check now.
        </p>
        <CheckPayCTA />
      </section>

      {/* How much table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How much should you be receiving?</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Weekly earnings</th>
                <th style={thStyle}>Super owed per week</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>$300/week</td><td style={tdStyle}>$34.50</td></tr>
              <tr><td style={tdStyle}>$400/week</td><td style={tdStyle}>$46.00</td></tr>
              <tr><td style={tdStyle}>$600/week</td><td style={tdStyle}>$69.00</td></tr>
              <tr><td style={tdStyle}>$800/week</td><td style={tdStyle}>$92.00</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Super is payable quarterly &mdash; at minimum by the 28th day after each quarter ends.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common super underpayments for casual workers</h2>

          <h3 style={h3Style}>$450 threshold not removed from payroll systems</h3>
          <p style={pStyle}>
            Many small employers haven&apos;t updated since 2022. Super is still not being triggered for casuals earning below $450/month.
          </p>
          <p style={pStyle}>
            If your payslip shows no super and you earn less than $450/month, check your fund now.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Super shown on payslip but not actually paid</h3>
          <p style={pStyle}>
            The payslip can show contributions without the employer actually remitting them to the fund. Always check your fund balance &mdash; not just the payslip.
          </p>

          <h3 style={h3Style}>Wrong rate applied</h3>
          <p style={pStyle}>
            From July 2024, the rate was 11%. From July 2025, it is 11.5%. Employers still using 10% or 10.5% are underpaying super.
          </p>

          <h3 style={h3Style}>No super fund set up for new casual workers</h3>
          <p style={pStyle}>
            Some employers don&apos;t enrol casuals at all. This is illegal &mdash; you&apos;re entitled to super from your first eligible payment.
          </p>

          <p style={pStyle}>
            These issues are ongoing and compound every year they&apos;re missed.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* How to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your super</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Log in to your super fund &mdash; most have apps showing incoming contributions</li>
          <li>Check the frequency &mdash; contributions should appear at least quarterly</li>
          <li>Check the amount &mdash; compare against 11.5% of your gross ordinary time earnings</li>
          <li>If contributions are missing &mdash; contact the ATO on 13 10 20 or report via ato.gov.au</li>
        </ul>
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
          Don&apos;t guess &mdash; your retirement savings are at stake.
        </p>
        <p style={pStyle}>
          Enter your shifts to check your pay &mdash; and verify your super separately through your fund or the ATO.
        </p>
        <CheckPayCTA />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. For super queries, contact the ATO on 13 10 20. Verify at fairwork.gov.au.
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
