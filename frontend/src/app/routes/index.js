import React from 'react'
import Home from '../pages/home'
import Password from '../pages/home/passwordForget'
import Seances from '../pages/seances'
import Ajout from '../pages/seances/ajout'
import AddUser from '../pages/addUser'
import AddUserPage2 from '../pages/addUser/page2'
import Administration from '../pages/administration'
import GererUtilisateur from '../pages/administration/utilisateurs'
import EditModule from '../pages/administration/Module'

const routes = {
    '/' : () => <Home />,
    '/passwordForget' : () => <Password />,
    '/seances' : () => <Seances />,
    '/seances/ajout' : () => <Ajout />,
    '/addUser' : () => <AddUser />,
    '/addUser/page2' : () => <AddUserPage2 />,
    '/administration' : () =><Administration/>,
    '/administration/editModule' : () => <EditModule />,
    '/administration/utilisateurs' : () =><GererUtilisateur/>
}


export default routes;