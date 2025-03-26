const express = require("express");

const app = express();

let rH1 = function (req,res,next) {
    console.log("Handling the rote path user 1!")
    // res.send("Response!")
    next()
}
let rH2 = function (req,res,next) {
    console.log("Handling the rote path user 2!")
    // res.send("Response!")
    next()
}
let rH3 = function (req,res,next) {
    console.log("Handling the rote path user 3!")
    res.send("Response 3!")
    // next()
}
let rH4 = function (req,res,next) {
    console.log("Handling the rote path user 4!")
    res.send("Response 4!")
    // next()
}

app.get(
    "/user", rH1, rH2, [rH3, rH4] 
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
)

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