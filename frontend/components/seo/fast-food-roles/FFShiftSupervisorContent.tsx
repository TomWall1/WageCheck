/**
 * Fast Food Award — Shift Supervisor Pay Rates role page
 * URL: /awards/fast-food-award/shift-supervisor-pay-rates
 * Award: MA000003
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'What makes someone a shift supervisor under the Fast Food Award?', answer: 'Grade 3 (Responsible) covers employees who are responsible for supervising other employees, handling cash reconciliations, opening or closing the store, managing customer complaints, and running the shift in the absence of a manager. If you do any combination of these duties regularly, you should be classified as Grade 3.' },
  { question: 'I do supervisor duties but I am still paid as Grade 1. Is that legal?', answer: 'No. Your employer must classify you based on your actual duties, not your job title. If you are regularly supervising others, handling cash, or running shifts, you are performing Grade 3 work and must be paid accordingly. The difference between Grade 1 and Grade 3 is nearly $2/hr before penalties.' },
  { question: 'Do shift supervisors get overtime?', answer: 'Yes. Overtime applies after 38 ordinary hours per week or after the daily maximum. Shift supervisors frequently work longer hours than crew members and are among the most commonly affected by unpaid overtime in fast food.' },
];

export default function FFShiftSupervisorContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you run shifts at a fast food outlet &mdash; supervising crew, handling cash, opening or closing &mdash; you should be classified as Grade 3 (Responsible) under the Fast Food Award. The base rate is {l3 ? formatCurrency(l3.ftRate) : '&mdash;'}/hr, not the {l1 ? formatCurrency(l1.ftRate) : '&mdash;'} that crew members get. If your pay hasn&rsquo;t changed since you started doing supervisor duties, you&rsquo;re being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The gap between Grade 1 and Grade 3 is nearly $2/hr &mdash; and that gap widens on weekends and public holidays when penalty rates multiply it.
        </p>
        <p style={pStyle}>
          For the full award overview, see the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay guide</a>.
        </p>
      </section>

      {/* What qualifies */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What qualifies as supervisory duties?</h2>
        <p style={pStyle}>
          Under the Fast Food Award, Grade 3 (Responsible) applies to employees who regularly perform any of the following:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Supervising other employees during a shift</li>
          <li>Handling cash reconciliations or end-of-day banking</li>
          <li>Opening or closing the store</li>
          <li>Resolving customer complaints independently</li>
          <li>Running the shift when the manager is absent</li>
          <li>Training new staff</li>
        </ul>
        <p style={pStyle}>
          You do not need a formal &quot;shift supervisor&quot; title. If you are doing these duties, you should be paid for them.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual worker doing shift supervisor duties. Classified and paid as Grade 1. Works 25 hours/week including one Sunday shift (6 hrs).
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they were paid (Grade 1 casual, flat):</strong> {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr every day
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should have been paid (Grade 3 casual):</strong> {l3 ? formatCurrency(l3.casualRate) : '&mdash;'}/hr weekdays, plus Sunday casual rate of ~{l3 ? formatCurrency(l3.sundayCasual) : '&mdash;'}/hr
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Two problems: wrong grade + no penalty rates. Underpayment: ~$140/week. Over a year: ~$6,720.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employers promote workers into supervisor duties without updating their classification or pay. The worker assumes their rate is correct because they got a small raise at some point.
          </p>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments for shift supervisors</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Classified as Grade 1 or 2 while doing Grade 3 work', desc: 'This is the most common issue. Your classification must match your actual duties. If you supervise others, you are Grade 3 at minimum.' },
              { title: 'No overtime despite longer hours', desc: 'Shift supervisors often stay late for handovers, cash counts, or cleaning. Any hours beyond the daily or weekly threshold must be paid at overtime rates.' },
              { title: 'Flat rate on weekends', desc: 'The penalty rate multiplier applies to the Grade 3 base &mdash; not the Grade 1 base. If you are being paid a flat rate, both the classification and the penalty are wrong.' },
              { title: '"Responsibility allowance" instead of correct grade', desc: 'Some employers pay a small extra amount instead of reclassifying. Unless that amount brings your total above every Grade 3 entitlement in every scenario, it does not satisfy the award.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />

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

      {/* Related */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/fast-food-award/crew-member-pay-rates" style={linkStyle}>Crew member pay rates</a> &middot; <a href="/awards/fast-food-award/junior-pay-rates" style={linkStyle}>Junior pay rates</a> &middot; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award overview</a>
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fast Food Industry Award 2010 (MA000003), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>

      {/* FAQPage Schema */}
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
