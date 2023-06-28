import { classification } from "../config/config";
/**
 * Generate data for radar chart based on etiquettes and year.
 * @param {Array} etiquettes - The etiquettes array.
 * @param {number} year - The year to filter the etiquettes.
 * @returns {Array} - The generated data for the radar chart.
 */
export function generateData(etiquettes, year) {
    let tmp = [];
    etiquettes.forEach(etiquette => {
        const timestamp = etiquette.timestamp;
        const etiquetteYear = new Date(timestamp).getFullYear();
        if (etiquetteYear === year) {
            etiquette.subject.forEach(suj => {
                tmp.push({
                    subject: suj,
                    A: 0
                });
            });
        }
    });

    const compteurSujets = {};
    for (const element of tmp) {
        const sujet = element.subject;
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
            tmp2.push({ subject: clé, A: valeur * 100 / tmp.length });
        }
    }

    return tmp2;
}
export function generateDataCategory(etiquettes, year) {

    const categories = Object.keys(classification);
    const tmp = [];

    etiquettes.forEach(etiquette => {
        const { subject } = etiquette;
        const timestamp = etiquette.timestamp;
        const etiquetteYear = new Date(timestamp).getFullYear();
        if (etiquetteYear === year) {
            categories.forEach(category => {
                const keywords = classification[category];
                if (keywords.some(keyword => subject.includes(keyword))) {
                    tmp.push({ subject: category, A: 0 });
                }
            });
        }
    });

    const compteurSujets = {};
    for (const element of tmp) {
        const sujet = element.subject;
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
            tmp2.push({ subject: clé, A: valeur * 100 / tmp.length });
        }
    }

    return tmp2;
}
