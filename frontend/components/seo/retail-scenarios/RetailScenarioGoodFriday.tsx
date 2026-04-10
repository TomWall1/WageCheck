/**
 * Scenario: Good Friday Work in Retail — /awards/retail-award/scenarios/good-friday
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
  { question: 'Is Good Friday a public holiday in every state?', answer: 'Yes. Good Friday is a national public holiday recognised in all Australian states and territories. The public holiday penalty rate under the Retail Award applies everywhere.' },
  { question: 'What about Easter Saturday and Easter Monday?', answer: 'Easter Saturday and Easter Monday are also public holidays in most states and territories. The same public holiday penalty rate applies on these days. Check your specific state for variations.' },
  { question: 'My shop was closed on Good Friday but I normally work Fridays. Do I get paid?', answer: 'Yes. Full-time and part-time employees who normally work on a day that falls on a public holiday are entitled to be paid their ordinary hours even if the business is closed. Casuals are only paid if they actually work.' },
];

export default function RetailScenarioGoodFriday({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 22.61;
  const casualRate = l1?.casualRate ?? 28.26;
  const phCasualRate = l1?.publicHolidayCasual ?? Math.round(baseRate * 2.5 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Good Friday is a national public holiday. Under the Retail Award, every hour worked attracts 225% for permanent employees or 250% for casuals. Many retail workers are rostered on Good Friday without receiving the correct penalty rate &mdash; especially in large shopping centres where trading restrictions have been relaxed.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you worked Good Friday and your pay looks the same as a normal Friday, you are owed the difference.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the <a href="/awards/retail-award/penalty-rates" style={linkStyle}>General Retail Industry Award</a> (MA000004), Good Friday attracts the full public holiday penalty rate. Full-time and part-time employees receive 225% of their ordinary base rate. Casuals receive 250% of the ordinary base rate.
        </p>
        <p style={pStyle}>
          Permanent employees who are not required to work on Good Friday are entitled to be paid their ordinary hours for the day. They cannot be forced to take annual leave instead.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What this looks like in practice</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Level 1 casual retail worker, 6-hour Good Friday shift:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary base rate: ~{formatCurrency(baseRate)}/hr</li>
            <li>Good Friday rate (250%): ~{formatCurrency(phCasualRate)}/hr</li>
            <li>Correct pay: ~{formatCurrency(phCasualRate * 6)} for 6 hours</li>
            <li>If paid weekday casual rate (~{formatCurrency(casualRate)}/hr): ~{formatCurrency(casualRate * 6)}</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Shortfall: ~{formatCurrency(phCasualRate * 6 - casualRate * 6)} on a single 6-hour shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Easter weekend rates</h2>
        <p style={pStyle}>
          The Easter long weekend typically includes multiple public holidays. Each day has its own rate:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Good Friday:</strong> Public holiday rate (225% / 250%)</li>
          <li><strong>Easter Saturday:</strong> Public holiday rate in most states</li>
          <li><strong>Easter Sunday:</strong> Sunday penalty rate (200%) or public holiday rate where declared</li>
          <li><strong>Easter Monday:</strong> Public holiday rate (225% / 250%)</li>
        </ul>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
        <p style={pStyle}>Check your Easter pay matches the award &mdash; it takes 2 minutes.</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
