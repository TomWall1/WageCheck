/**
 * Generic "Super Not Being Paid" scenario — works for any award.
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

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
}

export default function GenericScenarioSuperNotPaid({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const superRate = 0.115;

  const faqData = [
    { question: 'Is there a minimum earnings threshold for super?', answer: 'No. Since 1 July 2022, the $450 per month threshold was removed. Your employer must pay super on all ordinary time earnings regardless of how much you earn or how many hours you work. This applies to casuals, part-timers, and full-timers alike.' },
    { question: 'How do I check if my super is being paid?', answer: 'Log in to your super fund (or check your annual statement). Contributions should appear quarterly at minimum. You can also use the ATO\'s myGov portal to see all super accounts linked to your TFN. If you see gaps or no contributions at all, your employer is likely not paying.' },
    { question: 'What happens if I report my employer to the ATO?', answer: 'The ATO takes unpaid super seriously. They can issue a Superannuation Guarantee Charge (SGC) which includes the unpaid super, interest of 10% per annum, and an administration fee. Your employer cannot take adverse action against you for reporting — that is a separate breach of the Fair Work Act.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your employer is not paying super on your {awardName} earnings, they are breaking the law. Super is 11.5% of your ordinary time earnings with no minimum earnings threshold &mdash; every dollar you earn attracts super.{l1 && <> For a Level 1 full-time worker earning {formatCurrency(l1.ftRate)}/hr, that is {formatCurrency(l1.ftRate * 38 * superRate)} per week your employer should be putting into your super fund.</>} Report unpaid super to the ATO &mdash; it is free and confidential.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Superannuation Guarantee, employers must contribute 11.5% of each employee&apos;s ordinary time earnings to their nominated super fund. There is no minimum earnings threshold &mdash; this was removed on 1 July 2022. Super must be paid at least quarterly. Ordinary time earnings include your base rate, shift loadings, and casual loading, but generally exclude overtime. If your employer is not paying, you report it to the ATO (not the Fair Work Ombudsman &mdash; super is administered by the ATO).
        </p>
      </section>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Full-time Level 1 employee under the {awardName} earning {formatCurrency(l1.ftRate)}/hr for 38 hours per week. Their employer has not paid any super for 2 years.
            </p>
            <p style={pStyle}>
              <strong>Weekly super owed:</strong> {formatCurrency(l1.ftRate)} &times; 38 hrs &times; 11.5% = <strong>{formatCurrency(l1.ftRate * 38 * superRate)}</strong>
            </p>
            <p style={pStyle}>
              <strong>Annual super owed:</strong> {formatCurrency(l1.ftRate * 38 * superRate * 48)}
            </p>
            <p style={smallStyle}>
              Over 2 years: approximately <strong>{formatCurrency(l1.ftRate * 38 * superRate * 48 * 2)}</strong> in missing super. Plus the compound investment returns that money would have earned in the fund. The ATO will also charge the employer 10% interest and an administration fee on top.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Super contributions are listed on your payslip at 11.5% of ordinary time earnings</li>
          <li style={{ marginBottom: '6px' }}>Contributions actually appear in your super fund account (payslip alone is not proof of payment)</li>
          <li style={{ marginBottom: '6px' }}>There are no gaps in quarterly contributions when you check your super fund statement</li>
          <li style={{ marginBottom: '6px' }}>Your employer has your correct super fund details and TFN on file</li>
        </ul>
        <CheckPayCTA awardCode={awardCode} awardName={awardName} />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the {awardName} ({awardCode}), effective {rates?.effectiveDate || '1 July 2025'}. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
