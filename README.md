[![Actions Status](https://github.com/dsyncerek/steam-inventory-manager/workflows/CI/badge.svg)](https://github.com/dsyncerek/steam-inventory-manager/actions)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dsyncerek/steam-inventory-manager)](https://dependabot.com)

# Steam Inventory Manager

> A web application which manages all your Steam Inventories in one place.

## Demo (WIP)

Live: [https://steam-inventory-manager.herokuapp.com/](https://steam-inventory-manager.herokuapp.com/).

**NOTE**: Application will load after a short delay. Details [here](https://devcenter.heroku.com/articles/free-dyno-hours).

## Technologies

### Front-End

- [Angular](https://github.com/angular/angular) with Router, Reactive Forms, [Material](https://github.com/angular/components) and [Flex Layout](https://github.com/angular/flex-layout/)
- [NgRx](https://github.com/ngrx/platform) with Entity and Effects

### Back-End

- [Nest](https://github.com/nestjs/nest)
- [Express](https://github.com/expressjs/express)
- [TypeORM](https://github.com/typeorm/typeorm)
- [Passport](https://github.com/jaredhanson/passport) with [JWT](https://github.com/mikenicholson/passport-jwt) and [OpenID](https://github.com/jaredhanson/passport-openid) strategies
- [Swagger](https://github.com/swagger-api/swagger-ui)

## Installation

```
git clone https://github.com/dsyncerek/steam-inventory-manager.git
cd steam-inventory-manager
npm install
```

## Configuration

Rename `server/src/.env.example` to `server/src/.env` and edit with your needs.

File `server/src/config/roles.config.ts` contains information about roles permissons.

## Usage

`npm run start:dev` runs application in development mode.

`npm run start:prod` runs application in production mode.

`npm run build` builds the project.

`npm run lint` lints the project using [eslint](https://github.com/eslint/eslint) and [stylelint](https://github.com/stylelint/stylelint).

`npm run format` formats the project using [prettier](https://github.com/prettier/prettier).

## [License](LICENSE)
