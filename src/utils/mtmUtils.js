export const getClassWithChannel = (channel) => {
    console.log("Searching for channel " + channel)
    if (channel === "tuyauxmld") return "Tuyau"
    else return "Veille"
}