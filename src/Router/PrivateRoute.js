import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userAuth } from '../AuthProvider';

const PrivateRoute = ({children}) => {
     const location=useLocation()
    const {user,loader}=useContext(userAuth)
    if(loader){
        return <h1>LOADING .......</h1>
    }
    if(!user.email){
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children

};

export default PrivateRoute;