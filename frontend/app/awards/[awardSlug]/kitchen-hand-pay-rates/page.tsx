import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getHospitalityRates, getLevel, getEveningLoading } from '@/lib/hospitality-rates';
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
  { question: 'I\u2019m being paid cash \u2014 does the award still apply?', answer: 'Yes. The payment method doesn\u2019t change your entitlements. You are owed the minimum rates, penalty rates, and superannuation regardless of how you\u2019re paid.' },
  { question: 'My employer says kitchen hands don\u2019t get penalty rates \u2014 is that right?', answer: 'No \u2014 and that claim is wrong. If you\u2019ve been told this, there\u2019s a strong chance your pay is incorrect. Kitchen hands are entitled to full penalty rates under the Hospitality Award.' },
  { question: 'I haven\u2019t been given a payslip \u2014 is that legal?', answer: 'No. Employers must issue a payslip within one working day of every pay period. Not receiving them is a compliance issue you can raise directly with the Fair Work Ombudsman.' },
];

export function generateStaticParams() {
  return [{ awardSlug: 'hospitality-award' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  return {
    title: 'Kitchen Hand Pay Rates Australia 2025\u201326 | Hospitality Award | Review My Pay',
    description: 'Minimum pay rates for kitchen hands under the Hospitality Award \u2014 weekends, public holidays, and the most common underpayments in the role.',
  };
}

export default async function KitchenHandPayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const rates = await getHospitalityRates();
  const l1 = getLevel(rates, 1);
  const eveningLoading = getEveningLoading(rates);

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: 'Kitchen Hand Pay Rates', href: `/awards/${awardSlug}/kitchen-hand-pay-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={h1Style}>Kitchen Hand Pay Rates Australia 2025&ndash;26</h1>

      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Kitchen hands are the most frequently underpaid workers in Australian hospitality. The role attracts people new to the workforce who are least likely to know their rights &mdash; and most likely to accept whatever they&apos;re paid. If you work as a kitchen hand, there&apos;s a high chance your weekend rates, your minimum engagement, or your super aren&apos;t right.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work as a kitchen hand, kitchen assistant, or dishwasher in any hospitality venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual kitchen hand, Level 1. 4-hour public holiday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l1?.casualRate ?? 0)}/hr (ordinary casual rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Public holiday casual rate at Level 1 &mdash; {formatCurrency(l1?.publicHolidayCasual ?? 0)}/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$96 for one 4-hour shift
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Same rate every day. Worker doesn&apos;t know public holidays attract a different rate. Over a year of public holiday shifts, the total is hundreds.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Kitchen hand pay rates 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Shift type</th>
                <th style={thStyle}>Permanent</th>
                <th style={thStyle}>Casual</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Ordinary weekday</td><td style={tdStyle}>{formatCurrency(l1?.ftRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l1?.casualRate ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>{formatCurrency(l1?.saturdayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l1?.saturdayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>{formatCurrency(l1?.sundayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l1?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>{formatCurrency(l1?.publicHolidayFt ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l1?.publicHolidayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Evening (after 7pm)</td><td style={tdStyle}>{formatCurrency((l1?.ftRate ?? 0) + eveningLoading)}/hr</td><td style={tdStyle}>{formatCurrency((l1?.casualRate ?? 0) + eveningLoading)}/hr</td></tr>
              <tr><td style={tdStyle}>Minimum per shift</td><td style={tdStyle}>3 hours</td><td style={tdStyle}>3 hours</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025. Casual rates include 25% loading.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If your Sunday or public holiday rate matches your weekday rate, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for kitchen hands</h2>

          <h3 style={h3Style}>Same rate every day regardless of day</h3>
          <p style={pStyle}>
            A kitchen hand paid $25/hr on a Sunday is being significantly underpaid. The casual Sunday rate is {formatCurrency(l1?.sundayCasual ?? 0)}/hr &mdash; over 40% more than the ordinary weekday rate. This is the most frequent issue in this role.
          </p>

          <h3 style={h3Style}>Minimum engagement not honoured</h3>
          <p style={pStyle}>
            Sent home after 2 hours? You&apos;re legally entitled to 3 hours&apos; pay regardless. Many kitchen hands accept less without knowing they&apos;re owed more.
          </p>

          <h3 style={h3Style}>Cash in hand with no payslip</h3>
          <p style={pStyle}>
            Cash payment isn&apos;t illegal &mdash; but you&apos;re still entitled to the award rate, a payslip, and superannuation. Being paid cash does not allow an employer to pay below the award.
          </p>

          <h3 style={h3Style}>No super paid</h3>
          <p style={pStyle}>
            Since November 2022 there&apos;s no minimum earnings threshold for super. If super isn&apos;t on your payslip, it may not be being paid.
          </p>

          <h3 style={h3Style}>Introductory rate kept beyond 3 months</h3>
          <p style={pStyle}>
            The introductory rate applies for the first 3 months in the industry only. After that, at least Level 1 must apply.
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
