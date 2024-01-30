import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {closeSocket, getSocket} from "@/shared/api/socket";

import {Message} from '../model/type';

const baseUrl = 'http://localhost:5000/';

const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (build) => ({
        getMessages: build.query<
            Message[],
            Pick<Message, 'fromId' | 'toId'>
        >({
                query: (roomId) => `messages?fromId=${roomId.fromId}&toId=${roomId.toId}`,
            async onCacheEntryAdded(
                roomId,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            ) {
                const socket = getSocket(baseUrl);
                socket.emit('join', roomId);
                try {
                    await cacheDataLoaded;

                    const receiveMessage = ({message}: { message: Message }) => {
                        updateCachedData((draft) => {
                            draft.push(message)
                        })
                    }

                    socket.on('message', receiveMessage);
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                closeSocket(baseUrl, socket);
            },
        }),
        sendMessage: build.mutation<Message, Pick<Message, 'text' | 'toId' | 'fromId'>>({
            queryFn: (sendMessage) => {
                const socket = getSocket(baseUrl);
                return new Promise(resolve => {
                    socket.emit('sendMessage', sendMessage, (message: Message) => {
                        resolve({data: message});
                    });
                })
            },
        }),
    }),
})

export const {useLazyGetMessagesQuery, useSendMessageMutation} = messageApi;

export default messageApi;