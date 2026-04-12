/**
 * Award calculator — deterministic wage calculation engine
 * Supports: MA000009 (Hospitality), MA000003 (Fast Food), MA000119 (Restaurant)
 */

const DEFAULT_AWARD_CODE = 'MA000009';

// ── Superannuation ────────────────────────────────────────────────────────
// SGC rate from 1 July 2025. Super applies to OTE (ordinary time earnings).
// OTE includes: ordinary hours pay + penalty rates on ordinary hours.
// OTE excludes: overtime, missed-break double time, expense allowances.
const SGC_RATE = 0.12; // 12%

// ── Junior rates ──────────────────────────────────────────────────────────
// Applied to the base rate. Casual loading applies on top.
// MA000009 / MA000003: under 16=40%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
// MA000119:            under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100%
// MA000004:            under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
// MA000094:            under 17=55%, 17=65%, 18=75%, 19=85%, 20+=100%
// MA000080:            under 17=55%, 17=65%, 18=75%, 19=85%, 20+=100% (same as MA000094)
// MA000081:            no junior rates — adult rate applies to all ages
// MA000084:            under 16=40%, 16=50%, 17=60%, 18=70%, 19+=100%
// MA000022:            shopping trolley collection only: under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
// MA000028:            under 16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
// MA000033:            under 16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
// MA000002:            under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100% (same as MA000004)
// MA000104:            under 16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=100%
// MA000058:            under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100% (same as MA000009)
// MA000026:            under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100% (same as MA000009 default)
// MA000102:            under 19=80%, 19=90%, 20+=100%
// MA000120:            under 17=70%, 17=80%, 18=90%, 19+=100% (educator L1-L2 only; same flat $ for both levels)
// MA000005:            under 17=50%, 17=75%, 18+=100% (adult)
// MA000023:            15=50%, 16=60%, 17=70%, 18+=100% (clerical stream only, applied to all streams in calculator)
// MA000013:            no simple junior multiplier — non-liquor under-19 = 75% of introductory rate ($24.28);
//                      handled as a special base-rate override in calculateEntitlements().
// MA000009: under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100% (adult) — verified from pay guide
// MA000003 + others: under 16=40%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
const JUNIOR_RATES_DEFAULT = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.85 }; // MA000009 only
const JUNIOR_RATES_MA000119 = { 17: 0.60, 18: 0.70, 19: 0.85 };
const JUNIOR_RATES_MA000094 = { 17: 0.65, 18: 0.75, 19: 0.85 };
const JUNIOR_RATES_MA000080 = { 17: 0.65, 18: 0.75, 19: 0.85 };

function getJuniorMultiplier(age, awardCode = DEFAULT_AWARD_CODE) {
  if (!age) return 1.0;
  if (awardCode === 'MA000119') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.50;
    return JUNIOR_RATES_MA000119[age] || 1.0;
  }
  if (awardCode === 'MA000094') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.55;
    return JUNIOR_RATES_MA000094[age] || 1.0;
  }
  if (awardCode === 'MA000080') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.55;
    return JUNIOR_RATES_MA000080[age] || 1.0;
  }
  if (awardCode === 'MA000081') {
    return 1.0; // No junior rates under the Live Performance Award
  }
  if (awardCode === 'MA000084') {
    if (age >= 19) return 1.0;
    if (age < 16) return 0.40;
    const MA000084_RATES = { 16: 0.50, 17: 0.60, 18: 0.70 };
    return MA000084_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000102') {
    // MA000102 junior rates: under 19=80%, 19=90%, 20+=100% (adult Grade 1)
    if (age >= 20) return 1.0;
    if (age < 19) return 0.80;
    if (age === 19) return 0.90;
    return 1.0;
  }
  if (awardCode === 'MA000082') {
    // MA000082 junior rates: under 18=70%, 18=80%, 19=90%, 20+=adult
    // Note: 18yr+ who have been continuously employed 12 months must get adult rate.
    if (age >= 20) return 1.0;
    if (age < 18) return 0.70;
    const MA000082_RATES = { 18: 0.80, 19: 0.90 };
    return MA000082_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000092') {
    // MA000092 junior rates (Alpine Resorts Award):
    // ≤17: 70%, 18: 80%, ≥19: adult (100%).
    if (age >= 19) return 1.0;
    if (age <= 17) return 0.70;
    const MA000092_RATES = { 18: 0.80 };
    return MA000092_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000074') {
    // MA000074 junior rates (Poultry Processing Award):
    // <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000074_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000074_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000090') {
    // MA000090 junior rates (Wine Industry Award):
    // <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000090_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000090_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000112') {
    // MA000112 junior rates (Local Government Industry Award):
    // <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000112_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000112_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000021') {
    // MA000021 junior rates (Business Equipment Award):
    // <16=42%, 16=42%, 17=55%, 18=75%, 19=95%, 20+=adult.
    if (age >= 20) return 1.0;
    if (age < 17) return 0.42;
    const MA000021_RATES = { 17: 0.55, 18: 0.75, 19: 0.95 };
    return MA000021_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000027') {
    // MA000027 junior rates (Health Professionals — Support Services stream only):
    // <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000027_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000027_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000099') {
    // MA000099 junior rates (Labour Market Assistance Industry Award):
    // <18=70%, 18=80%, 19=90%, 20+=adult.
    if (age >= 20) return 1.0;
    if (age < 18) return 0.70;
    const MA000099_RATES = { 18: 0.80, 19: 0.90 };
    return MA000099_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000019') {
    // MA000019 junior rates (Banking, Finance and Insurance Award):
    // <17=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 17) return 0.50;
    const MA000019_RATES = { 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000019_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000083') {
    // MA000083 junior rates (Commercial Sales Award):
    // ≤18=75%, 19=88.9%, 20+=adult.
    if (age >= 20) return 1.0;
    if (age <= 18) return 0.75;
    const MA000083_RATES = { 19: 0.889 };
    return MA000083_RATES[age] || 1.0;
  }
  // MA000065 (Professional), MA000121 (State Govt), MA000034 (Nurses),
  // MA000077 (Teachers), MA000038 (Road Transport) — no junior rates
  if (awardCode === 'MA000012') {
    // MA000012 junior rates (Pharmacy Industry Award):
    // 16=50%, 17=60%, 18=70%, 19=80%, 20+=adult.
    if (age >= 20) return 1.0;
    if (age < 16) return 0.50;
    const MA000012_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80 };
    return MA000012_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000116') {
    // MA000116 junior rates (Legal Services Award):
    // <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000116_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000116_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000118') {
    // MA000118 junior rates (Animal Care & Vet Services Award):
    // <17=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 17) return 0.50;
    const MA000118_RATES = { 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000118_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000018') {
    // MA000018 junior rates (Aged Care Award — General stream):
    // <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000018_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000018_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000100') {
    // MA000100 junior rates (SCHADS Award — SACS stream):
    // <17=54%, 17=64.3%, 18=76.7%, 19=87.7%, 20=97.7%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 17) return 0.54;
    const MA000100_RATES = { 17: 0.643, 18: 0.767, 19: 0.877, 20: 0.977 };
    return MA000100_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000010') {
    // MA000010 junior rates (Manufacturing Award):
    // <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000010_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000010_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000076') {
    // MA000076 junior rates (Education Schools General Staff):
    // <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000076_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000076_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000089') {
    // MA000089 junior rates (Vehicle Repair, Services and Retail Award):
    // <16=42%, 16=47%, 17=55%, 18=75%, 19=95%, 20+=adult.
    if (age >= 20) return 1.0;
    if (age < 16) return 0.42;
    const MA000089_RATES = { 16: 0.47, 17: 0.55, 18: 0.75, 19: 0.95 };
    return MA000089_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000020') {
    // MA000020 (Building & Construction) — no standard junior rates
    return 1.0;
  }
  if (awardCode === 'MA000025' || awardCode === 'MA000029') {
    // MA000025 (Electrical), MA000029 (Joinery) — trades junior rates:
    // <16=42%, 16=42%, 17=55%, 18=75%, 19=95%, 20+=adult.
    if (age >= 20) return 1.0;
    if (age < 17) return 0.42;
    const TRADES_RATES = { 17: 0.55, 18: 0.75, 19: 0.95 };
    return TRADES_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000073') {
    // MA000073 (Food, Beverage & Tobacco Manufacturing):
    // <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000073_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000073_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000059') {
    // MA000059 (Meat Industry): <16=70%, 16=70%, 17=80%, 18+=adult.
    if (age >= 18) return 1.0;
    if (age < 17) return 0.70;
    const MA000059_RATES = { 17: 0.80 };
    return MA000059_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000041') {
    // MA000041 (Telecommunications): <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000041_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000041_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000096') {
    // MA000096 (Dry Cleaning & Laundry): <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000096_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000096_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000113') {
    // MA000113 (Water Industry): <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000113_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000113_RATES[age] || 1.0;
  }
  // MA000036 (Plumbing), MA000043 (Waste), MA000098 (Ambulance) — no junior rates
  if (awardCode === 'MA000006' || awardCode === 'MA000014' || awardCode === 'MA000015') {
    return 1.0; // No junior rates — mining/ports employees typically 18+, licence required
  }
  if (awardCode === 'MA000007' || awardCode === 'MA000011' || awardCode === 'MA000045') {
    return 1.0; // No junior rates — heavy industry awards
  }
  if (awardCode === 'MA000008' || awardCode === 'MA000024' || awardCode === 'MA000040') {
    return 1.0; // No junior rates specified
  }
  if (awardCode === 'MA000001' || awardCode === 'MA000017' || awardCode === 'MA000031') {
    return 1.0; // No junior rates — health/corrections/modelling
  }
  if (awardCode === 'MA000037' || awardCode === 'MA000047' || awardCode === 'MA000048') {
    return 1.0; // No junior rates — salt/asphalt/cemetery
  }
  if (awardCode === 'MA000050' || awardCode === 'MA000051' || awardCode === 'MA000054') {
    return 1.0; // No junior rates — concrete products/coal terminals/electrical power
  }
  if (awardCode === 'MA000060' || awardCode === 'MA000061' || awardCode === 'MA000062') {
    return 1.0; // No junior rates — marine/airline/airport
  }
  if (awardCode === 'MA000064' || awardCode === 'MA000066' || awardCode === 'MA000067') {
    return 1.0; // No junior rates — pest control/animal training/hydrocarbons
  }
  if (awardCode === 'MA000070' || awardCode === 'MA000075' || awardCode === 'MA000078') {
    return 1.0; // No junior rates — silviculture/rail/stevedoring
  }
  if (awardCode === 'MA000035') {
    // MA000035 (Pastoral Award): <16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=adult.
    if (age >= 20) return 1.0;
    if (age < 16) return 0.50;
    const MA000035_RATES = { 16: 0.60, 17: 0.70, 18: 0.80, 19: 0.90 };
    return MA000035_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000039') {
    // MA000039 (Seafood Processing): <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000039_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000039_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000044') {
    // MA000044 (Timber Industry): <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000044_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000044_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000046') {
    // MA000046 (Textile, Clothing, Footwear): <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000046_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000046_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000120') {
    // MA000120 junior rates (Children's Services Award — educator L1 and L2 only):
    // Under 17: 70%, 17yr: 80%, 18yr: 90%, 19+: adult.
    // Both L1 and L2 juniors earn the same flat dollar amounts ($18.90, $21.60, $24.30).
    // Percentages are exact for L2 ($27.00 base) but approximate for L1 ($26.19 base).
    if (age >= 19) return 1.0;
    if (age < 17) return 0.70;
    const MA000120_RATES = { 17: 0.80, 18: 0.90 };
    return MA000120_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000023') {
    // MA000023 junior rates (clerical stream only per award, applied to all streams here):
    // 15=50%, 16=60%, 17=70%, 18+=100% (adult)
    if (age >= 18) return 1.0;
    if (age <= 15) return 0.50;
    const MA000023_RATES = { 16: 0.60, 17: 0.70 };
    return MA000023_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000005') {
    // MA000005 junior rates: under 17=50%, 17=75%, 18+=100% (adult)
    if (age >= 18) return 1.0;
    if (age < 17) return 0.50;
    if (age === 17) return 0.75;
    return 1.0;
  }
  if (awardCode === 'MA000022') {
    // Junior rates apply only to shopping trolley collection contractors.
    // For all other cleaning work, adult rate applies from commencement.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000022_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000022_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000028') {
    // MA000028 junior rates: <16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
    if (age >= 20) return 1.0;
    if (age < 16) return 0.50;
    const MA000028_RATES = { 16: 0.60, 17: 0.70, 18: 0.80, 19: 0.90 };
    return MA000028_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000033') {
    // MA000033 junior rates: <16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
    if (age >= 20) return 1.0;
    if (age < 16) return 0.50;
    const MA000033_RATES = { 16: 0.60, 17: 0.70, 18: 0.80, 19: 0.90 };
    return MA000033_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000104') {
    // MA000104 junior rates (Miscellaneous Award Schedule A):
    // <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=100%
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000104_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000104_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000013') {
    // MA000013: junior rate is NOT a simple multiplier of own classification rate.
    // Non-liquor under-19 = 75% of introductory rate — handled in calculateEntitlements().
    // Liquor employees use separate junior classification (level 2) with own base_hourly.
    return 1.0;
  }
  if (awardCode === 'MA000016') {
    return 1.0; // No junior rates — security licence requires 18+
  }
  if (awardCode === 'MA000042') {
    return 1.0; // No junior rates — security licence required
  }
  if (awardCode === 'MA000032') {
    return 1.0; // No junior rates — crane licence required
  }
  if (awardCode === 'MA000103') {
    return 1.0; // No junior rates — supported employment uses grade-based classification
  }
  if (awardCode === 'MA000030' || awardCode === 'MA000095' || awardCode === 'MA000105') {
    return 1.0; // No junior rates specified in these awards' pay guides
  }
  if (awardCode === 'MA000079') {
    return 1.0; // No junior multiplier — student rates are separate classifications
  }
  if (awardCode === 'MA000106') {
    if (age >= 21) return 1.0;
    if (age < 19) return 0.60;
    const RATES = { 19: 0.70, 20: 0.80 };
    return RATES[age] || 1.0;
  }
  if (awardCode === 'MA000091') {
    if (age >= 21) return 1.0;
    if (age < 16) return 0.507;
    const RATES = { 16: 0.507, 17: 0.620, 18: 0.733, 19: 0.846, 20: 0.958 };
    return RATES[age] || 1.0;
  }
  if (awardCode === 'MA000063') {
    // MA000063: Under 19=70%, 19=80%, 20+=adult
    // Note: 18+ driving passenger vehicle in sole control must be paid adult rate (handled by employer)
    if (age >= 20) return 1.0;
    if (age < 19) return 0.70;
    if (age === 19) return 0.80;
    return 1.0;
  }
  if (awardCode === 'MA000101') {
    // MA000101: Under 18=70%, 18=80%, 19=90%, 20+=adult
    // Note: Trade qualified juniors must be paid adult rate (handled by employer)
    if (age >= 20) return 1.0;
    if (age < 18) return 0.70;
    const MA000101_RATES = { 18: 0.80, 19: 0.90 };
    return MA000101_RATES[age] || 1.0;
  }
  // MA000058 (Registered and Licensed Clubs): under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult (same as MA000009)
  // MA000026 (Graphic Arts, Printing and Publishing): under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult (same as MA000009)
  if (awardCode === 'MA000058' || awardCode === 'MA000026') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.50;
    return JUNIOR_RATES_DEFAULT[age] || 1.0;
  }
  // MA000009: under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult
  if (awardCode === 'MA000009') {
    if (age >= 20) return 1.0;
    if (age < 16) return 0.40;
    return JUNIOR_RATES_DEFAULT[age] || 1.0;
  }
  // MA000003, MA000004, MA000002: under 16=40-45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult
  if (awardCode === 'MA000004' || awardCode === 'MA000002') {
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000004_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000004_RATES[age] || 1.0;
  }
  // MA000003 and remaining defaults: under 16=40%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult
  if (age >= 21) return 1.0;
  if (age < 16) return 0.40;
  const DEFAULT_FULL = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
  return DEFAULT_FULL[age] || 1.0;
}

