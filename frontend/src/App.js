import React from 'react';
import NavBar from './app/components/layouts/Navbar'

import { useRoutes } from 'hookrouter'
import routes from './app/routes'
import store from "./app/providers/store";
import {Provider} from "react-redux";

import Err404 from './app/pages/404';


function App() {

  const routeResult = useRoutes(routes);
  return (
    <Provider store={store}>
      <NavBar />
        {routeResult ? routeResult : <Err404 />}  {/*TODO: 404 page  */}
    </Provider>
  );
}

export default App;
