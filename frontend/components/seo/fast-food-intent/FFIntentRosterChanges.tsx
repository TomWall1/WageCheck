/**
 * High-intent: Fast Food Roster Changed at Short Notice — My Rights
 * URL: /awards/fast-food-award/roster-changes
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Can my employer change my roster without asking me?', answer: 'For permanent (full-time or part-time) employees, the employer must give at least 7 days\' notice of a roster change, or less if the change is agreed upon. For casuals, there is no guaranteed roster — but once a shift is confirmed, cancelling it at the last minute may still breach minimum engagement rules.' },
  { question: 'I showed up and was sent home after 1 hour. Do I get paid for 3?', answer: 'If you are a casual, yes. The Fast Food Award requires a minimum engagement of 3 hours for casuals. If you show up for a confirmed shift and are sent home early, you must be paid for at least 3 hours at your applicable rate.' },
  { question: 'My manager texts me at 5am saying my shift is cancelled. Is that okay?', answer: 'For casuals, there is no explicit notice period for cancellation in the award, but if you have already started travelling to work, the minimum engagement protections apply. For part-timers, roster changes require 7 days\' notice. A same-day cancellation without your agreement breaches this requirement.' },
  { question: 'Can they cut my hours as punishment for calling in sick?', answer: 'No. Reducing hours as retaliation for exercising a workplace right (including taking sick leave) is adverse action under the Fair Work Act. This is illegal and carries serious penalties for the employer.' },
  { question: 'I\'m part-time but my hours change every week. Is that allowed?', answer: 'Part-time employees under the Fast Food Award must have agreed regular hours. If your hours fluctuate significantly each week without agreement, you may actually be working as a casual without receiving casual loading. This is a common misclassification issue.' },
];

export default function FFIntentRosterChanges({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;

  const g1Casual = g1 ? formatCurrency(g1.casualRate) : '&mdash;';
  const minEngagement = g1 ? formatCurrency(g1.casualRate * 3) : '&mdash;';
  const shortfallSentHome = g1 ? formatCurrency(g1.casualRate * 2) : '&mdash;';

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Your shift was on the roster. You planned your day around it. Then a text from your manager: &quot;Don&apos;t come in today.&quot; Or worse &mdash; you show up and they send you home after an hour. This happens constantly in fast food, and most workers assume there&apos;s nothing they can do about it.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          You have rights around roster changes, minimum shift lengths, and last-minute cancellations. Here&apos;s what the Fast Food Award actually says.
        </p>
      </section>

      {/* Notice requirements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Roster change notice requirements</h2>

        <div style={warningBoxStyle}>
          <h3 style={h3Style}>Full-time and part-time workers</h3>
          <p style={pStyle}>
            Your employer must give you at least <strong>7 days&apos; written notice</strong> of any roster change. This means changes to your start time, finish time, days of work, or total hours. The 7-day requirement can only be shortened by genuine mutual agreement &mdash; not a manager telling you &quot;we need you to be flexible.&quot;
          </p>

          <h3 style={h3Style}>Casual workers</h3>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            Casuals don&apos;t have guaranteed ongoing hours, so the roster rules are different. However, once a shift is offered and accepted, minimum engagement protections apply. You cannot be called in and then sent home after 30 minutes without being paid for the minimum engagement period.
          </p>
        </div>
      </section>

      {/* Minimum engagement */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Minimum engagement: the 3-hour rule</h2>
        <p style={pStyle}>
          Under the Fast Food Award, casual employees must be engaged for a minimum of <strong>3 hours</strong> per shift. If you show up for a shift and your employer sends you home after 1 hour because &quot;it&apos;s quiet,&quot; they still owe you for 3 hours.
        </p>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Example: sent home early</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            You&apos;re a casual Grade 1 adult. You arrive for your 4pm shift. At 5pm, the manager says it&apos;s dead and sends you home.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>You worked:</strong> 1 hour
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>You must be paid:</strong> 3 hours &times; {g1Casual} = <strong>{minEngagement}</strong>
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            If they only pay you for 1 hour ({g1Casual}), you are owed {shortfallSentHome}.
          </p>
        </div>
      </section>

      {/* Shift cancellations */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What happens when your shift is cancelled</h2>
        <p style={pStyle}>
          The Fast Food Award does not contain an explicit &quot;cancellation fee&quot; for shifts cancelled before you arrive. However:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Part-timers:</strong> If the shift was on your agreed roster and you weren&apos;t given 7 days&apos; notice, the change may be a breach. You may be entitled to the hours you were rostered for.</li>
          <li style={{ marginBottom: '8px' }}><strong>Casuals:</strong> If you have already started travelling to work when notified, minimum engagement protections may apply. Document the timeline.</li>
          <li style={{ marginBottom: '8px' }}><strong>Pattern of cancellations:</strong> Repeated last-minute cancellations may constitute adverse action if they are linked to your exercising a workplace right (requesting correct pay, taking leave, etc.).</li>
        </ul>
      </section>

      {/* Hours being cut */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hours being cut &mdash; when it crosses the line</h2>
        <p style={pStyle}>
          Managers in fast food sometimes reduce hours as informal punishment &mdash; for calling in sick, raising a pay issue, or refusing an unreasonable request. This is <strong>adverse action</strong> under the Fair Work Act and is illegal.
        </p>
        <p style={pStyle}>
          Signs your hours are being cut unlawfully:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '4px' }}>Your hours dropped immediately after you raised a concern about pay or conditions.</li>
          <li style={{ marginBottom: '4px' }}>Other workers kept their hours but yours were reduced.</li>
          <li style={{ marginBottom: '4px' }}>You were told verbally that the cut is because you &quot;weren&apos;t a team player&quot; or similar.</li>
        </ul>
        <p style={pStyle}>
          If this is happening to you, document everything (screenshots of rosters, text messages, dates) and contact the Fair Work Ombudsman on 13 13 94.
        </p>
      </section>

      {/* Know your hours */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Track your shifts and pay</h2>
        <p style={pStyle}>
          The best way to protect yourself is to know exactly what you&apos;re owed. Enter your shifts into our calculator to see whether your pay matches the award for every hour, every day, every penalty rate.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
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

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Based on the Fast Food Industry Award 2010 (MA000003) and the Fair Work Act 2009. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