// ── Day type ──────────────────────────────────────────────────────────────
function getDayType(dateStr, publicHolidays = []) {
  const date = new Date(dateStr + 'T00:00:00');
  const dow = date.getDay(); // 0=Sun, 6=Sat
  if (publicHolidays.includes(dateStr)) return 'public_holiday';
  if (dow === 0) return 'sunday';
  if (dow === 6) return 'saturday';
  return 'weekday';
}

function timeToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function shiftDurationMinutes(startTime, endTime) {
  let start = timeToMinutes(startTime);
  let end = timeToMinutes(endTime);
  if (end <= start) end += 24 * 60;
  return end - start;
}

function getISOWeek(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return `${d.getUTCFullYear()}-W${Math.ceil((((d - yearStart) / 86400000) + 1) / 7)}`;
}

// ── Segment calculation ───────────────────────────────────────────────────
// Returns minute-by-minute segments grouped by {dayType, multiplier, addition_per_hour}.
// Evening/night loadings are flat $/hr additions (addition_per_hour > 0) with multiplier=1.0.
// Multiplier-based rates and addition-based rates are mutually exclusive by design
// (addition rates always have multiplier=1.0 and apply only on weekdays).
function calculateShiftSegments(dateStr, startTime, endTime, employmentType, penaltyRates, publicHolidays = []) {
  const startMinutes = timeToMinutes(startTime);
  let endMinutes = timeToMinutes(endTime);
  if (endMinutes <= startMinutes) endMinutes += 24 * 60;

  const startDate = new Date(dateStr + 'T00:00:00');
  const nextDate = new Date(startDate);
  nextDate.setDate(nextDate.getDate() + 1);
  // Use local date parts to avoid UTC timezone shift (toISOString converts to UTC)
  const nextDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;

  const totalMinutes = endMinutes - startMinutes;
  let currentGroup = null;
  const segments = [];

  for (let i = 0; i < totalMinutes; i++) {
    const absoluteMinute = startMinutes + i;
    const minuteOfDay = absoluteMinute % (24 * 60);
    const currentDateStr = absoluteMinute >= 24 * 60 ? nextDateStr : dateStr;
    const dayType = getDayType(currentDateStr, publicHolidays);

    const applicableRates = penaltyRates.filter(r => {
      if (r.employment_type !== employmentType) return false;
      if (r.day_type !== dayType) return false;
      if (r.time_band_start && r.time_band_end) {
        const bandStart = timeToMinutes(r.time_band_start);
        const bandEnd = timeToMinutes(r.time_band_end);
        if (bandEnd <= bandStart) return minuteOfDay >= bandStart || minuteOfDay < bandEnd;
        return minuteOfDay >= bandStart && minuteOfDay < bandEnd;
      }
      return true;
    });

    // Separate multiplier-based rates from flat-addition rates
    const multiplierRates = applicableRates.filter(r => !parseFloat(r.addition_per_hour));
    const additionRates = applicableRates.filter(r => parseFloat(r.addition_per_hour) > 0);

    const multiplier = multiplierRates.length > 0
      ? Math.max(...multiplierRates.map(r => parseFloat(r.multiplier)))
      : 1.0;
    const addition_per_hour = additionRates.length > 0
      ? Math.max(...additionRates.map(r => parseFloat(r.addition_per_hour)))
      : 0;

    const key = `${dayType}_${multiplier}_${addition_per_hour}`;
    if (currentGroup && currentGroup.key === key) {
      currentGroup.minutes++;
    } else {
      if (currentGroup) segments.push(currentGroup);
      currentGroup = { key, dayType, multiplier, addition_per_hour, minutes: 1 };
    }
  }
  if (currentGroup) segments.push(currentGroup);
  return segments;
}

