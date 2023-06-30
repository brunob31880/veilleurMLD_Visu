import React from 'react';
import { Typography, TextField, FormControl,Container } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const getDataOptions = () => {
    return [
        <MenuItem key="sujets" value="sujets">
            Sujets
        </MenuItem>,
        <MenuItem key="categories" value="categories">
            Catégories
        </MenuItem>
    ];
};

const getDrawOptions = () => {
    return [
        <MenuItem key="radarchart" value="radarchart">
            RadarChart
        </MenuItem>,
        <MenuItem key="wordcloud" value="wordcloud">
            WordCloud
        </MenuItem>
    ];
};

const GraphSelector = ({ datachoice, drawchoice, startDate, endDate, setDataChoice, setDrawChoice, setStartDate, setEndDate }) => {

    const handleDataChoiceChange = (event) => {
        setDataChoice(event.target.value);
    };

    const handleDrawChoiceChange = (event) => {
        setDrawChoice(event.target.value);
    };

    return (
        <Container fixed={true} maxWidth="sm">
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Graphique et données
            </Typography>
            <Typography variant="h6" style={{ marginLeft: '20px' }}>
                Plage temporelle
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl fullWidth margin="normal">
                    <DatePicker
                        label="Début"
                        value={startDate}
                        onChange={setStartDate}
                        renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <DatePicker
                        label="Fin"
                        value={endDate}
                        onChange={setEndDate}
                        renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
                    />
                </FormControl>
            </LocalizationProvider>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" style={{ marginLeft: '20px', marginTop: '10px' }}>
                        Données
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <Select
                            value={datachoice}
                            onChange={handleDataChoiceChange}
                            style={{ marginLeft: '20px', marginTop: '10px' }}
                        >
                            {getDataOptions()}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" style={{ marginLeft: '20px', marginTop: '10px' }}>
                        Représentation
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <Select
                            value={drawchoice}
                            onChange={handleDrawChoiceChange}
                            style={{ marginLeft: '20px', marginTop: '10px' }}
                        >
                            {getDrawOptions()}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </Container>
    )
}

export default GraphSelector;
