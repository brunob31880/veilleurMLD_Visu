import { ajouterElements, tableauFusionne, comparerChampVide, head, arraysAreEqual } from './arrayUtils.js'; 

describe('Tests pour les fonctions de tableau', () => {
  test('ajouterElements', () => {
    const tableau = ['a', 'b', 'c'];
    const elements = ['d', 'e'];
    ajouterElements(tableau, elements);
    expect(tableau).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('tableauFusionne', () => {
    const tableau1 = ['a', 'b', 'c'];
    const tableau2 = ['d', 'e', 'f'];
    expect(tableauFusionne(tableau1, tableau2)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  test('comparerChampVide', () => {
    const a = { subject: [''] };
    const b = { subject: ['test'] };
    expect(comparerChampVide(a, b)).toBe(-1);
  });

  test('head', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const n = 3;
    // Ici, nous ne pouvons pas tester la fonction head de manière traditionnelle car elle n'a pas de valeur de retour.
    // Vous devriez envisager de modifier la fonction pour qu'elle retourne une valeur afin de pouvoir la tester.
  });

  test('arraysAreEqual', () => {
    const arr1 = ['a', 'b', 'c', 'd', 'e'];
    const arr2 = ['a', 'b', 'c', 'd', 'e'];
    expect(arraysAreEqual(arr1, arr2)).toBe(true);
  });
});
