import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

/**
 * 
 * @returns 
 */
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const isLoggedIn = login(username, password);
        if (isLoggedIn) {
            // rediriger vers la page d'accueil
            console.log('logged in username=', username, password);
            history.push("/");
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>
                Connexion
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Identifiant"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth type="submit">
                    Se connecter
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;

