import React from 'react';
import NavBar from './app/components/layouts/Navbar'

import { useRoutes } from 'hookrouter'
import routes from './app/routes'
function App() {

  const routeResult = useRoutes(routes);
  return (
    <div>
      <NavBar />
      {routeResult ? routeResult : "404"}  {/*TODO: 404 page  */}
    </div>
  );
}

export default App;
