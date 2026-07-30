FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/backend/package.json apps/backend/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/legal-import/package.json packages/legal-import/package.json
RUN npm ci
COPY tsconfig.base.json ./
COPY apps/frontend apps/frontend
RUN npm run build -w @dejo/frontend

FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/frontend/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
