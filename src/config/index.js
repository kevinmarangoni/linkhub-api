
const globalConfigs = {
    port: process.env.PORT,
    mongoose:{
        url: process.env.MONGO_URL,
    },
    jwt:{
        secret: process.env.JWT_SECRET,
    },
    imagekit:{
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        endpointURL: process.env.IMAGEKIT_URL,
    }

}

module.exports = globalConfigs