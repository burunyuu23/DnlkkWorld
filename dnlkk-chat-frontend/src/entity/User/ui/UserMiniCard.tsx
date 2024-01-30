import React, {ReactNode} from 'react';
import {Box, Typography} from "@mui/material";
import Image from 'next/image'

import styles from './UserMiniCard.module.scss';
import {User} from '../model/type';

type UserMiniCardBase = User & {
    bottomContentSlot?: ReactNode;
    rightContentSlot?: ReactNode;
};

const UserMiniCardBase = ({name, image_url, bottomContentSlot, rightContentSlot}: UserMiniCardBase) => {
    return (
        <Box
            className={styles.miniCard}
            sx={{
                maxWidth: '300px',
                bgcolor: 'background.paper'
            }}
        >
            <Image src={image_url} alt={name} width={40} height={40}/>
            <Box className={styles.bottomContent}>
                <Typography
                    sx={{ color: 'primary.main' }}
                    variant="subtitle1"
                >
                    <b>{name}</b>
                </Typography>
                {bottomContentSlot}
            </Box>
            <Box className={styles.rightContent}>
                {rightContentSlot}
            </Box>
        </Box>
    );
};

export default UserMiniCardBase;
