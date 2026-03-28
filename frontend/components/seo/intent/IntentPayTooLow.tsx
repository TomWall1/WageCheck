/**
 * High-intent: Hospitality Pay Seems Too Low — Check What You're Actually Owed
 * URL: /awards/hospitality-award/pay-too-low
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
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
  { question: 'I don\'t know my classification level \u2014 how do I find out?', answer: 'Check your payslip or employment contract. If it\'s not there, ask your employer directly \u2014 they\'re legally required to tell you. Then compare your duties against the classification descriptions.' },
  { question: 'My employer says my rate is correct \u2014 how do I verify?', answer: 'Use the tool below. Enter your actual shifts and employment type and it calculates what the award requires for those exact hours and days. That gives you an objective comparison.' },
  { question: 'What if I find multiple issues \u2014 which one do I raise first?', answer: 'The total amount owed is the sum of all the shortfalls, not just the largest one. Calculate the complete picture first, then raise everything together.' },
];

export default function IntentPayTooLow({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If your pay doesn&apos;t feel right but you&apos;re not sure exactly what&apos;s wrong, you&apos;re not alone. The Hospitality Award is complex &mdash; there are multiple pay rates, multiple allowances, and multiple places where things can quietly go wrong. This page helps you identify which one might be affecting you.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in hospitality and your pay feels off &mdash; even if you can&apos;t pinpoint why &mdash; this is where to start.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Experienced bar attendant, 2 years in role, Level 2. Has a vague sense pay &quot;should be more&quot; but can&apos;t identify why.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>The audit:</strong> Classification correct. Weekday rate correct. But Sunday rate applied at permanent rate ({rates ? formatCurrency(getLevel(rates, 2)?.sundayFt ?? 0) : '$37.92'}/hr) despite being casual (should be {rates ? formatCurrency(getLevel(rates, 2)?.sundayCasual ?? 0) : '$44.24'}/hr).</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment identified: ~$50 per Sunday shift. ~$2,600/year.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> The wrong rate applied to one shift type goes unnoticed when everything else looks broadly correct.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The most common reasons hospitality pay is lower than it should be</h2>
        <p style={pStyle}>
          Work through this checklist. Each is a separate possible source of underpayment:
        </p>

        <h3 style={h3Style}>1. Wrong classification level</h3>
        <p style={pStyle}>
          Your base rate &mdash; and every penalty rate calculated from it &mdash; depends on your classification. If it&apos;s set too low, everything downstream is wrong. Check the <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a> and compare your duties against the level descriptions.
        </p>

        <h3 style={h3Style}>2. Penalty rates not applied correctly</h3>
        <p style={pStyle}>
          Saturday, Sunday, public holiday, evening, and late-night rates must all appear separately on your payslip. If they don&apos;t, there&apos;s a good chance at least one isn&apos;t being applied. See the <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>Hospitality Award penalty rates guide</a>.
        </p>

        <h3 style={h3Style}>3. Casual loading and penalty rates treated as the same thing</h3>
        <p style={pStyle}>
          If you&apos;re casual and your rate is the same every day, the casual loading is there but the penalty rates are not. Both must apply. See the <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Hospitality Award casual employees guide</a>.
        </p>

        <h3 style={h3Style}>4. Allowances missing</h3>
        <p style={pStyle}>
          Split shift allowance, meal allowance, tool allowance &mdash; if any of these apply to your situation and don&apos;t appear on your payslip, they&apos;re not being paid. See the <a href="/awards/hospitality-award/allowances" style={linkStyle}>Hospitality Award allowances guide</a>.
        </p>

        <h3 style={h3Style}>5. Overtime not triggered</h3>
        <p style={pStyle}>
          Regularly working past 38 hours/week or 10 hours/day and seeing no overtime on your payslip means overtime isn&apos;t being calculated. See the <a href="/awards/hospitality-award/overtime" style={linkStyle}>Hospitality Award overtime guide</a>.
        </p>

        <p style={pStyle}>
          If any of these sound familiar, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Find out exactly what&apos;s wrong &rarr;</a>
        </p>
      </section>

      {/* Payslip warning box */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; What your payslip should show</h2>
          <p style={pStyle}>
            If any of these are absent from your payslip, that&apos;s a red flag:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>Your award name (Hospitality Industry General Award 2020) and MA code (MA000009)</li>
            <li>Your classification level</li>
            <li>Separate rate lines for each day type you worked</li>
            <li>Any allowances owed for that pay period</li>
            <li>Superannuation contributions</li>
          </ul>
          <p style={pStyle}>
            A payslip that shows only &quot;X hours &times; $Y rate&quot; with nothing else is hiding information. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Find out exactly what&apos;s wrong &rarr;</a>
          </p>
        </div>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>
              {faq.answer}
              {i === 0 && <> See <a href="/awards/hospitality-award/classifications" style={linkStyle}>classifications guide</a>.</>}
            </p>
          </details>
        ))}
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; enter your shifts and find out exactly what&apos;s wrong.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid and by how much.
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
