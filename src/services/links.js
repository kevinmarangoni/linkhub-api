const LinkModel = require("../model/link.schema.js")
const generateShort = require("../helper/slug.js")

class LinkService {

    async createLink(link){
        let short = generateShort(10)

        return await LinkModel.create({
            link: link,
            short: short
        })
    }
    
    async getShortByLink(link){
        return await LinkModel.findOne({link: link})
    }

    async getLinkByShort(short){
        return await LinkModel.findOne({short: short})
    }
}

module.exports = new LinkService()