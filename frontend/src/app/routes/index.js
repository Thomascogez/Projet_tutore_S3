import React from 'react'
import Home from '../pages/home'
import Seances from '../pages/seances'
import Ajout from '../pages/ajout'

const routes = {
    '/' : () => <Home />,
    '/seances' : () => <Seances />,
    '/ajout' : () => <Ajout />
}


export default routes;