/**
 * Scenario: I Work 6 Days a Week in Hospitality — Do I Get Extra Pay?
 * URL: /awards/hospitality-award/scenarios/6-days-week-pay
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
  { question: 'What if I\'m casual — do I get overtime for 6-day weeks?', answer: 'The daily threshold (more than 10 hours in a day) applies to casuals. Weekly overtime in the same way as permanent employees generally doesn\'t apply to casual workers, but check your specific arrangement.' },
  { question: 'My employer says a 6-day week is just "how hospitality works" — is that right?', answer: 'It\'s common — but the award applies regardless of industry norms. Every hour past 38 must be paid at overtime rates.' },
  { question: 'What if each individual shift is under 10 hours but the week adds up to over 38?', answer: 'The weekly threshold still triggers. You don\'t need to exceed 10 hours in a single day for weekly overtime to apply.' },
];

export default function Scenario6DaysWeek() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Yes &mdash; in most cases. Working 6 days a week in hospitality almost certainly means you&apos;re working more than 38 ordinary hours, which triggers <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a> under the Hospitality Award. The hours beyond 38 must be paid at overtime rates, not your ordinary rate.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work 6 days a week in any hospitality venue &mdash; this likely applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Industry (General) Award 2020 (MA000009), overtime applies when you work more than 38 ordinary hours in a week. For full-time workers, a standard week is 38 hours &mdash; so a 6-day week almost always pushes past that threshold.
        </p>
        <p style={pStyle}>The overtime rates are:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>First 2 hours of overtime:</strong> 1.5&times; your ordinary rate (time-and-a-half)</li>
          <li><strong>After 2 hours:</strong> 2&times; your ordinary rate (double time)</li>
        </ul>
        <p style={pStyle}>
          These apply on top of any weekend <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a> that also apply on your 6th day.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Example:</strong> Your 6-day week totals 48 hours and your ordinary rate is {/* TODO: dynamic rate */}$26.10/hr (Level 3 permanent):
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Hours 1&ndash;38: {/* TODO: dynamic rate */}$26.10/hr</li>
            <li>Hours 39&ndash;40: {/* TODO: dynamic rate */}$39.15/hr (time-and-a-half)</li>
            <li>Hours 41&ndash;48: {/* TODO: dynamic rate */}$52.20/hr (double time)</li>
          </ul>
          <p style={smallStyle}>
            Plus: if your 6th day falls on a Saturday or Sunday, the applicable penalty rate applies to those hours instead of (or in addition to) the overtime rate &mdash; whichever is higher.
          </p>
        </div>
        <p style={pStyle}>
          If your 6th day pay looks the same as your other days, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your overtime entitlement &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A 6-day week typically means 8&ndash;10 hours of overtime. At Level 3 permanent, those hours attract time-and-a-half then double time. Working this pattern every week: the missed overtime typically adds up to $150&ndash;$250/week. Over a year: $7,500&ndash;$13,000.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does overtime appear as a separate line for the hours beyond 38?</li>
          <li>Does Saturday or Sunday rate appear separately for your 6th day if it falls on a weekend?</li>
          <li>Is there a single flat rate for all hours regardless of how many you worked?</li>
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
        <p style={pStyle}>
          Don&apos;t guess &mdash; enter your actual hours and shifts below. It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;re owed extra pay.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
