import {configureStore} from '@reduxjs/toolkit'
import {themeSlice} from "@/feature/ToggleTheme";
import {dialogSlice} from "@/entity/Dialog/store/dialogSlice";
import messageApi from "@/entity/Message/store/messageApi";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [themeSlice.name]: themeSlice.reducer,
            [dialogSlice.name]: dialogSlice.reducer,
            [messageApi.reducerPath]: messageApi.reducer
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({})
                .concat(messageApi.middleware);
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']