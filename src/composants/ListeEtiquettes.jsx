import React, { useRef, useContext } from 'react';
import Etiquette from './Etiquette';
import { EtiquetteContext } from '../pages/HomePage'; // Assurez-vous que le chemin d'importation est correct
//import { head } from '../utils/arrayUtils';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const ListeEtiquettes = ({ etiquettes }) => {
    const menu = useRef({
        open: false,
        choice: ""
    });

    const { handleEtiquetteClick } = useContext(EtiquetteContext);

    const isMenuOpen = () => menu.current && menu.current.open;

    const isMenuOpenAndChoiceEdition = () => {
        let ret = menu.current && menu.current.open && menu.current.choice === "select"
        console.log("Retour=" + ret + " menu=" + menu.current.open);
        return ret
    };
    /**
     * 
     * @param {*} etiquette 
     * @param {*} index 
     * @param {*} event 
     */
    const handleClick = (etiquette, index, event) => {
        console.log("Event button =" + event.button);
        if (event.button === 0 && (!isMenuOpen() || isMenuOpenAndChoiceEdition())) handleEtiquetteClick(etiquette, index);
    };
    /**
     * 
     * @param {*} bool 
     * @param {*} choice 
     */
    const handleOpenMenu = (bool, choice = "") => {
        console.log("Open=" + bool + " choice " + choice);
        menu.current = {
            open: bool,
            choice: choice
        };
    }

    return (
        <div width="66%">
            {etiquettes && etiquettes.map((etiquette, index) => (
                <div onClick={(event) => handleClick(etiquette, index, event)} key={index} id={`etiquette-${index}`}>
                    <Etiquette
                        objectId={etiquette.objectId}
                        date={etiquette.timestamp}
                        canal={etiquette.channel_name}
                        sujet={etiquette.subject}
                        user_name={etiquette.user_name}
                        texte={etiquette.text}
                        url={etiquette.url}
                        thumbnail={etiquette.thumbnail}
                        handleOpenMenu={handleOpenMenu}
                    />
                </div>
            ))}
        </div>
    );
};

export default ListeEtiquettes;
