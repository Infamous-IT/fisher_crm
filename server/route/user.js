import * as userController from '../controller/user.js';
import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyAdmin || verifyUser, userController.getAllUsers);
router.get('/:id', verifyAdmin || verifyUser, userController.getUserById);
router.delete('/:id', verifyAdmin || verifyUser, userController.removeUser);
router.patch('/:id', verifyAdmin || verifyUser, userController.updateUser);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', verifyAdmin || verifyUser, userController.logout);

export default router;