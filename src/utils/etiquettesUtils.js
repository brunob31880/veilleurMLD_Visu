
/**
 * 
 * @param {*} tableau 
 * @returns 
 */
export function filtrerObjetsMalRenseignes(tableau) {
    var objetsMalRenseignes = tableau.filter(function (objet) {
        var texteVide = objet.text === "";
        var pasDeFichier = objet.thumbnail === null;
        var tableauVide = Array.isArray(objet.subject) && objet.subject.length === 0;
        var subjectVide = Array.isArray(objet.subject) && objet.subject[0] === '';

        return texteVide || pasDeFichier || tableauVide || subjectVide;
    });
    //console.log("Entrée:" + tableau.length + " Sortie:" + objetsMalRenseignes.length);
    return objetsMalRenseignes;
}
/**
 * 
 * @param {*} champ 
 * @returns 
 */
export function estChampVide(champ) {
    if (Array.isArray(champ)) {
        if (champ.length === 0 || (champ.length === 1 && champ[0] === "")) {
            return true;
        }
    } else if (typeof champ === 'string') {

        if (champ.trim() === '') {

            return true;
        }
    }
    return !champ;
}
/**
 * 
 * @param {*} tableau 
 * @returns 
 */
export function filtrerObjetsBienRenseignes(tableau) {
    var objetsBienRenseignes = tableau.filter(function (objet) {
        var texteNonVide = objet.text !== "";
        var fichierExistant = objet.thumbnail !== null;
        var tableauNonVide = Array.isArray(objet.subject) && objet.subject.length > 0;
        var premierSujetNonVide = Array.isArray(objet.subject) && objet.subject[0] !== '';
        return texteNonVide && fichierExistant && tableauNonVide && premierSujetNonVide;
    });

    //console.log("Entrée:" + tableau.length + " Sortie:" + objetsBienRenseignes.length);
    return objetsBienRenseignes;
}
/**
 * 
 * @param {*} tableau 
 * @returns 
 */
export function trierParTimestampDecroissant(tableau) {
    return tableau.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
            return 1;
        } else if (a.timestamp > b.timestamp) {
            return -1;
        } else {
            return 0;
        }
    });
}



