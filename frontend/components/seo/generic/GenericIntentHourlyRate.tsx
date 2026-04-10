/**
 * Generic "Is My Hourly Rate Legal?" intent page — works for any award.
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

export default function GenericIntentHourlyRate({ rates, awardCode, awardName, awardSlug, examples }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  const faqData = [
    { question: `What determines my hourly rate under the ${awardName}?`, answer: `Three things: your classification level (based on your duties and experience), your employment type (full-time, part-time, or casual), and when you work (weekdays, weekends, public holidays, early mornings, late nights). Each combination has a specific minimum rate.` },
    { question: 'What if my employer pays above the award rate?', answer: 'If your employer pays above the minimum for all hours including penalties, overtime, and allowances, that is fine. The award sets the floor, not the ceiling. But make sure the higher rate genuinely covers everything — a rate that looks generous on weekdays can still be an underpayment when penalties apply.' },
    { question: 'How often do award rates change?', answer: 'Award rates are reviewed annually by the Fair Work Commission and typically increase on 1 July each year. If your pay has not increased since the last review, you may be below the current minimum.' },
    { question: 'Can I be paid different rates on different days?', answer: 'Yes — and you should be. The award sets different minimum rates for weekdays, Saturdays, Sundays, public holidays, and various time bands. If your rate is the same regardless of when you work, penalty rates are likely missing.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Your hourly rate under the {awardName} is not a single number. It depends on your classification level, whether you are full-time, part-time, or casual, and what day and time you work. If you have never checked your rate against the award, there is a good chance something is off.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Common roles covered: {examples}. If that sounds like your job &mdash; check the rates below.
        </p>
      </section>

      {/* Rate table */}
      {(l1 || l2) && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Minimum hourly rates at a glance</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Rate type</th>
                {l1 && <th style={thStyle}>Level 1</th>}
                {l2 && <th style={thStyle}>Level 2</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Full-time / Part-time (base)</td>
                {l1 && <td style={tdStyle}>{formatCurrency(l1.ftRate)}/hr</td>}
                {l2 && <td style={tdStyle}>{formatCurrency(l2.ftRate)}/hr</td>}
              </tr>
              <tr>
                <td style={tdStyle}>Casual (incl. 25% loading)</td>
                {l1 && <td style={tdStyle}>{formatCurrency(l1.casualRate)}/hr</td>}
                {l2 && <td style={tdStyle}>{formatCurrency(l2.casualRate)}/hr</td>}
              </tr>
              <tr>
                <td style={tdStyle}>Sunday &mdash; casual</td>
                {l1 && <td style={tdStyle}>{formatCurrency(l1.sundayCasual)}/hr</td>}
                {l2 && <td style={tdStyle}>{formatCurrency(l2.sundayCasual)}/hr</td>}
              </tr>
              <tr>
                <td style={tdStyle}>Public holiday &mdash; casual</td>
                {l1 && <td style={tdStyle}>{formatCurrency(l1.publicHolidayCasual)}/hr</td>}
                {l2 && <td style={tdStyle}>{formatCurrency(l2.publicHolidayCasual)}/hr</td>}
              </tr>
            </tbody>
          </table>
          <p style={smallStyle}>
            These are minimums. Your employer can pay more &mdash; but never less. See the full rate schedule at <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>{awardName} pay rates</a>.
          </p>
        </section>
      )}

      {/* What determines your rate */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What determines your rate</h2>

        <h3 style={h3Style}>1. Your classification level</h3>
        <p style={pStyle}>
          Your level is based on the duties you actually perform, not what your job title says. If your responsibilities have grown but your classification has not been reviewed, you may be on the wrong level &mdash; and the wrong rate.
          {l1 && l2 && <> The gap between Level 1 and Level 2 alone is {formatCurrency(l2.ftRate - l1.ftRate)}/hr.</>}
          {' '}See <a href={`/awards/${awardSlug}/classifications`} style={linkStyle}>{awardName} classifications</a>.
        </p>

        <h3 style={h3Style}>2. Your employment type</h3>
        <p style={pStyle}>
          Casuals receive a 25% loading on top of the base rate to compensate for no paid leave. If you are casual but not seeing a rate at least 25% above the full-time base, something is wrong.
          {l1 && <> Level 1 base is {formatCurrency(l1.ftRate)}/hr &mdash; casual must be at least {formatCurrency(l1.casualRate)}/hr.</>}
        </p>

        <h3 style={h3Style}>3. When you work</h3>
        <p style={pStyle}>
          Weekends and public holidays attract penalty rates that are significantly higher than weekday rates. If your payslip shows the same rate on a Tuesday as on a Sunday, penalties are not being applied.
        </p>
      </section>

      {/* Warning */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>If your rate is below the minimum</h2>
          <p style={pStyle}>
            You are owed the difference &mdash; for every hour you have been underpaid, going back up to 6 years. Even a shortfall of $1&ndash;2/hr adds up to thousands over time. The Fair Work Ombudsman can recover it at no cost to you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Not sure if your rate is right?</h2>
        <p style={pStyle}>
          Enter your details below and find out in under 2 minutes. You will see exactly what you should be earning &mdash; and whether there is a gap.
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
          Your rate is not a rough estimate &mdash; it is a legally defined minimum. If you are being paid less, that is underpayment. Check now.
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