// ── Missed meal break — double time after 5 hours (Award clause 20.6) ────
// If no meal break was taken and shift > 5 hours, hours beyond 5 hours are
// paid at double time (or the existing penalty rate if already higher).
function applyMissedBreakPenalty(segments, mealBreakTaken) {
  if (mealBreakTaken) return { segments, missedBreakApplied: false };

  const THRESHOLD = 5 * 60; // 300 minutes
  const totalWorked = segments.reduce((s, seg) => s + seg.minutes, 0);
  if (totalWorked <= THRESHOLD) return { segments, missedBreakApplied: false };

  let cumulative = 0;
  const result = [];

  for (const seg of segments) {
    if (cumulative >= THRESHOLD) {
      result.push({ ...seg, multiplier: Math.max(seg.multiplier, 2.0), missedBreakPenalty: true });
    } else if (cumulative + seg.minutes > THRESHOLD) {
      const before = THRESHOLD - cumulative;
      const after = seg.minutes - before;
      result.push({ ...seg, minutes: before });
      result.push({ ...seg, minutes: after, multiplier: Math.max(seg.multiplier, 2.0), missedBreakPenalty: true });
    } else {
      result.push(seg);
    }
    cumulative += seg.minutes;
  }

  return { segments: result, missedBreakApplied: true };
}

// ── Break compliance ──────────────────────────────────────────────────────
function checkBreakCompliance(shift, breakEntitlements) {
  const violations = [];
  const shiftMinutes = shiftDurationMinutes(shift.startTime, shift.endTime);
  const shiftHours = shiftMinutes / 60;

  const mealRule = breakEntitlements.find(b => b.break_type === 'meal');
  if (mealRule && shiftHours > parseFloat(mealRule.shift_hours_min)) {
    if (!shift.mealBreakTaken) {
      violations.push({
        type: 'meal_break',
        severity: 'warning',
        message: `No meal break taken on a ${shiftHours.toFixed(1)}-hour shift. Hours after the 5-hour mark have been calculated at double time (as per the award).`,
        entitlement: mealRule.description,
      });
    } else if (shift.mealBreakDuration < mealRule.break_duration_min) {
      violations.push({
        type: 'meal_break',
        severity: 'warning',
        message: `Your meal break was only ${shift.mealBreakDuration} minutes — the award requires at least ${mealRule.break_duration_min} minutes.`,
        entitlement: mealRule.description,
      });
    }
  }

  const restRule = breakEntitlements.find(b => b.break_type === 'rest');
  if (restRule) {
    const requiredRestBreaks = Math.floor(shiftHours / parseFloat(restRule.shift_hours_min));
    if (requiredRestBreaks > 0 && !shift.restBreakTaken) {
      violations.push({
        type: 'rest_break',
        severity: 'warning',
        message: `You should have received ${requiredRestBreaks} paid 10-minute rest break${requiredRestBreaks > 1 ? 's' : ''} during this shift. These are paid breaks your employer must provide.`,
        entitlement: restRule.description,
      });
    }
  }

  return violations;
}

// ── Minimum shift (minimum engagement) ───────────────────────────────────
// If an employee works less than the minimum engagement period, they must still
// be paid for the full minimum at the applicable penalty rate for that day.
// Values are in HOURS. Full-time is omitted (contracted hours apply).
const MINIMUM_SHIFT_HOURS = {
  MA000009: { casual: 2, part_time: 2 },
  MA000003: { casual: 3, part_time: 3 },
  MA000119: { casual: 2, part_time: 2 },
  MA000004: { casual: 3, part_time: 3 },
  MA000094: { casual: 2, part_time: 2 },
  MA000080: { casual: 2, part_time: 2 },
  MA000081: { casual: 2, part_time: 2 },
  MA000084: { casual: 2, part_time: 2 },
  MA000022: { casual: 2, part_time: 2 },
  MA000028: { casual: 2, part_time: 2 },
  MA000033: { casual: 2, part_time: 2 },
  MA000002: { casual: 3, part_time: 3 },
  MA000104: { casual: 2, part_time: 2 },
  MA000013: { casual: 4, part_time: 4, full_time: 4 },
  MA000102: { casual: 2, part_time: 2 },
  MA000082: { casual: 2, part_time: 2 },
  MA000120: { casual: 2, part_time: 2 },
  MA000023: { casual: 3, part_time: 3 },
  MA000005: { casual: 3, part_time: 3 },
  MA000058: { casual: 2, part_time: 2 },
  MA000026: { casual: 2, part_time: 2 },
  MA000030: { casual: 3, part_time: 3 },
  MA000063: { casual: 2, part_time: 2 },
  MA000095: { casual: 3, part_time: 3 },
  MA000105: { casual: 2, part_time: 2 },
  MA000101: { casual: 2, part_time: 2 },
};

function getMinimumShiftMinutes(awardCode, employmentType) {
  const map = MINIMUM_SHIFT_HOURS[awardCode];
  if (!map) return 0;
  return (map[employmentType] || 0) * 60;
}

