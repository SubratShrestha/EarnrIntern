## Earnr fullstack developer intern challenge

This is code for the technical exercise to be completed for the fullstack developer intern position at Earnr. 

The repo consists of two sperate directories for the frontend and backend.


## Exercise

The exercise is to create a web application in which a user can make a selected type of investment. A form should take the user's details like the name, email, type, date of birth, and the amount.

This info should be stored in a database.


## Architecture

### Frontend

The frontend for the application was written in ReactJS with some other dependencies mentioned in the frontend directory. 

### Backend

The backend is a simple server written in express.js which is a simple nodeJS framework, as suggested. 

The database was written in sqlite3, a very simple but powerful database tool.


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
