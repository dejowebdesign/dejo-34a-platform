# Architecture

The repository uses npm workspaces to separate deployable applications from framework-neutral shared contracts.

- `apps/frontend`: Angular single-page application.
- `apps/backend`: NestJS REST API, organised by domain modules.
- `packages/shared`: contracts safe to use in both applications.
- `database/prisma`: PostgreSQL schema and migrations.

The backend exposes versionable REST endpoints under `/api`, publishes OpenAPI at `/api/docs`, validates request payloads globally, and isolates database access through `PrismaService`.

## Container operation

`docker-compose.yml` is a Compose Stack definition intended for local Docker Compose and Portainer's Docker Compose Stack mode on Umbrel OS. It keeps PostgreSQL private to the internal Compose network; only the frontend exposes a host port. Nginx in the frontend container proxies `/api` traffic to the backend service.

Prisma migrations are executed by the backend container before the API starts. The Prisma CLI is therefore a production dependency, while schema generation remains a build-time step.
