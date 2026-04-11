'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GUIDES, getAllTags } from '@/lib/guides';
import { AWARDS } from '@/lib/awards';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CheckPayCTA from '@/components/seo/CheckPayCTA';

const ALL_TAGS = getAllTags();
const SORTED_AWARDS = [...AWARDS].sort((a, b) => a.shortName.localeCompare(b.shortName));

export default function GuidesIndex() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam && ALL_TAGS.includes(tagParam)) {
      setActiveTag(tagParam);
    }
  }, [searchParams]);

  const q = query.toLowerCase().trim();
  const filtered = GUIDES.filter(g => {
    const matchesSearch = !q
      || g.title.toLowerCase().includes(q)
      || g.description.toLowerCase().includes(q)
      || g.keywords.some(k => k.toLowerCase().includes(q))
      || g.tags.some(t => t.toLowerCase().includes(q));
    const matchesTag = !activeTag || g.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
      ]} />

      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)', marginBottom: '1.5rem' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.75rem', fontWeight: 600,
          letterSpacing: '-0.03em', color: 'var(--secondary)', lineHeight: 1.2,
        }}>
          Workplace Rights Guides
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', marginTop: '8px', lineHeight: 1.6 }}>
          Everything you need to know about modern awards, pay rates, penalty rates, and your rights as an Australian worker — in plain English.
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search guides..."
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '14px',
            border: '1.5px solid var(--border)',
            borderRadius: '8px',
            outline: 'none',
            color: 'var(--secondary)',
            background: '#ffffff',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        />
      </div>

      {/* Award-specific guides dropdown */}
      <div style={{ marginBottom: '1.25rem' }}>
        <select
          onChange={e => {
            if (e.target.value) router.push(`/awards/${e.target.value}`);
          }}
          defaultValue=""
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '14px',
            border: '1.5px solid var(--border)',
            borderRadius: '8px',
            outline: 'none',
            color: 'var(--secondary)',
            background: '#ffffff',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2390A4AE' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            paddingRight: '36px',
          }}
        >
          <option value="" disabled>View guides for a specific award...</option>
          {SORTED_AWARDS.map(a => (
            <option key={a.code} value={a.slug}>
              {a.shortName} ({a.code})
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTag(null)}
          style={{
            fontSize: '12px',
            fontWeight: activeTag === null ? 600 : 400,
            color: activeTag === null ? '#ffffff' : 'var(--secondary-muted)',
            background: activeTag === null ? 'var(--primary)' : 'transparent',
            border: `1.5px solid ${activeTag === null ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '20px',
            padding: '4px 12px',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          All
        </button>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            style={{
              fontSize: '12px',
              fontWeight: activeTag === tag ? 600 : 400,
              color: activeTag === tag ? '#ffffff' : 'var(--secondary-muted)',
              background: activeTag === tag ? 'var(--primary)' : 'transparent',
              border: `1.5px solid ${activeTag === tag ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: '20px',
              padding: '4px 12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* General guides heading */}
      <h2 style={{
        fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500,
        color: 'var(--secondary)', marginBottom: '1rem',
      }}>
        General guides
      </h2>

      {/* Results */}
      {filtered.length === 0 ? (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', textAlign: 'center', padding: '2rem 0' }}>
          No guides match your search. Try a different term or clear the filter.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(guide => (
            <a
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              style={{
                display: 'block',
                padding: '16px 20px',
                border: '1.5px solid var(--border)',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
                {guide.title} &rarr;
              </p>
              <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
                {guide.description}
              </p>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {guide.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 500,
                      color: 'var(--primary)',
                      background: 'var(--primary-light)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}

      <CheckPayCTA />
    </div>
  );
}
