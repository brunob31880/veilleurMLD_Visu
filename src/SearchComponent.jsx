import React, { useState, useContext } from 'react';
import { Button, FormControl, InputLabel, Container, Typography, TextField, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FilteredEtiquetteContext } from './pages/HomePage';
import VeilleTuyauContext from './VeilleTuyauContext';


const SearchComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState([]);
  const [keywordCondition, setKeywordCondition] = useState("ET"); // Ajout de cet état
  const { filteredEtiquettes, handleFilteredClick } = useContext(FilteredEtiquetteContext);
  const { subjects } = useContext(VeilleTuyauContext); //


  /**
   * 
   * @param {*} date 
   */
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  /**
   * 
   * @param {*} date 
   */
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  /**
   * 
   * @param {*} event 
   */
  const handleKeywordChange = (event) => {
    setSelectedKeyword(event.target.value);
  };
  /**
   * 
   * @param {*} event 
   */
  const handleConditionChange = (event) => {
    setKeywordCondition(event.target.value);
  };
  /**
   * 
   * @param {*} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuer une action avec les valeurs sélectionnées
    //console.log('StartDate:', startDate);
    //console.log('EndDate:', endDate);
    //console.log('SelectedKeyword:', selectedKeyword);
    handleFilteredClick(startDate, endDate, selectedKeyword,keywordCondition)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container fixed={true} maxWidth="sm">
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          {filteredEtiquettes ? (`Recherche ${filteredEtiquettes.length} resultat(s)`) : 'Recherche'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ border: '2px solid rgb(10, 14, 74)', borderRadius: '5px', padding: '10px' }}>
          <FormControl fullWidth margin="normal">
            <DatePicker
              label="Début"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <DatePicker
              label="Fin"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
            />
          </FormControl>
          {selectedKeyword.length > 1 && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Condition</InputLabel>
              <Select
                value={keywordCondition}
                onChange={handleConditionChange}
              >
                <MenuItem value="ET">ET</MenuItem>
                <MenuItem value="OU">OU</MenuItem>
              </Select>
            </FormControl>
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>Sujet(s)</InputLabel>
            <Select
              multiple
              value={selectedKeyword}
              onChange={handleKeywordChange}
            >

              <MenuItem value="">Sélectionnez un ou plusieurs sujet(s)</MenuItem>
              {subjects.map((keyword) => (
                <MenuItem key={keyword} value={keyword}>
                  {keyword}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button sx={{
            backgroundColor: '#06090D',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0A1218',
            },
          }} variant="contained" fullWidth type="submit">
            Rechercher
          </Button>
        </form>
      </Container>
    </LocalizationProvider>
  );
};

export default SearchComponent;
