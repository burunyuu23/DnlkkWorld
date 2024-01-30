import {getSocket} from "@/shared/api/socket";
import {Message} from "@/entity/Message";
import messageApi from "@/entity/Message/store/messageApi";

import {Room} from "../model/types";
import {User} from "@/entity/User/model/type";

const baseUrl = 'http://localhost:5000/';

const dialogApi = messageApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<
            User[],
            void
        >({
            query: () => `users/`,
        }),
        getDialogs: build.query<
            Room[],
            Message['fromId']
        >({
            query: (fromId) => `dialogs/${fromId}`,
            async onCacheEntryAdded(
                fromId,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            ) {
                const socket = getSocket(baseUrl);
                try {
                    await cacheDataLoaded;

                    const receiveMessage = ({message}: { message: Message }) => {
                        updateCachedData((draft) => {
                            const draftedRoom = draft.find(
                                (draftedRoom) => draftedRoom.id === message.roomId
                            );
                            if (draftedRoom) {
                                draftedRoom.lastMessage = message;
                                if (!message.watched && message.toId === fromId) {
                                    draftedRoom.notWatchedMessageCount++;
                                }
                            }
                        });
                    }

                    socket.on('message', receiveMessage);
                } catch {
                }
                await cacheEntryRemoved
            },
        }),
        leaveDialog: build.mutation<void, Pick<Message, 'toId' | 'fromId'>>({
            query: (roomId) => {
                const socket = getSocket(baseUrl);
                socket.emit('leave', roomId);
                return '/';
            },
        }),
        joinDialog: build.mutation<void, Pick<Message, 'toId' | 'fromId'>>({
            query: (roomId) => {
                const socket = getSocket(baseUrl);
                socket.emit('join', roomId);
                return '/';
            },
        }),
        login: build.mutation<void, Message['fromId']>({
            query: (fromId) => {
                const socket = getSocket(baseUrl);
                socket.emit('login', fromId);
                return '/';
            },
        }),
        logout: build.mutation<void, void>({
            query: () => {
                const socket = getSocket(baseUrl);
                socket.close();
                return '/';
            },
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUsersQuery,
    useGetDialogsQuery,
    useLoginMutation,
    useLeaveDialogMutation,
    useJoinDialogMutation,
    useLogoutMutation,
} = dialogApi;

export default dialogApi;