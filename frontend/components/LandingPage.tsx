'use client';

import { useRef, useState } from 'react';
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
    code: 'MA000079' as AwardCode,
    name: 'Architects Award 2020',
    shortName: 'Architects Award',
    description: 'Covers graduate architects, registered architects, students of architecture, and related roles in architectural practices.',
    examples: 'Graduate architects, registered architects, architecture students, architectural drafters',
    badge: 'MA000079',
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
    code: 'MA000016' as AwardCode,
    name: 'Security Services Industry Award 2020',
    shortName: 'Security Services Award',
    description: 'Covers the security services industry including guarding, crowd control, patrol, and monitoring services.',
    examples: 'Security guards, crowd controllers, patrol officers, alarm response officers, concierge security, CCTV operators',
    badge: 'MA000016',
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
  {
    code: 'MA000030' as AwardCode,
    name: 'Market and Social Research Award 2020',
    shortName: 'Market & Social Research Award',
    description: 'Covers employees in the market and social research industry, including telephone and face-to-face interviewers, data coders, field supervisors, research assistants, and research managers.',
    examples: 'Telephone interviewers, face-to-face interviewers, survey coders, data editors, team leaders, field supervisors, research assistants, research officers, research managers',
    badge: 'MA000030',
  },
  {
    code: 'MA000063' as AwardCode,
    name: 'Passenger Vehicle Transportation Award 2020',
    shortName: 'Passenger Vehicle Transportation Award',
    description: 'Covers drivers and operators in the passenger vehicle transport industry, including taxis, hire cars, rideshare, buses, coaches, limousines, and charter vehicles.',
    examples: 'Taxi drivers, rideshare drivers, bus drivers, coach drivers, limousine drivers, hire car drivers, fleet coordinators, dispatch operators',
    badge: 'MA000063',
  },
  {
    code: 'MA000042' as AwardCode,
    name: 'Transport (Cash in Transit) Award 2020',
    shortName: 'Cash in Transit Award',
    description: 'Covers employees in the cash-in-transit industry including armoured vehicle operations, cash escort, and ATM servicing.',
    examples: 'Armoured vehicle operators, cash escorts, crew leaders, non-armoured vehicle operators, ATM technicians',
    badge: 'MA000042',
  },
  {
    code: 'MA000032' as AwardCode,
    name: 'Mobile Crane Hiring Award 2010',
    shortName: 'Mobile Crane Hiring Award',
    description: 'Covers employees in the mobile crane hiring industry, including crane operators of all levels from entry-level to specialist heavy crane operators.',
    examples: 'Mobile crane operators, riggers, dogmen, crane crew members, heavy crane specialists, multi-crane lift coordinators',
    badge: 'MA000032',
  },
  {
    code: 'MA000103' as AwardCode,
    name: 'Supported Employment Services Award 2020',
    shortName: 'Supported Employment Services Award',
    description: 'Covers employees with disability working in supported employment services, including Australian Disability Enterprises (ADEs) and similar organisations.',
    examples: 'Supported employees in packaging, assembly, recycling, grounds maintenance, laundry, catering, cleaning, and other supported employment activities',
    badge: 'MA000103',
  },
  {
    code: 'MA000095' as AwardCode,
    name: 'Car Parking Award 2020',
    shortName: 'Car Parking Award',
    description: 'Covers employees working in car parking facilities, including attendants, cashiers, and supervisors at commercial car parks, parking stations, and valet parking operations.',
    examples: 'Car parking attendants, parking officers, cashiers, valet parking staff, car park supervisors',
    badge: 'MA000095',
  },
  {
    code: 'MA000105' as AwardCode,
    name: 'Funeral Industry Award 2020',
    shortName: 'Funeral Industry Award',
    description: 'Covers employees in the funeral industry, including funeral homes, crematoria, and cemetery operations. Includes funeral directors, embalmers, drivers, and support staff.',
    examples: 'Funeral directors, embalmers, hearse drivers, mortuary attendants, funeral arrangers, cemetery workers, crematorium operators',
    badge: 'MA000105',
  },
  {
    code: 'MA000101' as AwardCode,
    name: 'Gardening and Landscaping Services Award 2020',
    shortName: 'Gardening & Landscaping Award',
    description: 'Covers employees in gardening, landscaping, and related services, including lawn mowing, garden maintenance, landscape construction, and arboriculture.',
    examples: 'Gardeners, landscapers, lawn mowing operators, arborists, irrigation technicians, landscape labourers, garden maintenance workers',
    badge: 'MA000101',
  },
  {
    code: 'MA000091' as AwardCode,
    name: 'Broadcasting, Recorded Entertainment and Cinemas Award 2020',
    shortName: 'Broadcasting & Cinemas Award',
    description: 'Covers broadcasting, recorded entertainment, and cinema industries including TV, radio, film production, and cinema operations.',
    examples: 'Cinema workers, camera operators, audio technicians, lighting operators, film crew, journalists, radio broadcasters',
    badge: 'MA000091',
  },
  {
    code: 'MA000106' as AwardCode,
    name: 'Real Estate Industry Award 2020',
    shortName: 'Real Estate Award',
    description: 'Covers the real estate industry including sales, property management, and strata management.',
    examples: 'Real estate agents, property managers, sales representatives, strata managers, office administrators',
    badge: 'MA000106',
  },
  {
    code: 'MA000092' as AwardCode,
    name: 'Alpine Resorts Award 2020',
    shortName: 'Alpine Resorts Award',
    description: 'Covers alpine resort workers including lift operators, hospitality staff, trades workers, guest services, and snowsports instructors at ski resorts.',
    examples: 'Lift operators, ski patrollers, resort chefs, snowsports instructors, groomers, guest services, housekeeping, plant operators',
    badge: 'MA000092',
  },
  {
    code: 'MA000019' as AwardCode,
    name: 'Banking, Finance and Insurance Award 2020',
    shortName: 'Banking & Finance Award',
    description: 'Covers banking, finance, and insurance industry employees including bank staff, financial advisers, and insurance workers.',
    examples: 'Bank tellers, loan officers, financial planners, insurance claims officers, credit analysts, customer service',
    badge: 'MA000019',
  },
  {
    code: 'MA000021' as AwardCode,
    name: 'Business Equipment Award 2020',
    shortName: 'Business Equipment Award',
    description: 'Covers employees in the business equipment industry including technical service, sales, and clerical workers.',
    examples: 'IT technicians, photocopier technicians, sales representatives, technical support, admin staff',
    badge: 'MA000021',
  },
  {
    code: 'MA000027' as AwardCode,
    name: 'Health Professionals and Support Services Award 2020',
    shortName: 'Health Professionals Award',
    description: 'Covers health professionals (allied health) and support services employees in health and aged care settings.',
    examples: 'Physiotherapists, occupational therapists, social workers, cleaners, kitchen staff, patient transport, ward clerks',
    badge: 'MA000027',
  },
  {
    code: 'MA000065' as AwardCode,
    name: 'Professional Employees Award 2020',
    shortName: 'Professional Employees Award',
    description: 'Covers professional employees including engineers, scientists, IT professionals, and quality auditors.',
    examples: 'Engineers, scientists, IT professionals, quality auditors, medical researchers, architects (non-registered)',
    badge: 'MA000065',
  },
  {
    code: 'MA000074' as AwardCode,
    name: 'Poultry Processing Award 2020',
    shortName: 'Poultry Processing Award',
    description: 'Covers employees in the poultry processing industry including slaughtering, processing, and packing.',
    examples: 'Poultry processors, slaughterers, boners, packers, forklift drivers, cold store workers, quality inspectors',
    badge: 'MA000074',
  },
  {
    code: 'MA000083' as AwardCode,
    name: 'Commercial Sales Award 2020',
    shortName: 'Commercial Sales Award',
    description: 'Covers commercial travellers, merchandisers, and advertising sales representatives.',
    examples: 'Sales representatives, commercial travellers, merchandisers, advertising sales reps',
    badge: 'MA000083',
  },
  {
    code: 'MA000090' as AwardCode,
    name: 'Wine Industry Award 2020',
    shortName: 'Wine Industry Award',
    description: 'Covers employees in wine production including winemaking, cellar work, vineyard operations, and coopering.',
    examples: 'Cellar hands, winemakers, vineyard workers, forklift drivers, bottling line operators, coopers',
    badge: 'MA000090',
  },
  {
    code: 'MA000099' as AwardCode,
    name: 'Labour Market Assistance Industry Award 2020',
    shortName: 'Labour Market Assistance Award',
    description: 'Covers employees in employment services and labour market assistance programs.',
    examples: 'Employment consultants, case managers, job placement officers, admin officers, program coordinators',
    badge: 'MA000099',
  },
  {
    code: 'MA000112' as AwardCode,
    name: 'Local Government Industry Award 2020',
    shortName: 'Local Government Award',
    description: 'Covers employees in local government (councils) including outdoor workers, office staff, and technical employees.',
    examples: 'Council workers, road crews, parks and gardens, librarians, building inspectors, admin officers, engineers',
    badge: 'MA000112',
  },
  {
    code: 'MA000121' as AwardCode,
    name: 'State Government Agencies Award 2020',
    shortName: 'State Government Award',
    description: 'Covers employees in state government agencies across administrative, technical, professional, IT, and legal streams.',
    examples: 'Administrative officers, IT officers, legal officers, engineers, scientists, technical officers',
    badge: 'MA000121',
  },
  {
    code: 'MA000018' as AwardCode,
    name: 'Aged Care Award 2010',
    shortName: 'Aged Care Award',
    description: 'Covers aged care workers including personal carers, kitchen staff, cleaners, and maintenance workers in residential and home care.',
    examples: 'Personal care workers, aged care assistants, kitchen hands, cleaners, laundry workers, maintenance staff',
    badge: 'MA000018',
  },
  {
    code: 'MA000034' as AwardCode,
    name: 'Nurses Award 2020',
    shortName: 'Nurses Award',
    description: 'Covers nurses and midwives including enrolled nurses, registered nurses, and nurse practitioners.',
    examples: 'Registered nurses, enrolled nurses, nursing assistants, midwives, nurse practitioners',
    badge: 'MA000034',
  },
  {
    code: 'MA000100' as AwardCode,
    name: 'Social, Community, Home Care and Disability Services Industry Award 2010',
    shortName: 'SCHADS Award',
    description: 'Covers social and community services, disability support, and home care workers.',
    examples: 'Disability support workers, home care workers, social workers, community service workers, coordinators',
    badge: 'MA000100',
  },
  {
    code: 'MA000012' as AwardCode,
    name: 'Pharmacy Industry Award 2020',
    shortName: 'Pharmacy Award',
    description: 'Covers pharmacy industry employees including pharmacy assistants, interns, and pharmacists.',
    examples: 'Pharmacy assistants, dispensary assistants, pharmacy interns, pharmacists, pharmacy managers',
    badge: 'MA000012',
  },
  {
    code: 'MA000010' as AwardCode,
    name: 'Manufacturing and Associated Industries and Occupations Award 2020',
    shortName: 'Manufacturing Award',
    description: 'Covers manufacturing, engineering, and associated industries including production, maintenance, and warehousing.',
    examples: 'Machine operators, welders, fitters, production workers, warehouse workers, forklift drivers',
    badge: 'MA000010',
  },
  {
    code: 'MA000020' as AwardCode,
    name: 'Building and Construction General On-site Award 2020',
    shortName: 'Building & Construction Award',
    description: 'Covers on-site building and construction workers including labourers, tradespeople, and operators.',
    examples: 'Labourers, carpenters, bricklayers, crane operators, concreters, painters, tilers',
    badge: 'MA000020',
  },
  {
    code: 'MA000089' as AwardCode,
    name: 'Vehicle Repair, Services and Retail Award 2020',
    shortName: 'Vehicle Industry Award',
    description: 'Covers vehicle repair, servicing, and retail employees including mechanics, panel beaters, and service advisers.',
    examples: 'Mechanics, panel beaters, auto electricians, service advisers, parts interpreters, car detailers',
    badge: 'MA000089',
  },
  {
    code: 'MA000076' as AwardCode,
    name: 'Educational Services (Schools) General Staff Award 2020',
    shortName: 'School Support Staff Award',
    description: 'Covers non-teaching school staff including admin, maintenance, and education support workers.',
    examples: 'School admin officers, teacher aides, library assistants, IT support, groundskeepers, canteen staff',
    badge: 'MA000076',
  },
  {
    code: 'MA000077' as AwardCode,
    name: 'Educational Services (Teachers) Award 2020',
    shortName: 'Teachers Award',
    description: 'Covers teachers in non-government schools and early childhood education centres.',
    examples: 'Classroom teachers, early childhood teachers, senior teachers, lead teachers',
    badge: 'MA000077',
  },
  {
    code: 'MA000038' as AwardCode,
    name: 'Road Transport and Distribution Award 2020',
    shortName: 'Road Transport Award',
    description: 'Covers road transport workers including truck drivers, delivery drivers, and distribution workers.',
    examples: 'Truck drivers, delivery drivers, forklift operators, warehouse workers, transport supervisors',
    badge: 'MA000038',
  },
  {
    code: 'MA000116' as AwardCode,
    name: 'Legal Services Award 2020',
    shortName: 'Legal Services Award',
    description: 'Covers employees in legal practices including clerks, admin staff, law graduates, and paralegals.',
    examples: 'Legal secretaries, law clerks, paralegals, receptionists, law graduates, legal admin officers',
    badge: 'MA000116',
  },
  {
    code: 'MA000118' as AwardCode,
    name: 'Animal Care and Veterinary Services Award 2020',
    shortName: 'Vet Services Award',
    description: 'Covers animal care and veterinary services employees including vet nurses, animal attendants, and inspectors.',
    examples: 'Vet nurses, animal attendants, kennel hands, groomers, veterinary surgeons, practice managers, RSPCA inspectors',
    badge: 'MA000118',
  },
  {
    code: 'MA000025' as AwardCode, name: 'Electrical, Electronic and Communications Contracting Award 2020',
    shortName: 'Electrical Contracting Award',
    description: 'Covers electricians, data cablers, communications technicians, and electrical contractors.',
    examples: 'Electricians, data cablers, communications techs, electrical apprentices, linespeople',
    badge: 'MA000025',
  },
  {
    code: 'MA000036' as AwardCode, name: 'Plumbing and Fire Sprinklers Award 2020',
    shortName: 'Plumbing Award',
    description: 'Covers plumbers, gasfitters, drainers, roofers, and fire sprinkler fitters.',
    examples: 'Plumbers, gasfitters, drainers, roofers, sprinkler fitters, mechanical services workers',
    badge: 'MA000036',
  },
  {
    code: 'MA000029' as AwardCode, name: 'Joinery and Building Trades Award 2020',
    shortName: 'Joinery Award',
    description: 'Covers joiners, cabinet makers, shopfitters, glaziers, and stonemasons.',
    examples: 'Joiners, cabinet makers, shopfitters, glaziers, stonemasons, floor sanders',
    badge: 'MA000029',
  },
  {
    code: 'MA000073' as AwardCode, name: 'Food, Beverage and Tobacco Manufacturing Award 2020',
    shortName: 'Food Manufacturing Award',
    description: 'Covers employees in food, beverage, and tobacco manufacturing and processing.',
    examples: 'Production workers, machine operators, packers, quality inspectors, forklift drivers',
    badge: 'MA000073',
  },
  {
    code: 'MA000059' as AwardCode, name: 'Meat Industry Award 2020',
    shortName: 'Meat Industry Award',
    description: 'Covers employees in meat processing, slaughtering, boning, and smallgoods manufacturing.',
    examples: 'Slaughterers, boners, slicers, packers, cold store workers, quality inspectors',
    badge: 'MA000059',
  },
  {
    code: 'MA000041' as AwardCode, name: 'Telecommunications Services Award 2020',
    shortName: 'Telecommunications Award',
    description: 'Covers telecommunications service employees including technicians, customer contact, and admin.',
    examples: 'Telco technicians, cable joiners, customer contact officers, network planners',
    badge: 'MA000041',
  },
  {
    code: 'MA000043' as AwardCode, name: 'Waste Management Award 2020',
    shortName: 'Waste Management Award',
    description: 'Covers waste collection, recycling, and waste processing employees.',
    examples: 'Bin collection drivers, recycling sorters, waste processing operators, landfill workers',
    badge: 'MA000043',
  },
  {
    code: 'MA000096' as AwardCode, name: 'Dry Cleaning and Laundry Industry Award 2020',
    shortName: 'Dry Cleaning Award',
    description: 'Covers employees in dry cleaning, laundry, and linen services.',
    examples: 'Dry cleaners, pressers, spotters, laundry machine operators, counter staff',
    badge: 'MA000096',
  },
  {
    code: 'MA000098' as AwardCode, name: 'Ambulance and Patient Transport Industry Award 2020',
    shortName: 'Ambulance Award',
    description: 'Covers ambulance officers, paramedics, patient transport officers, and communications staff.',
    examples: 'Paramedics, ambulance officers, patient transport officers, communications operators',
    badge: 'MA000098',
  },
  {
    code: 'MA000113' as AwardCode, name: 'Water Industry Award 2020',
    shortName: 'Water Industry Award',
    description: 'Covers employees in water supply, sewerage, and drainage services.',
    examples: 'Water treatment operators, network maintenance workers, meter readers, lab technicians',
    badge: 'MA000113',
  },
];

