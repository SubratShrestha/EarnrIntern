var express = require("express");
var app = express();
var db = require("./database.js");

// idk
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port.
var HTTP_PORT = 8000;

// Start server.
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

// Root endpoint.
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" });
});

// Get all investments.
app.get("/api/investments", (req, res, next) => {
    var sql = "select * from investments";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

// Create new investment.
app.post("/api/invest/new", (req, res) => {
    var errors = [];
    if (!req.body.email) {
        errors.push("No email specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        dob: req.body.dob,
        number: req.body.number,
        amount: req.body.amount,
        prem: req.body.prem,
        sel: req.body.sel,
    }
    var sql = 'INSERT INTO investments (firstname, lastname, email, dob, number, amount, prem, sel) VALUES (?,?,?,?,?,?,?,?)';
    var params = [data.firstname, data.lastname, data.email, data.dob, data.number, data.amount, data.prem, data.sel];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})


// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});