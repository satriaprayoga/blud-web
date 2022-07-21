import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

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
            <Main/>
        </Provider>
        , document.getElementById('root'));
}
