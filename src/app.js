const express = require("express");

const app = express();

app.get("/user",(req,res)=> {
    res.send(`Firstname : "Mrunal", Lastname : "Kumbhare"`)
})

app.put("/user",(req,res) => {
    res.send("Old user replaced with new user instance.")
})

app.patch("/user",(req,res) => {
    res.send("User info updated.")
})

app.post("/user",(req,res)=> {
    res.send("New user added.");
})

app.delete("/user",(req,res)=> {
    res.send("User deleted.");
})

app.listen(7777, ()=> {
    console.log("Server is listening to the port 7777...")
});