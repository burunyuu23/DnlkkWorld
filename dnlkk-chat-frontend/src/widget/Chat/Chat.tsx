'use client';

import React, {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {Box, BoxProps} from "@mui/material";
import cl from 'classnames';
import io from 'socket.io-client';

import DnlkkInput from "@/shared/components/DnlkkInput/DnlkkInput";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectFromId, selectToId} from "@/entity/Dialog/store/dialogSlice";
import {Message} from "@/entity/Message";

import styles from './Chat.module.scss';
import ChatMessage from "../../entity/Message/ui/ChatMessage/ChatMessage";

const socket = io('http://localhost:5000');

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
    const [messages, setMessages] = useState<Message[]>([]);
    const div = useRef<HTMLUListElement>(null);

    useEffect(() => {
        console.log(div);
        if (div.current) {
            div.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [messages]);

    useEffect(() => {
        if (!toId) {
            setMessages([]);
            return () => {
            };
        }
        socket.emit('join', {toId, fromId});
        socket.on('messages', ({data}) => {
            setMessages(data.messages);
        });
        return () => {
            console.log(`Размонтирован! ${toId + " - " + fromId}`)
            socket.emit('leave', {toId, fromId});
        }
    }, [toId, fromId]);

    useEffect(() => {
        socket.on('message', ({data}) => {
            setMessages((prev) => [...prev, data.message]);
        });
        return () => {
            socket.close();
        }
    }, []);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!toId) {
            return;
        }
        // @ts-expect-error
        const text = e.target[0].value;
        console.log(text);
        socket.emit('sendMessage', {text, toId, fromId});
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
            <div>
                <h1>Chattin'!!</h1>
            </div>
            <div className={styles.body}>
                <ul className={styles.messages} ref={div}>
                    {messages.map((message, index) => (
                        <li key={index}>
                            <ChatMessage {...message} isMyMessage={fromId === message.fromId}/>
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
    );
};

export default Chat;
