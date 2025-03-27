const userAuth = (req,res,next) => {
    console.log("User authentication is getting checked...")
    const token = 'xyz';
    const isAuthorizedUser = token === 'xyz';
    if(!isAuthorizedUser)
        res.status(401).send("Unauthorized request")
    else
        next()
}

const adminAuth = (req,res,next) => {
    console.log("Admin autherization getting checked...")
    const token = "qwerty"
    const isAuthorizedAdmin = token === "qwerty"
    if(!isAuthorizedAdmin)
        res.status(401).send("Unauthorized request.")
    else
        next()
}

module.exports = {
    userAuth,
    adminAuth,
}