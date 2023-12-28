var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var conString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/admin", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tbladmin").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

app.get("/users", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tbluser").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

app.get("/categories", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblcategories").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

app.get("/videos", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

app.get("/video/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").find({VideoId:id}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

app.post("/adduser", (req, res)=>{

    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tbluser").insertOne(user).then(()=>{
            console.log('User Added');
            res.redirect("/users");
            res.end();
        })
    });
});

app.post("/addcategory", (req, res)=>{

    var category = {
        Category_Id: parseInt(req.body.Category_Id),
        CategoryName: req.body.CategoryName
    };

    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblcategories").insertOne(category).then(()=>{
            console.log('Category Added');
            res.redirect("/categories");
            res.end();
        })
    });
});

app.post("/addvideo", (req, res)=>{

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Comments: req.body.Comments,
        Likes : parseInt(req.body.Likes),
        Category_Id: parseInt(req.body.Category_Id)
    }
   
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log('Video Added');
            res.redirect("/videos");
            res.end();
        })
    });
});
app.put("/editvideo/:id",(req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then((clientObj)=>{
       var database = clientObj.db("reactdb");
       database.collection("tblvideos").updateOne({VideoId:id},{$set:{
           VideoId: parseInt(req.body.VideoId),
           Title: req.body.Title,
           Url: req.body.Url,
           Comments: req.body.Comments,
           Likes : parseInt(req.body.Likes),
           Category_Id: parseInt(req.body.Category_Id)
       }})
    }).then(()=>{
       console.log("Video Updated");
       res.end();
    })
});

app.delete("/deletevideo/:id", (req, res)=>{
   var id = parseInt(req.params.id);
   mongoClient.connect(conString).then((clientObj)=>{
       var database = clientObj.db("reactdb");
       database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
           console.log("Video Deleted");
           res.end();
       })
   })
});

app.listen(4000);
console.log(`Server Started : http://127.0.0.1:4000`);