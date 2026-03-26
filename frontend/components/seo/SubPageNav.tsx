/**
 * Sub-page navigation tabs for award pages.
 * Highlights the current sub-page.
 */

interface Props {
  awardSlug: string;
  currentPage?: string;
}

const SUB_PAGES = [
  { slug: '', label: 'Overview' },
  { slug: 'pay-rates', label: 'Pay Rates' },
  { slug: 'penalty-rates', label: 'Penalty Rates' },
  { slug: 'casual-employees', label: 'Casual' },
  { slug: 'overtime', label: 'Overtime' },
  { slug: 'allowances', label: 'Allowances' },
  { slug: 'classifications', label: 'Classifications' },
];

export default function SubPageNav({ awardSlug, currentPage = '' }: Props) {
  return (
    <nav style={{
      display: 'flex',
      gap: '4px',
      flexWrap: 'wrap',
      borderBottom: '1.5px solid var(--border)',
      marginBottom: '2rem',
      paddingBottom: '0',
    }}>
      {SUB_PAGES.map(page => {
        const isActive = page.slug === currentPage;
        const href = `/awards/${awardSlug}${page.slug ? `/${page.slug}` : ''}`;
        return (
          <a
            key={page.slug}
            href={href}
            style={{
              fontSize: '13px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--primary)' : 'var(--secondary-muted)',
              textDecoration: 'none',
              padding: '8px 12px',
              borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: '-1.5px',
              transition: 'color 0.15s',
            }}
          >
            {page.label}
          </a>
        );
      })}
    </nav>
  );
}
