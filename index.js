// mongodb+srv://<db_username>:<db_password>@cluster0.3u3i8sl.mongodb.net/
// "mongodb+srv://omarmohamedfargelsayed_db_user:9uGQQXB86K1nT2s0@cluster0.3u3i8sl.mongodb.net/"

const express = require("express");
const app = express();
 app.use(express.json())
 const mongoose = require("mongoose")
 mongoose.connect("mongodb+srv://omarmohamedfargelsayed_db_user:9uGQQXB86K1nT2s0@cluster0.3u3i8sl.mongodb.net/").then(()=>{
    console.log(" moongose connected with data base mongo")
 }).catch(
    (error)=>{console.log(error)}
 )
// app.get("/ali/:n1/:n2",(req,res)=>{
//     let num1=req.params.n1;
//     let num2=req.params.n2;
//     res.send(parseInt(num1)+ Number(num2))
// // })
// app.post("/ali",(req,res)=>{
//     res.send(`hallo ${req.body.name}`)
// })
app.get("/ali",(req,res)=>{
    res.send(req.query.name)
})

app.get("/",(req,res)=>{
    res.send("صل علي سيدنا محمد")
})
let Article = require("./models/Article")
app.post("/artclies",async(req,res)=>{
let newArticle= new Article();
newArticle.title= req.body.titleArticle;
newArticle.body= req.body.bodyArticle;
await newArticle.save()
res.send(newArticle)
})


app.get("/artclies/:id",async (req,res)=>{
  let  artId= req.params.id
   try{
     let article = await Article.findById(artId)
    res.send(article)
   }
   catch(error){console.log(error)}
})
app.listen(300,()=>{
   console.log("server is connected successesdd")
})