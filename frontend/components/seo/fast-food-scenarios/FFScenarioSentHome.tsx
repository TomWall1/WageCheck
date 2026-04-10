/**
 * Scenario: Sent Home Early From a Fast Food Shift — What Am I Owed?
 * /awards/fast-food-award/scenarios/sent-home-early
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'I was sent home after 1 hour — do I get paid for 2?', answer: 'If you\'re a casual employee, yes. The minimum engagement for casuals under the Fast Food Industry Award is 2 hours. Even if you only worked 1 hour, you must be paid for the full 2 hours. For full-time and part-time employees, you must be paid for the hours you were rostered to work.' },
  { question: 'Can my employer send me home because it\'s quiet?', answer: 'Your employer can ask you to go home early, but you are entitled to be paid for the minimum engagement period (2 hours for casuals) or your rostered hours (for permanent employees). If you\'re permanent and agree to leave early, you should be paid for the rostered time or take the time as leave by mutual agreement.' },
  { question: 'What if I\'m full-time and sent home after 3 hours of a 6-hour shift?', answer: 'As a full-time employee, you\'re entitled to be paid for your full rostered shift unless you agree to leave early. If you\'re sent home without agreement, you should be paid for the entire 6 hours. Your employer cannot unilaterally cut your rostered hours.' },
];

export default function FFScenarioSentHome({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const casualRate = l1?.casualRate ?? 30.91;
  const minPay = Math.round(casualRate * 2 * 100) / 100;
  const oneHourPay = Math.round(casualRate * 1 * 100) / 100;
  const shortfall = Math.round((minPay - oneHourPay) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You are owed at least 2 hours&apos; pay if you&apos;re a casual sent home early from a fast food shift. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> guarantees a minimum engagement of 2 hours for casual employees, regardless of how long you actually worked.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fast Food Industry Award (MA000003), casual employees must be engaged and paid for a minimum of 2 hours per shift. This applies even if the employer sends you home after 30 minutes because it&apos;s quiet. For full-time and part-time employees, you are entitled to be paid for your full rostered hours. Your employer cannot reduce your shift on the day without your genuine agreement.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Casual Grade 1 — sent home after 1 hour</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Casual hourly rate: ${casualRate.toFixed(2)}/hr</li>
            <li>Minimum 2-hour engagement: ${minPay.toFixed(2)}</li>
            <li>Paid for only 1 hour: ${oneHourPay.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            Shortfall: ${shortfall.toFixed(2)}. If this happens weekly, that&apos;s over ${(shortfall * 52).toFixed(2)} per year in lost pay.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Were you paid for at least 2 hours even though you were sent home early?</li>
          <li>Does the rate match your casual rate (including 25% loading)?</li>
          <li>If you&apos;re permanent, were you paid for your full rostered hours?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
