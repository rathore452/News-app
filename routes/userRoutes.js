import express from "express";
import { getArticles, getArticlesByCategory } from "../controllers/userController.js";

const router = express.Router();

router.get("/articles", getArticles);
router.get("/articles/category/:category", getArticlesByCategory);

export default router;
