import {User} from "./users";

export const rooms: Map<string, Message[]> = new Map();

export type Message = {
    toId: User["id"];
    fromId: User["id"];
    text: string;
    sendAt: Date;
    watched: boolean;
};

export const getRoomIdByUsers = (toId: string, fromId: string) => {
    const minId = Math.min(+toId, +fromId);
    const maxId = Math.max(+toId, +fromId);
    return `${minId}_${maxId}`;
}

export const addMessage = (toId: string, fromId: string, text: string) => {
    const roomId = getRoomIdByUsers(toId, fromId);
    const room = rooms.get(roomId);
    const message: Message = { toId, fromId, text, sendAt: new Date(), watched: false };
    if (!room) {
        rooms.set(roomId, [message]);
    } else {
        room.push(message);
    }
    return message;
};

export const watchMessage = (fromId: string, message: Message) => {
    if (fromId === message.toId) {
        message.watched = true;
        return true;
    }
    return false;
};


export const getLast50Messages = (toId: string, fromId: string) => {
    const roomId = getRoomIdByUsers(toId, fromId);
    const room = rooms.get(roomId);
    if (room) {
        for (let index = room.length - 1; index >= 0 && watchMessage(fromId, room.at(index)); index--) {}
        return room.slice(room.length - 50 - 1);
    }
    return [];
};