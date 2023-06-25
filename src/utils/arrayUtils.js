/**
 * 
 * @param {*} tableau 
 * @param {*} elements 
 */
export function ajouterElements(tableau, elements) {
  const elementsNonPresents = elements.filter((el) => !tableau.includes(el));
  tableau.push(...elementsNonPresents);
}

/**
 * 
 * @param {*} tableau1 
 * @param {*} tableau2 
 * @returns 
 */
export const tableauFusionne = (tableau1, tableau2) => {
  try {
    const tableauFusionne = [...tableau1, ...tableau2];
    return tableauFusionne;
  } catch (error) {
    console.log("Erreur lors de la fusion des tableaux :", error);
    return [];
  }
};


// Fonction de comparaison personnalisée
export function comparerChampVide(a, b) {
  // Vérifie si le champ 'subject' est vide pour les objets a et b
  var subjectVideA = estChampVide(a, 'subject');
  var subjectVideB = estChampVide(b, 'subject');

  // Place les objets avec un champ 'subject' vide en premier
  if (subjectVideA && !subjectVideB) {
    return -1;
  } else if (!subjectVideA && subjectVideB) {
    return 1;
  }

  // Par défaut, conserve l'ordre d'origine
  return 0;
}

// Fonction générique pour vérifier si un champ est vide
function estChampVide(objet, champ) {
  return objet[champ][0] === '';
}

/**
 * 
 * @param {*} array 
 * @param {*} n 
 * @returns 
 */
export function head(array, n) {
  // Vérifie si le tableau est vide ou si n est inférieur ou égal à 0
  if (array.length === 0 || n <= 0) {
    //console.log("Le tableau est vide ou n est inférieur ou égal à 0.");
    return;
  }

  // Vérifie si n dépasse la taille du tableau
  if (n > array.length) {
    //console.log("La valeur de n dépasse la taille du tableau.");
    n = array.length;
  }

  // Affiche les n premiers objets du tableau
  for (var i = 0; i < n; i++) {
    //console.log(array[i]);
  }
}
/**
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 * @returns 
 */
export function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
      return false;
  }

  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
      }
  }

  return true;
}





