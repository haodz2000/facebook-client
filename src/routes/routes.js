import config from "~/config";
import Home from "~/pages/Home";

//Layouts
import HeaderOnly from "~/layouts/HeaderOnly";
//Pages
import Login from "~/pages/Login";
// import Register from "~/pages/Register";
import Profile from "~/pages/Profile";
import Messenger from "~/pages/Messenger";

const publicRoutes = [
    {path: config.routes.login, component: Login},
]   

const privateRoutes = [
    {path: config.routes.home, component:Home},
    {path: config.routes.profile, component:Profile, layout:HeaderOnly},
    {path: config.routes.messenger, component:Messenger,layout:HeaderOnly}
]

export { publicRoutes, privateRoutes };