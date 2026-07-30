# dejo-34a-platform

Professional learning and teaching platform for the German §34a GewO examination. This repository contains architecture only; it deliberately ships without legal, course, quiz, or user demo content.

## Prerequisites

- Node.js 22+
- npm 10+
- Docker Desktop (for containerised development)
- PostgreSQL 17 (only for local, non-Docker use)

## Installation

```bash
cp .env.example .env
npm install
npm run prisma:generate -w @dejo/backend
npm run prisma:migrate -w @dejo/backend -- --name init
```

Set strong values for `POSTGRES_PASSWORD` and `JWT_SECRET` in `.env`. The JWT integration is intentionally prepared only; no credential endpoints are exposed yet.

## Development

```bash
npm run dev
```

The Angular client runs on `http://localhost:4200`; the API runs on `http://localhost:3000/api`; Swagger is available at `http://localhost:3000/api/docs`.

Useful checks:

```bash
npm run lint
npm run format:check
npm run build
```

## Docker

```bash
cp .env.example .env
docker compose up -d --build
```

The frontend is served at `http://localhost:8080`, proxying `/api` to the backend. PostgreSQL data persists in the named `postgres_data` volume. View service logs with `docker compose logs -f` and stop services with `docker compose down`.

## Project structure

```text
apps/
  frontend/       Angular 21 + Angular Material application
  backend/        NestJS API, Swagger and authentication foundation
packages/
  shared/         framework-neutral shared contracts
database/
  prisma/         Prisma schema and migration history
scripts/
  law-import/     legal source importer workspace
docker/           container build and reverse-proxy configuration
docs/             architecture documentation
```

## Backend modules

`Auth`, `Topic`, `Law`, `Paragraph`, `Import`, `Search`, and `Quiz` are independent NestJS modules. Each keeps HTTP handling and persistence logic separated so domain features can grow without cross-cutting dependencies.

## Quality controls

Prettier, ESLint, Husky/lint-staged, and GitHub Actions are configured at the repository root. CI validates formatting, linting, and builds on pushes to `main` and pull requests.
