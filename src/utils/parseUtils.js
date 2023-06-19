import Parse from "parse";
import { configs } from "../config/config";
/**
 * 
 * @param {*} nomClasse 
 * @param {*} callback 
 */
export const ParseClasse = (nomClasse, callback) => {
    const nomDeClasse = Parse.Object.extend(nomClasse);
    const query = new Parse.Query(nomDeClasse);
    query.limit(2000);
    query.find().then(rep => {
        callback(rep)
    });
}
/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @param {*} setUser 
 */
export const GetConnection = (username, password) => {
    Parse.User.logIn(username, password)
        .then((user) => {
            console.log("Connexion Parse User: ", user)
        })
        .catch((error) => {
            console.log("Error=" + error.code + " message=" + error.message);
        });
};


/**
 * 
 */
export const parseLogout = () => {
    var currentUser = Parse.User.current();
    if (currentUser) {
        Parse.User.logOut();
    }
}
/**
 * 
 * @param {*} callback 
 * @returns 
 */
export const bddConnection = () => {

    console.log("Connection " + configs.Parse_Domain);
    Parse.serverURL = configs.Parse_Domain;
    // Initialisation
    Parse.initialize(
        configs.Parse_Application_ID, // Application ID
        configs.Parse_javascriptKey
    )
    // pour l'instant pas de page de log
    GetConnection(configs.Parse_user_name, configs.Parse_user_password);
    return Parse;
}

//
// Modification d'un élément donné dans une classe avec un id et de nouvelles valeurs
//
export const modifyElementInClassWithId = (nomClasse, id, tabnewvalues, callbackOnUp, callbackerror) => {
    console.log("Modifying in", nomClasse, "with id", id, "tabnewvalues", tabnewvalues);
    const classe = Parse.Object.extend(nomClasse);
    const query = new Parse.Query(classe);
  
    query.get(id).then((object) => {
      Array.from(tabnewvalues).forEach((cond) => {
        const { champ, valeurchamp } = cond;
        if (Array.isArray(valeurchamp)) {
          object.add(champ, valeurchamp);
        } else {
          object.set(champ, valeurchamp);
        }
      });
      object.save().then((response) => {
        callbackOnUp(response);
      }, (error) => {
        callbackerror(error);
      });
    });
  };
  

export const subscriptionInLiveQuery = () => {
    // Abonnement à la base de données dynamique
    let client = new Parse.LiveQueryClient({
        applicationId: configs.Parse_Application_ID, // Application ID
        serverURL: configs.PARSE_LiveQueryDomain, // Example: 'wss://livequerytutorial.PARSE.io'
        javascriptKey: configs.Parse_javascriptKey
    });
    client.open();

    return client;
}
/**
 * 
 * @param {*} nameClasse 
 * @param {*} client 
 */
export function subscribeForWith(nameClasse, client,loadReload) {
    console.log("Subscribe for ", nameClasse);
    var query = new Parse.Query(nameClasse);
    query.ascending('createdAt').limit(5);
    var subscription = client.subscribe(query);
    if (subscription !== undefined && subscription !== null) {
        subscription.on('create', act => {         
            console.log("Create ",act);      
            loadReload()
        });
        subscription.on('delete', act => {        
            console.log("Delete ",act);
            loadReload()
        });
        subscription.on('update', act => {         
            console.log("Update ",act);
            loadReload()
        });
    }
    else {
        console.log("SubscribeFor " + nameClasse + " subscribe === undefined || subscribe === null");
    }
}
