const express = require("express");
const {connectDB} = require("./config/database");
const {User} = require("./models/user")
const cookieParser = require("cookie-parser")



const app = express();

app.use(express.json())   //when no route path given, it will run for every route
app.use(cookieParser())


const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestsRouter = require("./routes/requestsRouter");
const userRouter = require("./routes/userRouter");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

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
app.get("/feed", async(req,res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (err) {
        res.status(400).send("Error: "+err)
    }
})

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
app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId
    const data = req.body

    try {
        const ALLOWED_UPDATES = ["userId", "profileURL", "age", "gender", "skills", "about"]
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        )
        if(!isUpdateAllowed){
            throw new Error("Update not allowed.")
        }
        if(Array.isArray(data.skills) && data?.skills.length > 10) {
            throw new Error("Skills can't be more than 10")
        }
        const before = await User.findOneAndUpdate(
            {_id : userId}, data, 
            {
                returnDocument:'before',
                runValidators: true
            }
        )
        console.log(before)
        res.send("User data updated successfully.")
    } catch (err) {
        res.status(404).send("Error: "+err.message)
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