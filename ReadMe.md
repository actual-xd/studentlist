# Student Management System

Система управления студентами с аутентификацией на основе JWT токенов. Проект состоит из Spring Boot бэкенда и React фронтенда.

## Содержание

- [Обзор проекта](#обзор-проекта)
- [Технологии](#технологии)
- [Настройка и запуск бэкенда](#настройка-и-запуск-бэкенда)
- [Настройка и запуск фронтенда](#настройка-и-запуск-фронтенда)

## Обзор проекта

Система управления студентами позволяет:
- Регистрировать пользователей и аутентифицировать их с помощью JWT токенов
- Просматривать список студентов
- Добавлять новых студентов
- Редактировать информацию о студентах
- Удалять студентов

## Технологии

### Бэкенд
- Java 17
- Spring Boot 3.x
- Spring Security
- JWT (JSON Web Tokens)
- PostgreSQL
- Hibernate/JPA

### Фронтенд
- React
- React Router
- Axios
- Bootstrap

## Настройка и запуск бэкенда

### Предварительные требования
- JDK 17 или выше
- Maven
- PostgreSQL

### Настройка базы данных

1. Создайте базу данных в PostgreSQL:

```sql
CREATE DATABASE student_management;
```

2. Настройте подключение к базе данных
```
# Настройки базы данных
spring.datasource.url=jdbc:postgresql://localhost:5432/student_management
spring.datasource.username=your_username
spring.datasource.password=your_password

# Настройки Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT настройки
jwt.secret=your_very_secure_and_long_secret_key_here
```
## Настройка и запуск фронтенда

3. Настройте фронтенд
```
# Перейтиде в директорию фронтенда

cd ../student-vite-frontend

# Установите зависимости 
npm i

# Запустите проект 
npm run dev
```