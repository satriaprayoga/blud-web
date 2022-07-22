import React from "react";
import ReactDOM from "react-dom";
import { Provider,useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import { BrowserRouter } from 'react-router-dom';

// defaultTheme
import themes from './themes';

import {store} from './store';

import Routes from './routes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

// ==============================|| APP ||============================== //

const Main = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Main;


if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
           <BrowserRouter>
                <Main/>
           </BrowserRouter>
        </Provider>
        , document.getElementById('root'));
}
