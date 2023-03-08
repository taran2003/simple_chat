const express = require('express')
const app = express()
const router = require("./src/routes/router")
const chat = require('./src/services/chatService');
const bodyParser = require("body-parser")
const cors = require("cors");
const port = 3001
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: {
    origin: `*`,
    methods: ["GET", "POST"]
}});

app.use(cors({
    // origin: `*`,
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.static('image'));
app.use(bodyParser.json());
app.use('/api', router);

chat.initialize(io);

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
