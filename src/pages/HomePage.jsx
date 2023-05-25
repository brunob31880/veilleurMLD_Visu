import React, { createContext, useState } from 'react';
import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import SearchComponent from '../SearchComponent';
import ListeEtiquettes from '../composants/ListeEtiquettes';
import TechRadarChart from '../TechRadar';
import ModifEtiquette from '../ModifEtiquette';

// Créez un nouveau Context
export const EtiquetteContext = createContext();

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
  const [selectedEtiquette, setSelectedEtiquette] = useState(null);
  console.log("Veille", veille)
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleEtiquetteClick = (etiquette) => {
    setSelectedEtiquette(etiquette);
  };
  return (
    <EtiquetteContext.Provider value={{ selectedEtiquette, handleEtiquetteClick }}>
      <Container maxWidth="xl">
        <Typography variant="h2" gutterBottom>
          Bienvenue à la veille du pôle MLD
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
            <Tab label="TechRadar" />
            <Tab label="Recherche" />
          </Tabs>
        </Paper>
        <TabPanel value={selectedTab} index={0}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <ListeEtiquettes etiquettes={veille} />
            <ModifEtiquette />
          </div>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <TechRadarChart />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <ListeEtiquettes etiquettes={veille} />
            <SearchComponent />
          </div>
        </TabPanel>
      </Container>
    </EtiquetteContext.Provider>
  );
};

export default HomePage;
