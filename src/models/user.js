const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        minLength : 3,
        maxLength : 15,
    },
    lastName : {
        type : String,
        trim : true,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email address.")
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak password")
            }
        }
    },
    age : {
        type : Number,
        min : 18,
        max : 65,
        trim : true,
    },
    gender : {
        type : String,
        trim : true,
        validate(value) {
            if(!["Male", "Female", "Other"].includes(value)){
                throw new Error("Invalid gender value.")
            }
        }
    },
    profileURL : {
        type : String,
        default : "https://acdsinc.org/wp-content/uploads/2015/12/dummy-profile-pic.png",
        trim : true,
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Profile picture URL invalid.")
            }
        }
    },
    about : {
        type : String,
        default : "Hello guyzzz, I'm new here to DevTinder Community!",
        trim : true,
    },
    skills : {
        type : [String]
    }
},
{
    timestamps : true,
}
)

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id : user._id}, "DEV@Tinder0703", 
        {expiresIn : "7d"}
    )

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    console.log(passwordInputByUser)

    const passwordHash = user.password;

    console.log(passwordHash)

    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash)
    console.log(isValidPassword)

    return isValidPassword;
}

const User = mongoose.model("User",userSchema);

module.exports = {User}