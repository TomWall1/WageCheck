/**
 * Fast Food Award Allowances content — /awards/fast-food-award/allowances
 * Rates: FWO pay guide MA000003 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getAllowanceAmount } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

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
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Can my employer refuse to pay allowances if they are not in my contract?', answer: 'No. Allowances are set by the award, not your contract. If the conditions are met (e.g. you work in a cold environment, you launder your own uniform), the allowance is owed regardless of what your contract says.' },
  { question: 'Do casual employees get allowances?', answer: 'Yes. Most allowances apply to casuals. Meal allowance, cold work allowance, laundry allowance, and vehicle allowance all apply to casual employees when the conditions are met.' },
  { question: 'Should allowances appear separately on my payslip?', answer: 'Yes. Employers must itemise allowances on payslips. If your allowances are bundled into a single hourly rate with no breakdown, you have no way of verifying they are actually being paid.' },
  { question: 'What if I use my own car for deliveries?', answer: 'You are entitled to {fmtVehicle} per kilometre for using your own vehicle for work purposes. If you are a delivery driver using your own car and not receiving this, you are owed money on every delivery run.' },
];

export default function FastFoodAllowancesContent({ rates }: { rates?: AwardRateData }) {
  const coldWork = rates ? getAllowanceAmount(rates, 'cold_work') : 0;
  const laundry = rates ? getAllowanceAmount(rates, 'laundry') : 0;
  const meal = rates ? getAllowanceAmount(rates, 'meal') : 0;
  const vehicle = rates ? getAllowanceAmount(rates, 'vehicle') : 0;
  const fmtCold = coldWork ? formatCurrency(coldWork) : '&mdash;';
  const fmtLaundry = laundry ? formatCurrency(laundry) : '&mdash;';
  const fmtMeal = meal ? formatCurrency(meal) : '&mdash;';
  const fmtVehicle = vehicle ? formatCurrency(vehicle) : '&mdash;';
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Allowances are extra payments on top of your base rate for specific conditions, skills, or expenses. Under the Fast Food Award, they are one of the most commonly missed entitlements after penalty rates. Many workers do not know they exist &mdash; and many employers do not pay them unless asked.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in cold rooms, launder your own uniform, use your own vehicle for deliveries, or work overtime without a meal break &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Delivery driver, Grade 2. Uses own car for deliveries. Works 5 shifts per week, averages 40km in deliveries per shift. Launders own uniform.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> Base rate only &mdash; no vehicle allowance, no laundry allowance</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong></p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Vehicle allowance: {fmtVehicle}/km &times; 40km &times; 5 shifts = {formatCurrency((vehicle || 0.99) * 40 * 5)}/week</li>
            <li>Laundry allowance: {fmtLaundry}/shift &times; 5 shifts = {formatCurrency((laundry || 1.25) * 5)}/week</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency((vehicle || 0.99) * 40 * 5 + (laundry || 1.25) * 5)}/week. ~{formatCurrency(((vehicle || 0.99) * 40 * 5 + (laundry || 1.25) * 5) * 52)}/year &mdash; just from missing allowances.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer never accounts for vehicle or laundry allowances. The driver assumes their hourly rate covers everything.
          </p>
        </div>
      </section>

      {/* Full allowance table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Fast Food Award allowances 2025 &mdash; full list</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Allowance</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Who it applies to</th>
                <th style={thStyle}>When it applies</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Cold work allowance</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{fmtCold}/hr</td><td style={tdStyle}>All employees</td><td style={tdStyle}>Working in a cold room or cold environment (0&deg;C to &minus;1&deg;C)</td></tr>
              <tr><td style={tdStyle}>District allowance</td><td style={tdStyle}>Varies by location</td><td style={tdStyle}>All employees</td><td style={tdStyle}>Working in specified remote or regional areas</td></tr>
              <tr><td style={tdStyle}>Laundry allowance</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{fmtLaundry}/shift</td><td style={tdStyle}>All employees</td><td style={tdStyle}>Required to wear a uniform and launder it yourself</td></tr>
              <tr><td style={tdStyle}>Meal allowance</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{fmtMeal}</td><td style={tdStyle}>All employees</td><td style={tdStyle}>Required to work overtime without a meal break provided</td></tr>
              <tr><td style={tdStyle}>Vehicle allowance</td><td style={{ ...tdStyle, fontWeight: 500, color: 'var(--secondary)' }}>{fmtVehicle}/km</td><td style={tdStyle}>All employees</td><td style={tdStyle}>Using own vehicle for work purposes (deliveries, errands)</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000003, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If you meet the conditions for any of these allowances and they are not on your payslip, you are likely being underpaid.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Cold work allowance detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Cold work allowance</h2>
        <p style={pStyle}>
          If you regularly enter or work in a cold room or freezer as part of your duties, you are entitled to {fmtCold} per hour for every hour spent in that environment. This applies even if you only spend part of a shift in cold conditions.
        </p>
        <p style={pStyle}>
          For a worker who spends 2 hours per shift in a cold room across 5 shifts per week, that is {formatCurrency((coldWork || 0.60) * 2 * 5)}/week or {formatCurrency((coldWork || 0.60) * 2 * 5 * 52)}/year. Not a huge amount on its own &mdash; but it adds up, and it is almost never paid.
        </p>
      </section>

      {/* Laundry allowance detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Laundry allowance</h2>
        <p style={pStyle}>
          If your employer requires you to wear a uniform and you are responsible for laundering it yourself, you are entitled to {fmtLaundry} per shift. Over a full-time week of 5 shifts, that is {formatCurrency((laundry || 1.25) * 5)}/week or {formatCurrency((laundry || 1.25) * 5 * 52)}/year.
        </p>
        <p style={pStyle}>
          If your employer provides laundry facilities or a laundry service, the allowance does not apply. But if you are washing your uniform at home &mdash; it does.
        </p>
      </section>

      {/* Meal allowance detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Meal allowance</h2>
        <p style={pStyle}>
          If you are required to work overtime and a meal break falls during that overtime period, you are entitled to a meal allowance of {fmtMeal}. This is a flat payment per occasion &mdash; not per hour.
        </p>
        <p style={pStyle}>
          This applies whether or not your employer provides food. If a free meal is offered during overtime, the allowance does not need to be paid. But if no meal is provided, the {fmtMeal} is owed.
        </p>
      </section>

      {/* Vehicle allowance detail */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Vehicle allowance</h2>
        <p style={pStyle}>
          If you use your own vehicle for work purposes &mdash; such as making deliveries or running errands &mdash; you are entitled to {fmtVehicle} per kilometre. This covers fuel, wear, insurance, and maintenance costs.
        </p>
        <p style={pStyle}>
          For delivery drivers, this can be one of the largest missed entitlements in the entire award. A driver averaging 40km of deliveries per shift across 5 shifts is owed $198/week in vehicle allowance alone &mdash; over $10,000/year.
        </p>
        <p style={pStyle}>
          If you are a delivery driver using your own car and not receiving this, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Common allowance underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common allowance issues</h2>

          <h3 style={h3Style}>Vehicle allowance missing for delivery drivers</h3>
          <p style={pStyle}>
            Delivery drivers who use their own vehicle are entitled to {fmtVehicle}/km. This is rarely paid unless the employee specifically asks. Many fast food outlets treat petrol money or a flat delivery fee as covering this &mdash; it often does not.
          </p>

          <h3 style={h3Style}>Laundry allowance not paid</h3>
          <p style={pStyle}>
            If you wash your own uniform at home, you are owed {fmtLaundry} per shift. Over a year, this adds up to {formatCurrency((laundry || 1.25) * 5 * 52)}+ for a full-time worker.
          </p>

          <h3 style={h3Style}>Cold work allowance missed</h3>
          <p style={pStyle}>
            Workers who regularly enter freezers or cold rooms during their shift are owed {fmtCold}/hr for that time. Most employers never account for this.
          </p>

          <h3 style={h3Style}>Meal allowance skipped on overtime</h3>
          <p style={pStyle}>
            If you work overtime and no meal is provided during the overtime period, you are owed {fmtMeal}. This is frequently missed on busy nights.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Related pages */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Related guides</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Fast Food Award penalty rates guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/overtime" style={linkStyle}>Fast Food Award overtime guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/casual-employees" style={linkStyle}>Fast Food Award casual employees guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/classifications" style={linkStyle}>Fast Food Award classifications guide &rarr;</a></li>
          <li><a href="/awards/fast-food-award/pay-rates" style={linkStyle}>Full pay rates table &rarr;</a></li>
        </ul>
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
          Not sure if you are being paid correctly? Check now.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including every allowance, penalty rate, and loading you are entitled to.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you will know for certain if you have been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000003).
        </p>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
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
