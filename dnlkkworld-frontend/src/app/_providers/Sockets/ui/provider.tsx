'use client';

import {ReactNode, useEffect} from 'react';

import {getSocket} from "@/shared/api/socket";

const Provider = ({children}: {children: ReactNode}) => {
    useEffect(() => {
        const socket = getSocket('http://localhost:5000');
        return () => {
            socket.close();
        }
    }, []);

    return children;
};

export default Provider;
