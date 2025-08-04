const express = require("express")
const ConnectionRequest = require("../models/connectionRequest")
const { userAuth } = require("../middlewares/auth")

const userRouter = express.Router()

const USER_SAFE_DATA = "firstName lastName profileURL age gender about skills"


userRouter.get("/user/requests/received", userAuth, async (req,res) =>{
    try {
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate(
            "fromUserId",
            "firstName lastName profileURL age gender about skills"
        )
        // }).populate("fromUserId", ["firstname", "lastName"])

        res.json({
            message : "Data fetched successfully!",
            data : connectionRequests
        })
    } catch (err) {
        res.status(400).send("ERROR : "+err.message)
    }


})

userRouter.get("/user/connections", userAuth, async (req,res) => {
    try {
        const loggedInUser = req.user

        const connections = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id, status : "accepted"},
                {toUserId : loggedInUser._id, status : "accepted"}
            ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)

        const data = connections.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString())
                return  row.toUserId //map function
            
            return row.fromUserId
        })

        res.json({data})
    } catch (err) {
        res.status(400).send({message : err.message})
    }
})

module.exports = userRouter