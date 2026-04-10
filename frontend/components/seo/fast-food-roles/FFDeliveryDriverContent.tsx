/**
 * Fast Food Award — Delivery Driver Pay Rates role page
 * URL: /awards/fast-food-award/delivery-driver-pay-rates
 * Award: MA000003
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Does the Fast Food Award apply to Uber Eats or DoorDash drivers?', answer: 'No. Gig economy drivers are typically classified as independent contractors, not employees. The Fast Food Award covers delivery drivers who are directly employed by a fast food business. If you are on the payroll of a pizza shop, burger chain, or similar business and deliver their food, the award applies to you.' },
  { question: 'How much is the vehicle allowance?', answer: 'The vehicle allowance is $0.99 per kilometre when you use your own car for deliveries. This is separate from your hourly rate and must be paid on top. If your employer is not tracking or reimbursing your kilometres, you are likely owed money.' },
  { question: 'Am I Grade 1 or Grade 2 as a delivery driver?', answer: 'New delivery drivers typically start at Grade 1. Once you have completed relevant training or gained enough experience to work with limited supervision, you should be Grade 2. Most drivers who have been in the role for more than a few months should be Grade 2.' },
];

export default function FFDeliveryDriverContent({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&rsquo;re employed directly by a fast food business to deliver food, you&rsquo;re covered by the Fast Food Industry Award &mdash; not gig economy rules. That means you get a guaranteed hourly rate, penalty rates on weekends and public holidays, and a vehicle allowance of $0.99 per kilometre if you use your own car.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your employer is paying you per delivery instead of per hour, or not reimbursing your vehicle costs, you have a problem.
        </p>
        <p style={pStyle}>
          For the full award overview, see the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay guide</a>.
        </p>
      </section>

      {/* Gig vs employed */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Employed driver vs gig economy driver</h2>
        <p style={pStyle}>
          This is an important distinction. If you are on the payroll of a pizza shop, burger chain, or any fast food outlet &mdash; receiving payslips, having tax withheld, and working set shifts &mdash; you are an employee and the Fast Food Award applies. You get hourly pay, penalty rates, superannuation, and vehicle allowances.
        </p>
        <p style={pStyle}>
          Gig drivers working through platforms like Uber Eats, DoorDash, or Menulog are generally classified as independent contractors. They do not have award coverage. However, if your employer is telling you that you&rsquo;re a &quot;contractor&quot; but you work set shifts, wear a uniform, and use their systems &mdash; you may actually be an employee entitled to award rates.
        </p>
      </section>

      {/* Vehicle allowance */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Vehicle allowance breakdown</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Rate:</strong> $0.99 per kilometre when using your own vehicle for deliveries.
          </p>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Example:</strong> A driver who averages 40km of deliveries per shift, working 4 shifts a week:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '12px' }}>
            <li>40km &times; $0.99 = $39.60 per shift</li>
            <li>$39.60 &times; 4 shifts = $158.40 per week</li>
            <li>$158.40 &times; 48 weeks = $7,603.20 per year</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            If your employer is not paying the vehicle allowance, that&rsquo;s over $7,600/year you&rsquo;re missing out on.
          </p>
        </div>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, color: 'var(--accent-dark)', marginBottom: '12px' }}>Common underpayments for delivery drivers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'No vehicle allowance paid', desc: 'If you use your own car, motorbike, or bicycle for deliveries, you are entitled to a per-kilometre allowance. Many fast food employers do not pay this or claim it is included in your hourly rate.' },
              { title: 'Per-delivery pay instead of hourly', desc: 'If you are an employee (not a gig contractor), you must be paid an hourly rate. Per-delivery payment is not compliant with the award.' },
              { title: 'No penalty rates on weekend deliveries', desc: 'Weekend and public holiday deliveries attract penalty rates just like any other fast food work. If your rate does not change on a Sunday, you are being underpaid.' },
              { title: 'Waiting time not paid', desc: 'If you are at the store waiting for deliveries and required to be available, that time must be paid. You cannot be paid only for the time you are out delivering.' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ ...smallStyle, fontWeight: 600, color: 'var(--secondary)', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ ...smallStyle, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />

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

      {/* Related */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          See also: <a href="/awards/fast-food-award/crew-member-pay-rates" style={linkStyle}>Crew member pay rates</a> &middot; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award overview</a>
        </p>
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
