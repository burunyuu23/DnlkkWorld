import React from 'react';
import {Box, Typography} from "@mui/material";
import mix from 'mix-css-color'

import {type Message} from "../../model/type";

type ChatMessageProps = Message & {
    isMyMessage: boolean;
};

const ChatMessage = ({text, sendAt, watched, toId, fromId, isMyMessage}: ChatMessageProps) => {
    // TODO: Написать функцию
    //  перевода sendAt в время/дату + 1ч/1д (назад)
    //  и протестировать её jest и cypress
    const date = new Date(sendAt);
    const finalDate = `${date.getHours()}:${date.getUTCMinutes()}`;
    return (
        <Box sx={{
            bgcolor: ({palette}) => {
                const defaultColor = palette.background.paper;
                if (isMyMessage) {
                    return defaultColor;
                }
                return mix(palette.secondary.main, defaultColor, 10).hex;
            },
            maxWidth: "fit-content",
            display: "grid",
            alignItems: "end",
            borderRadius: `20px 20px ${!isMyMessage ? '20px' : ''} 0`,
            marginLeft: isMyMessage ? "auto" : "0",
            padding: "0 10px"
        }}>
            <Box sx={{
                padding: "4px 4px 0 4px"
            }}>
                {/*<header>*/}
                {/*    <b>Иван Говнов</b>*/}
                {/*</header>*/}
                <Typography
                    variant="body1"
                    sx={{
                        wordBreak: "break-all"
                    }}
                >
                    {text}
                    <Box sx={{
                        color: "text.secondary",
                        float: 'right',
                        padding: '5px 0 0 5px'
                    }}>
                        <time dateTime={finalDate}>
                            {finalDate}
                        </time>
                    </Box>
                </Typography>
            </Box>

        </Box>
    );
};

export default ChatMessage;
