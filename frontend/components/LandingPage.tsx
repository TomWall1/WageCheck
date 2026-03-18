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
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Check your pay</h1>
        <p className="text-lg text-gray-600">
          Find out if you're being paid correctly under the Fair Work Act.
          Answer a few questions about your job and shifts — we'll calculate what you're owed.
        </p>
      </div>

      {/* Fair Work disclosure notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
        <p className="text-sm font-semibold text-amber-900">Not sure which award covers you?</p>
        <p className="text-sm text-amber-800">
          Under the <strong>Fair Work Act 2009</strong>, your employer is legally required to tell you
          which award and classification you are paid under. You can ask them directly — or check
          your payslip, letter of engagement, or employment contract. If you're still unsure,{' '}
          <a
            href="https://www.fairwork.gov.au/employment-conditions/awards/find-my-award"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-amber-900 font-medium"
          >
            use the Fair Work Award Finder
          </a>
          .
        </p>
      </div>

      {/* Award selection */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block font-semibold text-gray-900">Select your award</label>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search awards (e.g. restaurant, fast food, hotel...)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-sm text-gray-500 py-4 text-center">
              No awards match your search. Try "hospitality" or "fast food".
            </p>
          )}
          {filtered.map(award => (
            <button
              key={award.code}
              onClick={() => setSelected(award.code)}
              className={[
                'w-full text-left rounded-xl border-2 p-4 transition-all space-y-1',
                selected === award.code
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {selected === award.code && (
                      <span className="text-brand-600 font-bold text-sm">✓</span>
                    )}
                    <span className="font-semibold text-gray-900">{award.shortName}</span>
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {award.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{award.description}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Covers: </span>{award.examples}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        disabled={!selected}
        className="btn-primary w-full text-base py-3"
      >
        {selected
          ? `Start checking — ${AWARDS.find(a => a.code === selected)?.shortName} →`
          : 'Select an award to continue'}
      </button>

      <p className="text-xs text-center text-gray-400">
        This tool provides general information only and is not legal advice.
        Rates are effective 1 July 2025. Always verify at{' '}
        <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" className="underline">
          fairwork.gov.au
        </a>
        .
      </p>
    </div>
  );
}
