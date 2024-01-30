import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {getSocket} from "@/shared/api/socket";

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
                try {
                    await cacheDataLoaded;

                    const receiveMessage = ({message}: { message: Message }) => {
                        if (message.toId === roomId.fromId) {
                            console.log(message)
                            console.log(roomId)
                            socket.emit('watched', { ...roomId, messageId: message.id });
                        }
                        updateCachedData((draft) => {
                            draft.push(message)
                        })
                    }

                    socket.on('message', receiveMessage);
                } catch {
                }
                await cacheEntryRemoved
                socket.emit('leave', roomId);
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

export const {
    useLazyGetMessagesQuery,
    useSendMessageMutation,
} = messageApi;

export default messageApi;