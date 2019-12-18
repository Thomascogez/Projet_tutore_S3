import React from 'react'
import Home from '../pages/home'
import Seances from '../pages/seances'
import Ajout from '../pages/seances/ajout'
import AjoutUser from '../pages/ajoutUser'
import AjoutUser2 from '../pages/ajoutUser/page2'
import Administration from '../pages/administration'
import GererUtilisateur from '../pages/administration/utilisateurs'
import EditModule from '../pages/administration/Module'

const routes = {
    '/' : () => <Home />,
    '/seances' : () => <Seances />,
    '/seances/ajout' : () => <Ajout />,
    '/ajoutUser' : () => <AjoutUser />,
    '/ajoutUser/page2' : () => <AjoutUser2 />,
    '/administration' : () =><Administration/>,
    '/administration/editModule' : () => <EditModule />,
    '/administration/utilisateurs' : () =><GererUtilisateur/>
}


export default routes;