/**
 * Restaurant Award Classifications content — /awards/restaurant-award/classifications
 * Rates: FWO pay guide MA000119 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
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
  { question: 'My job title is "All Rounder" \u2014 does that determine my level?', answer: 'No. Your classification is determined by the duties you actually perform, not your job title. If your duties match Level 3 work (trained attendant, RSA holder, etc.), you must be paid at Level 3 regardless of what your employer calls the role.' },
  { question: 'Should my employer review my level after 6 months?', answer: 'There is no automatic 6-month review under the award. However, your classification must always reflect your actual duties. If your responsibilities have increased, your level should change immediately \u2014 not at a scheduled review.' },
  { question: 'Can I claim back pay if I\'ve been misclassified?', answer: 'Yes \u2014 up to 6 years under the Fair Work Act. If you\'ve been performing Level 4 duties at Level 2 pay for 3 years, you\'re owed the difference on every ordinary hour, penalty, overtime, and leave payment across that entire period.' },
];

const levelDescriptions: Record<number, string> = {
  0: 'Introductory \u2014 first 3 months of employment, no prior relevant experience',
  1: 'Basic duties under direct supervision \u2014 clearing tables, basic cleaning, assisting kitchen',
  2: 'Independent basic duties \u2014 takes orders, operates POS, handles payments, basic food preparation',
  3: 'Trained attendant / Cook Grade 2 \u2014 completed RMLV, RSA, or equivalent; skilled food preparation',
  4: 'Trade qualified \u2014 Certificate III minimum (e.g. Commercial Cookery); works independently',
  5: 'Supervisor / Advanced tradesperson \u2014 manages shifts, directs staff, handles complaints',
  6: 'Specialist cook \u2014 advanced trade qualifications, menu development, specialist techniques',
};

export default function RestaurantClassificationsContent({ rates }: { rates: RestaurantRateData }) {
  const l2 = getLevel(rates, 2);
  const l3 = getLevel(rates, 3);
  const l2Cas = l2?.casualRate ?? 0;
  const l3Cas = l3?.casualRate ?? 0;
  const diffPerHour = Math.round((l3Cas - l2Cas) * 100) / 100;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Being one classification level too low in a restaurant or caf&eacute; might look like a small difference on paper. In practice it compounds on every ordinary hour, every penalty rate, every overtime hour, and every leave payment. Misclassification is one of the most common and least visible forms of underpayment in the industry.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve never been told your classification level, or your duties have changed since you started &mdash; this applies to you.
        </p>
        <p style={pStyle}>
          For the full Restaurant Award overview, see the <a href="/awards/restaurant-award/" style={linkStyle}>Restaurant Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual food and beverage attendant, 2 years at the venue. Classified as Level 2, but takes orders independently, operates POS, holds RSA, and trains new staff &mdash; all Level 3 duties.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l2Cas)}/hr (Level 2 casual rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Level 3 casual rate &mdash; {formatCurrency(l3Cas)}/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(diffPerHour)}/hr on every shift. On a 20-hour week, that&apos;s ~{formatCurrency(Math.round(diffPerHour * 20 * 100) / 100)}/week &mdash; ~{formatCurrency(Math.round(diffPerHour * 20 * 52))}/year. And that&apos;s before penalties.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer never updates the classification when duties change. The worker assumes their pay is correct because they received a small raise.
          </p>
        </div>
      </section>

      {/* Classification levels quick reference */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Classification levels &mdash; quick reference</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          {[0, 1, 2, 3, 4, 5, 6].map(level => (
            <div key={level} style={{ marginBottom: '12px' }}>
              <h3 style={h3Style}>Level {level}{level === 0 ? ' (Introductory)' : ''}</h3>
              <p style={{ ...pStyle, marginBottom: '4px' }}>{levelDescriptions[level]}</p>
            </div>
          ))}
        </div>
        <p style={pStyle}>
          Your classification is based on the work you actually do &mdash; not your job title, not what your contract says, and not what your employer decides.
        </p>
      </section>

      {/* Pay rates by level table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Restaurant Award pay rates by classification level &mdash; 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>FT/PT Rate</th>
                <th style={thStyle}>Casual Rate</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 6).map(l => (
                <tr key={l.level}><td style={tdStyle}>Level {l.level}</td><td style={tdStyle}>{formatCurrency(l.ftRate)}/hr</td><td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Self-diagnosis */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Self-diagnosis &mdash; what level should you be?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Have you completed formal training</strong> (RSA, RMLV, food safety certificate, or equivalent)? &rarr; You should be at least <strong>Level 3</strong></li>
          <li><strong>Do you hold a Certificate III</strong> (e.g. Commercial Cookery, Hospitality)? &rarr; You should be at least <strong>Level 4</strong></li>
          <li><strong>Do you supervise other staff</strong>, manage shifts, or handle complaints? &rarr; You should be at least <strong>Level 5</strong></li>
        </ul>
        <p style={pStyle}>
          If any of these apply and your classification is lower, you may be owed back pay on every hour worked at the incorrect level.
        </p>
        <p style={pStyle}>
          Not sure which award you fall under? See the <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Restaurant Award pay rates guide</a> for the full rate table.
        </p>
      </section>

      {/* Common classification issues */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common classification issues</h2>

          <h3 style={h3Style}>Duties changed but classification didn&apos;t</h3>
          <p style={pStyle}>
            You started clearing tables but now you take orders, train new staff, and close the register. Your duties have moved up &mdash; but your pay hasn&apos;t. This is one of the most common underpayment scenarios.
          </p>

          <h3 style={h3Style}>Trade qualification but paid below Level 4</h3>
          <p style={pStyle}>
            If you hold a Certificate III and use it in your role, you must be at least Level 4. Many qualified cooks are paid at Level 2 or 3.
          </p>

          <h3 style={h3Style}>Supervisory duties at a non-supervisory rate</h3>
          <p style={pStyle}>
            If you run shifts, manage staff, or handle cash reconciliation, you&apos;re likely performing Level 5 duties. Being paid Level 2 or 3 for this work is underpayment.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and because classification affects your base rate, even a one-level error compounds across every penalty, overtime, and leave payment.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Related pages */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Related guides</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/overtime" style={linkStyle}>Restaurant Award overtime guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/casual-employees" style={linkStyle}>Restaurant Award casual employees guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/allowances" style={linkStyle}>Restaurant Award allowances guide &rarr;</a></li>
          <li><a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Full pay rates table &rarr;</a></li>
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
          Based on official pay rates from the Fair Work Commission (MA000119).
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Restaurant Industry Award 2020 (MA000119), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
