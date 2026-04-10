/**
 * Fast Food Award Classifications content — /awards/fast-food-award/classifications
 * Rates: FWO pay guide MA000003 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel, getLevelByStream } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500,
  color: 'var(--secondary)', marginBottom: '10px', marginTop: '0',
};
const h3Style: React.CSSProperties = {
  fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0',
};
const pStyle: React.CSSProperties = {
  fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem',
};
const smallStyle: React.CSSProperties = {
  fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6,
};
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)', border: '1.5px solid var(--accent)',
  borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem',
};
const exampleBoxStyle: React.CSSProperties = {
  background: '#f8f9fa', border: '1.5px solid var(--border)',
  borderRadius: '10px', padding: '20px', marginBottom: '1.5rem',
};
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Can my employer classify me at a lower grade to pay less?', answer: 'No. Your classification must reflect the work you actually perform, not what your employer prefers. If you regularly perform duties at a higher grade, you must be paid at that grade.' },
  { question: 'What if I do tasks across multiple classification grades?', answer: 'You should be classified at the highest grade that reflects the majority of your duties. If you regularly perform Grade 3 tasks but are paid at Grade 1, you are being underpaid on every hour worked.' },
  { question: 'Does my classification affect penalty rates?', answer: 'Yes. Penalty rates are calculated as a multiplier of your base rate, which is set by your classification grade. A wrong classification means every penalty rate, overtime hour, and leave payment is also wrong.' },
  { question: 'How do I find out what grade I should be?', answer: 'Look at the duties you actually perform day to day — not your job title. Compare them against the grade descriptions in the award. If your duties match a higher grade than you are being paid, raise it with your employer or contact the Fair Work Ombudsman.' },
  { question: 'I open and close the store alone — what grade am I?', answer: 'If you work alone and are responsible for opening or closing the store, you are performing Grade 3 Solo duties at minimum. If you also supervise other employees, you are Grade 3 Responsible. Either way, Grade 1 pay for this work is underpayment.' },
];

export default function FastFoodClassificationsContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3s = rates ? getLevelByStream(rates, 3, 'solo') : undefined;
  const l3r = rates ? getLevelByStream(rates, 3, 'responsible') : undefined;
  const g1Base = l1?.ftRate ?? 24.73;
  const g1Casual = l1?.casualRate ?? 30.91;
  const g2Base = l2?.ftRate ?? 25.60;
  const g2Casual = l2?.casualRate ?? 32.00;
  const g3sBase = l3s?.ftRate ?? 26.26;
  const g3sCasual = l3s?.casualRate ?? 32.83;
  const g3rBase = l3r?.ftRate ?? 26.68;
  const g3rCasual = l3r?.casualRate ?? 33.35;
  const diffPerHour = Math.round((g3rBase - g1Base) * 100) / 100;
  const diffPerWeek = Math.round(diffPerHour * 38 * 100) / 100;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Trigger intro */}
      <section style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Being classified Grade 1 after 6 months is the most common classification error in fast food.
        </p>
        <p style={pStyle}>
          Your classification grade determines your base rate of pay under the Fast Food Award. If your grade is wrong, every hour you work &mdash; including overtime, penalties, and leave &mdash; is underpaid. Misclassification is one of the most common and least visible forms of underpayment in the industry.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you have never been told your classification grade, or your duties have changed since you started &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time crew member who opens the store alone 3 days a week, operates all equipment, and trains new starters. Classified and paid as Grade 1.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> ${g1Base}/hr (Grade 1 base rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Grade 3 Responsible base rate &mdash; ${g3rBase}/hr (duties include working alone and training others)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ${diffPerHour}/hr &times; 38hrs = ~${diffPerWeek}/week. ~${Math.round(diffPerWeek * 52)}/year &mdash; before penalties.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer never updates the classification when duties change. The worker assumes their pay is correct because they started as Grade 1.
          </p>
        </div>
      </section>

      {/* Classification grades table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award classification grades &mdash; 2025 rates</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Base rate (FT/PT)</th>
                <th style={thStyle}>Casual rate</th>
                <th style={thStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Grade 1</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g1Base)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g1Casual)}/hr</td><td style={tdStyle}>Entry level &mdash; basic tasks under supervision</td></tr>
              <tr><td style={tdStyle}>Grade 2</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g2Base)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g2Casual)}/hr</td><td style={tdStyle}>Experienced &mdash; works independently with equipment</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Solo)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3sBase)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3sCasual)}/hr</td><td style={tdStyle}>Works alone, opens/closes store</td></tr>
              <tr><td style={tdStyle}>Grade 3 (Responsible)</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3rBase)}/hr</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{formatCurrency(g3rCasual)}/hr</td><td style={tdStyle}>Supervises 2+ employees</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          The difference between Grade 1 and Grade 3 Responsible is ${diffPerHour}/hr. On a full-time week that is ${diffPerWeek} &mdash; and that gap compounds on every penalty rate and overtime hour.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Grade 1 detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Grade 1 &mdash; Entry level</h2>
        <p style={pStyle}>
          Grade 1 is the starting point for new employees with no relevant experience. It covers basic duties performed under direct supervision.
        </p>
        <h3 style={h3Style}>Indicative tasks</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Counter service &mdash; taking orders, handling cash under supervision</li>
          <li>Basic food preparation &mdash; assembling standard menu items</li>
          <li>Cleaning &mdash; general cleaning of customer and kitchen areas</li>
          <li>Packaging &mdash; bagging orders, basic inventory tasks</li>
          <li>Assisting other employees under direction</li>
        </ul>
        <p style={pStyle}>
          Grade 1 is appropriate for new starters learning the role. If you have been at your job for more than a few months and are performing tasks beyond these basics, you should not still be Grade 1.
        </p>
      </section>

      {/* Grade 2 detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Grade 2 &mdash; Experienced</h2>
        <p style={pStyle}>
          Grade 2 covers employees who have developed skills beyond entry level and work with limited supervision. This is where most experienced crew members should be classified.
        </p>
        <h3 style={h3Style}>Indicative tasks</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Operating grills, fryers, and other specialised equipment independently</li>
          <li>Stock control &mdash; receiving deliveries, rotating stock, basic ordering</li>
          <li>Training new Grade 1 employees in basic tasks</li>
          <li>Handling cash and operating POS systems without oversight</li>
          <li>Preparing non-standard or complex menu items</li>
          <li>Quality control &mdash; checking food standards and presentation</li>
        </ul>
        <p style={pStyle}>
          If you operate equipment on your own, handle stock, or train new starters &mdash; you are performing Grade 2 duties. The difference from Grade 1 is {formatCurrency(g2Base - g1Base)}/hr, which compounds to {formatCurrency((g2Base - g1Base) * 38 * 52)}/year on full-time hours before penalties.
        </p>
      </section>

      {/* Grade 3 Solo detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Grade 3 (Solo) &mdash; Works alone, opens/closes</h2>
        <p style={pStyle}>
          Grade 3 Solo applies to employees who work alone at the premises, typically during opening or closing, or who are solely responsible for the operation of the store during their shift.
        </p>
        <h3 style={h3Style}>Indicative tasks</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Opening the store &mdash; disabling alarms, setting up equipment, preparing for trade</li>
          <li>Closing the store &mdash; cashing up, securing premises, cleaning down</li>
          <li>Working alone during quiet periods with full responsibility for the store</li>
          <li>Handling all customer interactions without backup</li>
          <li>Making operational decisions without a manager present</li>
        </ul>
        <p style={pStyle}>
          If you are ever left alone to run the store &mdash; even for part of a shift &mdash; you are performing Grade 3 Solo duties during that time. Being paid Grade 1 for this work is underpayment.
        </p>
      </section>

      {/* Grade 3 Responsible detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Grade 3 (Responsible) &mdash; Supervises 2+ employees</h2>
        <p style={pStyle}>
          Grade 3 Responsible is the highest classification under the Fast Food Award. It applies to employees who supervise two or more other employees during their shift.
        </p>
        <h3 style={h3Style}>Indicative tasks</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Directing the work of 2 or more employees during a shift</li>
          <li>Running a shift as shift supervisor or team leader</li>
          <li>Allocating tasks and managing workflow</li>
          <li>Handling customer complaints and escalations</li>
          <li>Cash reconciliation and end-of-day reporting</li>
          <li>Training and coaching team members</li>
        </ul>
        <p style={pStyle}>
          If you are the person in charge during your shift and direct other workers, you are performing Grade 3 Responsible duties. Many fast food &quot;team leaders&quot; or &quot;shift supervisors&quot; are still paid at Grade 1 &mdash; this is underpayment on every hour worked.
        </p>
      </section>

      {/* How to check your grade */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your classification grade</h2>
        <p style={pStyle}>
          Your classification is based on the work you actually do &mdash; not your job title, not what your contract says, and not what your employer decides.
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Step 1:</strong> Look at your payslip. Does it state a classification grade? If not, ask your employer.</li>
          <li><strong>Step 2:</strong> Compare your daily duties against the grade descriptions above.</li>
          <li><strong>Step 3:</strong> If your duties match a higher grade than you are being paid, you may be owed back pay on every hour worked at the lower rate.</li>
        </ul>
        <p style={pStyle}>
          Common signs of misclassification: you open or close the store, you train other staff, you supervise shifts, you operate equipment independently &mdash; but you are paid at Grade 1.
        </p>
      </section>

      {/* Common classification issues */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common classification issues</h2>

          <h3 style={h3Style}>Never told your classification grade</h3>
          <p style={pStyle}>
            Many fast food workers have never been informed of their classification. If you do not know your grade, you cannot verify your pay is correct. Ask your employer &mdash; they are required to tell you.
          </p>

          <h3 style={h3Style}>Duties changed but classification did not</h3>
          <p style={pStyle}>
            You started as a basic crew member but now you open the store, train new starters, or run shifts. Your duties have moved up &mdash; but your pay has not. This is the most common classification error in fast food.
          </p>

          <h3 style={h3Style}>Shift supervisor paid as Grade 1</h3>
          <p style={pStyle}>
            If you direct the work of 2 or more employees during your shift, you are performing Grade 3 Responsible duties. Being paid Grade 1 for this work means every hour &mdash; including every penalty rate &mdash; is underpaid.
          </p>

          <h3 style={h3Style}>Opening/closing alone but classified below Grade 3</h3>
          <p style={pStyle}>
            If you are solely responsible for the store during any part of your shift, you are performing Grade 3 Solo duties. Grade 1 or 2 pay for this is underpayment.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and because classification affects your base rate, even a one-grade error compounds across every penalty, overtime, and leave payment.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Related pages */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Related guides</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Fast Food Award penalty rates guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/overtime" style={linkStyle}>Fast Food Award overtime guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/casual-employees" style={linkStyle}>Fast Food Award casual employees guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/allowances" style={linkStyle}>Fast Food Award allowances guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/pay-rates" style={linkStyle}>Full pay rates table &rarr;</a></li>
        </ul>
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

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Not sure if you are being paid correctly? Check now.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; at the correct classification grade, with every penalty rate and loading applied.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you will know for certain if you have been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000003).
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
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
