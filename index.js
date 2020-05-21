require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;
const session = require('express-session')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tips.db');

app.use(express.urlencoded({extended: true}));
app.use(session({secret: "session", resave: false, saveUninitialized: true}));

const lngRange = 0.4;
const latRange = 0.2;

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.get('/login/*/*', (req, res) => {
    const pathSplit = req.path.split('/');
    const username = pathSplit[2];
    const password = pathSplit[3];
    db.serialize(function () {
        let stmt = db.prepare(`
        SELECT *
        FROM users
        WHERE username=?
        AND password=?`);
        console.log(stmt.get(username, password));
    });
});

app.get('/api/*/*', (req, res) => {
    const pathSplit = req.path.split('/');
    const lat = parseFloat(pathSplit[2]);
    const lng = parseFloat(pathSplit[3]);
    db.serialize(function () {
        db.all(`
        SELECT *
        FROM tips
        WHERE
        lat > ${lat} - ${latRange}
        AND lat <  ${lat} + ${latRange}
        AND lng > ${lng} - ${lngRange}
        AND lng < ${lng} + ${lngRange}
        `, function(err, rows){
            res.json(rows);
        });
    });
});

app.post('/api/addtip/*/*/*/*', (req, res) => {
    const pathSplit = req.path.split('/');
    const lat = parseFloat(pathSplit[3]);
    const lng = parseFloat(pathSplit[4]);
    const tip = parseFloat(pathSplit[5]);
    const subtotal = parseFloat(pathSplit[6]);
    console.log(lat, lng, tip, subtotal)
    db.serialize(function () {
        let stmt = db.prepare("INSERT INTO tips VALUES(?,?,?,?,?)");
        stmt.run("testing", lat, lng, tip, subtotal);
        stmt.finalize();
        res.json({});
    });
});

app.get('/test', (req, res) => {
    db.serialize(function () {
        let result = [];
        db.all(`SELECT * FROM tips`, function(err, rows){
            res.json(rows);
        });
    });
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
