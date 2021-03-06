import express from "express";
import { getAll, register, login, profile, profileById, updateUser, deleteUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/', getAll);
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/profile', profile);
userRoutes.get('/:id', profileById);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;