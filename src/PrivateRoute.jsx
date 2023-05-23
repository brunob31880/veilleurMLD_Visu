import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { keycloak } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>
                keycloak.authenticated ? (
                    <RouteComponent {...routeProps} {...rest} />
                ) : (
                    null
                )
            }
        />
    );
};

export default PrivateRoute;
