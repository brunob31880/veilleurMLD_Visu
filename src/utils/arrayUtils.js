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