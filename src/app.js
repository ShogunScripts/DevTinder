const express = require("express");
const {connectDB} = require("./config/database");
const {userAuth, adminAuth} = require("./middlewares/auth")
const {User} = require("./models/user")
const app = express();

app.post("/signup", async (req,res) => {
    const user = new User({
        firstName : "Virat",
        lastName : "Kohli",
        emailId : "virat@kohli.com",
        password : "qwerty",
        age : "36",
        gender : "Male"
    })

    try {
        await user.save()
        res.send("User created successfully.")
    } catch(err){
        res.status(400).send("Error occurred : ",err.message)
    }
})

connectDB()
    .then(()=> {
        console.log("Database Connection Established.");
        app.listen(7777, ()=> {
            console.log("Server is listening to the port 7777...")
        })
    })
    .catch((err)=> {
        console.error("Encountered error: ",err)
    })