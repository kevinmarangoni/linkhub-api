const mongoose = require('mongoose')
const validator = require('validator');

const linkSchema = mongoose.Schema(
    {
        link:{
            type: String,
            required: true,
            trim: true,
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error('Invalid email');
                }
            }
        },
        short:{
            type: String,
            required: true,
            trim: true
        },
    },
    {
        timestamps: true,
    }
)

const LinksModel = mongoose.model('Links', linkSchema);

module.exports = LinksModel