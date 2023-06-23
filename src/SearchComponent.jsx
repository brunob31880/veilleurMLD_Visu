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
  const { handleFilteredClick } = useContext(FilteredEtiquetteContext);
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
  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuer une action avec les valeurs sélectionnées
    console.log('StartDate:', startDate);
    console.log('EndDate:', endDate);
    console.log('SelectedKeyword:', selectedKeyword);
    handleFilteredClick(startDate, endDate, selectedKeyword)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container fixed={true} maxWidth="sm">
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          Recherche
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Mot(s)-clé</InputLabel>
            <Select
              multiple
              value={selectedKeyword}
              onChange={handleKeywordChange}
            >
              <MenuItem value="">Sélectionnez un ou plusieurs mot-clé</MenuItem>
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
