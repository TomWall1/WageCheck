/**
 * Hospitality Award Classifications content — /awards/hospitality-award/classifications
 * Rates: FWO pay guide MA000009 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
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
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left', borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Can my employer classify me at a lower level to pay less?', answer: 'No. Your classification must reflect the work you actually perform, not what your employer prefers. If you regularly perform duties at a higher level, you must be paid at that level.' },
  { question: 'What if I do tasks across multiple classification levels?', answer: 'You should be classified at the highest level that reflects the majority of your duties. If you regularly perform Level 3 tasks but are paid at Level 1, you\'re being underpaid on every hour worked.' },
  { question: 'Does my classification affect penalty rates?', answer: 'Yes. Penalty rates are calculated as a multiplier of your base rate, which is set by your classification level. A wrong classification means every penalty rate, overtime hour, and leave payment is also wrong.' },
  { question: 'How do I find out what level I should be?', answer: 'Look at the duties you actually perform day to day \u2014 not your job title. Compare them against the classification descriptions in the award. If your duties match a higher level than you\'re being paid, raise it with your employer or contact the Fair Work Ombudsman.' },
];

const levelRoles: Record<number, string> = {
  1: 'Kitchen hand, glassy, general hand, introductory bar/food attendant',
  2: 'Cook grade 1, bar attendant, food & beverage attendant, front office',
  3: 'Cook grade 2, senior food & beverage attendant, guest services supervisor',
  4: 'Cook grade 3 (tradesperson), senior front office, senior housekeeper',
  5: 'Cook grade 4 (chef), senior supervisor, advanced tradesperson',
};

export default function HospitalityClassificationsContent({ rates }: { rates: HospitalityRateData }) {
  const level1 = getLevel(rates, 1);
  const level3 = getLevel(rates, 3);
  const l1Base = level1?.ftRate ?? 0;
  const l3Base = level3?.ftRate ?? 0;
  const diffPerHour = Math.round((l3Base - l1Base) * 100) / 100;
  const diffPerWeek = Math.round(diffPerHour * 38 * 100) / 100;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Your classification level determines your base rate of pay under the Hospitality Award. If your classification is wrong, every hour you work &mdash; including overtime, penalties, and leave &mdash; is underpaid. Misclassification is one of the most common and least visible forms of underpayment in the industry.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve never been told your classification level, or your duties have changed since you started &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time bar attendant who also trains new staff and manages stock ordering. Classified and paid as Level 1.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l1Base)}/hr (Level 1 base rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Level 3 base rate &mdash; {formatCurrency(l3Base)}/hr (duties include supervision and training)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(diffPerHour)}/hr &times; 38hrs = ~{formatCurrency(diffPerWeek)}/week. ~{formatCurrency(Math.round(diffPerWeek * 52))}/year &mdash; before penalties.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer never updates the classification when duties change. The worker assumes their pay is correct because they got a &quot;raise&quot; at some point.
          </p>
        </div>
      </section>

      {/* Classification levels table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hospitality Award classification levels &mdash; 2025 rates</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Base rate (FT/PT)</th>
                <th style={thStyle}>Casual rate</th>
                <th style={thStyle}>Typical roles</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 5).map(l => (
                <tr key={l.level}><td style={tdStyle}>Level {l.level}</td><td style={tdStyle}>{formatCurrency(l.ftRate)}/hr</td><td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td><td style={tdStyle}>{levelRoles[l.level] ?? l.title}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025. Higher levels (6 and above) exist for managerial roles.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          The difference between Level 1 and Level 3 is {formatCurrency(diffPerHour)}/hr. On a full-time week that&apos;s {formatCurrency(diffPerWeek)} &mdash; and that gap compounds on every penalty rate and overtime hour.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* How to check your level */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your classification level</h2>
        <p style={pStyle}>
          Your classification is based on the work you actually do &mdash; not your job title, not what your contract says, and not what your employer decides.
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Step 1:</strong> Look at your payslip. Does it state a classification level? If not, ask your employer.</li>
          <li><strong>Step 2:</strong> Compare your daily duties against the classification descriptions in the award.</li>
          <li><strong>Step 3:</strong> If your duties match a higher level than you&apos;re being paid, you may be owed back pay on every hour worked at the lower rate.</li>
        </ul>
        <p style={pStyle}>
          Common signs of misclassification: you train other staff, you supervise shifts, you manage stock or ordering, or you hold trade qualifications &mdash; but you&apos;re paid at Level 1 or 2.
        </p>
      </section>

      {/* Common classification issues */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common classification issues</h2>

          <h3 style={h3Style}>Never told your classification level</h3>
          <p style={pStyle}>
            Many hospitality workers have never been informed of their classification. If you don&apos;t know your level, you can&apos;t verify your pay is correct. Ask your employer &mdash; they&apos;re required to tell you.
          </p>

          <h3 style={h3Style}>Duties changed but classification didn&apos;t</h3>
          <p style={pStyle}>
            You started as a kitchen hand but now you&apos;re cooking, training juniors, or managing sections. Your duties have moved up &mdash; but your pay hasn&apos;t. This is one of the most common underpayment scenarios.
          </p>

          <h3 style={h3Style}>Qualified tradesperson paid below Level 4</h3>
          <p style={pStyle}>
            If you hold a trade qualification (e.g. Certificate III in Commercial Cookery) and use it at work, you should be at least Level 4. Many qualified cooks are paid at Level 2 or 3.
          </p>

          <h3 style={h3Style}>Supervisory duties at a non-supervisory rate</h3>
          <p style={pStyle}>
            If you run shifts, manage staff, or handle cash reconciliation, you&apos;re likely performing Level 3+ duties. Being paid Level 1 for this work is underpayment.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and because classification affects your base rate, even a one-level error compounds across every penalty, overtime, and leave payment.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Related pages */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Related guides</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>Hospitality Award penalty rates guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/overtime" style={linkStyle}>Hospitality Award overtime guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Hospitality Award casual employees guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/allowances" style={linkStyle}>Hospitality Award allowances guide &rarr;</a></li>
          <li><a href="/awards/hospitality-award/pay-rates" style={linkStyle}>Full pay rates table &rarr;</a></li>
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
          Don&apos;t guess &mdash; a wrong classification affects every hour you work.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; at the correct classification level, with every penalty rate and loading applied.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
