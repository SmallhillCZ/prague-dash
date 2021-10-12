FROM node:lts as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine as runner

WORKDIR /app

COPY --from=builder /app /app

CMD npm start
