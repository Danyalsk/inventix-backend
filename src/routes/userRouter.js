import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.post("/login", userController.login);
router.get("/users", userController.getUsers);
router.post("/create-user", userController.createUser);
router.patch("/edit-user/:id", userController.editUser);

export default router;
