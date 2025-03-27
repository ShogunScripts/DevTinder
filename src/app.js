const express = require("express");
const {userAuth, adminAuth} = require("./middlewares/auth")

const app = express();

// app.use("/user", userAuth)

// app.use("/user", (req,res,next)=>{
    // const token = "xyz"
    // const isUserAuthorized = token === 'xyz'
    // if (!isUserAuthorized)
        // res.status(401).send("Unauthorized request.");
    // else
        // next();
// })

// app.use("/admin", (req,res,next) => {
//     const token = 'qwerty'
//     const isAdminAuthorized = token === 'qwerty'
//     if(!isAdminAuthorized)
//         res.status(401).send("Unauthorized request.")
//     else
//         next()
// })

app.post("/user/login", 
    // (req,res,next)=>{
    //     const token = "xyz"
    //     const isUserAuthorized = token === 'xyz'
    //     if (!isUserAuthorized)
    //         res.status(401).send("Unauthorized request.");
    //     else
    //         next();
    // },
    (req,res) => {
    res.send("User log-in successful.")
})

app.get("/user/getData", userAuth,
    // (req,res,next)=>{
    //     const token = "xyz"
    //     const isUserAuthorized = token === 'xyz'
    //     if (!isUserAuthorized)
    //         res.status(401).send("Unauthorized request.");
    //     else
    //         next();
    // },
    (req,res) => {
    res.send("User's all personal information shown.")
})

app.get("/admin/getAllData", adminAuth,
    // (req,res,next) => {
    // const token = 'qwerty'
    // const isAdminAuthorized = token === 'qwerty'
    // if(!isAdminAuthorized)
    //     res.status(401).send("Unauthorized request.")
    // else
    //     next()
    // },
    (req,res) => {
        res.send("All users data fetched")
    }
)

app.get("/admin/deleteUser", adminAuth,
    // (req,res,next) => {
    //     const token = 'qwerty'
    //     const isAdminAuthorized = token === 'qwerty'
    //     if(!isAdminAuthorized)
    //         res.status(401).send("Unauthorized request.")
    //     else
    //         next()
    // },
    (req,res) => {
        res.send("User data deleted.")
    }
)


// let rH1 = function (req,res,next) {
//     console.log("Handling the rote path user 1!")
//     // res.send("Response!")
//     next()
// }
// let rH2 = function (req,res,next) {
//     console.log("Handling the rote path user 2!")
//     // res.send("Response!")
//     next()
// }
// let rH3 = function (req,res,next) {
//     console.log("Handling the rote path user 3!")
//     res.send("Response 3!")
//     // next()
// }
// let rH4 = function (req,res,next) {
//     console.log("Handling the rote path user 4!")
//     res.send("Response 4!")
//     // next()
// }

// app.get(
//     "/user", rH1, rH2, [rH3, rH4] 
//     (req,res,next)=> {
//     console.log("Handling the rote path user!")
//     // res.send("Response!")
//     next()
//     },
//     (req,res,next)=> {
//     console.log("Handling the rote path user 2!")
//     // res.send("Response 2!")
//     next()
//     },
//     (req,res,next)=> {
//     console.log("Handling the rote path user 3!")
//     // res.send("Response 2!")
//     next()
//     },
//     (req,res,next)=> {
//     console.log("Handling the rote path user 4!")
//     // res.send("Response 2!")
//     next()
// }
// )

// app.put("/user",(req,res) => {
//     res.send("Old user replaced with new user instance.")
// })

// app.patch("/user",(req,res) => {
//     res.send("User info updated.")
// })

// app.post("/user",(req,res)=> {
//     res.send("New user added.");
// })

// app.delete("/user",(req,res)=> {
//     res.send("User deleted.");
// })

app.listen(7777, ()=> {
    console.log("Server is listening to the port 7777...")
});