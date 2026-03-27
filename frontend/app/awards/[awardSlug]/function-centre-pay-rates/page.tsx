import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getHospitalityRates, getLevel, getEveningLoading, getNightLoading } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';
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
  { question: 'Does the Hospitality Award cover all function centres?', answer: 'Most function centres connected to a hotel or accommodation venue are covered. Standalone event venues may fall under the Hospitality Award or the Restaurant Award depending on their primary business.' },
  { question: 'My employer quotes an "all-in event rate" \u2014 is that legal?', answer: 'It can be \u2014 but only if that rate demonstrably exceeds all award entitlements across every possible shift scenario including late Saturday nights and public holidays. Without the calculation, there\u2019s no way to confirm this.' },
  { question: 'I work for a catering company \u2014 does this award apply?', answer: 'Probably yes, if hospitality services are the company\u2019s core business. Check your contract or ask your employer which award applies.' },
];

export function generateStaticParams() {
  return [{ awardSlug: 'hospitality-award' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  return {
    title: 'Function Centre Worker Pay Rates 2025\u201326 | Hospitality Award | Review My Pay',
    description: 'Pay rates for function and events staff under the Hospitality Award \u2014 casual rates, late finish loadings, and the most common underpayments at events.',
  };
}

export default async function FunctionCentrePayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const rates = await getHospitalityRates();
  const l2 = getLevel(rates, 2);
  const l3 = getLevel(rates, 3);
  const eveningLoading = getEveningLoading(rates);
  const nightLoading = getNightLoading(rates);

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: 'Function Centre Pay Rates', href: `/awards/${awardSlug}/function-centre-pay-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={h1Style}>Function Centre Worker Pay Rates 2025&ndash;26</h1>

      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Function work is casual-heavy, often runs on weekends and late into the night, and involves exactly the conditions where underpayment is most common and least visible. If you work events, the single flat &quot;event rate&quot; you&apos;re being paid is often applied regardless of what day it is or what time the event finishes. This page shows what each type of function shift should actually pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work at events, weddings, conferences, or functions at a hotel venue or function centre &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual function attendant, Level 2. Saturday wedding &mdash; 4-hour setup, 3-hour break, 5-hour service finishing at midnight.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l2?.casualRate ?? 0)}/hr flat for all 9 working hours</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Saturday casual rate ({formatCurrency(l2?.saturdayCasual ?? 0)}/hr) for all working hours + evening loading after 7pm</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$70&ndash;90 for that single event
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer quotes a flat &quot;event rate.&quot; Worker has no reference point to check it against.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Function centre casual pay rates 2025</h2>
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
              <tr><td style={tdStyle}>Ordinary weekday</td><td style={tdStyle}>{formatCurrency(l2?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.casualRate ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>{formatCurrency(l2?.saturdayCasual ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.saturdayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>{formatCurrency(l2?.sundayCasual ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>{formatCurrency(l2?.publicHolidayCasual ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.publicHolidayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Evening loading (7pm&ndash;midnight)</td><td style={tdStyle}>+{formatCurrency(eveningLoading)}/hr</td><td style={tdStyle}>+{formatCurrency(eveningLoading)}/hr</td></tr>
              <tr><td style={tdStyle}>Late night (midnight&ndash;7am)</td><td style={tdStyle}>+{formatCurrency(nightLoading)}/hr</td><td style={tdStyle}>+{formatCurrency(nightLoading)}/hr</td></tr>
              <tr><td style={tdStyle}>Minimum per shift</td><td style={tdStyle}>3 hours</td><td style={tdStyle}>3 hours</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025. Evening/late-night loadings stack on top of the applicable day rate.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If your event rate doesn&apos;t change on Saturdays and Sundays, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for function staff</h2>

          <h3 style={h3Style}>Flat &quot;event rate&quot; regardless of day</h3>
          <p style={pStyle}>
            Saturday, Sunday, and public holiday penalty rates apply to function work exactly as they do to regular shifts. A $35/hr &quot;event rate&quot; might cover a weekday but falls short on a Sunday or public holiday.
          </p>

          <h3 style={h3Style}>Setup and pack-down time not paid</h3>
          <p style={pStyle}>
            If you&apos;re required to set up before the event or pack down after, that time is working time and must be paid. Paying only for &quot;service hours&quot; is often underpayment.
          </p>

          <h3 style={h3Style}>Evening and late-night loadings missing</h3>
          <p style={pStyle}>
            Functions regularly run past 7pm and midnight. Each threshold attracts an additional loading on top of the day rate. Shifts ending at 1am or 2am that pay a single flat rate are frequently underpaid.
          </p>

          <h3 style={h3Style}>Minimum engagement not honoured</h3>
          <p style={pStyle}>
            If an event ends early, you&apos;re still owed 3 hours&apos; pay. Many function workers are sent home after 2 hours and paid only for time worked.
          </p>

          <h3 style={h3Style}>Incorrect rate when shift crosses midnight</h3>
          <p style={pStyle}>
            From midnight, Sunday rates apply &mdash; regardless of when the shift started. A Saturday evening event running past midnight should switch to Sunday rates at 12am.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If you&apos;re on site but not being paid for setup or pack-down, check your pay now.
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
