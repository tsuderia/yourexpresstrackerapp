import express from 'express';
import { loginControllers, registerControllers, setAvatarController, allUsers, getUsername } from '../controllers/userController.js';

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

router.route("/setAvatar/:id").post(setAvatarController);

router.route("/getUsers").post(allUsers);

router.route("/getUser").post(getUsername);


export default router;