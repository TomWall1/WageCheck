/**
 * Breadcrumb navigation with BreadcrumbList JSON-LD structured data.
 * Server component — renders both visible nav and schema markup.
 */

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  const baseUrl = 'https://reviewmypay.com.au';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        style={{
          fontSize: '12.5px',
          color: 'var(--secondary-muted)',
          marginBottom: '1.5rem',
        }}
      >
        {items.map((item, i) => (
          <span key={item.href}>
            {i > 0 && <span style={{ margin: '0 6px', opacity: 0.5 }}>&rsaquo;</span>}
            {i < items.length - 1 ? (
              <a
                href={item.href}
                style={{
                  color: 'var(--secondary-muted)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </a>
            ) : (
              <span style={{ color: 'var(--secondary)' }}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
