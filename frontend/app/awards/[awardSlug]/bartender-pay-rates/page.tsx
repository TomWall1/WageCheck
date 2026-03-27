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
  { question: 'What rate applies when my shift crosses from Saturday into Sunday?', answer: 'From midnight, Sunday rates apply. Hours before midnight attract the Saturday rate; from midnight, the Sunday rate applies \u2014 plus the late-night loading on top.' },
  { question: 'Do I get the late-night loading on top of the Saturday rate?', answer: 'Yes. The loadings are additive. A Saturday shift running past midnight attracts the Sunday rate (from midnight) and the late-night loading simultaneously.' },
  { question: 'I\u2019m Level 2 but I train staff and manage the cellar \u2014 am I underpaid?', answer: 'Almost certainly. Training staff and managing cellar operations are Level 3 duties. Every penalty rate shift worked at Level 2 pay when Level 3 applies is underpayment.' },
];

export function generateStaticParams() {
  return [{ awardSlug: 'hospitality-award' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  return {
    title: 'Bartender Pay Rates Australia 2025\u201326 | Hospitality Award | Review My Pay',
    description: 'Bartender pay rates under the Hospitality Award \u2014 late night rates, Saturday and Sunday rates, and how to check if you\u2019ve been underpaid.',
  };
}

export default async function BartenderPayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: 'Bartender Pay Rates', href: `/awards/${awardSlug}/bartender-pay-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={h1Style}>Bartender Pay Rates Australia 2025&ndash;26</h1>

      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Bar shifts are heavily weighted toward evenings and weekends &mdash; exactly when penalty rates and late-night loadings apply. If you&apos;re paid the same rate every shift regardless of when it ends, there&apos;s a high chance multiple loadings have been silently missed. This page shows what each type of shift should pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work as a bartender, bar attendant, or bar supervisor in a pub, hotel, club, or bar &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual bartender, Level 2. 5-hour Friday night shift &mdash; 9pm to 2am.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> $31.60/hr flat for all 5 hours</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Evening loading (9pm&ndash;midnight) + late-night loading (midnight&ndash;2am) + Saturday rates from midnight</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$35&ndash;50 for that single shift
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays one casual rate for the whole shift. The rate should change at 7pm, midnight, and again when the day changes.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Bartender pay rates 2025 &mdash; Hospitality Award</h2>
        <p style={pStyle}>
          Bartenders are typically Level 2 or Level 3. Level 3 applies when you have specialist knowledge (cocktails, wine, cellar management) or supervise other bar staff.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Shift type</th>
                <th style={thStyle}>Level 2 casual</th>
                <th style={thStyle}>Level 3 casual</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Ordinary hours</td><td style={tdStyle}>$31.60/hr</td><td style={tdStyle}>$32.63/hr</td></tr>
              <tr><td style={tdStyle}>Evening (7pm&ndash;midnight)</td><td style={tdStyle}>~$34.07/hr</td><td style={tdStyle}>~$35.10/hr</td></tr>
              <tr><td style={tdStyle}>Late night (midnight&ndash;7am)</td><td style={tdStyle}>~$36.42/hr</td><td style={tdStyle}>~$37.45/hr</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>$37.92/hr</td><td style={tdStyle}>$39.15/hr</td></tr>
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>$44.24/hr</td><td style={tdStyle}>$45.68/hr</td></tr>
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>$56.88/hr</td><td style={tdStyle}>$58.73/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Evening and late-night rates are approximate &mdash; a flat loading ($2.47/hr evening, $4.82/hr late night) is added to the applicable casual rate. Rates based on MA000009 pay guide, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If your late-night rate looks identical to your afternoon rate, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for bartenders</h2>

          <h3 style={h3Style}>Single rate for the whole shift regardless of time</h3>
          <p style={pStyle}>
            Bar shifts regularly span multiple rate periods. Pre-7pm, 7pm&ndash;midnight, and midnight onwards each carry different rates. A $32/hr flat rate for a 9pm&ndash;2am shift ignores all of this.
          </p>

          <h3 style={h3Style}>Saturday rate continuing into Sunday</h3>
          <p style={pStyle}>
            From midnight, Sunday rates apply &mdash; even if your shift started Saturday. Many employers pay Saturday rates for the full overnight shift.
          </p>

          <h3 style={h3Style}>Level 2 instead of Level 3 for experienced bartenders</h3>
          <p style={pStyle}>
            Specialist knowledge of cocktails, wine service, or cellar management, or supervising junior bar staff, puts you at Level 3. The difference compounds on every late-night and weekend shift.
          </p>

          <h3 style={h3Style}>Late-night loading ignored entirely</h3>
          <p style={pStyle}>
            The loading for work after midnight is separate from any day or weekend rate. Shifts ending at 2am or 3am are frequently underpaid for the post-midnight portion.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
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
