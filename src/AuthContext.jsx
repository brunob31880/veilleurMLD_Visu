import React, { createContext, useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';


export const AuthContext = createContext();

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const AuthProvider = ({ children }) => {
    const [keycloak, setKeyCloak] = useState(false);

    useEffect(() => {
        const keycloak = new Keycloak({
            "realm": "iet",
            "url": "https://sso.asap.dsna.fr/auth/",
            "clientId": "react-auth",
        });
        keycloak.init({}).then(authenticated => {
            setKeyCloak(keycloak);
            if (keycloak.authenticated) {
                console.log("User is already authenticated");
            } else {
                console.log("User is not authenticated, redirecting to login");
                keycloak.login();
            }
        });
    }, [])

    return (
        <AuthContext.Provider value={{ keycloak }}>
            {children}
        </AuthContext.Provider>
    );
};