// ── Overtime ──────────────────────────────────────────────────────────────
// Only the PREMIUM above ordinary rate is added here — ordinary pay for all
// worked hours is already included in totalOrdinaryPay. Adding the full OT rate
// would double-count the base portion already paid.
//
// period: 'weekly' → 38hr threshold per ISO week
//         'fortnightly' → 76hr threshold across all shifts (averaging arrangement)
function calculateOvertime(processedShifts, employmentType, baseHourlyRate, overtimeRates, period = 'weekly') {
  // Casuals: check DB for award-specific casual overtime rates (e.g. MA000094, MA000084, MA000022, MA000119).
  // If no casual rates are seeded, weeklyRates/dailyRates will be empty and nothing is calculated.

  // Deduplicate overtime rates by (period, threshold_hours) — multiple seed runs
  // can leave duplicate entries with the same threshold but different IDs.
  function dedupeOTRates(rates) {
    const seen = new Map();
    for (const r of rates) {
      const key = `${r.period}_${r.threshold_hours}`;
      if (!seen.has(key)) seen.set(key, r);
    }
    return Array.from(seen.values());
  }

  const weeklyRates = dedupeOTRates(overtimeRates
    .filter(r => r.employment_type === employmentType && r.period === 'weekly'))
    .sort((a, b) => parseFloat(a.threshold_hours) - parseFloat(b.threshold_hours));

  const dailyRates = dedupeOTRates(overtimeRates
    .filter(r => r.employment_type === employmentType && r.period === 'daily'))
    .sort((a, b) => parseFloat(a.threshold_hours) - parseFloat(b.threshold_hours));

  // Multipliers from DB (fall back to award defaults if table is empty)
  const firstBandMultiplier = weeklyRates[0] ? parseFloat(weeklyRates[0].multiplier) : 1.5;
  const secondBandMultiplier = weeklyRates[1] ? parseFloat(weeklyRates[1].multiplier) : 2.0;
  // Weekly threshold per week (38) and second-band threshold per week (40)
  const weeklyThreshold = weeklyRates[0] ? parseFloat(weeklyRates[0].threshold_hours) : 38;
  const secondBandThreshold = weeklyRates[1] ? parseFloat(weeklyRates[1].threshold_hours) : 40;

  // Build list of periods to check
  let periodsToCheck;
  if (period === 'fortnightly') {
    // Treat all shifts as a single averaging period (76 hr threshold)
    periodsToCheck = [{ key: 'fortnight', shifts: processedShifts }];
  } else {
    const shiftsByWeek = {};
    for (const shift of processedShifts) {
      const weekKey = getISOWeek(shift.date);
      if (!shiftsByWeek[weekKey]) shiftsByWeek[weekKey] = [];
      shiftsByWeek[weekKey].push(shift);
    }
    periodsToCheck = Object.entries(shiftsByWeek).map(([key, shifts]) => ({ key, shifts }));
  }

  const periodWeeks = period === 'fortnightly' ? 2 : 1;
  const periodThresholdMinutes = weeklyThreshold * periodWeeks * 60;
  const secondBandThresholdMinutes = secondBandThreshold * periodWeeks * 60;

  let totalOvertimePay = 0;
  let totalOvertimeMinutes = 0;
  const breakdown = [];
  let totalMealAllowancesOwed = 0;

  for (const { key, shifts } of periodsToCheck) {
    // Daily overtime — aggregate all shifts on the same DATE so that two 6hr shifts
    // on the same day (12hr total) correctly trigger daily OT.
    let dailyOtMinutesInPeriod = 0;
    if (dailyRates.length) {
      const shiftsByDate = {};
      for (const shift of shifts) {
        if (!shiftsByDate[shift.date]) shiftsByDate[shift.date] = [];
        shiftsByDate[shift.date].push(shift);
      }
      for (const [date, dayShifts] of Object.entries(shiftsByDate)) {
        const totalDayMinutes = dayShifts.reduce((s, sh) => s + sh.workedMinutes, 0);
        const dailyThresholdMinutes = parseFloat(dailyRates[0].threshold_hours) * 60;
        if (totalDayMinutes > dailyThresholdMinutes) {
          const otMinutes = totalDayMinutes - dailyThresholdMinutes;
          const dailySecondThresholdMinutes = dailyRates[1]
            ? (parseFloat(dailyRates[1].threshold_hours) - parseFloat(dailyRates[0].threshold_hours)) * 60
            : otMinutes;
          const firstDailyBand = Math.min(otMinutes, dailySecondThresholdMinutes);
          const secondDailyBand = Math.max(0, otMinutes - firstDailyBand);
          const m1 = parseFloat(dailyRates[0].multiplier);
          const m2 = dailyRates[1] ? parseFloat(dailyRates[1].multiplier) : 2.0;

          // Per-minute higher-of logic: for each OT minute, OT premium is
          // MAX(0, otMultiplier - penaltyMultiplier) × base / 60.
          // Walk backwards from end of the day's segments to find what penalty
          // each OT minute already received.
          const allSegments = dayShifts.flatMap(sh => (sh.segments || []).filter(s => s.dayType !== 'overtime'));
          const daySegMins = [];
          for (const seg of allSegments) {
            for (let m = 0; m < (seg.minutes || 0); m++) {
              daySegMins.push(seg.multiplier || 1.0);
            }
          }
          const dailyOtStartIdx = daySegMins.length - otMinutes;
          let pay = 0;
          let consumedDailyOt = 0;
          for (let i = dailyOtStartIdx; i < daySegMins.length; i++) {
            const penaltyMult = daySegMins[i] || 1.0;
            const otMult = consumedDailyOt < firstDailyBand ? m1 : m2;
            const effectivePremium = Math.max(0, otMult - penaltyMult);
            pay += (1 / 60) * baseHourlyRate * effectivePremium;
            consumedDailyOt++;
          }
          totalOvertimePay += pay;
          totalOvertimeMinutes += otMinutes;
          dailyOtMinutesInPeriod += otMinutes;
          // Meal allowance: one per 4 hours of daily OT (or part thereof)
          const dailyMeals = Math.ceil(otMinutes / (4 * 60));
          totalMealAllowancesOwed += dailyMeals;
          breakdown.push({ type: 'daily', date, overtimeMinutes: otMinutes, firstBandMinutes: firstDailyBand, secondBandMinutes: secondDailyBand, firstBandMultiplier: m1, secondBandMultiplier: m2, pay, mealAllowancesOwed: dailyMeals });
        }
      }
    }

    // Period (weekly/fortnightly) overtime
    // Deduct daily OT minutes already counted to avoid double-paying the premium.
    if (!weeklyRates.length) continue;
    const totalPeriodMinutes = shifts.reduce((s, sh) => s + sh.workedMinutes, 0);
    if (totalPeriodMinutes > periodThresholdMinutes) {
      const rawOvertimeMinutes = totalPeriodMinutes - periodThresholdMinutes;
      const overtimeMinutes = Math.max(0, rawOvertimeMinutes - dailyOtMinutesInPeriod);
      if (overtimeMinutes <= 0) continue; // all OT already covered by daily
      const firstBandCap = secondBandThresholdMinutes - periodThresholdMinutes;
      const firstBand = Math.min(overtimeMinutes, firstBandCap);
      const secondBand = Math.max(0, overtimeMinutes - firstBand);

      // Compute OT premium per-minute using higher-of logic.
      // Walk backwards from the last shift's last segment to find what penalty
      // multiplier each OT minute already received. For each minute, the OT
      // premium is MAX(0, otMultiplier - penaltyMultiplier) × base / 60.
      const allShiftsSorted = [...shifts].sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return (a.startTime || '').localeCompare(b.startTime || '');
      });
      // Collect all non-OT segments in order with their multipliers
      const allSegMins = [];
      for (const sh of allShiftsSorted) {
        for (const seg of (sh.segments || [])) {
          if (seg.dayType === 'overtime') continue;
          for (let m = 0; m < (seg.minutes || 0); m++) {
            allSegMins.push(seg.multiplier || 1.0);
          }
        }
      }
      // The OT minutes are the LAST N minutes of the total worked period
      const otStartIdx = allSegMins.length - overtimeMinutes;
      let pay = 0;
      let consumedOt = 0;
      for (let i = otStartIdx; i < allSegMins.length; i++) {
        const penaltyMult = allSegMins[i] || 1.0;
        const otMult = consumedOt < firstBand ? firstBandMultiplier : secondBandMultiplier;
        const effectivePremium = Math.max(0, otMult - penaltyMult);
        pay += (1 / 60) * baseHourlyRate * effectivePremium;
        consumedOt++;
      }
      totalOvertimePay += pay;
      totalOvertimeMinutes += overtimeMinutes;

      // Meal allowance: one per 4 hours of weekly OT (or part thereof).
      // Deduct daily OT minutes already counted above to avoid double-counting.
      const uncoveredWeeklyOtMinutes = Math.max(0, overtimeMinutes - dailyOtMinutesInPeriod);
      const mealAllowancesOwed = uncoveredWeeklyOtMinutes > 0
        ? Math.ceil(uncoveredWeeklyOtMinutes / (4 * 60))
        : 0;
      totalMealAllowancesOwed += mealAllowancesOwed;

      breakdown.push({
        type: period === 'fortnightly' ? 'fortnightly' : 'weekly',
        key,
        overtimeMinutes,
        firstBandMinutes: firstBand,
        secondBandMinutes: secondBand,
        firstBandMultiplier,
        secondBandMultiplier,
        pay,
        mealAllowancesOwed,
      });
    }
  }

  return {
    overtimePay: Math.round(totalOvertimePay * 100) / 100,
    overtimeMinutes: totalOvertimeMinutes,
    overtimeBreakdown: breakdown,
    mealAllowancesOwed: totalMealAllowancesOwed,
  };
}

// ── Label helpers ─────────────────────────────────────────────────────────
function getDayLabel(dayType) {
  return { weekday: 'Weekday', saturday: 'Saturday', sunday: 'Sunday', public_holiday: 'Public holiday' }[dayType] || dayType;
}

function getRateLabel(multiplier, addition_per_hour, missedBreakPenalty, dayType) {
  if (missedBreakPenalty) return `Double time (×2.0) — meal break not taken after 5 hours`;
  if (addition_per_hour === 7.07) return dayType === 'weekday' ? 'Out-of-hours Mon–Fri (8pm–8am) +$7.07/hr' : 'Saturday loading +$7.07/hr';
  if (addition_per_hour === 14.15) return dayType === 'sunday' ? 'Sunday loading +$14.15/hr' : 'Public holiday loading +$14.15/hr';
  if (addition_per_hour === 4.22) return `Night work loading (midnight–7am) +$4.22/hr`;
  if (addition_per_hour === 2.81) return `Evening loading (7pm–midnight) +$2.81/hr`;
  if (addition_per_hour === 12.3)  return 'Sunday — liquor bar (+$12.30/hr above Mon–Sat all-in rate)';
  if (addition_per_hour === 9.86)  return 'Sunday — junior liquor (+$9.86/hr above Mon–Sat all-in rate)';
  if (addition_per_hour === 24.13) return 'Public holiday — liquor bar (+$24.13/hr above Mon–Sat all-in rate)';
  if (addition_per_hour === 19.32) return 'Public holiday — junior liquor (+$19.32/hr above Mon–Sat all-in rate)';
  if (multiplier === 1.0) return 'Ordinary rate (×1.0)';
  if (multiplier === 1.1) return 'Evening loading (10pm–midnight, ×1.10)';
  if (multiplier === 1.12) return 'Outside span of hours — Sunday (×1.12 of casual base)';
  if (multiplier === 1.15) return dayType === 'weekday' ? 'Afternoon/night shift Mon–Fri (×1.15)' : 'Late night loading (midnight–6am, ×1.15)';
  if (multiplier === 1.16) return dayType === 'weekday' ? 'Evening/night loading — casual (7pm–7am, ×1.16 of casual base)' : 'Saturday penalty — casual (×1.16 of casual base = ×1.45 of FT)';
  if (multiplier === 1.2) return dayType === 'weekday' ? 'Evening/night loading (7pm–7am, ×1.20)' : 'Saturday penalty (×1.2)';
  if (multiplier === 1.25) return dayType === 'weekday' ? 'Evening loading (after 6pm, ×1.25)' : 'Saturday penalty (×1.25)';
  if (multiplier === 1.24) return 'Night cleaning (11pm–7am, casual) — ×1.24 of casual base';
  if (multiplier === 1.4) return dayType === 'saturday' ? 'Saturday penalty (×1.4)' : dayType === 'sunday' ? 'Sunday penalty (×1.4)' : 'Penalty (×1.4)';
  if (multiplier === 1.6) return dayType === 'sunday' ? 'Casual Sunday (×1.60 of casual base = 200% FT base)' : 'Rate ×1.60';
  if (multiplier === 1.5) return dayType === 'saturday' ? 'Saturday afternoon — time and a half (×1.5)' : 'Sunday / time and a half (×1.5)';
  if (multiplier === 1.8) return 'Public holiday — casual (×1.80 of casual base = 225% of FT)';
  if (multiplier === 2.0) return dayType === 'sunday' ? 'Sunday — double time (×2.0)' : 'Double time (×2.0)';
  if (multiplier === 2.25) return 'Public holiday — double time and a quarter (×2.25)';
  if (multiplier === 2.5) return 'Public holiday — double time and a half (×2.50)';
  return `×${multiplier}`;
}

