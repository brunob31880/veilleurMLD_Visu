import React, { createContext, useState, useEffect, useRef } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { trouverUrls } from '../utils/textUtils';
import { modifyElementInClassWithId } from '../utils/parseUtils';
import { getClassWithChannel } from '../utils/mtmUtils';
import SearchComponent from '../SearchComponent';
import ListeEtiquettes from '../composants/ListeEtiquettes';
import TechRadarChart from '../TechRadar';
import ModifEtiquette from '../ModifEtiquette';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from '../composants/MarkdownEditor';
import { tabConfig } from '../config/config';
import { tableauFusionne, arraysAreEqual } from '../utils/arrayUtils';
import { ErrorBoundary } from '../composants/ErrorBoundary';
import { trierParTimestampDecroissant, filtrerObjetsMalRenseignes, filtrerObjetsBienRenseignes, getEtiquetteWithIn } from '../utils/etiquettesUtils';
// Créez un nouveau Context
export const EtiquetteContext = createContext();
export const FilteredEtiquetteContext = createContext();
/**
 * 
 * @param {*} props 
 * @returns 
 */
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const HomePage = ({ veille, tuyau }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  // Etiquette marquée pour modification (tab 1)
  const [markedEtiquette, setMarkedEtiquette] = useState(null);
  // Etiquette en modification (tab 0)
  const [selectedEtiquette, setSelectedEtiquette] = useState(null);
  // Etiquette filtrée tab 1
  const [secondTabEtiquettes, setsecondTabEtiquettes] = useState(null);
  // Etiquettes présentées en tab 0
  const [firstTabEtiquette, setFirstTabEtiquette] = useState(null)
  // Année sélectionnée 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // Etiquette presentant l'article à lire
  const [shownEtiquetteId, setShownEtiquetteId] = useState(null);
  // choix pris dans la tab de recherche 
  const searched = useRef({
    start: null,
    end: null,
    key: null
  });
  // eventuellement la valeur dans l'editeur de markdown 
  const markdown = useRef({
    text: null,
  });
  /**
   * 
   * @param {*} event 
   */
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear; year++) {
      years.push(<MenuItem key={year} value={year}>{year}</MenuItem>);
    }
    return years;
  };

  /**
   * 
   * @param {*} event 
   * @param {*} newValue 
   */
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  /**
   * 
   * @param {*} etiquette 
   * @param {*} index 
   */
  const handleEtiquetteClick = (etiquette, index) => {
    if (selectedTab === tabConfig.indexOf("Completion")) {
      console.log("Setting selected ", etiquette, " on tab ", selectedTab)
      if (selectedEtiquette && selectedEtiquette.objectId === etiquette.objectId) setSelectedEtiquette(null)
      else {
        const selectedEtiquetteElement = document.getElementById(`etiquette-${index}`);
        const offsetTop = selectedEtiquetteElement.offsetTop;
        setSelectedEtiquette({ ...etiquette, offsetTop: offsetTop });
      }
    }
    else if (selectedTab === tabConfig.indexOf("Recherche")) {
      console.log("Setting marked ", etiquette, " on tab ", selectedTab)
      if (markedEtiquette && markedEtiquette.objectId === etiquette.objectId) setMarkedEtiquette(null)
      else {
        setMarkedEtiquette(etiquette)
        setSelectedTab(tabConfig.indexOf("Completion"));
      }
    }
  };
  /**
   * Au changement de tab pour ==>1 plus de selected
   * 
   */
  useEffect(() => {
    if (selectedTab === 1) setSelectedEtiquette(null)
  }, [selectedTab])
  /**
   * 
   * @param {*} start 
   * @param {*} end 
   * @param {*} key 
   */
  const handleFilteredClick = (start, end, key) => {
    searched.current = {
      start: start,
      end: end,
      key: key
    };
    setSecondTabEtiquettes(start, end, key);
  }
  /**
   * Donne les étiquettes a représenter sur le second tab 
   * @param {*} start 
   * @param {*} end 
   * @param {*} key 
   */
  const setSecondTabEtiquettes = (start, end, key) => {
    let res = [];
    console.log("Key=" + key)
    if (!key) setsecondTabEtiquettes(res)
    else {
      let t1, t2;
      if (start) {
        t1 = Math.floor(start.getTime());
      }
      else t1 = Math.floor(new Date(2010, 0, 1).getTime());
      if (end) {
        t2 = Math.floor(end.getTime());
      }
      else t2 = Math.floor(new Date().getTime());
      console.log("Search between ", t1, "and ", t2, " for keyword " + key);
      trierParTimestampDecroissant(tableauFusionne(veille, tuyau)).forEach((elt) => {
        const { subject, timestamp } = JSON.parse(JSON.stringify(elt));
        if (timestamp > t1 && timestamp < t2) {
          if (arraysAreEqual(subject, key)) res.push(elt);
        }
      })
      setsecondTabEtiquettes(res)
    }
  }

  useEffect(() => {
    setSecondTabEtiquettes(searched.current.getSecondTabEtiquettesstart, searched.current.end, searched.current.key)

  }, [tuyau, veille]);

  useEffect(() => {
    let fusion = trierParTimestampDecroissant(tableauFusionne(veille, tuyau));
    let malrenseignes = filtrerObjetsMalRenseignes(fusion)
    if (markedEtiquette) {
      malrenseignes.unshift(markedEtiquette);
    }
    setFirstTabEtiquette(malrenseignes)
  }, [veille, tuyau, markedEtiquette]);

  /**
   * Au démarrage on part sur la recherche
   */
  useEffect(() => {
    setSelectedTab(tabConfig.indexOf("Recherche"))
  }, []);
  /**
   * 
   * @param {*} val 
   */
  const setMarkdown = (val) => {
    markdown.current.text = val;
  }
  /**
   * 
   * @param {*} sujetFinal 
   * @param {*} canal 
   * @param {*} timestamp 
   */
  const onModifForMarkdown = (sujetFinal, canal, timestamp) => {
    const tabnewvalues = [
      { champ: 'Date', valeurchamp: timestamp },
      // on passe un tableau car subjects est un tableau
      { champ: 'subjects', valeurchamp: sujetFinal },
      { champ: 'channel_name', valeurchamp: canal },
      { champ: 'text', valeurchamp: markdown.current.text },
      // a voir pour inclure un tableau d'urls
      { champ: 'url', valeurchamp: trouverUrls(markdown.current.text)[0] },
    ];
    modifyElementInClassWithId(getClassWithChannel(canal), selectedEtiquette.objectId, tabnewvalues, () => {
      console.log("Done");
    }, (err) => {
      console.log("Error");
    });
  }

  /**
   * Affichage de la premiere vue tabulaire
   * @returns 
   */
  const getFirstTab = () => {
    if (firstTabEtiquette && firstTabEtiquette.length === 1) return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <ListeEtiquettes etiquettes={firstTabEtiquette} />
          </div>
          <div style={{ flex: 1 }}>
            <ModifEtiquette onModifForMarkdown={onModifForMarkdown} />
          </div>
        </div>
        <div className="markdown" style={{ width: '100%' }}>
          <MarkdownEditor setMarkdown={setMarkdown} />
        </div>
      </div>
    )
    else return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <ListeEtiquettes etiquettes={firstTabEtiquette} />
        </div>
        <div style={{ flex: 1 }}>
          <ModifEtiquette />
        </div>
      </div>
    )
  }



  return (
    <EtiquetteContext.Provider value={{ selectedEtiquette, markedEtiquette, handleEtiquetteClick, selectedTab, setSelectedTab, setShownEtiquetteId, firstTabEtiquette }}>
      <ErrorBoundary>
        <Container maxWidth="xl" >
          <Typography variant="h2" gutterBottom>
            Bienvenue à la veille (et aux tuyaux) du pôle MLD
          </Typography>
          <Typography variant="body1">
            Cherchez, Modifiez des articles de veille ou bien des astuces
          </Typography>
          <Paper>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
            >
              {tabConfig.map((label) => (
                <Tab key={label} label={label} />
              ))}

            </Tabs>
          </Paper>
          <TabPanel value={selectedTab} index={0}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <FilteredEtiquetteContext.Provider value={{ secondTabEtiquettes, handleFilteredClick }}>
                <div style={{ flex: 2 }}>
                  <ListeEtiquettes etiquettes={secondTabEtiquettes} />
                </div>
                <div style={{ flex: 1 }}>
                  <SearchComponent />
                </div>
              </FilteredEtiquetteContext.Provider>
            </div>

          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            {getFirstTab()}
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            {shownEtiquetteId ?
              <ReactMarkdown>{getEtiquetteWithIn(shownEtiquetteId, tableauFusionne(veille, tuyau)) ? getEtiquetteWithIn(shownEtiquetteId, tableauFusionne(veille, tuyau)).text : ""}</ReactMarkdown>
              : <></>}
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  style={{ marginLeft: '20px' }}
                >
                  {getYearOptions()}
                </Select>
              </div>
              <div style={{ flex: 2 }}>
                <TechRadarChart selectedYear={selectedYear} etiquettes={filtrerObjetsBienRenseignes(tableauFusionne(veille, tuyau))} />
              </div>
            </div>
          </TabPanel>
        </Container>
      </ErrorBoundary>
    </EtiquetteContext.Provider >
  );
};

export default HomePage;
