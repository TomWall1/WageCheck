/**
 * Scenario: Worked Australia Day in Fast Food — Is It Double Time?
 * /awards/fast-food-award/scenarios/australia-day
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
  { question: 'Is Australia Day double time in fast food?', answer: 'No — it\'s actually higher than double time. Full-time and part-time workers receive 250% (double time and a half) under the Fast Food Industry Award. Casuals get 275%. If someone told you it\'s "just double time," they\'re underpaying you.' },
  { question: 'Can my boss force me to work on Australia Day?', answer: 'Your employer can request you to work on Australia Day, but you can refuse if the request is unreasonable or your refusal is reasonable. Factors include your role, personal circumstances, how much notice you were given, and whether you\'ll receive the penalty rate.' },
  { question: 'What if Australia Day falls on my normal day off?', answer: 'If Australia Day falls on a day you don\'t normally work, you have no entitlement to pay for that day. However, if a substitute public holiday is declared (e.g. the Monday when 26 January falls on a weekend), the penalty rate applies to the substitute day instead.' },
];

export default function FFScenarioAustraliaDay({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const phRate = Math.round(baseRate * 2.5 * 100) / 100;
  const phCasual = Math.round(baseRate * 2.75 * 100) / 100;
  const shift5 = Math.round(phRate * 5 * 100) / 100;
  const ordShift5 = Math.round(baseRate * 5 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Australia Day pays 250% of your ordinary rate if you&apos;re full-time or part-time, and 275% if you&apos;re casual — that&apos;s more than double time. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, your employer cannot round it down to 200% and call it &quot;double time.&quot;
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Australia Day (26 January) is a national public holiday under the Fair Work Act. The Fast Food Industry Award (MA000003) sets the penalty at 250% of the ordinary hourly rate for permanent employees and 275% for casuals. This applies to every hour worked on the public holiday. If a substitute day is declared because the 26th falls on a weekend, the substitute day attracts the same penalty.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1, 5-hour Australia Day shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary hourly rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Australia Day full-time rate (250%): ${phRate.toFixed(2)}/hr</li>
            <li>Australia Day casual rate (275%): ${phCasual.toFixed(2)}/hr</li>
            <li>5-hour full-time shift: ${shift5.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At the ordinary rate you&apos;d receive ${ordShift5.toFixed(2)} &mdash; a shortfall of ${(shift5 - ordShift5).toFixed(2)} for one shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is Australia Day listed as a public holiday with a separate penalty rate line?</li>
          <li>Does the hourly rate match 250% (permanent) or 275% (casual) — not 200%?</li>
          <li>If you didn&apos;t work but it&apos;s your normal rostered day, is it shown as a paid absence?</li>
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
