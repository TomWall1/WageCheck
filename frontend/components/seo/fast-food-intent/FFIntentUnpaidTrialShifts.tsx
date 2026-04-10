/**
 * High-intent: Unpaid Trial Shifts in Fast Food — Are They Legal?
 * URL: /awards/fast-food-award/unpaid-trial-shifts
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
  { question: 'I did an unpaid trial last week — can I still get paid for it?', answer: 'Yes. You can recover wages for unpaid trial shifts going back up to 6 years. Contact the Fair Work Ombudsman (13 13 94) or use their online complaint form. Keep any text messages, emails, or roster screenshots that show you were asked to work.' },
  { question: 'They said it was only 2 hours — does that matter?', answer: 'No. Even a 1-hour trial must be paid if it involves productive work. The length does not determine whether payment is required — the nature of the work does. If you served customers, prepared food, cleaned, or did anything that benefited the business, you must be paid.' },
  { question: 'What if I agreed to work for free?', answer: 'Your agreement does not make it legal. You cannot agree to be paid below the award rate, and you cannot waive your right to be paid for work performed. An unpaid trial where you do productive work is a breach of the Fair Work Act regardless of what you agreed to.' },
  { question: 'Is a \"training shift\" the same as a trial shift?', answer: 'If you are performing work during a \"training shift\" — serving customers, making food, cleaning — it is work and must be paid. Genuine training that only involves observation or instruction (not productive work) is different, but this is rare in fast food. If you are on the floor doing tasks, you are working.' },
  { question: 'The manager said they\'ll pay me if I get the job. Is that okay?', answer: 'No. Payment for work is not conditional on being offered ongoing employment. If you worked a trial shift, you are owed wages for that shift whether or not you get the job. This is one of the most common tactics used to avoid paying trial shifts.' },
];

export default function FFIntentUnpaidTrialShifts({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;

  const g1Casual = g1 ? formatCurrency(g1.casualRate) : '&mdash;';
  const g1SundayCasual = g1 ? formatCurrency(g1.sundayCasual) : '&mdash;';
  const trialWeekday = g1 ? formatCurrency(g1.casualRate * 3) : '&mdash;';
  const trialSunday = g1 ? formatCurrency(g1.sundayCasual * 3) : '&mdash;';

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          You got asked to come in for a &quot;trial shift&quot; at a fast food outlet. You worked 3 hours on the floor making food, serving customers, and cleaning. They said they&apos;d let you know. You never got paid for those hours.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          That trial shift was almost certainly illegal. If you did productive work, you must be paid for it &mdash; full stop.
        </p>
      </section>

      {/* The law */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; What the law actually says</h2>
          <p style={pStyle}>
            Under the Fair Work Act, if a person performs work that benefits a business, an employment relationship exists and the person must be paid. A &quot;trial&quot; does not exempt the employer from this obligation.
          </p>
          <p style={pStyle}>
            The Fair Work Ombudsman&apos;s position is clear: unpaid work is only lawful when it is a genuine <strong>vocational placement</strong> as part of an education course, or the work is purely observational with no productive component. In fast food, trial shifts almost always involve productive work.
          </p>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            <strong>If you served a single customer, made a single meal, or cleaned a single surface &mdash; you were working and you must be paid.</strong>
          </p>
        </div>
      </section>

      {/* When a trial IS legal */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When a trial shift might be legal</h2>
        <p style={pStyle}>
          A genuine unpaid trial is extremely narrow. It would need to meet all of these conditions:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>The trial is short (the FWO suggests no more than 1 hour as a rough guide).</li>
          <li style={{ marginBottom: '8px' }}>You are only observing or demonstrating a specific skill &mdash; not performing productive work.</li>
          <li style={{ marginBottom: '8px' }}>The business does not benefit from your presence (no customers served, no tasks completed).</li>
          <li style={{ marginBottom: '8px' }}>You are supervised the entire time for assessment purposes.</li>
        </ul>
        <p style={pStyle}>
          In reality, almost no fast food trial shift meets these criteria. If you were placed on the floor and asked to do anything &mdash; you were working.
        </p>
      </section>

      {/* What you're owed */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What you&apos;re owed for an unpaid trial</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            If your trial shift was actually work, you are entitled to:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li style={{ marginBottom: '4px' }}>The applicable Fast Food Award rate for your age, grade, and employment type.</li>
            <li style={{ marginBottom: '4px' }}>Casual loading (25%) if no ongoing employment was established.</li>
            <li style={{ marginBottom: '4px' }}>Penalty rates if the trial was on a Sunday or public holiday.</li>
            <li style={{ marginBottom: '4px' }}>Minimum engagement &mdash; casuals must be paid for at least 3 hours even if the trial was shorter.</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Example: Adult casual, 3-hour weekday trial = 3 &times; {g1Casual} = {trialWeekday} owed.
          </p>
          <p style={smallStyle}>
            On a Sunday, that same trial would be worth 3 &times; {g1SundayCasual} = {trialSunday}.
          </p>
        </div>
      </section>

      {/* How to recover payment */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to recover payment for an unpaid trial shift</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Document everything.</strong> Save any text messages, emails, social media messages, or job ads that mention the trial. Note the date, start and end time, and what you were asked to do.</li>
          <li style={{ marginBottom: '8px' }}><strong>Ask the employer directly.</strong> A simple written request (&quot;I worked a trial shift on [date] and was not paid. Please pay me for those hours at the applicable award rate.&quot;) puts them on notice.</li>
          <li style={{ marginBottom: '8px' }}><strong>Contact Fair Work.</strong> Call 13 13 94 or lodge a complaint at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={linkStyle}>fairwork.gov.au</a>. The FWO takes unpaid trial shifts seriously, particularly in fast food and hospitality.</li>
          <li style={{ marginBottom: '8px' }}><strong>Small claims court.</strong> For amounts under $5,000, you can make a small claim without a lawyer. Community legal centres can help for free.</li>
        </ol>
      </section>

      {/* This happens a lot */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>This is widespread in fast food</h2>
        <p style={pStyle}>
          Unpaid trial shifts disproportionately affect young workers in their first job. You might feel like you can&apos;t push back because you need the job. But an employer who won&apos;t pay you for a trial shift is telling you something about how they&apos;ll treat you going forward.
        </p>
        <p style={pStyle}>
          The Fair Work Ombudsman has specifically targeted unpaid trials in the fast food sector. You are not alone in this, and you have every right to be paid.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
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
        Based on Fair Work Ombudsman guidance and the Fast Food Industry Award 2010 (MA000003). General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
