/**
 * Route define file
 * @exports routes
 */
import Home from '../pages/home'
import Seance from '../pages/seances'
import React from 'react'

 const routes = {
    '/': () => <Home />,
    '/seances': () => <Seance />
 }



 export default routes;