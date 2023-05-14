import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        // Ici, vous vérifiez le nom d'utilisateur et le mot de passe avec les valeurs codées en dur
        if (username === 'admin' && password === 'password') {
            setIsAuthenticated(true);
            return true;
        } else {
            return false;
        }
    };
    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
