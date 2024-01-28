'use client';

import {ReactNode, useMemo} from "react";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import {createTheme} from "@mui/material/styles";

import getDesignTokens from "../config/theme";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectMode} from "@/feature/ToggleTheme";

type ProviderProps = Readonly<{ children: ReactNode }>;

export default function Provider({ children }: ProviderProps) {
    const mode = useAppSelector(selectMode);
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
