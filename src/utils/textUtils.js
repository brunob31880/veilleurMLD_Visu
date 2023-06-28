/**
 * 
 * @param {*} testname 
 * @returns 
 */
export function extractName(testname) {
  let fullname = testname;
  if (fullname) {
    if (fullname.includes(" ")) {
      return fullname.split(" ")[1] + " " + fullname.split(" ")[0];
    } else if (fullname.includes(".")) {
      return (
        fullname.split(".")[0].charAt(0).toUpperCase() +
        fullname.split(".")[0].slice(1) +
        " " +
        fullname.split(".")[1].toUpperCase()
      );
    } else {
      return "Prénom NOM";
    }
  } else {
    return "no name";
  }
}
/**
 * 
 * @param {*} texte 
 * @returns 
 */
export function trouverUrls(texte) {
  // Vérifier si texte est une chaîne de caractères
  if (typeof texte !== 'string') {
    // Renvoyer un tableau vide si texte n'est pas une chaîne de caractères
    return [];
    // OU lancer une erreur
    // throw new Error("L'argument texte doit être une chaîne de caractères.");
  }

  const regex = /(https?:\/\/[^\s]+)/gi;
  const urls = texte.match(regex);
  return urls || [];
}


//trouverSubjects(texte)
//cette fonction utilise une expression régulière pour trouver 
//toutes les occurrences de texte entre deux paires d'astérisques (**). 
//Ces occurrences sont considérées comme des "sujets". 
//Tous les sujets trouvés sont renvoyés dans un tableau.
export function trouverSubjects(texte) {
  const regex = /\*\*(.*?)\*\*/g;
  const champs = [];

  let match;
  while ((match = regex.exec(texte)) !== null) {
    champs.push(match[1]);
  }

  return champs;
}

/**
 * 
 * @param {*} text 
 * @returns 
 */
export function parseTag(text) {
  const messageMatch = text.match(/^#(\S+)\s?/);

  if (messageMatch) {
    return {
      tag: messageMatch[1],
    };
  }

  return null;
}
export function truncateText(text, maxCharacters) {
  if (text === null || text === undefined) {
    console.warn("L'argument text est null ou undefined. Renvoie une chaîne vide...");
    return '';
  }

  if (typeof text !== 'string') {
    console.warn("L'argument text doit être une chaîne de caractères. Conversion en chaîne...");
    text = String(text);
  }

  if (typeof maxCharacters !== 'number' || maxCharacters < 0) {
    console.warn("L'argument maxCharacters doit être un nombre positif. Utilisation de la valeur par défaut : 100.");
    maxCharacters = 100;
  }

  if (text.length <= maxCharacters) {
    return text;
  }

  let truncatedText = text.substring(0, maxCharacters);

  // Si le caractère à la limite est un espace, nous pouvons simplement ajouter les points de suspension.
  if (text[maxCharacters] === ' ') {
    return truncatedText + '...';
  }

  // Sinon, nous devons trouver le dernier espace dans le texte tronqué et couper à cet endroit.
  let lastSpaceIndex = truncatedText.lastIndexOf(' ');
  if (lastSpaceIndex !== -1) {
    truncatedText = truncatedText.substring(0, lastSpaceIndex);
  }

  return truncatedText + '...';
}

