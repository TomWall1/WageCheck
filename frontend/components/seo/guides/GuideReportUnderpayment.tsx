/**
 * How to Report Underpayment — /guides/how-to-report-underpayment
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
  { question: 'Will my employer know I made a complaint?', answer: 'If the FWO investigates, yes — your employer will be contacted. Your legal protections against retaliation are strong.' },
  { question: 'What if I\'m on a visa?', answer: 'Your visa status doesn\'t affect your right to minimum wages or to make a complaint. The FWO has a visa holder support service.' },
  { question: 'Can I get a lawyer involved?', answer: 'Yes. Many employment lawyers offer free initial consultations. The FWO is free and often the most efficient path, but legal representation is an option.' },
];

export default function GuideReportUnderpayment() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;ve found out you&apos;ve been underpaid, acting on it can feel overwhelming &mdash; especially if you&apos;re worried about your job. But you have strong legal protections, a clear process to follow, and a government agency whose entire job is recovering money on your behalf. This guide walks through every step.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve identified a pay shortfall and want to know what to do &mdash; start here.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Kitchen hand discovers after 2 years they were never paid Sunday rates.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>Underpayment estimated:</strong> ~$4,800 across 2 years</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>Process:</strong> Raised with employer &rarr; employer disputed &rarr; FWO complaint lodged &rarr; full recovery</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>How long:</strong> ~4 months from complaint to resolution</p>
          <p style={smallStyle}>
            <strong>Key evidence:</strong> Rosters showing shift days + payslips showing flat rate
          </p>
        </div>
      </section>

      {/* Step 1 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Step 1: Document everything first</h2>
        <p style={pStyle}>
          Before raising anything with your employer, gather what you can:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Payslips &mdash; as many as possible, as far back as possible</li>
          <li>Roster records &mdash; anything showing days and hours worked</li>
          <li>Bank statements &mdash; show payment dates and amounts if payslips are missing</li>
          <li>Employment contract or letter of engagement</li>
          <li>Any written communications about pay, hours, or classification</li>
        </ul>
        <p style={pStyle}>
          You don&apos;t need everything to make a complaint &mdash; but more evidence means a stronger case.
        </p>
      </section>

      {/* Step 2 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Step 2: Raise it with your employer</h2>
        <p style={pStyle}>
          This is usually the right first step. Many underpayments aren&apos;t intentional. A direct, professional conversation often resolves it quickly.
        </p>
        <p style={pStyle}>How to approach it:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>State the issue factually: &ldquo;I&apos;ve checked the award and I believe my Sunday rate has been applied incorrectly.&rdquo;</li>
          <li>Refer to the award and pay guide by name and clause</li>
          <li>Give them a week to respond &mdash; and follow up in writing</li>
        </ul>
        <p style={pStyle}>
          If they acknowledge the error and fix it, you&apos;re done. If they dispute, deny, or become hostile &mdash; move to Step 3.
        </p>
      </section>

      {/* Step 3 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Step 3: Lodge a complaint with the Fair Work Ombudsman</h2>
        <p style={pStyle}>
          The Fair Work Ombudsman (FWO) is the government body responsible for investigating workplace underpayment. Their service is free.
        </p>
        <h3 style={h3Style}>How to lodge:</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Online: fairwork.gov.au/contact-us</li>
          <li>Phone: 13 13 94 (Monday to Friday, 8am&ndash;5:30pm)</li>
        </ul>
        <h3 style={h3Style}>What to include:</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Your name and employer details</li>
          <li>The award you believe applies</li>
          <li>The nature and dates of the underpayment</li>
          <li>Any evidence gathered</li>
        </ul>
        <h3 style={h3Style}>What the FWO can do:</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Investigate your employer&apos;s records</li>
          <li>Issue compliance notices</li>
          <li>Recover unpaid wages and interest going back 6 years</li>
          <li>Refer serious cases for prosecution</li>
        </ul>
        <p style={pStyle}>
          If you&apos;ve identified a shortfall but haven&apos;t calculated the exact amount, do that first. A specific number makes your complaint much stronger.
        </p>
        <CheckPayCTA />
      </section>

      {/* Step 4 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Step 4: Know your protections</h2>
        <p style={pStyle}>
          You cannot be legally dismissed, demoted, or disadvantaged for making a Fair Work complaint. This is called the &ldquo;general protections&rdquo; provision. If your employer takes adverse action because you raised a pay complaint, that is a separate and serious legal breach &mdash; and you can make a further complaint about it.
        </p>
      </section>

      {/* Common mistakes */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common mistakes when reporting</h2>

          <h3 style={h3Style}>Waiting too long</h3>
          <p style={pStyle}>
            Every week you wait is a week harder to reconstruct. Start documenting now.
          </p>

          <h3 style={h3Style}>Not raising it with the employer first</h3>
          <p style={pStyle}>
            The FWO will generally ask. It&apos;s not required, but it strengthens your complaint and is often the fastest path to resolution.
          </p>

          <h3 style={h3Style}>Accepting partial payment without written confirmation</h3>
          <p style={pStyle}>
            If your employer offers back pay, get the amount and scope confirmed in writing before accepting.
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

      {/* Find your award */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Find your award</h2>
        <p style={pStyle}>
          These rules apply across all modern awards — but the specific rates, penalty multipliers, and allowances vary by industry. If you&apos;re ready to check your actual pay:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Hospitality</strong> (hotels, bars, caf&eacute;s, clubs) &rarr; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award pay rates</a></li>
          <li><strong>Fast food and takeaway</strong> &rarr; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay rates</a></li>
          <li><strong>Restaurants and caf&eacute;s</strong> &rarr; <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Award pay rates</a></li>
          <li><strong>Retail</strong> (shops, supermarkets) &rarr; <a href="/awards/retail-award" style={linkStyle}>Retail Award pay rates</a></li>
          <li><strong>Admin and clerical</strong> &rarr; <a href="/awards/clerks-award" style={linkStyle}>Clerks Award pay rates</a></li>
          <li><strong>Cleaning</strong> &rarr; <a href="/awards/cleaning-award" style={linkStyle}>Cleaning Award pay rates</a></li>
        </ul>
        <p style={pStyle}>
          Not sure which applies to you? <a href="/awards" style={linkStyle}>Browse all awards</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t wait &mdash; underpayment compounds.
        </p>
        <p style={pStyle}>
          Check what you&apos;re owed first. A specific number makes your complaint much stronger.
        </p>
        <CheckPayCTA />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Contact the Fair Work Ombudsman on 13 13 94 or an employment lawyer for advice. Verify at fairwork.gov.au.
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

      {/* HowTo Schema for AI search visibility */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Report Underpayment in Australia',
        description: 'Step-by-step guide to reporting underpayment: document evidence, raise with your employer, lodge a Fair Work Ombudsman complaint, and know your legal protections.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Document everything first',
            text: 'Gather payslips, roster records, bank statements, your employment contract, and any written communications about pay, hours, or classification. More evidence means a stronger case.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Raise it with your employer',
            text: 'State the issue factually, refer to the award and pay guide by name and clause, and give them a week to respond. Follow up in writing. Many underpayments are resolved at this stage.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Lodge a complaint with the Fair Work Ombudsman',
            text: 'If your employer disputes or ignores your claim, lodge a free complaint with the FWO online at fairwork.gov.au/contact-us or by phone on 13 13 94. Include your employer details, the award that applies, the nature and dates of underpayment, and your evidence.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Know your protections',
            text: 'You cannot be legally dismissed, demoted, or disadvantaged for making a Fair Work complaint. This is the general protections provision. Adverse action by your employer is a separate and serious legal breach.',
          },
        ],
      }) }} />
    </>
  );
}
