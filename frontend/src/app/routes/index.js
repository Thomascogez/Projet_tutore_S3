import React from 'react'
import Home from '../pages/home'
import Seances from '../pages/seances'
import Ajout from '../pages/seances/ajout'

const routes = {
    '/' : () => <Home />,
    '/seances' : () => <Seances />,
    '/seances/ajout' : () => <Ajout />
}


export default routes;