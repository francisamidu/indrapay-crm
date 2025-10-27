# Indrapay CRM 🚀

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#) [![Coverage](https://img.shields.io/badge/coverage-%E2%80%94%25-lightgrey)](#) [![License](https://img.shields.io/badge/license-MIT-blue)](#) [![Issues](https://img.shields.io/badge/issues-open-yellow)](#)

> A unified operations & customer relationship platform for **Indrapay** — businesses, subscriptions, billing, support, communications, analytics and admin in one place.

---

## Table of contents

- [About](#about)
- [Key features](#key-features)
- [Architecture & file map](#architecture--file-map)
- [Types & Validation (Zod)](#types--validation-zod)
- [API examples](#api-examples)
- [RBAC & Security](#rbac--security)
- [Developer setup](#developer-setup)
- [Testing & QA](#testing--qa)
- [Deployment](#deployment)
- [Monitoring & Metrics](#monitoring--metrics)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

---

## About

**Indrapay CRM** centralizes the operational needs of Indrapay teams — Ops, Finance, Support, and Admin — offering a 360° business view, subscription & billing workflows, SLA-backed support, templated communications, analytics, and audit-first compliance.

This repository contains the frontend codebase (React + TypeScript) and shared types/validation (Zod) used by the UI to interact with the backend APIs.

---

## Key features

- Dashboard with KPI cards, trends, and activity feed  
- Business management: create/edit, profile, subscriptions, notes  
- Subscriptions & billing: plan assignment, trial handling, proration preview  
- Support & tickets: SLA timers, escalation rules, threaded comments  
- Communication: templated Email/SMS with delivery logs  
- Analytics & insights: aggregated metrics + CSV exports  
- Admin & settings: users, roles, audit logs, system configuration  
- Documents & billing (planned): signed URL uploads, invoice library  
- Data import/export wizard with validation and job monitor  
- Alerts & notifications center

---

## Architecture & file map

High-level stack:
- Frontend: **React + TypeScript**
- Validation: **Zod**
- Backend: RESTful API (Node/NestJS or Express)
- DB: PostgreSQL (recommended)
- Integrations: Stripe, Twilio, SES, object storage (S3)

Suggested frontend repository layout (snapshot):

```
src/
 ├── api/              # API handlers & reusable API clients
 ├── components/       # Reusable UI components (tables, forms, cards)
 ├── pages/            # Route pages (Dashboard, Businesses, Support, etc.)
 ├── services/         # Business service layer calling api/*
 ├── store/            # App state (Redux / Zustand)
 ├── hooks/            # Custom React hooks
 ├── utils/            # Helpers (formatters, validators)
 ├── types/            # Zod + TypeScript schemas (see below)
 │    ├── apiEnvelope.ts
 │    ├── auth.ts
 │    ├── common.ts
 │    ├── fees.ts
 │    ├── forex.ts
 │    ├── ledger.ts
 │    ├── wallet.ts
 │    └── index.ts
 ├── config/           # Env and feature flags
 └── README.md
```



---

## Types & Validation (Zod)

All API request/response types and runtime validators live in `src/types/` (Zod schemas + `z.infer<>` TypeScript types). This enables:

- Compile-time typing for components and API calls
- Runtime validation of inputs and server responses
- Consistent contract between frontend and backend

Example usage:

```ts
// src/services/walletService.ts
import axios from 'axios';
import { CreateWalletRequestSchema, CreateWalletResponseSchema } from 'src/types/wallet';

const API = axios.create({ baseURL: process.env.API_BASE_URL });

export async function createWallet(payload: unknown) {
  const request = CreateWalletRequestSchema.parse(payload);
  const res = await API.post('/v1/wallets', request);
  const parsed = CreateWalletResponseSchema.safeParse(res.data);
  if (!parsed.success) throw new Error('Unexpected response shape from server');
  return parsed.data;
}
```

**Why Zod?**
- Lightweight and expressive runtime validation.
- Easy `z.infer<>` for TypeScript types.
- Great for validating both request payloads and server responses.

---

## API examples

> All endpoints are prefixed with `/v1`.

### Dashboard summary
```http
GET /v1/dashboard/summary
Response: ApiEnvelope<{ totalBusinesses: number; mrr: number; trends: any }>
```

### Create business
```http
POST /v1/businesses
Body: { name: string, email?: string, planId?: string, ... }
```

### Create support ticket
```http
POST /v1/support/tickets
Body: { businessId: string, subject: string, message: string, priority?: 'low'|'medium'|'high' }
```

### Assign subscription
```http
POST /v1/subscriptions/{businessId}/assign
Body: { planId: string, startAt?: string, trial?: boolean }
```

Use the Zod schemas in `src/types/*` to validate both requests and responses on the frontend.

---

## RBAC & Security

| Role | Access Summary |
|------|----------------|
| **Superadmin** | system-wide settings & role creation |
| **Admin** | full access to all features |
| **Finance** | billing & analytics |
| **Support** | tickets & customer contact flows |
| **Viewer** | read-only access |

Security principles:
- Audit-first: every write action produces an `audit_log` entry with `actor_id`, `reason`, and timestamp.
- Field-level RBAC for sensitive fields (e.g., MRR visible only to Finance/Admin).
- Enforce backend server-side RBAC — never trust the client.
- Password strength + optional MFA flows enforced at auth layer.
- PII redaction for exports and signed URLs for document access.

---

## Developer setup

### Prerequisites
- Node.js v18+
- pnpm / npm / yarn
- PostgreSQL (local) or remote DB
- `.env` configuration

### Installation
```bash
git clone git@github.com:indrapay/indrapay-crm.git
cd indrapay-crm
npm install
cp .env.example .env
npm run dev
```

### Common npm scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run test` — run tests
- `npm run lint` — linting

### Environment variables
```
API_BASE_URL=http://localhost:4000
AUTH_PROVIDER_URL=http://localhost:4000/auth
STRIPE_PUBLIC_KEY=pk_test_xxx
MAIL_SENDER_ID=no-reply@indrapay.com
DEFAULT_TIMEZONE=Africa/Blantyre
FEATURE_FLAGS_ENABLE_AI=false
```

---

## Testing & QA

- Unit tests: Zod schema validation & utilities
- Integration tests: API clients + mocks
- E2E tests: Cypress for primary flows (create business, ticket lifecycle)
- Performance: Analytics queries < 2s (cached)
- Edge-case tests: SLA escalations, webhook retries, duplicate-ticket prevention

---

## Deployment

Recommended CI/CD:
1. PR → CI tests & lint (GitHub Actions)
2. Merge → build artifact + Docker image
3. Auto-deploy (Cloud Run / ECS / Kubernetes / EC2)

Commands:
```bash
npm run build
docker build -t indrapay-crm:${GITHUB_SHA} .
```

Feature flags control optional modules (email provider, AI, docs upload).

---

## Monitoring & Metrics

Track key metrics:
- API latency and error rates
- Dashboard cache hit rate
- Ticket resolution times
- Subscription churn & MRR trends
- Alert frequency and acknowledgement time
- Export/import job success rates

Suggested stack: Prometheus + Grafana, Sentry, Datadog.

---

## Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Write tests & update types
4. Open a PR referencing related feature mapping or issue
5. Await review for code quality and acceptance criteria

Follow `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md` guidelines.

---

## License & Contact

**License:** MIT  
**Contact:** platform@indrapay.com

For integration help or schema updates, open an issue or email the core platform team.

---

### Appendix: Quick links

- `docs/Indrapay Page & Feature Mapping.md` — Product → UI → API mapping
- `src/types/` — Zod schemas & inferred TS types (import from `src/types/index.ts`)

