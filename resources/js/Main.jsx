

import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider, CssBaseline } from '@mui/material';
import { useSelector, Provider } from 'react-redux'
import theme from './themes';
import { store } from './store';


const Main = () => {
    const customization = useSelector((state) => state.customization);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline/>
                <h1>Hai ini apa</h1>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default Main;


if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <Main/>
        </Provider>
        , document.getElementById('root'));
}