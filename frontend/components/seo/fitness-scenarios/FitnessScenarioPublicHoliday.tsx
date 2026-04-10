/**
 * Scenario: Worked a Public Holiday in the Fitness Industry
 * URL: /awards/fitness-award/scenarios/public-holiday
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
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Can my gym force me to work on a public holiday?', answer: 'An employer can request you work on a public holiday, but you can refuse if the request is unreasonable. Factors include the nature of the workplace, whether you were given reasonable notice, your personal circumstances, and whether you\'ll receive penalty rates. If you do work, you must be paid the public holiday rate.' },
  { question: 'Do casual fitness workers get public holiday rates?', answer: 'Yes. Casual employees who work on a public holiday are entitled to the public holiday penalty rate under the Fitness Industry Award. The casual loading does not replace or offset the public holiday penalty. You receive the public holiday rate applicable to casuals.' },
  { question: 'What if the public holiday falls on my regular rostered day off?', answer: 'If you\'re a permanent (full-time or part-time) employee and a public holiday falls on your regular rostered day, you\'re entitled to be paid for that day or receive a substitute day off, depending on the award provisions and any agreement with your employer.' },
];

export default function FitnessScenarioPublicHoliday({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const ftRate = l2?.ftRate ?? 28;
  const phFtRate = l2?.publicHolidayFt ?? 70;
  const normalPay = Math.round(ftRate * 5 * 100) / 100;
  const phPay = Math.round(phFtRate * 5 * 100) / 100;
  const underpayment = Math.round((phPay - normalPay) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Gyms open on public holidays. Classes still run. Members still come in. And fitness workers still show up &mdash; often without being paid the correct rate. Under the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a>, public holiday work attracts significantly higher penalty rates. If your payslip for a public holiday shift looks the same as any other day, you&apos;re being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Public holiday rates exist for a reason. Your gym being open doesn&apos;t make the penalty disappear.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fitness Industry Award requires employers to pay penalty rates for all hours worked on a public holiday. For full-time and part-time employees, the rate is typically <strong>250%</strong> (double time and a half) of the ordinary hourly rate. Casual employees receive the public holiday casual rate, which includes their casual loading.
        </p>
        <p style={pStyle}>
          Public holidays include all national public holidays (New Year&apos;s Day, Australia Day, Good Friday, Easter Saturday, Easter Monday, Anzac Day, Queen&apos;s/King&apos;s Birthday, Christmas Day, Boxing Day) plus state and territory-specific public holidays.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Part-time gym instructor works a 5-hour shift on Australia Day. Paid their normal part-time hourly rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> The entire 5-hour shift should be paid at the public holiday rate (250% of ordinary rate). If the ordinary rate is {formatCurrency(ftRate)}/hr, the public holiday rate is {formatCurrency(phFtRate)}/hr.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What actually happens:</strong> Employer pays {formatCurrency(ftRate)}/hr &times; 5 hours = {formatCurrency(normalPay)}.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What the worker is owed:</strong> {formatCurrency(phFtRate)}/hr &times; 5 hours = {formatCurrency(phPay)}.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(underpayment)} for a single public holiday shift.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip show a separate, higher rate for public holiday shifts?</li>
          <li>Is the public holiday rate at least 250% of your ordinary rate (for permanent employees)?</li>
          <li>Were you paid for the full shift at the public holiday rate, not just part of it?</li>
          <li>If you&apos;re casual, does your public holiday rate reflect both the penalty and casual loading?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
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

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
