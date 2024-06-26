# Ratingus

Ratingus - это web-приложение, предназначенное для управления рейтингом пользователей. Главная особенность сайта — это округлые формы и контрастные, но при этом минималистичные цвета.

## Основной функционал
- Добавление, удаление и редактирование карточек пользователей.
- Фильтрация и сортировка пользователей по рейтингу и отделу.
- Авторизация, для администраторов.

## Технологии
- **Frontend:** React+JS
- **Backend:** Node.js с использованием Express.js
- **База данных:** PostgreSQL

## Установка и запуск

1. Склонируйте репозиторий;
2. Импортируйте базу данных `ratingus.sql`;
3. Перейдите в дерикторию `backend`, установите все зависимости и запустите:
   
   <br>
   
     ```
     cd backend
         
     npm i

     node server.js
      ```
4. Перейдите в дерикторию `ratingus`, установите все зависимости и запустите:

     ```
     cd ratingus
         
     npm i

     npm run dev
      ```


## Примечание

Настройте базу данных PostgreSQL и измените параметры подключения в файле `backend/server.js`:

```javascript
const pool = new Pool({
user: 'ВашеИмяПользователя',
host: 'localhost',
database: 'ratingus',
password: 'ВашПароль',
port: 5432,
});
