
const ImageKit = require("imagekit");
const config = require("../config")

class ImageUploadService{

    imagekit = new ImageKit({
        publicKey : config.imagekit.publicKey,
        privateKey : config.imagekit.privateKey,
        urlEndpoint : config.imagekit.endpointURL
    });

    async getImagekitAuthParams(){
        return this.imagekit.getAuthenticationParameters()
    }
}

module.exports = new ImageUploadService();