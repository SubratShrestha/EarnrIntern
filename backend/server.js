// packages
const express = require("express");
const path = require('path');
const app = express();
const db = require("./database.js");
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");

// Server port.
const HTTP_PORT = process.env.PORT || 8000;

// Services
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Get all investments.
app.get("/api/investments", (req, res, next) => {
    const sql = "select * from investments";
    let params = [];
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
    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        dob: req.body.dob,
        number: req.body.number,
        amount: req.body.amount,
        type: req.body.type
    }
    let sql = 'INSERT INTO investments (firstname, lastname, email, dob, number, amount, type) VALUES (?,?,?,?,?,?,?)';
    let params = [data.firstname, data.lastname, data.email, data.dob, data.number, data.amount, data.type];
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

// Send email post request
app.post("/api/email", (req, res) => {
    let body = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    };

    // Nodemailer transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "throwaway.earnr@gmail.com",
            pass: "EarnrFullstack"
        }
    });

    // Send email
    transporter.sendMail(body, (err, data) => {
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
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Start server.
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});