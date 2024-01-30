import {io, Socket} from "socket.io-client";

const sockets =  new Map<string, Socket>;

export function getSocket(path: string) {
    let socket = sockets.get(path);
    if (!socket) {
        socket = io(path);
        sockets.set(path, socket);
    }
    return socket;
}

export function closeSocket(path: string, socket: Socket) {
    socket.close();
    sockets.delete(path);
}
