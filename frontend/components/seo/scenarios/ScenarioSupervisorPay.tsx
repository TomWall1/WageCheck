/**
 * Scenario: I'm a Hospitality Supervisor — Should I Get More Pay?
 * URL: /awards/hospitality-award/scenarios/supervisor-pay
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
  { question: 'My title is "supervisor" but my duties haven\'t changed — does the title alone move me up?', answer: 'No. The level is determined by duties, not title. But if your duties include the indicators listed above, the title suggests your employer already acknowledges the supervisory role.' },
  { question: 'I\'ve been doing Level 3 work for 2 years at Level 2 pay — can I claim back pay?', answer: 'Yes — up to 6 years under the Fair Work Act. Misclassification affects every hour worked and every penalty rate for that entire period.' },
  { question: 'What if my employer disputes the reclassification?', answer: 'You can request a review through the Fair Work Commission. The commission assesses actual duties performed.' },
];

export default function ScenarioSupervisorPay() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Almost certainly yes. Supervisory duties under the Hospitality Award place you at Level 3 or Level 4 &mdash; higher <a href="/awards/hospitality-award/classifications" style={linkStyle}>classifications</a> that attract meaningfully higher <a href="/awards/hospitality-award/pay-rates" style={linkStyle}>pay rates</a>, including higher penalty rates on every weekend and public holiday shift. Being called a supervisor while being paid at Level 1 or Level 2 rates is one of the most frequently occurring underpayments in the industry.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you supervise other staff, run shifts, or take responsibility for a section in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), your classification level is determined by your actual duties &mdash; not your job title or what&apos;s convenient for your employer.
        </p>
        <h3 style={h3Style}>Level 3 indicators:</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Training or guiding Level 1&ndash;2 staff</li>
          <li>Handling customer complaints and difficult situations</li>
          <li>Organising your own work and coordinating others in your area</li>
          <li>Working independently across multiple functions</li>
        </ul>
        <h3 style={h3Style}>Level 4 indicators:</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Supervising a team with planning and allocation responsibility</li>
          <li>Opening and closing the venue</li>
          <li>Cash handling and end-of-day reconciliation</li>
          <li>Reporting to management on behalf of your team</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What the difference in pay means</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li><strong>Level 2 casual:</strong> Ordinary {/* TODO: dynamic rate */}$31.60/hr &middot; Sunday {/* TODO: dynamic rate */}$44.24/hr &middot; Public holiday {/* TODO: dynamic rate */}$56.88/hr</li>
            <li><strong>Level 3 casual:</strong> Ordinary {/* TODO: dynamic rate */}$32.63/hr &middot; Sunday {/* TODO: dynamic rate */}$45.68/hr &middot; Public holiday {/* TODO: dynamic rate */}$58.73/hr</li>
            <li><strong>Level 4 casual:</strong> Ordinary {/* TODO: dynamic rate */}$34.15/hr &middot; Sunday {/* TODO: dynamic rate */}$47.81/hr &middot; Public holiday {/* TODO: dynamic rate */}$61.47/hr</li>
          </ul>
          <p style={smallStyle}>
            Being at Level 2 when Level 3 applies costs ~{/* TODO: dynamic rate */}$1/hr on ordinary shifts &mdash; and more on every penalty day.
          </p>
        </div>
        <p style={pStyle}>
          Ask yourself: are you trusted to run shifts, train others, and solve problems independently? If yes, you may already be working above your current classification.
        </p>
        <p style={pStyle}>
          If so, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check if your level is correct &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The difference between Level 2 and Level 3 casual rates is approximately {/* TODO: dynamic rate */}$1.03/hr on ordinary hours &mdash; and larger on penalty days. Working 25 hours/week at the wrong level: approximately $25/week. Over a year: ~$1,300 &mdash; not counting the compounding effect on every weekend penalty rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip show a classification level?</li>
          <li>Does that level match the duties you actually perform &mdash; not just your job title?</li>
          <li>Has your classification ever been reviewed since you took on more responsibility?</li>
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
          Don&apos;t guess &mdash; check your current pay against your correct level.
        </p>
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
