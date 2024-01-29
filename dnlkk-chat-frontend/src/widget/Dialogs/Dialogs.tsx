'use client';

import React from 'react';
import {Box, BoxProps, Button, InputAdornment, SvgIcon} from "@mui/material";

import {SearchIcon} from "@/shared/icons";
import DnlkkInput from "@/shared/components/DnlkkInput/DnlkkInput";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtk";
import {chooseDialog, chooseUser, selectFromId, selectToId} from "@/entity/Dialog/store/dialogSlice";

import styles from './Dialogs.module.scss';

const Dialogs = ({sx, ...props}: BoxProps) => {
    const fromId = useAppSelector(selectFromId);
    const toId = useAppSelector(selectToId);
    const dispatch = useAppDispatch();
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
                            <SvgIcon color="disabled">
                                <SearchIcon/>
                            </SvgIcon>
                        </InputAdornment>
                    ),
                }}
            />
            <ul>
                <Button
                    onClick={() => dispatch(chooseUser("1"))}
                    variant={fromId === "1" ? "contained" : "outlined"}
                >
                    1
                </Button>
                <Button
                    onClick={() => dispatch(chooseUser("2"))}
                    variant={fromId === "2" ? "contained" : "outlined"}
                >
                    2
                </Button>
            </ul>
            <hr/>
            <ul>
                <Button
                    onClick={() => dispatch(chooseDialog(undefined))}
                    variant={toId === undefined ? "contained" : "outlined"}
                >
                    esc
                </Button>
                <Button
                    onClick={() => dispatch(chooseDialog("1"))}
                    variant={toId === "1" ? "contained" : "outlined"}
                >
                    1
                </Button>
                <Button
                    onClick={() => dispatch(chooseDialog("2"))}
                    variant={toId === "2" ? "contained" : "outlined"}
                >
                    2
                </Button>
            </ul>
        </Box>
    );
};

export default Dialogs;
