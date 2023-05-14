import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Veille technologique
        </Typography>
        {isAuthenticated && (
          <>
            <Typography variant="body2" style={{ marginRight: '10px' }}>
              {currentTime.toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" style={{ marginRight: '10px' }}>
              Utilisateur Connecté
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
