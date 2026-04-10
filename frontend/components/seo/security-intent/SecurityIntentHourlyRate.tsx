/**
 * High-intent: Is My Security Pay Rate Legal?
 * URL: /awards/security-award/hourly-rate-security
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
  { question: 'What is the minimum hourly rate for a security guard in Australia?', answer: 'The minimum depends on your classification level and employment type under the Security Services Industry Award (MA000016). The base rate increases with each level, and casual employees receive a 25% casual loading on top. Your actual minimum also depends on when you work — night shifts, weekends, and public holidays all attract higher rates.' },
  { question: 'Does my security licence affect my pay rate?', answer: 'Yes. Your licence class and the type of security work you perform determine your classification level under the award. A crowd controller or bodyguard is classified differently from a static guard. Higher licence requirements generally correspond to higher classification levels and pay rates.' },
  { question: 'My rate is above the base award rate — can I still be underpaid?', answer: 'Absolutely. The base rate is only part of the picture. If you work nights, weekends, or public holidays, your employer must also pay the correct penalty rates on top of your base. An hourly rate that looks reasonable on paper can still leave you underpaid when penalties, overtime, and allowances are factored in.' },
];

export default function SecurityIntentHourlyRate({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000016
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Your security pay rate is set by the Security Services Industry Award (MA000016), not by your employer&apos;s discretion. The award sets minimum hourly rates based on your classification level, employment type (full-time, part-time, or casual), and when you work. Your employer can pay more than the award, but they cannot pay less.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The question isn&apos;t just &quot;is my base rate legal?&quot; &mdash; it&apos;s whether you&apos;re being paid the correct rate for every hour, including nights, weekends, and overtime.
        </p>
        <p style={pStyle}>
          For the full breakdown, see the <a href="/awards/security-award/" style={linkStyle}>Security Award pay guide</a>.
        </p>
      </section>

      {/* How your rate is determined */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How your rate is determined</h2>
        <p style={pStyle}>Your minimum hourly rate under the Security Award depends on three things:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Classification level:</strong> Security officers are classified into levels based on duties, qualifications, and licence type. A static guard is a different level from a crowd controller or patrol officer.</li>
          <li style={{ marginBottom: '6px' }}><strong>Employment type:</strong> Casuals receive a 25% loading on top of the base rate. Part-time employees get the same base rate as full-time but must receive penalty rates for any hours outside their agreed pattern.</li>
          <li style={{ marginBottom: '6px' }}><strong>When you work:</strong> Night shifts, Saturdays, Sundays, and public holidays all attract penalty rates that increase your minimum hourly rate significantly.</li>
        </ul>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2, works a Saturday night shift (10pm&ndash;6am).
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Base casual rate:</strong> The Level 2 base rate plus 25% casual loading applies for the Saturday hours. After midnight on Sunday, the Sunday casual rate kicks in &mdash; which is substantially higher.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Common mistake:</strong> The employer pays a single flat rate for the whole shift. But the shift crosses Saturday into Sunday, meaning two different penalty rate structures should apply. The post-midnight hours should be at the much higher Sunday casual rate.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Even a few hours at the wrong penalty rate adds up across every shift.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Is your classification level correct for the duties you actually perform?</li>
          <li style={{ marginBottom: '8px' }}>Does your base rate meet or exceed the award minimum for your level?</li>
          <li style={{ marginBottom: '8px' }}>Are penalty rates applied correctly for nights, weekends, and public holidays?</li>
          <li style={{ marginBottom: '8px' }}>If you&apos;re casual, is the 25% casual loading visible on your payslip?</li>
          <li style={{ marginBottom: '8px' }}>For shifts crossing midnight, are the hours after midnight paid at the correct next-day rate?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>Enter your shift times and see the exact legal minimum for every hour you worked.</p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Check every hour, not just the base rate.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000016).
        </p>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Security Services Industry Award 2020 (MA000016), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
