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
  { question: 'I work at a standalone caf\u00e9 \u2014 does this award apply?', answer: 'Possibly not. Standalone cafes not connected to a hotel or accommodation may be covered by the Restaurant Industry Award (MA000119) instead. Check using the Fair Work Award Finder.' },
  { question: 'Do I get the split shift allowance as a casual?', answer: 'No \u2014 that allowance is for permanent and part-time employees only. Casuals receive their ordinary casual rate for each working period.' },
  { question: 'Can my employer apply a flat rate that covers everything?', answer: 'Only if they can prove it exceeds every award entitlement across every shift pattern including public holidays. Most can\u2019t.' },
];

export function generateStaticParams() {
  return [{ awardSlug: 'hospitality-award' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  return {
    title: 'Waitstaff Pay Rates Australia 2025\u201326 | Hospitality Award | Review My Pay',
    description: 'Current pay rates for waitstaff under the Hospitality Award \u2014 casual, weekend, and evening rates. Check if you\u2019re being paid correctly.',
  };
}

export default async function WaitstaffPayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: 'Waitstaff Pay Rates', href: `/awards/${awardSlug}/waitstaff-pay-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={h1Style}>Waitstaff Pay Rates Australia 2025&ndash;26</h1>

      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work as waitstaff in Australia, there&apos;s a high chance your weekend rates aren&apos;t applied correctly. A flat hourly rate for every shift &mdash; weekday, Saturday, Sunday &mdash; is one of the most frequently used underpayment tactics in the industry. This page shows exactly what you&apos;re owed.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work as waitstaff, a food and beverage attendant, or a floor attendant in any hospitality venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual waitstaff, Level 2. 6-hour Saturday evening shift &mdash; 5pm to 11pm.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> $31.60/hr flat</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Saturday casual rate ($37.92/hr) + evening loading after 7pm (+$2.47/hr)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$40&ndash;60 for that single shift
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays one casual rate every day. Weekend multipliers and evening loadings are never applied.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Waitstaff pay rates 2025 &mdash; Hospitality Award</h2>
        <p style={pStyle}>
          Most waitstaff are classified at Level 2 or Level 3. If you supervise other staff, train new employees, or handle complex customer situations independently &mdash; Level 3 applies.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Ordinary (casual)</th>
                <th style={thStyle}>Saturday</th>
                <th style={thStyle}>Sunday</th>
                <th style={thStyle}>Public holiday</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>$31.60/hr</td><td style={tdStyle}>$37.92/hr</td><td style={tdStyle}>$44.24/hr</td><td style={tdStyle}>$56.88/hr</td></tr>
              <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>$32.63/hr</td><td style={tdStyle}>$39.15/hr</td><td style={tdStyle}>$45.68/hr</td><td style={tdStyle}>$58.73/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates are casual. Permanent rates differ &mdash; see the <a href="/awards/hospitality-award/pay-rates" style={linkStyle}>full pay rates table</a>. Based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If your Sunday pay looks similar to a Tuesday, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for waitstaff</h2>

          <h3 style={h3Style}>Same rate every day of the week</h3>
          <p style={pStyle}>
            Sunday casual should be $44.24/hr at Level 2. A flat $31/hr or $32/hr on a Sunday is significantly underpaid.
          </p>

          <h3 style={h3Style}>Split shift allowance never paid</h3>
          <p style={pStyle}>
            Working lunch and dinner service with a break between? If that break exceeds 2 hours, a split shift allowance applies on top of your hourly rate &mdash; for permanent and part-time staff. Most waitstaff never see it. See the <a href="/awards/hospitality-award/allowances" style={linkStyle}>Hospitality Award allowances guide</a>.
          </p>

          <h3 style={h3Style}>Evening loading missed on late shifts</h3>
          <p style={pStyle}>
            Shifts running after 7pm attract an extra per-hour loading. This applies in addition to any Saturday or Sunday rate. A 9pm Saturday finish attracts both.
          </p>

          <h3 style={h3Style}>Classified at Level 2 when Level 3 duties are performed</h3>
          <p style={pStyle}>
            Training junior staff, running sections, handling complaints independently &mdash; these are Level 3 duties. The difference compounds on every penalty shift.
          </p>

          <h3 style={h3Style}>Tips assumed to cover entitlements</h3>
          <p style={pStyle}>
            Tips cannot offset award obligations. Your minimum rate applies regardless of tipping. See the <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a>.
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
