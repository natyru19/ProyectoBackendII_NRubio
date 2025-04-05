import UserDao from "../dao/user.dao.js";

class UserRepository {

    async getByEmail(email){
        try {
            const user = await UserDao.findOne({email: email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(userData){        

        try {
            const newUser = await UserDao.save(userData);
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserRepository();