
const LinkModel = require("../model/link.schema.js")

class LinkService {
    generateShort(length){;
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomId = ''
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters[randomIndex];
        }
        return randomId;
    }

    async createLink(link){
        let short = this.generateShort(10)

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

module.exports = new LinkService()