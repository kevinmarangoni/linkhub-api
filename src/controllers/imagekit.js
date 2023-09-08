const ImageUploadService = require("../services/imagekit")
const httpStatus = require("http-status");


class ImageUploadController {

    async getImagekitAuthParams(req, res){
        if(req.method !== "GET"){
            res.status(httpStatus.BAD_REQUEST).json({ error: "This route only serves GET requests" });
            return
        }
        try{
            const auth = await ImageUploadService.getImagekitAuthParams()
            res.status(httpStatus.OK).json(auth);
        }
        catch(err){
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
        
    }
}

module.exports = new ImageUploadController()