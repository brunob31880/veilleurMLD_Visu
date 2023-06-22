// test.js
import { filtrerObjetsMalRenseignes, estChampVide } from './etiquettesUtils';



// Test de la fonction estChampVide
describe('estChampVide', () => {
    test('retourne true si le champ est vide', () => {
        expect(estChampVide('')).toBe(true);
        expect(estChampVide([])).toBe(true);
        expect(estChampVide([''])).toBe(true);
        expect(estChampVide(null)).toBe(true);
        expect(estChampVide(undefined)).toBe(true);
    });

    test('retourne false si le champ n\'est pas vide', () => {
        expect(estChampVide('Some text')).toBe(false);
        expect(estChampVide(['value'])).toBe(false);
        expect(estChampVide({ field: 'value' })).toBe(false);
    });
});

// Test de la fonction filtrerObjetsMalRenseignes
describe('filtrerObjetsMalRenseignes', () => {
    test('retourne les objets mal renseignés', () => {
        const tableau = [
            { text: 'hello', thumbnail: { url: 'image-url' }, subject: ['test'], otherField: 'value' },
            { text: '', thumbnail: null, subject: [''], otherField: 'value' },
        ];

        const objetsMalRenseignes = filtrerObjetsMalRenseignes(tableau);
        console.log(objetsMalRenseignes)
        expect(objetsMalRenseignes).toEqual([
            { text: '', thumbnail: null, subject: [''], otherField: 'value' }
        ]);
    });

    test('retourne un tableau vide si aucun objet n\'est mal renseigné', () => {
        const tableau = [
            { text: 'Some text', thumbnail: { url: 'image-url' }, subject: ['subject'], otherField: 'value' },
            { text: 'Some text', thumbnail: null, subject: ['subject'], otherField: 'value' },
        ];

        const objetsMalRenseignes = filtrerObjetsMalRenseignes(tableau);

        expect(objetsMalRenseignes).toEqual([]);
    });
});