<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

## Description

[Nest](https://github.com/nestjs/nest) playground API

#### Roadmap
- [x] Sending emails with SMP
- [x] Integration with Postgres database
- [x] Integration with Swagger (documentation)
- [x] Authorization with JWT
- [x] Authorization with refresh JWT
- [x] Authorization depending on user permissions (roles) 
- [ ] User account verification via email link

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
## Documentation

Under `\docs` path is documentation created with Swagger

## Environment variables 

```dotenv
PORT=8000
NODE_ENV=development
JWT_SECRET=
JWT_EXPIRE_TIME=180s
JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRE_TIME=8h
SMP_SERVER=
MAIL_USER=
MAIL_PASS=
MAIL_ADDRESS=
DATABASE_URL=postgres://postgres@localhost:5432/exampledb
```