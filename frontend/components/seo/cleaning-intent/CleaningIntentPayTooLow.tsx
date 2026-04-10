/**
 * High-intent: My Cleaning Pay Seems Too Low
 * URL: /awards/cleaning-award/cleaning-pay-too-low
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
  { question: 'How do I know what classification level I should be?', answer: 'Level 1 is general cleaning — mopping, vacuuming, emptying bins, basic bathroom cleaning. Level 2 involves operating specialised equipment like floor polishers, carpet extraction machines, or doing window cleaning above ground level. Level 3 is for supervisors or team leaders who direct the work of other cleaners.' },
  { question: 'My employer says rates went up but my pay didn\'t change — is that legal?', answer: 'No. Award rates increase every 1 July. If your employer doesn\'t pass on the increase, they\'re paying you below the legal minimum from that date forward. This is one of the most common forms of underpayment in cleaning.' },
  { question: 'I only work 10 hours a week — do I still have award rights?', answer: 'Yes. The Cleaning Services Award applies regardless of how many hours you work. Part-time and casual cleaners have the same base rate entitlements as full-time workers. Part-time workers also get pro-rata leave entitlements.' },
];

export default function CleaningIntentPayTooLow({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your cleaning pay feels too low, trust that instinct. The cleaning industry is the most underpaid sector in Australia. Fair Work Ombudsman investigations consistently find that cleaning companies underpay workers &mdash; sometimes by a few dollars an hour, sometimes by half the legal rate.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Use this checklist to figure out exactly where the gap is.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The underpayment checklist</h2>
        <div style={exampleBoxStyle}>
          <ol style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '8px' }}><strong>Base rate check:</strong> Is your hourly rate at least {l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr (permanent) or {l1 ? formatCurrency(l1.casualRate) : '&mdash;'}/hr (casual) for Level 1? Higher for Level 2 and 3.</li>
            <li style={{ marginBottom: '8px' }}><strong>Penalty rate check:</strong> Are you paid extra for Saturdays (1.5&times;), Sundays (2&times;), and public holidays (2.5&times;)?</li>
            <li style={{ marginBottom: '8px' }}><strong>Overtime check:</strong> After 38 hours/week or 7.6 hours/day, are you paid at 1.5&times; then 2&times;?</li>
            <li style={{ marginBottom: '8px' }}><strong>Superannuation check:</strong> Is your employer paying 12% super into a fund? Check your super statement.</li>
            <li style={{ marginBottom: '8px' }}><strong>Payslip check:</strong> Do you receive a payslip within 1 business day of being paid?</li>
            <li style={{ marginBottom: '8px' }}><strong>Classification check:</strong> Does your level match your actual duties, not just what you were hired for?</li>
            <li style={{ marginBottom: '8px' }}><strong>Minimum hours check:</strong> Are you getting at least 3 hours per shift (casual) or your agreed hours (part-time)?</li>
          </ol>
        </div>
        <p style={pStyle}>
          If you answered &quot;no&quot; to even one of these, you are being underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The most common gaps</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Missing penalty rates</strong> &mdash; cleaners who work weekends at weekday rates lose $50&ndash;$150 per weekend shift</li>
          <li style={{ marginBottom: '6px' }}><strong>No casual loading</strong> &mdash; casual cleaners paid the same as permanent workers are underpaid by 25%</li>
          <li style={{ marginBottom: '6px' }}><strong>No super</strong> &mdash; 12% of your pay that should be going into retirement, isn&apos;t</li>
          <li style={{ marginBottom: '6px' }}><strong>Rate not updated</strong> &mdash; award rates increase every July; if yours didn&apos;t, you&apos;re behind</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do next</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Run the calculator below with your actual hours and shifts</li>
          <li style={{ marginBottom: '8px' }}>Compare the result to what you actually receive</li>
          <li style={{ marginBottom: '8px' }}>If there&apos;s a gap, raise it with your employer or call Fair Work on 13 13 94</li>
        </ol>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>If something feels wrong, it probably is. Check it now.</p>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Cleaning Services Award 2020 (MA000022), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