// ── Main calculation ──────────────────────────────────────────────────────
async function calculateEntitlements(input, db) {
  const {
    employmentType,
    classificationId,
    age,
    shifts,
    publicHolidays = [],
    period = 'weekly',
    awardCode = DEFAULT_AWARD_CODE,
    allPurposeAllowancesPerHour = 0,  // All-purpose allowances (e.g. MA000028 first aid, leading hand, wet work)
  } = input;

  const juniorMultiplier = getJuniorMultiplier(age, awardCode);

  // Fetch the most current base rate
  const rateResult = await db.query(`
    SELECT rate_amount FROM pay_rates
    WHERE award_code = $1 AND classification_id = $2 AND employment_type = $3 AND rate_type = 'base_hourly'
    ORDER BY effective_date DESC LIMIT 1
  `, [awardCode, classificationId, employmentType]);

  if (!rateResult.rows.length) throw new Error('No pay rate found for this classification and employment type');

  const rawBaseRate = parseFloat(rateResult.rows[0].rate_amount);

  // ── All-purpose allowance handling ────────────────────────────────────────
  // All-purpose allowances (e.g. MA000028 first aid, leading hand, wet work) must be
  // added to the FT/PT base rate BEFORE casual loading, penalties, and overtime.
  // For casual employees, the stored base_hourly rate already includes the 25% casual
  // loading. To correctly apply the all-purpose allowance, we fetch the FT base rate,
  // add the allowance, then reapply the casual loading.
  let effectiveBaseRate = rawBaseRate;
  if (allPurposeAllowancesPerHour > 0) {
    if (employmentType === 'casual') {
      // Fetch the FT base rate to correctly add allowance before loading
      const ftRateResult = await db.query(`
        SELECT rate_amount FROM pay_rates
        WHERE award_code = $1 AND classification_id = $2 AND employment_type = 'full_time' AND rate_type = 'base_hourly'
        ORDER BY effective_date DESC LIMIT 1
      `, [awardCode, classificationId]);
      const ftBase = ftRateResult.rows.length ? parseFloat(ftRateResult.rows[0].rate_amount) : rawBaseRate / 1.25;
      effectiveBaseRate = parseFloat(((ftBase + allPurposeAllowancesPerHour) * 1.25).toFixed(4));
    } else {
      effectiveBaseRate = parseFloat((rawBaseRate + allPurposeAllowancesPerHour).toFixed(4));
    }
  }

  // MA000013: junior rates for non-liquor employees (clause 17.2)
  // Under-19 pay = 75% of the introductory rate ($24.28 FT), regardless of classification grade.
  // This overrides effectiveBaseRate before baseHourlyRate is calculated.
  if (awardCode === 'MA000013' && age && age < 19) {
    const streamResult = await db.query('SELECT stream FROM classifications WHERE id = $1', [classificationId]);
    const classStream = streamResult.rows[0]?.stream;
    if (classStream !== 'liquor') {
      const introResult = await db.query(`
        SELECT pr.rate_amount FROM pay_rates pr
        JOIN classifications c ON c.id = pr.classification_id
        WHERE pr.award_code = $1 AND c.level = 0 AND c.stream = 'racecourse'
          AND pr.employment_type = 'full_time' AND pr.rate_type = 'base_hourly'
        ORDER BY pr.effective_date DESC LIMIT 1
      `, [awardCode]);
      if (introResult.rows.length) {
        const introFTRate = parseFloat(introResult.rows[0].rate_amount);
        const juniorFTRate = parseFloat((introFTRate * 0.75).toFixed(4));
        effectiveBaseRate = employmentType === 'casual'
          ? parseFloat((juniorFTRate * 1.25).toFixed(4))
          : juniorFTRate;
      }
    }
  }

  const baseHourlyRate = parseFloat((effectiveBaseRate * juniorMultiplier).toFixed(4));

  // Fetch the effective date of the rate
  const rateDateResult = await db.query(`
    SELECT effective_date FROM pay_rates
    WHERE award_code = $1 AND classification_id = $2 AND employment_type = $3 AND rate_type = 'base_hourly'
    ORDER BY effective_date DESC LIMIT 1
  `, [awardCode, classificationId, employmentType]);
  const effectiveDate = rateDateResult.rows[0]?.effective_date?.toISOString().split('T')[0] || '2025-07-01';

  // ── Shift type detection: check if any shift uses a special type ──────────
  // Supported shiftTypes: null/undefined/'standard', 'remote', '24hr_care', 'broken', 'sleepover'
  const hasRemoteShifts = shifts.some(s => s.shiftType === 'remote');
  const has24hrCareShifts = shifts.some(s => s.shiftType === '24hr_care');
  const hasBrokenShifts = shifts.some(s => s.shiftType === 'broken');

  // Fetch stream for this classification (needed for stream-specific OT rules)
  const classStreamResult = await db.query('SELECT stream FROM classifications WHERE id = $1', [classificationId]);
  const classificationStream = classStreamResult.rows[0]?.stream || null;

  const penaltyResult = await db.query(
    `SELECT * FROM penalty_rates WHERE award_code = $1 AND employment_type = $2 AND (shift_type IS NULL OR shift_type = $3) ORDER BY effective_date DESC`,
    [awardCode, employmentType, hasRemoteShifts ? 'remote' : '___none___']
  );
  let penaltyRates = penaltyResult.rows;

  // For remote shifts, prefer shift_type='remote' penalty rates; for standard shifts, use shift_type IS NULL
  if (hasRemoteShifts) {
    const remotePenalties = penaltyRates.filter(r => r.shift_type === 'remote');
    const standardPenalties = penaltyRates.filter(r => !r.shift_type);
    // Use remote penalties where available, fall back to standard for day types not covered
    penaltyRates = remotePenalties.length > 0 ? remotePenalties : standardPenalties;
  } else {
    penaltyRates = penaltyRates.filter(r => !r.shift_type);
  }

  // MA000003 special case: Grade 1 has a lower Sunday rate than Grade 2/3.
  // FT/PT L1 Sunday = ×1.25 (same as Saturday); Casual L1 Sunday = ×1.20 (same as Saturday).
  // Default penalty_rates store the L2/L3 rates; override here for L1.
  if (awardCode === 'MA000003') {
    const levelResult = await db.query(
      'SELECT level FROM classifications WHERE id = $1', [classificationId]
    );
    const classLevel = parseInt(levelResult.rows[0]?.level || 2);
    if (classLevel === 1) {
      const sundayOverride = employmentType === 'casual' ? 1.20 : 1.25;
      penaltyRates = penaltyRates.map(r =>
        r.day_type === 'sunday'
          ? { ...r, multiplier: sundayOverride.toString(), addition_per_hour: null }
          : r
      );
    }
  }

  // MA000003 casual evening/night: the 10%/15% penalty is on the FT ORDINARY rate,
  // not the casual base. The DB stores multipliers (1.10/1.15) which compound with casual
  // loading (giving 137.5%/143.75% instead of correct 135%/140% of FT rate).
  // Fix: convert to addition_per_hour = FT_base × (multiplier - 1.0), multiplier = 1.0.
  if (awardCode === 'MA000003' && employmentType === 'casual') {
    const ftRateForPenalty = await db.query(`
      SELECT rate_amount FROM pay_rates
      WHERE award_code = $1 AND classification_id = $2 AND employment_type = 'full_time' AND rate_type = 'base_hourly'
      ORDER BY effective_date DESC LIMIT 1
    `, [awardCode, classificationId]);
    const ftBase = ftRateForPenalty.rows.length ? parseFloat(ftRateForPenalty.rows[0].rate_amount) : baseHourlyRate / 1.25;
    penaltyRates = penaltyRates.map(r => {
      if (r.day_type === 'weekday' && r.time_band_start && parseFloat(r.multiplier) > 1.0 && !parseFloat(r.addition_per_hour)) {
        const penaltyPct = parseFloat(r.multiplier) - 1.0; // 0.10 or 0.15
        return { ...r, multiplier: '1.0000', addition_per_hour: String(parseFloat((ftBase * penaltyPct).toFixed(4))) };
      }
      return r;
    });
  }

  // MA000119: casual Introductory/L1/L2 Sunday = ×1.20 (150% of FT = 150/125 of casual base).
  // DB stores ×1.40 (L3–L6 default); override here for ≤L2.
  if (awardCode === 'MA000119' && employmentType === 'casual') {
    const levelResult = await db.query(
      'SELECT level FROM classifications WHERE id = $1', [classificationId]
    );
    const classLevel = parseInt(levelResult.rows[0]?.level ?? 3);
    if (classLevel <= 2) {
      penaltyRates = penaltyRates.map(r =>
        r.day_type === 'sunday'
          ? { ...r, multiplier: '1.20', addition_per_hour: null }
          : r
      );
    }
  }

  // Fetch OT rates — prefer stream-specific rules, fall back to stream=NULL (generic)
  const overtimeResult = await db.query(
    `SELECT * FROM overtime_rates WHERE award_code = $1 AND employment_type = $2 AND (stream IS NULL OR stream = $3) ORDER BY effective_date DESC`,
    [awardCode, employmentType, classificationStream]
  );
  // If stream-specific OT rules exist, use only those; otherwise use generic (stream IS NULL)
  const streamOTRules = overtimeResult.rows.filter(r => r.stream === classificationStream);
  const genericOTRules = overtimeResult.rows.filter(r => !r.stream);
  let overtimeRates = streamOTRules.length > 0 ? streamOTRules : genericOTRules;

  // MA000013: liquor employees use all-in Mon–Sat rates (clause 12.9).
  // Sunday and PH additions are flat dollar amounts on top, not multipliers.
  // Casual OT for liquor = ×1.75/×2.25 of Mon–Sat rate (not the ×1.40/×1.80 seeded for non-liquor).
  if (awardCode === 'MA000013' && employmentType === 'casual') {
    const clsResult = await db.query('SELECT stream, level FROM classifications WHERE id = $1', [classificationId]);
    const clsStream = clsResult.rows[0]?.stream;
    const clsLevel = parseInt(clsResult.rows[0]?.level || 1);
    if (clsStream === 'liquor') {
      const isAdult = clsLevel === 1;
      const sundayAdd = isAdult ? 12.30 : 9.86;
      const phAdd    = isAdult ? 24.13 : 19.32;
      penaltyRates = penaltyRates.map(r => {
        if (r.day_type === 'sunday')         return { ...r, multiplier: '1.0', addition_per_hour: String(sundayAdd) };
        if (r.day_type === 'public_holiday') return { ...r, multiplier: '1.0', addition_per_hour: String(phAdd) };
        return r;
      });
      overtimeRates = overtimeRates.map(r => {
        const m = parseFloat(r.multiplier);
        if (m === 1.40) return { ...r, multiplier: '1.75' };
        if (m === 1.80) return { ...r, multiplier: '2.25' };
        return r;
      });
    }
  }

  const breakResult = await db.query(`SELECT * FROM break_entitlements WHERE award_code = $1`, [awardCode]);
  const breakEntitlements = breakResult.rows;

  // ── 24-hour care flat rate handling ──────────────────────────────────────
  // If shift.shiftType === '24hr_care', use the flat per-shift rate instead of hourly calculation.
  // The flat rate is stored as rate_type = '24hr_care_shift' in pay_rates.
  // OT on 24hr care shifts is calculated separately (first 2hr ×1.5, after 2hr ×2.0, Sunday ×2.0, PH ×2.5).
  if (has24hrCareShifts) {
    const flatRateResult = await db.query(`
      SELECT rate_amount FROM pay_rates
      WHERE award_code = $1 AND classification_id = $2 AND employment_type = $3 AND rate_type = '24hr_care_shift'
      ORDER BY effective_date DESC LIMIT 1
    `, [awardCode, classificationId, employmentType]);

    if (flatRateResult.rows.length) {
      const flatRate = parseFloat(flatRateResult.rows[0].rate_amount);
      const twentyFourHrShifts = shifts.filter(s => s.shiftType === '24hr_care');
      const standardShifts = shifts.filter(s => s.shiftType !== '24hr_care');

      // Process 24hr care shifts with flat rate
      const processedCareShifts = [];
      let totalCarePay = 0;
      for (const shift of twentyFourHrShifts) {
        const dayType = getDayType(shift.date, publicHolidays);
        let shiftPay = flatRate;
        let rateLabel = `24-hour care shift — flat $${flatRate.toFixed(2)}`;

        // Apply day-type multiplier to flat rate for weekends/PH
        if (dayType === 'saturday') { shiftPay = Math.round(flatRate * 1.5 * 100) / 100; rateLabel += ' × 1.5 (Saturday)'; }
        else if (dayType === 'sunday') { shiftPay = Math.round(flatRate * 2.0 * 100) / 100; rateLabel += ' × 2.0 (Sunday)'; }
        else if (dayType === 'public_holiday') { shiftPay = Math.round(flatRate * 2.5 * 100) / 100; rateLabel += ' × 2.5 (Public Holiday)'; }

        processedCareShifts.push({
          date: shift.date,
          startTime: shift.startTime || '00:00',
          endTime: shift.endTime || '00:00',
          workedMinutes: 24 * 60,
          workedHours: 24,
          mealBreakMinutes: 0,
          restBreakTaken: true,
          ordinaryMinutes: 24 * 60,
          ordinaryPay: shiftPay,
          penaltyExtra: 0,
          missedBreakExtra: 0,
          totalPay: shiftPay,
          missedBreakApplied: false,
          minimumEngagementApplied: false,
          minimumShiftHours: null,
          segments: [{
            dayType, dayLabel: getDayLabel(dayType), multiplier: 1.0, addition_per_hour: 0,
            effectiveRate: shiftPay / 24, rateLabel, missedBreakPenalty: false,
            baseRate: baseHourlyRate, minutes: 24 * 60, hours: 24,
            pay: shiftPay,
          }],
          breakViolations: [],
          shiftType: '24hr_care',
        });
        totalCarePay += shiftPay;
      }

      // If there are no standard shifts, return 24hr care results directly
      if (standardShifts.length === 0) {
        const superEligible = totalCarePay;
        const superAmount = Math.round(superEligible * SGC_RATE * 100) / 100;
        return {
          baseHourlyRate, rawBaseRate, juniorMultiplier,
          isJuniorRate: juniorMultiplier < 1.0, employmentType, effectiveDate, period,
          shifts: processedCareShifts,
          summary: {
            totalWorkedHours: processedCareShifts.reduce((s, sh) => s + sh.workedHours, 0),
            ordinaryPay: totalCarePay, penaltyPay: 0, missedBreakPay: 0, overtimePay: 0,
            overtimeMinutes: 0, mealAllowancePay: 0, mealAllowancesOwed: 0, mealAllowanceRate: 0,
            totalPayOwed: totalCarePay, superEligiblePay: superEligible, superAmount, sgcRate: SGC_RATE,
            superBreakdown: [{ rateLabel: '24-hour care shifts', effectiveRate: null, hours: processedCareShifts.length * 24, totalPay: totalCarePay, superApplies: true, superRate: SGC_RATE, superAmount }],
            overtimeBreakdown: [], allBreakViolations: [],
          },
        };
      }
      // If mixed, fall through to standard processing for the non-24hr shifts
      // (rare scenario — typically all shifts in a period are same type)
    }
  }

  // ── Broken shift handling ─────────────────────────────────────────────────
  // If shift.shiftType === 'broken', the shift has multiple work periods within a single day.
  // The shift object should include shift.periods = [{startTime, endTime}, ...].
  // If the span (first start to last end) > 12 hours, time beyond 12hr is paid at double time.
  // The broken shift allowance ($20.82 for 1 break, $27.56 for 2 breaks) is added automatically.

  // ── 10-hour break rule ────────────────────────────────────────────────────
  // If the gap between the end of one shift and the start of the next is < 10 hours
  // AND the previous shift included overtime, the next shift is paid at double time
  // until a 10-hour break is provided. We check this across all shifts.
  let tenHourBreakPenaltyMinutes = 0;
  if (shifts.length > 1) {
    const sortedShifts = [...shifts].sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return (a.startTime || '').localeCompare(b.startTime || '');
    });
    for (let i = 1; i < sortedShifts.length; i++) {
      const prev = sortedShifts[i - 1];
      const curr = sortedShifts[i];
      // Calculate gap in minutes between end of prev and start of curr
      const prevEndMin = timeToMinutes(prev.endTime);
      const currStartMin = timeToMinutes(curr.startTime);
      let gapMinutes;
      if (prev.date === curr.date) {
        gapMinutes = currStartMin - prevEndMin;
      } else {
        // Different dates — calculate across midnight
        const prevDate = new Date(prev.date + 'T00:00:00');
        const currDate = new Date(curr.date + 'T00:00:00');
        const dayDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);
        gapMinutes = (dayDiff * 24 * 60) - prevEndMin + currStartMin;
      }
      if (gapMinutes < 10 * 60 && gapMinutes >= 0) {
        // Mark this shift for double-time treatment
        curr._tenHourBreakViolation = true;
        curr._gapMinutes = gapMinutes;
        tenHourBreakPenaltyMinutes += Math.min(currStartMin + (10 * 60 - gapMinutes), timeToMinutes(curr.endTime) - currStartMin);
      }
    }
  }

  const processedShifts = [];
  let totalOrdinaryPay = 0;
  let totalPenaltyPay = 0;
  let totalMissedBreakPay = 0;

  for (const shift of shifts) {
    // Skip 24hr care shifts (already processed above)
    if (shift.shiftType === '24hr_care') continue;

    // ── Broken shift: calculate total worked time from multiple periods ──────
    let effectiveStartTime = shift.startTime;
    let effectiveEndTime = shift.endTime;
    let brokenShiftSpanMinutes = 0;
    let brokenShiftBreakCount = 0;
    if (shift.shiftType === 'broken' && Array.isArray(shift.periods) && shift.periods.length > 1) {
      // Use first period start and last period end for the span
      const sortedPeriods = [...shift.periods].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
      effectiveStartTime = sortedPeriods[0].startTime;
      effectiveEndTime = sortedPeriods[sortedPeriods.length - 1].endTime;
      brokenShiftSpanMinutes = shiftDurationMinutes(effectiveStartTime, effectiveEndTime);
      brokenShiftBreakCount = sortedPeriods.length - 1; // number of unpaid breaks between periods
    }

    const mealBreakMinutes = shift.mealBreakTaken ? (shift.mealBreakDuration ?? 30) : 0;
    const totalShiftMinutes = shiftDurationMinutes(effectiveStartTime, effectiveEndTime);
    const workedMinutes = totalShiftMinutes - mealBreakMinutes;

    // Get base segments (penalty rates by day/time)
    // For remote shifts, penalty rates already filtered to remote set above
    const rawSegments = calculateShiftSegments(
      shift.date, effectiveStartTime, effectiveEndTime,
      employmentType, penaltyRates, publicHolidays
    );

    // Deduct meal break from end of segments
    let remainingBreak = mealBreakMinutes;
    const breakAdjusted = rawSegments.map(seg => ({ ...seg }));
    for (let i = breakAdjusted.length - 1; i >= 0 && remainingBreak > 0; i--) {
      const deduct = Math.min(breakAdjusted[i].minutes, remainingBreak);
      breakAdjusted[i].minutes -= deduct;
      remainingBreak -= deduct;
    }
    const nonEmptySegments = breakAdjusted.filter(s => s.minutes > 0);

    // Apply missed break double time penalty
    const { segments: finalSegments, missedBreakApplied } = applyMissedBreakPenalty(
      nonEmptySegments,
      shift.mealBreakTaken
    );

    // ── Broken shift: apply double time for span > 12 hours ─────────────────
    if (shift.shiftType === 'broken' && brokenShiftSpanMinutes > 12 * 60) {
      const beyondMinutes = brokenShiftSpanMinutes - 12 * 60;
      // Apply double time to the last N minutes (similar to missed break logic)
      let cumulative = 0;
      for (let i = finalSegments.length - 1; i >= 0 && cumulative < beyondMinutes; i--) {
        const seg = finalSegments[i];
        const applyMins = Math.min(seg.minutes, beyondMinutes - cumulative);
        if (applyMins > 0 && seg.multiplier < 2.0) {
          // Split segment if needed
          if (applyMins < seg.minutes) {
            const normalMins = seg.minutes - applyMins;
            finalSegments.splice(i, 1,
              { ...seg, minutes: normalMins },
              { ...seg, minutes: applyMins, multiplier: 2.0, missedBreakPenalty: false }
            );
          } else {
            seg.multiplier = Math.max(seg.multiplier, 2.0);
          }
        }
        cumulative += applyMins;
      }
    }

    // ── 10-hour break rule: apply double time if insufficient break ──────────
    if (shift._tenHourBreakViolation) {
      // Apply double time to all segments until 10hr break would be satisfied
      for (const seg of finalSegments) {
        seg.multiplier = Math.max(seg.multiplier, 2.0);
      }
    }

    // Apply minimum engagement — if worked < minimum, extend the last segment
    // at whatever rate applies (preserves the correct penalty rate for that day).
    const minimumShiftMinutes = getMinimumShiftMinutes(awardCode, employmentType);
    let minimumEngagementApplied = false;
    let payableMinutes = workedMinutes;
    if (minimumShiftMinutes > 0 && workedMinutes < minimumShiftMinutes) {
      const extra = minimumShiftMinutes - workedMinutes;
      if (finalSegments.length > 0) {
        finalSegments[finalSegments.length - 1] = {
          ...finalSegments[finalSegments.length - 1],
          minutes: finalSegments[finalSegments.length - 1].minutes + extra,
        };
      } else {
        // No segments (zero-length shift) — create one at the day's ordinary rate
        const dayType = getDayType(shift.date, publicHolidays);
        const applicable = penaltyRates.filter(r => r.employment_type === employmentType && r.day_type === dayType && !r.time_band_start);
        const multiplier = applicable.length > 0 ? Math.max(...applicable.map(r => parseFloat(r.multiplier))) : 1.0;
        finalSegments.push({ dayType, multiplier, addition_per_hour: 0, minutes: minimumShiftMinutes });
      }
      payableMinutes = minimumShiftMinutes;
      minimumEngagementApplied = true;
    }

    // Calculate pay per segment
    const segmentBreakdown = [];
    let shiftOrdinaryPay = 0;
    let shiftPenaltyExtra = 0;
    let shiftMissedBreakExtra = 0;

    for (const seg of finalSegments) {
      if (seg.minutes <= 0) continue;
      const hours = seg.minutes / 60;
      const addition_per_hour = seg.addition_per_hour || 0;
      const effectiveHourlyRate = baseHourlyRate * seg.multiplier + addition_per_hour;
      const actualPay = hours * effectiveHourlyRate;
      const ordinaryPay = hours * baseHourlyRate;
      const extra = actualPay - ordinaryPay;

      shiftOrdinaryPay += ordinaryPay;
      if (seg.missedBreakPenalty) {
        shiftMissedBreakExtra += extra;
      } else {
        shiftPenaltyExtra += extra;
      }

      segmentBreakdown.push({
        dayType: seg.dayType,
        dayLabel: getDayLabel(seg.dayType),
        multiplier: seg.multiplier,
        addition_per_hour,
        effectiveRate: effectiveHourlyRate,
        rateLabel: getRateLabel(seg.multiplier, addition_per_hour, seg.missedBreakPenalty, seg.dayType),
        missedBreakPenalty: !!seg.missedBreakPenalty,
        minutes: seg.minutes,
        hours: Math.round(hours * 100) / 100,
        baseRate: baseHourlyRate,
        pay: Math.round(actualPay * 100) / 100,
        explanation: seg.missedBreakPenalty
          ? 'Double time applies because no meal break was provided after 5 hours of work (Award clause 20.6)'
          : null,
      });
    }

    totalOrdinaryPay += shiftOrdinaryPay;
    totalPenaltyPay += shiftPenaltyExtra;
    totalMissedBreakPay += shiftMissedBreakExtra;

    const totalShiftPay = shiftOrdinaryPay + shiftPenaltyExtra + shiftMissedBreakExtra;
    const breakViolations = checkBreakCompliance(shift, breakEntitlements);

    processedShifts.push({
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      workedMinutes: payableMinutes,
      workedHours: Math.round(payableMinutes / 60 * 100) / 100,
      mealBreakMinutes,
      restBreakTaken: !!shift.restBreakTaken,
      ordinaryMinutes: payableMinutes,
      ordinaryPay: Math.round(shiftOrdinaryPay * 100) / 100,
      penaltyExtra: Math.round(shiftPenaltyExtra * 100) / 100,
      missedBreakExtra: Math.round(shiftMissedBreakExtra * 100) / 100,
      totalPay: Math.round(totalShiftPay * 100) / 100,
      missedBreakApplied,
      minimumEngagementApplied,
      minimumShiftHours: minimumEngagementApplied ? minimumShiftMinutes / 60 : null,
      segments: segmentBreakdown,
      breakViolations,
    });
  }

  const overtimeCalc = calculateOvertime(processedShifts, employmentType, baseHourlyRate, overtimeRates, period);

  // ── Replace overtime hours in per-shift segments with proper OT categories ──
  // Instead of adding an "overtime loading" line, carve the OT hours out of the
  // original penalty segments and replace them with overtime category rows.
  // Result: (a) hours in all rows sum to total worked hours, (b) each row shows
  // the full rate actually paid — not just the premium.
  //
  // Higher-of rule: for each OT minute, the worker receives whichever is greater
  // — the overtime rate or the existing penalty rate. Minutes where the penalty
  // rate already exceeds the OT rate stay in their penalty category (no uplift).
  for (const otEntry of overtimeCalc.overtimeBreakdown) {
    const otMinutes = otEntry.overtimeMinutes;
    if (otMinutes <= 0) continue;

    // Determine which shift(s) the OT hours come from
    let targetShifts = [];
    if (otEntry.type === 'daily') {
      targetShifts = processedShifts.filter(s => s.date === otEntry.date);
    } else if (otEntry.type === 'weekly') {
      targetShifts = processedShifts.filter(s => getISOWeek(s.date) === otEntry.key);
    } else {
      targetShifts = [...processedShifts];
    }
    if (!targetShifts.length) continue;

    const displayShift = targetShifts[targetShifts.length - 1];
    const firstBandMult = otEntry.firstBandMultiplier || 1.5;
    const secondBandMult = otEntry.secondBandMultiplier || 2.0;
    const firstBandMinutes = otEntry.firstBandMinutes ?? otMinutes;

    // Collect per-minute info from the END of the period's segments (OT applies
    // to the last N minutes worked). Record the penalty multiplier for each.
    const allNonOtSegs = [];
    for (const sh of targetShifts) {
      for (const seg of sh.segments) {
        if (seg.dayType === 'overtime' || seg.minutes <= 0) continue;
        allNonOtSegs.push(seg);
      }
    }
    const perMin = []; // { segRef, shiftRef, penaltyMult, penaltyRate }
    for (const sh of targetShifts) {
      for (const seg of sh.segments) {
        if (seg.dayType === 'overtime' || seg.minutes <= 0) continue;
        for (let m = 0; m < seg.minutes; m++) {
          perMin.push({ seg, shift: sh, penaltyMult: seg.multiplier || 1.0, effectiveRate: seg.effectiveRate || baseHourlyRate });
        }
      }
    }

    // OT minutes are the last N minutes
    const otStartIdx = Math.max(0, perMin.length - otMinutes);

    // Determine which OT band each minute falls in, and whether OT rate > penalty rate
    let firstBandOtMins = 0;
    let secondBandOtMins = 0;
    let consumedOt = 0;
    const minutesToCarve = new Map(); // seg -> minutes to remove
    for (let i = otStartIdx; i < perMin.length; i++) {
      const { seg, penaltyMult } = perMin[i];
      const otMult = consumedOt < firstBandMinutes ? firstBandMult : secondBandMult;
      const otRate = baseHourlyRate * otMult;
      const penaltyRate = baseHourlyRate * penaltyMult + (seg.addition_per_hour || 0);

      if (otRate > penaltyRate) {
        // This minute moves to OT category
        minutesToCarve.set(seg, (minutesToCarve.get(seg) || 0) + 1);
        if (consumedOt < firstBandMinutes) firstBandOtMins++;
        else secondBandOtMins++;
      }
      // If penalty rate >= OT rate, minute stays in its penalty category (higher-of)
      consumedOt++;
    }

    // Carve minutes from their original segments
    for (const [seg, mins] of minutesToCarve) {
      seg.minutes -= mins;
      seg.hours = Math.round(seg.minutes / 60 * 100) / 100;
      seg.pay = Math.round(seg.minutes / 60 * seg.effectiveRate * 100) / 100;
    }
    // Clean up zero-minute segments and recalc shift totals
    for (const sh of targetShifts) {
      sh.segments = sh.segments.filter(s => s.minutes > 0);
      const newPay = sh.segments.reduce((s, seg) => s + (seg.pay || 0), 0);
      sh.totalPay = Math.round(newPay * 100) / 100;
    }

    // Add proper OT category segments to the display shift
    if (firstBandOtMins > 0) {
      const hours = Math.round(firstBandOtMins / 60 * 100) / 100;
      const rate = Math.round(baseHourlyRate * firstBandMult * 100) / 100;
      const pay = Math.round(hours * rate * 100) / 100;
      displayShift.segments.push({
        dayType: 'overtime',
        dayLabel: 'Overtime',
        multiplier: firstBandMult,
        addition_per_hour: 0,
        effectiveRate: rate,
        rateLabel: `Overtime (\u00d7${firstBandMult.toFixed(1)})`,
        missedBreakPenalty: false,
        baseRate: baseHourlyRate,
        minutes: firstBandOtMins,
        hours,
        pay,
      });
      displayShift.totalPay = Math.round((displayShift.totalPay + pay) * 100) / 100;
    }

    if (secondBandOtMins > 0) {
      const hours = Math.round(secondBandOtMins / 60 * 100) / 100;
      const rate = Math.round(baseHourlyRate * secondBandMult * 100) / 100;
      const pay = Math.round(hours * rate * 100) / 100;
      displayShift.segments.push({
        dayType: 'overtime',
        dayLabel: 'Overtime',
        multiplier: secondBandMult,
        addition_per_hour: 0,
        effectiveRate: rate,
        rateLabel: `Overtime (\u00d7${secondBandMult.toFixed(1)})`,
        missedBreakPenalty: false,
        baseRate: baseHourlyRate,
        minutes: secondBandOtMins,
        hours,
        pay,
      });
      displayShift.totalPay = Math.round((displayShift.totalPay + pay) * 100) / 100;
    }
  }

  // ── Meal allowance — award-specific rules ────────────────────────────────
  // FT/PT only (casuals excluded for all awards).
  let mealAllowancePay = 0;
  let mealAllowanceRate = 0;
  let mealAllowancesOwed = 0; // may differ from overtimeCalc.mealAllowancesOwed for some awards
  let mealAllowanceLabel = '';

  if (employmentType !== 'casual') {
    if (awardCode === 'MA000081') {
      // MA000081 (Live Performance): meal_working triggers when a shift extends past 8pm,
      // not based on overtime hours. One meal per 4-hour interval worked after 8pm.
      const EIGHT_PM = 20 * 60;
      for (const shift of processedShifts) {
        const startMins = timeToMinutes(shift.startTime);
        let endMins = timeToMinutes(shift.endTime);
        if (endMins < startMins) endMins += 24 * 60; // overnight shift
        const workAfter8pmStart = Math.max(startMins, EIGHT_PM);
        if (endMins > EIGHT_PM) {
          const minutesWorkedAfter8pm = endMins - workAfter8pmStart;
          mealAllowancesOwed += Math.ceil(minutesWorkedAfter8pm / (4 * 60));
        }
      }
      if (mealAllowancesOwed > 0) {
        const r = await db.query(
          `SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal_working' ORDER BY effective_date DESC LIMIT 1`,
          [awardCode]
        );
        if (r.rows.length) {
          mealAllowanceRate = parseFloat(r.rows[0].amount);
          mealAllowancePay = Math.round(mealAllowanceRate * mealAllowancesOwed * 100) / 100;
          mealAllowanceLabel = `Meal allowance — working past 8pm (${mealAllowancesOwed} × $${mealAllowanceRate.toFixed(2)}) — expense, not OTE`;
        }
      }
    } else if ((awardCode === 'MA000004' || awardCode === 'MA000002' || awardCode === 'MA000104') && overtimeCalc.mealAllowancesOwed > 0) {
      // MA000004 (Retail) / MA000002 (Clerks): two-tier meal pricing.
      // First meal at 'meal' rate ($23.59); subsequent meals at 'meal_second' rate ($21.39).
      mealAllowancesOwed = overtimeCalc.mealAllowancesOwed;
      const [firstR, secondR] = await Promise.all([
        db.query(`SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal' ORDER BY effective_date DESC LIMIT 1`, [awardCode]),
        db.query(`SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal_second' ORDER BY effective_date DESC LIMIT 1`, [awardCode]),
      ]);
      if (firstR.rows.length) {
        mealAllowanceRate = parseFloat(firstR.rows[0].amount);
        const secondRate = secondR.rows.length ? parseFloat(secondR.rows[0].amount) : mealAllowanceRate;
        const extraMeals = Math.max(0, mealAllowancesOwed - 1);
        mealAllowancePay = Math.round((mealAllowanceRate + secondRate * extraMeals) * 100) / 100;
        mealAllowanceLabel = mealAllowancesOwed > 1
          ? `Meal allowance (1 × $${mealAllowanceRate.toFixed(2)} + ${extraMeals} × $${secondRate.toFixed(2)}) — expense, not OTE`
          : `Meal allowance (1 × $${mealAllowanceRate.toFixed(2)}) — expense, not OTE`;
      }
    } else if (overtimeCalc.mealAllowancesOwed > 0) {
      // All other awards: one meal per 4 hours of overtime at a flat rate.
      mealAllowancesOwed = overtimeCalc.mealAllowancesOwed;
      const r = await db.query(
        `SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal' ORDER BY effective_date DESC LIMIT 1`,
        [awardCode]
      );
      if (r.rows.length) {
        mealAllowanceRate = parseFloat(r.rows[0].amount);
        mealAllowancePay = Math.round(mealAllowanceRate * mealAllowancesOwed * 100) / 100;
        mealAllowanceLabel = `Meal allowance (${mealAllowancesOwed} × $${mealAllowanceRate.toFixed(2)}) — expense, not OTE`;
      }
    }
  }

  // ── Recompute summary figures from final segment state ────────────────────
  // After OT carving, recalculate ordinary/penalty/overtime pay from segments
  // so the summary card numbers are consistent with the breakdown rows.
  let finalOrdinaryPay = 0;
  let finalPenaltyPay = 0;
  let finalOvertimePay = 0;
  let finalMissedBreakPay = 0;
  for (const sh of processedShifts) {
    for (const seg of sh.segments) {
      if (seg.dayType === 'overtime') {
        finalOvertimePay += seg.pay;
      } else if (seg.missedBreakPenalty) {
        finalMissedBreakPay += seg.pay;
      } else {
        const ordinaryPortion = (seg.minutes / 60) * baseHourlyRate;
        const penaltyPortion = seg.pay - ordinaryPortion;
        finalOrdinaryPay += ordinaryPortion;
        finalPenaltyPay += Math.max(0, penaltyPortion);
      }
    }
  }
  const grandTotal = processedShifts.reduce((s, sh) => s + sh.totalPay, 0) + mealAllowancePay;

  // ── Per-category super breakdown ────────────────────────────────────────
  // Aggregate all shift segments across all shifts, grouped by rate category.
  // Each entry shows hours, effective rate, total pay, and whether super applies.
  // OTE (ordinary time earnings) = ordinary + penalty rate hours.
  // NOT OTE: overtime segments, missed-break double time, expense allowances.
  // Since overtime hours are now carved out of ordinary segments and replaced
  // with proper overtime category segments, the aggregation is straightforward.
  const categoryAgg = new Map();
  for (const shift of processedShifts) {
    for (const seg of shift.segments) {
      if (seg.minutes <= 0) continue;
      const key = `${seg.dayType}_${seg.multiplier}_${seg.addition_per_hour}_${seg.missedBreakPenalty}`;
      if (!categoryAgg.has(key)) {
        categoryAgg.set(key, {
          rateLabel: seg.rateLabel,
          effectiveRate: seg.effectiveRate,
          missedBreakPenalty: !!seg.missedBreakPenalty,
          superApplies: !seg.missedBreakPenalty && seg.dayType !== 'overtime',
          totalHours: 0,
          totalPay: 0,
        });
      }
      const entry = categoryAgg.get(key);
      entry.totalHours += seg.hours;
      entry.totalPay += seg.pay;
    }
  }

  if (mealAllowancePay > 0) {
    categoryAgg.set('_meal_allowance', {
      rateLabel: mealAllowanceLabel,
      effectiveRate: mealAllowanceRate,
      missedBreakPenalty: false,
      superApplies: false,
      totalHours: mealAllowancesOwed,
      totalPay: mealAllowancePay,
    });
  }

  const superBreakdown = Array.from(categoryAgg.values()).map(cat => ({
    rateLabel: cat.rateLabel,
    effectiveRate: cat.effectiveRate !== null ? Math.round(cat.effectiveRate * 10000) / 10000 : null,
    hours: Math.round(cat.totalHours * 100) / 100,
    totalPay: Math.round(cat.totalPay * 100) / 100,
    superApplies: cat.superApplies,
    superRate: cat.superApplies ? SGC_RATE : 0,
    superAmount: cat.superApplies ? Math.round(cat.totalPay * SGC_RATE * 100) / 100 : 0,
  }));

  // Derive totals from the breakdown so the footer always equals the sum of rows.
  const superEligiblePay = Math.round(
    superBreakdown.filter(r => r.superApplies).reduce((s, r) => s + r.totalPay, 0) * 100
  ) / 100;
  const superAmount = Math.round(
    superBreakdown.reduce((s, r) => s + r.superAmount, 0) * 100
  ) / 100;

  return {
    baseHourlyRate,
    rawBaseRate,
    juniorMultiplier,
    isJuniorRate: juniorMultiplier < 1.0,
    employmentType,
    effectiveDate,
    period,
    shifts: processedShifts,
    summary: {
      totalWorkedHours: Math.round(processedShifts.reduce((s, sh) => s + sh.workedMinutes, 0) / 60 * 100) / 100,
      ordinaryPay: Math.round(finalOrdinaryPay * 100) / 100,
      penaltyPay: Math.round(finalPenaltyPay * 100) / 100,
      missedBreakPay: Math.round(finalMissedBreakPay * 100) / 100,
      overtimePay: Math.round(finalOvertimePay * 100) / 100,
      overtimeMinutes: overtimeCalc.overtimeMinutes,
      mealAllowancePay,
      mealAllowancesOwed,
      mealAllowanceRate,
      totalPayOwed: Math.round(grandTotal * 100) / 100,
      superEligiblePay: Math.round(superEligiblePay * 100) / 100,
      superAmount,
      sgcRate: SGC_RATE,
      superBreakdown,
      overtimeBreakdown: overtimeCalc.overtimeBreakdown,
      allBreakViolations: processedShifts.flatMap(s => s.breakViolations.map(v => ({ ...v, date: s.date }))),
    },
  };
}

module.exports = {
  calculateEntitlements,
  getDayType,
  shiftDurationMinutes,
  getJuniorMultiplier,
};
