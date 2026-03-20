'use client';

import { useEffect, useState } from 'react';
import { EmploymentType, AllowanceAnswer, AllowanceInfo } from '@/types';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';

interface Props {
  awardCode: string;
  employmentType: EmploymentType;
  stream: string | null;
  answers: AllowanceAnswer[];
  onAnswersChange: (answers: AllowanceAnswer[]) => void;
  onNext: () => void;
  onBack: () => void;
}

interface AllowanceQuestion {
  type: string;
  primary: string;
  primaryHelp?: string;
  onlyFor?: EmploymentType[];
  onlyForStream?: string[];
  onlyForAward?: string[];
  followUps?: Array<{
    key: string;
    question: string;
    help?: string;
    triggeredWhen: 'yes' | 'no';
  }>;
}

const VEHICLE_TYPES = new Set(['vehicle', 'vehicle_delivery', 'vehicle_car', 'vehicle_motorcycle']);

const ALLOWANCE_QUESTIONS: AllowanceQuestion[] = [
  // ── MA000009 (Hospitality) ────────────────────────────────────────────────
  {
    type: 'split_shift',
    primary: 'Was your shift split into two or more separate parts on the same day, with a gap of at least 2 hours between them?',
    primaryHelp: 'For example, you worked 10am–2pm, went home, then came back for 5pm–9pm. Does not apply to casual employees.',
    onlyFor: ['full_time', 'part_time'],
    onlyForAward: ['MA000009'],
    followUps: [
      {
        key: 'long_gap',
        question: 'Was the gap between your work periods more than 3 hours?',
        help: 'Gaps of 2–3 hours get $3.53/day. Gaps over 3 hours get $5.34/day.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'tool',
    primary: 'Does your employer require you to provide and maintain your own knives or other tools/equipment?',
    primaryHelp: 'This allowance applies to cooks and apprentice cooks who must supply their own knives or kitchen tools.',
    onlyForStream: ['kitchen'],
    onlyForAward: ['MA000009'],
  },
  {
    type: 'airport_travel',
    primary: 'Do you work for an airport catering employer?',
    primaryHelp: 'Airport catering employers provide food, beverages, and related services for airline passengers and crew at an airport.',
    onlyForAward: ['MA000009'],
  },
  {
    type: 'first_aid',
    primary: 'Do you hold a current first aid certificate?',
    onlyForAward: ['MA000009', 'MA000004', 'MA000094', 'MA000080', 'MA000002'],
    followUps: [
      {
        key: 'appointed',
        question: 'Has your employer specifically appointed you as the person responsible for first aid at your workplace?',
        help: 'Simply holding a certificate is not enough — your employer must have asked you to act as first aider.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'laundry',
    primary: 'Does your employer require you to wear a specific uniform and do you launder it yourself at your own cost?',
    primaryHelp: 'If your employer provides laundering or reimburses cleaning costs, no allowance applies. This applies to catering employees.',
    onlyForAward: ['MA000009'],
  },
  {
    type: 'vehicle',
    primary: 'Did you use your own car or vehicle for work purposes during this period?',
    primaryHelp: 'The vehicle allowance under the Hospitality Award applies specifically to managerial hotel staff. If you are not a hotel manager, check your contract.',
    onlyForAward: ['MA000009'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for work?',
        triggeredWhen: 'yes',
      },
    ],
  },

  // ── MA000003 (Fast Food) ──────────────────────────────────────────────────
  {
    type: 'cold_work',
    primary: 'Did you work in cold storage, a cool room, or refrigerated area during this period?',
    primaryHelp: 'A cold work allowance applies to employees who spend time working in refrigerated or freezer conditions.',
    onlyForAward: ['MA000003'],
    followUps: [
      {
        key: 'below_zero',
        question: 'Was the temperature below 0°C (i.e., freezer conditions)?',
        help: 'Temperatures at or below 0°C (freezer) attract a higher rate than cool room/above-zero conditions.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'laundry_uniform',
    primary: 'Does your employer require you to wear a specific uniform and do you launder it yourself at your own cost?',
    primaryHelp: 'If your employer provides laundering or reimburses cleaning costs, no allowance applies.',
    onlyForAward: ['MA000003', 'MA000004', 'MA000002'],
  },
  {
    type: 'vehicle_delivery',
    primary: 'Did you use your own vehicle to make deliveries during this period?',
    primaryHelp: 'A vehicle allowance applies to employees who use their own car, motorcycle, or bicycle for food deliveries.',
    onlyForAward: ['MA000003'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for deliveries?',
        triggeredWhen: 'yes',
      },
    ],
  },

  // ── MA000004 (Retail) ─────────────────────────────────────────────────────
  {
    type: 'cold_work_retail',
    primary: 'Did you work in a refrigerated cool room or freezer during this period?',
    primaryHelp: 'A cold work allowance applies to retail employees who work in cold storage or refrigerated areas.',
    onlyForAward: ['MA000004'],
    followUps: [
      {
        key: 'below_zero',
        question: 'Was the temperature below 0°C (freezer conditions)?',
        help: 'Below-zero (freezer) conditions attract a higher allowance than cool room / above-zero conditions.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'liquor_licence',
    primary: 'Does your employer require you to hold a liquor licence as part of your duties?',
    primaryHelp: 'If your employer requires you to hold a responsible service of alcohol (RSA) or liquor licence, an allowance may apply.',
    onlyForAward: ['MA000004'],
  },
  {
    type: 'vehicle',
    primary: 'Did you use your own vehicle for work purposes during this period?',
    onlyForAward: ['MA000004'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for work?',
        triggeredWhen: 'yes',
      },
    ],
  },

  // ── MA000094 (Fitness) ─────────────────────────────────────────────────────
  {
    type: 'broken_shift',
    primary: 'Was your shift broken into two or more separate periods on the same day?',
    primaryHelp: 'A broken shift allowance applies when you work two separate periods in a day with a substantial unpaid break in between.',
    onlyForAward: ['MA000094'],
  },
  {
    type: 'leading_hand',
    primary: 'Have you been directed by management to supervise or be responsible for other employees?',
    primaryHelp: 'A leading hand allowance applies if management has specifically asked you to be in charge of other employees.',
    onlyForAward: ['MA000094'],
  },
  {
    type: 'vehicle_car',
    primary: 'Did you use your own car or motorcycle for work purposes during this period?',
    onlyForAward: ['MA000094'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for work?',
        triggeredWhen: 'yes',
      },
    ],
  },

  // ── MA000080 (Amusement & Events) ─────────────────────────────────────────
  {
    type: 'uniform_laundering',
    primary: 'Does your employer require you to wear a uniform and do you launder it yourself at your own cost?',
    onlyForAward: ['MA000080'],
  },
  {
    type: 'in_charge',
    primary: 'Are you required to be in charge of a golf, bowling, or tennis facility operation?',
    primaryHelp: 'An in-charge allowance applies to employees responsible for managing a golf, bowling, or tennis facility.',
    onlyForAward: ['MA000080'],
  },
  {
    type: 'tool_trades',
    primary: 'Are you a carpenter or tradesperson required to provide your own tools?',
    onlyForAward: ['MA000080'],
    followUps: [
      {
        key: 'is_carpenter',
        question: 'Are you specifically a carpenter (as opposed to another trade)?',
        help: 'Carpenters attract a higher tool allowance rate than other tradespersons.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'tractor_plant',
    primary: 'Do you operate a tractor or plant machinery as part of your duties?',
    onlyForAward: ['MA000080'],
  },
  {
    type: 'cancelled_shift',
    primary: 'Was any of your casual shifts cancelled at short notice (without required notice)?',
    onlyFor: ['casual'],
    onlyForAward: ['MA000080'],
  },
  {
    type: 'vehicle',
    primary: 'Did you use your own vehicle for work purposes during this period?',
    onlyForAward: ['MA000080'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for work?',
        triggeredWhen: 'yes',
      },
    ],
  },

  // ── MA000081 (Live Performance) ───────────────────────────────────────────
  {
    type: 'tools_hod',
    primary: 'Are you a Head of Department required to provide your own tools or equipment?',
    primaryHelp: 'Heads of Department who must supply and maintain their own tools are entitled to a weekly tools allowance.',
    onlyForAward: ['MA000081'],
  },
  {
    type: 'tools_other',
    primary: 'Does your employer require you (as a non-HOD employee) to provide your own tools or equipment?',
    primaryHelp: 'Production and support staff other than Heads of Department who must supply their own tools are entitled to a daily tools allowance.',
    onlyForAward: ['MA000081'],
  },
  {
    type: 'meal_working',
    primary: 'Were you required to work overtime or past 6pm without a meal break being provided?',
    primaryHelp: 'If you worked overtime and a meal time fell during that period without a break being provided, a meal allowance applies.',
    onlyForAward: ['MA000081'],
  },
  {
    type: 'meal_travelling',
    primary: 'Did you travel away from your home base for touring or work engagements during this period?',
    primaryHelp: 'A meal allowance applies when you are required to travel away from home for work. The rate depends on the length of travel.',
    onlyForAward: ['MA000081'],
    followUps: [
      {
        key: 'five_or_more_days',
        question: 'Was the travel or touring engagement for 5 or more consecutive working days?',
        help: 'Travel of 5+ consecutive working days attracts a higher weekly meal allowance.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'laundry_lp',
    primary: 'Are you required to launder your own costume or uniform at your own expense?',
    primaryHelp: 'If your employer provides laundering or reimburses the cost, no allowance applies.',
    onlyForAward: ['MA000081'],
  },
  {
    type: 'incidentals_touring',
    primary: 'Were you required to stay away from home overnight for touring or work engagements?',
    primaryHelp: 'An incidentals allowance applies for each overnight stay away from your home base as part of touring or work.',
    onlyForAward: ['MA000081'],
  },
  {
    type: 'vehicle',
    primary: 'Did you use your own vehicle for work purposes during this period?',
    onlyForAward: ['MA000081'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for work?',
        triggeredWhen: 'yes',
      },
    ],
  },

  // ── MA000119 (Restaurant) ─────────────────────────────────────────────────
  {
    type: 'split_shift_restaurant',
    primary: 'Was your shift split into two or more separate periods on the same day?',
    primaryHelp: 'A split shift allowance applies when you are required to work two separate periods during the same day with a break in between.',
    onlyFor: ['full_time', 'part_time'],
    onlyForAward: ['MA000119'],
  },
  {
    type: 'tool_restaurant',
    primary: 'Does your employer require you to provide and maintain your own knives or kitchen tools?',
    onlyForAward: ['MA000119'],
  },
  {
    type: 'special_clothing',
    primary: 'Did your employer require you to purchase special clothing or a uniform at your own expense?',
    primaryHelp: 'If your employer requires special clothing but does not supply it, you may be entitled to reimbursement.',
    onlyForAward: ['MA000119'],
  },

  // ── MA000022 (Cleaning Services) ──────────────────────────────────────────
  {
    type: 'broken_shift',
    primary: 'Did you work a broken shift — two separate working periods on the same day with a substantial gap in between?',
    primaryHelp: 'A broken shift allowance applies when your employer requires you to start work, finish, then return later in the same day.',
    onlyForAward: ['MA000022'],
  },
  {
    type: 'cold_places',
    primary: 'Did you work in a cold room or refrigerated area during this period?',
    primaryHelp: 'A cold places allowance applies for each hour worked in refrigerated or cold storage conditions.',
    onlyForAward: ['MA000022'],
  },
  {
    type: 'first_aid',
    primary: 'Do you hold a current first aid certificate?',
    onlyForAward: ['MA000022'],
    followUps: [
      {
        key: 'appointed',
        question: 'Has your employer specifically appointed you as the first aid officer at your workplace?',
        help: 'Simply holding a certificate is not enough — your employer must have designated you as the first aider.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'height_low',
    primary: 'Did you clean the outside of a multi-storied building while working at height?',
    primaryHelp: 'A height allowance applies when you clean the exterior of a multi-storied building from outside (e.g. using abseiling, swing stages, or elevated platforms).',
    onlyForAward: ['MA000022'],
    followUps: [
      {
        key: 'above_22nd',
        question: 'Were you working above the 22nd floor?',
        help: 'Working above the 22nd floor attracts a higher height allowance ($2.17/hr vs $1.06/hr).',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'hot_places_low',
    primary: 'Were you required to work in extremely hot conditions (above 46°C) during this period?',
    primaryHelp: 'A hot places allowance applies when the temperature at your workplace exceeds 46°C.',
    onlyForAward: ['MA000022'],
    followUps: [
      {
        key: 'above_54',
        question: 'Did temperatures exceed 54°C?',
        help: 'Temperatures exceeding 54°C attract a higher rate ($0.80/hr vs $0.66/hr).',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'leading_hand_cleaning',
    primary: 'Were you required to supervise or direct other cleaning employees during this period?',
    primaryHelp: 'A leading hand allowance applies to Level 2 employees who are directed by management to be responsible for other cleaning employees.',
    onlyForAward: ['MA000022'],
  },
  {
    type: 'refuse_collection',
    primary: 'Did your duties include collecting and removing refuse (rubbish) as a regular part of your work?',
    primaryHelp: 'A refuse collection allowance applies per shift when rubbish removal is a regular part of your duties.',
    onlyForAward: ['MA000022'],
  },
  {
    type: 'toilet_cleaning',
    primary: 'Did your duties include cleaning toilet areas as a regular part of your work?',
    primaryHelp: 'A toilet cleaning allowance applies per shift when cleaning toilet areas is a regular duty.',
    onlyForAward: ['MA000022'],
  },
  {
    type: 'uniform',
    primary: 'Does your employer require you to wear a specific uniform that you had to purchase yourself?',
    primaryHelp: 'If your employer requires you to wear a specific uniform but does not supply it, you are entitled to reimbursement.',
    onlyForAward: ['MA000022'],
  },
  {
    type: 'vehicle_car',
    primary: 'Did you use your own car for work purposes during this period?',
    onlyForAward: ['MA000022', 'MA000002'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for work?',
        triggeredWhen: 'yes',
      },
    ],
  },

  // ── MA000002 (Clerks) ─────────────────────────────────────────────────────
  {
    type: 'vehicle_motorcycle',
    primary: 'Did you use your own motorcycle for work purposes during this period?',
    primaryHelp: 'A separate motorcycle allowance of $0.33/km applies if you used a motorcycle rather than (or as well as) a car.',
    onlyForAward: ['MA000002'],
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel by motorcycle for work?',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'protective_footwear',
    primary: 'Does your employer require you to wear protective footwear that you had to purchase yourself?',
    primaryHelp: 'If your employer requires specific protective footwear but does not supply it, you are entitled to reimbursement of the reasonable cost.',
    onlyForAward: ['MA000002'],
  },

  // ── MA000028 (Horticulture) ───────────────────────────────────────────────
  // All-purpose allowances: added to base rate BEFORE casual loading, penalties, and overtime.
  {
    type: 'hort_first_aid',
    primary: 'Has your employer appointed you as the person responsible for first aid?',
    primaryHelp: 'A first aid allowance of $0.33/hr applies if your employer has designated you as the first aider AND you hold a current first aid certificate. This is an all-purpose allowance — it affects your base rate and is included in overtime and penalty calculations.',
    onlyForAward: ['MA000028'],
  },
  {
    type: 'hort_leading_hand',
    primary: 'Has your employer directed you to be responsible for supervising other employees?',
    primaryHelp: 'A leading hand allowance applies if you are directed by management to be in charge of 2 or more employees. This is an all-purpose allowance — it is added to your base rate before casual loading, penalties, and overtime are calculated.',
    onlyForAward: ['MA000028'],
  },
  {
    type: 'hort_wet_work',
    primary: 'Do you regularly work in wet conditions as a normal part of your duties?',
    primaryHelp: 'A wet work allowance of $2.50/hr applies if working in wet conditions is a regular part of your job (e.g. harvesting in rain, washing produce, water-based irrigation work). This is an all-purpose allowance — it is added to your base rate before casual loading, penalties, and overtime are calculated.',
    onlyForAward: ['MA000028'],
  },

  // ── MA000033 (Nursery Industry) ───────────────────────────────────────────
  // All-purpose allowances: added to base rate BEFORE casual loading, penalties, and overtime.
  {
    type: 'nursery_first_aid',
    primary: 'Has your employer appointed you as the person responsible for first aid?',
    primaryHelp: 'A first aid allowance of $0.47/hr applies if your employer has designated you as the first aider AND you hold a current first aid certificate. This is an all-purpose allowance — it affects your base rate and is included in overtime and penalty calculations.',
    onlyForAward: ['MA000033'],
  },
  {
    type: 'nursery_meal',
    primary: 'Were you required to work overtime and not provided with a meal break?',
    primaryHelp: 'A meal allowance of $17.19 applies for each overtime meal break not provided by your employer.',
    onlyForAward: ['MA000033'],
  },

  // ── MA000084 (Storage Services and Wholesale) ─────────────────────────────
  {
    type: 'cold_work',
    primary: 'Did you work in refrigerated or cold storage areas during this period?',
    primaryHelp: 'Cold work allowances apply when you work in refrigerated areas. The rate depends on the temperature.',
    onlyForAward: ['MA000084'],
    followUps: [
      {
        key: 'below_freezing',
        question: 'Were temperatures below -18.9°C (-2°F)?',
        help: 'Temperatures above -18.9°C get $1.07/hr. Between -18.9°C and -23.3°C get $1.61/hr. Below -23.3°C get $2.15/hr.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'first_aid',
    primary: 'Do you hold a current first aid certificate?',
    onlyForAward: ['MA000084'],
    followUps: [
      {
        key: 'appointed',
        question: 'Has your employer specifically appointed you as the person responsible for first aid at your workplace?',
        help: 'Simply holding a certificate is not enough — your employer must have asked you to act as first aider.',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'protective_clothing',
    primary: 'Does your employer require you to wear protective clothing or footwear that you had to purchase yourself?',
    primaryHelp: 'If your employer requires specific protective clothing or footwear but does not supply it, you are entitled to reimbursement of the reasonable cost.',
    onlyForAward: ['MA000084'],
  },
  {
    type: 'vehicle',
    primary: 'Were you required to travel to a different work location than usual, incurring additional travel costs?',
    primaryHelp: 'If you are directed to work at a different location, you are entitled to reimbursement for additional fares and travel time (Mon–Sat at your ordinary rate; Sun/PH at ordinary rate + 50%).',
    onlyForAward: ['MA000084'],
  },
];

type FollowUpAnswers = Record<string, string>;

export default function StepAllowances({ awardCode, employmentType, stream, answers, onAnswersChange, onNext, onBack }: Props) {
  const [allowanceInfo, setAllowanceInfo] = useState<AllowanceInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter questions by award, employment type, and stream
  const visibleQuestions = ALLOWANCE_QUESTIONS.filter(q => {
    if (q.onlyForAward && !q.onlyForAward.includes(awardCode)) return false;
    if (q.onlyFor && !q.onlyFor.includes(employmentType)) return false;
    if (q.onlyForStream && stream && !q.onlyForStream.includes(stream)) return false;
    if (q.onlyForStream && !stream) return false;
    return true;
  });

  const [primaryAnswers, setPrimaryAnswers] = useState<Record<string, boolean | null>>(
    () => Object.fromEntries(visibleQuestions.map(q => [q.type, false]))
  );
  const [followUpAnswers, setFollowUpAnswers] = useState<FollowUpAnswers>({});
  const [vehicleKm, setVehicleKm] = useState<string>('');
  const [vehicleMotorcycleKm, setVehicleMotorcycleKm] = useState<string>('');
  const [leadingHandCount, setLeadingHandCount] = useState<string>('');

  useEffect(() => {
    api.getAllowances(awardCode)
      .then((data: unknown) => setAllowanceInfo(data as AllowanceInfo[]))
      .finally(() => setLoading(false));
  }, [awardCode]);

  useEffect(() => {
    const result: AllowanceAnswer[] = [];

    for (const q of visibleQuestions) {
      const primary = primaryAnswers[q.type];
      if (primary === null || primary === undefined) continue;

      if (!primary) {
        result.push({ type: q.type, triggered: false });
        continue;
      }

      // Motorcycle uses its own km state (separate from car km)
      if (q.type === 'vehicle_motorcycle') {
        const km = parseFloat(vehicleMotorcycleKm);
        result.push({ type: q.type, triggered: !isNaN(km) && km > 0, detail: vehicleMotorcycleKm });
        continue;
      }

      // Other vehicle-like questions (need km)
      if (VEHICLE_TYPES.has(q.type)) {
        const km = parseFloat(vehicleKm);
        result.push({ type: q.type, triggered: !isNaN(km) && km > 0, detail: vehicleKm });
        continue;
      }

      // Leading hand — needs count input
      if (q.type === 'leading_hand') {
        const count = parseInt(leadingHandCount);
        if (!leadingHandCount || isNaN(count) || count <= 0) continue;
        let lhType = 'leading_hand_1to5';
        if (count >= 11) lhType = 'leading_hand_11plus';
        else if (count >= 6) lhType = 'leading_hand_6to10';
        result.push({ type: lhType, triggered: true, detail: leadingHandCount });
        continue;
      }

      // Horticulture leading hand — all-purpose, 4 tiers (2-6, 7-10, 11-20, 21+)
      if (q.type === 'hort_leading_hand') {
        const count = parseInt(leadingHandCount);
        if (!leadingHandCount || isNaN(count) || count < 2) continue;
        let lhType = 'leading_hand_2to6';
        if (count > 20) lhType = 'leading_hand_21plus';
        else if (count > 10) lhType = 'leading_hand_11to20';
        else if (count > 6) lhType = 'leading_hand_7to10';
        result.push({ type: lhType, triggered: true, detail: leadingHandCount });
        continue;
      }

      // Horticulture first aid — all-purpose $0.33/hr
      if (q.type === 'hort_first_aid') {
        result.push({ type: 'first_aid', triggered: true });
        continue;
      }

      // Nursery first aid — all-purpose $0.47/hr
      if (q.type === 'nursery_first_aid') {
        result.push({ type: 'first_aid', triggered: true });
        continue;
      }

      // Nursery meal allowance
      if (q.type === 'nursery_meal') {
        result.push({ type: 'meal', triggered: true });
        continue;
      }

      // Horticulture wet work — all-purpose $2.50/hr
      if (q.type === 'hort_wet_work') {
        result.push({ type: 'wet_work', triggered: true });
        continue;
      }

      // No follow-ups: direct trigger
      if (!q.followUps || q.followUps.length === 0) {
        // Remap types that differ from DB allowance_type
        if (q.type === 'laundry') {
          const t = employmentType === 'full_time' ? 'laundry_ft' : 'laundry_ptcasual';
          result.push({ type: t, triggered: true });
        } else if (q.type === 'laundry_uniform') {
          const t = employmentType === 'full_time' ? 'laundry_ft' : 'laundry_ptcasual';
          result.push({ type: t, triggered: true });
        } else if (q.type === 'laundry_lp') {
          const t = employmentType === 'full_time' ? 'laundry_ft' : 'laundry_pt_casual';
          result.push({ type: t, triggered: true });
        } else if (q.type === 'in_charge') {
          result.push({ type: 'in_charge_golf_bowling_tennis', triggered: true });
        } else if (q.type === 'split_shift_restaurant') {
          result.push({ type: 'split_shift', triggered: true });
        } else if (q.type === 'tool_restaurant') {
          result.push({ type: 'tool', triggered: true });
        } else {
          result.push({ type: q.type, triggered: true });
        }
        continue;
      }

      // Follow-up questions
      if (q.type === 'split_shift') {
        const fuAnswer = followUpAnswers['split_shift_long_gap'];
        if (!fuAnswer) continue;
        result.push({ type: fuAnswer === 'yes' ? 'split_shift_long' : 'split_shift_short', triggered: true });
        continue;
      }

      if (q.type === 'first_aid') {
        const fuAnswer = followUpAnswers['first_aid_appointed'];
        if (!fuAnswer) continue;
        if (fuAnswer === 'yes') {
          const t = awardCode === 'MA000009'
            ? (employmentType === 'full_time' ? 'first_aid_ft' : 'first_aid_ptcasual')
            : 'first_aid';
          result.push({ type: t, triggered: true });
        } else {
          result.push({ type: 'first_aid', triggered: false });
        }
        continue;
      }

      if (q.type === 'height_low') {
        const fuAnswer = followUpAnswers['height_low_above_22nd'];
        if (!fuAnswer) continue;
        result.push({ type: fuAnswer === 'yes' ? 'height_high' : 'height_low', triggered: true });
        continue;
      }

      if (q.type === 'hot_places_low') {
        const fuAnswer = followUpAnswers['hot_places_low_above_54'];
        if (!fuAnswer) continue;
        result.push({ type: fuAnswer === 'yes' ? 'hot_places_high' : 'hot_places_low', triggered: true });
        continue;
      }

      if (q.type === 'leading_hand_cleaning') {
        const count = parseInt(leadingHandCount);
        if (!leadingHandCount || isNaN(count) || count <= 0) continue;
        let lhType = 'leading_hand_1to10';
        if (count > 20) lhType = 'leading_hand_21plus';
        else if (count > 10) lhType = 'leading_hand_11to20';
        result.push({ type: lhType, triggered: true, detail: leadingHandCount });
        continue;
      }

      if (q.type === 'cold_work') {
        if (awardCode === 'MA000084') {
          const fuAnswer = followUpAnswers['cold_work_below_freezing'];
          if (!fuAnswer) continue;
          result.push({ type: fuAnswer === 'yes' ? 'cold_work_freezer' : 'cold_work', triggered: true });
        } else {
          const fuAnswer = followUpAnswers['cold_work_below_zero'];
          if (!fuAnswer) continue;
          result.push({ type: fuAnswer === 'yes' ? 'cold_work_freezer' : 'cold_work', triggered: true });
        }
        continue;
      }

      if (q.type === 'cold_work_retail') {
        const fuAnswer = followUpAnswers['cold_work_retail_below_zero'];
        if (!fuAnswer) continue;
        result.push({ type: fuAnswer === 'yes' ? 'cold_work_below_zero' : 'cold_work_above_zero', triggered: true });
        continue;
      }

      if (q.type === 'tool_trades') {
        const fuAnswer = followUpAnswers['tool_trades_is_carpenter'];
        if (!fuAnswer) continue;
        result.push({ type: fuAnswer === 'yes' ? 'tool_carpenter' : 'tool_tradesperson', triggered: true });
        continue;
      }

      if (q.type === 'meal_travelling') {
        const fuAnswer = followUpAnswers['meal_travelling_five_or_more_days'];
        if (!fuAnswer) continue;
        result.push({ type: fuAnswer === 'yes' ? 'meal_travelling_weekly' : 'meal_travelling', triggered: true });
        continue;
      }

      // Generic follow-up logic
      let allAnswered = true;
      let triggered = true;
      for (const fu of q.followUps) {
        const fuKey = `${q.type}_${fu.key}`;
        const fuAnswer = followUpAnswers[fuKey];
        if (!fuAnswer) { allAnswered = false; break; }
        if (fuAnswer !== fu.triggeredWhen) triggered = false;
      }
      if (allAnswered) result.push({ type: q.type, triggered });
    }

    onAnswersChange(result);
  }, [primaryAnswers, followUpAnswers, vehicleKm, vehicleMotorcycleKm, leadingHandCount]);

  function setPrimary(type: string, val: boolean) {
    setPrimaryAnswers(prev => ({ ...prev, [type]: val }));
    setFollowUpAnswers(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (k.startsWith(`${type}_`)) delete next[k]; });
      return next;
    });
  }

  function setFollowUp(type: string, key: string, val: string) {
    setFollowUpAnswers(prev => ({ ...prev, [`${type}_${key}`]: val }));
  }

  const latestAllowance = (type: string): AllowanceInfo | undefined => {
    const matches = allowanceInfo.filter(a => a.allowance_type === type).sort(
      (a, b) => (b.effective_date || '').localeCompare(a.effective_date || '')
    );
    return matches[0];
  };

  function getEffectiveAllowanceType(qType: string): string {
    if (qType === 'laundry' || qType === 'laundry_uniform') {
      return employmentType === 'full_time' ? 'laundry_ft' : 'laundry_ptcasual';
    }
    if (qType === 'laundry_lp') {
      return employmentType === 'full_time' ? 'laundry_ft' : 'laundry_pt_casual';
    }
    if (qType === 'split_shift') {
      return followUpAnswers['split_shift_long_gap'] === 'yes' ? 'split_shift_long' : 'split_shift_short';
    }
    if (qType === 'first_aid') {
      if (awardCode === 'MA000009') {
        return employmentType === 'full_time' ? 'first_aid_ft' : 'first_aid_ptcasual';
      }
      return 'first_aid';
    }
    if (qType === 'cold_work') {
      if (awardCode === 'MA000084') {
        return followUpAnswers['cold_work_below_freezing'] === 'yes' ? 'cold_work_freezer' : 'cold_work';
      }
      return followUpAnswers['cold_work_below_zero'] === 'yes' ? 'cold_work_freezer' : 'cold_work';
    }
    if (qType === 'cold_work_retail') {
      return followUpAnswers['cold_work_retail_below_zero'] === 'yes' ? 'cold_work_below_zero' : 'cold_work_above_zero';
    }
    if (qType === 'height_low') {
      return followUpAnswers['height_low_above_22nd'] === 'yes' ? 'height_high' : 'height_low';
    }
    if (qType === 'hot_places_low') {
      return followUpAnswers['hot_places_low_above_54'] === 'yes' ? 'hot_places_high' : 'hot_places_low';
    }
    if (qType === 'leading_hand_cleaning') {
      const count = parseInt(leadingHandCount);
      if (count > 20) return 'leading_hand_21plus';
      if (count > 10) return 'leading_hand_11to20';
      return 'leading_hand_1to10';
    }
    if (qType === 'in_charge') return 'in_charge_golf_bowling_tennis';
    if (qType === 'tool_trades') {
      return followUpAnswers['tool_trades_is_carpenter'] === 'yes' ? 'tool_carpenter' : 'tool_tradesperson';
    }
    if (qType === 'leading_hand') {
      const count = parseInt(leadingHandCount);
      if (count >= 11) return 'leading_hand_11plus';
      if (count >= 6) return 'leading_hand_6to10';
      return 'leading_hand_1to5';
    }
    if (qType === 'hort_leading_hand') {
      const count = parseInt(leadingHandCount);
      if (count > 20) return 'leading_hand_21plus';
      if (count > 10) return 'leading_hand_11to20';
      if (count > 6) return 'leading_hand_7to10';
      return 'leading_hand_2to6';
    }
    if (qType === 'hort_first_aid') return 'first_aid';
    if (qType === 'hort_wet_work') return 'wet_work';
    if (qType === 'nursery_first_aid') return 'first_aid';
    if (qType === 'nursery_meal') return 'meal';
    if (qType === 'meal_travelling') {
      return followUpAnswers['meal_travelling_five_or_more_days'] === 'yes' ? 'meal_travelling_weekly' : 'meal_travelling';
    }
    if (qType === 'split_shift_restaurant') return 'split_shift';
    if (qType === 'tool_restaurant') return 'tool';
    return qType;
  }

  const triggeredAllowances = answers.filter(a => a.triggered);

  const allQuestionsAnswered = visibleQuestions.every(q => {
    const primary = primaryAnswers[q.type];
    if (primary === null || primary === undefined) return false;
    if (!primary) return true;
    if (VEHICLE_TYPES.has(q.type)) return true;
    if (q.type === 'leading_hand' || q.type === 'leading_hand_cleaning') return !!leadingHandCount && parseInt(leadingHandCount) > 0;
    if (q.type === 'hort_leading_hand') return !!leadingHandCount && parseInt(leadingHandCount) >= 2;
    if (!q.followUps) return true;
    return q.followUps.every(fu => followUpAnswers[`${q.type}_${fu.key}`]);
  });

  function findAnswer(q: AllowanceQuestion) {
    return answers.find(a =>
      a.type === q.type ||
      (a.type === 'split_shift_short' && q.type === 'split_shift') ||
      (a.type === 'split_shift_long' && q.type === 'split_shift') ||
      (a.type === 'first_aid_ft' && q.type === 'first_aid') ||
      (a.type === 'first_aid_ptcasual' && q.type === 'first_aid') ||
      (a.type === 'first_aid' && q.type === 'first_aid') ||
      (a.type === 'laundry_ft' && (q.type === 'laundry' || q.type === 'laundry_uniform' || q.type === 'laundry_lp')) ||
      (a.type === 'laundry_ptcasual' && (q.type === 'laundry' || q.type === 'laundry_uniform')) ||
      (a.type === 'laundry_pt_casual' && q.type === 'laundry_lp') ||
      (a.type === 'cold_work' && q.type === 'cold_work') ||
      (a.type === 'cold_work_mid' && q.type === 'cold_work') ||
      (a.type === 'cold_work_freezer' && q.type === 'cold_work') ||
      (a.type === 'cold_work_above_zero' && q.type === 'cold_work_retail') ||
      (a.type === 'cold_work_below_zero' && q.type === 'cold_work_retail') ||
      (a.type === 'in_charge_golf_bowling_tennis' && q.type === 'in_charge') ||
      (a.type === 'tool_carpenter' && q.type === 'tool_trades') ||
      (a.type === 'tool_tradesperson' && q.type === 'tool_trades') ||
      (a.type === 'leading_hand_1to5' && q.type === 'leading_hand') ||
      (a.type === 'leading_hand_6to10' && q.type === 'leading_hand') ||
      (a.type === 'leading_hand_11plus' && q.type === 'leading_hand') ||
      (a.type === 'meal_travelling' && q.type === 'meal_travelling') ||
      (a.type === 'meal_travelling_weekly' && q.type === 'meal_travelling') ||
      (a.type === 'split_shift' && q.type === 'split_shift_restaurant') ||
      (a.type === 'tool' && q.type === 'tool_restaurant') ||
      (a.type === 'height_low' && q.type === 'height_low') ||
      (a.type === 'height_high' && q.type === 'height_low') ||
      (a.type === 'hot_places_low' && q.type === 'hot_places_low') ||
      (a.type === 'hot_places_high' && q.type === 'hot_places_low') ||
      (a.type === 'leading_hand_1to10' && q.type === 'leading_hand_cleaning') ||
      (a.type === 'leading_hand_11to20' && q.type === 'leading_hand_cleaning') ||
      (a.type === 'leading_hand_21plus' && q.type === 'leading_hand_cleaning') ||
      (a.type === 'first_aid' && q.type === 'hort_first_aid') ||
      (a.type === 'wet_work' && q.type === 'hort_wet_work') ||
      (a.type === 'first_aid' && q.type === 'nursery_first_aid') ||
      (a.type === 'meal' && q.type === 'nursery_meal') ||
      (a.type === 'leading_hand_2to6' && q.type === 'hort_leading_hand') ||
      (a.type === 'leading_hand_7to10' && q.type === 'hort_leading_hand') ||
      (a.type === 'leading_hand_11to20' && q.type === 'hort_leading_hand') ||
      (a.type === 'leading_hand_21plus' && q.type === 'hort_leading_hand')
    );
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  if (visibleQuestions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Allowances</h2>
        </div>
        <div className="info-box text-sm">
          No additional allowance questions apply for your award and employment type.
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
          <button onClick={onNext} className="btn-primary flex-1">Next — Your rights →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Allowances</h2>
        <p className="text-gray-600">
          As well as your hourly rate and penalty rates, certain situations entitle you to extra
          allowances. Answer these questions to find out if any apply.
        </p>
      </div>

      {awardCode === 'MA000028' && (
        <div style={{ padding: '12px 14px', background: 'var(--accent-light)', borderLeft: '4px solid var(--accent)', borderRadius: '8px', fontSize: '13px' }}>
          <p style={{ fontWeight: 600, color: 'var(--accent-dark)', marginBottom: '4px' }}>Important — all-purpose allowances</p>
          <p style={{ color: 'var(--secondary)', lineHeight: 1.6 }}>
            The Horticulture Award has <strong>all-purpose allowances</strong> (first aid, leading hand, and wet work).
            These are added to your base rate <em>before</em> casual loading, penalty rates, and overtime are calculated.
            Your results will be automatically recalculated to reflect any that apply.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {visibleQuestions.map(q => {
          const primary = primaryAnswers[q.type];
          const effectiveType = getEffectiveAllowanceType(q.type);
          const info = latestAllowance(effectiveType);
          const thisAnswer = findAnswer(q);

          return (
            <div key={q.type} className="card space-y-4">
              {/* Primary question */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">{q.primary}</p>
                {q.primaryHelp && <p className="text-sm text-gray-500">{q.primaryHelp}</p>}
                <div className="flex gap-3">
                  {[true, false].map(val => (
                    <button
                      key={String(val)}
                      onClick={() => setPrimary(q.type, val)}
                      className={clsx(
                        'flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all',
                        primary === val
                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      )}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leading hand count input */}
              {primary === true && (q.type === 'leading_hand' || q.type === 'leading_hand_cleaning' || q.type === 'hort_leading_hand') && (
                <div className="space-y-2 pl-4 border-l-2 border-brand-200">
                  <p className="text-sm font-medium text-gray-900">How many employees are you responsible for supervising?</p>
                  {q.type === 'hort_leading_hand' && (
                    <p className="text-xs text-gray-500">The leading hand allowance applies when you are in charge of 2 or more employees.</p>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={q.type === 'hort_leading_hand' ? 2 : 1}
                      step={1}
                      placeholder="0"
                      value={leadingHandCount}
                      onChange={e => setLeadingHandCount(e.target.value)}
                      className="input-field max-w-[120px]"
                    />
                    <span className="text-gray-500 text-sm">employees</span>
                  </div>
                  {leadingHandCount && parseInt(leadingHandCount) > 0 && (
                    <p className="text-xs text-gray-500">
                      {q.type === 'leading_hand_cleaning'
                        ? (parseInt(leadingHandCount) > 20 ? 'Rate: leading hand over 20 employees'
                          : parseInt(leadingHandCount) > 10 ? 'Rate: leading hand 11–20 employees'
                          : 'Rate: leading hand 1–10 employees')
                        : q.type === 'hort_leading_hand'
                        ? (parseInt(leadingHandCount) > 20 ? 'All-purpose rate: $1.58/hr (21+ employees)'
                          : parseInt(leadingHandCount) > 10 ? 'All-purpose rate: $1.25/hr (11–20 employees)'
                          : parseInt(leadingHandCount) > 6 ? 'All-purpose rate: $0.88/hr (7–10 employees)'
                          : parseInt(leadingHandCount) >= 2 ? 'All-purpose rate: $0.76/hr (2–6 employees)'
                          : 'Allowance applies from 2 employees')
                        : (parseInt(leadingHandCount) >= 11 ? 'Rate: leading hand 11+ employees'
                          : parseInt(leadingHandCount) >= 6 ? 'Rate: leading hand 6–10 employees'
                          : 'Rate: leading hand 1–5 employees')}
                    </p>
                  )}
                </div>
              )}

              {/* Follow-up questions */}
              {primary === true && q.followUps && q.followUps.map(fu => {
                const fuKey = `${q.type}_${fu.key}`;

                // Motorcycle km input (separate state)
                if (q.type === 'vehicle_motorcycle' && fu.key === 'km') {
                  return (
                    <div key={fu.key} className="space-y-2 pl-4 border-l-2 border-brand-200">
                      <p className="text-sm font-medium text-gray-900">{fu.question}</p>
                      {fu.help && <p className="text-xs text-gray-500">{fu.help}</p>}
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          placeholder="0"
                          value={vehicleMotorcycleKm}
                          onChange={e => setVehicleMotorcycleKm(e.target.value)}
                          className="input-field max-w-[120px]"
                        />
                        <span className="text-gray-500 text-sm">km</span>
                        {vehicleMotorcycleKm && parseFloat(vehicleMotorcycleKm) > 0 && info?.amount && (
                          <span className="text-success-600 font-semibold text-sm">
                            = {formatCurrency(parseFloat(vehicleMotorcycleKm) * info.amount)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                // Vehicle km input
                if (VEHICLE_TYPES.has(q.type) && fu.key === 'km') {
                  return (
                    <div key={fu.key} className="space-y-2 pl-4 border-l-2 border-brand-200">
                      <p className="text-sm font-medium text-gray-900">{fu.question}</p>
                      {fu.help && <p className="text-xs text-gray-500">{fu.help}</p>}
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          placeholder="0"
                          value={vehicleKm}
                          onChange={e => setVehicleKm(e.target.value)}
                          className="input-field max-w-[120px]"
                        />
                        <span className="text-gray-500 text-sm">km</span>
                        {vehicleKm && parseFloat(vehicleKm) > 0 && info?.amount && (
                          <span className="text-success-600 font-semibold text-sm">
                            = {formatCurrency(parseFloat(vehicleKm) * info.amount)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={fu.key} className="space-y-2 pl-4 border-l-2 border-brand-200">
                    <p className="text-sm font-medium text-gray-900">{fu.question}</p>
                    {fu.help && <p className="text-xs text-gray-500">{fu.help}</p>}
                    <div className="flex gap-3">
                      {['yes', 'no'].map(val => (
                        <button
                          key={val}
                          onClick={() => setFollowUp(q.type, fu.key, val)}
                          className={clsx(
                            'flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition-all capitalize',
                            followUpAnswers[fuKey] === val
                              ? 'border-brand-600 bg-brand-50 text-brand-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          )}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Result for this allowance */}
              {(() => {
                if (!thisAnswer) return null;

                if (thisAnswer.triggered && info) {
                  return (
                    <div className="success-box text-sm space-y-1">
                      <p className="font-semibold text-success-700">✓ {info.name} applies</p>
                      <p className="text-gray-700">{info.description}</p>
                      {info.amount && !VEHICLE_TYPES.has(q.type) && (
                        <p className="font-semibold text-success-700">
                          Rate: {formatCurrency(info.amount)} {info.per_unit?.replace(/_/g, ' ')}
                        </p>
                      )}
                      {VEHICLE_TYPES.has(q.type) && info.amount && vehicleKm && (
                        <p className="font-semibold text-success-700">
                          {parseFloat(vehicleKm).toFixed(1)} km × {formatCurrency(info.amount)}/km = {formatCurrency(parseFloat(vehicleKm) * info.amount)}
                        </p>
                      )}
                    </div>
                  );
                }

                if (primary === false) {
                  return (
                    <p className="text-sm text-gray-400 italic">This allowance does not apply.</p>
                  );
                }

                return null;
              })()}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {triggeredAllowances.length > 0 && (
        <div className="card bg-success-50 border-success-100 space-y-3">
          <h3 className="font-bold text-gray-900">Allowances owed this period:</h3>
          <ul className="space-y-2 text-sm">
            {triggeredAllowances.map(a => {
              const info = latestAllowance(a.type);
              if (!info) return null;
              return (
                <li key={a.type} className="flex justify-between items-start gap-2">
                  <span className="text-gray-700">{info.name}</span>
                  {info.amount && !VEHICLE_TYPES.has(a.type) && (
                    <span className="font-semibold text-success-700 shrink-0">
                      {formatCurrency(info.amount)} {info.per_unit?.replace(/_/g, ' ')}
                    </span>
                  )}
                  {VEHICLE_TYPES.has(a.type) && info.amount && a.detail && (
                    <span className="font-semibold text-success-700 shrink-0">
                      {formatCurrency(parseFloat(a.detail) * info.amount)}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-gray-500">
            These are additional to your shift pay calculated on the previous step.
          </p>
        </div>
      )}

      {allQuestionsAnswered && triggeredAllowances.length === 0 && (
        <div className="info-box text-sm">
          No allowances appear to apply for this period based on your answers.
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">Next — Your rights →</button>
      </div>
    </div>
  );
}
