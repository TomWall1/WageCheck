'use client';

import { useState } from 'react';
import { AwardCode } from '@/types';

const AWARDS = [
  {
    code: 'MA000009' as AwardCode,
    name: 'Hospitality Industry (General) Award 2020',
    shortName: 'Hospitality Award',
    description: 'Covers hotels, restaurants, cafés, bars, clubs, function centres, and most hospitality venues.',
    examples: 'Waitstaff, cooks, bartenders, front office staff, kitchen hands, hotel workers',
    badge: 'MA000009',
  },
  {
    code: 'MA000003' as AwardCode,
    name: 'Fast Food Industry Award 2020',
    shortName: 'Fast Food Award',
    description: 'Covers fast food outlets, takeaway food businesses, and quick service restaurants.',
    examples: 'Counter staff, drive-through operators, kitchen team members, delivery crew',
    badge: 'MA000003',
  },
  {
    code: 'MA000119' as AwardCode,
    name: 'Restaurant Industry Award 2020',
    shortName: 'Restaurant Award',
    description: 'Covers restaurants, cafés, and catering businesses not covered by the Hospitality Award.',
    examples: 'Waitstaff, cooks, kitchen hands, bar attendants, storepersons, cleaners',
    badge: 'MA000119',
  },
  {
    code: 'MA000004' as AwardCode,
    name: 'General Retail Industry Award 2020',
    shortName: 'Retail Award',
    description: 'Covers retail businesses selling goods to the public, including supermarkets, specialty stores, and department stores.',
    examples: 'Sales assistants, cashiers, department supervisors, store managers, key holders',
    badge: 'MA000004',
  },
  {
    code: 'MA000094' as AwardCode,
    name: 'Fitness Industry Award 2020',
    shortName: 'Fitness Award',
    description: 'Covers gyms, fitness centres, aquatic centres, tennis clubs, and other fitness facilities.',
    examples: 'Personal trainers, fitness instructors, swim teachers, lifeguards, gym reception staff, centre managers',
    badge: 'MA000094',
  },
  {
    code: 'MA000080' as AwardCode,
    name: 'Amusement, Events and Recreation Award 2020',
    shortName: 'Amusement & Events Award',
    description: 'Covers amusement parks, carnivals, shows, theme parks, events, trade shows and exhibitions, and recreation facilities.',
    examples: 'Ride operators, ticket sellers, exhibition workers, show hands, tradespersons, event supervisors',
    badge: 'MA000080',
  },
  {
    code: 'MA000081' as AwardCode,
    name: 'Live Performance Award 2020',
    shortName: 'Live Performance Award',
    description: 'Covers production and support staff, company dancers, performers, and musicians working in live performance venues, touring productions, and entertainment facilities.',
    examples: 'Stagehands, riggers, touring sound & lighting crew, company dancers, wardrobe staff, production managers',
    badge: 'MA000081',
  },
  {
    code: 'MA000084' as AwardCode,
    name: 'Storage Services and Wholesale Award 2020',
    shortName: 'Storage & Wholesale Award',
    description: 'Covers employees in storage, warehousing, distribution, and wholesale trading businesses, including transport and clerical roles within those businesses.',
    examples: 'Storeworkers, warehouse operatives, forklift drivers, distribution centre staff, wholesale sales assistants, storepersons',
    badge: 'MA000084',
  },
  {
    code: 'MA000022' as AwardCode,
    name: 'Cleaning Services Award 2020',
    shortName: 'Cleaning Award',
    description: 'Covers employees in contract cleaning, building cleaning, and related cleaning services. Also covers cleaners employed directly by non-cleaning businesses.',
    examples: 'Commercial cleaners, office cleaners, building cleaners, industrial cleaners, hospital cleaners, window cleaners, shopping trolley collectors, leading hands',
    badge: 'MA000022',
  },
];

interface Props {
  onSelect: (awardCode: AwardCode) => void;
}

