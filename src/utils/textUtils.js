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
  //trouverUrl(texte) 
export function trouverUrls(texte) {
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


export function parseTag(text) {
  const messageMatch = text.match(/^#(\S+)\s?/);

  if (messageMatch) {
    return {
      tag: messageMatch[1],
    };
  }

  return null;
}

  