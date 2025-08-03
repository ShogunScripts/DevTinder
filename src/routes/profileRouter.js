const express = require('express')
const {userAuth} = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")
const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async(req,res) => {
    try {
        const user = req.user
        
        res.send(user)
    } catch(err) {
        res.status(400).send("ERROR : "+err.message)
    }

})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req))
            throw new Error("Invalid edit data!")

        const loggedInUser = req.user
        Object.keys(req.body).forEach((field) => loggedInUser[field] = req.body[field])
        console.log(loggedInUser)

        await loggedInUser.save()

        res.json({ 
            message : `${loggedInUser.firstName} your profile has been updated successfully!`,
            data : loggedInUser 
        })
    }
    catch (err){
        res.status(400).send("Error : "+err.message)
    }
})

module.exports = profileRouter