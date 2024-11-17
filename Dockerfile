# Dockerfile для приложения

# Базовый образ для разработки
FROM node:22-alpine

WORKDIR /app

# Установка необходимых инструментов
RUN apk add --no-cache python3 build-base

# Установка зависимостей
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Генерация Prisma Client
COPY prisma ./prisma/
RUN npx prisma generate

# Экспонируем порт
EXPOSE 4000

# Команда для запуска
CMD ["npm", "run", "start:dev"]
