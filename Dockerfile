

# MARK: frontend
FROM node:22-alpine AS frontend

WORKDIR /app

# BUILD
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend .
RUN npm run build


# MARK: backend
FROM node:22-alpine AS backend

ARG VERSION

WORKDIR /app

# BUILD
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend .
RUN npm run build

# CLEAN
ENV NODE_ENV=production
RUN npm prune

# COPY FRONTEND
COPY --from=frontend /app/www/browser /app/public

# RUN
ENV PORT=3000
ENV HOST=0.0.0.0
ENV VERSION=${VERSION}

EXPOSE 3000

CMD ["npm","start"]