/**
 * Generic "Is a Flat Rate Legal?" intent page — works for any award.
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
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
  examples: string;
}

export default function GenericIntentFlatRate({ rates, awardCode, awardName, awardSlug, examples }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  // Example: flat rate of base + $3 — looks generous but fails on Sundays/PHs
  const flatExample = l1 ? Math.round((l1.ftRate + 3) * 100) / 100 : undefined;
  const sundayShortfall = l1 && flatExample ? l1.sundayCasual - flatExample : undefined;
  const phShortfall = l1 && flatExample ? l1.publicHolidayCasual - flatExample : undefined;

  const faqData = [
    { question: 'Can my employer pay me a single flat rate for all hours?', answer: `Only if that flat rate demonstrably exceeds every award obligation for every hour worked — including Sunday rates, public holiday rates, overtime, and allowances. In practice, most flat rates fail this test because the highest penalty rates (public holidays, double-time overtime) exceed the flat rate.` },
    { question: 'My flat rate is above the base award rate — isn\'t that enough?', answer: 'No. The base rate is just the weekday ordinary-hours rate. If you work weekends, public holidays, or overtime, the minimum rate for those hours is significantly higher. A flat rate must beat all of them, not just the base.' },
    { question: 'What is a "better off overall" test?', answer: 'The "better off overall" test (BOOT) requires that, when you add up all hours at their correct award rates plus allowances and other entitlements, the employee must be no worse off than under the award. Flat rates frequently fail BOOT because they underpay penalty hours even if they overpay ordinary hours.' },
    { question: 'What should I do if my flat rate doesn\'t cover all obligations?', answer: 'Calculate the exact shortfall using the tool below. Then raise it with your employer — in many cases this is a genuine misunderstanding. If it is not resolved, contact the Fair Work Ombudsman on 13 13 94. You can recover underpayments going back 6 years.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Flat rates are one of the most common ways underpayment hides under the {awardName}. Your employer offers a single hourly rate for every shift &mdash; and it looks decent. But the {awardName} does not work on a single rate. It sets different minimums for weekdays, Saturdays, Sundays, public holidays, and overtime. A flat rate that clears the weekday minimum can still fall short on every other day.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Common roles covered: {examples}. If you are on a flat rate in any of these roles &mdash; this applies to you.
        </p>
      </section>

      {/* The rule */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>The legal test for flat rates</h2>
          <p style={pStyle}>
            A flat rate is only lawful if the worker is <strong>better off overall</strong> compared to the award. That means the flat rate must cover:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li style={{ marginBottom: '6px' }}>Weekend penalty rates (Saturday and Sunday)</li>
            <li style={{ marginBottom: '6px' }}>Public holiday rates (typically 2.25&ndash;2.75x base)</li>
            <li style={{ marginBottom: '6px' }}>Overtime (time-and-a-half then double time)</li>
            <li style={{ marginBottom: '6px' }}>Applicable allowances (meals, uniforms, tools)</li>
            <li style={{ marginBottom: '6px' }}>Casual loading if the worker is casual</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: 0 }}>
            Most flat rates fail this test. The public holiday rate alone is often higher than the flat rate being paid.
          </p>
        </div>
      </section>

      {/* Worked example */}
      {l1 && flatExample && sundayShortfall && phShortfall && (
        <section style={sectionStyle}>
          <div style={exampleBoxStyle}>
            <h2 style={{ ...h2Style, marginBottom: '12px' }}>How a &ldquo;good&rdquo; flat rate still fails</h2>
            <p style={pStyle}>
              <strong>Scenario:</strong> Casual Level 1 worker paid a flat rate of {formatCurrency(flatExample)}/hr for all shifts. That is {formatCurrency(flatExample - l1.ftRate)}/hr above the base full-time rate &mdash; looks generous.
            </p>
            <p style={pStyle}>
              <strong>But the award requires:</strong>
            </p>
            <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '4px' }}>Casual weekday rate: {formatCurrency(l1.casualRate)}/hr {flatExample >= l1.casualRate ? '(covered)' : <strong>&mdash; shortfall of {formatCurrency(l1.casualRate - flatExample)}/hr</strong>}</li>
              <li style={{ marginBottom: '4px' }}>Casual Sunday rate: {formatCurrency(l1.sundayCasual)}/hr {sundayShortfall <= 0 ? '(covered)' : <strong>&mdash; shortfall of {formatCurrency(sundayShortfall)}/hr</strong>}</li>
              <li style={{ marginBottom: '4px' }}>Casual public holiday rate: {formatCurrency(l1.publicHolidayCasual)}/hr {phShortfall <= 0 ? '(covered)' : <strong>&mdash; shortfall of {formatCurrency(phShortfall)}/hr</strong>}</li>
            </ul>
            {(sundayShortfall > 0 || phShortfall > 0) && (
              <p style={pStyle}>
                Every Sunday shift is underpaid by {formatCurrency(sundayShortfall > 0 ? sundayShortfall : 0)}/hr. Every public holiday shift is underpaid by {formatCurrency(phShortfall > 0 ? phShortfall : 0)}/hr. Over a year with regular weekend work, that is thousands in lost wages.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Why employers use flat rates */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Why flat rates are so common</h2>
        <h3 style={h3Style}>Simpler payroll</h3>
        <p style={pStyle}>
          Flat rates are easier to administer. One rate for every shift means less calculation. But ease of administration does not make it legal.
        </p>
        <h3 style={h3Style}>&ldquo;It all evens out&rdquo;</h3>
        <p style={pStyle}>
          Employers sometimes argue the higher weekday rate offsets the lower weekend rate. The law does not work that way. Each pay period must meet the award minimums for the actual hours worked in that period.
        </p>
        <h3 style={h3Style}>Workers do not check</h3>
        <p style={pStyle}>
          Most workers see a rate above the base and assume it is compliant. The employer relies on no one doing the maths. Do the maths.
        </p>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Check if your flat rate is actually legal</h2>
        <p style={pStyle}>
          Enter your flat rate and typical roster below. The calculator will compare it against every {awardName} obligation &mdash; weekday, weekend, public holiday, overtime &mdash; and tell you if there is a shortfall.
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
          A flat rate is not automatically wrong &mdash; but it is automatically suspicious. If you have never checked whether it covers your weekends, public holidays, and overtime, now is the time.
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
