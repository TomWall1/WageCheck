import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import CheckPayCTA from '@/components/seo/CheckPayCTA';

interface Props { params: Promise<{ awardSlug: string }>; }

const h1Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
  letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
};
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
  { question: 'I do night audit \u2014 what level am I?', answer: 'Night audit involves independent front office operation, overnight responsibility, and financial reconciliation \u2014 typically Level 3. If you\u2019re classified at Level 2 doing night audit work, you\u2019re very likely underpaid.' },
  { question: 'Do housekeeping staff get penalty rates on Sundays?', answer: 'Yes. Every employee under the Hospitality Award \u2014 including housekeeping \u2014 is entitled to Saturday, Sunday, and public holiday penalty rates regardless of department.' },
  { question: 'My hotel pays the same rate every day \u2014 is that allowed?', answer: 'Only if that flat rate demonstrably exceeds all award entitlements including Sunday and public holiday rates. Without the calculation, there\u2019s no way to confirm compliance.' },
];

export function generateStaticParams() {
  return [{ awardSlug: 'hospitality-award' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  return {
    title: 'Hotel Worker Pay Rates Australia 2025\u201326 | Hospitality Award | Review My Pay',
    description: 'Pay rates for hotel workers \u2014 front office, housekeeping, concierge, and night audit. Check what you\u2019re owed under the Hospitality Award MA000009.',
  };
}

export default async function HotelWorkerPayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: 'Hotel Worker Pay Rates', href: `/awards/${awardSlug}/hotel-worker-pay-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={h1Style}>Hotel Worker Pay Rates Australia 2025&ndash;26</h1>

      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in a hotel and your rate looks the same on Sunday as it does on Tuesday, there&apos;s a high chance penalty rates aren&apos;t being applied. Hotel work spans a wide range of roles and levels, and misclassification is particularly common for staff who&apos;ve taken on expanded duties &mdash; night audit, duty management, front office supervision &mdash; without any formal reclassification.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in any capacity at a hotel, motel, resort, or accommodation venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Front office officer, Level 2, working a regular Sunday shift &mdash; 8 hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> $31.60/hr (casual base)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Casual Sunday rate at Level 2 &mdash; $44.24/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$101 per Sunday shift. ~$5,252/year working one Sunday per week.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Hotel sets one rate for the role and applies it every day. The Sunday multiplier is never calculated.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hotel worker pay rates 2025 &mdash; key roles</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Typical level</th>
                <th style={thStyle}>Permanent rate</th>
                <th style={thStyle}>Casual rate</th>
                <th style={thStyle}>Casual Sunday</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Housekeeping, basic porter</td><td style={tdStyle}>Level 1</td><td style={tdStyle}>$24.10/hr</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>$42.18/hr</td></tr>
              <tr><td style={tdStyle}>Front office, guest service</td><td style={tdStyle}>Level 2</td><td style={tdStyle}>$25.28/hr</td><td style={tdStyle}>$31.60/hr</td><td style={tdStyle}>$44.24/hr</td></tr>
              <tr><td style={tdStyle}>Front office supervisor, night audit</td><td style={tdStyle}>Level 3</td><td style={tdStyle}>$26.10/hr</td><td style={tdStyle}>$32.63/hr</td><td style={tdStyle}>$45.68/hr</td></tr>
              <tr><td style={tdStyle}>Front office manager, duty manager</td><td style={tdStyle}>Level 4</td><td style={tdStyle}>$27.32/hr</td><td style={tdStyle}>$34.15/hr</td><td style={tdStyle}>$47.81/hr</td></tr>
              <tr><td style={tdStyle}>Senior hotel manager</td><td style={tdStyle}>Level 5</td><td style={tdStyle}>$28.60/hr</td><td style={tdStyle}>$35.75/hr</td><td style={tdStyle}>$50.05/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If your classification doesn&apos;t reflect your actual duties, every penalty rate is also wrong. See the <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a>.
        </p>
        <p style={pStyle}>
          If your Sunday rate looks like your weekday rate, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for hotel workers</h2>

          <h3 style={h3Style}>Front office staff at Level 1 despite handling reservations and payments</h3>
          <p style={pStyle}>
            Checking guests in and out, processing payments, and handling guest issues without supervision is Level 2 work &mdash; not Level 1.
          </p>

          <h3 style={h3Style}>Night audit staff classified at Level 2</h3>
          <p style={pStyle}>
            Night audit involves running the front office independently overnight and completing financial reconciliations. That&apos;s Level 3 work. Many night auditors are paid at Level 2.
          </p>

          <h3 style={h3Style}>Weekend rates applied at permanent rates for casuals</h3>
          <p style={pStyle}>
            Casual hotel workers receive higher penalty rate multipliers than permanent staff on Sundays and public holidays. Being paid the permanent Sunday rate as a casual is underpayment.
          </p>

          <h3 style={h3Style}>Supervisory duties performed without supervisory classification</h3>
          <p style={pStyle}>
            Holding the keys and running the shift is Level 4 responsibility. Being given the responsibility without the pay is one of the most common issues in hotel operations.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If you do night audit and you&apos;re on Level 2 pay, check your shifts now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid.
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
        Rates sourced from the Fair Work Commission pay guide for MA000009, effective 1 July 2025. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
    </div>
  );
}
