const moment = require('moment'); // Assurez-vous d'avoir installé moment.js

// Importer la fonction (assumant que la fonction est dans le même fichier)
// Si la fonction est dans un autre fichier, vous devez ajuster le chemin d'importation
const { generateTimeData } = require('./subjectsUtils');

// Créer un tableau d'étiquettes
let etiquettes = ["Etiquette1", "Etiquette2", "Etiquette3"];

// Créer un tableau de dates
let daterange = ["2023-01-01", "2023-12-31"];

// Appeler la fonction avec les valeurs d'entrée
generateTimeData(etiquettes, daterange);
