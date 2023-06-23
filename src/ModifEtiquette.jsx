import React, { useState, useEffect, useContext } from 'react';
import { Button, FormControl, TextField, Select, MenuItem, Container, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { EtiquetteContext } from './pages/HomePage';
import { modifyElementInClassWithId } from './utils/parseUtils';
import { trouverUrls } from './utils/textUtils';
import { getClassWithChannel } from './utils/mtmUtils';
import VeilleTuyauContext from './VeilleTuyauContext';



const ModifEtiquette = () => {
    const [date, setDate] = useState(null);
    const [canal, setCanal] = useState('');
    const [sujet, setSujet] = useState([]);
    const [texte, setTexte] = useState('');
    const { selectedEtiquette } = useContext(EtiquetteContext);
    const { subjects } = useContext(VeilleTuyauContext); //
    const [nouveauSujet, setNouveauSujet] = useState('');
    

    useEffect(() => {
        if (selectedEtiquette) {
            console.log("Selected ", selectedEtiquette)
            // Convertir le timestamp en date
            const formattedDate = new Date(selectedEtiquette.timestamp);
            setDate(formattedDate);
            setCanal(selectedEtiquette.channel_name);
            setSujet(selectedEtiquette.subject);
            setTexte(selectedEtiquette.text);
            setNouveauSujet('');
        }
    }, [selectedEtiquette]);
    /**
     * 
     * @param {*} date 
     */
    const handleDateChange = (date) => {
        console.log("Setting date ", date);
        setDate(date);
    };

    const handleCanalChange = (event) => {
        setCanal(event.target.value);
    };
    /**
     * 
     * @param {*} event 
     */
    const handleSujetChange = (event) => {
        setSujet(Array.isArray(event.target.value) ? event.target.value : [event.target.value]);
        setNouveauSujet(''); // Réinitialiser la valeur du nouveau sujet
    };

    const handleTexteChange = (event) => {
        setTexte(event.target.value);
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        // Utiliser soit le sujet sélectionné, soit le nouveau sujet
        const sujetFinal = nouveauSujet !== '' ? [nouveauSujet] : sujet;


        const timestamp = Math.floor(date.getTime() / 1000);
        //console.log(trouverUrls(texte));
        const tabnewvalues = [
            { champ: 'Date', valeurchamp: timestamp },
            // on passe un tableau car subjects est un tableau
            { champ: 'subjects', valeurchamp: sujetFinal },
            { champ: 'channel_name', valeurchamp: canal },
            { champ: 'text', valeurchamp: texte },
            // a voir pour inclure un tableau d'urls
            { champ: 'url', valeurchamp: trouverUrls(texte)[0] },
        ];
        modifyElementInClassWithId(getClassWithChannel(canal), selectedEtiquette.objectId, tabnewvalues, () => {
            console.log("Done");
        }, (err) => {
            console.log("Error");
        });

    };
 
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container fixed={true} maxWidth="sm" style={{ marginTop: selectedEtiquette ? (selectedEtiquette.offsetTop - 400 > 0 ? selectedEtiquette.offsetTop - 400 : 0) : 0 }}>
                {selectedEtiquette &&
                    <>
                        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                            Modification
                        </Typography>
                        <form onSubmit={handleSubmit} style={{border: '2px solid rgb(10, 14, 74)',borderRadius:'5px', padding: '10px'}}>
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
                                <Select
                                    multiple
                                    value={sujet}
                                    onChange={handleSujetChange}

                                >
                                    <MenuItem value="">Sélectionnez un sujet</MenuItem>
                                    {subjects.map((sujet) => (
                                        <MenuItem key={sujet} value={sujet}>
                                            {sujet}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField placeholder="Nouveau sujet" value={nouveauSujet} onChange={(event) => setNouveauSujet(event.target.value)} />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField placeholder="Texte" value={texte} onChange={handleTexteChange} />
                            </FormControl>

                            <Button sx={{
                                backgroundColor: '#06090D',
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#0A1218',
                                },
                            }} variant="contained" fullWidth type="submit">
                                Soumettre
                            </Button>
                        </form>
                    </>}
            </Container>
        </LocalizationProvider>
    );
};

export default ModifEtiquette;
