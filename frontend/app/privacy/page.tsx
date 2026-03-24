import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Review My Pay',
  description: 'How Review My Pay handles your data. We don\'t store personal information — your shift details stay in your browser.',
};

export default function PrivacyPage() {
  const sectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '14.5px',
    color: '#37474F',
    lineHeight: 1.7,
  };

  const h2Style: React.CSSProperties = {
    fontFamily: 'Fraunces, Georgia, serif',
    fontWeight: 500,
    fontSize: '1.15rem',
    letterSpacing: '-0.02em',
    color: 'var(--secondary)',
    marginTop: '0.25rem',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '560px' }}>

      {/* Header */}
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontWeight: 500,
          fontSize: '2rem',
          letterSpacing: '-0.03em',
          color: 'var(--secondary)',
          marginBottom: '0.5rem',
          lineHeight: 1.15,
        }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '13.5px', color: 'var(--secondary-muted)' }}>
          Last updated: March 2026
        </p>
      </div>

      {/* Overview */}
      <div style={{
        padding: '16px 20px',
        background: 'var(--primary-light)',
        border: '1px solid rgba(0,77,64,0.12)',
        borderRadius: '10px',
        fontSize: '14px',
        color: 'var(--secondary)',
        lineHeight: 1.65,
      }}>
        <strong>The short version:</strong> We don&apos;t store your personal information. Your shift details
        and pay calculations exist only in your browser session and are never sent to or stored on our servers.
      </div>

      {/* Data we don't collect */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Your shift and pay data</h2>
        <p>
          When you use the pay checker, all information you enter — including your award, employment type,
          shifts, and hours — is processed entirely in your browser. This data is not transmitted to our
          servers, not stored in any database, and not accessible to us. When you close or refresh the page,
          it is gone.
        </p>
      </div>

      {/* Contact form */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Contact form</h2>
        <p>
          If you submit a message through our contact form, your name, email address, and message
          are sent via EmailJS to our email inbox. We use this information only to respond to your
          enquiry. We do not add you to any mailing list or share your details with third parties.
        </p>
      </div>

      {/* Cookies and analytics */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Cookies and analytics</h2>
        <p>
          We use <strong>Google Analytics</strong> to understand how people use the site — for example,
          which pages are visited and how long people stay. Google Analytics uses cookies to collect
          this information anonymously. It does not identify individual users.
        </p>
        <p>
          We also use <strong>Google AdSense</strong> to display advertisements. AdSense may use
          cookies to serve ads based on your browsing activity. You can manage your ad preferences
          at{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 500 }}>
            Google Ads Settings
          </a>{' '}
          or opt out of personalised advertising at{' '}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 500 }}>
            aboutads.info
          </a>.
        </p>
      </div>

      {/* Data sharing */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Data sharing</h2>
        <p>
          We do not sell, rent, or share your personal information with any third parties.
          The only third-party services that receive data are Google (analytics and advertising)
          and EmailJS (contact form delivery), as described above.
        </p>
      </div>

      {/* Children */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Young workers</h2>
        <p>
          Review My Pay is designed to be used by workers of all ages, including those under 18
          who may be employed under junior rates. We do not knowingly collect personal information
          from anyone — the pay checker operates entirely in the browser without data collection.
        </p>
      </div>

      {/* Changes */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Changes to this policy</h2>
        <p>
          If we make changes to this privacy policy, we will update the date at the top of this page.
          We encourage you to review this page periodically.
        </p>
      </div>

      {/* Contact */}
      <div style={{
        padding: '16px 20px',
        background: '#ffffff',
        border: '1.5px solid var(--border)',
        borderRadius: '10px',
        fontSize: '14px',
        color: 'var(--secondary)',
        lineHeight: 1.65,
      }}>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>Questions?</p>
        <p>
          If you have any questions about this privacy policy, please{' '}
          <a href="/contact" style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 500 }}>
            get in touch
          </a>{' '}
          or email{' '}
          <a href="mailto:reviewmypayapp@gmail.com"
            style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>
            reviewmypayapp@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}
