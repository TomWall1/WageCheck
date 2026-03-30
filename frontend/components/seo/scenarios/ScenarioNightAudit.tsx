/**
 * Scenario: Night Audit Pay — /awards/hospitality-award/scenarios/night-audit-pay
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel, getEveningLoading, getNightLoading } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says night audit is a Level 2 role — is that right?', answer: 'Almost certainly not. Independent overnight front office operation with financial reconciliation responsibilities is Level 3 work under the Hospitality Award. Job title alone doesn\u0027t determine level — duties do.' },
  { question: 'I\u0027m the only one on the property at night — does that affect my level?', answer: 'Working as the sole responsible employee for the property overnight reinforces the Level 3 assessment — that\u0027s exactly the kind of independent responsibility Level 3 covers.' },
  { question: 'Can I be casual doing night audit — and does that change my rates?', answer: 'Yes, night audit can be casual. Casual rates are higher than permanent rates, and the same loading provisions apply.' },
];

export default function ScenarioNightAudit({ rates }: { rates?: HospitalityRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const eveningLoading = rates ? getEveningLoading(rates) : 0;
  const nightLoading = rates ? getNightLoading(rates) : 0;

  const l3FtRate = l3?.ftRate ?? 0;
  const l3SatFt = l3?.saturdayFt ?? 0;
  const l3SunFt = l3?.sundayFt ?? 0;
  const l2FtRate = l2?.ftRate ?? 0;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Night audit should pay significantly more than an ordinary front office shift. The role typically qualifies for Level 3 <a href="/awards/hospitality-award/classifications" style={linkStyle}>classification</a>, attracts the late-night loading for hours after midnight, and on weekends attracts the applicable Saturday or Sunday rates in addition. Many night auditors are paid at Level 2 without the late-night loading &mdash; meaning they&apos;re underpaid on multiple fronts simultaneously.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work night audit in any hotel or accommodation venue &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Classification:</strong> Night audit involves independent front office operation, financial reconciliation, and overnight responsibility without supervision. These are Level 3 duties. Being paid at Level 2 while performing Level 3 duties is misclassification.</li>
          <li><strong>Late-night loading:</strong> Work performed between midnight and 7am attracts an additional {formatCurrency(nightLoading)}/hr loading on top of the applicable rate.</li>
          <li><strong>Evening loading:</strong> Work between 7pm and midnight attracts +{formatCurrency(eveningLoading)}/hr on top of the applicable rate.</li>
          <li><strong>Weekend rates:</strong> Night audit shifts on Friday/Saturday and Saturday/Sunday nights attract the applicable weekend <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rate</a> from midnight &mdash; Sunday rates from midnight on Saturday/Sunday, for example.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What a night audit shift should pay</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Example: Level 3 permanent, 11pm&ndash;7am Saturday night into Sunday morning</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>11pm&ndash;midnight: Saturday permanent rate ({formatCurrency(l3SatFt)}) + evening loading ({formatCurrency(eveningLoading)}) = ~{formatCurrency(l3SatFt + eveningLoading)}/hr</li>
            <li>Midnight&ndash;7am: Sunday permanent rate ({formatCurrency(l3SunFt)}) + late-night loading ({formatCurrency(nightLoading)}) = {formatCurrency(l3SunFt + nightLoading)}/hr</li>
          </ul>
          <p style={smallStyle}>
            Compare this to being paid Level 2 flat rate ({formatCurrency(l2FtRate)}/hr) for the whole shift. The difference is substantial.
          </p>
        </div>
        <p style={pStyle}>
          If your night audit rate looks like an ordinary front office rate, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your night audit pay &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A night audit worker classified at Level 2 instead of Level 3 is underpaid on base rate, on the Saturday rate, on the Sunday rate, and on the late-night loading &mdash; simultaneously. The combined gap across a 38-hour week of night audit shifts (all after midnight, spanning weekends) is often $100&ndash;$200/week. Over a year: $5,000&ndash;$10,000 &mdash; one of the highest single-role underpayments in the award.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is your classification shown as Level 3? If it shows Level 1 or Level 2, it&apos;s very likely wrong.</li>
          <li>Does a late-night loading ({formatCurrency(nightLoading)}/hr) appear for hours after midnight?</li>
          <li>Does an evening loading ({formatCurrency(eveningLoading)}/hr) appear for 7pm&ndash;midnight?</li>
          <li>Does the correct day rate apply (Saturday/Sunday) for weekend nights?</li>
        </ul>
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
        <p style={pStyle}>Don&apos;t guess &mdash; calculate what your night audit shifts should pay.</p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
