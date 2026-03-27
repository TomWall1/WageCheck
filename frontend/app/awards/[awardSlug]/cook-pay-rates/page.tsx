import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getHospitalityRates, getLevel } from '@/lib/hospitality-rates';
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
  { question: 'I hold a trade qualification but I\u2019m still on Cook Grade 1 \u2014 is that right?', answer: 'Almost certainly not. A Certificate III in Commercial Cookery or equivalent is a key indicator for Cook Grade 3. Holding the qualification while being paid at Grade 1 is a strong sign of misclassification.' },
  { question: 'My employer says chefs are on a salary that covers everything \u2014 is that valid?', answer: 'Only if the salary genuinely exceeds all award obligations every week \u2014 including Sunday rates, public holiday rates, and overtime. In practice, many salaried chefs are owed significant back pay when peak-period weeks are calculated.' },
];

export function generateStaticParams() {
  return [{ awardSlug: 'hospitality-award' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  return {
    title: 'Cook Pay Rates Australia 2025\u201326 | Hospitality Award | Review My Pay',
    description: 'Cook and chef pay rates under the Hospitality Award \u2014 grade levels, Sunday rates, and the most common underpayments in commercial kitchens.',
  };
}

export default async function CookPayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const rates = await getHospitalityRates();
  const l2 = getLevel(rates, 2);
  const l3 = getLevel(rates, 3);
  const l4 = getLevel(rates, 4);
  const l5 = getLevel(rates, 5);

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: 'Cook Pay Rates', href: `/awards/${awardSlug}/cook-pay-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={h1Style}>Cook Pay Rates Australia 2025&ndash;26</h1>

      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work as a cook or chef in a venue covered by the Hospitality Award, there&apos;s a high chance your classification is too low or your Sunday and overtime rates aren&apos;t being applied. Kitchen staff are consistently among the most underpaid workers in hospitality &mdash; often because the hours are long, the pace is relentless, and no one checks the payslip.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work as a cook, chef, or kitchen supervisor in any hotel, pub, club, or function venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time Cook Grade 3, Level 4. Works a 10-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l4?.ftRate ?? 0)}/hr for all 10 hours</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday permanent rate at Level 4 &mdash; {formatCurrency(l4?.sundayFt ?? 0)}/hr for ordinary Sunday hours; overtime rate for hours beyond 10</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$136 for that single shift
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the flat base rate 7 days a week and never accounts for the Sunday multiplier.
          </p>
        </div>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Cook pay rates 2025 &mdash; by grade</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Cook grade</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Permanent rate</th>
                <th style={thStyle}>Casual rate</th>
                <th style={thStyle}>Casual Sunday</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Cook Grade 1 / Kitchen Attendant</td><td style={tdStyle}>Level 2</td><td style={tdStyle}>{formatCurrency(l2?.ftRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l2?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l2?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Cook Grade 2 / Senior Cook</td><td style={tdStyle}>Level 3</td><td style={tdStyle}>{formatCurrency(l3?.ftRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l3?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Cook Grade 3 / Sous Chef</td><td style={tdStyle}>Level 4</td><td style={tdStyle}>{formatCurrency(l4?.ftRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l4?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l4?.sundayCasual ?? 0)}/hr</td></tr>
              <tr><td style={tdStyle}>Cook Grade 4&ndash;5 / Head Chef</td><td style={tdStyle}>Level 5</td><td style={tdStyle}>{formatCurrency(l5?.ftRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l5?.casualRate ?? 0)}/hr</td><td style={tdStyle}>{formatCurrency(l5?.sundayCasual ?? 0)}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Ask yourself: are you running a section, supervising kitchen hands, or contributing to menu planning? If yes, Cook Grade 3 (Level 4) may apply regardless of your current title.
        </p>
        <p style={pStyle}>
          If your current rate doesn&apos;t match the table above, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common underpayments for cooks</h2>

          <h3 style={h3Style}>Classified at Cook Grade 2 while doing Cook Grade 3 work</h3>
          <p style={pStyle}>
            Running a section, supervising junior staff, and contributing to menu planning are Cook Grade 3 indicators. The base rate difference is over $1/hr &mdash; and every Sunday penalty is calculated from that wrong base.
          </p>

          <h3 style={h3Style}>No overtime applied on long shifts</h3>
          <p style={pStyle}>
            Daily overtime triggers after 10 hours. A 12-hour shift contains 2 hours of overtime. Many employers pay a flat rate regardless of shift length. See the <a href="/awards/hospitality-award/overtime" style={linkStyle}>Hospitality Award overtime guide</a>.
          </p>

          <h3 style={h3Style}>Tool allowance never paid</h3>
          <p style={pStyle}>
            Cooks required to bring their own knives are owed $2.03/day. Over a full year: $507+ that most never receive. See the <a href="/awards/hospitality-award/allowances" style={linkStyle}>Hospitality Award allowances guide</a>.
          </p>

          <h3 style={h3Style}>Meal allowance missed on extended shifts</h3>
          <p style={pStyle}>
            Unplanned overtime spanning a meal time = $16.73 meal allowance. Common during events and busy services. Rarely paid.
          </p>

          <h3 style={h3Style}>Sunday rates applied at permanent rate for casuals</h3>
          <p style={pStyle}>
            Casual Cook Grade 2 Sunday rate is {formatCurrency(l3?.sundayCasual ?? 0)}/hr &mdash; not the permanent rate of {formatCurrency(l3?.sundayFt ?? 0)}/hr. Receiving permanent Sunday rates as a casual is underpayment.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If you&apos;re doing Grade 3 work at Grade 2 pay, check your shifts now.
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
