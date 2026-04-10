import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workplace Resources — Fair Work Links & Support | Review My Pay',
  description: 'Useful workplace rights resources for Australian workers. Fair Work Ombudsman contacts, legal aid by state, union directories, and underpayment recovery tools.',
};

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500,
  color: 'var(--secondary)', marginBottom: '12px', marginTop: '0',
};
const pStyle: React.CSSProperties = {
  fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem',
};
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const cardStyle: React.CSSProperties = {
  border: '1.5px solid var(--border)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1rem',
};

interface ResourceLink {
  name: string;
  url: string;
  description: string;
}

const fwoResources: ResourceLink[] = [
  { name: 'Fair Work Ombudsman', url: 'https://www.fairwork.gov.au', description: 'The primary government agency for workplace rights, pay information, and complaints.' },
  { name: 'Fair Work Pay Calculator (PACT)', url: 'https://calculate.fairwork.gov.au', description: 'Official pay and conditions calculator for all modern awards.' },
  { name: 'Award Finder', url: 'https://www.fairwork.gov.au/awards-and-agreements/awards/find-my-award', description: 'Find which award covers your job.' },
  { name: 'Lodge a Complaint', url: 'https://www.fairwork.gov.au/about-us/contact-us/online-enquiry', description: 'Submit an online enquiry about underpayment or workplace issues.' },
  { name: 'Fair Work Commission', url: 'https://www.fwc.gov.au', description: 'The tribunal that sets minimum wages and modern award conditions annually.' },
];

const legalAidResources: ResourceLink[] = [
  { name: 'Legal Aid NSW', url: 'https://www.legalaid.nsw.gov.au', description: 'Free legal help for eligible people in New South Wales.' },
  { name: 'Victoria Legal Aid', url: 'https://www.legalaid.vic.gov.au', description: 'Free legal help for eligible people in Victoria.' },
  { name: 'Legal Aid Queensland', url: 'https://www.legalaid.qld.gov.au', description: 'Free legal help for eligible people in Queensland.' },
  { name: 'Legal Aid WA', url: 'https://www.legalaid.wa.gov.au', description: 'Free legal help for eligible people in Western Australia.' },
  { name: 'Legal Services Commission SA', url: 'https://www.lsc.sa.gov.au', description: 'Free legal help for eligible people in South Australia.' },
  { name: 'Legal Aid Commission Tasmania', url: 'https://www.legalaid.tas.gov.au', description: 'Free legal help for eligible people in Tasmania.' },
];

const otherResources: ResourceLink[] = [
  { name: 'Australian Unions', url: 'https://www.australianunions.org.au', description: 'Find a union for your industry. Unions provide workplace advice, representation, and support with underpayment claims.' },
  { name: 'JobWatch', url: 'https://www.jobwatch.org.au', description: 'Free employment rights legal centre (Victoria, Queensland, Tasmania).' },
  { name: 'ATO Superannuation', url: 'https://www.ato.gov.au/individuals-and-families/super', description: 'Check your superannuation is being paid correctly. Report unpaid super to the ATO.' },
  { name: 'Translating and Interpreting Service (TIS)', url: 'https://www.tisnational.gov.au', description: 'Free interpreting service for Fair Work enquiries. Call 13 14 50.' },
];

function ResourceSection({ title, resources }: { title: string; resources: ResourceLink[] }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={h2Style}>{title}</h2>
      {resources.map(r => (
        <div key={r.url} style={cardStyle}>
          <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: '14px', fontWeight: 600 }}>
            {r.name} &rarr;
          </a>
          <p style={{ ...pStyle, marginBottom: 0, marginTop: '4px', fontSize: '13px' }}>{r.description}</p>
        </div>
      ))}
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '640px' }}>
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
          Workplace Resources
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', lineHeight: 1.65 }}>
          If you think you&apos;re being underpaid, you have options. These resources can help you check your pay, understand your rights, and take action.
        </p>
      </div>

      {/* Quick contact box */}
      <div style={{
        padding: '20px',
        background: 'var(--accent-light)',
        border: '1px solid rgba(255,183,77,0.35)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '8px',
        fontSize: '14px',
        color: 'var(--secondary)',
        lineHeight: 1.7,
      }}>
        <strong>Need help now?</strong> Call the Fair Work Infoline on <strong>13 13 94</strong> (Monday to Friday, 8am&ndash;5:30pm). It&apos;s free and confidential. If English isn&apos;t your first language, call TIS on <strong>13 14 50</strong> for free interpreting.
      </div>

      <ResourceSection title="Fair Work &amp; Government" resources={fwoResources} />
      <ResourceSection title="Free Legal Help by State" resources={legalAidResources} />
      <ResourceSection title="Other Useful Resources" resources={otherResources} />

      {/* Review My Pay tools */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Review My Pay Tools</h2>
        <div style={cardStyle}>
          <a href="/check-my-pay" style={{ ...linkStyle, fontSize: '14px', fontWeight: 600 }}>
            Check My Pay Calculator &rarr;
          </a>
          <p style={{ ...pStyle, marginBottom: 0, marginTop: '4px', fontSize: '13px' }}>
            Enter your shifts and see exactly what you should be paid under your award. Free, instant, and based on official Fair Work rates.
          </p>
        </div>
        <div style={cardStyle}>
          <a href="/awards" style={{ ...linkStyle, fontSize: '14px', fontWeight: 600 }}>
            Browse All Awards &rarr;
          </a>
          <p style={{ ...pStyle, marginBottom: 0, marginTop: '4px', fontSize: '13px' }}>
            Find your award and check pay rates, penalty rates, allowances, and classification levels.
          </p>
        </div>
        <div style={cardStyle}>
          <a href="/guides" style={{ ...linkStyle, fontSize: '14px', fontWeight: 600 }}>
            Workplace Guides &rarr;
          </a>
          <p style={{ ...pStyle, marginBottom: 0, marginTop: '4px', fontSize: '13px' }}>
            Plain-English guides covering penalty rates, overtime, casual loading, wage theft, and how to report underpayment.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <p style={{ fontSize: '12px', color: 'var(--secondary-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
        The information on this page is general in nature and not legal advice. For advice specific to your situation, contact the Fair Work Ombudsman or a legal professional in your state.
      </p>
    </div>
  );
}
