 var express = require("express");

 var app = express();

 app.get("/", (req,res)=>{
    res.send("<h2>Home</h2>");
 });

 app.post("/addvideos",(req,res)=>{
    res.send("Inserted a new video into video library");
 });

 app.put("/updatevideo/:id", (req,res)=>{
    res.send(`Updating video with Id=${req.params.id}`);
 })

 app.delete("/deletedvideo/:id", (req, res)=>{
    res.send(`Deleted video with Id = ${req.params.id}`)
 });

 app.listen(5000)
 console.log(`server started`)