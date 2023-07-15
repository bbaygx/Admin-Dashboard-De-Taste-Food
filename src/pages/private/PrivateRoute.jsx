import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/Auth';

function PrivateRoute({children}) {

    const userLocalStorage = JSON.parse(localStorage.getItem('user'))

    if(!userLocalStorage){
        return <Navigate to='/sign-in' />
    } 

    return children;

}
export default PrivateRoute;
