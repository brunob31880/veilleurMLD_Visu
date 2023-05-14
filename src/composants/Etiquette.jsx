import React from 'react';
import './Etiquette.css';
import ReactMarkdown from 'react-markdown';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Etiquette = ({ id,date, canal, sujet, texte }) => {
    // Convertir le timestamp en date
    const formattedDate = new Date(date).toLocaleDateString('fr-FR');

    return (
        <div className="etiquette">
            <div><span className="bold">Date :</span> {formattedDate}</div>
            <div><span className="bold">Canal :</span> {canal}</div>
            <div><span className="bold">Sujet :</span> {sujet}</div>
            <div><span className="bold">Texte :</span> <ReactMarkdown>{texte}</ReactMarkdown></div>
        </div>
    );
};

export default Etiquette;
