'use client';

import { useState } from 'react';

interface AwardInfo {
  code: string;
  slug: string;
  shortName: string;
  fullName: string;
  description: string;
  examples: string;
}

export default function AwardSearch({ awards }: { awards: AwardInfo[] }) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? awards.filter(a => {
        const q = query.toLowerCase();
        return (
          a.shortName.toLowerCase().includes(q) ||
          a.fullName.toLowerCase().includes(q) ||
          a.code.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.examples.toLowerCase().includes(q)
        );
      })
    : awards;

  const sorted = [...filtered].sort((a, b) => a.shortName.localeCompare(b.shortName));

  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search by award name, code, industry, or role..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '14px',
            border: '1.5px solid var(--border)',
            borderRadius: '8px',
            outline: 'none',
            color: 'var(--secondary)',
            background: 'transparent',
            transition: 'border-color 0.15s',
          }}
        />
        {query.trim() && (
          <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginTop: '8px' }}>
            {sorted.length} award{sorted.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1rem',
      }}>
        {sorted.map(award => (
          <a
            key={award.code}
            href={`/awards/${award.slug}`}
            style={{
              display: 'block',
              padding: '16px 20px',
              border: '1.5px solid var(--border)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: '#ffffff',
                background: 'var(--primary)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}>
                {award.code}
              </span>
              <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
                {award.shortName}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.5, margin: 0 }}>
              {award.description}
            </p>
          </a>
        ))}
        {sorted.length === 0 && (
          <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic', gridColumn: '1 / -1' }}>
            No awards match your search. Try a different keyword or{' '}
            <a href="/contact" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>contact us</a> if you can&apos;t find your award.
          </p>
        )}
      </div>
    </>
  );
}
