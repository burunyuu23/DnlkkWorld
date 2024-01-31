import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export type Screen = 'mobileS' | 'tablet' | 'laptop' | 'desktop';

export const screens: { screen: Screen, width: { from: number, to: number } }[] = [
    {
        screen: 'mobileS',
        width: {
            from: 0,
            to: 320 + (768 - 320) / 2,
        },
    },
    {
        screen: 'tablet',
        width: {
            from: 768 - (768 - 320) / 2,
            to: 768 + (1024 - 768) / 2,
        },
    },
    {
        screen: 'laptop',
        width: {
            from: 1024 - (1024 - 768) / 2,
            to: 1024 + (1440 - 1024) / 2,
        },
    },
    {
        screen: 'desktop',
        width: {
            from: 1440 - (1440 - 1024) / 2,
            to: Number.MAX_VALUE
        },
    },
]

type AdaptivityState = {
    screen: Screen | undefined
}

const initialState: AdaptivityState = {
    screen: undefined
}

export const adaptivitySlice = createSlice({
    name: 'adaptivity',
    initialState,
    selectors: {
        selectScreen: (state) => state.screen,
    },
    reducers: {
        screenChange: (state, action: PayloadAction<number>) => {
            state.screen = screens
                .filter((screen) =>
                    screen.width.from <= action.payload &&
                    action.payload < screen.width.to)
                .at(0)?.screen;
        },
    },
})

export const {screenChange} = adaptivitySlice.actions;
export const {selectScreen} = adaptivitySlice.selectors;

export default adaptivitySlice.reducer;
