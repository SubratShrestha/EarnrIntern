## Earnr fullstack developer intern challenge

This is code for the technical exercise to be completed for the fullstack developer intern position at Earnr. 

The repo consists of two sperate directories for the frontend and backend.


## Exercise

The exercise is to create a web application in which a user can make a selected type of investment. A form should take the user's details like the name, email, type, date of birth, and the amount.

This info should be stored in a database.


## Architecture

### Frontend

The frontend for the application was written in ReactJS and the UI components are from Rsuite.

Documentation:
* [React](https://reactjs.org/docs/getting-started.html)
* [Rsuite](https://rsuitejs.com/guide/introduction/)

### Backend

The backend is a server written in express.js which is a simple nodeJS framework, as suggested. 

The database was written with sqlite3, a basic but powerful database tool.

The email functionality is written with Nodemailer, which is a module for Node.JS that allows sending of emails.

Documentation:
* [Node.JS](https://nodejs.org/en/docs/)
* [SQLite3](https://www.sqlite.org/docs.html)
* [Nodemailer](https://nodemailer.com/about/)


## Run

To run the code, the backend and frontend will need to be run separately.

### Backend

From the root directory, run the backend server with:

```
cd backend/
```

Install all dependencies
```
yarn install
```

Start backend server
```
yarn start
```


### Frontend

From the root directory, run the frontend with:

```
cd frontend/
```

Install all dependencies
```
yarn install
```

Start frontend
```
yarn start
```
