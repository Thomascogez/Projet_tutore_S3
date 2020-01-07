import React, {useEffect, useState} from "react";
import {navigate} from "hookrouter";
import {ApiIsAdmin} from "../api/userFetch";
import PageLoader from "../components/layouts/loader";

/**
 * ProtectedRouteAdmin
 * 
 * Higher order component used to prevent access from admin of unauthorized users
 * @param {*} props 
 */
export default function ProtectedRouteAdmin(props) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
    ApiIsAdmin()
        .then(() => setLoading(false))
      .catch(() => {
        navigate('/seances')
      })
  }, []);

    return (
        <>
            {loading ? (
                <PageLoader/>
            ) : (
                <>{props.children}</>
            )}
        </>
    );
}