export default function LandingPage({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AwardCode | null>(null);

  const filtered = AWARDS.filter(a => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.shortName.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.examples.toLowerCase().includes(q)
    );
  });

  function handleStart() {
    if (selected) onSelect(selected);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero */}
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #E4DFD8' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontWeight: 500,
          fontSize: '2rem',
          letterSpacing: '-0.03em',
          color: '#111111',
          marginBottom: '0.5rem',
          lineHeight: 1.15,
        }}>
          Check your pay
        </h1>
        <p style={{ fontSize: '15px', color: '#3A3530', lineHeight: 1.65, maxWidth: '480px' }}>
          Find out if you&apos;re being paid correctly under the Fair Work Act.
          Answer a few questions about your job and shifts — we&apos;ll calculate what you&apos;re owed.
        </p>
      </div>

      {/* Fair Work disclosure notice */}
      <div style={{
        padding: '14px 16px',
        background: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderLeft: '3px solid #FBBF24',
        borderRadius: '4px',
        fontSize: '13px',
      }}>
        <p style={{ fontWeight: 600, color: '#92400E', marginBottom: '4px' }}>Not sure which award covers you?</p>
        <p style={{ color: '#78350F', lineHeight: 1.6 }}>
          Under the <strong>Fair Work Act 2009</strong>, your employer is legally required to tell you
          which award and classification you are paid under. Check your payslip, letter of engagement, or contract.
          If you&apos;re still unsure,{' '}
          <a
            href="https://www.fairwork.gov.au/employment-conditions/awards/find-my-award"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: '#92400E', fontWeight: 600 }}
          >
            use the Fair Work Award Finder
          </a>
          .
        </p>
      </div>

      {/* Award selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#44403C',
            marginBottom: '8px',
          }}>
            Select your award
          </label>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by industry or job type (e.g. restaurant, fast food, gym...)"
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #D5D0C8',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#111111',
              background: '#FFFFFF',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#1B5A9C'; e.currentTarget.style.boxShadow = '0 0 0 1px #1B5A9C'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#D5D0C8'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.length === 0 && (
            <p style={{ fontSize: '13px', color: '#6B6560', textAlign: 'center', padding: '20px 0' }}>
              No awards match your search. Try &quot;hospitality&quot; or &quot;fast food&quot;.
            </p>
          )}
          {filtered.map(award => {
            const isSelected = selected === award.code;
            return (
              <button
                key={award.code}
                onClick={() => setSelected(award.code)}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#ABCAE9';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(27,90,156,0.10)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#C8C2BA';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.07)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 18px',
                  background: isSelected ? '#EEF4FB' : '#FFFFFF',
                  border: isSelected ? '1px solid #ABCAE9' : '1px solid #C8C2BA',
                  borderLeft: isSelected ? '4px solid #1B5A9C' : '1px solid #C8C2BA',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'block',
                  boxShadow: isSelected
                    ? '0 2px 8px rgba(27,90,156,0.12)'
                    : '0 1px 3px rgba(0,0,0,0.07)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  {isSelected && (
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="#1B5A9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  <span style={{ fontWeight: 700, fontSize: '14.5px', color: '#111111' }}>
                    {award.shortName}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    color: '#6B6560',
                    background: '#EDEAE5',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    letterSpacing: '0.03em',
                    fontWeight: 500,
                  }}>
                    {award.badge}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: '#3A3530', lineHeight: 1.55, margin: 0 }}>
                  {award.description}
                </p>
                <p style={{ fontSize: '12px', color: '#6B6560', marginTop: '5px', margin: '5px 0 0 0', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 600, color: '#44403C' }}>Covers: </span>{award.examples}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        disabled={!selected}
        className="btn-primary w-full"
        style={{ padding: '13px 24px', fontSize: '15px' }}
      >
        {selected
          ? `Continue — ${AWARDS.find(a => a.code === selected)?.shortName} →`
          : 'Select an award to continue'}
      </button>

      <p style={{ fontSize: '12px', textAlign: 'center', color: '#6B6560' }}>
        General information only — not legal advice.
        Rates effective 1 July 2025. Always verify at{' '}
        <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#44403C' }}>
          fairwork.gov.au
        </a>
        .
      </p>
    </div>
  );
}
