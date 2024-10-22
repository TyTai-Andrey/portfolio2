FROM node:14.17.0-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:14.17.0-alpine as runner
WORKDIR /app
COPY . ./
ENV IS_DOCKER=true

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
