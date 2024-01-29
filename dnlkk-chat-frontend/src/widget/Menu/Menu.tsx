import React from 'react';
import {SvgIcon} from "@mui/material";

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
                Профиль
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Message/>
                </SvgIcon>
                Сообщения
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Clip/>
                </SvgIcon>
                Клипы
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Music/>
                </SvgIcon>
                Музика
            </li>
        </ul>
    );
};

export default Menu;
