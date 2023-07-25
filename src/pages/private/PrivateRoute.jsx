import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({children}) {

    const userLocalStorage = JSON.parse(localStorage.getItem('user'))

    if(!userLocalStorage){
        return <Navigate to='/' />
    } 

    return children;

}
export default PrivateRoute;
