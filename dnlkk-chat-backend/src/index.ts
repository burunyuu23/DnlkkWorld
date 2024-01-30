import express from "express";
import http from "http";
import cors from "cors";
import {Server, Socket} from 'socket.io';
import {addMessage, getLast50MessagesFrom, getRoomIdByUsers, Message} from "./data/messages";
import router from "./api/route";
import {User} from "./data/users";
import {getLast50RoomsByUser} from "./data/rooms";

const app = express();
app.use(cors({
    origin: "*",
}));
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const allClients: Socket[] = [];

io.on('connection', (socket) => {
    socket.on('getDialogs', ({id}: Pick<User, 'id'>) => {
        socket.emit('dialogs', {
            rooms: getLast50RoomsByUser(id),
        })
    });

    socket.on('join', ({toId, fromId}: Pick<Message, 'toId' | 'fromId'>) => {
        if (!allClients.includes(socket)) {
            allClients.push(socket);
            console.log(allClients.map(({id, data}) => ({id, data})));
        }
        const room = getRoomIdByUsers(toId, fromId);

        socket.join(room);

        socket.emit('messages', {
            messages: getLast50MessagesFrom(toId, fromId),
        });
    })

    socket.on('sendMessage', ({fromId, text, toId}: Omit<Message, 'sendAt'>) => {
        const message = addMessage(toId, fromId, text);
        // console.log(message);
        // console.log(getLast50Messages(toId, fromId));
        console.log(allClients.map(({id, data}) => ({id, data})));
        io.to(getRoomIdByUsers(toId, fromId)).emit('message', {
            message,
            roomId: getRoomIdByUsers(toId, fromId)
        })
    })

    socket.on('leave', ({toId, fromId}: Pick<Message, 'toId' | 'fromId'>) => {
        const room = getRoomIdByUsers(toId, fromId);

        socket.leave(room);
    });

    socket.on('disconnect', () => {
        const i = allClients.indexOf(socket);
        allClients.splice(i, 1);

        console.log(`User disconnect!`);
        console.log(allClients.map(({id, data}) => ({id, data})));
    })
});

server.listen(5000, () => {
    console.log("Server running");
});
