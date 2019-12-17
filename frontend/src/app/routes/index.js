import React from 'react'
import Home from '../pages/home'
import Seances from '../pages/seances'
import Ajout from '../pages/ajout'
import AjoutUser from '../pages/ajoutUser'

const routes = {
    '/' : () => <Home />,
    '/seances' : () => <Seances />,
    '/ajout' : () => <Ajout />,
    '/ajoutUser' : () => <AjoutUser />
}


export default routes;