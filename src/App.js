import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UnknownPage from "./pages/UnknownPage";
import PrivateRoute from "./PrivateRoute";
import Header from './Header';
import VeilleTuyauContext from './VeilleTuyauContext';
import { ParseClasse, bddConnection, subscriptionInLiveQuery, subscribeForWith } from "./utils/parseUtils";
import { ajouterElements } from "./utils/arrayUtils";

function App() {
  /* resultat de l'interrogation elastic search */
  const [veille, setVeille] = useState()
  const [tuyau, setTuyau] = useState()
  const [subjects, setSubjects] = useState()
  const [client, setClient] = useState()

  const load = (nomClasse, setTer, tmpSubjects) => {
    ParseClasse(nomClasse, (rep) => {
      console.log("Rep=", rep)
      let tmp = [];
      Array.from(rep).forEach(r => {
        const { objectId, channel_name, user_name, subjects, text, timestamp, url } = JSON.parse(JSON.stringify(r));
        tmp.push({ objectId: objectId, url: url, timestamp: timestamp, subject: subjects, text: text, channel_name: channel_name, user_name: user_name });
        ajouterElements(tmpSubjects, subjects);
      })
      setTer(tmp);
    })
  }

  const loadReload=()=>{
    let tmpSubjects = [];
    load("Veille",(u)=>setVeille(u),tmpSubjects);
    load("Tuyau",(u)=>setTuyau(u),tmpSubjects);
    setSubjects(tmpSubjects);
  }
  useEffect(() => {

    bddConnection();
    loadReload();
    let client = subscriptionInLiveQuery();
    setClient(client);
  }, []);

  useEffect(() => {
    if (!client) return;
    console.log("Abonnements livequery")
    subscribeForWith("Veille", client, ()=>loadReload());
    subscribeForWith("Tuyau", client, ()=>loadReload());
  }, [client]);

  return (
    <VeilleTuyauContext.Provider value={{ veille, tuyau, subjects }}>
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

