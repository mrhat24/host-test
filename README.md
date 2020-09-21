# Blog service

## Ссылки

`api` - http://localhost:3000

`swagger` - http://localhost:3000/swagger

## Запуск

1. `npm i`
3. `npm run docker:dev:up`
3. `npm run swagger:gen`
3. `npm run start`

## Запуск в контейнере

1. `docker-compose up`

### NPM команды

- `npm run start` - запуск в режиме разработки;
- `npm run build` - запуск сборки проекта;
- `npm run test` - запуск тестов;
- `npm run swagger:gen` - генерация swagger документации;
- `npm start` - запуск Metro сервера для нативный приложений;
- `npm run start-clean` - запуск Metro сервера с очисткой кэшей;
- `npm run docker:dev:up` - запуск окружения для разработки;
- `npm run docker:dev:down` - остановка окружения для разработки;
- `npm run docker:prod:up` - запуск проекта в рабочем режиме;
- `npm run docker:prod:down` - остановка проекта в рабочем режиме;
