# Earnr exercise backend

This is the backend part for the take home challenge for the Earnr fullstack developer intern position.

## Architecture
The main server is written in expressJS which is a simple framework for nodeJS. Documentation found [here](https://expressjs.com/en/4x/api.html).

The database is written in sqlite3 which is a powerful database tool. Documentation found [here](https://www.npmjs.com/package/sqlite3/v/5.0.0).

## Run
### Server
The server can be run with just:
```
yarn start
```
or if using npm
```
npm run start
```

### Database
The database doesn't have to run separately, ``server.js`` should do that automatically when the server is run by above.

But if the database needs to be editted manually, its in ``db.sqlite``. To view/edit it:

Install sqlite3 with:
```
yarn add sqlite3
```
or
```
npm install sqlite3
```

Edit database with:
```
sqlite3 db.sqlite
```

The database can now be editted with sql queries right from the command line.
