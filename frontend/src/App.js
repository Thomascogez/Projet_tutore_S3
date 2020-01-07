import React, { useEffect} from 'react';


import { useRoutes } from 'hookrouter'
import routes from './app/routes'
import Err404 from './app/pages/404';
import { useDispatch } from 'react-redux'
import { checkLogin } from './app/providers/actions/userActions'
function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  },[])

  const routeResult = useRoutes(routes);


  return (routeResult||<Err404 />);
}

export default App;
