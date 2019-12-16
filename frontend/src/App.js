import React from 'react'
import { useRoutes } from 'hookrouter';
import routes from './app/routes'
import Navbar from'./app/components/layout/NavBar'

//layout
import Footer from './app/components/layout/Footer'
import NavBar from './app/components/layout/NavBar';
export default function App() {
    const routeResult = useRoutes(routes);
    return (
        <div>
            <NavBar/>
            {routeResult}
            <Footer />
        </div>
    )
}
