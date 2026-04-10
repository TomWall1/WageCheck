/**
 * High-intent: Not Getting Overtime as a Cleaner?
 * URL: /awards/cleaning-award/cleaning-overtime
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
  { question: 'When does overtime start for cleaners?', answer: 'For full-time cleaners, overtime starts after 38 hours per week or 7.6 hours per day (unless you work a compressed roster). For part-time cleaners, overtime starts when you exceed your agreed hours. For casuals, overtime starts after 38 hours per week or 7.6 hours per day.' },
  { question: 'What is the overtime rate for cleaners?', answer: 'Under the Cleaning Services Award, the first 2 hours of overtime are paid at time-and-a-half (1.5x your base rate). After that, it\'s double time (2x). Your overtime rate depends on your classification level — use the calculator below to see your exact rates.' },
  { question: 'My boss says cleaners don\'t get overtime — is that true?', answer: 'No. Every employee covered by the Cleaning Services Award is entitled to overtime pay when they work beyond their ordinary hours. There is no exemption for cleaning work. If your employer tells you otherwise, they are wrong or they are lying.' },
];

export default function CleaningIntentOvertime({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work more than 38 hours a week as a cleaner and your pay doesn&apos;t increase, you&apos;re being ripped off. Overtime is not optional. It is a legal requirement under the Cleaning Services Award, and your employer cannot avoid it by paying you a flat weekly amount or calling you a contractor.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          After 38 hours per week (or 7.6 hours per day), every extra hour must be paid at time-and-a-half, then double time.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>First 2 hours of overtime: <strong>1.5&times; base rate</strong></li>
            <li style={{ marginBottom: '6px' }}>After 2 hours: <strong>2&times; base rate</strong></li>
            <li style={{ marginBottom: '6px' }}>Overtime on Sunday: <strong>2&times; base rate</strong> for all hours</li>
            <li style={{ marginBottom: '6px' }}>Overtime on a public holiday: <strong>2.5&times; base rate</strong></li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time cleaner, Level 1 base rate ~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr. Works Monday to Friday, 8.5 hours per day (42.5 hours/week). Employer pays a flat $950/week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Correct calculation:</strong> 38 hours &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} = {l1 ? formatCurrency(l1.ftRate * 38) : '&mdash;'}. Plus 2 hours &times; {l1 ? formatCurrency(l1.ftRate * 1.5) : '&mdash;'} (1.5&times;) = {l1 ? formatCurrency(l1.ftRate * 1.5 * 2) : '&mdash;'}. Plus 2.5 hours &times; {l1 ? formatCurrency(l1.ftRate * 2) : '&mdash;'} (2&times;) = {l1 ? formatCurrency(l1.ftRate * 2 * 2.5) : '&mdash;'}.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Should be paid: {l1 ? formatCurrency(l1.ftRate * 38 + l1.ftRate * 1.5 * 2 + l1.ftRate * 2 * 2.5) : '&mdash;'}/week. Getting $950. Short-changed {l1 ? formatCurrency(l1.ftRate * 38 + l1.ftRate * 1.5 * 2 + l1.ftRate * 2 * 2.5 - 950) : '&mdash;'}/week.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Does your payslip show separate overtime hours and rates?</li>
          <li style={{ marginBottom: '6px' }}>Do your recorded hours match reality, including travel between sites?</li>
          <li style={{ marginBottom: '6px' }}>Are you working more than 7.6 hours in any single day?</li>
          <li style={{ marginBottom: '6px' }}>Does your employer count time spent setting up equipment or travelling between jobs?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>Track your hours for one week. Then check what you should actually be earning.</p>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Cleaning Services Award 2020 (MA000022), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
