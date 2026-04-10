/**
 * Generic role page content — works for any job title under any award.
 * Rates pulled dynamically from AwardRateData by roleLevel.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
  roleTitle: string;
  roleLevel: number;
  roleDescription: string;
}

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif',
  fontSize: '1.15rem',
  fontWeight: 500,
  color: 'var(--secondary)',
  marginBottom: '10px',
  marginTop: '0',
};

const h3Style: React.CSSProperties = {
  fontSize: '14.5px',
  fontWeight: 600,
  color: 'var(--secondary)',
  marginBottom: '6px',
  marginTop: '0',
};

const pStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.7,
  marginBottom: '1rem',
};

const smallStyle: React.CSSProperties = {
  fontSize: '12.5px',
  color: 'var(--secondary-muted)',
  lineHeight: 1.6,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2.5rem',
};

const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)',
  border: '1.5px solid var(--accent)',
  borderRadius: '10px',
  padding: '16px 20px',
  marginBottom: '1.5rem',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--primary)',
  textDecoration: 'underline',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13.5px',
};

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  color: 'var(--secondary)',
  fontWeight: 600,
  textAlign: 'left' as const,
  borderBottom: '2px solid var(--border)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--border)',
  color: 'var(--secondary-muted)',
};

export default function GenericRoleContent({
  rates,
  awardCode,
  awardName,
  awardSlug,
  roleTitle,
  roleLevel,
  roleDescription,
}: Props) {
  const level = rates ? getLevel(rates, roleLevel) : undefined;
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';

  const faqData = [
    {
      question: `What level is a ${roleTitle} under the ${awardName}?`,
      answer: `A ${roleTitle} is typically classified at Level ${roleLevel} under the ${awardName} (${awardCode}). Your actual level depends on your duties, qualifications, and experience. If you are performing work above your classified level, your employer must pay you at the higher rate.`,
    },
    {
      question: `Do ${roleTitle.toLowerCase()}s get penalty rates?`,
      answer: `Yes. Under the ${awardName}, penalty rates apply for work on Saturdays, Sundays, and public holidays regardless of your role or classification. If you are being paid the same rate every day, you are being underpaid.`,
    },
    {
      question: `How do I check if my ${roleTitle.toLowerCase()} pay is correct?`,
      answer: `Compare your payslip against the award rates for your classification level. Your pay should show separate lines for ordinary hours, penalty rates, overtime, and any applicable allowances. Use our pay calculator to enter your actual shifts and see exactly what you should have been paid.`,
    },
  ];

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          {roleDescription}
        </p>
        <p style={pStyle}>
          Under the {awardName}, a {roleTitle} is typically classified at <strong>Level {roleLevel}</strong>.
          {level ? ` The current minimum full-time rate is ${formatCurrency(level.ftRate)}/hr and the casual rate is ${formatCurrency(level.casualRate)}/hr.` : ''}
          {' '}If your pay does not match these minimums, you are being underpaid.
        </p>
      </section>

      {/* Rate table */}
      {level && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>{roleTitle} pay rates &mdash; {awardName}</h2>
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Rate type</th>
                  <th style={thStyle}>Hourly rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Full-time / part-time</td>
                  <td style={tdStyle}>{formatCurrency(level.ftRate)}/hr</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Casual (incl. 25% loading)</td>
                  <td style={tdStyle}>{formatCurrency(level.casualRate)}/hr</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Saturday (full-time)</td>
                  <td style={tdStyle}>{formatCurrency(level.saturdayFt)}/hr</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Saturday (casual)</td>
                  <td style={tdStyle}>{formatCurrency(level.saturdayCasual)}/hr</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Sunday (full-time)</td>
                  <td style={tdStyle}>{formatCurrency(level.sundayFt)}/hr</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Sunday (casual)</td>
                  <td style={tdStyle}>{formatCurrency(level.sundayCasual)}/hr</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Public holiday (full-time)</td>
                  <td style={tdStyle}>{formatCurrency(level.publicHolidayFt)}/hr</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>Public holiday (casual)</td>
                  <td style={tdStyle}>{formatCurrency(level.publicHolidayCasual)}/hr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={smallStyle}>
            Level {roleLevel} rates from the Fair Work Commission pay guide for {awardCode}, effective {effectiveDate}.
          </p>
        </section>
      )}

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments for {roleTitle.toLowerCase()}s</h2>

          <h3 style={h3Style}>Flat rate regardless of day</h3>
          <p style={pStyle}>
            The most common problem. If your hourly rate does not change on Saturdays, Sundays, or public holidays, your employer is not applying penalty rates. Penalty rates are a legal minimum &mdash; they are not optional.
          </p>

          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={pStyle}>
            Your classification must reflect your actual duties and qualifications &mdash; not what your employer decides to call you. If you are performing Level {roleLevel} work but being paid at a lower level, that is an underpayment.
          </p>

          <h3 style={h3Style}>No overtime after long shifts</h3>
          <p style={pStyle}>
            If you regularly work more than 7.6 hours in a day or 38 hours in a week without overtime pay, your employer is likely breaching the award. Overtime rates are 1.5x and 2x &mdash; significantly more than ordinary time.
          </p>

          <h3 style={h3Style}>Missing allowances</h3>
          <p style={pStyle}>
            Depending on your work conditions, you may be entitled to meal allowances, uniform allowances, tool allowances, or other payments. These are often missed entirely.
          </p>
        </div>
      </section>

      {/* Classification check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Are you correctly classified?</h2>
        <p style={pStyle}>
          Your employer must classify you based on the work you actually do. A {roleTitle} performing Level {roleLevel} duties must be paid at least the Level {roleLevel} rate. If your duties have expanded, you have completed training, or you have taken on supervisory responsibilities, your classification &mdash; and your pay &mdash; should have increased.
        </p>
        <p style={pStyle}>
          If you are unsure about your classification, check the{' '}
          <a href={`/awards/${awardSlug}/classifications`} style={linkStyle}>{awardName} classifications guide</a>{' '}
          for a full breakdown of each level and what duties it covers.
        </p>
      </section>

      {/* CTA */}
      <CheckPayCTA awardCode={awardCode} awardName={awardName} />

      {/* Related pages */}
      <section style={{ ...sectionStyle, marginTop: '2rem' }}>
        <h2 style={h2Style}>Related guides</h2>
        <p style={pStyle}>
          <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>{awardName} pay rates</a> &middot;{' '}
          <a href={`/awards/${awardSlug}/penalty-rates`} style={linkStyle}>Penalty rates</a> &middot;{' '}
          <a href={`/awards/${awardSlug}/classifications`} style={linkStyle}>Classifications</a> &middot;{' '}
          <a href={`/awards/${awardSlug}`} style={linkStyle}>{awardName} overview</a>
        </p>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <h3 style={h3Style}>{faq.question}</h3>
            <p style={{ ...pStyle, marginBottom: 0 }}>{faq.answer}</p>
          </div>
        ))}
      </section>

      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map(q => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          }),
        }}
      />

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for {awardCode}, effective {effectiveDate}. General information only &mdash; not legal advice. Verify rates at{' '}
        <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={linkStyle}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
