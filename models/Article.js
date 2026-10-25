let mongoose= require("mongoose");
let articleSchema = new mongoose.Schema({
  title: String,
  body : String,
})
let Article = mongoose.model("Article",articleSchema)
module.exports= Article;