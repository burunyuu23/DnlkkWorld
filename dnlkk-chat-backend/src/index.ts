import express from "express";
import http from "http";
import cors from "cors";
import {Server, Socket} from 'socket.io';
import {addMessage, getLast50MessagesFrom, getRoomIdByUsers, Message, watchedMessage} from "./data/messages";
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
            for (const entry of allClients.values()) { console.log({ data: entry.data, id: entry.id }); }
        }
    })

    socket.on('join', ({toId, fromId}: Pick<Message, 'toId' | 'fromId'>) => {
        const room = getRoomIdByUsers(toId, fromId);

        socket.join(room);

        socket.emit('messages', {
            messages: getLast50MessagesFrom(toId, fromId),
        });
    })

    socket.on('watched', ({toId, fromId, messageId}: Pick<Message, 'toId' | 'fromId'> & { messageId: Message['id'] }) => {
        console.log(toId, fromId, messageId);
        const roomId = watchedMessage(toId, fromId, messageId);
        const room = roomToDto(getRoomById(roomId));
        socket.emit('dialog', {
            room
        })
    });

    socket.on('sendMessage', ({fromId, text, toId}: Omit<Message, 'sendAt'>) => {
        const message = addMessage(toId, fromId, text);
        for (const entry of allClients.values()) { console.log({ data: entry.data, id: entry.id }); }

        const resp = {
            message
        };

        io.to(getRoomIdByUsers(toId, fromId)).emit('message', resp)

        setTimeout(function () {
            const client = allClients.get(toId);

            if (!message.watched) {
                if (!client) {
                    const notification = notifications.get(toId);
                    if (notification) {
                        notification.push(message);
                    } else {
                        notifications.set(toId, [message]);
                    }
                } else {
                    client.emit('message', { message });
                }
            }
        }, 1000);


    })

    socket.on('leave', ({toId, fromId}: Pick<Message, 'toId' | 'fromId'>) => {
        const room = getRoomIdByUsers(toId, fromId);

        socket.leave(room);
    });

    socket.on('disconnect', () => {
        allClients.delete(socket.data.userId);

        console.log(`User ${socket.data.userId} disconnect!`);
        for (const entry of allClients.values()) { console.log({ data: entry.data, id: entry.id }); }
    })
});

server.listen(5000, () => {
    console.log("Server running");
});
