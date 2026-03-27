/**
 * What Is a Modern Award? — /guides/what-is-a-modern-award
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

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
  { question: 'Does a modern award apply if I have a contract?', answer: 'Yes. The award is the legal minimum. Your contract applies on top of it, not instead of it.' },
  { question: 'What if my employer says they don\'t use an award?', answer: 'In almost all cases, a modern award still applies. Employers covered by an award cannot opt out.' },
  { question: 'What happens if my employer doesn\'t follow the award?', answer: 'They\'re in breach of the Fair Work Act. You can recover unpaid wages going back 6 years through the Fair Work Ombudsman.' },
];

export default function GuideWhatIsModernAward() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;ve never checked whether a modern award applies to your job, there&apos;s a high chance you&apos;re missing out on entitlements you&apos;re legally owed. Most Australian workers are covered by one &mdash; but most have no idea what theirs says. This guide explains what awards are and why they matter for your pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in hospitality, retail, fast food, cleaning, admin, or almost any non-professional industry &mdash; a modern award almost certainly applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Worker assumes their pay is set by their contract.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> Contract rate &mdash; slightly above minimum wage, no penalty rate breakdown.</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> The Hospitality Award applied. Sunday and public holiday rates were legally required on top of the base rate.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: Hundreds of dollars per month in missed penalty rates &mdash; never detected because neither party checked the award.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The worker assumed the contract governed everything. Under Australian law, the award is the floor &mdash; the contract cannot go below it.
          </p>
        </div>
      </section>

      {/* What is a modern award? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is a modern award?</h2>
        <p style={pStyle}>
          A modern award is a legal document set by the Fair Work Commission that establishes minimum pay rates and employment conditions for a specific industry or occupation.
        </p>
        <p style={pStyle}>It covers:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Minimum hourly rates by classification level</li>
          <li>Penalty rates for evenings, weekends, and public holidays</li>
          <li>Overtime rates and when they trigger</li>
          <li>Casual loading and how it interacts with other rates</li>
          <li>Allowances for specific tasks or conditions</li>
          <li>Break entitlements</li>
        </ul>
        <p style={pStyle}>
          Modern awards are not optional. Your employer must comply &mdash; regardless of what your contract says. A contract cannot offer less than the award minimum. If it does, the award overrides it.
        </p>
        <p style={pStyle}>
          If you&apos;ve never compared your actual pay against your award, check now.
        </p>
        <CheckPayCTA />
      </section>

      {/* How many modern awards */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How many modern awards are there?</h2>
        <p style={pStyle}>
          There are 122 modern awards in Australia. Each covers a specific industry or occupation. The most common for Australian workers:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Hospitality</strong> &mdash; Hospitality Industry (General) Award MA000009 &mdash; <a href="/awards/hospitality-award" style={linkStyle}>see full guide</a></li>
          <li><strong>Retail</strong> &mdash; General Retail Industry Award MA000004</li>
          <li><strong>Fast food</strong> &mdash; Fast Food Industry Award MA000003</li>
          <li><strong>Admin/clerical</strong> &mdash; Clerks Private Sector Award MA000002</li>
          <li><strong>Cleaning</strong> &mdash; Cleaning Services Award MA000022</li>
          <li><strong>Restaurants and cafes</strong> &mdash; Restaurant Industry Award MA000119</li>
        </ul>
        <p style={pStyle}>
          If your industry isn&apos;t listed, there&apos;s likely still an award that covers you. The Miscellaneous Award acts as a catch-all.
        </p>
      </section>

      {/* Awards vs enterprise agreements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Awards vs enterprise agreements</h2>
        <p style={pStyle}>
          An enterprise agreement (EA) is a negotiated arrangement between an employer and their workforce that can set different conditions from the award. An EA must pass the &ldquo;Better Off Overall Test&rdquo; &mdash; employees must be better off under the EA than the award. Even under an EA, the award is the legal floor.
        </p>
      </section>

      {/* Common issues */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common ways workers miss out because of award misunderstanding</h2>

          <h3 style={h3Style}>Not knowing which award applies</h3>
          <p style={pStyle}>
            Many workers assume the pay is correct because the employer set it. But if the wrong award &mdash; or no award &mdash; is being applied, the minimums are wrong from the start.
          </p>

          <h3 style={h3Style}>Assuming the contract overrides the award</h3>
          <p style={pStyle}>
            A contract can offer more than the award, but never less. If your contract rate is below the award minimum, you&apos;re legally owed the higher rate.
          </p>

          <h3 style={h3Style}>Working in a covered industry and being told the award doesn&apos;t apply</h3>
          <p style={pStyle}>
            In almost all cases, this is wrong. If you work in a covered industry, the award applies.
          </p>

          <p style={pStyle}>
            If any of these sound familiar, check your pay now.
          </p>
        </div>
        <CheckPayCTA />
      </section>

      {/* How to find your modern award */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to find your modern award</h2>
        <p style={pStyle}>
          The simplest way is the Fair Work Award Finder at fairwork.gov.au. Enter your industry or job title and it identifies which award applies. You can also check your payslip &mdash; your award and classification should be listed there. See <a href="/guides/how-to-read-your-payslip" style={linkStyle}>how to read your payslip</a>
        </p>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer} {i === 2 && <> See <a href="/guides/how-to-report-underpayment" style={linkStyle}>how to report underpayment</a></>}</p>
          </details>
        ))}
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; find out in 2 minutes.
        </p>
        <p style={pStyle}>
          Enter your shifts and we&apos;ll calculate exactly what you should have been paid under your award.
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
