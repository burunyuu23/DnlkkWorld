import React from 'react';

import {User} from '@/entity/User/model/type';
import UserMiniCardBase from "@/entity/User/ui/UserMiniCard";
import {lastMessageTime, Message} from '@/entity/Message';
import {Typography} from "@mui/material";

type UserMiniCardDialogProps = User & {
    message?: Message;
    notWatchedMessageCount?: number;
    fromId: string;
};

const UserMiniCardDialog = ({fromId, notWatchedMessageCount, message, ...user}: UserMiniCardDialogProps) => {
    if (!message) {
        return <UserMiniCardBase {...user} />;
    }

    const lastMessageSendAt = lastMessageTime(message.sendAt);
    return (
        <UserMiniCardBase
            {...user}
            bottomContentSlot={
                <Typography
                    sx={{
                        color: 'text.primary',
                        display: 'flex',
                    }}
                    variant="caption"
                >
                    {message.fromId === fromId &&
                        <Typography
                            sx={{color: 'text.secondary',}}
                            variant="caption"
                        >
                            Вы:
                        </Typography>
                    }
                    {message.text}
                </Typography>
            }
            rightContentSlot={<>
                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                    <time dateTime={lastMessageSendAt}>{lastMessageSendAt}</time>
                </Typography>
                {message.fromId !== fromId && !!notWatchedMessageCount && (
                    <Typography
                        variant="caption"
                        sx={{
                            border: '2px solid green',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                        }}
                    >
                        {notWatchedMessageCount}
                    </Typography>
                )}
            </>}
        />
    );
};

export default UserMiniCardDialog;
