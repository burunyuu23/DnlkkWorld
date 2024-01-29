export type Message = {
    toId: string;
    fromId: string;
    text: string;
    sendAt: Date;
    watched: boolean;
};