/**
 * 
 * @param {*} testname 
 * @returns 
 */
function extractName(testname) {
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
  
  export default extractName;
  