const UserModel = require("../model/user.schema");
const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status');
const config = require('../config');
const jwt = require("jsonwebtoken");

async function verifyIfUserExists(email){
    return await UserModel.exists({email: email});
}

function createId(){
    return uuidv4();
}

function tokenizeData(user){
    const token = jwt.sign({user}, config.jwt.secret)
    const tokenizedUser =  {user, token:token}
    return tokenizedUser;
}

async function getUserData(email){
    const userData = await UserModel.findOne({email: email, active: true});
    return tokenizeData(userData)
}

async function createUser(user){
    const userData = await UserModel.create({
        id: createId(),
        email: user.email,
        avatar: user.image,
        name: user.name,
        active: true
    });
    return tokenizeData(userData)
}


class UserService {

    async handleUserOAuthLogin(user){
        if(await verifyIfUserExists(user.email)){
            return await getUserData(user.email);
        }
        return await createUser(user);
    }

    async updateUser(user){
        if(!await verifyIfUserExists(user.email)){
            throw new Error(httpStatus.NOT_FOUND, 'User not found');
        }
        const oldUser = await getUserData(user.email);
        const newUser = {
            ...oldUser,
            id: user.id,
            email: user.email,
            avatar: user.avatar,
            name: user.name,
            active: user.active,
        };
        return await UserModel.updateOne({ _id: oldUser._id }, newUser);
    }

    async inactivateUser(user){
        if(!await verifyIfUserExists(user.email)){
            throw new Error(httpStatus.NOT_FOUND, 'User not found');
        }
        if(!user.active){
            throw new Error(httpStatus.BAD_REQUEST, 'User already inactive');
        }
        const newUser = {...user, active: false};
        return await UserModel.updateOne({ email: user.email }, newUser);
    }

    async activateUser(user){
        if(!await verifyIfUserExists(user.email)){
            throw new Error(httpStatus.NOT_FOUND, 'User not found');
        }
        if(user.active){
            throw new Error(httpStatus.BAD_REQUEST, 'User already active');
        }
        const newUser = {...user, active: true};
        return await UserModel.updateOne({ email: user.email }, newUser);
    }

    async getUserById(id) {
        return await UserModel.findOne({id: id});
    }

    async getUserByEmail(email){
        return await UserModel.findOne({ email: email });
    }

    async getAllActiveUsers(){
        return await UserModel.find({ active: true });
    }

    async getInactiveUsers(){
        return await UserModel.find({ active: false });
    }

    async getAllUsers(){
        return await UserModel.find();
    }   
}

module.exports = new UserService();