import React from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// setting routing
const SettingsUnit= Loadable(React.lazy(()=>import('../views/units/Units')));
const ViewUnit=Loadable(React.lazy(()=>import('../views/units/UnitsDetails')));
const ViewSubunit=Loadable(React.lazy(()=>import('../views/units/subunits/SubunitsDetails')));

const Accounts=Loadable(React.lazy(()=>import('../views/accounts/Accounts')));
const LRA=Loadable(React.lazy(()=>import('../views/accounts/LRA')));
const AccountsDetails=Loadable(React.lazy(()=>import('../views/accounts/AccountsDetails')));

// anggaran routing
const Apbd=Loadable(React.lazy(()=>import('../views/apbd/Apbd')));
const Dpa=Loadable(React.lazy(()=>import('../views/dpa/Dpa')));
const ViewDpa=Loadable(React.lazy(()=>import('../views/dpa/DpaDetails')));

const Rba=Loadable(React.lazy(()=>import('../views/rba/Rba')));

// dashboard routing
const DashboardDefault = Loadable(React.lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(React.lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(React.lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(React.lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(React.lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(React.lazy(() => import('../views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(React.lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path:'units',
            children:[
                {
                    path:"",
                    element:<SettingsUnit/>,
                },
                {
                    path:":id",
                    element:<ViewUnit/>
                },
                {
                    path:'subs',
                    children:[
                        {
                            path:":id",
                            element:<ViewSubunit/>
                        }
                    ]
                }
            ]
        },
        {
            path:'accounts',
            children:[
                {
                    path:"lra",
                    element:<LRA/>,
                },
                {
                    path:"lo",
                    element:<Accounts report="LO"/>
                },
                {
                    path:"lpe",
                    element:<Accounts report="LPE"/>
                },
                {
                    path:"neraca",
                    element:<Accounts report="Neraca"/>
                },
                {
                    path:":id",
                    element:<AccountsDetails/>
                }
            ]
        },
        {
            path:'apbd',
            element:<Apbd/>
        },
        {
            path:'dpa',
            children:[
                {
                    path:'',
                    element:<Dpa/>
                },
                {
                    path:":id",
                    element:<ViewDpa/>
                }
            ]
        },
        {
            path:'rba',
            children:[
                {
                    path:'',
                    element:<Rba/>
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
