import { Router } from "express";
import { deleteUserProfile, updateUserProfile, userHome, userList, userProfile } from "./services/user.service.js";
const router = Router();

router.get("/", userList);
router.get("/profile/:id", userProfile);
router.get("/profile/:id/home", userHome);

router.patch("/profile/:id", updateUserProfile);
router.delete("/profile/:id", deleteUserProfile);

export default router;