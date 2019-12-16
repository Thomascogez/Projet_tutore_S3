import React from 'react'
import { useRoutes } from 'hookrouter';
import routes from './app/routes'

//layout
import Footer from './app/components/layout/Footer'
export default function App() {
    const routeResult = useRoutes(routes);
    return (
        <div>
            {routeResult}
            <Footer />
        </div>
    )
}
