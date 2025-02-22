import express from "express";
const router = express.Router();
import getSqlData from "../controllers/exampleController.js";

router.get("/sqldata", getSqlData);

export default router;
