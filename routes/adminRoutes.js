import express from "express";
import multer from "multer";
import { addArticle, getAdminArticles, deleteArticle, adminAuth } from "../controllers/adminController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.use(adminAuth);

router.post("/articles", upload.single("image"), addArticle);
router.get("/articles", getAdminArticles);
router.delete("/articles/:id", deleteArticle);

export default router;
