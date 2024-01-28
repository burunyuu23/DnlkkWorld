import React from 'react';
import {Box} from "@mui/material";

import {MainLogo} from "@/feature/Logo";

import styles from './Header.module.scss';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    return (
        <Box sx={{bgcolor: 'background.paper'}}
             className={styles.wrapper}
        >
            <header className={styles.header}>
                <MainLogo/>
            </header>
        </Box>
    );
};

export default Header;
