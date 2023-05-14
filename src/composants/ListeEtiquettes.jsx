import React, { useContext } from 'react';
import Etiquette from './Etiquette';
import { EtiquetteContext } from '../pages/HomePage'; // Assurez-vous que le chemin d'importation est correct

const ListeEtiquettes = ({ etiquettes }) => {

    console.log("Etiquettes=", etiquettes);
    const { handleEtiquetteClick } = useContext(EtiquetteContext);
    const handleClick = (etiquette) => {
        handleEtiquetteClick(etiquette);
    };

    return (
        <div>
            {etiquettes && etiquettes.map((etiquette, index) => (
                <div onClick={() => handleClick(etiquette)} key={index}>
                    <Etiquette
                        id={etiquette.id}
                        date={etiquette.timestamp}
                        canal={etiquette.channel_name}
                        sujet={etiquette.subject}
                        texte={etiquette.text}
                    />
                </div>
            ))}
        </div>
    );
};

export default ListeEtiquettes;
