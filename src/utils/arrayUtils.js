export function ajouterElements(tableau, elements) {
    const tousPresent = elements.every((el) => tableau.includes(el));
  
    if (tousPresent) {
      console.log("Les éléments sont déjà présents :", elements);
    } else {
      tableau.push(...elements);
      console.log("Éléments ajoutés :", elements);
    }
  }
  /**
   * 
   * @param {*} tableau1 
   * @param {*} tableau2 
   * @returns 
   */
  export const tableauFusionne=(tableau1,tableau2)=>{
    const tableauFusionne = [...tableau1, ...tableau2];
    return tableauFusionne
  }

  // Fonction de comparaison personnalisée
export function comparerChampVide(a, b) {
  // Vérifie si le champ 'subject' est vide pour les objets a et b
  var subjectVideA = a.subject[0] === '';
  var subjectVideB = b.subject[0] === '';

  // Place les objets avec un champ 'subject' vide en premier
  if (subjectVideA && !subjectVideB) {
    return -1;
  } else if (!subjectVideA && subjectVideB) {
    return 1;
  }

  // Par défaut, conserve l'ordre d'origine
  return 0;
}

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







