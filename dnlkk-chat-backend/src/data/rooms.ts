import {getUsersByIds, User} from "./users";
import {Message} from "./messages";

export type Room = {
    id: string;
    name?: string;
    participants: User['id'][];
    messages: Message[];
}
export type RoomDto = {
    id: string;
    name?: string;
    participants: User[];
    lastMessage: Message;
}

const rooms: Map<Room['id'], Room> = new Map([
    ['1_2', { id: '1_2', participants: ['1', '2'], messages: [] }],
    ['1_1', { id: '1_1', participants: ['1'], messages: [] }]
]);

export const getLast50RoomsByUser = (userId: User['id']) => {
    const userRooms: RoomDto[] = [];
    for (const roomEntry of rooms) {
        if (userRooms.length > 50) {
            break;
        }
        const room = roomEntry[1];
        if (room.participants.includes(userId)) {
            userRooms.push({
                ...room,
                participants: getUsersByIds(room.participants),
                lastMessage: room.messages.at(-1)
            });
        }
    }
    return userRooms;
};

export const getRoomById = (id: Room['id']) => rooms.get(id);

export const addRoom = (id: Room['id'], room: Room) => rooms.set(id, room);
