// Soft UI Dashboard React layouts
import Dashboard from 'layouts/dashboard'
import Tables from 'layouts/tables'
import Major from 'layouts/major'
import Profile from 'layouts/profile'
import SignIn from 'layouts/authentication/sign-in'

//  icons
import Shop from 'examples/Icons/Shop'
import Office from 'examples/Icons/Office'
import Document from 'examples/Icons/Document'
import CustomerSupport from 'examples/Icons/CustomerSupport'
import Cube from 'examples/Icons/Cube'
import Subject from 'layouts/subject'
import Account from 'layouts/account'
import SpaceShip from 'examples/Icons/SpaceShip'

const routes = [
    {
        type: 'collapse',
        name: 'Dashboard',
        key: 'dashboard',
        route: '/dashboard',
        icon: <Shop size="12px" />,
        component: <Dashboard />,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Account',
        key: 'acount',
        route: '/account',
        icon: <Office size="12px" />,
        component: <Account />,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Major',
        key: 'major',
        route: '/major',
        icon: <SpaceShip size="12px" />,
        component: <Major />,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Subject',
        key: 'subject',
        route: '/subject',
        icon: <Cube size="12px" />,
        component: <Subject />,
        noCollapse: true,
    },
    // {
    //     type: 'collapse',
    //     name: 'Register',
    //     key: 'register',
    //     route: '/tables',
    //     icon: <Cube size="12px" />,
    //     component: <Tables />,
    //     noCollapse: true,
    // },
    { type: 'title', title: 'Account Pages', key: 'account-pages' },
    {
        type: 'collapse',
        name: 'Profile',
        key: 'profile',
        route: '/profile',
        icon: <CustomerSupport size="12px" />,
        component: <Profile />,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Sign In',
        key: 'sign-in',
        route: '/authentication/sign-in',
        icon: <Document size="12px" />,
        component: <SignIn />,
        noCollapse: true,
    },
]

export default routes
