import express from "express";
import { login, signup } from "../Controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.post('/login', login)
UserRouter.post('/signup', signup)

export default UserRouter;