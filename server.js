'use strict';

const express = require('express');
const socket = require('socket.io');
const PORT = process.env.PORT || 3000;

const server = express()
    .use((req, res) => res.sendFile('/index.html', { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socket(server, {
    cors: {
        origins: "*:*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('offer', payload => {
        io.emit('message', { payload, type: 'offer' });
        console.log({ offer: payload });
    });

    socket.on('answer', payload => {
        io.emit('message', { payload, type: 'answer' });
        console.log({ answer: payload });
    });
});