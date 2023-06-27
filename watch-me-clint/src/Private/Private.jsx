import React from 'react';
import './Private.css'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './../Hooks/useAuth';

const Private = ({children, ...rest}) => {
    let location = useLocation();
    const { firebase }  = useAuth();
    const {user, isLoading} = firebase;
    if (isLoading) {
        return (
          <div className="loader">
            <span className="span"></span>
            <span className="span"></span>
            <span className="span"></span>
            <span className="span"></span>
          </div>
        );
      };
      
      if (user?.email) {
        return children;
      }
    
      return <Navigate to="/sign-up" state={{ from: location }} />;
};

export default Private;