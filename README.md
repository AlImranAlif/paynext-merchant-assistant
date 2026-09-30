# PayNext Merchant Assistant

A timed fintech/product-assessment prototype built with Next.js and NestJS.

## Product idea

A small merchant needs a simple way to understand:
- completed payments
- pending payments
- refunds
- fees
- expected net settlement

The MVP provides a merchant dashboard and a real state-changing workflow:
**Pending → Mark as Settled → Completed**.

## Structure

```text
paynext-merchant-assistant/
├── frontend/   # Next.js merchant UI
└── backend/    # NestJS REST API
```

## Run locally

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend runs on `http://localhost:3000`.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3001`.

The frontend is configured to call the backend at:

```text
http://localhost:3000
```

## API

- `GET /transactions`
- `GET /transactions/summary`
- `GET /transactions/:id`
- `PATCH /transactions/:id/settle`

The backend intentionally uses in-memory mock data so the assessment can focus on product behavior rather than database setup.

## Assessment talking points

- Next.js owns the merchant experience.
- NestJS owns transaction state and business rules.
- The frontend never decides whether a transaction can be settled.
- The in-memory repository can later be replaced with PostgreSQL.
- The main user workflow is visible and functional rather than being a static dashboard.
