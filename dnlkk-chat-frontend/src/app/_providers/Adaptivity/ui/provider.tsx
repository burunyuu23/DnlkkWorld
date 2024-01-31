'use client';

import {ReactNode, useEffect} from 'react';

import {useAppDispatch} from "@/shared/hooks/rtk";

import {screenChange} from "../store/adaptivitySlice";

type ProviderProps = {
    children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
    const dispatch = useAppDispatch();

    const resizeScreen = () => {
        dispatch(screenChange(window.innerWidth));
    }
    resizeScreen();

    useEffect(() => {
        window.addEventListener('resize', resizeScreen);
        return () => {
            window.removeEventListener('resize', resizeScreen);
        }
    }, []);

    return children;
};

export default Provider;
