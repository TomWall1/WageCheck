/**
 * Scenario: Regular Casual Status — /awards/hospitality-award/scenarios/regular-casual-status
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
  { question: 'My hours vary week to week — does that stop me from qualifying?', answer: 'Not necessarily. The Fair Work Commission assesses the overall pattern of engagement. Variation in hours doesn\u0027t automatically negate a regular and systematic pattern.' },
  { question: 'My employer says the business needs flexibility — is that enough to refuse conversion?', answer: 'Not on its own. The employer must provide genuine, specific operational reasons in writing. A general claim about needing flexible staffing isn\u0027t sufficient.' },
  { question: 'If I convert, can my employer then reduce my hours?', answer: 'Your permanent hours should reflect your regular casual pattern to the extent practicable. An immediate reduction in hours after conversion may be challengeable.' },
];

export default function ScenarioRegularCasual() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You might not be &mdash; or you may have the right to change. If you&apos;ve been working a consistent schedule as a <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>casual</a> hospitality worker for 12 months or more, you may qualify for casual conversion to permanent employment. And regardless of whether you convert, you&apos;re entitled to be paid correctly right now &mdash; including all <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a>.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve worked a regular casual schedule in hospitality for more than a year &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fair Work Act, casual employees who have worked on a regular and systematic basis for at least 12 months are entitled to either:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Request conversion to permanent part-time or full-time employment, or</li>
          <li>Receive a proactive offer of conversion from their employer</li>
        </ul>
        <p style={pStyle}>
          &quot;Regular and systematic&quot; doesn&apos;t require identical hours every week. A consistent pattern of engagement &mdash; same venue, recurring schedule, expected to be available &mdash; qualifies in most cases.
        </p>
        <p style={pStyle}>
          Your employer must either offer conversion or provide written reasons for not doing so within 21 days of a request.
        </p>
        <p style={pStyle}>
          Ask yourself: are you trusted to work a recognisable schedule, are you expected to be available on certain days, and has this been the case for more than 12 months? If yes, you likely qualify. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your casual pay and conversion rights &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What changes if you convert?</h2>
        <p style={pStyle}>You lose the 25% casual loading, but you gain:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Paid annual leave (4 weeks/year, pro-rated)</li>
          <li>Paid personal leave (10 days/year, pro-rated)</li>
          <li>Guaranteed hours as agreed</li>
          <li>Notice of termination</li>
          <li>Redundancy pay (where eligible)</li>
        </ul>
        <p style={pStyle}>
          For many workers on regular 3-day-a-week schedules, the annual leave alone is worth more per year than the loading difference.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Annual leave as a permanent part-time employee working 24hrs/week = 4 weeks &times; 24hrs &times; {/* TODO: dynamic rate */}$25.85/hr = approximately $2,480/year in leave entitlements not accruing. That&apos;s on top of any pay rate shortfalls. Workers kept casual indefinitely on regular schedules often miss $2,000&ndash;$4,000/year in leave value alone.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Whether or not you convert &mdash; check your current pay</h2>
        <p style={pStyle}>
          Even as a casual, you&apos;re entitled to correct <a href="/awards/hospitality-award/classifications" style={linkStyle}>classification</a>, full penalty rates on weekends and public holidays, minimum 3-hour engagement, and superannuation. These obligations apply regardless of how long the casual arrangement has been in place.
        </p>
        <p style={pStyle}>
          If you&apos;ve been on a regular casual schedule and haven&apos;t checked your pay properly, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your casual pay and conversion rights &rarr;</a>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check what your casual shifts should pay regardless.</p>
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
