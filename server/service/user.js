import * as userRepo from '../repo/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (data) => {
    return await userRepo.createUser(data);
}

export const login = async (username, password) => {
    const user = await userRepo.findByUsername(username);
    if (!user) {
        console.log('User was not found!');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        console.log('Wrong password or username');
    }

    const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT);

    const { password: _, isAdmin, ...otherDetails } = user._doc;
    return { token, details: otherDetails, isAdmin };
}

export const logout = async (id) => {
    await userRepo.clearAuthToken(id);
}

export const getAllUsers = () => {
    return userRepo.getAllUsers();
}

export const getUserById = (id) => {
    return userRepo.getUserById(id);
}

export const removeUser = (id) => {
    return userRepo.removeUser(id);
}

export const updateUser = (id, data) => {
    return userRepo.updateUser(id, data);
}