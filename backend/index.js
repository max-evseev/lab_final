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
    app.use((req, res, next) => {
        if (req.method !== 'POST') {
        return res.status(405).end('server only exist to fulfill post requests');
        }
        else {
        return next();
        }
    });
    app.post('/update_list', (req, res) => {
        if (req.headers.referer !== 'http://localhost:3000/booking') {
        res.status(401).send('server accepts from cinemax booking page');
        }
        else if (typeof req.body !== 'object') {
        res.status(400).send('server accepts only objects in body');
        }
        else if (req.body.email === undefined || req.body.name === undefined || req.body.phone === undefined) {
        res.status(403).send('missing user info');
        }
        else if (!Array.isArray(req.body.list)) {
        res.status(400).send('request has no booking list');
        }
        else {
            fs.readFile('../src/data/show_schedule.json', 'utf-8', (error_read, show_schedule) => {
               if (error_read) {
               res.status(410).send('error reading booking list');
               }
            show_schedule = JSON.parse(show_schedule.trim());
                req.body.list.forEach((entry) => {
                    if (show_schedule.findIndex(item => item.showtime === entry.showtime) === -1) {
                    res.status(404).send('cannot find info for that showtime');
                    }
                    else if (!Array.isArray(entry.seats)) {
                    res.status(400).send('request has no list for booking');
                    }
                    else {
                        entry.seats.forEach((seat) => {
                            if (!Array.isArray(seat)) {
                            res.status(400).send('seat data must be array');
                            }
                            else if (seat.length !== 2) {
                            res.status(400).send('seat data must constist of row and column');
                            }
                            else if (typeof seat[0] !== 'number' || typeof seat[1] !== 'number') {
                            res.status(400).send('seat data must be number');
                            }
                            else if (!Number.isInteger(seat[0]) || !Number.isInteger(seat[0])) {
                            res.status(400).send('seat data must be integer');
                            }
                            else if (seat[0] < 0 || seat[0] > show_schedule[show_schedule.findIndex(item => item.showtime === entry.showtime)].seats.length - 1) {
                            res.status(400).send('seat data must be within rows limit');
                            }
                            else if (seat[1] < 0 || seat[1] > show_schedule[show_schedule.findIndex(item => item.showtime === entry.showtime)].seats[seat[0]].length - 1) {
                            res.status(400).send('seat data must be within column limit of given row');
                            }
                            else if (entry.seats.filter((spot) => String(spot) === String(seat)).length !== 1) {
                            res.status(400).send('detected an attempt to book same seats multiple times');
                            }
                            else if (show_schedule[show_schedule.findIndex(item => item.showtime === entry.showtime)].seats[seat[0]][seat[1]] !== 'free') {
                            res.status(409).send('detected an attempt to book an unavailable seat');
                            }
                            else {
                            show_schedule[show_schedule.findIndex(item => item.showtime === entry.showtime)].seats[seat[0]][seat[1]] = 'sold';
                            }
                        });
                    }
                });
                fs.writeFile('../src/data/show_schedule.json', JSON.stringify(show_schedule), 'utf-8', (error_write) => {
                    if (error_write) {
                    res.status(500).send('error writing booking list');
                    }
                res.status(201).send('booking done successfully');
                });
            });
        }
    });
    app.post('/', (req, res) => {
    res.send(501).send('uknown service');
    });
    app.post('/:whatever', (req, res) => {
    res.send(501).send('uknown service');
    });