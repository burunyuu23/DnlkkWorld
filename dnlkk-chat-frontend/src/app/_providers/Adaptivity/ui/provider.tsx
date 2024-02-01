'use client';

import {ReactNode, useEffect} from 'react';

import {useAppDispatch} from "@/shared/hooks/rtk";

import {screenChange} from "../store/adaptivitySlice";

type ProviderProps = {
    children: ReactNode;
};

const Provider = ({children}: ProviderProps) => {
    const dispatch = useAppDispatch();

    const resizeScreen = () => {
        if (window) {
            dispatch(screenChange(window.innerWidth));
        }
    }

    useEffect(() => {
        if (window) {
            resizeScreen();
            window.addEventListener('resize', resizeScreen);
        }
        return () => {
            if (window) {
                window.removeEventListener('resize', resizeScreen);
            }
        }
    }, []);

    return children;
};

export default Provider;
