import React from 'react'
import Home from '../pages/home'
import Userprofil from '../pages/userProfil'
import Password from '../pages/home/passwordForget'
import Seances from '../pages/event'
import AddEvent from '../pages/event/addEvent'
import AddUser from '../pages/admin/users/addUser'
import AddUserPage2 from '../pages/admin/users/addUser/step2'
import Administration from '../pages/admin'
import EditGroup from '../pages/admin/group'
import GererUtilisateur from '../pages/admin/users'
import EditModule from '../pages/admin/module'
import Options from '../pages/options'
import AddSession from '../pages/addSession'
import Test from '../pages/test'
import PasswordReset from "../pages/home/passwordReset";


import ProtectedRoute from '../utils/protectedRoute'

const routes = {
    '/' : () => <Home />,
    '/passwordForget' : () => <Password />,
    '/passwordReset/:token' : (token) => <PasswordReset token={token} />,
    '/test' : () =><ProtectedRoute> <Test /></ProtectedRoute>,
    '/options' : () => <Options />,
    '/seances' : () => <Seances />,
    '/seances/addEvent' : () => <AddEvent />,
    '/administration/utilisateurs/ajout/etape1' : () => <AddUser />,
    '/administration/utilisateurs/ajout/etape2' : () => <AddUserPage2 />,
    '/administration' : () =><Administration />,
    '/administration/editModule' : () => <EditModule />,
    '/administration/utilisateurs' : () =><GererUtilisateur/>,
    '/userProfil' : () => <Userprofil/>,
    '/administration/groupe' : () => <EditGroup />,
    '/seances/ajoutSeance': () => <AddSession />
};

export default routes;