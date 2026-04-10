/**
 * Cleaning Award — Janitor role page
 * Janitor Pay Rates Australia 2025–26
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
  { question: 'Is a janitor the same as a cleaner under the award?', answer: 'For pay purposes, yes. The Cleaning Services Award doesn\'t use the term "janitor" but the work falls squarely within its coverage. Most janitors perform a mix of Level 1 (general cleaning) and Level 2 (specialised equipment) duties. If you operate floor polishers, use industrial cleaning machines, or handle minor maintenance alongside cleaning, you\'re likely Level 2.' },
  { question: 'I do maintenance work as well as cleaning — does that change my pay?', answer: 'If your primary role is cleaning and you do minor maintenance (changing light globes, basic repairs), you\'re still covered by the Cleaning Services Award at Level 2 minimum. If maintenance is a significant part of your role, you may be covered by a different award with higher rates. Either way, you should not be paid less than the cleaning award minimum.' },
  { question: 'Do janitors working in schools get different rates?', answer: 'Janitors in government schools may be covered by state public sector agreements which often have higher rates than the Cleaning Services Award. Janitors in private schools are typically covered by the Cleaning Services Award or an enterprise agreement. Check which instrument covers your workplace — if it\'s the award, the minimum rates apply.' },
];

export default function CleaningJanitorContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Janitors in Australia are covered by the Cleaning Services Award. The award doesn&apos;t use the word &quot;janitor,&quot; but the work is the same &mdash; cleaning, tidying, minor maintenance, and upkeep of buildings. Most janitors perform duties that span Level 1 (general cleaning) and Level 2 (specialised equipment), which means many are being paid at the wrong level.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you use floor polishers, industrial vacuums, or other specialised equipment as part of your janitor role, you should be classified at Level 2 minimum.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Janitor classification</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '8px' }}><strong>Level 1 (~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr):</strong> General janitorial duties &mdash; sweeping, mopping, emptying bins, cleaning bathrooms, stocking supplies, basic tidying</li>
            <li style={{ marginBottom: '8px' }}><strong>Level 2 (~{l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr):</strong> Operating specialised equipment (floor polishers, ride-on sweepers, carpet extractors), window cleaning, minor maintenance tasks alongside cleaning duties</li>
            <li style={{ marginBottom: '8px' }}><strong>Level 3 (~{l3 ? formatCurrency(l3.ftRate) : '&mdash;'}/hr):</strong> Head janitor or building supervisor overseeing other cleaning staff</li>
          </ul>
        </div>
        <p style={pStyle}>
          Many janitors are hired as Level 1 but perform Level 2 work daily. If your duties include operating any powered cleaning equipment, you should be classified &mdash; and paid &mdash; at Level 2.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayment patterns for janitors</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Wrong classification:</strong> Level 1 pay for Level 2 duties &mdash; $0.80/hr gap, ~$1,580/year for full-time</li>
          <li style={{ marginBottom: '6px' }}><strong>Unpaid overtime:</strong> Janitors who stay to finish a building or come in early get no overtime pay</li>
          <li style={{ marginBottom: '6px' }}><strong>Flat weekly pay:</strong> Same pay regardless of hours, no overtime or penalty recognition</li>
          <li style={{ marginBottom: '6px' }}><strong>No rate increase:</strong> Award rates go up every July &mdash; many janitors stay on the same rate for years</li>
          <li style={{ marginBottom: '6px' }}><strong>Weekend work at base rate:</strong> Janitors who work Saturdays or Sundays without penalty rates</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What your pay should look like</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Example:</strong> Full-time janitor, Level 2, works Monday to Friday 6am&ndash;2:30pm (38 hours/week), plus one Saturday morning per month (4 hours).
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '4px' }}>Weekday base: 38 &times; {l2 ? formatCurrency(l2.ftRate) : '&mdash;'} = <strong>{l2 ? formatCurrency(l2.ftRate * 38) : '&mdash;'}/week</strong></li>
            <li style={{ marginBottom: '4px' }}>Saturday shift (1.5&times;): 4 &times; {l2 ? formatCurrency(l2.saturdayFt) : '&mdash;'} = <strong>{l2 ? formatCurrency(l2.saturdayFt * 4) : '&mdash;'}</strong></li>
            <li style={{ marginBottom: '4px' }}>Super (12%): paid into your fund on top of wages</li>
          </ul>
        </div>
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
        <p style={pStyle}>Check your rate against the award minimum. It takes 2 minutes.</p>
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
