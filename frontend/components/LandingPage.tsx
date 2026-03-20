'use client';

import { useState } from 'react';
import { AwardCode } from '@/types';

const AWARDS = [
  {
    code: 'MA000080' as AwardCode,
    name: 'Amusement, Events and Recreation Award 2020',
    shortName: 'Amusement & Events Award',
    description: 'Covers amusement parks, carnivals, shows, theme parks, events, trade shows and exhibitions, and recreation facilities.',
    examples: 'Ride operators, ticket sellers, exhibition workers, show hands, tradespersons, event supervisors',
    badge: 'MA000080',
  },
  {
    code: 'MA000022' as AwardCode,
    name: 'Cleaning Services Award 2020',
    shortName: 'Cleaning Award',
    description: 'Covers employees of contract cleaning businesses — companies whose core business is providing cleaning services. If you work for a dedicated cleaning contractor, this is your award.',
    examples: 'Commercial cleaners, office cleaners, building cleaners, industrial cleaners, high-access window cleaners, shopping trolley collectors, cleaning leading hands',
    badge: 'MA000022',
  },
  {
    code: 'MA000002' as AwardCode,
    name: 'Clerks—Private Sector Award 2020',
    shortName: 'Clerks Award',
    description: 'Covers clerical and administrative employees in the private sector, including data entry operators, call centre workers, receptionists, and office administrators.',
    examples: 'Receptionists, data entry operators, call centre agents, payroll officers, administrative assistants, office managers, executive assistants',
    badge: 'MA000002',
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
    code: 'MA000094' as AwardCode,
    name: 'Fitness Industry Award 2020',
    shortName: 'Fitness Award',
    description: 'Covers gyms, fitness centres, aquatic centres, tennis clubs, and other fitness facilities.',
    examples: 'Personal trainers, fitness instructors, swim teachers, lifeguards, gym reception staff, centre managers',
    badge: 'MA000094',
  },
  {
    code: 'MA000009' as AwardCode,
    name: 'Hospitality Industry (General) Award 2020',
    shortName: 'Hospitality Award',
    description: 'Covers hotels, restaurants, cafés, bars, clubs, function centres, and most hospitality venues.',
    examples: 'Waitstaff, cooks, bartenders, front office staff, kitchen hands, hotel workers',
    badge: 'MA000009',
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
    code: 'MA000104' as AwardCode,
    name: 'Miscellaneous Award 2020',
    shortName: 'Miscellaneous Award',
    description: 'The award of last resort — covers employees who are not covered by any other modern award. Does not cover managers or specialist professionals (accountants, lawyers, HR, IT specialists, marketing, finance, or PR).',
    examples: 'Workers in any non-award-covered role who are not managers or specialist professionals',
    badge: 'MA000104',
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
    code: 'MA000084' as AwardCode,
    name: 'Storage Services and Wholesale Award 2020',
    shortName: 'Storage & Wholesale Award',
    description: 'Covers employees in storage, warehousing, distribution, and wholesale trading businesses, including transport and clerical roles within those businesses.',
    examples: 'Storeworkers, warehouse operatives, forklift drivers, distribution centre staff, wholesale sales assistants, storepersons',
    badge: 'MA000084',
  },
  {
    code: 'MA000028' as AwardCode,
    name: 'Horticulture Award 2020',
    shortName: 'Horticulture Award',
    description: 'Covers employees working in horticulture, including field crop growing, fruit and vegetable growing, nursery operations, and turf management businesses.',
    examples: 'Fruit pickers, vegetable harvesters, nursery hands, tractor/machinery operators, spray operators, forepersons, orchard workers',
    badge: 'MA000028',
  },
  {
    code: 'MA000033' as AwardCode,
    name: 'Nursery Industry Award 2020',
    shortName: 'Nursery Industry Award',
    description: 'Covers employees working in the nursery industry, including the growing, propagation, sale, and distribution of nursery stock, plants, seeds, and related products.',
    examples: 'Nursery hands, propagators, retail nursery staff, plant growers, horticulture assistants, leading hands, forepersons',
    badge: 'MA000033',
  },
  {
    code: 'MA000013' as AwardCode,
    name: 'Racing Clubs Events Award 2020',
    shortName: 'Racing Clubs Events Award',
    description: 'Covers employees engaged by horse and greyhound racing clubs at race meetings. Three employee groups: Racecourse Attendants (gate, parking, ticketing, crowd control), Raceday Officials (announcer, inspector, judge, racecaller), and casual Liquor employees (bar, cashier, glass collection). Liquor employees receive all-inclusive hourly rates.',
    examples: 'Gate attendants, ushers, ticket sellers, barrier attendants, farriers, racecallers, judges, bar attendants, glass collectors',
    badge: 'MA000013',
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
          Check your pay
        </h1>
        <p style={{ fontSize: '15px', color: '#37474F', lineHeight: 1.65, maxWidth: '480px' }}>
          Find out if you&apos;re being paid correctly under the Fair Work Act.
          Answer a few questions about your job and shifts — we&apos;ll calculate what you&apos;re owed.
        </p>
      </div>

      {/* Fair Work disclosure notice */}
      <div style={{
        padding: '14px 16px',
        background: 'var(--accent-light)',
        border: '1px solid rgba(255,183,77,0.35)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '8px',
        fontSize: '13px',
      }}>
        <p style={{ fontWeight: 600, color: 'var(--accent-dark)', marginBottom: '4px' }}>Not sure which award covers you?</p>
        <p style={{ color: 'var(--secondary)', lineHeight: 1.6 }}>
          Under the <strong>Fair Work Act 2009</strong>, your employer is legally required to tell you
          which award and classification you are paid under. Check your payslip, letter of engagement, or contract.
          If you&apos;re still unsure,{' '}
          <a
            href="https://www.fairwork.gov.au/employment-conditions/awards/find-my-award"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 600 }}
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
            color: 'var(--secondary)',
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
              border: '1.5px solid var(--border-strong)',
              borderRadius: '8px',
              fontSize: '14px',
              color: 'var(--secondary)',
              background: '#FFFFFF',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,77,64,0.15)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'var(--border-strong)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.length === 0 && (
            <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', textAlign: 'center', padding: '20px 0' }}>
              No awards match your search. Try &quot;hospitality&quot; or &quot;fast food&quot;.
            </p>
          )}
          {filtered.map(award => {
            const isSelected = selected === award.code;
            return (
              <div key={award.code}>
                <button
                  onClick={() => setSelected(award.code)}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--primary-mid)';
                      e.currentTarget.style.background = 'var(--primary-light)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,77,64,0.12)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(38,50,56,0.28)';
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(38,50,56,0.08)';
                    }
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px 18px',
                    background: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                    border: isSelected
                      ? '1.5px solid var(--primary)'
                      : '1.5px solid rgba(38,50,56,0.28)',
                    borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid rgba(38,50,56,0.12)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'block',
                    boxShadow: isSelected
                      ? '0 2px 8px rgba(0,77,64,0.15)'
                      : '0 1px 3px rgba(38,50,56,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {isSelected && (
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    <span style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--secondary)' }}>
                      {award.shortName}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      color: '#FFFFFF',
                      background: 'var(--primary)',
                      padding: '2px 7px',
                      borderRadius: '3px',
                      letterSpacing: '0.03em',
                      fontWeight: 600,
                    }}>
                      {award.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#263238', lineHeight: 1.55, margin: 0 }}>
                    {award.description}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#37474F', marginTop: '5px', margin: '6px 0 0 0', lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 600, color: '#263238' }}>Covers: </span>{award.examples}
                  </p>
                </button>

                {isSelected && (
                  <button
                    onClick={handleStart}
                    className="btn-primary w-full"
                    style={{ padding: '13px 24px', fontSize: '15px', marginTop: '8px' }}
                  >
                    Continue — {award.shortName} →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p style={{ fontSize: '12px', textAlign: 'center', color: 'var(--secondary-muted)' }}>
        General information only — not legal advice.
        Rates effective 1 July 2025. Always verify at{' '}
        <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--secondary)' }}>
          fairwork.gov.au
        </a>
        .
      </p>
    </div>
  );
}
