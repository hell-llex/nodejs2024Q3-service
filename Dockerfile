FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 build-base

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 build-base

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/doc ./doc 
COPY package*.json ./

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
