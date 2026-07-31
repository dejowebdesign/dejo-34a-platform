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

## Umbrel OS / Portainer

The root `docker-compose.yml` uses the Compose specification and is suitable for a Portainer **Docker Compose Stack** (not Docker Swarm). It builds the two application images from the Git repository and uses a named PostgreSQL volume.

1. In Portainer, create a new Stack from this Git repository.
2. Select `docker-compose.yml` as the compose path.
3. Define `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `JWT_SECRET` as Stack environment variables. Use strong, unique secrets; do not commit them.
4. Deploy the stack. The frontend publishes port `8080`; map or reverse-proxy that port through Umbrel as appropriate for the installation.

All services use `restart: unless-stopped`. The backend applies committed Prisma migrations before it starts, so a database backup should be taken before deployments that include new migrations.

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

## Law Engine foundation

The Law Engine provides a version-aware persistence and API foundation without bundled legal content or an automated importer. The data model connects topics and sub-topics to optional paragraph classifications; laws own paragraphs, paragraph versions, and import-job records.

The REST API is available under `/api`; the OpenAPI document is served at `/api/docs`.

| Resource           | Endpoints                 |
| ------------------ | ------------------------- |
| Topics             | `/api/topics`             |
| Sub-topics         | `/api/sub-topics`         |
| Laws               | `/api/laws`               |
| Paragraphs         | `/api/paragraphs`         |
| Paragraph versions | `/api/paragraph-versions` |
| Import jobs        | `/api/import-jobs`        |

Each resource provides `GET`, `GET /:id`, `POST`, `PATCH /:id`, and `DELETE /:id` endpoints. Import-job endpoints manage records only; they do not execute an importer.

The Angular application includes empty, paginated Material table shells for topics, laws, and paragraphs. Sorting and local filtering are ready for API-backed data sources; detail routes are deliberately empty.

## Legal Import Engine

The Legal Import Engine is built around the official **Gesetze im Internet** structured export. The Federal Ministry of Justice and Federal Office of Justice provide a current XML table of contents and legal texts as XML downloads (typically ZIP packages); the official XML DTD is public. HTML is not used by the importer. See the [official download guidance](https://www.gesetze-im-internet.de/hinweise.html).

For a configured law, use `POST /api/import-jobs/manual` with its `lawId` and, when necessary, an official XML/XML ZIP `sourceUrl`. The importer records a job, downloads and parses the structured source, hashes normalized text with SHA-256, and only creates a new immutable `ParagraphVersion` when the checksum changes. Paragraphs missing from an import are retained and reported for review; they are never silently deleted.

`GET /api/import-jobs/status` returns recent execution state and scheduler readiness. `GET /api/import-jobs/history?lawId=...` returns the audit history. Scheduling is intentionally prepared but disabled.

## Quality controls

Prettier, ESLint, Husky/lint-staged, and GitHub Actions are configured at the repository root. CI validates formatting, linting, and builds on pushes to `main` and pull requests.
