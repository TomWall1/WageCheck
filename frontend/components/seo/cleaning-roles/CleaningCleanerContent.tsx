/**
 * Cleaning Award — Cleaner role page
 * Cleaner Pay Rates Australia 2025–26
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
  { question: 'What is the minimum pay for a cleaner in Australia?', answer: 'The minimum hourly rate for an adult cleaner under the Cleaning Services Award is set by the Fair Work Commission and updated each July. Full-time/part-time cleaners receive the Level 1 base rate, while casuals receive an additional 25% loading on top. If you earn less than the current minimum, you are being underpaid.' },
  { question: 'Am I Level 1 or Level 2 as a cleaner?', answer: 'Level 1 covers general cleaning duties: vacuuming, mopping, dusting, emptying bins, bathroom cleaning, and general tidying. Level 2 applies when you operate specialised cleaning equipment like industrial floor polishers, high-pressure washers, carpet extraction machines, or perform window cleaning above ground level. If you use any specialised equipment regularly, you should be Level 2.' },
  { question: 'Why are cleaners so often underpaid?', answer: 'The cleaning industry has structural features that enable underpayment: work happens after hours when no one is watching, subcontracting chains obscure the real employer, many workers are migrants or international students who don\'t know their rights, and cash-in-hand arrangements leave no paper trail. The Fair Work Ombudsman has identified cleaning as a priority industry for enforcement.' },
];

export default function CleaningCleanerContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cleaners are among the most underpaid workers in Australia. The Fair Work Ombudsman recovers millions in stolen wages from the cleaning industry every year, and those are just the cases that get reported. If you clean offices, schools, hospitals, shopping centres, or any commercial building, the Cleaning Services Award sets your legal minimum pay. Your employer cannot pay less, regardless of what your contract says.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a cleaner earning less than {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr (permanent) or {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr (casual), you are being underpaid right now.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Cleaner classification levels</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '8px' }}><strong>Level 1 (~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr):</strong> General cleaning &mdash; vacuuming, mopping, dusting, emptying bins, bathroom cleaning, wiping surfaces, general tidying. This is where most cleaners start.</li>
            <li style={{ marginBottom: '8px' }}><strong>Level 2 (~{l2 ? formatCurrency(l2.ftRate) : '&mdash;'}/hr):</strong> Operates specialised cleaning equipment &mdash; industrial floor polishers, carpet extraction machines, high-pressure washers, window cleaning above ground level. Also includes cleaners with trade certificates.</li>
          </ul>
        </div>
        <p style={pStyle}>
          Most cleaners are Level 1. If your employer has you operating specialised equipment and still paying Level 1 rates, you should be Level 2.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common underpayment patterns</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Cash in hand at $18&ndash;$22/hr:</strong> Below the Level 1 minimum, no super, no payslip &mdash; the most common pattern</li>
          <li style={{ marginBottom: '6px' }}><strong>Flat rate per building:</strong> Paid per job instead of per hour, resulting in effective rates well below minimum</li>
          <li style={{ marginBottom: '6px' }}><strong>No weekend penalties:</strong> Same rate on Saturday and Sunday as on Tuesday &mdash; missing 50&ndash;100% of penalty pay</li>
          <li style={{ marginBottom: '6px' }}><strong>Sham contracting:</strong> Called a &quot;contractor&quot; but works set hours at set locations with employer&apos;s equipment</li>
          <li style={{ marginBottom: '6px' }}><strong>No super:</strong> Employer pockets the 12% that should go to your retirement fund</li>
          <li style={{ marginBottom: '6px' }}><strong>Rate not updated:</strong> Award rates increase every July &mdash; many cleaners stay on old rates for years</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What your pay should look like</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Example:</strong> Full-time Level 1 cleaner, Monday to Friday, 38 hours/week.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '4px' }}>Base weekly pay: 38 &times; {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} = <strong>{l1 ? formatCurrency(l1.ftRate * 38) : '&mdash;'}</strong></li>
            <li style={{ marginBottom: '4px' }}>Super (12%): <strong>{l1 ? formatCurrency(l1.ftRate * 38 * 0.12) : '&mdash;'}/week</strong> paid into your fund</li>
            <li style={{ marginBottom: '4px' }}>If any hours fall on Saturday: those hours at <strong>{l1 ? formatCurrency(l1.saturdayFt) : '&mdash;'}/hr</strong> (1.5&times;)</li>
            <li style={{ marginBottom: '4px' }}>If any hours fall on Sunday: those hours at <strong>{l1 ? formatCurrency(l1.sundayFt) : '&mdash;'}/hr</strong> (2&times;)</li>
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
        <p style={pStyle}>You work hard. Make sure you&apos;re getting paid what the law says you&apos;re owed.</p>
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
