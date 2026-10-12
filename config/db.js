const mongoose = require("mongoose");



const dbConnection = () => {
    mongoose.connect(process.env.DBURL).then(() => {
        console.log("MongoDB connected");
    }).catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

}



module.exports = dbConnection;