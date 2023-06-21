import React, { useContext } from 'react';
import Etiquette from './Etiquette';
import { EtiquetteContext } from '../pages/HomePage'; // Assurez-vous que le chemin d'importation est correct
import { head} from '../utils/arrayUtils';
const ListeEtiquettes = ({ etiquettes }) => {

    //console.log("Etiquettes=", etiquettes);
    //head(etiquettes,10);
    const { handleEtiquetteClick } = useContext(EtiquetteContext);
    const handleClick = (etiquette) => {
        handleEtiquetteClick(etiquette);
    };

    return (
        <div width="66%">
            {etiquettes && etiquettes.map((etiquette, index) => (
                <div onClick={() => handleClick(etiquette)} key={index}>
                    <Etiquette
                        id={etiquette.id}
                        date={etiquette.timestamp}
                        canal={etiquette.channel_name}
                        sujet={etiquette.subject}
                        user_name={etiquette.user_name}
                        texte={etiquette.text}
                        url={etiquette.url}
                        thumbnail={etiquette.thumbnail}
                    />
                </div>
            ))}
        </div>
    );
};

export default ListeEtiquettes;
