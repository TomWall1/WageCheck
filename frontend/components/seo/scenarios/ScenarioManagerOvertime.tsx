/**
 * Scenario: Manager Overtime — /awards/hospitality-award/scenarios/manager-overtime
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says managers don\u0027t get overtime — is that right?', answer: 'Not automatically. Managers covered by the Hospitality Award are entitled to overtime unless their salary provably covers it. The assumption that "managers don\u0027t get overtime" is often wrong.' },
  { question: 'What if I\u0027m above the award — does it still apply?', answer: 'If you\u0027re employed under an individual arrangement that\u0027s genuinely better overall than the award, specific provisions may differ. But the arrangement must be assessed against the award — it can\u0027t simply ignore it.' },
  { question: 'Can I claim back unpaid overtime from previous years?', answer: 'Yes — up to 6 years. Depending on how many hours you\u0027ve worked over 38 per week and for how long, this could be a significant amount.' },
];

export default function ScenarioManagerOvertime({ rates }: { rates?: HospitalityRateData }) {
  const l4 = rates ? getLevel(rates, 4) : undefined;

  const l4FtRate = l4?.ftRate ?? 0;
  const ot15 = Math.round(l4FtRate * 1.5 * 100) / 100;
  const ot2 = Math.round(l4FtRate * 2 * 100) / 100;

  const ordinaryTotal = Math.round(38 * l4FtRate * 100) / 100;
  const ot15Total = Math.round(2 * ot15 * 100) / 100;
  const ot2Total = Math.round(10 * ot2 * 100) / 100;
  const weekTotal = Math.round((ordinaryTotal + ot15Total + ot2Total) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Probably not. There&apos;s a widespread belief that managers in hospitality aren&apos;t entitled to <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a>. It&apos;s frequently wrong. Managers covered by the Hospitality Award are entitled to overtime unless their salary genuinely and demonstrably exceeds all award obligations including overtime &mdash; in every week they work. Most hospitality manager salaries don&apos;t clear this bar during busy periods.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a hospitality manager working long weeks on a fixed salary &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), managers at Levels 4 and 5 are covered employees. Overtime applies after:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>More than 38 ordinary hours per week, or</li>
          <li>More than 10 hours in a single day</li>
        </ul>
        <p style={pStyle}>
          A salary arrangement is only legally sufficient if the salary is demonstrably higher than all award obligations across every week worked &mdash; including the overtime rate for every hour beyond the threshold.
        </p>
        <p style={pStyle}>If you regularly work 50-hour weeks, your salary needs to cover:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>38 hours at ordinary rate</li>
          <li>2 hours at 1.5&times; your ordinary rate</li>
          <li>10 hours at 2&times; your ordinary rate</li>
        </ul>
        <p style={pStyle}>
          For most hospitality manager salaries, that calculation doesn&apos;t stack up during busy periods.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The calculation test</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>Level 4 permanent rate:</strong> {formatCurrency(l4FtRate)}/hr.</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>In a 50-hour week, total entitlement:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>38 &times; {formatCurrency(l4FtRate)} = {formatCurrency(ordinaryTotal)}</li>
            <li>2 &times; {formatCurrency(ot15)} = {formatCurrency(ot15Total)}</li>
            <li>10 &times; {formatCurrency(ot2)} = {formatCurrency(ot2Total)}</li>
          </ul>
          <p style={{ ...smallStyle, fontWeight: 600 }}>Total: {formatCurrency(weekTotal)} for that week alone</p>
          <p style={smallStyle}>
            If your weekly salary is less than this during busy weeks, the salary doesn&apos;t cover overtime.
          </p>
        </div>
        <p style={pStyle}>
          <a href="/check-my-pay?award=MA000009" style={linkStyle}>Calculate your overtime shortfall &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A Level 4 permanent manager regularly working 50-hour weeks on a salary that covers only 38 hours is owed approximately $350&ndash;$450/week in overtime. Over 52 weeks: ~$18,000&ndash;$23,000/year. For many hospitality managers, this is the single largest source of underpayment &mdash; and the one least likely to be raised because &quot;managers don&apos;t get overtime&quot; is accepted as fact.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your salary demonstrably exceed all award obligations in your busiest weeks?</li>
          <li>Have you ever been shown a formal calculation proving your salary covers overtime?</li>
          <li>Do you regularly work 50+ hours without any additional payment?</li>
        </ul>
        <p style={pStyle}>
          If the answer to the first two is no and the third is yes, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Calculate your overtime shortfall &rarr;</a>
        </p>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check whether your salary covers what you&apos;re actually working.</p>
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
