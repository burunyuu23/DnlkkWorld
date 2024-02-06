import React from 'react';
import {Button, SvgIcon, Typography} from "@mui/material";

import {Favicon} from "@/shared/icons";
import styles from './MainLogo.module.scss';

type MainLogoProps = {};

const MainLogo = ({}: MainLogoProps) => {
    return (
        <Button size="small" className={styles.logoBtn}>
            <SvgIcon
                viewBox="0 0 128 128"
                style={{fontSize: 32, fill: 'primary.main'}}
            >
                <Favicon/>
            </SvgIcon>
            <Typography
                variant="h4"
                sx={{
                    color: 'text.primary'
                }}
                className={styles.logoText}
            >
                Dnlkk
            </Typography>
        </Button>
    );
};

export default MainLogo;
