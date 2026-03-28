/**
 * Scenario: Public Holiday Not Worked — /awards/hospitality-award/scenarios/public-holiday-not-worked
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says I take a day off in lieu of the public holiday — is that legal?', answer: 'Yes, in some cases — if the employer and employee agree on a substitute day. The substitute day must also be paid at ordinary rates.' },
  { question: 'I\u0027m permanent part-time — do I get paid for public holidays?', answer: 'Yes, if the public holiday falls on a day you would ordinarily work. If your roster doesn\u0027t include that day ordinarily, the entitlement doesn\u0027t apply for that holiday.' },
  { question: 'Can my employer require me to work on a public holiday?', answer: 'They can request it — but you have the right to refuse if the request is unreasonable. If you do work, the 2.25\u00d7 public holiday rate applies.' },
];

export default function ScenarioPHNotWorked() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re a permanent employee and the public holiday falls on a day you would ordinarily work &mdash; yes. Under the National Employment Standards, permanent employees are entitled to a paid day off on public holidays. If you were not required to work the holiday and it fell on a rostered day, you should receive your ordinary pay for that day.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a permanent hospitality worker and public holidays are regularly deducted from your pay &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the National Employment Standards (which apply on top of the Hospitality Award):
        </p>
        <p style={pStyle}>
          Permanent employees are entitled to a paid day off on each national public holiday. If the holiday falls on a day they would ordinarily work:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>They receive their ordinary pay for that day</li>
          <li>They don&apos;t need to work to receive it</li>
        </ul>
        <p style={pStyle}>
          <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Casual</a> employees are generally not entitled to pay for public holidays they don&apos;t work &mdash; unless the day was already rostered and then cancelled.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>When things get complicated</h2>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Public holiday falls on a rotating roster day off</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            If you&apos;re rostered off anyway and the holiday doesn&apos;t fall on a day you&apos;d ordinarily work, no payment applies for that instance.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Employer says your salary already accounts for public holidays</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            For salaried workers, this is sometimes valid &mdash; but the salary must genuinely cover all entitlements including the public holiday. If you regularly work 50-hour weeks on a salary, the &quot;public holidays included&quot; claim deserves scrutiny.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>You were required to work the public holiday instead</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            If you work on the public holiday, you&apos;re entitled to the 2.25&times; public holiday rate &mdash; plus potentially a substitute day off depending on the arrangement.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A permanent employee who should receive a paid day off on each public holiday but doesn&apos;t &mdash; and works 5 days/week &mdash; misses approximately 8&ndash;10 paid days per year (depending on state). At Level 2 permanent rates, that&apos;s 8 &times; 7.6hrs &times; {/* TODO: dynamic rate */}$25.85/hr = approximately $1,572/year in paid leave not received.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>For permanent employees: do public holidays that fall on your ordinary working days appear as paid leave days?</li>
          <li>Is your pay in the period containing a public holiday identical to a period without one? If so, you may be missing the holiday pay.</li>
        </ul>
        <p style={pStyle}>
          If public holidays are disappearing from your pay as a permanent employee, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your public holiday entitlements &rarr;</a>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check what public holidays should look like on your payslip.</p>
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
