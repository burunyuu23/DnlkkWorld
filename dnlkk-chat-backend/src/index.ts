import express from "express";
import http from "http";
import cors from "cors";
import {Server} from 'socket.io';
import {addMessage, messages} from "./data/messages";

const app = express();
app.use(cors({
    origin: "*",
}))

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);

        socket.emit('messages', {
            data: {
                messages: messages.slice(messages.length - 50),
            }
        });
    })

    socket.on('sendMessage', ({ message, room }) => {
        addMessage(message);
        io.to(room).emit('message', {
            data: {
                message
            }
        })
    })

    io.on('disconnect', () => {
        console.log("Disconnect");
    })
});

server.listen(5000, () => {
    console.log("Server running");
});
