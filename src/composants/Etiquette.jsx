import React from 'react';
import './Etiquette.css';
import OpengraphReactComponent from 'opengraph-react';
import ReactMarkdown from 'react-markdown';
import { configs } from '../config/config';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Etiquette = ({ id, date, canal, sujet, texte, url }) => {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR');

    const getShown = () => {
        if (url) return (
            <OpengraphReactComponent
                site={url}
                appId={configs.opengraphkey}
                size={'small'}
            />
        )
        else return (
            <div><span className="bold">Texte :</span> <ReactMarkdown>{texte}</ReactMarkdown></div>
        )
    }

    return (
        <div className="etiquette">
            <div className="header">
                <span className="bold">Date :</span> {formattedDate} | 
                <span className="bold">Canal :</span> {canal} | 
                <span className="bold">Sujet :</span> {sujet}
            </div>
            {getShown()}
        </div>
    );
};

export default Etiquette;
