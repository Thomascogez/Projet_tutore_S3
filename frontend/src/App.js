import React from 'react';
import NavBar from './app/components/layouts/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRoutes } from 'hookrouter'
import routes from './app/routes'

toast.configure({
  autoClose: 8000,
  draggable: false,
});

function App() {

  const routeResult = useRoutes(routes);
  return (
    <div>
      <NavBar />
        <ToastContainer />
        {routeResult ? routeResult : "404"}  {/*TODO: 404 page  */}
    </div>
  );
}

export default App;
