/**
 * Route define file
 * @exports routes
 */
import Home from '../pages/home'
import Seance from '../pages/seances'
import Ajout from '../pages/ajout'
import React from 'react'

 const routes = {
    '/': () => <Home />,
    '/seances': () => <Seance />,
    '/ajout': () => <Ajout />
 }



 export default routes;