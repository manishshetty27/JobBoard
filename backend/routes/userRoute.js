import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
 
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, updateProfile);

export default router;
