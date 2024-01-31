'use client';

import React from 'react';
import {SvgIcon} from "@mui/material";
import cl from 'classnames';

import {Clip, Message, Music, Profile} from '@/shared/icons';
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectScreen} from "@/app/_providers/Adaptivity/store/adaptivitySlice";

import styles from './Menu.module.scss';

type MenuProps = {};

const Menu = ({}: MenuProps) => {
    const screen = useAppSelector(selectScreen);
    const isMobile = screen === 'mobileS' || screen === 'tablet';
    return (
        <ul className={cl(styles.menu, isMobile && styles.mobile)}>
            <li>
                <SvgIcon viewBox="0 0 16 16">
                    <Profile/>
                </SvgIcon>
                {!isMobile && 'Профиль'}
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Message/>
                </SvgIcon>
                {!isMobile && 'Сообщения'}
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Clip/>
                </SvgIcon>
                {!isMobile && 'Клипы'}
            </li>
            <li>
                <SvgIcon viewBox="0 0 16 14">
                    <Music/>
                </SvgIcon>
                {!isMobile && 'Музика'}
            </li>
        </ul>
    );
};

export default Menu;
