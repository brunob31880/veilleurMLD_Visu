import React, { useContext } from 'react';
import './Etiquette.css';
import ReactMarkdown from 'react-markdown';
import { configs } from '../config/config';
import { truncateText } from '../utils/textUtils';
import VeilleTuyauContext from '../VeilleTuyauContext';

const Etiquette = ({ id, date, canal, sujet, texte, url, thumbnail, user_name }) => {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR');
    console.log("thumbnail ", thumbnail)
    const { team } = useContext(VeilleTuyauContext); //
    const user = team.find(member => member.user_name === user_name);
    const getShown = () => {
        // Remplacez Opengraph par un composant d'image utilisant la miniature, si elle est disponible
        if (thumbnail) {
            // Si la miniature est une URL
            const thumbnailUrl = thumbnail.url;
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <a href={url} target="_blank" rel="noreferrer">
                        <img src={thumbnailUrl} alt={url} style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
                    </a>
                    <div style={{ flex: 1 }}>
                        <span className="bold">Texte :</span> <ReactMarkdown>{truncateText(texte, 100)}</ReactMarkdown>
                    </div>

                </div>
            )
        } else {
            return (
                <div><span className="bold">Texte :</span> <ReactMarkdown>{texte}</ReactMarkdown></div>
            )
        }
    }




    return (
        <div className="etiquette" style={{ backgroundColor: 'rgb(10, 14, 24)', color: 'white',border:'2px solid rgb(33, 37, 49)' }} >
            <div className="header">
                <span className="bold">Date :</span> {formattedDate} |
                <span className="bold">Canal :</span> {canal} |
                <span className="bold">Sujet :</span> {sujet}
                {user ? (
                    <>
                        <span className="bold">Utilisateur :</span>
                        <img src={user.avatar.url} alt={user_name} style={{ width: '70px', height: '70px', borderRadius: '50%' ,border:'2px solid rgb(52, 170, 114)'}} />
                    </>
                ) : (
                    <>
                        <span className="bold">Utilisateur :</span> {user_name}
                    </>
                )}
            </div>
            {getShown()}
        </div>




    );
};

export default Etiquette;
