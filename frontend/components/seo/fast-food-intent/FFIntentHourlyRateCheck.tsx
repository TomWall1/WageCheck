/**
 * High-intent: Is My Fast Food Pay Rate Legal?
 * URL: /awards/fast-food-award/hourly-rate-check
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
  { question: 'Is $22/hr legal for fast food?', answer: 'It depends on your age. For an adult (21+), no — the minimum casual rate is $30.91/hr and the minimum base rate is $24.73/hr. For a 19-year-old casual, the minimum is $25.50/hr, so $22 is also below minimum. For a 17-year-old casual, the minimum is $17.87/hr, so $22 would be above minimum. Age, grade, and employment type all matter.' },
  { question: 'My employer says $25/hr is above minimum wage, so it\'s fine. Is it?', answer: 'The national minimum wage ($24.10/hr from 1 July 2025) is a floor that applies when no award covers you. Fast food workers are covered by the Fast Food Award, which sets higher minimums. A casual adult on Grade 1 must receive at least $30.91/hr. $25/hr is well below that.' },
  { question: 'Does my rate include super?', answer: 'No. Your hourly rate under the award is separate from superannuation. Super (currently 12%) is paid on top of your wages into your super fund. If your employer says your rate \"includes super,\" that is not how the award works — your hourly pay and super are separate entitlements.' },
  { question: 'I got a pay rise but I think it\'s still below the award. What do I do?', answer: 'Check the current rates for your age, grade, and employment type. Award rates increase each July. A pay rise that still leaves you below the award minimum is still underpayment.' },
];

export default function FFIntentHourlyRateCheck({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;

  const g1Ft = g1 ? formatCurrency(g1.ftRate) : '&mdash;';
  const g1Casual = g1 ? formatCurrency(g1.casualRate) : '&mdash;';
  const g2Ft = g2 ? formatCurrency(g2.ftRate) : '&mdash;';
  const g2Casual = g2 ? formatCurrency(g2.casualRate) : '&mdash;';
  const g1SundayFt = g1 ? formatCurrency(g1.sundayFt) : '&mdash;';
  const g1SundayCasual = g1 ? formatCurrency(g1.sundayCasual) : '&mdash;';
  const g2SundayFt = g2 ? formatCurrency(g2.sundayFt) : '&mdash;';
  const g2SundayCasual = g2 ? formatCurrency(g2.sundayCasual) : '&mdash;';
  const g1PhFt = g1 ? formatCurrency(g1.publicHolidayFt) : '&mdash;';
  const g1PhCasual = g1 ? formatCurrency(g1.publicHolidayCasual) : '&mdash;';
  const g2PhFt = g2 ? formatCurrency(g2.publicHolidayFt) : '&mdash;';
  const g2PhCasual = g2 ? formatCurrency(g2.publicHolidayCasual) : '&mdash;';

  // Walkthrough computed values
  const ftGap = g1 ? formatCurrency(g1.ftRate - 22) : '&mdash;';
  const casualGap = g1 ? formatCurrency(g1.casualRate - 22) : '&mdash;';
  const sundayCasualGap = g1 ? formatCurrency(g1.sundayCasual - 22) : '&mdash;';

  // Junior rates for 19 and 20 year old casuals
  const j19Casual = g1 ? formatCurrency(Math.round(g1.casualRate * 0.825 * 100) / 100) : '&mdash;';
  const j20Casual = g1 ? formatCurrency(Math.round(g1.casualRate * 0.977 * 100) / 100) : '&mdash;';

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          &quot;$22 an hour at fast food &mdash; is that right?&quot; We hear this constantly. The answer depends on your age, your grade, whether you&apos;re casual or permanent, and what day you&apos;re working. But in most cases, if you&apos;re an adult being paid $22/hr in fast food, you&apos;re being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The minimum hourly rate for an adult casual in fast food is {g1Casual}. Not $24. Not $25. Not $28.
        </p>
      </section>

      {/* What determines your rate */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Four things that determine your legal minimum rate</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Your age:</strong> Workers under 21 receive a percentage of the adult rate (from 36.8% for under 16 up to 97.7% for 20-year-olds). At 21, you get the full adult rate.</li>
          <li style={{ marginBottom: '8px' }}><strong>Your grade:</strong> Grade 1 is entry level ({g1Ft} base). Grade 2 applies once you operate equipment, handle cash, or prepare food without constant supervision ({g2Ft} base).</li>
          <li style={{ marginBottom: '8px' }}><strong>Casual or permanent:</strong> Casuals receive a 25% loading on top of the base rate (Grade 1 casual: {g1Casual}). Permanent workers get the base rate plus leave entitlements.</li>
          <li style={{ marginBottom: '8px' }}><strong>When you work:</strong> Sundays (150%/175%), public holidays (250%/275%), and late nights (15% loading after 10pm) all increase your rate.</li>
        </ol>
      </section>

      {/* Quick reference rate table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award minimum rates &mdash; quick reference</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--secondary)' }}>Rate type</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>Grade 1</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>Grade 2</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Base (FT/PT)', g1v: g1Ft, g2v: g2Ft },
                { label: 'Casual (weekday)', g1v: g1Casual, g2v: g2Casual },
                { label: 'Sunday (FT/PT)', g1v: g1SundayFt, g2v: g2SundayFt },
                { label: 'Sunday (casual)', g1v: g1SundayCasual, g2v: g2SundayCasual },
                { label: 'Public holiday (FT/PT)', g1v: g1PhFt, g2v: g2PhFt },
                { label: 'Public holiday (casual)', g1v: g1PhCasual, g2v: g2PhCasual },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{row.label}</td>
                  <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)' }}>{row.g1v}</td>
                  <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)' }}>{row.g2v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Adult rates shown. Junior rates are a percentage of these. See <a href="/awards/fast-food-award/junior-rates" style={linkStyle}>junior rate table</a>.
        </p>
      </section>

      {/* Walkthrough */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&quot;I&apos;m getting $22/hr at fast food&quot; &mdash; walkthrough</h2>
          <h3 style={h3Style}>If you&apos;re 21 or older (any employment type):</h3>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            $22/hr is below the Grade 1 base rate of {g1Ft}. You are being underpaid by at least {ftGap}/hr on every weekday shift. If you&apos;re casual, the gap is {casualGap}/hr. On Sundays, the gap widens to {sundayCasualGap}/hr for casuals.
          </p>
          <h3 style={h3Style}>If you&apos;re 19 or 20:</h3>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            At 19, the casual minimum is {j19Casual}/hr. At 20, it&apos;s {j20Casual}/hr. $22/hr is below minimum for both ages if you&apos;re casual.
          </p>
          <h3 style={h3Style}>If you&apos;re 18 or under:</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            $22/hr may be above your minimum base rate, but check whether penalty rates are being applied on Sundays and public holidays. Even if your base rate is correct, missing penalties can still mean underpayment.
          </p>
        </div>
      </section>

      {/* If below minimum */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; If your rate is below the award minimum</h2>
          <p style={pStyle}>
            You are owed the difference for every hour worked at the lower rate. This is not discretionary &mdash; the award rate is a legal minimum. Your employer must pay at least this amount, and you can recover the shortfall going back up to 6 years.
          </p>
          <p style={pStyle}>
            It does not matter whether you agreed to the rate, signed a contract, or were told &quot;that&apos;s the rate.&quot; An award rate cannot be undercut by agreement.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Check your exact rate now</h2>
        <p style={pStyle}>
          Enter your age, grade, employment type, and the shifts you worked. We&apos;ll tell you exactly what you should be earning &mdash; and whether there&apos;s a gap.
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
        Rates sourced from the Fair Work Commission pay guide for the Fast Food Industry Award 2010 (MA000003), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
