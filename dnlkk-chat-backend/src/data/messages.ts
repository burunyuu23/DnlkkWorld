import {User} from "./users";
import {addRoom, getRoomById, Room} from "./rooms";

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

export const addMessage = (toId: string, fromId: string, text: string, isGroup?: boolean) => {
    return isGroup ? addMessageToGroup(toId, fromId, text) : addMessageToUser(toId, fromId, text);
};

export const addMessageToUser = (toId: string, fromId: string, text: string) => {
    const roomId = getRoomIdByUsers(toId, fromId);
    const room = getRoomById(roomId);
    const message: Message = { toId, fromId, text, sendAt: new Date(), watched: false };
    if (!room) {
        addRoom(roomId, {
            id: roomId,
            participants: [fromId, toId],
            messages: [message]
        });
    } else {
        room.messages.push(message);
    }
    return message;
};

export const addMessageToGroup = (toId: string, fromId: string, text: string) => {
    const room = getRoomById(toId);

    const message: Message = { toId, fromId, text, sendAt: new Date(), watched: false };

    room.messages.push(message);
    return message;
};

export const watchMessage = (fromId: string, message: Message) => {
    if (fromId === message.toId) {
        message.watched = true;
        return true;
    }
    return false;
};

export const getLast50MessagesFrom = (toId: string, fromId: string, isGroup?: boolean) => {
    return isGroup ? getLast50MessagesFromGroup(toId, fromId) : getLast50MessagesFromUser(toId, fromId);
};

const getLast50MessagesFromGroup = (toId: string, fromId: string) => {
    const room = getRoomById(toId);
    if (room) {
        return getLast50Messages(room, fromId);
    }
    return [];
};

const getLast50MessagesFromUser = (toId: string, fromId: string) => {
    const roomId = getRoomIdByUsers(toId, fromId);
    const room = getRoomById(roomId);
    if (room) {
        return getLast50Messages(room, fromId);
    }
    return [];
};

const getLast50Messages = (room: Room, fromId: string) => {
    const messages = room.messages;
    for (let index = messages.length - 1; index >= 0 && watchMessage(fromId, messages.at(index)); index--) {}
    return messages.slice(messages.length - 50 - 1);
};