import { Router } from "express";
import UsersManager from "../managers/user.manager.js";
import CartManager from '../managers/cart.manager.js';
import jwt from "jsonwebtoken";
import { isValidPassword } from "../utils/util.js";
import passport from "passport";

const sessionsRouter = Router();
const userManager = new UsersManager();
const cartManager = new CartManager();

sessionsRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, age, password, role } = req.body;
    

    try {
        const existsUser = await userManager.getByEmail(email);

        if(existsUser){
            return res.status(400).json({status: "error", message: `El email ya se encuentra registrado`, data: null});
        }
        const cart = await cartManager.createCart();
        const newUser = await userManager.createUser(firstName, lastName, email, age, password, cart, role);
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
            if(isValidPassword(password, user)){
                req.user = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    age: user.age,
                    role: user.role
                }
                
                const token = jwt.sign({user: user.email, role: user.role}, "coderhouse", {expiresIn: 1000 * 60 * 60});
                res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
                return res.status(200).json({status: "success", message: `Usuario loggeado correctamente`, data: user});
            }
            
            return res.status(400).json({status: "error", message: `La contraseña no es válida`, data: null});

        } 
        return res.status(404).json({status: "error", message: `El usuario no se encontró`, data: null});
        

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

sessionsRouter.post("/logout", async (req, res) => {
    res.clearCookie("coderCookieToken", {httpOnly: true});
    res.redirect("/login");
});

sessionsRouter.get("/current", passport.authenticate("current", {session: false}), async(req, res) => {
    
    if(req.user){        
        const userBD = await userManager.getByEmail(req.user.user);
        return res.render("profile", {user:userBD});
    }
    
    return res.status(400).json({status: "error", message: `No autorizado`, data: null});
});

sessionsRouter.get("/admin", passport.authenticate("current", {session: false}), (req, res) => {   
        
    if(req.user.role !== "admin"){
        return res.status(403).json({status: "error", message: `Acceso denegado`, data: null});
    }

    res.render("admin", {user: req.user});
});


export default sessionsRouter;