/**
 * High-intent: Am I Being Underpaid in Hospitality?
 * URL: /awards/hospitality-award/am-i-being-underpaid
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel, getEveningLoading, getNightLoading } from '@/lib/hospitality-rates';
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
  { question: 'I\'ve worked here for 3 years \u2014 could I really have been underpaid the whole time?', answer: 'Yes \u2014 and it\'s more common than most people realise. The Fair Work Ombudsman regularly recovers wages going back multiple years for workers in exactly this situation. The 6-year recovery window exists specifically for this.' },
  { question: 'My employer seems fair \u2014 could this be a mistake rather than deliberate?', answer: 'Often yes. Payroll errors, outdated systems, and genuine misunderstanding of the award account for a large proportion of underpayments. Raising it doesn\'t imply accusation \u2014 it\'s a straightforward correction in most cases.' },
  { question: 'What if my employer gets angry when I raise it?', answer: 'You are legally protected from adverse action \u2014 dismissal, demotion, reduction in hours \u2014 for exercising your workplace rights. If your employer retaliates, that\'s a separate and serious legal breach.' },
];

export default function IntentAmIUnderpaid({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in hospitality and you&apos;re asking this question, there&apos;s a high chance the answer is yes. The Hospitality Award is one of the most complex in Australia &mdash; and it&apos;s consistently among the most breached. Penalty rates, allowances, and classification levels are all points where underpayment happens quietly, and most workers never check.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in a pub, bar, hotel, caf&eacute;, or function venue and have never compared your pay against the award &mdash; this page is for you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual food and beverage attendant, Level 2. Works 4 shifts per week including one Sunday and one public holiday. Paid $32/hr for every shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> $32/hr flat &mdash; $128 per Sunday shift, $256 per public holiday shift (8hr shifts)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday casual at Level 2 = {rates ? formatCurrency(getLevel(rates, 2)?.sundayCasual ?? 0) : '$44.24'}/hr ($353.92). Public holiday = {rates ? formatCurrency(getLevel(rates, 2)?.publicHolidayCasual ?? 0) : '$56.88'}/hr ($455.04)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$226 per week. ~$11,700/year.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer sets one rate and applies it every day. Worker assumes the rate is correct because the employer set it.
          </p>
        </div>
      </section>

      {/* Three most common signs */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The three most common signs you&apos;re being underpaid in hospitality</h2>

        <h3 style={h3Style}>1. Your pay looks the same regardless of the day</h3>
        <p style={pStyle}>
          If your Sunday rate, Saturday rate, and Tuesday rate are identical on your payslip, penalty rates almost certainly haven&apos;t been applied. Under the Hospitality Award, Sunday casual rate at Level 2 is {rates ? formatCurrency(getLevel(rates, 2)?.sundayCasual ?? 0) : '$44.24'}/hr &mdash; significantly higher than the ordinary weekday rate of {rates ? formatCurrency(getLevel(rates, 2)?.casualRate ?? 0) : '$31.60'}/hr.
        </p>
        <p style={pStyle}>
          If your payslip shows one rate every day, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now</a>.
        </p>

        <h3 style={h3Style}>2. You regularly work more than 38 hours but never see overtime</h3>
        <p style={pStyle}>
          Overtime triggers after 38 ordinary hours per week, or after 10 hours in a single day. If you&apos;re consistently working past these thresholds and your payslip looks identical every week, overtime isn&apos;t being calculated. See the <a href="/awards/hospitality-award/overtime" style={linkStyle}>Hospitality Award overtime guide</a>.
        </p>

        <h3 style={h3Style}>3. No allowances appear despite applicable conditions</h3>
        <p style={pStyle}>
          Split shifts, meal allowances, first aid appointments, and tool allowances should appear as separate lines on your payslip. If you work split shifts or bring your own knives and see nothing, those entitlements aren&apos;t being paid. See the <a href="/awards/hospitality-award/allowances" style={linkStyle}>Hospitality Award allowances guide</a>.
        </p>
      </section>

      {/* Warning box */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; The exact patterns we see when hospitality workers are underpaid</h2>

          <h3 style={h3Style}>Flat hourly rate regardless of weekends or public holidays</h3>
          <p style={pStyle}>
            One rate for every shift &mdash; weekday, Saturday, Sunday, Christmas Day. Unless the flat rate has been formally assessed against every penalty scenario and demonstrably covers all of them, this is almost always underpayment.
          </p>
          <p style={pStyle}>
            If this sounds like your situation, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now</a>.
          </p>

          <h3 style={h3Style}>Classified at Level 2 when Level 3 duties are being performed</h3>
          <p style={pStyle}>
            Training new staff, running sections, and handling complaints independently are Level 3 duties. The difference is over $1/hr base &mdash; and that compounds on every penalty shift. See the <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a>.
          </p>

          <h3 style={h3Style}>Casual loading treated as covering weekend rates</h3>
          <p style={pStyle}>
            The 25% casual loading and penalty rates are separate. Both apply. Getting the loading doesn&apos;t mean Sunday or public holiday rates don&apos;t also apply on top. See the <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Hospitality Award casual employees guide</a>.
          </p>

          <h3 style={h3Style}>Overtime simply never paid</h3>
          <p style={pStyle}>
            Working a 45-hour week and receiving the same as a 38-hour week. Common across kitchen, bar, and housekeeping roles where long hours are normalised.
          </p>

          <h3 style={h3Style}>Allowances never mentioned, never paid</h3>
          <p style={pStyle}>
            Split shift allowances, meal allowances, tool allowances &mdash; recurring entitlements that never appear on the payslip because neither side raises them.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you find a shortfall</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Calculate the exact amount using the tool below &mdash; a specific number makes everything easier</li>
          <li>Raise it with your employer &mdash; many underpayments are genuine errors that get corrected quickly</li>
          <li>If unresolved, contact the Fair Work Ombudsman on 13 13 94 &mdash; they can recover unpaid wages going back 6 years at no cost to you</li>
        </ul>
        <p style={pStyle}>
          See the full <a href="/guides/how-to-report-underpayment" style={linkStyle}>guide to reporting underpayment</a>.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including overtime, penalty rates, and allowances.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
