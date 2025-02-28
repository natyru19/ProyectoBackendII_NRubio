import UsersModel from '../models/user.model.js';

class UsersManager{

    async getByEmail(email){
        try {
            const user = await UsersModel.findOne({email: email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(firstName, lastName, email, age, password){
        try {
            const newUser = await UsersModel.create({firstName, lastName, email, age, password});
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

export default UsersManager;