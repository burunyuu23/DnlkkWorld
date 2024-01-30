import React from 'react';

import {User} from '@/entity/User/model/type';
import UserMiniCardBase from "@/entity/User/ui/UserMiniCard";
import {Message} from '@/entity/Message';
import {Typography} from "@mui/material";

type UserMiniCardDialogProps = User & {
    message?: Message;
    fromId: string;
};

const UserMiniCardDialog = ({fromId, message, ...user}: UserMiniCardDialogProps) => {
    console.log(message, " ", user)
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
                        <Typography sx={{color: 'text.secondary'}}>
                            {/* TODO: также с датами как и в сообщении */}
                            <time>1ч</time>
                        </Typography>
                    }
                </>
            }
        />
    );
};

export default UserMiniCardDialog;
