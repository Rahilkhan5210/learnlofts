import express from "express";
import { changePassword, getUserProfile, login, logout, register, updateProfile } from "../Controllers/User.Controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import upload from "../Utils/Multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/profile').get(isAuthenticated,getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto") ,updateProfile);
router.route("/change-password").put(isAuthenticated, changePassword);

export default router;