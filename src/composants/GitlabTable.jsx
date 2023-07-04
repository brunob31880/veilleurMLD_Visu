import React from 'react';
import { Typography } from '@mui/material';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const GitlabTable = ({ daterange, gitlab }) => {
    /**
     * 
     * @param {*} data 
     * @param {*} daterange 
     * @returns 
     */
    const generateReactTable = (data, daterange) => {
        // Sélectionner les objets dont la date de création du projet est comprise entre daterange[0] et daterange[1]
        let filteredData = data.filter(obj => {
            let date = new Date(obj.project_creation);
            return date >= new Date(daterange[0]) && date <= new Date(daterange[1]);
        });
        // Styles pour le tableau
        let tableStyle = {
            border: "1px solid black",
            borderCollapse: "collapse"
        };

        // Styles pour les cellules du tableau
        let cellStyle = {
            border: "1px solid black",
            padding: "5px"
        };
        // Générer le tableau en utilisant la syntaxe React
        // Générer le tableau en utilisant la syntaxe React
        return (
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Project Creation</th>
                        <th style={cellStyle}>Framework/Languages</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(obj => {
                        let name = obj.name;
                        let projectCreation = obj.project_creation;
                        let frameworkOrLanguages = obj.framework ? obj.framework : Object.keys(obj.langages).join(", ");

                        // Convertir frameworkOrLanguages en une chaîne de caractères si nécessaire
                        if (typeof frameworkOrLanguages === 'object' && frameworkOrLanguages !== null) {
                            frameworkOrLanguages = JSON.stringify(frameworkOrLanguages);
                        }

                        return (
                            <tr key={name}>
                                <td style={cellStyle}>{name}</td>
                                <td style={cellStyle}>{projectCreation}</td>
                                <td style={cellStyle}>{frameworkOrLanguages}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
    const formatDate = (date) => {
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    const formattedDateRange = `${formatDate(daterange[0])}-${formatDate(daterange[1])}`;

    return (
        <>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Projet(s) gitlab sur la période {formattedDateRange}
            </Typography>
            {generateReactTable(gitlab, daterange)}
        </>
    )
}

export default GitlabTable;