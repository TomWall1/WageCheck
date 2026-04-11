import type { Metadata } from 'next';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Check My Pay — Are You Being Paid Correctly? | Review My Pay',
  description: 'Free tool to check if you\'re being paid correctly under your Fair Work modern award. Enter your shifts and get an instant calculation of what you should be paid.',
  keywords: ['check my pay', 'am I being underpaid', 'award pay calculator', 'fair work pay check'],
};

export default function CheckMyPayPage() {
  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Check My Pay', href: '/check-my-pay' },
      ]} />

      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: '1.75rem',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: 'var(--secondary)',
          lineHeight: 1.2,
        }}>
          Check if you're being paid correctly
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', marginTop: '8px', lineHeight: 1.6 }}>
          Enter your award, shifts, and employment type. We'll calculate exactly what you should be paid — including penalty rates, overtime, and allowances.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ background: 'var(--primary-light)', border: '1.5px solid var(--primary)', borderRadius: '10px', padding: '24px' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '12px' }}>
            How it works
          </h2>
          <ol style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Select your award (e.g. Hospitality, Fast Food, Retail)</li>
            <li>Enter your employment type, age, and classification</li>
            <li>Add your shifts for the pay period</li>
            <li>Get an instant breakdown of what you should be paid</li>
          </ol>
        </div>

        <a
          href="/"
          className="cta-button"
          style={{
            display: 'block',
            background: 'var(--accent)',
            color: '#263238',
            fontWeight: 700,
            fontSize: '16px',
            padding: '16px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
        >
          Start checking your pay now
        </a>

        <div style={{ fontSize: '13.5px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '8px' }}>
            What we check
          </h2>
          <ul style={{ paddingLeft: '1.25rem' }}>
            <li>Base pay rates for your classification level</li>
            <li>Penalty rates for weekends, evenings, and public holidays</li>
            <li>Overtime calculations (daily and weekly thresholds)</li>
            <li>Casual loading (25%)</li>
            <li>Superannuation (12% SGC)</li>
            <li>Common allowances (meal, uniform, travel, first aid)</li>
          </ul>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          This tool covers 30+ modern awards. All rates are sourced from the Fair Work Ombudsman pay guides and updated after each Annual Wage Review.
        </p>
      </div>
    </div>
  );
}
