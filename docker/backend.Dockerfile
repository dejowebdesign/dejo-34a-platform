FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/legal-import/package.json packages/legal-import/package.json

RUN npm ci

COPY . .

RUN npm run build -w @dejo/legal-import
RUN npm run prisma:generate -w @dejo/backend
RUN npm run build -w @dejo/backend

FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app .

EXPOSE 3000

CMD ["node", "apps/backend/dist/main.js"]