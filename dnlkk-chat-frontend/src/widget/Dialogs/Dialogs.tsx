'use client';

import React, {Fragment, useState} from 'react';
import {Box, BoxProps, Button, InputAdornment, SvgIcon} from "@mui/material";
import {useRouter} from 'next/navigation';

import {SearchIcon} from "@/shared/icons";
import DnlkkInput from "@/shared/components/DnlkkInput/DnlkkInput";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtk";
import {chooseDialog, chooseUser, selectFromId, selectToId} from "@/entity/Dialog/store/dialogSlice";
import UserMiniCardDialog from "@/widget/UserMiniCardDialog/UserMiniCardDialog";
import {
    useGetDialogsQuery,
    useGetUsersQuery,
    useJoinDialogMutation,
    useLeaveDialogMutation,
    useLoginMutation,
    useLogoutMutation
} from "@/entity/Dialog/store/dialogApi";
import {User} from "@/entity/User/model/type";
import {Room} from "@/entity/Dialog/model/types";

import styles from './Dialogs.module.scss';

type DialogsProps = BoxProps;

const Dialogs = ({sx, ...props}: DialogsProps) => {
    const [logged, setLogged] = useState(false);
    const fromId = useAppSelector(selectFromId);
    const toId = useAppSelector(selectToId);
    const dispatch = useAppDispatch();
    const {data: rooms} = useGetDialogsQuery(fromId);
    const {data: users} = useGetUsersQuery();
    const [leave] = useLeaveDialogMutation();
    const [join] = useJoinDialogMutation();
    const [login] = useLoginMutation();
    const [logout] = useLogoutMutation();
    const router = useRouter();

    const handleChooseUser = (userId: User['id']) => {
        if (logged && userId !== fromId) {
            logout();
            setLogged(false);
        }
        dispatch(chooseUser(userId));
        if (!logged) {
            setLogged(true);
        }
        login(userId);
    }

    const handleChooseRoom = (roomId: Room['id'], id: User['id']) => {
        console.log(toId);
        if (toId) {
            leave({fromId, toId});
        }
        dispatch(chooseDialog(id));
        join({fromId, toId: id});
        router.push(`/im/${roomId}`);
    }

    return (
        <Box
            {...props}
            sx={{
                bgcolor: 'background.default',
                border: 1,
                borderColor: 'secondary.main',
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
                                sx={{padding: '2px', width: '100%'}}
                                key={user.id}
                                onClick={() => handleChooseUser(user.id)}
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
                    sx={{padding: '2px', width: '100%'}}
                    onClick={() => dispatch(chooseDialog(undefined))}
                    variant={toId === undefined ? "contained" : "outlined"}
                >
                    esc
                </Button>
                {rooms?.map(({id, participants, lastMessage, notWatchedMessageCount}) => {
                        const users = id !== `${fromId}_${fromId}` ?
                            participants.filter((part) => part.id !== fromId)
                            :
                            participants;
                        return (
                            <Fragment key={id}>
                                {users.map((user) => {
                                    return (
                                        <Button
                                            key={user.id}
                                            sx={{padding: '2px', width: '100%'}}
                                            onClick={() => handleChooseRoom(id, user.id)}
                                            variant={toId === user.id ? "contained" : "outlined"}
                                        >
                                            <UserMiniCardDialog
                                                fromId={fromId}
                                                {...user}
                                                message={lastMessage}
                                                notWatchedMessageCount={notWatchedMessageCount}
                                            />
                                        </Button>
                                    )

                                })
                                }
                            </Fragment>
                        )
                    }
                )}
            </ul>
        </Box>
    )
        ;
};

export default Dialogs;
