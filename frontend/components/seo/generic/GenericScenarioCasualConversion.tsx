/**
 * Generic "Casual to Permanent Conversion" scenario — works for any award.
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

export default function GenericScenarioCasualConversion({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  const faqData = [
    { question: `Can I request to convert from casual to permanent under the ${awardName}?`, answer: `Yes. Under the Fair Work Act, if you have been employed as a casual for at least 12 months and have worked a regular pattern of hours for the last 6 months that could be performed as a part-time or full-time employee, you can notify your employer in writing that you wish to convert. Your employer must respond within 21 days.` },
    { question: 'Does my employer have to offer me permanent work?', answer: 'For employers with 15 or more employees, they must assess whether to offer conversion and provide a written response. They can only refuse on reasonable business grounds — such as the position ceasing to exist or the hours becoming irregular. Small business employers (fewer than 15 employees) are not required to make an offer but must respond to an employee\'s request.' },
    { question: 'Will I lose money if I convert from casual to permanent?', answer: 'You will lose the 25% casual loading, but you will gain paid annual leave (4 weeks), paid personal/carer\'s leave (10 days), and paid public holidays. For most workers doing regular hours, the leave entitlements are worth more than the casual loading over a full year.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you have been working as a casual under the {awardName} for 12 months or more with a regular pattern of hours, you may have the right to convert to permanent (part-time or full-time) employment. Your employer is required to either offer you conversion or provide written reasons for not doing so. This is not a favour &mdash; it is a legal entitlement under the Fair Work Act.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fair Work Act 2009, casual employees who have been employed for at least 12 months and have worked a regular pattern of hours in the last 6 months can request to convert to permanent employment. Employers with 15 or more employees must also proactively assess casual employees for conversion and make offers where appropriate. If the employer refuses, they must provide written reasons based on reasonable business grounds. You can also make a request yourself in writing at any time after 12 months.
        </p>
      </section>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Level 1 casual under the {awardName} works 30 hours per week on a regular roster for 14 months. They earn {formatCurrency(l1.casualRate)}/hr (including 25% casual loading).
            </p>
            <p style={pStyle}>
              <strong>As casual:</strong> {formatCurrency(l1.casualRate)}/hr &times; 30 hrs = {formatCurrency(l1.casualRate * 30)}/week ({formatCurrency(l1.casualRate * 30 * 48)}/year). No paid leave.
            </p>
            <p style={pStyle}>
              <strong>As permanent part-time:</strong> {formatCurrency(l1.ftRate)}/hr &times; 30 hrs = {formatCurrency(l1.ftRate * 30)}/week ({formatCurrency(l1.ftRate * 30 * 52)}/year). Plus 4 weeks paid annual leave ({formatCurrency(l1.ftRate * 30 * 4)}) and 10 days paid personal leave.
            </p>
            <p style={smallStyle}>
              The casual loading adds {formatCurrency((l1.casualRate - l1.ftRate) * 30 * 48)}/year, but annual leave alone is worth {formatCurrency(l1.ftRate * 30 * 4)} &mdash; plus you get sick leave, public holiday pay, and job security.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Confirm you are classified as casual (look for the 25% loading on your payslip)</li>
          <li style={{ marginBottom: '6px' }}>Review your roster history &mdash; have your hours been regular and predictable for 6+ months?</li>
          <li style={{ marginBottom: '6px' }}>Check whether your employer has sent you a written conversion offer (required for employers with 15+ staff)</li>
          <li style={{ marginBottom: '6px' }}>If you converted, verify the casual loading has been removed and leave entitlements are accruing</li>
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
