/**
 * Scenario: Unpaid Staff Meeting — /awards/hospitality-award/scenarios/unpaid-staff-meeting
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
  { question: 'My employer says meetings are "part of the job" — is that a valid reason not to pay?', answer: 'No. Work required by an employer must be paid regardless of how it\u0027s framed. Mandatory attendance at any workplace activity is working time.' },
  { question: 'What if I choose to attend an optional meeting?', answer: 'Genuinely optional — where there\u0027s no consequence for not attending — may be different. But if attendance is expected or there are professional consequences for absence, it\u0027s not truly optional.' },
  { question: 'What if the meeting was only 10 minutes?', answer: 'For casual employees, the minimum engagement of 3 hours applies to any engagement. A 10-minute mandatory meeting on a day you\u0027re called in for that purpose means 3 hours\u0027 pay.' },
];

export default function ScenarioUnpaidMeeting() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No &mdash; and it&apos;s not legal. If you attended a staff meeting at your employer&apos;s direction, that time is working time and must be paid at the applicable rate. There&apos;s no provision in the Hospitality Award or the Fair Work Act for mandatory unpaid meetings of any duration. This applies whether the meeting was before your shift, after it, or on a day you weren&apos;t otherwise rostered.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve attended staff meetings in hospitality without being paid &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Any time you&apos;re required to be at your workplace or performing work at your employer&apos;s direction is working time. This includes:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Pre-shift briefings and handovers</li>
          <li>Staff training sessions</li>
          <li>Compulsory team meetings</li>
          <li>End-of-shift debriefs</li>
        </ul>
        <p style={pStyle}>
          The applicable rate depends on your employment type (permanent or casual), the day and time the meeting is held, and whether the meeting pushes your total hours past the <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a> threshold.
        </p>
        <p style={pStyle}>
          A Sunday morning staff meeting before your shift starts must be paid at the Sunday rate, not a special &quot;meeting rate.&quot;
        </p>
        <p style={pStyle}>
          If you&apos;ve attended meetings without pay, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common scenarios</h2>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Pre-shift briefing held before the rostered start time</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            You&apos;re required to arrive 20 minutes before your shift for a daily briefing. Those 20 minutes are working time that must be paid at the applicable rate for that day.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Mandatory training sessions held on a rostered day off</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            If you&apos;re required to attend on a day you wouldn&apos;t otherwise work, you must be paid for the time at the applicable rate &mdash; and for a minimum of 3 hours if you&apos;re <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>casual</a>.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Meetings that push hours past overtime threshold</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            If the meeting takes your total weekly hours past 38, those meeting hours attract <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime rates</a>.
          </p>
        </div>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check what your total hours should have paid.</p>
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
