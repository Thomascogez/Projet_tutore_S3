import React, {useEffect} from "react";
import {navigate} from "hookrouter";
import JwtDecode from "jwt-decode";

/**
 * ProtectedRoute
 *
 * Higher order component that check JWT token validity an the authentification of the user to access protected routes
 * @param {*} props
 */
export default function ProtectedRoute(props) {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // if no token found on local storage => redirect
      navigate("/");
    } else {
      try {
        let decode = JwtDecode(localStorage.getItem("token") || "");
        if (decode.exp < Date.now() / 1000) {
          //if the token is expired => redirect
          navigate("/");
        }
      } catch (err) {
        // if error when decoding token == non valid JWT format token => redirect
        navigate("/");
      }
    }
  }, []);
  return <React.Fragment>{props.children}</React.Fragment>;
}
