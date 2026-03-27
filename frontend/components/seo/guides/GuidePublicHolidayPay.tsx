/**
 * Public Holiday Pay in Australia — /guides/public-holiday-pay-australia
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
  { question: 'I\'m casual — do I get public holiday pay if I don\'t work that day?', answer: 'Generally no — casuals are typically not paid for public holidays they don\'t work, unless the shift was already rostered and then cancelled.' },
  { question: 'I was paid "double time" on Easter Friday — is that correct?', answer: 'Check your award. Some awards specify 2.25\u00d7 — double time (2\u00d7) would be underpayment. The difference is real money on every public holiday shift.' },
  { question: 'What if the public holiday falls on my day off?', answer: 'For permanent employees, if a public holiday falls on a day you\'d ordinarily work, you\'re entitled to a paid day off or a substitute day. For casuals, entitlement depends on whether the day would have been a scheduled working day.' },
];

export default function GuidePublicHolidayPay({ rates }: { rates?: HospitalityRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l2Cas = rates ? formatCurrency(l2?.casualRate ?? 0) : '$31.60';
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
          If you worked a public holiday in Australia and were paid your ordinary rate, there&apos;s a high chance you were significantly underpaid. Public holidays attract the highest penalty rates under modern awards &mdash; often more than double the ordinary rate. This page covers exactly what you&apos;re owed and your right to refuse unreasonable requests to work.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in any industry where your employer can roster you on public holidays &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual hospitality worker, Level 2. 6-hour Christmas Day shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {l2Cas}/hr (ordinary casual rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Public holiday casual rate at Level 2 &mdash; {l2PhCas}/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$152 for that single shift
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the standard casual rate. Worker doesn&apos;t realise Christmas Day attracts a different multiplier entirely.
          </p>
        </div>
      </section>

      {/* Public holidays list */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What public holidays are you entitled to?</h2>
        <p style={pStyle}>
          Under the National Employment Standards, all employees are entitled to a paid day off on national public holidays:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>New Year&apos;s Day (1 January)</li>
          <li>Australia Day (26 January)</li>
          <li>Good Friday</li>
          <li>Easter Saturday (most states)</li>
          <li>Easter Monday</li>
          <li>Anzac Day (25 April)</li>
          <li>King&apos;s Birthday (date varies by state)</li>
          <li>Christmas Day (25 December)</li>
          <li>Boxing Day (26 December)</li>
        </ul>
        <p style={pStyle}>
          States and territories have additional public holidays. The ones that apply to you are those of the state where you work.
        </p>
      </section>

      {/* Public holiday rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Public holiday rates by award</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Award</th>
                <th style={thStyle}>Public holiday rate (permanent)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Hospitality Award (MA000009)</td><td style={tdStyle}>2.25&times; base rate</td></tr>
              <tr><td style={tdStyle}>Restaurant Award (MA000119)</td><td style={tdStyle}>2.25&times; base rate</td></tr>
              <tr><td style={tdStyle}>Fast Food Award (MA000003)</td><td style={tdStyle}>2.5&times; base rate</td></tr>
              <tr><td style={tdStyle}>Retail Award (MA000004)</td><td style={tdStyle}>2.25&times; base rate</td></tr>
              <tr><td style={tdStyle}>Clerks Award (MA000002)</td><td style={tdStyle}>2.25&times; base rate</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates effective 1 July 2025. Casual rates apply the multiplier to the casual base rate.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If your last public holiday pay looked like an ordinary shift, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* Right to refuse */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The right to refuse unreasonable public holiday work</h2>
        <p style={pStyle}>
          Under the Fair Work Act (updated 2023), an employer must request &mdash; not demand &mdash; that you work a public holiday. Whether the request is reasonable depends on:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The nature of your role and the business</li>
          <li>Your personal or caring responsibilities that day</li>
          <li>The amount of notice given</li>
          <li>Whether you&apos;re permanent or casual</li>
        </ul>
        <p style={pStyle}>
          You have the right to refuse if the request is unreasonable. You cannot be penalised for a reasonable refusal.
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common public holiday underpayments</h2>

          <h3 style={h3Style}>Ordinary rate paid instead of the public holiday rate</h3>
          <p style={pStyle}>
            The most common issue. Many employers pay the standard daily rate without applying the holiday multiplier.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Double time applied when 2.25&times; is required</h3>
          <p style={pStyle}>
            Even &ldquo;double time&rdquo; is technically underpayment under some awards. Hospitality and Retail specify 2.25&times; &mdash; meaning 2&times; falls short on every holiday shift.
          </p>

          <h3 style={h3Style}>Shift crossing midnight not split correctly</h3>
          <p style={pStyle}>
            If your shift starts before midnight on the day before a public holiday, the public holiday rate applies from midnight &mdash; not from when the employer considers the &ldquo;holiday&rdquo; to start.
          </p>

          <h3 style={h3Style}>Casual rate calculated without the loading</h3>
          <p style={pStyle}>
            The public holiday multiplier applies to the casual base rate (including loading). Applying it to only the pre-loading rate is underpayment.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA />
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
          Don&apos;t guess &mdash; public holiday underpayments are often the largest single shortfall.
        </p>
        <p style={pStyle}>
          Enter your shifts and see exactly what you should have been paid.
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
