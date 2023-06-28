import * as userService from '../service/user';

export const register = async (req, res, next) => {
    try {
        const newUser = await userService.registerUser(req.body);
        res.status(200).json({ message: 'User has been created!', user: newUser });
    } catch (e) {
        next(e);
    }
}

export const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const loginResult = await userService.login(username, password);

        res.cookie('access_token', loginResult.token, {httpOnly: true})
            .status(200)
            .json({details: loginResult.details, isAdmin: loginResult.isAdmin});
    } catch (e) {
        next(e);
    }
}

export const logout = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await userService.logout(userId);
        res.clearCookie('access_token');
        res.json({ message: 'Logged out successfully!' });
    } catch (e) {
        next(e);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
}

export const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User was not found!' });
        }
        res.json(user);
    } catch (e) {
        next(e);
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const updatedUser = await userService.updateUser(id, data);
        res.status(200).json(updatedUser);
    } catch (e) {
        next(e);
    }
}

export const removeUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        await userService.removeUser(id);
        res.json({ message: 'User removed successfully' });
    } catch (e) {
        next(e);
    }
}