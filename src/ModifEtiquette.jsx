import React, { useState, useEffect, useContext } from 'react';
import { Button, FormControl,  TextField, Select, MenuItem, Container, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { EtiquetteContext } from './pages/HomePage';
const sujets = ['Sujet 1', 'Sujet 2', 'Sujet 3', 'Sujet 4'];

const ModifEtiquette = () => {
    const [date, setDate] = useState(null);
    const [canal, setCanal] = useState('');
    const [sujet, setSujet] = useState('');
    const [texte, setTexte] = useState('');
    const { selectedEtiquette } = useContext(EtiquetteContext);

    useEffect(() => {
        if (selectedEtiquette) {
            // Convertir le timestamp en date
            const formattedDate = new Date(selectedEtiquette.timestamp).toLocaleDateString('fr-FR');
            setDate(formattedDate);
            setCanal(selectedEtiquette.channel_name);
            setSujet(selectedEtiquette.sujet);
            setTexte(selectedEtiquette.text);
        }
    }, [selectedEtiquette]);

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleCanalChange = (event) => {
        setCanal(event.target.value);
    };

    const handleSujetChange = (event) => {
        setSujet(event.target.value);
    };

    const handleTexteChange = (event) => {
        setTexte(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Effectuer une action avec les valeurs sélectionnées
        console.log('Date:', date);
        console.log('Canal:', canal);
        console.log('Sujet:', sujet);
        console.log('Texte:', texte);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container maxWidth="sm">
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                    Modification
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <DatePicker
                            label="Date"
                            value={date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField placeholder="Canal" value={canal} onChange={handleCanalChange} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Select value={sujet} onChange={handleSujetChange}>
                            <MenuItem value="">Sélectionnez un sujet</MenuItem>
                            {sujets.map((sujet) => (
                                <MenuItem key={sujet} value={sujet}>
                                    {sujet}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField placeholder="Texte" value={texte} onChange={handleTexteChange} />
                    </FormControl>
                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Soumettre
                    </Button>
                </form>
            </Container>
        </LocalizationProvider>
    );
};

export default ModifEtiquette;
