const LinkService = require("../services/links")
const httpStatus = require("http-status");

class LinkController {


    async createLink(req, res){
        let link = req.body.link

        if (link == undefined){
            res.status(httpStatus.BAD_REQUEST).json({error: "missing link"});
            return
        }
        if (link == null){
            res.status(httpStatus.BAD_REQUEST).json({error: "missing cannot be null"});
            return
        }
        if (typeof link != "string"){
            res.status(httpStatus.BAD_REQUEST).json({error: "link must be a string"});
            return
        }

        let data = await LinkService.createLink(link)
        res.status(httpStatus.CREATED).json(data)
    }

    async getShortByLink(req, res){
        let link = req.params.link

        if (link == undefined){
            res.status(httpStatus.BAD_REQUEST).json({error: "missing link"});
            return
        }
        if (link == null){
            res.status(httpStatus.BAD_REQUEST).json({error: "missing cannot be null"});
            return
        }
        if (typeof link != "string"){
            res.status(httpStatus.BAD_REQUEST).json({error: "link must be a string"});
            return
        }

        let data = await LinkService.getShortByLink(link)
        res.status(httpStatus.OK).json(data)
    }

    async getLinkByShort(req, res){
        let short = req.params.short
        if (short == undefined){
            res.status(httpStatus.BAD_REQUEST).json({error: "missing short"});
            return
        }
        if (short == null){
            res.status(httpStatus.BAD_REQUEST).json({error: "short cannot be null"});
            return
        }
        if (typeof short != "string"){
            res.status(httpStatus.BAD_REQUEST).json({error: "short must be a string"});
            return
        }

        let data = await LinkService.getLinkByShort(short)
        res.status(httpStatus.OK).json(data)
    }

    // async updateLink(){

    // }

    // async deleteLink(){

    // }

    // async getAllLinks(){

    // }

    // async getAllShorts(){

    // }
    
    // async getShortById(){

    // }
}

module.exports = new LinkController()