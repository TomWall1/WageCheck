/**
 * Generic casual employees sub-page content — works for any award.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
}

export default function GenericCasualContent({ rates, awardCode, awardName, awardSlug }: Props) {
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';
  const l1 = rates?.levels?.[0];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>
      <p style={pStyle}>
        Casual employees under the {awardName} receive a 25% loading on top of the base hourly rate. This loading compensates for not receiving paid leave, notice of termination, and redundancy pay. The casual loading and penalty rates are separate entitlements &mdash; both apply.
      </p>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>What the 25% loading means in practice</h2>
          <p style={pStyle}>
            The Level 1 base rate is {formatCurrency(l1.ftRate)}/hr. With the 25% casual loading, the casual rate is {formatCurrency(l1.casualRate)}/hr. On a Sunday, the casual rate attracts the Sunday penalty multiplier on top &mdash; making the Sunday casual rate {formatCurrency(l1.sundayCasual)}/hr.
          </p>
          <p style={{ ...pStyle, fontWeight: 600 }}>
            If your Sunday rate is the same as your weekday rate, the penalty multiplier has not been applied.
          </p>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>Casual conversion rights</h2>
        <p style={pStyle}>
          Under the Fair Work Act, casual employees who have worked regular hours for at least 12 months may request conversion to permanent (full-time or part-time) employment. Employers must offer conversion to eligible casual employees, or provide written reasons for not doing so.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Do casual penalty rates stack?</h2>
        <p style={pStyle}>
          Casual penalty rate multipliers are applied to the casual base rate (which already includes the 25% loading). The loading does not replace or reduce penalty rates &mdash; they are completely separate entitlements.
        </p>
      </section>

      <p style={pStyle}>
        See also: <a href={`/awards/${awardSlug}/penalty-rates`} style={linkStyle}>Penalty rates</a> | <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>Full pay rate tables</a> | <a href="/guides/casual-loading-explained" style={linkStyle}>Casual loading explained</a>
      </p>

      <p style={smallStyle}>
        Source: <a href="https://www.fairwork.gov.au/employment-conditions/types-of-employees/casual-employees" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Ombudsman &mdash; casual employees</a>. Casual loading and conversion rights are set by the Fair Work Act 2009 and the {awardName}.
      </p>

      <CheckPayCTA awardCode={awardCode} awardName={awardName} />
    </>
  );
}
