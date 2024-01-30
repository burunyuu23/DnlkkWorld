import {closeSocket, getSocket} from "@/shared/api/socket";
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
                socket.emit('getDialogs', { id: fromId });
                console.log("We are here!")
                try {
                    await cacheDataLoaded;
                    console.log("We are here!")

                    socket.on('message', ({ message, roomId }) => {
                        updateCachedData((draft) => {
                            const draftedRoom = draft.find((room) => room.id === roomId);
                            if (draftedRoom) draftedRoom.lastMessage = message;
                        });
                    });
                } catch {
                    console.log("We are here!")
                }
                await cacheEntryRemoved
                console.log("We are here!")
                closeSocket(baseUrl, socket);
            },
        }),
    }),
    overrideExisting: false,
})

export const { useGetUsersQuery, useGetDialogsQuery } = dialogApi;

export default dialogApi;