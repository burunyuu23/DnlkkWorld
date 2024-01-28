import React from 'react';
import {Box, BoxProps, InputAdornment, SvgIcon} from "@mui/material";

import {SearchIcon} from "@/shared/icons";
import DnlkkInput from "@/shared/components/DnlkkInput/DnlkkInput";

import styles from './Dialogs.module.scss';

const Dialogs = ({sx, ...props}: BoxProps) => {
    return (
        <Box
            {...props}
            sx={{
                bgcolor: 'background.default',
                border: 1,
                borderColor: 'secondary.main',
                width: 'max-content',
                padding: '12px 15px',
                height: '100%',
                ...sx,
            }}>
            <DnlkkInput
                className={styles.searchBar}
                placeholder="Поиск..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SvgIcon>
                                <SearchIcon/>
                            </SvgIcon>
                        </InputAdornment>
                    ),
                }}
            />
            <ul>
            </ul>
        </Box>
    );
};

export default Dialogs;
