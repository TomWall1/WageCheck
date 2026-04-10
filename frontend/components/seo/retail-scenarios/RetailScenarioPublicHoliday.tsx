/**
 * Scenario: Public Holiday Pay in Retail — /awards/retail-award/scenarios/public-holiday
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
  { question: 'Which public holidays apply under the Retail Award?', answer: 'All 8 national public holidays apply: New Year\'s Day, Australia Day, Good Friday, Easter Saturday, Easter Monday, Anzac Day, Queen\'s Birthday, and Christmas Day plus Boxing Day. State and territory public holidays also apply. Each attracts the public holiday penalty rate.' },
  { question: 'I\'m part-time and the public holiday isn\'t on my normal day — do I get anything?', answer: 'If the public holiday falls on a day you would not normally work, you have no entitlement to pay for that day. However, if it falls on a day you would normally work and you don\'t work, you are entitled to be paid your ordinary rate for the hours you would normally have worked.' },
  { question: 'Can I refuse to work on a public holiday in retail?', answer: 'You can refuse a request to work on a public holiday if the refusal is reasonable. Factors include your personal circumstances, the notice given, your role, and whether you will be adequately compensated. Retail stores often roster staff on public holidays, but refusal rights still apply.' },
];

export default function RetailScenarioPublicHoliday({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 22.61;
  const casualRate = l1?.casualRate ?? 28.26;
  const phCasualRate = l1?.publicHolidayCasual ?? Math.round(baseRate * 2.75 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Public holiday pay under the <a href="/awards/retail-award/" style={linkStyle}>Retail Award</a> is 250% of the ordinary rate for permanent employees and 275% for casuals. If you worked a public holiday and were paid your normal rate, you are owed the difference. Minimum engagement is 3 hours.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A single 5-hour public holiday shift at the wrong rate can cost you $150 or more.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the General Retail Industry Award (MA000004), public holiday rates are:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Permanent (full-time/part-time):</strong> 250% of ordinary hourly rate</li>
          <li><strong>Casual:</strong> 275% of ordinary base rate</li>
          <li><strong>Minimum engagement:</strong> 3 hours for all employees</li>
          <li><strong>Not working:</strong> Permanent employees paid ordinary rate for their normal hours</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What you should be paid</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Level 1 casual, 5-hour public holiday shift:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary base rate: ~{formatCurrency(baseRate)}/hr</li>
            <li>Public holiday casual rate (275%): ~{formatCurrency(phCasualRate)}/hr</li>
            <li>5-hour shift: ~{formatCurrency(phCasualRate * 5)}</li>
          </ul>
          <p style={smallStyle}>
            If paid at the standard casual rate (~{formatCurrency(casualRate)}/hr), you&apos;d receive ~{formatCurrency(casualRate * 5)} &mdash; a shortfall of ~{formatCurrency(phCasualRate * 5 - casualRate * 5)}.
          </p>
        </div>
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
        <p style={pStyle}>Check your public holiday pay is correct.</p>
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
