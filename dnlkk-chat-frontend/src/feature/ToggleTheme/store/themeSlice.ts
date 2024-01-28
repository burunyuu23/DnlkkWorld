import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {PaletteMode} from "@mui/material";

type CounterState = {
    mode: PaletteMode
}

const initialState: CounterState = {
    mode: 'dark',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    selectors: {
        selectMode: (state) => state.mode,
    },
    reducers: {
        toggleMode: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
            } else {
                state.mode = 'light';
            }
        },
        changeMode: (state, action: PayloadAction<{ mode: PaletteMode }>) => {
            state.mode = action.payload.mode;
        },
    },
})

export const { toggleMode, changeMode } = themeSlice.actions;
export const { selectMode } = themeSlice.selectors;

export default themeSlice.reducer