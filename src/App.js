import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UnknownPage from "./pages/UnknownPage";
import PrivateRoute from "./PrivateRoute";
import Header from './Header';
import axios from 'axios';
import VeilleTuyauContext from './VeilleTuyauContext';
import { config } from "./config/config";

function App() {
  /* resultat de l'interrogation elastic search */
  const [veille, setVeille] = useState()
  const [tuyau, setTuyau] = useState()
  
  useEffect(() => {
    axios.get(config.elk_home+"/elastic/veille/all").then((result) => {
      const tempVeille = result.data.map((record) => {
        const { _source } = record;
        return {
          id: _source.id,
          text: _source.text,
          timestamp: _source.timestamp,
          user_name: _source.user_name,
          trigger_word: _source.trigger_word,
          channel_name: _source.channel_name
        }
      });
      setVeille(tempVeille);
    })
    .catch(error => {
      // Gère les erreurs en conséquence
      console.error(error);
    });
    ;

    axios.get(config.elk_home+"/elastic/tuyau/all").then((result) => {
      const tempTuyau = result.data.map((record) => {
        const { _source } = record;
        return {
          id: _source.id,
          text: _source.text,
          timestamp: _source.timestamp,
          user_name: _source.user_name,
          trigger_word: _source.trigger_word,
          channel_name: _source.channel_name
        }
      });
      setTuyau(tempTuyau);
    })
    .catch(error => {
      // Gère les erreurs en conséquence
      console.error(error);
    });
    
    
    ;
  }, []);

  return (
    <VeilleTuyauContext.Provider value={{ veille, tuyau }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} veille={veille} tuyau={tuyau} />
          <Route component={UnknownPage} /> {/* Route pour la page "unknown" */}
        </Switch>
      </Router>
    </VeilleTuyauContext.Provider>
  );
}

export default App;

