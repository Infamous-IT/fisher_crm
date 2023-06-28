import User from '../model/user.js';
import bcrypt from "bcrypt";

export const createUser = async (data) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);

        const newUser = new User({
            ...data,
            password: hash,
        });
        await newUser.save();
        return newUser;
    } catch (e) {
        throw e;
    }
}

export const clearAuthToken = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User was not found!');
    }

    user.authToken = null;
    await user.save();
}

export const findByUsername = (username) => {
    return User.findOne({username});
}

export const getAllUsers = () => {
    return User.find();
}

export const getUserById = (id) => {
    return User.findOne({_id: id});
}

export const removeUser = (id) => {
    return User.findByIdAndDelete(id);
}

export const updateUser = (id, data) => {
    return User.findByIdAndUpdate(id, { $set: data}, {new: true});
}