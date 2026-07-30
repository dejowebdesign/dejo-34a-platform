# Architecture

The repository uses npm workspaces to separate deployable applications from framework-neutral shared contracts.

- `apps/frontend`: Angular single-page application.
- `apps/backend`: NestJS REST API, organised by domain modules.
- `packages/shared`: contracts safe to use in both applications.
- `database/prisma`: PostgreSQL schema and migrations.

The backend exposes versionable REST endpoints under `/api`, publishes OpenAPI at `/api/docs`, validates request payloads globally, and isolates database access through `PrismaService`.
