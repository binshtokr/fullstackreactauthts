# Проект React с авторизацией и таймером сессии

Это веб-приложение, использующее React для отображения информации о пользователе, с функцией авторизации и таймером, который завершает сессию пользователя через 60 секунд бездействия. После завершения сессии пользователь будет перенаправлен на страницу авторизации.

## Описание

- Веб-приложение состоит из двух частей:
  - **Frontend** на React с TypeScript.
  - **Backend** на Node.js и Express для обработки запросов, связанных с пользователями (регистрация, авторизация и т.д.).
- В проекте используется база данных для хранения информации о пользователях SQLite DB
- Если пользователь не выполняет никаких действий в течение 60 секунд, его сессия будет завершена автоматически, и ему нужно будет войти заново.
- В проекте используются React, TypeScript и библиотека React-Bootstrap для стилизации.

## Требования

### Frontend

- [Node.js](https://nodejs.org/) — для запуска сервера и сборки проекта.
- [React](https://reactjs.org/) — для создания пользовательского интерфейса.
- [Axios](https://axios-http.com/) — для отправки HTTP-запросов.
- [React Router](https://reactrouter.com/) — для навигации между страницами.
- [React-Bootstrap](https://react-bootstrap.github.io/) — для стилизации компонентов.

### Backend

- [Node.js](https://nodejs.org/) — для работы с сервером.
- [Express](https://expressjs.com/) — для создания серверных маршрутов.
- [SQLite3](https://www.sqlite.org/) — для работы с базой данных.

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/binshtokr/fullstackreactauthts.git

### Запуск

npm run dev

### Описание функциональности

1. Backend
Сервер реализует два основных маршрута для работы с пользователями:

- POST /api/persons — для регистрации нового пользователя. При регистрации выполняется сохранение данных пользователя в базе данных SQLite.
  
- POST /sigin — для авторизации пользователя. Если email и пароль совпадают с данными в базе, возвращается информация о пользователе. 
  
2. Авторизация
   
- Пользователи могут зарегистрироваться, отправив свои данные (email, пароль и имя) на сервер.
- После успешной регистрации пользователи могут войти, введя свои учетные данные (email и пароль)
- POST /sigin — для авторизации пользователя. Если email и пароль совпадают с данными в базе, возвращается информация о пользователе. 
  
3. Таймер сессии

- Если пользователь не выполняет никаких действий (например, не двигает мышью и не нажимает клавиши) в течение 60 секунд, его сессия будет завершена.
- После завершения сессии пользователь будет перенаправлен на страницу авторизации, где ему нужно будет снова войти в систему

1. Пользовательский интерфейс

- На главной странице отображается приветствие для пользователя.
- Показывается таймер с отсчетом времени, которое осталось до завершения сессии.
- Пользователь может выйти из системы, нажав кнопку "Logout".
  

## Структура проекта

1. Backend
- controllers/personController.ts — обработка запросов на регистрацию и авторизацию пользователей
- models/person.ts — схема данных для пользователей (использует SQLite).
- routes/personRoutes.ts — маршруты для регистрации и входа пользователей.

## Лицензия

Этот проект уважаемая Комманда с НюрНикеля является открытм и распространяется по лицензии MIT.

Удачи!