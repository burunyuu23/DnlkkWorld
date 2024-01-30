'use client';

import React, {FormEvent, useCallback, useEffect, useRef} from 'react';
import {Box, BoxProps} from "@mui/material";
import cl from 'classnames';

import DnlkkInput from "@/shared/components/DnlkkInput/DnlkkInput";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectFromId, selectToId} from "@/entity/Dialog/store/dialogSlice";
import {useLazyGetMessagesQuery, useSendMessageMutation} from "@/entity/Message/store/messageApi";

import styles from './Chat.module.scss';
import ChatMessage from "../../entity/Message/ui/ChatMessage/ChatMessage";

// TODO: socket to rtk
// TODO: messages to rtk + feature/Messages
// TODO: entity/Message(id, text, from: User['id'], date, watched): ui has variant: 'my' | 'another'
// TODO: entity/Profile(id, username, lastOnline): ui: ProfileDialogMiniCard{in Dialogs}, ProfileDialogMainCard{in Chat}
// TODO: ProfileDialogMiniCard have lastMessage and notWatchedMessagesCount
// TODO: room === user.id or group.id
// TODO: autoscroll + make prettier scroll
// TODO: next-auth
// TODO: think about `const message = e.target[0].value;`
const Chat = ({sx, className, ...props}: BoxProps) => {
    const fromId = useAppSelector(selectFromId);
    const toId = useAppSelector(selectToId);
    console.log(toId, " ", fromId)
    const bottom = useRef<HTMLBRElement>(null);
    const [sendMessage] = useSendMessageMutation();
    const [getCatalogProducts, {data: messages}] = useLazyGetMessagesQuery();

    useEffect(() => {
        bottom.current?.scrollIntoView({behavior: "smooth"});
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
                width: 'max-content',
                padding: '12px 15px',
                height: '100%',
                ...sx,
            }}
        >
            {toId &&
                (
                    <>
                        <div>
                            <h1>Chattin'!!</h1>
                        </div>
                        <div className={styles.body}>
                            <ul className={styles.messages}>
                                {messages?.map((message, index) => (
                                    <li key={index}>
                                        <ChatMessage {...message} isMyMessage={fromId === message.fromId}/>
                                    </li>
                                ))}
                            </ul>
                            <br ref={bottom}/>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.chatBarWrapper}>
                            <DnlkkInput
                                onSubmit={(e) => console.log(e.currentTarget.nodeValue)}
                                className={styles.chatBar}
                                placeholder="Напишите сообщение..."
                            />
                        </form>
                    </>
                ) || (
                    <div>
                        Выберите диалог
                    </div>
                )
            }
        </Box>
    );
};

export default Chat;
