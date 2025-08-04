const express = require('express')
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const {User} = require('../models/user')

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["ignored","interested"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message : "Invalid status type: "+status
            })
        }
        
        if(fromUserId == toUserId){
            return res.status(404).json({message : "Sending request to oneself is not allowed!"})
        }

        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.status(404).json({message : "User not found!"})
        }
        
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })

        if(existingConnectionRequest){
            return res.status(400).json({message : "Connection request already exists!"})
        }
        
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save()

        res.json({
            message : `Connection status from ${fromUserId} to ${toUserId} updated to ${status}!`,
            data
        })
    }
    catch (err) {
        res.status(400).send("ERROR : "+err.message)
    }
})


requestRouter.post("/review/request/:status/:requestId", userAuth, async (req,res) => {
    const loggedInUser = req.user
    const { status, requestId } = req.params

    const allowedStatus = ["accepted","rejected"]
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:'Status not valid!'})
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id : requestId,
        toUserId : loggedInUser._id,
        status : "interested"
    })
    if(!connectionRequest){
        return res.status(404).send("Connection request not found!")
    }

    connectionRequest.status = status
    const data = await connectionRequest.save()

    res.status(200).json({message:`Connection request ${status}!`, data})
})

module.exports = requestRouter