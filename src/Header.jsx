import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import {extractName} from './utils/textUtils';

const Header = () => {
  const { keycloak } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [name,setName]=useState();
  const useStyles = makeStyles((theme) => ({
    toolbar: {
      backgroundColor: '#06090D', 
    },
  }));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    keycloak.logout();
  };


  useEffect(()=>{
    if (!keycloak.authenticated) return;
    if (keycloak.tokenParsed.name) {
      setName(extractName(keycloak.tokenParsed.name));
    } else if (keycloak.tokenParsed.given_name) {
      setName(extractName(keycloak.tokenParsed.given_name));
    } else if (keycloak.tokenParsed.preferred_username) {
      setName(extractName(keycloak.tokenParsed.preferred_username));
    }
  },[keycloak])
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Veille technologique
        </Typography>
        {keycloak.authenticated && (
          <>
            <Typography variant="body2" style={{ marginRight: '10px' }}>
              {currentTime.toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" style={{ marginRight: '10px' }}>
             {name}
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
