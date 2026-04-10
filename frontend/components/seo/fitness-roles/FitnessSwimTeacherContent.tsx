/**
 * Fitness Award — Swim Teacher role page
 * Rates: FWO pay guide MA000094
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Which award covers swim teachers in Australia?', answer: 'Swim teachers and swimming instructors employed at fitness centres, aquatic centres, swim schools, and leisure centres are generally covered by the Fitness Industry Award 2020 (MA000094). If you work at a council-operated aquatic centre, you may be covered by a different instrument — check with your employer or the Fair Work Ombudsman.' },
  { question: 'I only teach 30-minute lessons — am I paid for a full hour?', answer: 'You are paid for all time you are required to be at work, not just the time in the water. If you teach back-to-back 30-minute lessons, the time between lessons (setting up, transitioning groups) counts as work. If there is a gap where you are required to remain at the facility, that is also paid time. You cannot be paid only for "wet" time.' },
  { question: 'Do swim teachers get penalty rates for Saturday lessons?', answer: 'Yes. Saturday work under the Fitness Industry Award attracts penalty rates. This is particularly relevant for swim teachers because Saturday is one of the busiest days for swim schools. If your Saturday rate is the same as your weekday rate, the penalty is missing from your pay.' },
];

export default function FitnessSwimTeacherContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Swim teachers are among the most consistently underpaid workers under the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a>. The combination of short lesson blocks, split shift patterns (morning and after-school sessions), heavy weekend work, and the common practice of paying only for &ldquo;wet time&rdquo; means many swim teachers earn less than the award requires. If you teach swimming and your pay seems low, it probably is.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Swim teaching is skilled, qualified work. Your pay should reflect that &mdash; not the myth that it&apos;s &ldquo;just a few hours in the pool.&rdquo;
        </p>
        <p style={pStyle}>
          For the full Fitness Industry Award overview, see the <a href="/awards/fitness-award/" style={linkStyle}>Fitness Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual swim teacher, Cert IV in Swimming and Water Safety. Works 3pm&ndash;6pm weekdays and 8am&ndash;12pm Saturdays. Paid $28/hr for all shifts. Classified as Level 1.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> With a Cert IV, should be classified at a higher level &mdash; not Level 1. Base rate is too low.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> $28/hr on Saturday is the same as weekday &mdash; Saturday penalty rate is missing.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 3:</strong> Arrives 15 minutes before each shift to set up lane ropes and equipment. That setup time isn&apos;t paid.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 4:</strong> Works morning lessons on school holidays (9am&ndash;12pm) plus afternoon sessions (3pm&ndash;6pm) &mdash; split shift allowance not paid.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Four separate issues on one payslip. Combined: $60&ndash;$100+ per week underpaid.
          </p>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common underpayments for swim teachers</h2>

          <h3 style={h3Style}>Paid only for &ldquo;wet time&rdquo;</h3>
          <p style={pStyle}>
            Many swim schools pay teachers only for the time they&apos;re in the water with students. But setting up lane ropes, transitioning between groups, completing incident reports, attending meetings, and packing down are all work. If you&apos;re required to be there, you must be paid for it.
          </p>

          <h3 style={h3Style}>Saturday penalties missing</h3>
          <p style={pStyle}>
            Saturday is the busiest day for swim lessons. Under the Fitness Industry Award, Saturday work attracts a penalty loading. If you teach 4 hours of Saturday lessons and your rate is the same as a Tuesday, the penalty is missing.
          </p>

          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={pStyle}>
            Swim teachers with a Certificate IV in Swimming and Water Safety, AUSTSWIM accreditation, or equivalent should not be classified at the lowest level. Your qualifications and the responsibility of teaching water safety to children warrant a higher classification.
          </p>

          <h3 style={h3Style}>Split shift allowance during school holidays</h3>
          <p style={pStyle}>
            During school holidays, swim teachers often work morning and afternoon lesson blocks with a long break in between. This is a split shift, and the allowance must be paid for every day it occurs.
          </p>
        </div>
      </section>

      {/* Swim teacher pay rates */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Swim teacher pay rates &mdash; Fitness Award 2025&ndash;26</h2>
        <p style={pStyle}>
          Your minimum pay rate depends on your classification level. Swim teachers typically fall at Level 2 (qualified, delivering lessons under general supervision) or Level 3 (experienced, coordinating programs, assessing other teachers).
        </p>
        <p style={pStyle}>
          On top of the base rate, you&apos;re entitled to:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Casual loading (25%) if you&apos;re a casual employee</li>
          <li>Saturday penalty rates &mdash; critical for swim teachers who work every Saturday</li>
          <li>Sunday penalty rates</li>
          <li>Public holiday penalty rates</li>
          <li>Split shift allowance for broken shift days</li>
          <li>Overtime for hours beyond ordinary</li>
        </ul>
        <p style={pStyle}>
          Use the calculator below to see your exact entitlement based on your classification and shifts.
        </p>
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

      {/* Related guides */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/fitness-award/pay-rates" style={linkStyle}>Fitness Award pay rates</a> &middot; <a href="/awards/fitness-award/penalty-rates" style={linkStyle}>Fitness Award penalty rates</a> &middot; <a href="/awards/fitness-award/classifications" style={linkStyle}>Fitness Award classifications</a>
        </p>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; check exactly what you should be earning as a swim teacher.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000094).
        </p>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fitness Industry Award 2020 (MA000094), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
