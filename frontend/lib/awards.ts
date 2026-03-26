/**
 * Award slug registry — single source of truth for SEO pages.
 * Maps award codes to URL-friendly slugs and display metadata.
 */

export interface AwardInfo {
  code: string;
  slug: string;
  shortName: string;
  fullName: string;
  description: string;
  examples: string;
}

export const AWARDS: AwardInfo[] = [
  { code: 'MA000009', slug: 'hospitality-award', shortName: 'Hospitality Award', fullName: 'Hospitality Industry (General) Award 2020', description: 'Covers hotels, bars, cafes, clubs, function centres and accommodation venues across Australia.', examples: 'Bartenders, waitstaff, kitchen hands, cooks, hotel receptionists, housekeepers' },
  { code: 'MA000003', slug: 'fast-food-award', shortName: 'Fast Food Award', fullName: 'Fast Food Industry Award 2010', description: 'Covers takeaway food, quick-service restaurants, and delivery operations.', examples: 'Fast food workers, delivery drivers, shift supervisors, QSR crew' },
  { code: 'MA000119', slug: 'restaurant-award', shortName: 'Restaurant Award', fullName: 'Restaurant Industry Award 2020', description: 'Covers standalone restaurants, cafes, and catering businesses.', examples: 'Waiters, cooks, baristas, restaurant managers, catering staff' },
  { code: 'MA000004', slug: 'retail-award', shortName: 'Retail Award', fullName: 'General Retail Industry Award 2020', description: 'Covers retail shops, department stores, and sales operations.', examples: 'Sales assistants, cashiers, retail supervisors, visual merchandisers' },
  { code: 'MA000002', slug: 'clerks-award', shortName: 'Clerks Award', fullName: 'Clerks — Private Sector Award 2020', description: 'Covers office and clerical workers in the private sector.', examples: 'Admin assistants, receptionists, data entry operators, accounts clerks' },
  { code: 'MA000022', slug: 'cleaning-award', shortName: 'Cleaning Award', fullName: 'Cleaning Services Award 2020', description: 'Covers commercial and domestic cleaning services.', examples: 'Cleaners, janitors, cleaning supervisors, window cleaners' },
  { code: 'MA000028', slug: 'horticulture-award', shortName: 'Horticulture Award', fullName: 'Horticulture Award 2020', description: 'Covers horticultural and agricultural work.', examples: 'Farm workers, nursery staff, fruit pickers, garden centre workers' },
  { code: 'MA000033', slug: 'nursery-award', shortName: 'Nursery Award', fullName: 'Nursery Award 2010', description: 'Covers plant nursery and garden centre operations.', examples: 'Nursery workers, plant propagators, garden advisors' },
  { code: 'MA000094', slug: 'fitness-award', shortName: 'Fitness Award', fullName: 'Fitness Industry Award 2020', description: 'Covers gyms, fitness centres, and personal training businesses.', examples: 'Personal trainers, gym instructors, fitness centre receptionists' },
  { code: 'MA000080', slug: 'amusement-award', shortName: 'Amusement Award', fullName: 'Amusement, Events and Recreation Award 2020', description: 'Covers entertainment venues, events, and recreation facilities.', examples: 'Event staff, theme park workers, cinema attendants, recreation officers' },
  { code: 'MA000081', slug: 'live-performance-award', shortName: 'Live Performance Award', fullName: 'Live Performance Award 2020', description: 'Covers live entertainment, theatre, and performance venues.', examples: 'Stage crew, sound technicians, ushers, box office staff' },
  { code: 'MA000084', slug: 'storage-wholesale-award', shortName: 'Storage & Wholesale Award', fullName: 'Storage Services and Wholesale Award 2020', description: 'Covers warehousing, storage, and wholesale operations.', examples: 'Warehouse workers, forklift operators, inventory clerks, dispatch staff' },
  { code: 'MA000104', slug: 'miscellaneous-award', shortName: 'Miscellaneous Award', fullName: 'Miscellaneous Award 2020', description: 'Covers workers not covered by another industry or occupation award.', examples: 'General workers, labourers, caretakers, miscellaneous occupations' },
  { code: 'MA000013', slug: 'racing-clubs-award', shortName: 'Racing Clubs Award', fullName: 'Racing Clubs Events Award 2020', description: 'Covers racing clubs and related event operations.', examples: 'Track staff, race day event workers, course attendants' },
  { code: 'MA000120', slug: 'market-research-award', shortName: 'Market Research Award', fullName: 'Market and Social Research Award 2020', description: 'Covers market research and social research activities.', examples: 'Interviewers, research assistants, telephone survey workers' },
  { code: 'MA000102', slug: 'transport-distribution-award', shortName: 'Transport Award', fullName: 'Road Transport and Distribution Award 2020', description: 'Covers road transport and distribution workers.', examples: 'Truck drivers, delivery drivers, transport workers' },
  { code: 'MA000023', slug: 'building-services-award', shortName: 'Building Services Award', fullName: 'Building and Metal Workers On-site Award 2020', description: 'Covers building and construction services workers.', examples: 'Building labourers, metal workers, on-site construction staff' },
  { code: 'MA000005', slug: 'miscellaneous-broken-hill-award', shortName: 'Miscellaneous (Broken Hill) Award', fullName: 'Miscellaneous Award 2020 (Broken Hill)', description: 'Covers workers in the Broken Hill area.', examples: 'General workers in the Broken Hill district' },
  { code: 'MA000026', slug: 'car-parking-award', shortName: 'Car Parking Award', fullName: 'Car Parking Award 2020', description: 'Covers car parking facilities and operations.', examples: 'Parking attendants, valet staff, car park supervisors' },
  { code: 'MA000058', slug: 'broadcasting-award', shortName: 'Broadcasting Award', fullName: 'Broadcasting, Recorded Entertainment and Cinemas Award 2020', description: 'Covers broadcasting, entertainment, and cinema operations.', examples: 'Broadcast technicians, cinema projectionists, entertainment workers' },
  { code: 'MA000082', slug: 'funeral-award', shortName: 'Funeral Award', fullName: 'Funeral Industry Award 2020', description: 'Covers funeral and cemetery services.', examples: 'Funeral directors, cemetery workers, mortuary attendants' },
  { code: 'MA000030', slug: 'passenger-vehicle-award', shortName: 'Passenger Vehicle Award', fullName: 'Passenger Vehicle Transportation Award 2020', description: 'Covers passenger vehicle transport services.', examples: 'Taxi drivers, rideshare drivers, bus drivers, charter drivers' },
  { code: 'MA000063', slug: 'landscaping-award', shortName: 'Landscaping Award', fullName: 'Gardening and Landscaping Services Award 2020', description: 'Covers gardening and landscaping services.', examples: 'Landscapers, gardeners, irrigation technicians' },
  { code: 'MA000095', slug: 'real-estate-award', shortName: 'Real Estate Award', fullName: 'Real Estate Industry Award 2020', description: 'Covers real estate sales, property management, and related services.', examples: 'Real estate agents, property managers, sales associates' },
  { code: 'MA000091', slug: 'broadcasting-cinemas-award', shortName: 'Broadcasting & Cinemas Award', fullName: 'Broadcasting, Recorded Entertainment and Cinemas Award 2020', description: 'Covers broadcasting, recorded entertainment, and cinema workers.', examples: 'Cinema staff, broadcast technicians, recording engineers' },
  { code: 'MA000106', slug: 'real-estate-industry-award', shortName: 'Real Estate Industry Award', fullName: 'Real Estate Industry Award 2020', description: 'Covers real estate agents, property managers, and related roles.', examples: 'Real estate agents, property managers, auctioneers' },
  { code: 'MA000079', slug: 'architects-award', shortName: 'Architects Award', fullName: 'Architects Award 2020', description: 'Covers architects and architectural workers.', examples: 'Graduate architects, registered architects, architectural students' },
  { code: 'MA000016', slug: 'security-award', shortName: 'Security Award', fullName: 'Security Services Industry Award 2020', description: 'Covers security guard and related security services.', examples: 'Security guards, patrol officers, crowd controllers' },
  { code: 'MA000042', slug: 'cash-in-transit-award', shortName: 'Cash in Transit Award', fullName: 'Transport (Cash in Transit) Award 2020', description: 'Covers armoured vehicle and cash-in-transit operations.', examples: 'Armoured vehicle operators, cash escorts, crew leaders' },
  { code: 'MA000032', slug: 'mobile-crane-award', shortName: 'Mobile Crane Award', fullName: 'Mobile Crane Hiring Award 2010', description: 'Covers mobile crane hiring and operations.', examples: 'Mobile crane operators, riggers, crane crew members' },
  { code: 'MA000103', slug: 'supported-employment-award', shortName: 'Supported Employment Award', fullName: 'Supported Employment Services Award 2020', description: 'Covers supported employment services for workers with disability.', examples: 'Supported employees in packaging, assembly, recycling, grounds maintenance' },
  { code: 'MA000105', slug: 'funeral-industry-award', shortName: 'Funeral Industry Award', fullName: 'Funeral Industry Award 2020', description: 'Covers funeral and cemetery services.', examples: 'Funeral directors, cemetery workers, mortuary attendants' },
  { code: 'MA000101', slug: 'gardening-landscaping-award', shortName: 'Gardening & Landscaping Award', fullName: 'Gardening and Landscaping Services Award 2020', description: 'Covers gardening and landscaping services workers.', examples: 'Landscapers, gardeners, irrigation technicians' },
];

export function getAwardBySlug(slug: string): AwardInfo | undefined {
  return AWARDS.find(a => a.slug === slug);
}

export function getAwardByCode(code: string): AwardInfo | undefined {
  return AWARDS.find(a => a.code === code);
}

export function getAllAwardSlugs(): string[] {
  return AWARDS.map(a => a.slug);
}
