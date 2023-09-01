
const config = require("./src/config");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const app = require("./app.js");

dotenv.config()

function handleServerStart() {
    try{
        mongoose.connect(config.mongoose.url).then(()=>{
            console.log("MongoDB connected successfully")
            server = app.listen(config.port, () =>{
                console.log(`Running server on port ${config.port}`);
            })
        })
    }
    catch(err){
        throw new Error("Could not start server and db")
    }
}

handleServerStart()
