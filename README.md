# Places

> Save the places you love most.
> Discover places your friends love.

## Team

  - __Product Owner__: Adam
  - __Scrum Master__: Sepehr
  - __Development Team Members__: Andrew, Jordan, Sepehr, Adam

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Postgresql 9.1.x
- React, Redux
- React Native

## Development

### Setting up Postgres
- Install postgres if you don’t have it:
  - [here](https://launchschool.com/blog/how-to-install-postgresql-on-a-mac)
- Before you can start postgres you may need to initialize a data directory.
  - Try to start postgres with: `brew services start postgresql`
- If it doesn't start, try these 2 steps:
  - To initialize the data dir run (only needs to be done once):
  - `initdb /path/to/some/dir/pgsql-data/`
  - Then to start the db run:
   - `pg_ctl -D /path/to/some/dir/pgsql-data/ -l logfile start`

#### Create the User and Database

- To interact with the postgres server run:
  - `psql postgres`
- Create user root with login role attribute
  - `CREATE USER root;`
- Set the password for the root user
  - `\password root;`
- When prompted for pass, enter ‘password’.
- Create the database with root as owner
  - `CREATE DATABASE places OWNER root;`
- Change db to places
  - `\q` to quit 
  - `psql places` 
  
##### Useful Postgres Commands:
```
\list or \l: list all databases
\dt: list all tables in the current database
\connect database_name
\du shows all the users
```

### Installing Dependencies

From within the root directory:

```sh
npm install
npm start
npm run seed
```

### Roadmap

View the project roadmap [here](https://waffle.io/places-app/web)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
