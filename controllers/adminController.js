import Article from "../models/Article.js";
import fs from "fs";
import path from "path";

const ADMIN_TOKEN = "mysecrettoken";

export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== ADMIN_TOKEN) return res.status(403).json({ message: "Forbidden" });
  next();
};

export const addArticle = async (req, res) => {
  try {
    const { title, category, content, id } = req.body;
    let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (id) {
      // Update article
      const article = await Article.findById(id);
      if (!article) return res.status(404).json({ message: "Article not found" });

      // Delete old image if replaced
      if (req.file && article.imageUrl) {
        const oldPath = path.join(path.resolve(), article.imageUrl.substring(1));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      article.title = title;
      article.category = category;
      article.content = content;
      if (imageUrl) article.imageUrl = imageUrl;

      await article.save();
      return res.json(article);
    } else {
      // Add new article
      const article = new Article({ title, category, content, imageUrl });
      await article.save();
      res.json(article);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAdminArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.imageUrl) {
      const imgPath = path.join(path.resolve(), article.imageUrl.substring(1));
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await article.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
