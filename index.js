
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongoose connected with database MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const Article = require("./models/Article");

// GET: الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("صل علي سيدنا محمد");
});

// GET: استقبال Query Parameters
app.get("/ali", (req, res) => {
  res.send(req.query.name);
});

// GET: جلب كل المقالات من MongoDB
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: إضافة مقال جديد
app.post("/artclies", async (req, res) => {
  try {
    const newArticle = new Article();

    newArticle.title = req.body.titleArticle;
    newArticle.body = req.body.bodyArticle;

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: جلب مقال باستخدام ID
app.get("/artclies/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

