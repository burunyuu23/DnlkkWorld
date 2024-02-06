export type Message = {
    id: number;
    toId: string;
    fromId: string;
    roomId: string;
    text: string;
    sendAt: string;
    watched: boolean;
};