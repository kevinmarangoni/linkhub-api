const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        id:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Invalid email');
                }
            }
        },
        avatar:{
            type: String,
            required: true,
            trim: true,
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error('Invalid avatar link');
                }
            }
        },
        name:{
            type: String,
            required: true,
            trim: true
        },
        active:{
            type: Boolean,
            required: true,
            default: true,
        }
    },
    {
        timestamps: true,
    }
)


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel