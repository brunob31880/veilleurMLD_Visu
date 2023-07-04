import { classification } from "../config/config";
const moment = require('moment');
/**
 * 
 * @param {*} etiquettes 
 * @param {*} daterange 
 * @returns 
 */
export function generateData(etiquettes, daterange) {
    let tmp = [];
    const startDate = daterange[0];
    const endDate = daterange[1];
    etiquettes.forEach(etiquette => {
        const timestamp = etiquette.timestamp;
        const etiquetteDate = new Date(timestamp);
        if (etiquetteDate >= startDate && etiquetteDate <= endDate) {
            etiquette.subject.forEach(suj => {
                tmp.push({
                    text: suj,
                    value: 0
                });
            });
        }
    });

    const compteurSujets = {};
    for (const element of tmp) {
        const sujet = element.text;
        if (compteurSujets[sujet]) {
            compteurSujets[sujet]++;
        } else {
            compteurSujets[sujet] = 1;
        }
    }

    let tmp2 = [];
    for (const clé in compteurSujets) {
        if (compteurSujets.hasOwnProperty(clé)) {
            const valeur = compteurSujets[clé];
            tmp2.push({ text: clé, value: valeur * 100 / tmp.length });
        }
    }

    return tmp2;
}
/**
 * 
 * @param {*} etiquettes 
 * @param {*} daterange 
 * @returns 
 */
export function generateDataCategory(etiquettes, daterange) {
    const categories = Object.keys(classification);
    const tmp = [];
    const startDate = daterange[0];
    const endDate = daterange[1];
    etiquettes.forEach(etiquette => {
        const { subject } = etiquette;
        const timestamp = etiquette.timestamp;
        const etiquetteDate = new Date(timestamp);
        if (etiquetteDate >= startDate && etiquetteDate <= endDate) {
            categories.forEach(category => {
                const keywords = classification[category];
                if (keywords.some(keyword => subject.includes(keyword))) {
                    tmp.push({ text: category, value: 0 });
                }
            });
        }
    });

    const compteurSujets = {};
    for (const element of tmp) {
        const sujet = element.text;
        if (compteurSujets[sujet]) {
            compteurSujets[sujet]++;
        } else {
            compteurSujets[sujet] = 1;
        }
    }

    const tmp2 = [];
    for (const clé in compteurSujets) {
        if (compteurSujets.hasOwnProperty(clé)) {
            const valeur = compteurSujets[clé];
            tmp2.push({ text: clé, value: valeur * 100 / tmp.length });
        }
    }

    return tmp2;
}
/**
 * 
 * @param {*} etiquettes 
 * @param {*} daterange 
 * @returns 
 */
export function generateTimeData(etiquettes, daterange) {
    // Convertir les dates en objets moment
    let start = moment(daterange[0]);
    let end = moment(daterange[1]);

    // Créer le tableau de sortie
    let data = [];

    // Boucle pour chaque mois entre le début et la fin
    for (let m = moment(start); m.isBefore(end) || m.isSame(end); m.add(1, 'month')) {
        // Ajouter l'objet avec le nom du mois et de l'année au tableau
        data.push({ "name": m.format('MMMM-YYYY') });
    }

    etiquettes.forEach(etiquette => {
        const timestamp = etiquette.timestamp;
        const etiquetteDate = moment(timestamp);
        const etiquetteMonthYear = etiquetteDate.format('MMMM-YYYY');

        // Trouver l'objet dans le tableau data qui correspond à la date de l'étiquette
        let dataObject = data.find(obj => obj.name === etiquetteMonthYear);

        // Si un objet correspondant est trouvé
        if (dataObject) {
            // Parcourir chaque sujet dans l'étiquette
            etiquette.subject.forEach(subject => {
                // Si le sujet existe déjà dans l'objet, incrémenter sa valeur
                if (dataObject[subject]) {
                    dataObject[subject]++;
                }
                // Sinon, ajouter le sujet à l'objet avec une valeur de 1
                else {
                    dataObject[subject] = 1;
                }
            });
        }
    });

   return data;
}

/**
 * 
 * @param {*} subject 
 * @returns 
 */
export function getCategory(subject) {
    // Parcourir chaque catégorie dans l'objet classification
    for (let category in classification) {
        // Si le sujet est dans la liste de sujets pour cette catégorie
        if (classification[category].includes(subject)) {
            // Retourner le nom de la catégorie
            return category;
        }
    }
    // Si le sujet n'est pas trouvé dans aucune catégorie, retourner une valeur par défaut
    return "Non classifié";
}

/**
 * 
 * @param {*} etiquettes 
 * @param {*} daterange 
 * @returns 
 */
export function generateTimeCategoryData(etiquettes, daterange) {
    // Convertir les dates en objets moment
    let start = moment(daterange[0]);
    let end = moment(daterange[1]);
    const categories = Object.keys(classification);
    // Créer le tableau de sortie
    let data = [];

    // Boucle pour chaque mois entre le début et la fin
    for (let m = moment(start); m.isBefore(end) || m.isSame(end); m.add(1, 'month')) {
        // Ajouter l'objet avec le nom du mois et de l'année au tableau
        data.push({ "name": m.format('MMMM-YYYY') });
    }

    etiquettes.forEach(etiquette => {
        const timestamp = etiquette.timestamp;
        const etiquetteDate = moment(timestamp);
        const etiquetteMonthYear = etiquetteDate.format('MMMM-YYYY');

        // Trouver l'objet dans le tableau data qui correspond à la date de l'étiquette
        let dataObject = data.find(obj => obj.name === etiquetteMonthYear);

        // Si un objet correspondant est trouvé
        if (dataObject) {
            // Parcourir chaque sujet dans l'étiquette
            etiquette.subject.forEach(subject => {
                let cat=getCategory(subject);
                // Si le sujet existe déjà dans l'objet, incrémenter sa valeur
                if (dataObject[cat]) {
                    dataObject[cat]++;
                }
                // Sinon, ajouter le sujet à l'objet avec une valeur de 1
                else {
                    dataObject[cat] = 1;
                }
            });
        }
    });

   return data;
}
/**
 * 
 * @param {*} data 
 * @param {*} numFields 
 * @returns 
 */
export function getMostRepresentativeFields(data, numFields) {
    // Créer un objet pour compter les occurrences de chaque champ
    let counts = {};


    // Parcourir chaque objet dans le tableau
    for (let obj of data) {
        // Parcourir chaque champ dans l'objet
        for (let champ in obj) {
            // Vérifier si le champ est une combinaison de mois et d'année
            if (champ!=="name") {
                //console.log("CHAMP=" + champ )
                // Si le champ existe déjà dans l'objet counts, ajouter la valeur à son total
                if (counts[champ]) {
                    counts[champ] += obj[champ];
                }
                // Sinon, ajouter le champ à l'objet counts avec la valeur actuelle
                else {
                    counts[champ] = obj[champ];
                }
            }
        }
    }
   
    // Convertir l'objet counts en un tableau de paires [champ, count]
    let pairs = Object.entries(counts);

    // Trier le tableau par count en ordre décroissant
    pairs.sort((a, b) => b[1] - a[1]);

    // Prendre les numFields premières paires du tableau (les champs les plus courants)
    let topFields = pairs.slice(0, numFields);

    return topFields;
}
