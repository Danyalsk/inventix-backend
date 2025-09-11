import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
// import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/login", userController.login);
router.get("/users", userController.getUsers);
router.post("/create-user", userController.createUser, (req, res) => {
  res.json({ message: "User created successfully!" });
});

router.patch("/edit-user/:id", userController.editUser);

export default router;
