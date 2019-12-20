import React, { useEffect } from "react";
import { navigate } from "hookrouter";
import { ApiIsAdmin } from "../api/userFetch";

/**
 * ProtectedRouteAdmin
 * 
 * Higher order component used to prevent access from admin of unauthorized users
 * @param {*} props 
 */
export default function ProtectedRouteAdmin(props) {

  useEffect(() => {
    ApiIsAdmin()
      .catch(() => {
        navigate('/seances')
      })
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
}
