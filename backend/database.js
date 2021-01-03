var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE investments (
            firstname TEXT,
            lastname TEXT,
            email text UNIQUE,
            dob TEXT,
            number INTEGER,
            amount REAL,
            type TEXT,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.log('table was already there');
                } else {
                    // Table just created, creating some rows
                    console.log('just created the table');
                }
            });
    }
});


module.exports = db;