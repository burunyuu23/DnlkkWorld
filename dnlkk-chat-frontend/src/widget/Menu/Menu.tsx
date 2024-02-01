import React from 'react';
import {SvgIcon, Typography} from "@mui/material";

import {Clip, Message, Music, Profile} from '@/shared/icons';

import styles from './Menu.module.scss';

type MenuProps = {};

const Menu = ({}: MenuProps) => {
    return (
        <ul className={styles.menu}>
            <li>
                <SvgIcon viewBox="0 0 16 16">
                    <Profile/>
                </SvgIcon>
                <Typography>Профиль</Typography>
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Message/>
                </SvgIcon>
                <Typography>Сообщения</Typography>
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Clip/>
                </SvgIcon>
                <Typography>Клипы</Typography>
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Music/>
                </SvgIcon>
                <Typography>Музика</Typography>
            </li>
        </ul>
    );
};

export default Menu;
