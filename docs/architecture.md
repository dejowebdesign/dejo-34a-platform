# Architecture

The repository uses npm workspaces to separate deployable applications from framework-neutral shared contracts.

- `apps/frontend`: Angular single-page application.
- `apps/backend`: NestJS REST API, organised by domain modules.
- `packages/shared`: contracts safe to use in both applications.
- `database/prisma`: PostgreSQL schema and migrations.

The backend exposes versionable REST endpoints under `/api`, publishes OpenAPI at `/api/docs`, validates request payloads globally, and isolates database access through `PrismaService`.

## Law Engine

The Law Engine is split into four cohesive modules:

- `TopicModule` owns topics and sub-topics.
- `LawModule` owns legal source metadata.
- `ParagraphModule` owns paragraphs and their immutable-version records.
- `ImportModule` owns import-job audit records only; no importer is implemented yet.

Relations are expressed in Prisma and enforced by PostgreSQL foreign keys: a topic has sub-topics; a sub-topic can classify paragraphs; a law owns paragraphs and import jobs; and a paragraph owns its version history. Cascading deletion is used for law-to-paragraph/import-job and topic-to-sub-topic ownership, while a deleted sub-topic sets the paragraph classification to `NULL`.

Each module keeps controller, service, and DTO classes together. Controllers provide OpenAPI metadata and validated inputs; services contain persistence operations; no legal-text interpretation or import business logic is present at this stage.

## Legal Import Engine

`packages/legal-import` is a framework-neutral import package used by the NestJS `ImportModule`. It contains:

- `OfficialXmlSourceService` for the official Gesetze-im-Internet XML or XML ZIP download path.
- `ParserService` for structured XML parsing; HTML is not part of the import path.
- `ChangeDetectionService` for normalized SHA-256 checksums.
- `VersionService` for unique immutable import-version labels.
- `ImportService` for source loading and parser orchestration.
- `SchedulerService` as an explicitly disabled extension point.

The backend creates an `ImportJob` before running a manual import. It records lifecycle times, duration, result counters, warnings, and errors. Within a database transaction, new paragraphs receive a first version; changed checksums create a new `ParagraphVersion` and update the paragraph’s current projection. Unchanged paragraphs are left untouched. Source-absent paragraphs are counted but retained, protecting historical records until a future review workflow is introduced.

## Container operation

`docker-compose.yml` is a Compose Stack definition intended for local Docker Compose and Portainer's Docker Compose Stack mode on Umbrel OS. It keeps PostgreSQL private to the internal Compose network; only the frontend exposes a host port. Nginx in the frontend container proxies `/api` traffic to the backend service.

Prisma migrations are executed by the backend container before the API starts. The Prisma CLI is therefore a production dependency, while schema generation remains a build-time step.
