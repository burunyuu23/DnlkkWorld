'use client';

import { ReactNode, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { makeStore, AppStore } from '../config/store';

export default function Provider({
                                          children,
                                      }: {
    children: ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>
}