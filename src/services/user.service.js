
import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/util.js";

class UserService {
    async registerUser(userData) {
        const existsUser = await userRepository.getByEmail(userData.email);
        if(existsUser){
            throw new Error("El usuario ya existe");
        }
        
        userData.password = createHash(userData.password);
        return await userRepository.createUser(userData);
    }

    async loginUser(email, password){
        const user = await userRepository.getByEmail(email);
        if(!user || !isValidPassword(password, user)){
            throw new Error("Credenciales incorrectas");
        }
        return user;
    }
}

export default new UserService;