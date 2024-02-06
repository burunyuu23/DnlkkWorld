import React from 'react';

import {User} from '@/entity/User/model/type';
import UserMiniCardBase from "@/entity/User/ui/UserMiniCard";

type UserMiniCardDialogProps = User & {

};

const UserMiniCardDialog = ({ ...user }: UserMiniCardDialogProps) => {
    return (
        <UserMiniCardBase
            {...user}
        />
    );
};

export default UserMiniCardDialog;
