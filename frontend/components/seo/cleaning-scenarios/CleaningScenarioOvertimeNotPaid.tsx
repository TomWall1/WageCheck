/**
 * Scenario: Extra Hours Cleaning and No Overtime
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
  { question: 'I clean multiple sites in one day — does travel time count toward overtime?', answer: 'If your employer directs you to travel between cleaning sites during a shift, that travel time is work time. It counts toward your daily and weekly hours. If it pushes you past 7.6 hours in a day or 38 hours in a week, those extra hours are overtime.' },
  { question: 'My employer says cleaners don\'t get overtime because shifts are short — is that right?', answer: 'If your individual shifts are short but you work enough shifts to exceed 38 hours in a week, you\'re entitled to overtime for the hours beyond 38. It doesn\'t matter that each shift was under 7.6 hours. Weekly overtime still applies.' },
  { question: 'I\'m a part-time cleaner — when does my overtime start?', answer: 'For part-time cleaners, overtime starts when you work beyond your agreed ordinary hours for the day or the week. If your contract says 4 hours on Monday and you work 5, that extra hour is overtime at penalty rates. You don\'t need to reach 38 hours.' },
];

export default function CleaningScenarioOvertimeNotPaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cleaning companies routinely avoid paying overtime by not recording extra hours. You stay an extra 30 minutes to finish a building. You travel between sites on your own time. You come in on your day off because someone called in sick. None of it shows up as overtime on your payslip &mdash; if you even get a payslip.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Under the Cleaning Services Award, overtime is payable after 7.6 hours per day or 38 hours per week. First 2 hours at 1.5&times;, then 2&times;.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Full-time: overtime after <strong>7.6 hours/day</strong> or <strong>38 hours/week</strong></li>
            <li style={{ marginBottom: '6px' }}>Part-time: overtime after <strong>agreed daily or weekly hours</strong></li>
            <li style={{ marginBottom: '6px' }}>First 2 hours: <strong>1.5&times; base rate</strong></li>
            <li style={{ marginBottom: '6px' }}>After 2 hours: <strong>2&times; base rate</strong></li>
            <li style={{ marginBottom: '6px' }}>Sunday overtime: <strong>2&times; for all hours</strong></li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time cleaner, Level 1 (~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr base). Works 5 days at 8.5 hours each (42.5 hours/week). Employer pays straight time for all hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they pay:</strong> 42.5 &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} = {l1 ? formatCurrency(l1.ftRate * 42.5) : '&mdash;'}
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Correct calculation:</strong> 38 hours &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} = {l1 ? formatCurrency(l1.ftRate * 38) : '&mdash;'}. Plus 2 hours &times; {l1 ? formatCurrency(l1.ftRate * 1.5) : '&mdash;'} (1.5&times;) = {l1 ? formatCurrency(l1.ftRate * 1.5 * 2) : '&mdash;'}. Plus 2.5 hours &times; {l1 ? formatCurrency(l1.ftRate * 2) : '&mdash;'} (2&times;) = {l1 ? formatCurrency(l1.ftRate * 2 * 2.5) : '&mdash;'}.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Should be: {l1 ? formatCurrency(l1.ftRate * 38 + l1.ftRate * 1.5 * 2 + l1.ftRate * 2 * 2.5) : '&mdash;'}. Getting {l1 ? formatCurrency(l1.ftRate * 42.5) : '&mdash;'}. Underpaid {l1 ? formatCurrency(l1.ftRate * 38 + l1.ftRate * 1.5 * 2 + l1.ftRate * 2 * 2.5 - l1.ftRate * 42.5) : '&mdash;'}/week &mdash; {l1 ? formatCurrency((l1.ftRate * 38 + l1.ftRate * 1.5 * 2 + l1.ftRate * 2 * 2.5 - l1.ftRate * 42.5) * 52) : '&mdash;'}/year.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Add up your actual hours for the week, including travel between sites</li>
          <li style={{ marginBottom: '6px' }}>Check if any day exceeds 7.6 hours</li>
          <li style={{ marginBottom: '6px' }}>Look for a separate overtime line on your payslip</li>
          <li style={{ marginBottom: '6px' }}>If you work extra shifts at short notice, verify those are recorded and paid as overtime</li>
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

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
