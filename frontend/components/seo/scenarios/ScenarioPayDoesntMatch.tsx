/**
 * Scenario: Pay Doesn't Match Roster — /awards/hospitality-award/scenarios/pay-doesnt-match-roster
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says I must have misread the roster — what should I do?', answer: 'Keep copies of your own records — photographs of physical rosters, screenshots of digital ones. Text messages about shifts are also useful. Your documentation is what matters.' },
  { question: 'What if the discrepancy is small — is it worth raising?', answer: 'Even small weekly discrepancies compound. $20/week is over $1,000/year. And raising a systematic error benefits everyone else affected too.' },
  { question: 'My roster is shared digitally — can the employer change it after the fact?', answer: 'Yes, which is why keeping contemporary records (screenshots taken at the time) is important. If the roster is changed retroactively to match a lower payslip, that\u0027s a more serious issue.' },
];

export default function ScenarioPayDoesntMatch() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your pay doesn&apos;t match your roster, the shortfall is almost certainly owed to you. Discrepancies between what&apos;s on the roster and what appears on the payslip are often a sign that hours weren&apos;t recorded correctly, penalty rates for certain days weren&apos;t applied, or shifts were trimmed on paper. The award requires you to be paid for every hour you actually worked at the correct rate.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve noticed a difference between your roster and your pay &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The most common causes of roster/pay mismatches</h2>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Hours trimmed on the timesheet</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Shifts entered as shorter than they actually were &mdash; 6.5 hours recorded as 6, for example. Small per shift but significant over time.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Penalty rate shifts entered as ordinary</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Your Sunday shift recorded as a Monday. A simple data entry error that strips the <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rate</a> from the calculation.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Setup or pack-down time not recorded</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Time spent setting up before service or cleaning up after it is working time that must be paid. If these periods don&apos;t appear on your timesheet, they&apos;re unpaid.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Shifts simply missing from the payslip</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Occasionally an entire shift isn&apos;t processed. If your roster shows 5 shifts but you&apos;re paid for 4, that&apos;s straightforward &mdash; one shift&apos;s pay is missing.
          </p>
        </div>

        <p style={pStyle}>
          If your pay and roster don&apos;t match, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check what your roster hours should pay &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Even a small recurring discrepancy adds up fast. A 30-minute per shift undercount across 5 shifts per week at Level 2 casual rates: approximately $20&ndash;$25/week. Over a year: $1,000&ndash;$1,300 &mdash; from what looks like a minor rounding issue on each individual payslip.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <p style={pStyle}><strong>Step 1:</strong> Keep your roster records &mdash; screenshot, photograph, or save any digital version. This is your evidence.</p>
        <p style={pStyle}><strong>Step 2:</strong> Compare the roster against your payslip line by line. Note any discrepancies.</p>
        <p style={pStyle}><strong>Step 3:</strong> Raise it with your employer &mdash; in writing if possible. Provide the specific dates and the discrepancy. Many are genuinely errors that get corrected quickly.</p>
        <p style={pStyle}><strong>Step 4:</strong> If unresolved, contact the Fair Work Ombudsman on 13 13 94. See <a href="/guides/how-to-report-underpayment" style={linkStyle}>how to report underpayment</a></p>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check what your roster hours should have paid.</p>
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
