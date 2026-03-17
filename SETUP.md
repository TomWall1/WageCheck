# WageCheck — Setup Guide

## Prerequisites
- Node.js 20+
- PostgreSQL 15+ (local or hosted)

---

## Backend

### 1. Configure environment
```bash
cd backend
cp .env.example .env
# Edit .env — set DATABASE_URL and ADMIN_SECRET
```

### 2. Install and run database setup
```bash
npm install
npm run migrate    # Creates all tables
npm run seed       # Loads award data (pay rates, classifications, allowances, etc.)
```

### 3. Optional: scrape Fair Work pages
```bash
npm run scrape     # Fetches raw content from fairwork.gov.au for reference
```

### 4. Start the API
```bash
npm run dev        # Development (nodemon)
npm start          # Production
```

API runs on http://localhost:3001

---

## Frontend

### 1. Configure environment
```bash
cd frontend
cp .env.local.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Install and start
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
```

---

## Deployment

### Backend → Render
- Use `backend/render.yaml` — creates web service + PostgreSQL database
- Set `ADMIN_SECRET` in Render environment variables
- After deploy, run migrate and seed manually via Render shell, or add them to `buildCommand`

### Frontend → Vercel
- Connect GitHub repo, set root directory to `frontend/`
- Set `NEXT_PUBLIC_API_URL` to your Render backend URL

---

## Annual rate update (July each year)
After the Fair Work Annual Wage Review (July), update `backend/scripts/seed.js`:
1. Update `EFFECTIVE_DATE` constant to new date
2. Update all rate values in `baseRates` object
3. Update allowance amounts
4. Re-run `npm run seed`
5. Optionally trigger a scrape via admin endpoint: `POST /api/admin/scrape` with `x-admin-secret` header

## Admin API
All admin routes require the `x-admin-secret` header.

```
GET  /api/admin/data-status      # Check data freshness
POST /api/admin/scrape           # Trigger re-scrape
GET  /api/admin/scrape-log       # View scrape history
```
