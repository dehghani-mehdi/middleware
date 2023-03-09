const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
    ws.on('message', payload => {
        console.log(`Received message => ${payload}`)
        ws.send(payload.toString());
    });
});