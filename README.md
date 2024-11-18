
# Node.js 2024 Q3 Service

## Getting Started

This guide will help you set up and run the project locally.

### Prerequisites

- **Git** - [Download & Install Git](https://git-scm.com/downloads)
- **Node.js** - [Download & Install Node.js](https://nodejs.org/en/download/) (includes npm)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hell-llex/nodejs2024Q3-service.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npm start
   ```

   By default, the server will start on port 4000. You can access the OpenAPI documentation at [http://localhost:4000/doc/](http://localhost:4000/doc/).

### Testing

> **Note**: Make sure the application is running by executing `npm start` before running any tests to ensure they work correctly.

The project includes comprehensive test suites for:

- Users
- Artists
- Albums
- Tracks
- Favorites

To run all tests:

```bash
npm run test
```

#### Available Test Suites

You can run specific test suites individually:

- **Users tests:**

  ```bash
  npm run test -- test/auth/users.e2e.spec.ts
  ```

- **Artists tests:**

  ```bash
  npm run test -- test/auth/artists.e2e.spec.ts
  ```

- **Albums tests:**

  ```bash
  npm run test -- test/auth/albums.e2e.spec.ts
  ```

- **Tracks tests:**

  ```bash
  npm run test -- test/auth/tracks.e2e.spec.ts
  ```

- **Favorites tests:**

  ```bash
  npm run test -- test/auth/favorites.e2e.spec.ts
  ```

### Development Tools

- **Format code:**

  ```bash
  npm run format
  ```

- **Lint code:**

  ```bash
  npm run lint
  ```

## API Documentation

After starting the application, you can explore the full API documentation at [http://localhost:4000/doc/](http://localhost:4000/doc/).

The API includes endpoints for managing:

- User
- Artists
- Albums
- Tracks
- Favorites


# Инструкция по запуску проекта

## 1. Клонируем репозиторий:
```bash
git clone https://github.com/hell-llex/nodejs2024Q3-service.git
```

## 2. Переходим в директорию проекта:
```bash
cd nodejs2024Q3-service
```

## 3. Устанавливаем зависимости:
```bash
npm install
```

## 4. Создаем `.env` файл с настройками из `.env.example`

## 5. Запускаем Docker-контейнеры:
```bash
docker-compose up -d
```

## 6. Создаем и применяем миграции:
```bash
docker exec app npx prisma migrate dev
```

<!-- ## 7. Генерируем Prisma-клиент:
```bash
npx prisma generate
``` -->

---

## Готово! 
Приложение доступно по адресу: [http://localhost:4000/doc](http://localhost:4000/doc)

## Проверка уязвимостей:
```bash
docker scout cves nodejs2024q3-service-app
```