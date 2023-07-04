// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
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
  const[gitlab, setGitlab] = useState();
  const [subjects, setSubjects] = useState()
  const [client, setClient] = useState()
  const [team, setTeam] = useState()
  /***
   * 
   */
  const load = (nomClasse, setTer, tmpSubjects) => {
    ParseClasse(nomClasse, (rep) => {
      //console.log("Rep=", rep)
      let tmp = [];
      Array.from(rep).forEach(r => {
        const { objectId, channel_name, user_name, subjects, text, timestamp, url, thumbnail } = JSON.parse(JSON.stringify(r));
        tmp.push({ objectId: objectId, url: url, timestamp: timestamp, subject: subjects, text: text, channel_name: channel_name, user_name: user_name, thumbnail: thumbnail });
        ajouterElements(tmpSubjects, subjects);
      })
      console.log("Setting ", nomClasse, " to ", tmp)
      setTer(tmp);
    })
  }
  /**
   * 
   */
  const loadReload = () => {
    let tmpSubjects = [];
    load("Veille", (u) => setVeille(u), tmpSubjects);
    load("Tuyau", (u) => setTuyau(u), tmpSubjects);

    setSubjects(tmpSubjects);
  }
  /**
   * 
   */
  const loadTeam = () => {
    ParseClasse("Team", (rep) => {
      let tmp = [];
      Array.from(rep).forEach(r => {
        const { objectId, user_name, avatar } = JSON.parse(JSON.stringify(r));
        tmp.push({ objectId, user_name: user_name, avatar: avatar });
      })
      setTeam(tmp);
    })
  }
  const loadGitlab = () => {
    ParseClasse("Gitlab", (rep) => {
      let tmp = [];
      Array.from(rep).forEach(r => {
        const { project_creation, name, langages,framework,librairies } = JSON.parse(JSON.stringify(r));
        if (langages.toString()=='{}' && !framework && !librairies) {
          console.log("Project name: " + name + " not taken into account");
        }
        else tmp.push({ project_creation, name, langages,framework,librairies });
      })
      setGitlab(tmp);
    })
  }
  useEffect(() => {
    bddConnection();
    loadReload();
    loadTeam();
    loadGitlab();
    let client = subscriptionInLiveQuery();
    setClient(client);
  }, []);

  useEffect(() => {
    if (!client) return;
    console.log("Abonnements livequery")
    subscribeForWith("Veille", client, () => loadReload());
    subscribeForWith("Tuyau", client, () => loadReload());
  }, [client]);

  return (
    <VeilleTuyauContext.Provider value={{ veille, tuyau, subjects, team }}>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact path="/veilleurMLD_Visu" component={HomePage} gitlab={gitlab} veille={veille} tuyau={tuyau} />
          <Route component={UnknownPage} /> {/* Route pour la page "unknown" */}
        </Switch>
      </Router>
    </VeilleTuyauContext.Provider>
  );
}

export default App;

