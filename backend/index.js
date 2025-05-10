const express = require('express');
const fs = require('fs');
const bp = require('body-parser');
const app = express();
app.use(bp.json());
    try {
    app.listen(808);
    }
    catch {
    console.log("something went wrong");
    }
    app.post('/update_list', (req, res) => {
    let show_schedule = JSON.parse(fs.readFileSync('../src/data/show_schedule.json').toString().trim());
        req.body.forEach((seat) => {
        show_schedule[show_schedule.findIndex(item => item.showtime === req.headers.referer.replace('http://localhost:3000/booking/', ''))].seats[seat[0]][seat[1]] = 'sold';
        });
    fs.writeFileSync('../src/data/show_schedule.json', JSON.stringify(show_schedule));
    res.status(201);
    });
    app.get('/', (req, res) => {
    res.status(405).redirect('http://localhost:3000/');
    });
    app.get('/:whatever', (req, res) => {
    res.status(405).redirect('http://localhost:3000/');
    });