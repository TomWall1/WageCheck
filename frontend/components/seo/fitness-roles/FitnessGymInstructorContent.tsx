/**
 * Fitness Award — Gym Instructor role page
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
  { question: 'What classification level is a gym instructor under the Fitness Award?', answer: 'It depends on your qualifications and duties. A gym instructor who holds a Certificate III in Fitness and delivers group classes or gym floor supervision would typically be Level 2. An instructor with a Certificate IV who designs programs, supervises other staff, or manages a facility area would typically be Level 3 or above. The key is matching your actual duties and qualifications to the classification descriptors in the award.' },
  { question: 'I teach group classes and also work the front desk — which rate applies?', answer: 'You should be classified and paid at the level that reflects the highest skill level you regularly use. If you spend part of your time instructing classes (a higher-level duty) and part on reception (a lower-level duty), you should be classified at the instructor level for all hours — not downgraded to a lower rate for front desk time.' },
  { question: 'Do I get paid for time between classes?', answer: 'If you are required to remain at the workplace between classes (e.g., for gym floor duties, admin tasks, or simply because your roster requires you to be there), that time must be paid. If you are free to leave and the gap exceeds the threshold for a split shift, a split shift allowance applies instead. Time you are required to be at work is time you must be paid for.' },
];

export default function FitnessGymInstructorContent({ rates }: { rates?: AwardRateData }) {
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
          Gym instructors are the backbone of the fitness industry &mdash; running group classes, supervising the gym floor, writing programs, and often handling reception duties on top. The <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> sets minimum pay rates for all of this work, but many gym instructors are underpaid because of split shifts that go uncompensated, classification levels that don&apos;t match their duties, and flat-rate arrangements that ignore penalty rates.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you run 6am classes and 6pm classes and your payslip looks the same as a 9&ndash;5 worker &mdash; something is missing.
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
            <strong>Scenario:</strong> Full-time gym instructor with a Cert III in Fitness. Works 6am&ndash;10am and 4pm&ndash;8pm, Monday to Friday. Classified as Level 1. Paid a flat hourly rate with no split shift allowance.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> With a Cert III and instructor duties, should be classified at Level 2 minimum &mdash; higher base rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> Works a split shift every day (6-hour unpaid gap). No split shift allowance paid &mdash; 5 allowances per week missing.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 3:</strong> Works 40 hours/week but only paid for 38 &mdash; 2 hours of overtime missing weekly.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Three overlapping errors: wrong classification, no split shift allowance, and unpaid overtime. Combined: $100+ per week.
          </p>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common underpayments for gym instructors</h2>

          <h3 style={h3Style}>Split shift allowance not paid</h3>
          <p style={pStyle}>
            The morning-and-evening pattern is standard for gym instructors. Every day you work a split shift, you&apos;re entitled to a split shift allowance. This is the single most commonly missed payment in fitness.
          </p>

          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={pStyle}>
            Gym instructors with a Certificate III or IV who deliver classes and supervise the gym floor are not Level 1 employees. If your employer has you at the lowest level despite your qualifications and duties, your base rate is too low.
          </p>

          <h3 style={h3Style}>Flat rate that ignores weekends</h3>
          <p style={pStyle}>
            Many gym instructors work Saturday mornings. The Saturday rate under the Fitness Industry Award is higher than the weekday rate. If your pay doesn&apos;t change on Saturdays, the penalty is missing.
          </p>

          <h3 style={h3Style}>Unpaid non-class time</h3>
          <p style={pStyle}>
            If you&apos;re required to be at the gym between classes (gym floor supervision, cleaning, admin), that&apos;s paid time. If you&apos;re only paid for class time, every minute between classes is unpaid work.
          </p>
        </div>
      </section>

      {/* Gym instructor pay rates */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Gym instructor pay rates &mdash; Fitness Award 2025&ndash;26</h2>
        <p style={pStyle}>
          Your minimum pay rate depends on your classification level. Gym instructors typically fall at Level 2 (Cert III, delivering classes under general direction) or Level 3 (Cert IV, program design, supervision responsibilities).
        </p>
        <p style={pStyle}>
          On top of the base rate, you&apos;re entitled to:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Casual loading (25%) if you&apos;re a casual employee</li>
          <li>Saturday penalty rates</li>
          <li>Sunday penalty rates</li>
          <li>Public holiday penalty rates</li>
          <li>Overtime at 150%/200% for hours beyond ordinary</li>
          <li>Split shift allowance for every broken shift day</li>
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

      {/* Related guides */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/fitness-award/pay-rates" style={linkStyle}>Fitness Award pay rates</a> &middot; <a href="/awards/fitness-award/penalty-rates" style={linkStyle}>Fitness Award penalty rates</a> &middot; <a href="/awards/fitness-award/classifications" style={linkStyle}>Fitness Award classifications</a>
        </p>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; check exactly what you should be earning as a gym instructor.
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
