import React from 'react';
import {TextField, TextFieldProps} from "@mui/material";
import cl from 'classnames';

import styles from './DnlkkInput.module.scss';

const DnlkkInput = ({className, ...props}: TextFieldProps) => {
    return (
        <TextField
            sx={{
                '& .MuiInputBase-root': {
                    bgcolor: 'background.paper',
                },
            }}
            className={cl(className, styles.input)}
            {...props}
        />
    );
};

export default DnlkkInput;
