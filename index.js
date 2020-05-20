require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;

const lngRange = 0.4;
const latRange = 0.2;

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.get('/api/*/*', (req, res) => {
});

app.post('/api/addtip/*/*/*/*', (req, res) => {
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
