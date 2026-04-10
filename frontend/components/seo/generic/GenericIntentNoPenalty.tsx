/**
 * Generic "Not Getting Penalty Rates?" intent page — works for any award.
 * Uses award metadata + API rates to generate award-specific content.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', marginBottom: '1.5rem' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '8px 10px', borderBottom: '2px solid var(--border)', color: 'var(--secondary)', fontWeight: 600, fontSize: '12.5px' };
const tdStyle: React.CSSProperties = { padding: '8px 10px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
  examples: string;
}

export default function GenericIntentNoPenalty({ rates, awardCode, awardName, awardSlug, examples }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  // Calculate annual cost of missing Sunday penalties for a casual working one 6hr Sunday shift/week
  const sundayGap = l1 ? (l1.sundayCasual - l1.casualRate) * 6 : undefined;
  const sundayAnnual = sundayGap ? sundayGap * 48 : undefined;

  const faqData = [
    { question: `Are penalty rates mandatory under the ${awardName}?`, answer: `Yes. Penalty rates are set by the Fair Work Commission and are legally binding minimum rates. Your employer cannot opt out of them, reduce them, or absorb them into a base rate without meeting strict legal tests.` },
    { question: 'Does casual loading replace penalty rates?', answer: 'No. The 25% casual loading compensates for lack of paid leave — it has nothing to do with weekend or public holiday penalties. Casual workers receive their loading on top of penalty rates, not instead of them.' },
    { question: 'What if my employer says we have an agreement that excludes penalties?', answer: 'Enterprise agreements can modify penalty rates, but only if the agreement passes the "better off overall" test (BOOT). If no formal enterprise agreement exists, the award rates apply in full. An informal verbal or written "agreement" to waive penalties is not legally valid.' },
    { question: 'How do I prove I worked weekends if my employer disputes it?', answer: 'Rosters, time sheets, text messages about shifts, bank deposit records showing pay dates, and even personal notes count as evidence. The Fair Work Ombudsman can also compel employers to produce records. If the employer has failed to keep proper records, the burden of proof shifts to them.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work weekends or public holidays under the {awardName} and your pay looks the same as a weekday, your penalty rates are not being paid. This is not a grey area. Penalty rates are legally required &mdash; and missing them is one of the most expensive forms of underpayment.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Common roles covered: {examples}. If you work weekends in any of these roles &mdash; check your payslip now.
        </p>
      </section>

      {/* Rate comparison table */}
      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>What you should be earning &mdash; Level 1</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Shift type</th>
                <th style={thStyle}>Full-time / Part-time</th>
                <th style={thStyle}>Casual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Weekday (ordinary hours)</td>
                <td style={tdStyle}>{formatCurrency(l1.ftRate)}/hr</td>
                <td style={tdStyle}>{formatCurrency(l1.casualRate)}/hr</td>
              </tr>
              <tr>
                <td style={tdStyle}>Saturday</td>
                <td style={tdStyle}>{formatCurrency(l1.saturdayFt)}/hr</td>
                <td style={tdStyle}>{formatCurrency(l1.saturdayCasual)}/hr</td>
              </tr>
              <tr>
                <td style={tdStyle}>Sunday</td>
                <td style={tdStyle}>{formatCurrency(l1.sundayFt)}/hr</td>
                <td style={tdStyle}>{formatCurrency(l1.sundayCasual)}/hr</td>
              </tr>
              <tr>
                <td style={tdStyle}>Public holiday</td>
                <td style={tdStyle}>{formatCurrency(l1.publicHolidayFt)}/hr</td>
                <td style={tdStyle}>{formatCurrency(l1.publicHolidayCasual)}/hr</td>
              </tr>
            </tbody>
          </table>
          <p style={smallStyle}>
            If your payslip shows {formatCurrency(l1.casualRate)}/hr for a Sunday shift instead of {formatCurrency(l1.sundayCasual)}/hr, you are being underpaid by {formatCurrency(l1.sundayCasual - l1.casualRate)}/hr on that shift. See the full breakdown at <a href={`/awards/${awardSlug}/penalty-rates`} style={linkStyle}>{awardName} penalty rates</a>.
          </p>
        </section>
      )}

      {/* Casual loading myth */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&ldquo;Your casual loading covers it&rdquo; &mdash; it does not</h2>
          <p style={pStyle}>
            This is the single most common excuse for not paying penalty rates to casuals. The 25% casual loading exists to compensate for no paid leave, no sick leave, and no guaranteed hours. It has <strong>nothing to do with penalties</strong>.
          </p>
          <p style={pStyle}>
            Casual workers are entitled to penalty rates <strong>on top of</strong> their casual-loaded rate. A casual working Sunday gets the Sunday casual rate &mdash; not the ordinary casual rate.
            {l1 && <> That means {formatCurrency(l1.sundayCasual)}/hr, not {formatCurrency(l1.casualRate)}/hr.</>}
          </p>
        </div>
      </section>

      {/* What it costs you */}
      {l1 && sundayGap && sundayAnnual && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>What missing penalties cost you</h2>
          <p style={pStyle}>
            Take a casual Level 1 worker who does one 6-hour Sunday shift per week. If they are paid the ordinary casual rate ({formatCurrency(l1.casualRate)}/hr) instead of the Sunday casual rate ({formatCurrency(l1.sundayCasual)}/hr), the shortfall is:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li style={{ marginBottom: '4px' }}><strong>Per shift:</strong> {formatCurrency(sundayGap)}</li>
            <li style={{ marginBottom: '4px' }}><strong>Per year:</strong> {formatCurrency(sundayAnnual)}</li>
            <li style={{ marginBottom: '4px' }}><strong>Over 6 years (recovery limit):</strong> {formatCurrency(sundayAnnual * 6)}</li>
          </ul>
          <p style={pStyle}>
            And that is just Sundays. Add in missed Saturday penalties and public holiday rates, and the total grows fast.
          </p>
        </section>
      )}

      {/* Common signs */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Signs your penalties are missing</h2>
        <h3 style={h3Style}>Every shift pays the same rate</h3>
        <p style={pStyle}>
          Look at your payslip. If Tuesday, Saturday, and Sunday all show the same hourly rate, penalty rates are not being applied. Different days must show different rates under the {awardName}.
        </p>
        <h3 style={h3Style}>No separate penalty line items</h3>
        <p style={pStyle}>
          Some payroll systems show a base rate plus a penalty component. If you see only a single rate with no penalty breakdown, ask your employer how penalties are being calculated.
        </p>
        <h3 style={h3Style}>You are told &ldquo;it is all included&rdquo;</h3>
        <p style={pStyle}>
          If your employer cannot show you exactly how your rate covers every penalty obligation for every hour type, it probably does not.
        </p>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Check your penalty rates now</h2>
        <p style={pStyle}>
          Enter your details and typical roster below. You will see what every shift should pay under the {awardName} &mdash; and whether your actual pay matches.
        </p>
        <CheckPayCTA awardCode={awardCode} awardName={awardName} />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Penalty rates are not optional. They are not negotiable. And they are not covered by casual loading. If you work weekends or public holidays and your pay does not reflect that &mdash; you are owed money.
        </p>
        <CheckPayCTA awardCode={awardCode} awardName={awardName} />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the {awardName} ({awardCode}), effective {rates?.effectiveDate || '1 July 2025'}. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
