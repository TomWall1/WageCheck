/**
 * Generic "Am I Being Underpaid?" intent page — works for any award.
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

export default function GenericIntentUnderpaid({ rates, awardCode, awardName, awardSlug, examples }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  const faqData = [
    { question: `How do I know if the ${awardName} covers me?`, answer: `The ${awardName} covers employees working in the industry described by the award. If you're unsure, use the Fair Work Award Finder at fairwork.gov.au or call 13 13 94. Your employer should be able to tell you which award applies to your role.` },
    { question: 'Could my employer be underpaying me by mistake?', answer: 'Often yes. Payroll errors, outdated systems, and genuine misunderstanding of the award account for a large proportion of underpayments. Raising it doesn\'t imply accusation — it\'s a straightforward correction in most cases.' },
    { question: 'What if my employer gets angry when I raise it?', answer: 'You are legally protected from adverse action — dismissal, demotion, reduction in hours — for exercising your workplace rights. If your employer retaliates, that\'s a separate and serious legal breach.' },
    { question: 'How far back can I recover underpayments?', answer: 'The Fair Work Ombudsman can recover unpaid wages going back up to 6 years. Even small shortfalls — $2–3/hr — add up to thousands over that period.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work under the {awardName} and have never checked your pay against the award, there is a real chance you are being underpaid. Underpayment is not always obvious &mdash; it often hides in missing penalty rates, incorrect classification levels, or allowances that never appear on your payslip.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Common roles covered: {examples}. If any of those sound like your job &mdash; keep reading.
        </p>
      </section>

      {/* Real example */}
      {l1 && (
        <section style={sectionStyle}>
          <div style={exampleBoxStyle}>
            <h2 style={{ ...h2Style, marginBottom: '12px' }}>What underpayment looks like</h2>
            <p style={pStyle}>
              <strong>Scenario:</strong> Casual employee, Level 1. Works 4 shifts per week including one Sunday. Paid a flat rate of {formatCurrency(l1.casualRate)} for every shift.
            </p>
            <p style={pStyle}>
              <strong>The problem:</strong> Sunday casual rate should be {formatCurrency(l1.sundayCasual)}/hr &mdash; not the ordinary casual rate. On a 6-hour Sunday shift alone, that is {formatCurrency((l1.sundayCasual - l1.casualRate) * 6)} underpaid per week, or {formatCurrency((l1.sundayCasual - l1.casualRate) * 6 * 48)} over a year.
            </p>
            <p style={smallStyle}>
              And that is just one shift type. Add in missed public holiday rates, allowances, and potential overtime &mdash; and it compounds fast.
            </p>
          </div>
        </section>
      )}

      {/* Signs */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The most common signs you&apos;re being underpaid</h2>

        <h3 style={h3Style}>1. Your pay looks the same regardless of the day</h3>
        <p style={pStyle}>
          If your Sunday rate, Saturday rate, and Tuesday rate are identical on your payslip, penalty rates almost certainly have not been applied. Under the {awardName}, weekend and public holiday rates are significantly higher than ordinary weekday rates.
          {l1 && <> The Level 1 ordinary casual rate is {formatCurrency(l1.casualRate)}/hr &mdash; but the Sunday casual rate is {formatCurrency(l1.sundayCasual)}/hr.</>}
        </p>

        <h3 style={h3Style}>2. You regularly work more than 38 hours but never see overtime</h3>
        <p style={pStyle}>
          Overtime triggers after 38 ordinary hours per week (or after the daily threshold set by the award). If you consistently work past these limits and your payslip looks the same every week, overtime is not being calculated. See <a href={`/awards/${awardSlug}/overtime`} style={linkStyle}>{awardName} overtime rates</a>.
        </p>

        <h3 style={h3Style}>3. Your classification level has never been reviewed</h3>
        <p style={pStyle}>
          Your classification determines your minimum rate. If your duties have expanded since you started but your level has not changed, you may be classified &mdash; and paid &mdash; below where you should be.
          {l1 && l2 && <> The difference between Level 1 ({formatCurrency(l1.ftRate)}/hr) and Level 2 ({formatCurrency(l2.ftRate)}/hr) is {formatCurrency(l2.ftRate - l1.ftRate)}/hr &mdash; that is over {formatCurrency((l2.ftRate - l1.ftRate) * 38 * 48)}/year for a full-time worker.</>}
        </p>

        <h3 style={h3Style}>4. No allowances appear on your payslip</h3>
        <p style={pStyle}>
          Meal allowances, uniform allowances, tool allowances, and other entitlements should appear as separate lines on your payslip. If you never see them, they are almost certainly not being paid. See <a href={`/awards/${awardSlug}/allowances`} style={linkStyle}>{awardName} allowances</a>.
        </p>
      </section>

      {/* Warning box */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common underpayment patterns</h2>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li style={{ marginBottom: '6px' }}>Flat hourly rate regardless of weekends or public holidays</li>
            <li style={{ marginBottom: '6px' }}>Classified at the wrong level for the duties actually performed</li>
            <li style={{ marginBottom: '6px' }}>Casual loading treated as covering weekend penalty rates (it does not)</li>
            <li style={{ marginBottom: '6px' }}>Overtime simply never paid despite regularly exceeding 38 hours</li>
            <li style={{ marginBottom: '6px' }}>Allowances never mentioned, never paid</li>
          </ul>
          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
      </section>

      {/* What to do */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if you find a shortfall</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Calculate the exact amount using the tool below &mdash; a specific number makes everything easier</li>
          <li>Raise it with your employer &mdash; many underpayments are genuine errors that get corrected quickly</li>
          <li>If unresolved, contact the Fair Work Ombudsman on 13 13 94 &mdash; they can recover unpaid wages going back 6 years at no cost to you</li>
        </ul>
        <p style={pStyle}>
          See the full <a href="/guides/how-to-report-underpayment" style={linkStyle}>guide to reporting underpayment</a>.
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
          Not sure if you&apos;re being paid correctly? Check your pay now &mdash; it takes 2 minutes and you&apos;ll know for certain.
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
