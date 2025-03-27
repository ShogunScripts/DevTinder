const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://NamasteDev:T9TfKgUqCcIjoCHG@namastenode.fful1.mongodb.net/devTinder"
    );
}

module.exports = {connectDB}