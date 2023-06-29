import { classification } from "../config/config";
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
