const express = require("express");
const {connectDB} = require("./config/database");
const {userAuth, adminAuth} = require("./middlewares/auth")
const {User} = require("./models/user")
const app = express();

app.use(express.json())   //when no route path give, it will run for every route

// create user
app.post("/signup", async (req,res) => {
    const user = new User(req.body)

    // creating a new instance of user model
    // const user = new User({
    //     firstName : "Virat",
    //     lastName : "Kohli",
    //     emailId : "virat@kohli.com",
    //     password : "qwerty",
    //     age : "36",
    //     gender : "Male"
    // })

    try {
        await user.save()
        res.send("User created successfully.")
    } catch(err){
        res.status(400).send("Error occurred : ",err)
    }
})

// get user by _id & email
app.get("/user", async (req,res) => {
    const userId = req.body._id

    try {
        const data = await User.findById({_id : userId})
        if(!data)
            res.status(404).send("User not found")
        else
            res.send(data);
    } catch (err) {
        res.status(404).send("Something went wrong : ",err)
    }
})

// get all users data


// delete user
app.delete("/user", async (req,res) => {
    const userDelete = req.body._id

    try {
        await User.findByIdAndDelete({_id : userDelete})
        res.send("User got deleted successfully.")
    } catch (err) {
        res.status(404).send("Error : ",err)
    }
})


// update user data
app.patch("/user", async (req,res) => {
    const userId = req.body._id
    const data = req.body

    try {
        const before = await User.findOneAndUpdate({_id : userId}, data, {returnDocument:'before'})
        console.log(before)
        res.send("User data updated successfully.")
    } catch (err) {
        res.send("Error",err)
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