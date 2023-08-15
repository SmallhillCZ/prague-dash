FROM node:18-alpine as builder

WORKDIR /app

# Install packages
COPY package.json package-lock.json ./

RUN npm ci

# Build
COPY . .

RUN npm run build

# remove development dependencies
RUN npm prune --production


# Run
ENV NODE_ENV production

EXPOSE 3000

CMD npm start
