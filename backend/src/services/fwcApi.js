/**
 * FWC Modern Awards Pay Database (MAPD) API client.
 *
 * Docs: https://developer.fwc.gov.au
 * Base: https://api.fwc.gov.au/api/v1/awards
 *
 * Auth: Ocp-Apim-Subscription-Key header with the subscription key from .env.
 * All endpoints are GET-only and return paginated JSON.
 */
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://api.fwc.gov.au/api/v1/awards';
const API_KEY = process.env.FWC_API_KEY;

if (!API_KEY) {
  throw new Error('FWC_API_KEY is not set in .env');
}

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
  timeout: 30000,
});

// ── Rate-limit helper ────────────────────────────────────────────────────────
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ── Pagination helper ────────────────────────────────────────────────────────
// The API paginates with ?page=N&limit=N. Fetches all pages and returns
// the concatenated results array.
async function fetchAllPages(path, params = {}) {
  const limit = 100;
  let page = 1;
  let allResults = [];

  while (true) {
    const { data } = await client.get(path, {
      params: { ...params, limit, page },
    });

    allResults = allResults.concat(data.results || []);

    if (!data._meta.has_more_results) break;
    page++;
    await delay(200); // respect rate limits
  }

  return allResults;
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Get award metadata (all versions). */
async function getAward(awardCode) {
  const results = await fetchAllPages(`/${awardCode}`);
  return results;
}

/** Get classifications for an award, optionally filtered by date range. */
async function getClassifications(awardCode, { operativeFrom, operativeTo } = {}) {
  return fetchAllPages(`/${awardCode}/classifications`, {
    operative_from: operativeFrom,
    operative_to: operativeTo,
  });
}

/** Get current pay rate for a specific classification. */
async function getPayRateForClassification(awardCode, classificationFixedId) {
  const { data } = await client.get(
    `/${awardCode}/classifications/${classificationFixedId}/pay-rates`,
    { params: { limit: 100 } }
  );
  return data.results || [];
}

/** Get all pay rates for an award (bulk — may have null rate values). */
async function getPayRates(awardCode, { operativeFrom, operativeTo } = {}) {
  return fetchAllPages(`/${awardCode}/pay-rates`, {
    operative_from: operativeFrom,
    operative_to: operativeTo,
  });
}

/** Get penalty rates for an award. */
async function getPenalties(awardCode, { operativeFrom, operativeTo } = {}) {
  return fetchAllPages(`/${awardCode}/penalties`, {
    operative_from: operativeFrom,
    operative_to: operativeTo,
  });
}

/** Get expense allowances for an award. */
async function getExpenseAllowances(awardCode, { operativeFrom, operativeTo } = {}) {
  return fetchAllPages(`/${awardCode}/expense-allowances`, {
    operative_from: operativeFrom,
    operative_to: operativeTo,
  });
}

/** Get wage allowances for an award. */
async function getWageAllowances(awardCode, { operativeFrom, operativeTo } = {}) {
  return fetchAllPages(`/${awardCode}/wage-allowances`, {
    operative_from: operativeFrom,
    operative_to: operativeTo,
  });
}

module.exports = {
  getAward,
  getClassifications,
  getPayRateForClassification,
  getPayRates,
  getPenalties,
  getExpenseAllowances,
  getWageAllowances,
};
