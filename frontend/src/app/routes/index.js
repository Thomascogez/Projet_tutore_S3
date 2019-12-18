import React from 'react'
import Home from '../pages/home'
import Seances from '../pages/seances'
import Ajout from '../pages/seances/ajout'
import AjoutUser from '../pages/ajoutUser'
import TestModal from '../pages/PaulTests/modalTest'
import Administration from '../pages/administration'
import EditModule from '../pages/administration/Module'

const routes = {
    '/' : () => <Home />,
    '/seances' : () => <Seances />,
    '/seances/ajout' : () => <Ajout />,
    '/ajoutUser' : () => <AjoutUser />,
    '/modalTest' : () => <TestModal />,
    '/administration' : () =><Administration/>,
    '/administration/editModule' : () => <EditModule />
}


export default routes;