
var express = require("express");


var app = express();

app.get("/",(req, res)=>{
   res.send(`
           <h2>Home</h2>
           <a href="/users">user</a>|
           <a href="/admin">Admin</a>| 
           <a href="/videos">Videos</a>
   
   `);
});

app.get("/users", (req, res)=>{
   res.send("<h2>Users Home</h2><p>Moudle - can watch videos</p>");

});
app.get("/admin", (req, res)=>{
   res.send("<h2>Admin Home</h2><p>Admin Moudle - can add, edit,rename</p>")
});
app.get("/videos", (req, res)=>{
   res.send([{id:1, title:"React js"},{id:2, title:"Angular 16"}]);
})
app.get("*",(req, res)=>{
   res.send("<h2>Not Found</h2><p>404 : Requested path not found</p>")
});


app.listen(7070);
console.log(`Server Started : http://127.0.0.1:7070`);