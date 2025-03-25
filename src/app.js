const express = require("express");

const app = express();

app.use("/home",(req,res)=> {
    res.send("Hello Ji!")
})

app.use("/profile",(req,res) => {
    res.send("Here's all your profile info.")
})

app.use("/friends",(req,res) => {
    res.send("Here's the list of all of your friends.")
})

app.listen(7777, ()=> {
    console.log("Server is listening to the port 7777...")
});