import express from "express";
import http from "http";
import cors from "cors";
import {Server, Socket} from 'socket.io';
import {addMessage, getRoomIdByUsers, Message, watchAllMessages} from "./data/messages";
import router from "./api/route";
import {User} from "./data/users";
import {getRoomById, roomToDto} from "./data/rooms";

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

const allClients = new Map<string, Socket>();
const notifications= new Map<User['id'], Message[]>();

io.on('connection', (socket) => {
    socket.on('login', (fromId: Message['fromId']) => {
        console.log(`User id=${fromId} logged in!`);
        if (!allClients.has(fromId)) {
            socket.data = { userId: fromId };
            allClients.set(fromId, socket);
            console.log(Array.from(allClients.values()).map((client) => ({ data: client.data, id: client.id })));
        }
    })

    socket.on('join', ({toId, fromId}: Pick<Message, 'toId' | 'fromId'>) => {
        const roomId = getRoomIdByUsers(toId, fromId);
        const room = getRoomById(roomId);
        const messages = watchAllMessages(room, fromId);
        socket.join(roomId);
        io.to(roomId).emit('joinDialog', { messages });
    })

    socket.on('sendMessage', ({fromId, text, toId}: Omit<Message, 'sendAt'>) => {
        const message = addMessage(toId, fromId, text);
        console.log(Array.from(allClients.values()).map((client) => ({ data: client.data, id: client.id })));

        const roomId = getRoomIdByUsers(toId, fromId);

        const client = allClients.get(toId);
        if (client && client.rooms.has(roomId)) {
            message.watched = true;
        }

        const room = roomToDto(getRoomById(getRoomIdByUsers(toId, fromId)));
        const resp = {
            message,
            notWatchedMessageCount: room.notWatchedMessageCount
        };
        io.to(roomId).emit('message', resp);

        setTimeout(function () {
            if (!message.watched) {
                if (!client) {
                    // const notification = notifications.get(toId);
                    // if (notification) {
                    //     notification.push(message);
                    // } else {
                    //     notifications.set(toId, [message]);
                    // }
                } else {
                    client.emit('message', resp);
                }
            }
        }, 1000);


    })

    socket.on('leave', ({toId, fromId}: Pick<Message, 'toId' | 'fromId'>) => {
        const roomId = getRoomIdByUsers(toId, fromId);
        console.log(`User ${fromId} leave room ${roomId}`)

        socket.leave(roomId);
    });

    socket.on('disconnect', () => {
        allClients.delete(socket.data.userId);

        console.log(`User ${socket.data.userId} disconnect!`);
        console.log(Array.from(allClients.values()).map((client) => ({ data: client.data, id: client.id })));
    })
});

server.listen(5000, () => {
    console.log("Server running");
});
