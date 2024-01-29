import React from 'react';
import {Box} from "@mui/material";

import {MainLogo} from "@/feature/Logo";
import {ToggleThemeSwitcher} from "@/feature/ToggleTheme";

import styles from './Header.module.scss';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    return (
        <Box sx={{bgcolor: 'background.paper'}}
             className={styles.wrapper}
        >
            <header className={styles.header}>
                <MainLogo/>
                {/*TODO: UserIcon*/}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <ToggleThemeSwitcher />
                    <Box sx={{
                        bgcolor: 'gray',
                        width: 26,
                        height: 26,
                        borderRadius: 13
                    }}/>
                </Box>
            </header>
        </Box>
    );
};

export default Header;
