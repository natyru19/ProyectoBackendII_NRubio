import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import CartManager from "../dao/managers/cart.manager.js";
import UserManager from "../dao/managers/user.manager.js";
import { isValidPassword } from "../utils/util.js";

const cartManager = new CartManager();
const userManager = new UserManager();

class UserController {
    async register (req, res) {
        const { firstName, lastName, email, age, password, role } = req.body;
        
    
        try {
            const existsUser = await userService.registerUser({ firstName, lastName, email, age, password});
    
            if(existsUser){
                return res.status(400).json({status: "error", message: `El email ya se encuentra registrado`, data: null});
            }
            const cart = await cartManager.createCart();
            const newUser = await userService.registerUser(firstName, lastName, email, age, password, cart, role);
            return res.status(201).json({status: "success", message: "Se creó el usuario correctamente", data: newUser});
    
        } catch (error) {
            return res.status(500).json({status: "error", message: error.message});
        }
    };
    
    async login (req, res) {
        const { email, password } = req.body;
        
        try {
            const user = await userService.loginUser(email, password);
            
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
                }else{
                    return res.status(400).json({status: "error", message: `La contraseña no es válida`, data: null});
                }
                
                
            } 
            return res.status(404).json({status: "error", message: `El usuario no se encontró`, data: null});
            
    
        } catch (error) {
            return res.status(500).json({status: "error", message: error.message});
        }
    };
    
    async logout (req, res) {
        res.clearCookie("coderCookieToken", {httpOnly: true});
        res.redirect("/login");
    };
    
    async current (req, res) {
        
        if(req.user){        
            const userBD = await userManager.getByEmail(req.user.user);
            return res.render("profile", {user:userBD});
        }
        
        return res.status(400).json({status: "error", message: `No autorizado`, data: null});
    };
}

export default UserController;