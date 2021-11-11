FROM node:lts

WORKDIR /app

# Install packages
COPY package.json package-lock.json ./

RUN npm ci

# Build
COPY . .

RUN npm run build

# Run
ENV NODE_ENV production

EXPOSE 3000

CMD npm start
