/**
 * Generic award hub page content — works for ANY award.
 * Rates pulled dynamically from the API via AwardRateData.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardFullName: string;
  awardSlug: string;
  description: string;
  examples: string;
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
  fontWeight: 700,
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
  fontWeight: 700,
  textAlign: 'left' as const,
  borderBottom: '2px solid var(--border)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--border)',
  color: 'var(--secondary-muted)',
};

export default function GenericHubContent({
  rates,
  awardCode,
  awardName,
  awardFullName,
  awardSlug,
  description,
  examples,
}: Props) {
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';

  const faqData = [
    {
      question: `What is the ${awardName}?`,
      answer: `The ${awardFullName} (${awardCode}) is a modern award that sets the minimum pay rates, conditions, and entitlements for workers covered by this industry. It is legally enforceable — your employer cannot pay you less than the rates in this award.`,
    },
    {
      question: 'How do I know if this award covers me?',
      answer: `Your award is determined by the industry you work in and the type of work you do — not your job title. ${description} If you are unsure, the Fair Work Ombudsman has a free Find My Award tool, or you can check your employment contract and payslip for the award code (${awardCode}).`,
    },
    {
      question: 'What are the current pay rates?',
      answer: `Pay rates under the ${awardName} depend on your classification level and employment type. Rates are updated annually by the Fair Work Commission, usually effective 1 July each year. The current rates are effective ${effectiveDate}. See the classification table on this page for the minimum hourly rates.`,
    },
    {
      question: 'Do I get penalty rates on weekends?',
      answer: 'Yes. Most awards require your employer to pay penalty rates for work on Saturdays, Sundays, and public holidays. The exact multiplier depends on your award and employment type. If you are being paid the same rate every day, your pay is almost certainly wrong.',
    },
    {
      question: 'What is casual loading?',
      answer: 'Casual loading is an additional 25% paid on top of the base hourly rate to compensate casual employees for not receiving paid leave entitlements (annual leave, personal leave, etc.). Casual loading does not replace penalty rates — both apply. A casual working on a Sunday receives their base rate plus 25% loading plus the Sunday penalty rate.',
    },
    {
      question: 'When does overtime apply?',
      answer: 'Overtime generally applies when you work beyond your ordinary hours — typically after 7.6 hours in a day or 38 hours in a week for full-time employees. Overtime rates are usually 1.5x for the first 2-3 hours and 2x after that, though the exact thresholds vary by award. If you regularly work long shifts and your pay does not increase, you should check your overtime entitlements.',
    },
    {
      question: 'What allowances am I entitled to?',
      answer: `Allowances vary by award but can include tool allowances, meal allowances, uniform allowances, travel allowances, and more. Under the ${awardName}, allowances are set out in the award document and your employer must pay any that apply to your situation. Check the allowances page for this award for specific amounts.`,
    },
    {
      question: 'What if I think I\'m being underpaid?',
      answer: 'Start by checking your pay against the award rates. Use our pay calculator to enter your shifts and see exactly what you should have been paid. If there is a shortfall, you can raise it with your employer, contact the Fair Work Ombudsman (13 13 94), or seek advice from a union or lawyer. You can claim underpayments going back up to 6 years.',
    },
  ];

  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>

      {/* Trigger moment */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>
            If your pay is the same regardless of the day or time you work, you may be missing penalty rates, overtime, or allowances.
          </p>
          <p style={{ ...smallStyle, margin: 0 }}>
            Under the {awardName}, your rate should change based on when you work. Same pay on a Sunday as a Monday is a red flag.
          </p>
        </div>
      </section>

      {/* Who it covers */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who the {awardName} covers</h2>
        <p style={pStyle}>{description}</p>
        <p style={pStyle}>
          <strong>Examples:</strong> {examples}
        </p>
        <p style={smallStyle}>
          Your award is determined by the industry you work in and the duties you perform &mdash; not your job title. If you are unsure, check your payslip for the award code ({awardCode}) or use the Fair Work Ombudsman&apos;s Find My Award tool.
        </p>
      </section>

      {/* Key entitlements */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Key entitlements under the {awardName}</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Minimum hourly rates</strong> based on your classification level</li>
          <li><strong>Casual loading:</strong> 25% on top of the base rate for casual employees</li>
          <li><strong>Saturday penalty rates</strong> &mdash; higher rate for Saturday work</li>
          <li><strong>Sunday penalty rates</strong> &mdash; higher again for Sunday work</li>
          <li><strong>Public holiday rates</strong> &mdash; the highest penalty rate, typically 2x or more</li>
          <li><strong>Overtime rates</strong> &mdash; 1.5x and 2x for hours beyond ordinary hours</li>
          <li><strong>Allowances</strong> &mdash; meal, uniform, tool, travel, and other allowances where applicable</li>
          <li><strong>Superannuation</strong> &mdash; 12% on top of your ordinary time earnings</li>
          <li><strong>Leave entitlements</strong> &mdash; annual leave, personal/carer&apos;s leave, compassionate leave (permanent employees)</li>
        </ul>
      </section>

      {/* Classification table */}
      {rates && rates.levels.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>{awardName} pay rates &mdash; classification levels</h2>
          <p style={pStyle}>
            Your pay rate depends on your classification level. The table below shows the minimum hourly rates for each level effective {effectiveDate}.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Classification</th>
                  <th style={thStyle}>Full-time rate</th>
                  <th style={thStyle}>Casual rate</th>
                </tr>
              </thead>
              <tbody>
                {rates.levels.map((l, i) => (
                  <tr key={i}>
                    <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>
                      {l.title || `Level ${l.level}`}
                      {l.stream && l.stream !== 'general' ? ` (${l.stream})` : ''}
                    </td>
                    <td style={tdStyle}>{formatCurrency(l.ftRate)}/hr</td>
                    <td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={smallStyle}>
            Casual rates include the 25% casual loading. Rates sourced from the Fair Work Commission pay guide for {awardCode}, effective {effectiveDate}.
          </p>
        </section>
      )}

      {/* Sub-page card grid */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Explore {awardName} entitlements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: `/awards/${awardSlug}/pay-rates`, label: 'Pay rates' },
            { href: `/awards/${awardSlug}/penalty-rates`, label: 'Penalty rates' },
            { href: `/awards/${awardSlug}/casual`, label: 'Casual pay' },
            { href: `/awards/${awardSlug}/overtime`, label: 'Overtime' },
            { href: `/awards/${awardSlug}/allowances`, label: 'Allowances' },
            { href: `/awards/${awardSlug}/classifications`, label: 'Classifications' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: 'block',
              padding: '12px 16px',
              border: '1.5px solid var(--border)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--secondary)',
            }}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Red flags your pay may be wrong</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Same pay on weekends as weekdays',
              'No separate penalty rate lines on your payslip',
              'Flat hourly rate that never changes regardless of hours or days worked',
              'No overtime pay after long shifts',
              'Casual loading described as "covering weekends and penalties"',
              'Your classification level has never been reviewed despite gaining experience or qualifications',
            ].map((item, i) => (
              <p key={i} style={{ ...smallStyle, fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                &bull; {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Underpayment scale — sourced from FWO Annual Report 2024-25 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Underpayment in Australia is widespread</h2>
        <p style={pStyle}>
          The Fair Work Ombudsman recovered <strong>$358 million</strong> for more than <strong>249,000 underpaid workers</strong> in 2024&ndash;25 alone. Over the past five years, total recoveries have exceeded <strong>$2 billion</strong>.
        </p>
        <p style={pStyle}>
          In investigations of fast food, restaurant, and caf&eacute; businesses, <strong>86% were found to have breached workplace laws</strong>. The most common breaches: failure to pay penalty rates and underpaying minimum wages for ordinary hours.
        </p>
        <p style={smallStyle}>
          Source: <a href="https://www.fairwork.gov.au/newsroom/media-releases/2025-media-releases/october-2025/20251029-annual-report-2024-25-media-release" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Ombudsman Annual Report 2024&ndash;25</a>
        </p>
      </section>

      {/* CTA mid-page */}
      <CheckPayCTA awardCode={awardCode} awardName={awardName} />

      {/* FAQ */}
      <section style={{ ...sectionStyle, marginTop: '2.5rem' }}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {faqData.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h3 style={h3Style}>{item.question}</h3>
              <p style={{ ...pStyle, marginBottom: 0 }}>{item.answer}</p>
            </div>
          ))}
        </div>
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

      {/* Final CTA */}
      <section style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ ...h2Style, fontSize: '1.25rem', textAlign: 'center' }}>
          Don&rsquo;t guess &mdash; small underpayments add up fast.
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '500px', margin: '0 auto 16px' }}>
          Enter your shifts and see exactly what you should have been paid under the {awardName} &mdash; including overtime, penalty rates, and allowances. It takes 2 minutes.
        </p>
        <a
          href={`/check-my-pay?award=${awardCode}`}
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: '#263238',
            fontWeight: 700,
            fontSize: '16px',
            padding: '14px 36px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Check my pay now
        </a>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, fontStyle: 'italic', marginTop: '2rem' }}>
        Rates sourced from the Fair Work Commission pay guide for the {awardFullName} ({awardCode}), effective {effectiveDate}. General information only &mdash; not legal advice. Verify rates at{' '}
        <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={linkStyle}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
