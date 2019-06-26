fileHandler = require('os-tools')

db = null;

/**
 * this is a simple firebase real time database handler, for messing around with the data (like
 * fetch a specific data in a desired path)
 */
const self = module.exports = {


    /**
     * call this initially to set the database
     * @param dbUrl -> Go to firebase.com -> your project -> Database ->
     *        find the link: https://remotes-7c523.firebaseio.com
     * @param serviceAccountJSONPath -> Go to firebase.com -> your project -> settings -> service accounts ->
     *        generate new
     */
    initializeDB: async function (dbUrl, serviceAccountJSONPath) {
        const serviceAccount = require(serviceAccountJSONPath);
        const admin = require("firebase-admin");

        // Initialize the app with a service account, granting admin privileges
        await admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: dbUrl
        });
        // As an admin, the app has access to read and write all data, regardless of Security Rules
        self.db = admin.database();
    },

    /**
     * will read a value/s from the database
     * @param path -> the path to the value/values
     * @param toJson -> toggle if you want to get the response as a json format
     * @param toFile -> toggle this if you want to extract the result to a file
     * @param filePath -> if you want to extract the response to a file, set it's path here
     * @param deleteAfterRead -> remove key and values after read
     */
    read: async function (path, toJson = false, toFile = false, filePath = null, deleteAfterRead = false) {
        return new Promise(async function (resolve, reject) {
            let extractedVal = null;
            const ref = self.db.ref(path);
            await ref.once("value", function (snapshot) {
                if (toJson)
                    extractedVal = snapshot.toJSON();
                else
                    extractedVal = snapshot.val()
                if (toFile) {
                    fileHandler.JSONObjectToFile(extractedVal, filePath)
                }

                if (deleteAfterRead) {
                    self.delete(path)
                }
            });
            resolve(extractedVal)
        })
    },

    /**
     * will update a value/s to the database (and won't delete the rest)
     * @param path -> the path to the value/values
     * @param keyValDict -> the key and value dictionary to add
     */
    update: async function (path, keyValDict) {
        return new Promise(async function (resolve, reject) {
            let ref = self.db.ref(path);
            await ref.update(keyValDict);
        })
    },

    /**
     * will push a value to the database (will create, in a specific path, a unique uid, and there will set the values)
     * @param path -> the path to the value/values
     * @param keyValDict -> the key and value dictionary to add
     */
    push: async function (path, keyValDict) {
        return new Promise(async function (resolve, reject) {
            let ref = self.db.ref(path);
            await ref.push(keyValDict)
        })
    },

    /**
     * will remove a key and all of it's values from RTD
     * @param path -> the path you wish to remove
     */
    delete: async function (path) {
        const ref = self.db.ref(path);
        await ref.remove()
    }


};
