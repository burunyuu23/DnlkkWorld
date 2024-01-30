'use client';

import React from 'react';
import {Box, BoxProps, Button, InputAdornment, SvgIcon} from "@mui/material";

import {SearchIcon} from "@/shared/icons";
import DnlkkInput from "@/shared/components/DnlkkInput/DnlkkInput";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtk";
import {chooseDialog, chooseUser, selectFromId, selectToId} from "@/entity/Dialog/store/dialogSlice";
import UserMiniCardDialog from "@/widget/UserMiniCardDialog/UserMiniCardDialog";
import {useGetDialogsQuery, useGetUsersQuery} from "@/entity/Dialog/store/dialogApi";

import styles from './Dialogs.module.scss';

type DialogsProps = BoxProps;

const Dialogs = ({ sx, ...props }: DialogsProps) => {
    const fromId = useAppSelector(selectFromId);
    const toId = useAppSelector(selectToId);
    const dispatch = useAppDispatch();
    const { data: rooms } = useGetDialogsQuery(fromId);
    const { data: users } = useGetUsersQuery();

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
            <ul className={styles.dialogs}>
                {users?.map((user) => {
                        return (
                            <Button
                                sx={{ padding: '2px' }}
                                key={user.id}
                                onClick={() => dispatch(chooseUser(user.id))}
                                variant={fromId === user.id ? "contained" : "outlined"}
                            >
                                <UserMiniCardDialog
                                    fromId={fromId}
                                    {...user}
                                />
                            </Button>
                        )
                    }
                )}
            </ul>
            <hr/>
            <ul className={styles.dialogs}>
                <Button
                    sx={{ padding: '2px' }}
                    onClick={() => dispatch(chooseDialog(undefined))}
                    variant={toId === undefined ? "contained" : "outlined"}
                >
                    esc
                </Button>
                {rooms?.map(({id, participants, lastMessage}) => {
                        const users = id !== `${fromId}_${fromId}` ?
                            participants.filter((part) => part.id !== fromId)
                            :
                            participants;
                        return (
                            <>
                                {users.map((user) => {
                                    return (
                                        <Button
                                            sx={{ padding: '2px' }}
                                            key={`${id}_${user.id}`}
                                            onClick={() => dispatch(chooseDialog(user.id))}
                                            variant={toId === user.id ? "contained" : "outlined"}
                                        >
                                            <UserMiniCardDialog
                                                fromId={fromId}
                                                {...user}
                                                message={lastMessage}
                                            />
                                        </Button>
                                    )

                                })
                                }
                            </>
                        )
                    }
                )}
            </ul>
        </Box>
    )
        ;
};

export default Dialogs;
