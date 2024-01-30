import React from 'react';

import {User} from '@/entity/User/model/type';
import UserMiniCardBase from "@/entity/User/ui/UserMiniCard";
import {Message} from '@/entity/Message';
import {Typography} from "@mui/material";

type UserMiniCardDialogProps = User & {
    message?: Message;
    notWatchedMessageCount?: number;
    fromId: string;
};

const UserMiniCardDialog = ({fromId, notWatchedMessageCount, message, ...user}: UserMiniCardDialogProps) => {
    return (
        <UserMiniCardBase
            {...user}
            bottomContentSlot={
                message &&
                (<Typography
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
                </Typography>)
            }
            rightContentSlot={
                <>
                    {
                        message &&
                        (
                            <>
                                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                    {/* TODO: также с датами как и в сообщении */}
                                    <time>1ч</time>
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
                            </>
                        )
                    }
                </>
            }
        />
    );
};

export default UserMiniCardDialog;
