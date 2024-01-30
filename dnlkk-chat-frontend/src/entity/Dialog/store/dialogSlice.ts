import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

type CounterState = {
    toId: string | undefined;
    fromId: string;
}

const initialState: CounterState = {
    toId: undefined,
    fromId: "1",
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    selectors: {
        selectToId: (state) => state.toId,
        selectFromId: (state) => state.fromId,
    },
    reducers: {
        chooseDialog: (state, action: PayloadAction<string | undefined>) => {
            state.toId = action.payload;
        },
        chooseUser: (state, action: PayloadAction<string>) => {
            state.fromId = action.payload;
        },
    },
})

export const { chooseDialog, chooseUser } = dialogSlice.actions;
export const { selectToId, selectFromId } = dialogSlice.selectors;

export default dialogSlice.reducer;
