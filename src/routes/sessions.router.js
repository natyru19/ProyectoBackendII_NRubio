import { Router } from "express";
import UsersManager from "../managers/user.manager.js";

const sessionsRouter = Router();
const userManager = new UsersManager();

sessionsRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body;

    try {
        const existsUser = await userManager.getByEmail(email);

        if(existsUser){
            return res.status(400).json({status: "error", message: `El email ya se encuentra registrado`, data: null});
        }

        const newUser = await userManager.createUser(firstName, lastName, email, age, password);
        return res.status(201).json({status: "success", message: "Se creó el usuario correctamente", data: newUser});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

sessionsRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userManager.getByEmail(email);
        
        if(user){
            if(user.password === password){
                req.user = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    age: user.age
                }

                return res.status(200).json({status: "success", message: `Usuario loggeado correctamente`, data: user});
            } else {
                return res.status(400).json({status: "error", message: `La contraseña no es válida`, data: null});
            }            
        } else {
            return res.status(404).json({status: "error", message: `El usuario no se encontró`, data: null});
        }

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});


export default sessionsRouter;