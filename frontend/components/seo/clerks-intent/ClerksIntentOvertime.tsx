/**
 * High-intent: Clerks Award Overtime Rates
 * URL: /awards/clerks-award/overtime-clerks
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'I\'m salaried — does overtime still apply to me?', answer: 'Yes, unless your salary is high enough to cover all overtime at award rates. Your employer must be able to demonstrate that your annual salary, when divided by all hours actually worked (including overtime), meets or exceeds the award rate for each hour. If it doesn\'t, you\'re being underpaid.' },
  { question: 'My employer asks me to start early or stay late by 15 minutes — is that overtime?', answer: 'Yes. Any time worked beyond your ordinary hours counts as overtime. There is no minimum threshold. If you work 15 minutes extra every day, that\'s 1.25 hours of unpaid overtime per week — roughly $40 at time-and-a-half.' },
  { question: 'Can my employer require me to work overtime?', answer: 'An employer can request reasonable overtime. You can refuse if the overtime is unreasonable, considering factors like your personal circumstances, notice given, and the nature of your role. But any overtime you do work must be paid at the correct penalty rate.' },
];

export default function ClerksIntentOvertime({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Under the Clerks Award, overtime kicks in after 38 hours per week (or 7.6 hours per day for day workers). The first 3 hours of overtime are paid at time-and-a-half. After that, it&apos;s double time. Sunday overtime is double time from the first hour.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly stay back &quot;just half an hour&quot; and your pay never changes &mdash; that&apos;s unpaid overtime.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Overtime rates under the Clerks Award</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Monday to Saturday: first 3 hours at 1.5&times;, then 2&times;</li>
          <li style={{ marginBottom: '6px' }}>Sunday: 2&times; for all overtime hours</li>
          <li style={{ marginBottom: '6px' }}>Public holidays: 2.5&times; for all hours</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Level 3 clerk works 8.5 hours Monday to Thursday and 8 hours Friday &mdash; 42 hours total. Paid a flat salary based on 38 hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Missing overtime:</strong> 4 hours per week at time-and-a-half. At a Level 3 base rate of {l3 ? formatCurrency(l3.ftRate) : '~$28'}/hr, that&apos;s {l3 ? formatCurrency(l3.ftRate * 1.5) : '&mdash;'}/hr &times; 4 = {l3 ? formatCurrency(l3.ftRate * 1.5 * 4) : '&mdash;'}/week in unpaid overtime.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Annual underpayment: approximately {l3 ? formatCurrency(l3.ftRate * 1.5 * 4 * 52) : '&mdash;'} in overtime alone.
          </p>
          <p style={smallStyle}>
            This is one of the most common Clerks Award underpayments. It affects salaried workers who assume overtime is &quot;built in.&quot;
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>When overtime applies</h2>
        <p style={pStyle}>
          The trigger is simple: any work beyond 38 hours per week or 7.6 hours per day (for day workers). This includes being asked to start early, stay late, work through lunch, or answer emails after hours if directed by your employer.
        </p>
        <p style={pStyle}>
          Part-time employees hit overtime after their agreed hours, not 38. If your contract says 30 hours and you work 35, those 5 extra hours are overtime.
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
        <p style={pStyle}>Track your actual hours for a week. Then check what the award says you should have earned.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Clerks &mdash; Private Sector Award 2020 (MA000002), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
