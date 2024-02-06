'use client';

import React, {FormEvent, useCallback, useEffect, useRef} from 'react';
import {Box, BoxProps} from "@mui/material";
import cl from 'classnames';

import DnlkkInput from "@/shared/components/DnlkkInput/DnlkkInput";
import {useLazyGetMessagesQuery, useSendMessageMutation} from "@/entity/Message/store/messageApi";
import {Message} from "@/entity/Message";

import styles from './Chat.module.scss';
import ChatMessage from "../../entity/Message/ui/ChatMessage/ChatMessage";

type ChatProps = BoxProps & {
    fromId: Message['fromId'];
    toId: Message['toId'];
}

// TODO: entity/Profile(id, username, lastOnline): ui: ProfileDialogMiniCard{in Dialogs}, ProfileDialogMainCard{in Chat}
// TODO: next-auth
// TODO: think about `const message = e.target[0].value;`
const Chat = ({fromId, toId, sx, className, ...props}: ChatProps) => {
    const bottom = useRef<HTMLUListElement>(null);
    const [sendMessage] = useSendMessageMutation();
    const [getCatalogProducts, {data: messages}] = useLazyGetMessagesQuery();

    useEffect(() => {
        if (bottom.current) {
            bottom.current.scrollTop = bottom.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!toId) {
            return () => {
            };
        }
        getCatalogProducts({fromId, toId});
    }, [toId, fromId]);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!toId) {
            return;
        }
        // @ts-expect-error
        const text = e.target[0].value;
        console.log(text);
        sendMessage({text, toId, fromId});
        // @ts-expect-error
        e.target[0].value = "";
    }, [toId, fromId]);

    return (
        <Box
            {...props}
            className={cl(className, styles.chat)}
            sx={{
                bgcolor: 'background.default',
                border: 1,
                borderColor: 'secondary.main',
                width: '100%',
                padding: '12px 10px',
                height: '100%',
                ...sx,
            }}
        >
            <div>
                <h1>Chattin!!</h1>
            </div>
            <div className={styles.body}>
                <ul className={styles.messages} ref={bottom}>
                    {messages?.map((message, index) => (
                        <li key={index}>
                            <ChatMessage
                                {...message}
                                isMyMessage={fromId === message.fromId}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit} className={styles.chatBarWrapper}>
                <DnlkkInput
                    onSubmit={(e) => console.log(e.currentTarget.nodeValue)}
                    className={styles.chatBar}
                    placeholder="Напишите сообщение..."
                />
            </form>
        </Box>
    )
        ;
};

export default Chat;
