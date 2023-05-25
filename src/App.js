import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UnknownPage from "./pages/UnknownPage";
import PrivateRoute from "./PrivateRoute";
import Header from './Header';
import VeilleTuyauContext from './VeilleTuyauContext';
import { ParseClasse, bddConnection } from "./utils/parseUtils";



function App() {
  /* resultat de l'interrogation elastic search */
  const [veille, setVeille] = useState()
  const [tuyau, setTuyau] = useState()


  useEffect(() => {
    bddConnection();
    ParseClasse("Tuyau", (rep) => {
      console.log("Rep=", rep)
      let tmp = [];
      Array.from(rep).forEach(r => {
        const { channel_name, user_name, subjects, text, timestamp, url } = JSON.parse(JSON.stringify(r));
        tmp.push({ url: url, timestamp: timestamp, subject: subjects, text: text, channel_name: channel_name, user_name: user_name });
      })
      setTuyau(tmp);
    })
    ParseClasse("Veille", (rep) => {
      console.log("Rep=", rep)
      let tmp = [];
      Array.from(rep).forEach(r => {
        const { channel_name, user_name, subjects, text, timestamp, url } = JSON.parse(JSON.stringify(r));
        tmp.push({ url: url, timestamp: timestamp, subject: subjects, text: text, channel_name: channel_name, user_name: user_name });
      })
      setVeille(tmp);
    })
  }, []);

  return (
    <VeilleTuyauContext.Provider value={{ veille, tuyau }}>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact path="/veilleurMLD_Visu" component={HomePage} veille={veille} tuyau={tuyau} />
          <Route component={UnknownPage} /> {/* Route pour la page "unknown" */}
        </Switch>
      </Router>
    </VeilleTuyauContext.Provider>
  );
}

export default App;

