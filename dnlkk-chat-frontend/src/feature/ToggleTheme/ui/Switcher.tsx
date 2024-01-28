'use client';

import React from 'react';
import {FormControlLabel, FormGroup, Switch} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtk";
import {selectMode, toggleMode} from "@/feature/ToggleTheme";

const Switcher = () => {
    const mode = useAppSelector(selectMode);
    const dispatch = useAppDispatch();

    const handleChange = () => {
        dispatch(toggleMode());
    }

    return (
        <FormGroup>
            <FormControlLabel control={
                <Switch
                    checked={mode === 'dark'}
                    onChange={handleChange}/>
            } label={mode}/>
        </FormGroup>
    );
};

export default Switcher;