interface Props {
  onSelect: (awardCode: AwardCode) => void;
}

export default function LandingPage({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AwardCode | null>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  // Group filtered awards by first letter of shortName (sorted)
  const grouped: Record<string, typeof AWARDS> = {};
  for (const award of filtered) {
    const letter = award.shortName[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(award);
  }
  const letters = Object.keys(grouped).sort();

  // All letters present in the full (unfiltered) list
  const allLetters = Array.from(new Set(AWARDS.map(a => a.shortName[0].toUpperCase()))).sort();

  function scrollToLetter(letter: string) {
    const el = letterRefs.current[letter];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleStart() {
    if (selected) onSelect(selected);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '560px', margin: '0 auto' }}>
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
          Unsure of your Award and classification? Ask your employer, they should tell you.
          Alternatively check your payslip, letter of engagement, or contract.
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

        {/* A-Z letter nav */}
        {!query && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {allLetters.map(letter => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                style={{
                  width: '30px',
                  height: '30px',
                  border: '1.5px solid var(--border-strong)',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.12s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--primary-light)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.length === 0 && (
            <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', textAlign: 'center', padding: '20px 0' }}>
              No awards match your search. Try &quot;hospitality&quot; or &quot;fast food&quot;.
            </p>
          )}
          {letters.map(letter => (
            <div key={letter}>
              {/* Letter anchor */}
              <div
                ref={el => { letterRefs.current[letter] = el; }}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary-muted)',
                  padding: '8px 0 4px',
                  scrollMarginTop: '80px',
                }}
              >
                {letter}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {grouped[letter].map(award => {
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
          ))}
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
