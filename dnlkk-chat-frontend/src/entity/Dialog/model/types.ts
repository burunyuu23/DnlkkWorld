import {User} from "@/entity/User/model/type";
import {Message} from "@/entity/Message";

export type Room = {
    id: string;
    name?: string;
    participants: User[];
    lastMessage: Message;
    notWatchedMessageCount: number;
};