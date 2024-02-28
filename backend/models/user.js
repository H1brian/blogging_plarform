import mongoose from "mongoose";
const Schema = mongoose.Schema;
import crypto from "crypto";
import { url } from "inspector";


const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: Number,
    about: {
        type: String
    },
    role: {
        type: Number,
        trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        type: String,
        default: ''
        }
},
{ timestamp: true }
);

// Virtual fields to handle and save the password as a hasded password
userSchema.virtual('password')
    .set(function(password) {
        //create a temporary variable called _password
        this._password = password
        //generate salt
        this.salt = this.makeSalt()
        //encryptPassword
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    });

userSchema.methods = {
    //Function 1: Compare the password to autheticate users
    autheticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    //Function 2: Hash the password
    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch(err) {
            return ''
        }
    },
    
    //Function 3: Generate the salt
    makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
},
};
    
const User = mongoose.model('User', userSchema);
export default User;