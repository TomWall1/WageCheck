/**
 * Scenario: Working Every Week Casual in Fast Food — Am I Still Casual?
 * /awards/fast-food-award/scenarios/casual-every-week
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
  { question: 'After how long can I request to convert from casual to permanent?', answer: 'Under the Fair Work Act, after 12 months of regular employment with the same employer, you have the right to request conversion to permanent (full-time or part-time) employment if your hours have been regular and could continue as permanent hours. Employers with 15 or more employees must also offer conversion.' },
  { question: 'Can my employer refuse my conversion request?', answer: 'Your employer can only refuse on reasonable business grounds, such as your hours being about to significantly change or the position being genuinely temporary. They must provide written reasons for the refusal. If you believe the refusal is unreasonable, you can dispute it through the Fair Work Commission.' },
  { question: 'What do I gain by converting to permanent?', answer: 'Permanent employees receive paid annual leave (4 weeks), paid personal/carer\'s leave (10 days), paid public holidays, notice of termination, and redundancy pay. While you lose the 25% casual loading, the value of leave entitlements typically exceeds the loading for regular workers.' },
];

export default function FFScenarioCasualEveryWeek({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const casualRate = g1?.casualRate ?? 30.91;
  const casualWeekly = Math.round(casualRate * 30 * 100) / 100;
  const permWeekly = Math.round(baseRate * 30 * 100) / 100;
  const leaveValue = Math.round(baseRate * 38 * 4 / 52 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you have been working regular, predictable shifts every week in fast food for 12 months or more, you likely have the right to convert to permanent employment. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> and the Fair Work Act provide a pathway from casual to permanent.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fair Work Act 2009 (as amended), a casual employee who has worked for the same employer for at least 12 months on a regular and systematic basis can request conversion to full-time or part-time employment. Employers with 15 or more employees must also proactively offer conversion. Working the same shifts every week is strong evidence of a regular pattern. While the Fast Food Industry Award (MA000003) defines a casual as someone engaged on a shift-by-shift basis, the reality of your working arrangement matters more than the label.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Casual vs permanent — Grade 1, 30 hrs/week</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Casual rate: ${casualRate.toFixed(2)}/hr &times; 30 hrs = ${casualWeekly.toFixed(2)}/week</li>
            <li>Permanent rate: ${baseRate.toFixed(2)}/hr &times; 30 hrs = ${permWeekly.toFixed(2)}/week</li>
            <li>Weekly leave accrual value (approx): ${leaveValue.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            As a permanent employee you lose the 25% loading but gain 4 weeks annual leave, 10 days personal leave, and public holiday entitlements &mdash; often worth more for regular workers.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip classify you as &quot;casual&quot;? Check if this still reflects your actual working pattern.</li>
          <li>Are you receiving 25% casual loading but missing out on leave entitlements?</li>
          <li>Have you worked regular hours for 12+ months? If so, you may be entitled to convert.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
