# MARK: backend
FROM node:22-alpine as backend

WORKDIR /app

# BUILD
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# CLEAN
ENV NODE_ENV=production
RUN npm prune

# RUN
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm","start"]

# MARK: frontend
FROM node:22-alpine as frontend

WORKDIR /app

# BUILD
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# CLEAN
ENV NODE_ENV=production
RUN npm prune

# RUN
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm","start"]