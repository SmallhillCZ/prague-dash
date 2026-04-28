

# MARK: frontend
FROM node:22-alpine AS frontend

WORKDIR /app

# BUILD
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend .
RUN npm run build

# CLEAN
ENV NODE_ENV=production
RUN npm prune

# RUN
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm","start"]

# MARK: backend
FROM node:22-alpine AS backend

WORKDIR /app

# BUILD
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY backend .
RUN npm run build

# CLEAN
ENV NODE_ENV=production
RUN npm prune

# COPY FRONTEND
COPY --from=frontend /app/dist /app/public

# RUN
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm","start"]