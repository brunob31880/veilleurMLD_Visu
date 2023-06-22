import React, { createContext, useState } from 'react';

import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import SearchComponent from '../SearchComponent';
import ListeEtiquettes from '../composants/ListeEtiquettes';
import TechRadarChart from '../TechRadar';
import ModifEtiquette from '../ModifEtiquette';
import { tableauFusionne } from '../utils/arrayUtils';
import { filtrerObjetsMalRenseignes, filtrerObjetsBienRenseignes } from '../utils/etiquettesUtils';
// Créez un nouveau Context
export const EtiquetteContext = createContext();
// Créez un nouveau Context
export const FilteredEtiquetteContext = createContext();
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
  const [filteredEtiquettes, setFilteredEtiquettes] = useState(null);
  
  //console.log("Veille", veille)
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
 
  // const location = useLocation();
  const handleEtiquetteClick = (etiquette, index) => {
    if (selectedTab === 0) {
      console.log("Setting selected ", etiquette, " on tab ", selectedTab)
      if (selectedEtiquette && selectedEtiquette.objectId === etiquette.objectId) setSelectedEtiquette(null)
      else {
        const selectedEtiquetteElement = document.getElementById(`etiquette-${index}`);
        const offsetTop = selectedEtiquetteElement.offsetTop;
        setSelectedEtiquette({ ...etiquette, offsetTop: offsetTop });
        // console.log("OffsetTop: " + offsetTop)
      }
    }
    else if (selectedTab === 1) {
      console.log("Setting marked ", etiquette, " on tab ", selectedTab)
      if (markedEtiquette && markedEtiquette.objectId === etiquette.objectId) setMarkedEtiquette(null)
      else setMarkedEtiquette(etiquette)
    }
  };
  /**
   * 
   */
  const handleFilteredClick = (start, end, key) => {
    let res = [];
    console.log("Search between ", start, "and ", end, " for keyword " + key);
    const t1 = Math.floor(start.getTime());
    const t2 = Math.floor(end.getTime());
    console.log("Search betweenn ", t1, "and ", t2);
    tableauFusionne(veille, tuyau).forEach((elt) => {
      console.log("Element ", elt)
      const { objectId, channel_name, user_name, subject, text, timestamp, url } = JSON.parse(JSON.stringify(elt));
      console.log(subject + ' ' + key, ' timestamp ' + timestamp + ' t1 ' + t1 + ' t2 ' + t2)
      if (timestamp > t1 && timestamp < t2 && subject.indexOf(key) !== -1) res.push(elt);
    })
    setFilteredEtiquettes(res)
  }

  const getFilteredEtiquettes = () => {
    let fusion = tableauFusionne(veille, tuyau);
    let malrenseignes = filtrerObjetsMalRenseignes(fusion)
    if (markedEtiquette) {
      malrenseignes.unshift(markedEtiquette);
    }
    return malrenseignes
  }

  return (
    <EtiquetteContext.Provider value={{ selectedEtiquette, markedEtiquette, handleEtiquetteClick }}>
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
            <Tab label="Completion" />
            <Tab label="Recherche" />
            <Tab label="TechRadar" />
          </Tabs>
        </Paper>
        <TabPanel value={selectedTab} index={0}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} >
            <div style={{ flex: 2 }}>
              <ListeEtiquettes etiquettes={getFilteredEtiquettes()} />
            </div>
            <div style={{ flex: 1 }}>
              <ModifEtiquette />
            </div>
           
          </div>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <FilteredEtiquetteContext.Provider value={{ filteredEtiquettes, handleFilteredClick }}>
              <div style={{ flex: 2 }}>
                <ListeEtiquettes etiquettes={filteredEtiquettes} />
              </div>
              <div style={{ flex: 1 }}>
                <SearchComponent />
              </div>
            </FilteredEtiquetteContext.Provider>
          </div>
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TechRadarChart etiquettes={filtrerObjetsBienRenseignes(tableauFusionne(veille, tuyau))} />
          </div>
        </TabPanel>
      </Container>
    </EtiquetteContext.Provider>
  );
};

export default HomePage;
