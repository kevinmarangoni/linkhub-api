
const globalConfigs = {
    port: process.env.PORT,
    mongoose:{
        url: process.env.MONGO_URL,
    },
    jwt:{
        secret: process.env.JWT_SECRET,
    }

}

module.exports = globalConfigs