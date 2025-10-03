import Article from '../models/Article.js';

export const getArticles = async (req,res)=>{
  try {
    const articles = await Article.find().sort({createdAt:-1});
    res.json(articles);
  } catch(err) {
    res.status(500).json({message:err.message});
  }
};

export const getArticlesByCategory = async (req,res)=>{
  try{
    const category = req.params.category;
    const articles = await Article.find({category}).sort({createdAt:-1});
    res.json(articles);
  } catch(err){
    res.status(500).json({message:err.message});
  }
};
