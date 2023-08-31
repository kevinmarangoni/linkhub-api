
const httpStatus = require("http-status");

   const respondPing = async (req, res)=>{
        res.status(httpStatus.OK).json({message:"pong"})
    }

module.exports = {
    respondPing
}