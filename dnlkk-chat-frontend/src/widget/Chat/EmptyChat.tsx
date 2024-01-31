'use client';

import React from 'react';
import {Box, BoxProps, Typography} from "@mui/material";

const EmptyChat = ({sx, ...props}: BoxProps) => {
    return (
        <Box
            {...props}
            sx={{
                bgcolor: 'background.default',
                border: 1,
                borderColor: 'secondary.main',
                padding: '12px 15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...sx,
            }}
        >
            <Typography variant="h3">Выберите диалог</Typography>
        </Box>
    );
};

export default EmptyChat;
