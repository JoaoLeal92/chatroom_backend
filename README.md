# Chat room application backend

## Setup and run demo

### Clone repository

Clone this reposiory with the following command

```
$ git clone https://github.com/JoaoLeal92/chatroom_backend.git
```

### Install dependencies

Run the command below to install project dependencies

```
$ yarn
```

### Adjust auth secret key (optional)

Change the value of "secret" in the file src/config/auth if necessary. It is not a requirement if running for testing

### Run database migration

Run the following commang to generate local database file

```
$ yarn typeorm migration:run
```

### Run server

Start the server on localhost

```
$ yarn dev:server
```

## Application routes

### Create user

Url:

```
POST http://localhost:3333/users
```

Required parameters:

```json
{
  "email": "email@email.com",
  "name": "User name",
  "dateOfBirth": "User birth date DD/MM/YYYY",
  "password": "user password"
}
```

Expected response (example):


```json
{
  "email": "email@email.com",
  "name": "User name",
  "dateOfBirth": "User birth date DD/MM/YYYY",
  "hashedPassword": "Password hash"
}
```

### List registered users

Url:

```
GET http://localhost:3333/users
```

Expected response (example):


```json
[
  {
    "name": "User1",
    "email": "user1@email.com",
    "dateOfBirth": "Birth date user 1"
  },
  {
    "name": "User2",
    "email": "user2@email.com",
    "dateOfBirth": "Birth date user 2"
  },
  {
    "name": "User3",
    "email": "user3@email.com",
    "dateOfBirth": "Birth date user 3"
  },
]
```

### User authentication

Url:

```
POST http://localhost:3333/sessions
```

Required parameters:

```json
{
	"email": "user@email.com",
	"password": "userPassword"
}
```

Expected response (example):


```json
{
  "user": {
    "email": "user@email.com",
    "name": "UserName",
    "dateOfBirth": "User birth date"
  },
  "token": "Bearer Token"
}
```

### Chat rooms

Chat room communication is done through sockets, and should be viewed through the frontend implementation.

For frontend code, check here https://github.com/JoaoLeal92/chatroom_frontend

## Current pendencies

This project is still in development, and has the following pendencies yet to be implemented/corrected:

 - MongoDB support to store data related to chatrooms (currently managed by src/repositories/RoomsRepository);
 - Form validation for user signin/signup;
 - Better feedback for errors on the signin/signup screens;
 - Unit testing for every service
