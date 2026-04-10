/**
 * Scenario: Working a Double Shift in Fast Food — How Is It Paid?
 * /awards/fast-food-award/scenarios/double-shift
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'At what point does a double shift trigger overtime?', answer: 'For full-time employees, overtime kicks in when you exceed your agreed daily ordinary hours or 38 hours in the week. If your ordinary hours are 8 per day and you work a 16-hour double shift, the extra 8 hours are overtime — first 2 at 150%, remainder at 200%.' },
  { question: 'Do I get a break between shifts?', answer: 'You must receive a minimum 8-hour break between shifts. If your employer rosters you for a close-open (e.g., finish at midnight, start at 6am), you\'re entitled to refuse that second shift or be paid at overtime rates for any hours that fall within the 8-hour rest period.' },
  { question: 'Can my employer force me to work a double shift?', answer: 'Your employer can request you work additional hours, but you can refuse if the request is unreasonable. Factors include how much notice you were given, your personal circumstances, and whether the additional hours are safe. Working 14-16 hours straight raises legitimate safety and fatigue concerns.' },
];

export default function FFScenarioDoubleShift({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const ot150 = Math.round(baseRate * 1.5 * 100) / 100;
  const ot200 = Math.round(baseRate * 2.0 * 100) / 100;
  const lateNight = Math.round(baseRate * 1.10 * 100) / 100;
  const ordPay8 = Math.round(baseRate * 8 * 100) / 100;
  const otPay2 = Math.round(ot150 * 2 * 100) / 100;
  const otPay6 = Math.round(ot200 * 6 * 100) / 100;
  const total16 = Math.round((ordPay8 + otPay2 + otPay6) * 100) / 100;
  const flat16 = Math.round(baseRate * 16 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          A double shift in fast food triggers overtime rates for hours beyond your ordinary daily limit. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, the first 2 hours of overtime are at 150% and all subsequent hours at 200% — and late night loadings may apply on top.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) sets ordinary hours at a maximum of 38 per week, typically spread across no more than 5 days. When you work a double shift that exceeds your daily ordinary hours, the extra hours are overtime: 150% for the first 2 hours, then 200% for each hour after that. Additionally, if any part of your double shift falls after 10pm, the late night loading (10% to midnight, 15% after midnight) applies on top of the overtime rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 full-time, 16-hour double shift (8am&ndash;midnight)</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>8 ordinary hours: ${ordPay8.toFixed(2)}</li>
            <li>2 hours at 150%: ${otPay2.toFixed(2)}</li>
            <li>6 hours at 200%: ${otPay6.toFixed(2)}</li>
            <li>Correct total: ${total16.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At a flat rate for 16 hours, you&apos;d receive ${flat16.toFixed(2)} — a shortfall of ${(total16 - flat16).toFixed(2)}. Late night loadings (10pm&ndash;midnight) would increase this further.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are your overtime hours shown at 150% and 200% rates separately?</li>
          <li>If your shift crossed 10pm, is a late night loading applied to those hours?</li>
          <li>Were you paid for the full number of hours you actually worked?</li>
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
