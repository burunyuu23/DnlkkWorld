import {PaletteMode, PaletteOptions, ThemeOptions} from '@mui/material';

const darkPalette: PaletteOptions = {
    text: {
        primary: '#e1e3e6',
        secondary: '#739772',
    },
    background: {
        paper: '#142213',
        default: '#021000',
    },
    primary: {
        main: '#71eb71',
    },
    secondary: {
        main: '#739772',
    },
};

const lightPalette: PaletteOptions = {
    text: {
        primary: '#252525',
        secondary: '#222A22',
    },
    background: {
        paper: '#BAE7B7',
        default: '#d9e8d8',
    },
    primary: {
        main: '#39a439',
    },
    secondary: {
        main: '#222A22',
    },
};


const theme: ThemeOptions = {
    typography: {
        fontFamily: 'Jost, Arial',
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.167,
        },
        subtitle1: {
            fontSize: '0.875rem',
            lineHeight: 1.429,
        },
    },
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: ({theme}) => ({
                    color: theme.palette.primary.main
                }),
                colorDisabled: ({theme}) => ({
                    color: theme.palette.text.secondary
                }),
            }
        }
    }
};

const getDesignTokens = (mode: PaletteMode) => ({
    ...theme,
    palette: {...(mode === 'dark' ? darkPalette : lightPalette)}
});

export default getDesignTokens;