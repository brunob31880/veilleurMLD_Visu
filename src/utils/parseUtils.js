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
