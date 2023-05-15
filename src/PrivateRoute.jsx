import React, {  useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    return (
        <Route
            {...rest}
            render={routeProps =>
                isAuthenticated ? (
                    <RouteComponent {...routeProps} {...rest} />
                ) : (
                    <Redirect to="/veilleurMLD_Visu/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
