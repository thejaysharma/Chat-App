const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    fullName: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    avatarUrl: {type:String, required: true}
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY);
    return token;
}

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const Schema = joi.object({
        fullName: joi.string().required().label("Full Name"),
        email: joi.string().required().email().label("Email"),
        password: passwordComplexity().required().label("Password"),
        avatarUrl: joi.string().required().label("Profile Pic")
    });
    return Schema.validate(data);
};

module.exports = {User , validate};