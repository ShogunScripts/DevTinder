const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require("bcrypt");
const { User } = require('../models/user');

const authRouter = express.Router();

authRouter.post("/signup", async (req,res) => {
    try {
        validateSignUpData(req);

        const { firstName, lastName, emailId, password, age, gender, profileURL, about, skills } = req.body;

        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,
            age,
            gender,
            profileURL,
            about,
            skills
        })

        await user.save()
        res.send("User created successfully!")
    } catch(err){
        res.status(400).send("Error : "+err.message)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({emailId : emailId})

        if(!user)
            throw new Error("Invalid Credentials!")//never show wrong email, it gives hints to hacker about this email doesn't exist in DB
            // never give even a slightest hint about whether the given email exists in DB or not
            // thus show "Invalid credentials" whether email or password is wrong in both the cases
            // only genuine user will know correct credentials

        // const isPasswordValid = await bcrypt.compare(password, User.find)
        const isPasswordValid = await user.validatePassword(password)

        console.log(isPasswordValid)

        if(isPasswordValid){
            const token = await user.getJWT()
            res.cookie("token",           token,              { expires: new Date(Date.now() + 15  * 60  *  1000)})
            // name of cookie          value of token           sets the expiration time    -  min   sec     ms
            // storing a JWT 
            // token under the name
            res.send(user)
        } else 
            throw new Error("Invalid Credentials!!")

    } catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})


authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null,  { expires : new Date(Date.now())})
    // converts this time stamp into JS date object(return current timestamp)
    res.status(200).send("Logout Successful!")
})

module.exports = authRouter