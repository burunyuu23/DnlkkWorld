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
        default: '#E8F0E7',
    },
    primary: {
        main: '#71EB71',
    },
    secondary: {
        main: '#222A22',
    },
};


const theme: ThemeOptions = {
    typography: {
        fontFamily: 'Jost, Arial',
    },
};

const getDesignTokens = (mode: PaletteMode) => ({
    ...theme,
    palette: {...(mode === 'dark' ? darkPalette : lightPalette)}
});

export default getDesignTokens;