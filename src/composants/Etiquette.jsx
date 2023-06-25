import React, { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { estChampVide } from '../utils/etiquettesUtils';
import { truncateText } from '../utils/textUtils';
import VeilleTuyauContext from '../VeilleTuyauContext';
import { EtiquetteContext } from '../pages/HomePage';
import { Menu, MenuItem } from '@mui/material';
import { getClassWithChannel } from '../utils/mtmUtils';
import { deleteElementInClassWithId } from '../utils/parseUtils';
import './Etiquette.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Etiquette = ({ objectId, date, canal, sujet, texte, url, thumbnail, user_name, handleOpenMenu }) => {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR');
    ///console.log("thumbnail ", thumbnail)
    // recupération du contexte au niveau de la racine (équipe)
    const { team } = useContext(VeilleTuyauContext);
    // recupération du contexte au niveau de la home page
    const { markedEtiquette, selectedEtiquette, selectedTab,setShownEtiquetteId,setSelectedTab } = useContext(EtiquetteContext);
    //console.log("ObjectID: " + objectId, " markedEtiquette: ", markedEtiquette, " selectedEtiquette:", selectedEtiquette);
    const user = team ? team.find(member => member.user_name === user_name) : [];

    const getClassName = () => {
        if (selectedEtiquette && selectedEtiquette.objectId === objectId) return "etiquette selected"
        else if (markedEtiquette && markedEtiquette.objectId === objectId) return "etiquette marked"
        else return "etiquette normal"
    }

    const getShown = () => {
        // Remplacez Opengraph par un composant d'image utilisant la miniature, si elle est disponible
        if (thumbnail) {
            // Si la miniature est une URL
            const thumbnailUrl = thumbnail.url;
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <a href={url} target="_blank" rel="noreferrer">
                        <img src={thumbnailUrl} alt={url} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                    </a>
                    <div style={{ flex: 1 }}>
                        <span className="bold">Texte :</span> <ReactMarkdown>{truncateText(texte, 100)}</ReactMarkdown>
                    </div>
                </div>
            )
        } else {
            return (
                <div><span className="bold">Texte :</span> <ReactMarkdown>{truncateText(texte, 100)}</ReactMarkdown></div>
            )
        }
    }

    const sujetClassName = estChampVide(sujet) ? "bold red" : "bold";
    //const texteClassName = estChampVide(texte) ? "red" : "";

    // Ajoutez ces deux états pour contrôler le menu popup
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const open = Boolean(anchorEl);
    /**
     * 
     * @param {*} event 
     */
    const handleRightClick = (event) => {
        event.preventDefault(); // Empêche l'affichage du menu contextuel par défaut du navigateur
        event.stopPropagation(); // Empêche l'événement de se propager aux gestionnaires de clic
        // faire savoir au parent (listeEtiquettes) que le Menu ets ouvert
        handleOpenMenu(true, "");
        setAnchorEl(event.currentTarget);
        setMenuPosition({ top: event.clientY, left: event.clientX });
    };

    /**
     * 
     */
    const handleClose = () => {
        setAnchorEl(null);
        handleOpenMenu(false);
    };
   
    const handleDelete = () => {
        handleOpenMenu(true, "delete");
        deleteElementInClassWithId(getClassWithChannel(canal), objectId, () => {
            console.log("Done");
        }, (err) => {
            console.log("Error");
        });
        handleClose();
    }

    const handleModifier = () => {
        handleOpenMenu(true, "modify");
        setSelectedTab(0);
        handleClose();
    }
    const handleAfficher = () => {
        handleOpenMenu(true, "show");
        setShownEtiquetteId(objectId)
        setSelectedTab(3);
        handleClose();
    }

    const getMenuItems = () => {
        return selectedTab === 0 ? [
          <MenuItem key="effacer" onClick={handleDelete}>Effacer</MenuItem>,
          <MenuItem key="selectionner" onClick={handleAfficher}>Afficher</MenuItem>
        ] :
        [
          <MenuItem key="afficher" onClick={handleAfficher}>Afficher</MenuItem>,
          <MenuItem key="modifier" onClick={handleModifier}>Modifier</MenuItem>
        ];
      };
      
    return (
        <div className={getClassName()} style={{
            color: 'white',
            border: '2px solid rgb(33, 37, 49)'
        }} onContextMenu={handleRightClick}>
            <div className="header">
                <span className="bold">Date :</span> {formattedDate} |
                <span className="bold">Canal :</span> {canal} |
                <span className={sujetClassName}>Sujet :</span> {sujet.toString()}
                {user && user.avatar ? (
                    <>
                        <span className="bold">Utilisateur :</span>
                        <img src={user.avatar.url} alt={user_name} style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid rgb(52, 170, 114)' }} />
                    </>
                ) : (
                    <>
                        <span className="bold">Utilisateur :</span> {user_name}
                    </>
                )}
            </div>
            {getShown()}
            <Menu
                id="simple-menu"
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {getMenuItems()}
            </Menu>
        </div>




    );
};

export default Etiquette;
