FROM --platform=linux/amd64 node:18.14-alpine as builder
# FROM node:22.1-alpine as builder

WORKDIR /app

RUN npm set registry https://registry.npmjs.org/ && \
  npm config set fetch-retry-mintimeout 20000 && \
  npm config set fetch-retry-maxtimeout 120000

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:18.14-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc

COPY package*.json ./

ENV PORT=4000
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]