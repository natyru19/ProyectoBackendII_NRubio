import mongoose from "mongoose";

class DataBase {
    static #instance;

    constructor() {
        mongoose.connect("mongodb+srv://nataliarubio:coderhouse@cluster0.ztm42.mongodb.net/ProyectoBackendII?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Se conectó a la BD exitosamente"))
        .catch((error) => console.log("Tenemos un error: " + error))
    }

    static getInstance() {
        if(this.#instance) {
            return this.#instance;
        }
        this.#instance = new DataBase();
        return this.#instance;
    }
}

export default DataBase;